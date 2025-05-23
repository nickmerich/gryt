
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  IntegrationProvider, 
  UserIntegration,
  getAvailableIntegrations,
  getUserIntegrations,
  connectIntegration,
  disconnectIntegration,
  handleOAuthCallback
} from '@/services/integrationService';

export const useIntegrations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;

  // Fetch available integrations and user's connected integrations
  const { 
    data: availableIntegrations = [],
    isLoading: isLoadingAvailable 
  } = useQuery({
    queryKey: ['integrations', 'available'],
    queryFn: () => getAvailableIntegrations(),
    staleTime: Infinity // These rarely change
  });
  
  const { 
    data: userIntegrations = [], 
    isLoading: isLoadingUser, 
    error 
  } = useQuery({
    queryKey: ['integrations', 'user', userId],
    queryFn: () => userId ? getUserIntegrations(userId) : Promise.resolve([]),
    enabled: !!userId,
  });
  
  // Mutation for connecting a new integration
  const connectMutation = useMutation({
    mutationFn: ({ providerId, token }: { providerId: string, token: string }) => {
      if (!userId) throw new Error('User must be logged in');
      return connectIntegration(providerId, token, userId);
    },
    onSuccess: () => {
      toast.success('Integration connected successfully');
      queryClient.invalidateQueries({ queryKey: ['integrations', 'user'] });
    },
    onError: (err: any) => {
      console.error('Error connecting integration:', err);
      toast.error('Failed to connect integration');
    }
  });
  
  // Mutation for disconnecting an integration
  const disconnectMutation = useMutation({
    mutationFn: (integrationId: string) => disconnectIntegration(integrationId),
    onSuccess: () => {
      toast.success('Integration disconnected');
      queryClient.invalidateQueries({ queryKey: ['integrations', 'user'] });
    },
    onError: (err: any) => {
      console.error('Error disconnecting integration:', err);
      toast.error('Failed to disconnect integration');
    }
  });
  
  // Mutation for handling OAuth callback
  const oauthCallbackMutation = useMutation({
    mutationFn: ({ providerId, code }: { providerId: string, code: string }) => {
      if (!userId) throw new Error('User must be logged in');
      return handleOAuthCallback(providerId, code, userId);
    },
    onSuccess: () => {
      toast.success('Integration connected successfully');
      queryClient.invalidateQueries({ queryKey: ['integrations', 'user'] });
    },
    onError: (err: any) => {
      console.error('Error with OAuth callback:', err);
      toast.error('Failed to connect integration');
    }
  });

  // Connect a new integration
  const connect = async (providerId: string, token: string) => {
    return connectMutation.mutateAsync({ providerId, token });
  };

  // Disconnect an integration
  const disconnect = async (integrationId: string) => {
    return disconnectMutation.mutateAsync(integrationId);
  };
  
  // Handle OAuth callback
  const handleOAuth = async (providerId: string, code: string) => {
    return oauthCallbackMutation.mutateAsync({ providerId, code });
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
    isLoading: isLoadingAvailable || isLoadingUser,
    error,
    connect,
    disconnect,
    handleOAuth,
    isConnected,
    getIntegrationsWithStatus
  };
};
