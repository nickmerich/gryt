
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IntegrationProvider } from '@/services/integrationService';

interface IntegrationCardProps {
  integration: IntegrationProvider & { connected?: boolean };
  onConnect: (integration: IntegrationProvider) => void;
  onDisconnect: (integration: IntegrationProvider) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onConnect,
  onDisconnect,
}) => {
  const { id, name, description, category, status, color, connected } = integration;

  const handleAction = () => {
    if (connected) {
      onDisconnect(integration);
    } else if (status === 'available') {
      onConnect(integration);
    }
  };

  return (
    <div className="bg-white dark:bg-gryt-dark border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-all hover:shadow-md">
      <div 
        className="h-2" 
        style={{ backgroundColor: color }}
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div 
              className="w-10 h-10 rounded-md flex items-center justify-center" 
              style={{ backgroundColor: `${color}20` }}
            >
              <span className="text-lg">{name.substring(0, 1)}</span>
            </div>
            <div>
              <h3 className="font-medium text-gryt-dark dark:text-white">{name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{category}</p>
            </div>
          </div>
          {status === 'coming_soon' ? (
            <Badge variant="outline" className="text-xs">Coming Soon</Badge>
          ) : connected ? (
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Connected</Badge>
          ) : null}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 mb-4">
          {description}
        </p>
        
        <Button
          variant={connected ? "outline" : "default"}
          size="sm"
          className={connected ? "w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700" : "w-full"}
          onClick={handleAction}
          disabled={status === 'coming_soon'}
        >
          {connected ? 'Disconnect' : status === 'coming_soon' ? 'Coming Soon' : 'Connect'}
        </Button>
      </div>
    </div>
  );
};

export default IntegrationCard;
