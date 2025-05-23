
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IntegrationProvider } from '@/services/integrationService';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!integration) return;
    
    setIsLoading(true);
    try {
      await onConnect(integration.id, apiKey);
      onOpenChange(false);
      setApiKey('');
    } catch (error) {
      console.error('Error connecting integration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!integration) return null;

  const isOAuth = integration.authType === 'oauth';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect {integration.name}</DialogTitle>
          <DialogDescription>
            {isOAuth 
              ? `You'll be redirected to ${integration.name} to authorize access to your account.`
              : `Enter your ${integration.name} API key to connect your account.`}
          </DialogDescription>
        </DialogHeader>
        
        {isOAuth ? (
          <div className="space-y-4 pt-4">
            <p className="text-sm text-gray-500">
              You'll be redirected to {integration.name} to authorize Gryt to access your account data. 
              No passwords will be stored, and you can revoke access at any time.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // In a real implementation, this would redirect to OAuth flow
                  alert(`This would redirect to ${integration.name}'s OAuth flow`);
                }}
                style={{ backgroundColor: integration.color }}
              >
                Connect with {integration.name}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">{integration.name} API Key</Label>
              <Input
                id="api-key"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${integration.name} API key`}
                required
              />
              <p className="text-xs text-gray-500">
                Your API key is stored securely and used only to sync your data.
              </p>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!apiKey.trim() || isLoading}
                style={{ backgroundColor: integration.color }}
              >
                {isLoading ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectIntegrationDialog;
