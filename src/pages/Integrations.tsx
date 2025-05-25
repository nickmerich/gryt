
import { useState } from 'react';
import GhibliLayout from '@/components/GhibliLayout';
import IntegrationsGrid from '@/components/integrations/IntegrationsGrid';
import ConnectIntegrationDialog from '@/components/integrations/ConnectIntegrationDialog';
import PostConnectionGoalSuggestions from '@/components/integrations/PostConnectionGoalSuggestions';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { useIntegrations } from '@/hooks/useIntegrations';
import { IntegrationProvider } from '@/services/integration/types';
import { toast } from 'sonner';

const Integrations = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGoalSuggestionsOpen, setIsGoalSuggestionsOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationProvider | null>(null);
  const [recentlyConnected, setRecentlyConnected] = useState<string>('');
  const { getIntegrationsWithStatus, connect, disconnect, isLoading } = useIntegrations();

  const integrations = getIntegrationsWithStatus();

  const handleConnect = (integration: IntegrationProvider) => {
    setSelectedIntegration(integration);
    setIsDialogOpen(true);
  };

  const handleDisconnect = async (integration: IntegrationProvider) => {
    const userIntegration = integrations.find(i => i.id === integration.id)?.connectionDetails;
    if (userIntegration) {
      await disconnect(userIntegration.id);
    }
  };

  const handleConnectSubmit = async (providerId: string, token: string) => {
    await connect(providerId, token);
    setIsDialogOpen(false);
    
    // Show goal suggestions after successful connection
    const integration = integrations.find(i => i.id === providerId);
    if (integration) {
      setRecentlyConnected(integration.name);
      setIsGoalSuggestionsOpen(true);
    }
    
    setSelectedIntegration(null);
  };

  const handleCreateGoalFromSuggestion = (suggestion: any) => {
    // Here you would typically create a goal using your goal creation logic
    toast.success(`Goal "${suggestion.title}" created! Start tracking your progress.`);
    console.log('Creating goal from suggestion:', suggestion);
  };

  if (isLoading) {
    return (
      <GhibliLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </GhibliLayout>
    );
  }

  return (
    <GhibliLayout className="max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-black">
            Connect Your Apps
          </h1>
          <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed">
            Sync your favorite fitness, productivity, and lifestyle apps to automatically track progress toward your goals.
          </p>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            size="lg"
            className="modern-button"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Integration
          </Button>
        </div>

        {/* Integrations Grid */}
        <IntegrationsGrid 
          integrations={integrations}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />

        {/* Benefits Section */}
        <div className="modern-card p-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Why Connect Your Apps?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-black mb-2">Automatic Tracking</h3>
              <p className="text-black">No manual entry needed. Your progress updates automatically as you use your favorite apps.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-black mb-2">Goal Alignment</h3>
              <p className="text-black">Connect activities directly to your goals for clearer progress visualization.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-200 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-black mb-2">Motivation Boost</h3>
              <p className="text-black">See your achievements across all platforms in one unified dashboard.</p>
            </div>
          </div>
        </div>

        {/* Connect Integration Dialog */}
        <ConnectIntegrationDialog 
          integration={selectedIntegration}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onConnect={handleConnectSubmit}
        />

        {/* Post-Connection Goal Suggestions */}
        <PostConnectionGoalSuggestions
          integration={recentlyConnected}
          open={isGoalSuggestionsOpen}
          onOpenChange={setIsGoalSuggestionsOpen}
          onCreateGoal={handleCreateGoalFromSuggestion}
        />
      </div>
    </GhibliLayout>
  );
};

export default Integrations;
