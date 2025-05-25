
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthOperations = (setLoading: (loading: boolean) => void) => {
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        toast.error(error.message);
        return { error };
      }

      // Create profile if it doesn't exist
      if (data.user) {
        await ensureUserProfile(data.user.id, email);
      }

      toast.success('Successfully signed in!');
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      toast.error('An unexpected error occurred during sign in');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message);
        return { error };
      }

      if (data.user && !data.user.email_confirmed_at) {
        toast.success('Please check your email to confirm your account');
        return { error: null, emailConfirmationRequired: true };
      }

      // Create profile if user is immediately confirmed
      if (data.user) {
        await ensureUserProfile(data.user.id, email);
      }

      toast.success('Account created successfully!');
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast.error('An unexpected error occurred during sign up');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Error signing out');
      } else {
        toast.success('Successfully signed out');
      }
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      toast.error('An unexpected error occurred during sign out');
    } finally {
      setLoading(false);
    }
  };

  const ensureUserProfile = async (userId: string, email: string) => {
    try {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (!existingProfile) {
        // Create profile
        const { error } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            full_name: email.split('@')[0], // Use email prefix as initial name
            username: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, ''),
          });

        if (error) {
          console.error('Error creating user profile:', error);
        } else {
          console.log('User profile created successfully');
        }
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  };

  return { signIn, signUp, signOut };
};
