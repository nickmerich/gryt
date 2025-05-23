
// Integration provider types
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

// User integration types
export interface UserIntegration {
  id: string;
  user_id: string;
  provider_id: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  created_at: string;
  last_synced?: string;
  status: 'active' | 'expired' | 'error';
  metadata?: any;
  provider_user_id?: string;
  updated_at: string;
}

// Integration categorized by category
export interface CategorizedIntegrations {
  category: string;
  integrations: IntegrationProvider[];
}

// Integration with connection status
export interface IntegrationWithStatus extends IntegrationProvider {
  connected?: boolean;
  connectionDetails?: UserIntegration;
}
