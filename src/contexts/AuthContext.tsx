
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any, emailConfirmationRequired?: boolean }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider initialized, setting up auth state listener');
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          console.log('User signed in:', currentSession?.user?.email);
          
          // Don't navigate immediately in the auth state change handler
          // This prevents potential issues with React state updates
          setTimeout(() => {
            if (window.location.pathname === '/auth') {
              navigate('/');
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          console.log('User signed out');
          
          // Use setTimeout to avoid state update issues
          setTimeout(() => {
            navigate('/auth');
          }, 0);
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery email clicked');
        } else if (event === 'USER_UPDATED') {
          console.log('User updated:', currentSession?.user?.email);
          // Refresh the session
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        console.log('Checking for existing session...');
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        if (initialSession?.user) {
          console.log('Existing session found for:', initialSession.user.email);
        } else {
          console.log('No existing session found');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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

  const value = {
    session,
    user,
    signIn,
    signUp,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
