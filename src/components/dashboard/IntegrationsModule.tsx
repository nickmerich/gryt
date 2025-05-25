
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useIntegrations } from '@/hooks/useIntegrations';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const IntegrationsModule = () => {
  const { getIntegrationsWithStatus, userIntegrations, isLoading } = useIntegrations();
  const isMobile = useIsMobile();
  
  // Get the integrations with their connection status
  const integrationsWithStatus = getIntegrationsWithStatus();
  
  // Get only the popular integrations that are available (not coming soon)
  const popularIntegrations = integrationsWithStatus
    .filter(integration => integration.status === 'available')
    .slice(0, isMobile ? 2 : 3); // Show fewer on mobile
  
  const hasConnectedIntegrations = userIntegrations.length > 0;
  
  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gryt-dark/30 border shadow-sm mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Loading integrations...</h3>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-white dark:bg-gryt-dark/30 border shadow-sm mb-8">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Integrations</h3>
          <Link to="/integrations">
            <Button variant="ghost" size="sm" className="text-gryt-blue hover:text-gryt-blue/70 hover:bg-gryt-blue/10 -mr-2">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {hasConnectedIntegrations ? (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {userIntegrations.length} {userIntegrations.length === 1 ? 'tool' : 'tools'} connected
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {userIntegrations.map(integration => {
                const details = integrationsWithStatus.find(i => i.id === integration.provider_id);
                return details ? (
                  <div 
                    key={integration.id}
                    className="flex items-center p-2 rounded-md border"
                    style={{ borderColor: `${details.color}30` }}
                  >
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center mr-2" 
                      style={{ backgroundColor: `${details.color}20` }}
                    >
                      <span className="text-xs" style={{ color: details.color }}>
                        {details.name.substring(0, 1)}
                      </span>
                    </div>
                    <span className="text-sm">{details.name}</span>
                  </div>
                ) : null;
              })}
            </div>
          </>
        ) : (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Track your progress automatically. Connect your favorite tools now.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              {popularIntegrations.map(integration => (
                <Link 
                  key={integration.id}
                  to="/integrations" 
                  className="flex-1"
                >
                  <Button 
                    variant="outline" 
                    className="w-full text-left justify-start border-gray-200 hover:bg-gray-50"
                  >
                    <div 
                      className="w-6 h-6 rounded flex items-center justify-center mr-2" 
                      style={{ backgroundColor: `${integration.color}20` }}
                    >
                      <span className="text-xs" style={{ color: integration.color }}>
                        {integration.name.substring(0, 1)}
                      </span>
                    </div>
                    <span className="truncate">Connect {integration.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <Link to="/integrations">
          <Button className="w-full bg-gryt-blue/10 text-white hover:bg-gryt-blue/20 border border-gryt-blue/20">
            Connect More Tools
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default IntegrationsModule;
