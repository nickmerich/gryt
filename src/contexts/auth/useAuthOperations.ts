
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthOperations = (setLoading: (loading: boolean) => void) => {
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Attempting to sign in user:', email, 'on domain:', window.location.origin);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error on domain:', window.location.origin, error);
        return { error };
      }

      if (!data.user) {
        console.error('No user returned from sign in on domain:', window.location.origin);
        return { error: new Error('No user data returned') };
      }

      console.log('Sign in successful for:', email, 'on domain:', window.location.origin);
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign in error on domain:', window.location.origin, error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Attempting to sign up user:', email, 'on domain:', window.location.origin);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error on domain:', window.location.origin, error);
        return { error };
      }

      if (!data.user) {
        console.error('No user returned from sign up on domain:', window.location.origin);
        return { error: new Error('No user data returned') };
      }

      // Check if email confirmation is required
      if (data.user && !data.user.email_confirmed_at) {
        console.log('Email confirmation required for:', email, 'on domain:', window.location.origin);
        return { error: null, emailConfirmationRequired: true };
      }

      console.log('Sign up successful for:', email, 'on domain:', window.location.origin);
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign up error on domain:', window.location.origin, error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      console.log('Signing out user on domain:', window.location.origin);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error on domain:', window.location.origin, error);
        toast.error('Error signing out: ' + error.message);
      } else {
        console.log('Sign out successful on domain:', window.location.origin);
        toast.success('Successfully signed out');
      }
    } catch (error: any) {
      console.error('Unexpected sign out error on domain:', window.location.origin, error);
      toast.error('An unexpected error occurred during sign out');
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, signOut };
};
