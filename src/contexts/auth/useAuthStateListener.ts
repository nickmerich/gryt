
import { useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

export const useAuthStateListener = (
  setSession: (session: Session | null) => void,
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
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
  }, [navigate, setSession, setUser, setLoading]);
};
