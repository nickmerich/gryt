
import React from 'react';
import IntegrationCard from './IntegrationCard';
import { IntegrationProvider } from '@/services/integrationService';

interface IntegrationsGridProps {
  integrations: (IntegrationProvider & { connected?: boolean })[];
  onConnect: (integration: IntegrationProvider) => void;
  onDisconnect: (integration: IntegrationProvider) => void;
  emptyMessage?: string;
}

const IntegrationsGrid: React.FC<IntegrationsGridProps> = ({
  integrations,
  onConnect,
  onDisconnect,
  emptyMessage = 'No integrations found'
}) => {
  if (integrations.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {integrations.map(integration => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
        />
      ))}
    </div>
  );
};

export default IntegrationsGrid;
