
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any, emailConfirmationRequired?: boolean }>;
  signOut: () => Promise<void>;
  loading: boolean;
}
