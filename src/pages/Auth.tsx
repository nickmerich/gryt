
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import PasswordResetForm from '@/components/PasswordResetForm';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';
import AuthBackground from '@/components/auth/AuthBackground';
import AuthHeroSection from '@/components/auth/AuthHeroSection';
import EmailConfirmationView from '@/components/auth/EmailConfirmationView';
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  const { user } = useAuth();
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [searchParams] = useSearchParams();

  // Check if this is a password reset mode
  const mode = searchParams.get('mode');
  const isPasswordReset = mode === 'reset';

  // Redirect if user is already authenticated (except for password reset)
  if (user && !isPasswordReset) {
    return <Navigate to="/" />;
  }

  // Show password update form if in reset mode
  if (isPasswordReset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background-subtle to-background-muted">
        <div className="w-full max-w-md">
          <UpdatePasswordForm />
        </div>
      </div>
    );
  }

  // Show password reset form
  if (showPasswordReset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background-subtle to-background-muted">
        <div className="w-full max-w-md">
          <PasswordResetForm onBack={() => setShowPasswordReset(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-subtle to-background-muted overflow-hidden">
      <AuthBackground />
      
      <div className="relative min-h-screen flex flex-col lg:flex-row">
        <AuthHeroSection />

        {/* Right Auth Section */}
        <div className="lg:w-2/5 flex items-center justify-center p-8 lg:p-16 bg-card/95 backdrop-blur-sm border-l-2 border-card-border">
          <div className="w-full max-w-md space-y-8">
            {showEmailConfirmation ? (
              <EmailConfirmationView 
                onBack={() => {
                  setShowEmailConfirmation(false);
                }}
              />
            ) : (
              <AuthForm onPasswordReset={() => setShowPasswordReset(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
