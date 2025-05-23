
import { useState } from 'react';
import { toast } from "sonner";
import CreateGoalDialog from '@/components/CreateGoalDialog';
import AIInsights from '@/components/AIInsights';
import ChatModal from '@/components/GrytGPT/ChatModal';
import { useGoals, GoalInput, EditGoalInput } from '@/hooks/useGoals';
import { useAuth } from '@/contexts/AuthContext';
import GhibliLayout from '@/components/GhibliLayout';
import ProgressGallery from '@/components/ProgressGallery';
import AISuggestions from '@/components/AISuggestions';

// Import refactored components
import StatsOverview from '@/components/dashboard/StatsOverview';
import DreamCirclesCallout from '@/components/dashboard/DreamCirclesCallout';
import WeeklyReview from '@/components/dashboard/WeeklyReview';
import GoalsList from '@/components/dashboard/GoalsList';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';

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

  const addGoal = (newGoal: GoalInput) => {
    createGoal.mutate(newGoal, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      }
    });
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
    <GhibliLayout illustrationType="mountains">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <WelcomeHeader onOpenCreateDialog={() => setIsCreateDialogOpen(true)} />

        {/* Stats Overview */}
        <StatsOverview goals={goals} />

        {/* Progress Visualization Gallery */}
        <div className="mb-8">
          <h2 className="ghibli-subtitle mb-4">Your Growth Visualization</h2>
          <ProgressGallery goals={goals} />
        </div>

        {/* AI Goal Suggestions */}
        {goals && goals.length > 0 && <AISuggestions goals={goals} />}

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
