
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface IntegrationProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'Fitness' | 'Learning' | 'Wellness' | 'Creativity' | 'Games';
  status: 'available' | 'coming_soon';
  color: string;
  authType: 'oauth' | 'api_key';
  authUrl?: string;
}

export interface UserIntegration {
  id: string;
  user_id: string;
  provider_id: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: string;
  created_at: string;
  last_synced?: string;
  status: 'active' | 'expired' | 'error';
  metadata?: any;
}

// List of available integration providers
export const integrationProviders: IntegrationProvider[] = [
  {
    id: 'strava',
    name: 'Strava',
    icon: 'strava.svg',
    description: 'Connect your running and cycling activities',
    category: 'Fitness',
    status: 'available',
    color: '#FC4C02',
    authType: 'oauth',
    authUrl: '/api/auth/strava'
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    icon: 'duolingo.svg',
    description: 'Track your language learning streaks and XP',
    category: 'Learning',
    status: 'available',
    color: '#58CC02',
    authType: 'oauth',
    authUrl: '/api/auth/duolingo'
  },
  {
    id: 'chess',
    name: 'Chess.com',
    icon: 'chess.svg',
    description: 'Connect your chess games and puzzles',
    category: 'Games',
    status: 'available',
    color: '#7FA650',
    authType: 'api_key'
  },
  {
    id: 'whoop',
    name: 'WHOOP',
    icon: 'whoop.svg',
    description: 'Track your recovery, strain, and sleep data',
    category: 'Fitness',
    status: 'coming_soon',
    color: '#00A9E0',
    authType: 'oauth'
  },
  {
    id: 'garmin',
    name: 'Garmin',
    icon: 'garmin.svg',
    description: 'Connect your fitness and health metrics',
    category: 'Fitness',
    status: 'coming_soon',
    color: '#007CC3',
    authType: 'oauth'
  },
  {
    id: 'apple_health',
    name: 'Apple Health',
    icon: 'apple-health.svg',
    description: 'Import health and fitness data from Apple Health',
    category: 'Fitness',
    status: 'coming_soon',
    color: '#FF2D55',
    authType: 'oauth'
  },
  {
    id: 'headspace',
    name: 'Headspace',
    icon: 'headspace.svg',
    description: 'Track your meditation minutes and streaks',
    category: 'Wellness',
    status: 'coming_soon',
    color: '#F47D31',
    authType: 'oauth'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github.svg',
    description: 'Track your code commits and contributions',
    category: 'Creativity',
    status: 'available',
    color: '#171515',
    authType: 'oauth',
    authUrl: '/api/auth/github'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube.svg',
    description: 'Connect your videos and channel stats',
    category: 'Creativity',
    status: 'coming_soon',
    color: '#FF0000',
    authType: 'oauth'
  },
  {
    id: 'goodreads',
    name: 'Goodreads',
    icon: 'goodreads.svg',
    description: 'Track your reading progress and books completed',
    category: 'Learning',
    status: 'coming_soon',
    color: '#553B08',
    authType: 'oauth'
  },
];

// Function to get all available integrations
export const getAvailableIntegrations = () => {
  return integrationProviders;
};

// Function to get integrations by category
export const getIntegrationsByCategory = () => {
  const categories = ['Fitness', 'Learning', 'Wellness', 'Creativity', 'Games'];
  
  return categories.map(category => ({
    category,
    integrations: integrationProviders.filter(
      integration => integration.category === category
    )
  }));
};

// Function to get user's connected integrations
export const getUserIntegrations = async (userId: string): Promise<UserIntegration[]> => {
  try {
    const { data, error } = await supabase
      .from('user_integrations')
      .select('*')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching user integrations:', error);
      throw error;
    }
    
    return data || [];
  } catch (err) {
    console.error('Failed to fetch integrations:', err);
    return [];
  }
};

// Function to connect an integration with API key
export const connectIntegration = async (providerId: string, token: string, userId: string): Promise<UserIntegration> => {
  try {
    // For API key based integrations (like Chess.com)
    const { data, error } = await supabase
      .from('user_integrations')
      .insert({
        user_id: userId,
        provider_id: providerId,
        access_token: token,
        status: 'active'
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error connecting integration:', error);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error('Failed to connect integration:', err);
    throw err;
  }
};

// Function to disconnect an integration
export const disconnectIntegration = async (integrationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_integrations')
      .delete()
      .eq('id', integrationId);
      
    if (error) {
      console.error('Error disconnecting integration:', error);
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Failed to disconnect integration:', err);
    return false;
  }
};

// Function to handle OAuth callback and store token
export const handleOAuthCallback = async (
  providerId: string, 
  code: string, 
  userId: string
): Promise<UserIntegration | null> => {
  try {
    // In a real implementation, this would exchange the code for tokens
    // with the provider's OAuth service
    console.log(`Exchanging code for ${providerId} tokens...`);
    
    // For demo purposes, we'll simulate a successful token exchange
    const mockTokenResponse = {
      access_token: `mock_${providerId}_token_${Date.now()}`,
      refresh_token: `mock_${providerId}_refresh_${Date.now()}`,
      expires_in: 3600
    };
    
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + mockTokenResponse.expires_in);
    
    // Store the tokens in our database
    const { data, error } = await supabase
      .from('user_integrations')
      .insert({
        user_id: userId,
        provider_id: providerId,
        access_token: mockTokenResponse.access_token,
        refresh_token: mockTokenResponse.refresh_token,
        token_expires_at: expiresAt.toISOString(),
        status: 'active'
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error storing OAuth tokens:', error);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error('OAuth callback handling failed:', err);
    return null;
  }
};
