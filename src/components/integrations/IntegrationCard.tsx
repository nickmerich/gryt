
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IntegrationProvider } from '@/services/integration/types';
import { CheckCircle, Loader } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const { id, name, description, category, status, color, connected } = integration;

  const handleAction = async () => {
    setIsLoading(true);
    
    try {
      if (connected) {
        onDisconnect(integration);
      } else if (status === 'available') {
        onConnect(integration);
      }
    } finally {
      // Reset loading state after a brief delay to show feedback
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className={`bg-white dark:bg-gryt-dark border rounded-lg overflow-hidden transition-all hover:shadow-md ${connected ? 'border-green-200' : 'border-gray-200 dark:border-gray-800'}`}>
      <div 
        className="h-2" 
        style={{ backgroundColor: connected ? '#10b981' : color }}
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div 
              className="w-10 h-10 rounded-md flex items-center justify-center relative" 
              style={{ backgroundColor: `${color}20` }}
            >
              <span className="text-lg">{name.substring(0, 1)}</span>
              {connected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gryt-dark dark:text-white">{name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{category}</p>
            </div>
          </div>
          {status === 'coming_soon' ? (
            <Badge variant="outline" className="text-xs">Coming Soon</Badge>
          ) : connected ? (
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          ) : null}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 mb-4">
          {description}
        </p>
        
        <Button
          variant={connected ? "outline" : "default"}
          size="sm"
          className={`w-full ${connected 
            ? "border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700" 
            : ""
          } min-h-[36px]`}
          onClick={handleAction}
          disabled={status === 'coming_soon' || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              {connected ? 'Disconnecting...' : 'Connecting...'}
            </div>
          ) : connected ? (
            'Disconnect'
          ) : status === 'coming_soon' ? (
            'Coming Soon'
          ) : (
            'Connect'
          )}
        </Button>
      </div>
    </div>
  );
};

export default IntegrationCard;
