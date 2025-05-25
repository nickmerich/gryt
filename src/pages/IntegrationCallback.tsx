
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle, LogIn } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { handleOAuthCallback } from '@/services/integration/oauthService';
import { useAuth } from '@/contexts/AuthContext';

const IntegrationCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'needs-auth'>('loading');
  const [provider, setProvider] = useState<string>('');
  const [authResult, setAuthResult] = useState<any>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // First, process the OAuth callback to get the tokens
        const result = await handleOAuthCallback(searchParams);
        setProvider(result.provider);
        setAuthResult(result);
        
        // Check if user is authenticated
        if (!authLoading && !user) {
          setStatus('needs-auth');
          toast.info(`Please log in to complete your ${result.provider} integration.`);
          return;
        }
        
        // If user is authenticated, we'll handle the connection after auth loads
        if (user) {
          await handleIntegrationConnection(result);
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        toast.error('Failed to complete integration. Please try again.');
      }
    };

    processCallback();
  }, [searchParams, user, authLoading]);

  // Handle integration connection once user is authenticated
  useEffect(() => {
    if (user && authResult && status === 'needs-auth') {
      handleIntegrationConnection(authResult);
    }
  }, [user, authResult, status]);

  const handleIntegrationConnection = async (result: any) => {
    try {
      // Import the hook dynamically to avoid using it at the top level
      const { connectIntegration } = await import('@/services/integration/databaseService');
      
      // Connect the integration
      await connectIntegration(result.provider, result.accessToken, user!.id);
      
      setStatus('success');
      toast.success(`Successfully connected to ${result.provider}!`);
      
      // Redirect to integrations page after a short delay
      setTimeout(() => {
        navigate('/integrations');
      }, 2000);
    } catch (error) {
      console.error('Integration connection error:', error);
      setStatus('error');
      toast.error('Failed to complete integration. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    // Store the OAuth result in sessionStorage so we can complete it after login
    if (authResult) {
      sessionStorage.setItem('pendingIntegration', JSON.stringify(authResult));
    }
    navigate('/auth', { state: { from: '/integrations' } });
  };

  const handleRetry = () => {
    navigate('/integrations');
  };

  if (authLoading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <CardTitle>Connecting Integration</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Please wait while we complete your integration setup...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'needs-auth') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <LogIn className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle>Login Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              We've received your {provider} authorization. Please log in to complete the integration.
            </p>
            <Button onClick={handleLoginRedirect} className="w-full">
              Log In to Complete Setup
            </Button>
            <Button onClick={handleRetry} variant="outline" className="w-full">
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Integration Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Your {provider} integration has been connected successfully.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you back to integrations...
            </p>
            <Button onClick={() => navigate('/integrations')} className="w-full">
              Go to Integrations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle>Integration Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            We couldn't complete your integration setup. Please try again.
          </p>
          <Button onClick={handleRetry} className="w-full">
            Back to Integrations
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationCallback;
