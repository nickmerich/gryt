
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  IntegrationProvider, 
  UserIntegration,
  getAvailableIntegrations,
  getUserIntegrations,
  connectIntegration,
  disconnectIntegration
} from '@/services/integrationService';

export const useIntegrations = () => {
  const { user } = useAuth();
  const [availableIntegrations, setAvailableIntegrations] = useState<IntegrationProvider[]>([]);
  const [userIntegrations, setUserIntegrations] = useState<UserIntegration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch available integrations and user's connected integrations
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        setIsLoading(true);
        // Get all available integrations
        const integrations = getAvailableIntegrations();
        setAvailableIntegrations(integrations);
        
        // If user is logged in, get their connected integrations
        if (user) {
          const userConnectedIntegrations = await getUserIntegrations(user.id);
          setUserIntegrations(userConnectedIntegrations);
        }
      } catch (err: any) {
        console.error('Error fetching integrations:', err);
        setError(err.message);
        toast.error('Failed to load integrations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIntegrations();
  }, [user]);

  // Connect a new integration
  const connect = async (providerId: string, token: string) => {
    if (!user) {
      toast.error('You must be logged in to connect an integration');
      return null;
    }

    try {
      const integration = await connectIntegration(providerId, token, user.id);
      setUserIntegrations(prev => [...prev, integration]);
      toast.success('Integration connected successfully');
      return integration;
    } catch (err: any) {
      console.error('Error connecting integration:', err);
      toast.error('Failed to connect integration');
      return null;
    }
  };

  // Disconnect an integration
  const disconnect = async (integrationId: string) => {
    try {
      await disconnectIntegration(integrationId);
      setUserIntegrations(prev => prev.filter(i => i.id !== integrationId));
      toast.success('Integration disconnected');
      return true;
    } catch (err: any) {
      console.error('Error disconnecting integration:', err);
      toast.error('Failed to disconnect integration');
      return false;
    }
  };

  // Check if a provider is connected
  const isConnected = (providerId: string) => {
    return userIntegrations.some(i => i.provider_id === providerId && i.status === 'active');
  };

  // Get integration details including connection status
  const getIntegrationsWithStatus = () => {
    return availableIntegrations.map(provider => ({
      ...provider,
      connected: isConnected(provider.id),
      connectionDetails: userIntegrations.find(i => i.provider_id === provider.id)
    }));
  };

  return {
    availableIntegrations,
    userIntegrations,
    isLoading,
    error,
    connect,
    disconnect,
    isConnected,
    getIntegrationsWithStatus
  };
};
