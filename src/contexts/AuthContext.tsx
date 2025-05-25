
import { createContext, useContext, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { AuthContextType } from './auth/types';
import { useAuthOperations } from './auth/useAuthOperations';
import { useAuthStateListener } from './auth/useAuthStateListener';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { signIn, signUp, signOut } = useAuthOperations(setLoading);
  
  useAuthStateListener(setSession, setUser, setLoading);

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
