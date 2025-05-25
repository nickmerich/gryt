
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIntegrations } from '@/hooks/useIntegrations';
import { toast } from 'sonner';

export const usePendingIntegration = () => {
  const { user } = useAuth();
  const { connect } = useIntegrations();

  useEffect(() => {
    const processPendingIntegration = async () => {
      if (!user) return;

      const pendingIntegration = sessionStorage.getItem('pendingIntegration');
      if (!pendingIntegration) return;

      try {
        const integrationData = JSON.parse(pendingIntegration);
        await connect(integrationData.provider, integrationData.accessToken);
        
        // Clear the pending integration
        sessionStorage.removeItem('pendingIntegration');
        
        toast.success(`Successfully connected to ${integrationData.provider}!`);
      } catch (error) {
        console.error('Error processing pending integration:', error);
        sessionStorage.removeItem('pendingIntegration');
        toast.error('Failed to complete integration. Please try again.');
      }
    };

    processPendingIntegration();
  }, [user, connect]);
};
