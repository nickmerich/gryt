
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, session } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Log the authentication state for debugging
    if (loading) {
      console.log('Auth state: Loading');
    } else if (session) {
      console.log('Auth state: Authenticated', session.user.id);
      console.log('Current path:', location.pathname);
    } else {
      console.log('Auth state: Not authenticated, redirecting to auth page');
      console.log('Current path:', location.pathname);
      console.log('Redirecting from:', location);
    }
  }, [loading, session, location]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gryt-blue mb-2" />
        <p className="text-gryt-blue">Verifying your authentication...</p>
      </div>
    );
  }

  if (!session || !user) {
    // Save the current path to redirect back after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
