
import { supabase } from "@/integrations/supabase/client";
import { UserIntegration } from "./types";

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
    
    // Ensure we return data with the correct types
    return (data || []).map(item => ({
      ...item,
      status: (item.status as 'active' | 'expired' | 'error') || 'active'
    })) as UserIntegration[];
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
    
    // Ensure the returned data has the correct type
    return {
      ...data,
      status: (data.status as 'active' | 'expired' | 'error')
    } as UserIntegration;
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
