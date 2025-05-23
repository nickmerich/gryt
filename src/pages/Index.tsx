import { useState, useEffect } from 'react';
import { Plus, Calendar, ChevronRight, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from "sonner";
import GoalCard from '@/components/GoalCard';
import CreateGoalDialog from '@/components/CreateGoalDialog';
import AIInsights from '@/components/AIInsights';
import ChatModal from '@/components/GrytGPT/ChatModal';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  milestones: string[];
  completedMilestones: number;
  streaks?: number;
  lastCheckin?: string;
}

const Index = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Run a Marathon',
      description: 'Complete a full 26.2 mile marathon by the end of the year',
      category: 'Health & Fitness',
      targetDate: '2024-12-31',
      progress: 65,
      milestones: ['Run 5K', 'Run 10K', 'Run Half Marathon', 'Complete Training Plan'],
      completedMilestones: 2,
      streaks: 12,
      lastCheckin: new Date().toISOString().split('T')[0]
    },
    {
      id: '2',
      title: 'Learn Spanish',
      description: 'Achieve conversational fluency in Spanish',
      category: 'Education',
      targetDate: '2024-08-15',
      progress: 40,
      milestones: ['Complete Basics', 'Hold 5-min Conversation', 'Read Spanish Book'],
      completedMilestones: 1,
      streaks: 8,
      lastCheckin: new Date().toISOString().split('T')[0]
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [streakUpdated, setStreakUpdated] = useState(false);

  // Check if we need to update streaks on first load
  useEffect(() => {
    if (!streakUpdated) {
      checkAndUpdateStreaks();
      setStreakUpdated(true);
    }
  }, [streakUpdated]);

  const addGoal = (newGoal: Omit<Goal, 'id' | 'progress' | 'completedMilestones' | 'streaks' | 'lastCheckin'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      progress: 0,
      completedMilestones: 0,
      streaks: 0,
      lastCheckin: new Date().toISOString().split('T')[0]
    };
    setGoals([...goals, goal]);
    setIsCreateDialogOpen(false);
    toast.success("New goal created successfully!");
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedGoal = { ...goal, progress: newProgress };
        
        // If progress is significantly higher, increment completed milestones
        const oldMilestonesCompleted = goal.completedMilestones;
        const milestoneCount = goal.milestones.length;
        const expectedCompletedMilestones = Math.floor((newProgress / 100) * milestoneCount);
        
        if (expectedCompletedMilestones > oldMilestonesCompleted) {
          updatedGoal.completedMilestones = expectedCompletedMilestones;
          const milestoneName = goal.milestones[oldMilestonesCompleted];
          setTimeout(() => {
            toast.success(`🎉 Milestone completed: ${milestoneName}!`, {
              duration: 4000,
            });
          }, 500);
        }
        
        return updatedGoal;
      }
      return goal;
    }));
    
    // Increment streak for the goal
    incrementStreak(goalId);
  };

  const incrementStreak = (goalId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        if (goal.lastCheckin !== today) {
          const updatedGoal = {
            ...goal,
            streaks: (goal.streaks || 0) + 1,
            lastCheckin: today
          };
          
          // Show streak notification for significant streaks
          if (updatedGoal.streaks && updatedGoal.streaks % 5 === 0) {
            setTimeout(() => {
              toast.success(`🔥 ${updatedGoal.streaks} day streak on "${goal.title}"! Keep it up!`, {
                duration: 5000,
              });
            }, 1000);
          }
          
          return updatedGoal;
        }
      }
      return goal;
    }));
  };

  const checkAndUpdateStreaks = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    setGoals(goals.map(goal => {
      // If last check-in was more than 1 day ago, reset streak
      if (goal.lastCheckin && goal.lastCheckin < yesterday) {
        return {
          ...goal,
          streaks: 0
        };
      }
      return goal;
    }));
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.progress >= 100).length;
  const averageProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0;
  
  // Calculate total active streaks across all goals
  const totalActiveStreaks = goals.reduce((sum, goal) => {
    return sum + (goal.streaks || 0 > 0 ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to <span className="text-blue-600">Gryt</span>
          </h1>
          <p className="text-lg text-gray-600">Your AI-powered goal achievement companion</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalGoals}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedGoals}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{totalActiveStreaks}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{averageProgress}%</div>
              <Progress value={averageProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <AIInsights goals={goals} />

        {/* Weekly Review Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Weekly Review</h2>
            <Button variant="ghost" className="text-blue-600 p-0">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-gray-700 text-base">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {goals.filter(goal => {
                  const daysLeft = Math.ceil(
                    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  return daysLeft <= 14 && daysLeft > 0;
                }).length > 0 ? (
                  <ul className="space-y-3">
                    {goals.filter(goal => {
                      const daysLeft = Math.ceil(
                        (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                      );
                      return daysLeft <= 14 && daysLeft > 0;
                    }).slice(0, 3).map(goal => {
                      const daysLeft = Math.ceil(
                        (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                      );
                      return (
                        <li key={goal.id} className="flex justify-between">
                          <span className="text-gray-700">{goal.title}</span>
                          <span className={`font-medium ${
                            daysLeft <= 3 ? 'text-red-600' : 'text-orange-600'
                          }`}>
                            {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming deadlines in the next 14 days.</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-gray-700 text-base">
                  <BarChart className="w-4 h-4 mr-2 text-green-500" />
                  Progress Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {goals.filter(goal => goal.progress > 0).length > 0 ? (
                  <ul className="space-y-3">
                    {goals
                      .filter(goal => goal.progress > 0)
                      .sort((a, b) => b.progress - a.progress)
                      .slice(0, 3)
                      .map(goal => (
                        <li key={goal.id} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-700">{goal.title}</span>
                            <span className="font-medium text-blue-600">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-1.5" />
                        </li>
                      ))
                    }
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No progress recorded yet. Start working on your goals!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Goals</h2>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {/* Goals Grid */}
        {goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onUpdateProgress={updateGoalProgress}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No goals yet</h3>
              <p className="text-gray-600 mb-4">Start your journey by creating your first goal!</p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create Goal Dialog */}
        <CreateGoalDialog 
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateGoal={addGoal}
        />
        
        {/* GrytGPT Chat Modal */}
        <ChatModal goals={goals} />
      </div>
    </div>
  );
};

export default Index;
