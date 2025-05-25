
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { initiateOAuth } from '@/services/integration/oauthService';
import { connectIntegration, disconnectIntegration } from '@/services/integration/databaseService';
import { integrationProviders } from '@/services/integration/providers';
import type { IntegrationProvider } from '@/services/integration/types';

export interface UserIntegration {
  id: string;
  provider_id: string;
  status: string;
  last_synced: string | null;
  created_at: string;
}

export interface IntegrationWithStatus extends IntegrationProvider {
  isConnected: boolean;
  connectionDetails?: UserIntegration;
}

export const useIntegrations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user integrations
  const { data: userIntegrations = [], error } = useQuery({
    queryKey: ['user-integrations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_integrations')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');
      
      if (error) {
        console.error('Error fetching integrations:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  const getIntegrationsWithStatus = (): IntegrationWithStatus[] => {
    return integrationProviders.map(provider => {
      const connection = userIntegrations.find(
        integration => integration.provider_id === provider.id
      );
      
      return {
        ...provider,
        isConnected: !!connection,
        connectionDetails: connection,
      };
    });
  };

  const connect = async (providerId: string, token?: string) => {
    if (!user) {
      toast.error('Please log in to connect integrations');
      return;
    }

    setIsLoading(true);
    try {
      if (token) {
        // Direct token connection (from OAuth callback)
        await connectIntegration(providerId, token, user.id);
        await queryClient.invalidateQueries({ queryKey: ['user-integrations'] });
        toast.success(`Successfully connected to ${providerId}!`);
      } else {
        // OAuth flow
        initiateOAuth(providerId);
      }
    } catch (error) {
      console.error('Error connecting integration:', error);
      toast.error(`Failed to connect to ${providerId}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async (integrationId: string) => {
    if (!user) {
      toast.error('Please log in to manage integrations');
      return;
    }

    setIsLoading(true);
    try {
      await disconnectIntegration(integrationId);
      await queryClient.invalidateQueries({ queryKey: ['user-integrations'] });
      toast.success('Integration disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting integration:', error);
      toast.error('Failed to disconnect integration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userIntegrations,
    availableIntegrations: integrationProviders,
    getIntegrationsWithStatus,
    connect,
    disconnect,
    isLoading: isLoading || !user,
    error,
  };
};
