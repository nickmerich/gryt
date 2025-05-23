
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import GhibliLayout from '@/components/GhibliLayout';
import IntegrationsGrid from '@/components/integrations/IntegrationsGrid';
import ConnectIntegrationDialog from '@/components/integrations/ConnectIntegrationDialog';
import { useIntegrations } from '@/hooks/useIntegrations';
import { IntegrationProvider, getIntegrationsByCategory } from '@/services/integrationService';

const Integrations = () => {
  const navigate = useNavigate();
  const { 
    getIntegrationsWithStatus, 
    connect, 
    disconnect, 
    isLoading 
  } = useIntegrations();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationProvider | null>(null);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  
  const allIntegrations = getIntegrationsWithStatus();
  const categorizedIntegrations = getIntegrationsByCategory().map(category => ({
    ...category,
    integrations: category.integrations.map(integration => ({
      ...integration,
      connected: allIntegrations.find(i => i.id === integration.id)?.connected || false
    }))
  }));
  
  const filteredIntegrations = allIntegrations.filter(integration => 
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const connectedIntegrations = allIntegrations.filter(integration => integration.connected);
  
  const handleConnect = (integration: IntegrationProvider) => {
    setSelectedIntegration(integration);
    setIsConnectDialogOpen(true);
  };
  
  const handleDisconnect = (integration: IntegrationProvider) => {
    if (confirm(`Are you sure you want to disconnect ${integration.name}?`)) {
      const userIntegration = allIntegrations.find(i => i.id === integration.id)?.connectionDetails;
      if (userIntegration?.id) {
        disconnect(userIntegration.id);
      }
    }
  };
  
  const handleConnectConfirm = async (providerId: string, token: string) => {
    await connect(providerId, token);
  };

  return (
    <GhibliLayout illustrationType="grass" className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4 text-gryt-blue hover:text-gryt-blue/70 hover:bg-gryt-blue/10 -ml-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <h1 className="text-3xl font-bold tracking-tight mb-2">Integrations</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Connect your favorite tools and platforms to automatically track your progress
        </p>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search integrations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({allIntegrations.length})</TabsTrigger>
            <TabsTrigger value="connected">
              Connected ({connectedIntegrations.length})
            </TabsTrigger>
            {categorizedIntegrations.map(category => (
              <TabsTrigger key={category.category} value={category.category.toLowerCase()}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            {isLoading ? (
              <div className="text-center py-12">Loading integrations...</div>
            ) : (
              <IntegrationsGrid
                integrations={filteredIntegrations}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                emptyMessage={searchQuery ? 'No integrations match your search' : 'No integrations available'}
              />
            )}
          </TabsContent>
          
          <TabsContent value="connected">
            <IntegrationsGrid
              integrations={connectedIntegrations.filter(i => 
                i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                i.description.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              emptyMessage="You haven't connected any integrations yet"
            />
          </TabsContent>
          
          {categorizedIntegrations.map(category => (
            <TabsContent key={category.category} value={category.category.toLowerCase()}>
              <IntegrationsGrid
                integrations={category.integrations.filter(i => 
                  i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  i.description.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                emptyMessage={`No ${category.category.toLowerCase()} integrations match your search`}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <ConnectIntegrationDialog
        integration={selectedIntegration}
        open={isConnectDialogOpen}
        onOpenChange={setIsConnectDialogOpen}
        onConnect={handleConnectConfirm}
      />
    </GhibliLayout>
  );
};

export default Integrations;
