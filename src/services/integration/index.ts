
import { integrationProviders } from './providers';
import { getUserIntegrations, connectIntegration, disconnectIntegration } from './databaseService';
import { handleOAuthCallback } from './oauthService';
import { IntegrationProvider, UserIntegration, CategorizedIntegrations } from './types';

// Function to get all available integrations
export const getAvailableIntegrations = (): IntegrationProvider[] => {
  return integrationProviders;
};

// Function to get integrations by category
export const getIntegrationsByCategory = (): CategorizedIntegrations[] => {
  const categories = ['Fitness', 'Learning', 'Wellness', 'Creativity', 'Games'];
  
  return categories.map(category => ({
    category,
    integrations: integrationProviders.filter(
      integration => integration.category === category
    )
  }));
};

// Export all the necessary functions and types
export { 
  getUserIntegrations, 
  connectIntegration, 
  disconnectIntegration,
  handleOAuthCallback,
};

// Export types using 'export type' syntax for compatibility with isolatedModules
export type { IntegrationProvider, UserIntegration };
