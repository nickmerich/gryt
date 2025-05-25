
export const initiateOAuth = (provider: string, redirectUri?: string) => {
  // Use the existing integration callback route instead of non-existent API routes
  const baseUrl = window.location.origin;
  const callbackUrl = redirectUri || `${baseUrl}/integration-callback`;
  
  console.log(`Initiating OAuth for ${provider} with callback: ${callbackUrl}`);
  
  // For demo purposes, simulate the OAuth flow by directly redirecting to callback with success parameters
  // In a real app, this would redirect to the provider's OAuth URL
  const authUrl = `${callbackUrl}?provider=${provider}&code=demo_code_${Date.now()}&state=${provider}`;
  
  // Small delay to show the connecting state, then redirect
  setTimeout(() => {
    window.location.href = authUrl;
  }, 500);
};

export const handleOAuthCallback = (searchParams: URLSearchParams) => {
  const provider = searchParams.get('provider');
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  console.log('OAuth callback received:', { provider, code, state });
  
  if (!provider || !code) {
    throw new Error('Missing required OAuth parameters');
  }
  
  // Return mock success data that includes what we need for the integration
  return Promise.resolve({
    provider,
    accessToken: `mock_token_${Date.now()}`,
    refreshToken: `mock_refresh_${Date.now()}`,
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
  });
};
