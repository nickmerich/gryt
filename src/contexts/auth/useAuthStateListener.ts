
import { useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';

export const useAuthStateListener = (
  setSession: (session: Session | null) => void,
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('AuthProvider initialized, setting up auth state listener');
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, 'Path:', location.pathname);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          console.log('User signed in:', currentSession?.user?.email);
          
          // Only navigate if we're on the auth page and have a valid session
          if (location.pathname === '/auth' && currentSession?.user) {
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 100);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          
          // Only navigate to auth if we're not already there
          if (location.pathname !== '/auth') {
            setTimeout(() => {
              navigate('/auth', { replace: true });
            }, 100);
          }
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery email clicked');
        } else if (event === 'USER_UPDATED') {
          console.log('User updated:', currentSession?.user?.email);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        console.log('Checking for existing session...');
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }
        
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        if (initialSession?.user) {
          console.log('Existing session found for:', initialSession.user.email);
          // If user is authenticated and on auth page, redirect to home
          if (location.pathname === '/auth') {
            navigate('/', { replace: true });
          }
        } else {
          console.log('No existing session found');
          // If no session and not on auth page, redirect to auth
          if (location.pathname !== '/auth') {
            navigate('/auth', { replace: true });
          }
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
  }, [navigate, setSession, setUser, setLoading, location.pathname]);
};
