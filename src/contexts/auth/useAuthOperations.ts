
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthOperations = (setLoading: (loading: boolean) => void) => {
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Attempting to sign in user:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      if (!data.user) {
        console.error('No user returned from sign in');
        return { error: new Error('No user data returned') };
      }

      // Create profile if it doesn't exist
      await ensureUserProfile(data.user.id, email);

      console.log('Sign in successful for:', email);
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Attempting to sign up user:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      if (!data.user) {
        console.error('No user returned from sign up');
        return { error: new Error('No user data returned') };
      }

      // Check if email confirmation is required
      if (data.user && !data.user.email_confirmed_at) {
        console.log('Email confirmation required for:', email);
        return { error: null, emailConfirmationRequired: true };
      }

      // Create profile for immediately confirmed users
      await ensureUserProfile(data.user.id, email);

      console.log('Sign up successful for:', email);
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      console.log('Signing out user');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Error signing out: ' + error.message);
      } else {
        console.log('Sign out successful');
        toast.success('Successfully signed out');
      }
    } catch (error: any) {
      console.error('Unexpected sign out error:', error);
      toast.error('An unexpected error occurred during sign out');
    } finally {
      setLoading(false);
    }
  };

  const ensureUserProfile = async (userId: string, email: string) => {
    try {
      console.log('Ensuring user profile exists for:', userId);
      
      // Check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error checking for existing profile:', fetchError);
        return;
      }

      if (!existingProfile) {
        console.log('Creating new profile for user:', userId);
        
        // Create profile with safe defaults
        const username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20);
        const fullName = email.split('@')[0];
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            full_name: fullName,
            username: username,
          });

        if (insertError) {
          console.error('Error creating user profile:', insertError);
        } else {
          console.log('User profile created successfully for:', userId);
        }
      } else {
        console.log('Profile already exists for user:', userId);
      }
    } catch (error) {
      console.error('Error ensuring user profile:', error);
    }
  };

  return { signIn, signUp, signOut };
};
