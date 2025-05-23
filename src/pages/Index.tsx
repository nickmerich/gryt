
import { useState } from 'react';
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import CreateGoalDialog from '@/components/CreateGoalDialog';
import AIInsights from '@/components/AIInsights';
import ChatModal from '@/components/GrytGPT/ChatModal';
import { useGoals, GoalInput, EditGoalInput } from '@/hooks/useGoals';
import { useAuth } from '@/contexts/AuthContext';
import GhibliLayout from '@/components/GhibliLayout';
import AISuggestions from '@/components/AISuggestions';
import { useIsMobile } from '@/hooks/use-mobile';
import GhibliButton from '@/components/GhibliButton';

// Import refactored components
import StatsOverview from '@/components/dashboard/StatsOverview';
import DreamCirclesCallout from '@/components/dashboard/DreamCirclesCallout';
import WeeklyReview from '@/components/dashboard/WeeklyReview';
import GoalsList from '@/components/dashboard/GoalsList';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import IntegrationsModule from '@/components/dashboard/IntegrationsModule';

const Index = () => {
  const { user } = useAuth();
  const { 
    goals, 
    isLoading, 
    createGoal, 
    editGoal,
    uploadGoalImage, 
    updateGoalProgress 
  } = useGoals();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const addGoal = (newGoal: GoalInput) => {
    createGoal.mutate(newGoal);
  };

  const handleUpdateProgress = (goalId: string, newProgress: number) => {
    updateGoalProgress.mutate({ goalId, newProgress });
  };

  const handleEditGoal = async (
    goalId: string, 
    title: string, 
    description: string, 
    category: string, 
    targetDate: string, 
    imageFile?: File | null
  ) => {
    try {
      const editData: EditGoalInput = {
        id: goalId,
        title,
        description,
        category,
        target_date: targetDate
      };

      // If image file is provided, upload it first
      if (imageFile) {
        const imageUrl = await uploadGoalImage(imageFile, goalId);
        editData.image_url = imageUrl;
      }

      // Update the goal with all data including image URL if available
      await editGoal.mutateAsync(editData);
    } catch (error) {
      console.error("Error editing goal:", error);
      toast.error("Failed to edit goal");
    }
  };

  return (
    <GhibliLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation and Welcome Message */}
        <WelcomeHeader onOpenCreateDialog={() => setIsCreateDialogOpen(true)} />

        {/* Stats Overview */}
        <StatsOverview goals={goals} />

        {/* Integrations Module - Higher placement on mobile */}
        {isMobile && (
          <IntegrationsModule />
        )}

        {/* AI Goal Suggestions with Tracker */}
        {goals && goals.length > 0 && (
          <AISuggestions 
            goals={goals} 
            onAddGoal={addGoal}
            onUpdateGoalProgress={handleUpdateProgress}
          />
        )}

        {/* Playground Banner */}
        <div className="my-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Gamepad2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-800">New! Gryt Playground</h3>
                <p className="text-blue-700">Try our interactive sandbox where you can experiment with all Gryt features</p>
              </div>
            </div>
            <Link to="/playground">
              <GhibliButton className="bg-gryt-blue hover:bg-gryt-blue/90 text-white whitespace-nowrap">
                Try Playground
              </GhibliButton>
            </Link>
          </div>
        </div>

        {/* Integrations Module - Standard placement on desktop */}
        {!isMobile && (
          <IntegrationsModule />
        )}

        {/* Dream Circles Callout */}
        <DreamCirclesCallout />

        {/* AI Insights */}
        {goals && goals.length > 0 && <AIInsights goals={goals} />}

        {/* Weekly Review Section */}
        <WeeklyReview goals={goals} isLoading={isLoading} />

        {/* Goals Section */}
        <GoalsList 
          goals={goals}
          isLoading={isLoading}
          onOpenCreateDialog={() => setIsCreateDialogOpen(true)}
          onUpdateGoalProgress={handleUpdateProgress}
          onEditGoal={handleEditGoal}
        />

        {/* Create Goal Dialog */}
        <CreateGoalDialog 
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateGoal={addGoal}
        />
        
        {/* GrytGPT Chat Modal */}
        <ChatModal goals={goals || []} />
      </div>
    </GhibliLayout>
  );
};

export default Index;
