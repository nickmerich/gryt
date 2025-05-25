
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const getUserIntegrations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_integrations')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active');
    
    if (error) {
      console.error('Error fetching user integrations:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Database service error:', error);
    throw error;
  }
};

export const connectIntegration = async (
  providerId: string,
  accessToken: string,
  userId: string
) => {
  try {
    // Check if integration already exists
    const { data: existingIntegration } = await supabase
      .from('user_integrations')
      .select('id')
      .eq('provider_id', providerId)
      .eq('user_id', userId)
      .single();

    if (existingIntegration) {
      // Update existing integration
      const { error } = await supabase
        .from('user_integrations')
        .update({
          access_token: accessToken,
          status: 'active',
          last_synced: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', existingIntegration.id);

      if (error) {
        console.error('Error updating integration:', error);
        throw error;
      }
    } else {
      // Create new integration
      const { error } = await supabase
        .from('user_integrations')
        .insert({
          user_id: userId,
          provider_id: providerId,
          access_token: accessToken,
          status: 'active',
          last_synced: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating integration:', error);
        throw error;
      }
    }

    console.log(`Successfully connected ${providerId} integration`);
  } catch (error) {
    console.error('Database service error:', error);
    throw error;
  }
};

export const disconnectIntegration = async (integrationId: string) => {
  try {
    const { error } = await supabase
      .from('user_integrations')
      .update({
        status: 'inactive',
        updated_at: new Date().toISOString()
      })
      .eq('id', integrationId);

    if (error) {
      console.error('Error disconnecting integration:', error);
      throw error;
    }

    console.log('Successfully disconnected integration');
  } catch (error) {
    console.error('Database service error:', error);
    throw error;
  }
};
