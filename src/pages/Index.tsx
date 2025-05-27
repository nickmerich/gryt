
import { useState } from 'react';
import { toast } from "sonner";
import CreateGoalDialog from '@/components/CreateGoalDialog';
import IdentityGoalCreation from '@/components/identity/IdentityGoalCreation';
import IdentityTracker from '@/components/identity/IdentityTracker';
import MicroCelebration from '@/components/celebration/MicroCelebration';
import PersonalCoach from '@/components/coach/PersonalCoach';
import AIInsights from '@/components/AIInsights';
import ChatModal from '@/components/GrytGPT/ChatModal';
import { useGoals, GoalInput, EditGoalInput } from '@/hooks/useGoals';
import { useCelebration } from '@/hooks/useCelebration';
import { usePersonalCoach } from '@/hooks/usePersonalCoach';
import { useAuth } from '@/contexts/AuthContext';
import GhibliLayout from '@/components/GhibliLayout';
import AISuggestions from '@/components/AISuggestions';
import { useIsMobile } from '@/hooks/use-mobile';

// Import refactored components
import StatsOverview from '@/components/dashboard/StatsOverview';
import DreamCirclesCallout from '@/components/dashboard/DreamCirclesCallout';
import WeeklyReview from '@/components/dashboard/WeeklyReview';
import GoalsList from '@/components/dashboard/GoalsList';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import IntegrationsModule from '@/components/dashboard/IntegrationsModule';
import MissionStatement from '@/components/dashboard/MissionStatement';
import GoalDiscoveryPrompt from '@/components/dashboard/GoalDiscoveryPrompt';

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
  const [showIdentityCreation, setShowIdentityCreation] = useState(false);
  const isMobile = useIsMobile();
  
  // New behavior change features
  const { 
    showCelebration, 
    celebrationData, 
    closeCelebration,
    celebrateFirstStep,
    celebrateConsistency 
  } = useCelebration();
  
  const { coachState, hideCoach, updateMood, getCoachInsight } = usePersonalCoach(goals || []);

  const addGoal = (newGoal: GoalInput) => {
    createGoal.mutate(newGoal);
  };

  const addIdentityGoal = (goalData: any) => {
    createGoal.mutate(goalData);
    setShowIdentityCreation(false);
    toast.success("Your transformation journey begins! 🔥");
  };

  const handleUpdateProgress = (goalId: string, newProgress: number) => {
    const goal = goals?.find(g => g.id === goalId);
    if (goal) {
      // Check for celebrations
      if (goal.progress === 0 && newProgress > 0) {
        celebrateFirstStep(goal);
      } else if (newProgress > goal.progress && newProgress % 25 === 0) {
        celebrateConsistency(goal, Math.floor(newProgress / 25));
      }
    }
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

      if (imageFile) {
        const imageUrl = await uploadGoalImage(imageFile, goalId);
        editData.image_url = imageUrl;
      }

      await editGoal.mutateAsync(editData);
    } catch (error) {
      console.error("Error editing goal:", error);
      toast.error("Failed to edit goal");
    }
  };

  return (
    <GhibliLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Enhanced Welcome */}
        <WelcomeHeader 
          onOpenCreateDialog={() => setShowIdentityCreation(true)}
          subtitle={getCoachInsight()}
        />

        {/* Mission Statement & Core Problem */}
        <MissionStatement />

        {/* Goal Discovery Framework */}
        <GoalDiscoveryPrompt onCreateGoal={addIdentityGoal} />

        {/* Identity Transformation Section */}
        {goals && goals.length > 0 && (
          <div className="mb-8">
            <IdentityTracker goals={goals} />
          </div>
        )}

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
          onOpenCreateDialog={() => setShowIdentityCreation(true)}
          onUpdateGoalProgress={handleUpdateProgress}
          onEditGoal={handleEditGoal}
        />

        {/* Legacy Create Goal Dialog */}
        <CreateGoalDialog 
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateGoal={addGoal}
        />
        
        {/* Identity-Focused Goal Creation */}
        {showIdentityCreation && (
          <IdentityGoalCreation
            onCreateGoal={addIdentityGoal}
            onClose={() => setShowIdentityCreation(false)}
          />
        )}
        
        {/* Micro-Celebration System */}
        {showCelebration && celebrationData && (
          <MicroCelebration
            trigger={celebrationData.type}
            achievement={celebrationData.achievement}
            identityShift={celebrationData.identityShift}
            progress={celebrationData.progress}
            onClose={closeCelebration}
          />
        )}
        
        {coachState.showCoach && (
          <PersonalCoach
            goals={goals || []}
            userProgress={{}}
            onResponse={(response) => {
              updateMood(response.includes('struggling') ? 'struggling' : 'good');
            }}
            onClose={hideCoach}
          />
        )}
        
        <ChatModal goals={goals || []} />
      </div>
    </GhibliLayout>
  );
};

export default Index;
