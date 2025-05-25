
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import GhibliLayout from '@/components/GhibliLayout';

const IntegrationCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const provider = searchParams.get('provider');
    const error = searchParams.get('error');
    const code = searchParams.get('code');

    if (error) {
      toast.error(`Integration failed: ${error}`);
      navigate('/integrations');
      return;
    }

    if (code && provider) {
      // Handle successful OAuth callback
      toast.success(`Successfully connected to ${provider}!`);
      
      // Store the integration data (this would typically involve an API call)
      const integrationData = {
        provider,
        code,
        connectedAt: new Date().toISOString(),
      };
      
      // Store in localStorage for now (in a real app, this would be stored in the database)
      const existingIntegrations = JSON.parse(localStorage.getItem('userIntegrations') || '[]');
      const updatedIntegrations = [...existingIntegrations, integrationData];
      localStorage.setItem('userIntegrations', JSON.stringify(updatedIntegrations));
      
      navigate('/integrations');
    } else {
      toast.error('Invalid integration callback');
      navigate('/integrations');
    }
  }, [searchParams, navigate]);

  return (
    <GhibliLayout className="flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-black mb-2">Processing Integration</h2>
        <p className="text-slate-600">Please wait while we connect your account...</p>
      </div>
    </GhibliLayout>
  );
};

export default IntegrationCallback;
