
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ExternalLink, Key, Lock } from 'lucide-react';
import { IntegrationProvider } from '@/services/integration/types';
import { initiateOAuth } from '@/services/integration/oauthService';

interface ConnectIntegrationDialogProps {
  integration: IntegrationProvider | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (providerId: string, token: string) => void;
}

const ConnectIntegrationDialog: React.FC<ConnectIntegrationDialogProps> = ({
  integration,
  open,
  onOpenChange,
  onConnect,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  if (!integration) return null;

  const isOAuthProvider = ['strava', 'garmin', 'whoop', 'apple-health', 'duolingo', 'github', 'youtube'].includes(integration.id);

  const handleOAuthConnect = () => {
    setIsConnecting(true);
    initiateOAuth(integration.id);
  };

  const handleApiKeyConnect = () => {
    if (!apiKey.trim()) return;
    onConnect(integration.id, apiKey);
    setApiKey('');
    onOpenChange(false);
  };

  const getInstructions = () => {
    switch (integration.id) {
      case 'chess-com':
        return 'Enter your Chess.com username to connect your account.';
      case 'lichess':
        return 'Enter your Lichess username to connect your account.';
      case 'goodreads':
        return 'Enter your Goodreads user ID or RSS feed URL.';
      default:
        return isOAuthProvider 
          ? `Click the button below to connect your ${integration.name} account.`
          : 'Enter your API key or username to connect.';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${integration.color}20` }}
            >
              <span className="text-lg font-medium">{integration.name.substring(0, 1)}</span>
            </div>
            Connect {integration.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4 bg-gray-50">
            <p className="text-sm text-gray-600">
              {getInstructions()}
            </p>
          </Card>

          {isOAuthProvider ? (
            <div className="space-y-3">
              <Button 
                onClick={handleOAuthConnect}
                disabled={isConnecting}
                className="w-full"
                style={{ backgroundColor: integration.color }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {isConnecting ? 'Connecting...' : `Connect with ${integration.name}`}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                You'll be redirected to {integration.name} to authorize the connection.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="apiKey" className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  {integration.id.includes('chess') || integration.id === 'lichess' ? 'Username' : 'API Key'}
                </Label>
                <Input
                  id="apiKey"
                  type={integration.id.includes('chess') || integration.id === 'lichess' ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={`Enter your ${integration.id.includes('chess') || integration.id === 'lichess' ? 'username' : 'API key'}`}
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleApiKeyConnect}
                disabled={!apiKey.trim()}
                className="w-full"
              >
                Connect {integration.name}
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3" />
            Your credentials are stored securely and can be removed at any time.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectIntegrationDialog;
