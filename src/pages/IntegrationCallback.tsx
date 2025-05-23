
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIntegrations } from '@/hooks/useIntegrations';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import GhibliLayout from '@/components/GhibliLayout';

const IntegrationCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOAuth } = useIntegrations();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing your integration...');
  
  useEffect(() => {
    const processOAuth = async () => {
      try {
        // Get the code and state from URL parameters
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state'); // Provider ID is stored in state
        
        if (!code || !state) {
          setStatus('error');
          setMessage('Missing required parameters');
          return;
        }
        
        const providerId = state;
        await handleOAuth(providerId, code);
        
        setStatus('success');
        setMessage(`Successfully connected to ${providerId.charAt(0).toUpperCase() + providerId.slice(1)}`);
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/integrations');
        }, 2000);
      } catch (error) {
        console.error('OAuth callback failed:', error);
        setStatus('error');
        setMessage('Failed to connect integration');
      }
    };
    
    processOAuth();
  }, [location, handleOAuth, navigate]);
  
  return (
    <GhibliLayout illustrationType="forest" className="max-w-lg mx-auto">
      <Card className="mt-20">
        <CardContent className="pt-6 text-center">
          {status === 'processing' && (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="h-10 w-10 animate-spin text-gryt-blue" />
              <p>{message}</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="flex flex-col items-center gap-4 py-8 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>{message}</p>
              <p className="text-sm text-gray-500">Redirecting back to integrations page...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="flex flex-col items-center gap-4 py-8 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p>{message}</p>
              <button 
                onClick={() => navigate('/integrations')} 
                className="mt-4 px-4 py-2 bg-gryt-blue text-white rounded hover:bg-gryt-blue/90"
              >
                Back to Integrations
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </GhibliLayout>
  );
};

export default IntegrationCallback;
