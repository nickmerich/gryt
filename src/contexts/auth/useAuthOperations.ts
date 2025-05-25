
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthOperations = (setLoading: (loading: boolean) => void) => {
  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error.message);
        return { error };
      }
      
      if (data.user) {
        console.log('Sign in successful:', data.user.email);
        toast.success('Signed in successfully!');
        // We don't need to navigate here as the onAuthStateChange listener will do it
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Creating new user account:', email);
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign up error:', error.message);
        return { error };
      }
      
      // Check if email confirmation is required
      const emailConfirmationRequired = data?.user && !data.user?.confirmed_at;
      
      if (data.user && !emailConfirmationRequired) {
        console.log('Account created successfully (no confirmation required):', data.user.email);
        toast.success('Account created successfully!');
        // We don't need to navigate here as the onAuthStateChange listener will do it
        return { error: null };
      }
      
      console.log('Account created, email confirmation required:', email);
      toast.success('Account created! Please check your email to confirm your account.');
      return { error: null, emailConfirmationRequired: true };
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error.message);
        toast.error('Failed to sign out: ' + error.message);
      } else {
        console.log('User signed out successfully');
        toast.success('Signed out successfully');
        // We don't need to navigate here as the onAuthStateChange listener will do it
      }
    } catch (error: any) {
      console.error('Unexpected sign out error:', error);
      toast.error('An unexpected error occurred while signing out');
    } finally {
      setLoading(false);
    }
  };

  return { signIn, signUp, signOut };
};
