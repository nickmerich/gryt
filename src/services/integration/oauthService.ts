
import { supabase } from "@/integrations/supabase/client";
import { UserIntegration } from "./types";

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
    
    // Ensure we return data with the correct types
    return {
      ...data,
      status: (data.status as 'active' | 'expired' | 'error')
    } as UserIntegration;
  } catch (err) {
    console.error('OAuth callback handling failed:', err);
    return null;
  }
};
