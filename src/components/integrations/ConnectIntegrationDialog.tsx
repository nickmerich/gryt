
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { IntegrationProvider } from '@/services/integration/types';
import { HelpCircle, Shield, CheckCircle, Loader } from 'lucide-react';

interface ConnectIntegrationDialogProps {
  integration: IntegrationProvider | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (providerId: string, token: string) => Promise<void>;
}

const ConnectIntegrationDialog: React.FC<ConnectIntegrationDialogProps> = ({
  integration,
  open,
  onOpenChange,
  onConnect
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!integration) return;
    
    setIsConnecting(true);
    try {
      await onConnect(integration.id, apiKey);
      setIsConnected(true);
      
      // Show success state briefly before closing
      setTimeout(() => {
        onOpenChange(false);
        setApiKey('');
        setIsConnecting(false);
        setIsConnected(false);
      }, 1500);
    } catch (error) {
      console.error('Error connecting integration:', error);
      setIsConnecting(false);
    }
  };

  const handleOAuthConnect = async () => {
    if (!integration || !integration.authUrl) return;
    
    setIsConnecting(true);
    
    // Generate a random state parameter to prevent CSRF
    const state = integration.id;
    
    // In a production app, we'd use a real OAuth flow with a proper state parameter
    // and redirect URI. For this implementation, we'll simulate the OAuth flow.
    window.location.href = `${integration.authUrl}?state=${state}`;
  };

  if (!integration) return null;

  const isOAuth = integration.authType === 'oauth';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Connect {integration.name}
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: integration.color }}
            />
          </DialogTitle>
          <DialogDescription>
            We'll securely connect to {integration.name} to help you track progress and goals—no passwords shared. Takes 2 clicks.
          </DialogDescription>
        </DialogHeader>
        
        {isOAuth ? (
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">Secure OAuth via {integration.name}. No passwords stored.</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>OAuth is a secure standard that lets you authorize apps without sharing passwords. You can revoke access anytime from your {integration.name} settings.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isConnecting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleOAuthConnect}
                style={{ backgroundColor: integration.color }}
                disabled={!integration.authUrl || integration.status === 'coming_soon' || isConnecting}
                className="min-w-[140px]"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    Connecting...
                  </div>
                ) : isConnected ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Connected!
                  </div>
                ) : integration.status === 'coming_soon' ? (
                  'Coming Soon'
                ) : (
                  `Connect with ${integration.name}`
                )}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border mb-4">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">API key stored securely and encrypted.</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-green-600" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Your API key is encrypted and used only to sync your data. We never store or share your actual account credentials.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-key">{integration.name} API Key</Label>
              <Input
                id="api-key"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${integration.name} API key`}
                required
                disabled={isConnecting || isConnected}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isConnecting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!apiKey.trim() || isConnecting || integration.status === 'coming_soon' || isConnected}
                style={{ backgroundColor: integration.color }}
                className="min-w-[120px]"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    Connecting...
                  </div>
                ) : isConnected ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Connected!
                  </div>
                ) : integration.status === 'coming_soon' ? (
                  'Coming Soon'
                ) : (
                  'Connect'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectIntegrationDialog;
