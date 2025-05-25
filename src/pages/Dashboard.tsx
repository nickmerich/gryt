
import { useState } from "react";
import GhibliLayout from "@/components/GhibliLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsOverview from "@/components/dashboard/StatsOverview";
import GoalsList from "@/components/dashboard/GoalsList";
import WeeklyReview from "@/components/dashboard/WeeklyReview";
import IntegrationsModule from "@/components/dashboard/IntegrationsModule";
import DreamCirclesCallout from "@/components/dashboard/DreamCirclesCallout";
import MotivationDashboard from "@/components/motivation/MotivationDashboard";
import CreateGoalDialog from "@/components/CreateGoalDialog";
import { useGoals } from "@/hooks/useGoals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { goals, isLoading, createGoal, editGoal, uploadGoalImage, updateGoalProgress } = useGoals();

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
    if (imageFile) {
      await uploadGoalImage(imageFile, goalId);
    }
    await editGoal.mutateAsync({
      id: goalId,
      title,
      description,
      category,
      target_date: targetDate
    });
  };

  return (
    <GhibliLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader />
        
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="motivation">Motivation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8 mt-8">
            <StatsOverview goals={goals} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <GoalsList 
                  goals={goals?.slice(0, 3)} 
                  isLoading={isLoading}
                  onOpenCreateDialog={() => setIsCreateDialogOpen(true)}
                  onUpdateGoalProgress={handleUpdateProgress}
                  onEditGoal={handleEditGoal}
                />
                <WeeklyReview />
              </div>
              <div className="space-y-8">
                <IntegrationsModule />
                <DreamCirclesCallout />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="goals" className="mt-8">
            <GoalsList 
              goals={goals} 
              isLoading={isLoading}
              onOpenCreateDialog={() => setIsCreateDialogOpen(true)}
              onUpdateGoalProgress={handleUpdateProgress}
              onEditGoal={handleEditGoal}
            />
          </TabsContent>
          
          <TabsContent value="motivation" className="mt-8">
            <MotivationDashboard />
          </TabsContent>
        </Tabs>

        <CreateGoalDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateGoal={createGoal}
        />
      </div>
    </GhibliLayout>
  );
};

export default Dashboard;
