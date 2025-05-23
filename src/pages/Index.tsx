import { useState, useEffect } from 'react';
import { Plus, Calendar, ChevronRight, BarChart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from "sonner";
import GoalCard from '@/components/GoalCard';
import CreateGoalDialog from '@/components/CreateGoalDialog';
import AIInsights from '@/components/AIInsights';
import ChatModal from '@/components/GrytGPT/ChatModal';
import MainNav from '@/components/MainNav';
import { Link } from 'react-router-dom';
import { useGoals, GoalInput } from '@/hooks/useGoals';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const { goals, isLoading, createGoal, updateGoalProgress } = useGoals();
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

  const totalGoals = goals?.length || 0;
  const completedGoals = goals?.filter(goal => goal.progress >= 100).length || 0;
  const averageProgress = goals?.length ? 
    Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0;
  
  // Calculate total active streaks (goals updated in the last 24 hours)
  const today = new Date().toISOString().split('T')[0];
  const totalActiveStreaks = goals?.filter(goal => {
    const updatedAt = new Date(goal.updated_at).toISOString().split('T')[0];
    return updatedAt === today;
  }).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <MainNav />
          <div className="flex items-center gap-2">
            {user && (
              <div className="text-sm text-gray-600 mr-2">
                {user.email}
              </div>
            )}
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </div>

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

        {/* Dream Circles Callout */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-blue-600">Dream Circles</h3>
              </div>
              <p className="mb-4 text-gray-700">
                Join micro-communities centered around specific goals. Connect with others on similar journeys, 
                share progress, overcome challenges together, and celebrate each other's wins.
              </p>
              <Link to="/circles">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Find Your Circle
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 md:w-1/3 p-6 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-3xl font-bold mb-2">6+</div>
                <div className="text-sm">Active Dream Circles</div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        {goals && goals.length > 0 && <AIInsights goals={goals} />}

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
                {isLoading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : goals?.filter(goal => {
                  const daysLeft = Math.ceil(
                    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  return daysLeft <= 14 && daysLeft > 0;
                }).length > 0 ? (
                  <ul className="space-y-3">
                    {goals?.filter(goal => {
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
                {isLoading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : goals?.filter(goal => goal.progress > 0).length > 0 ? (
                  <ul className="space-y-3">
                    {goals
                      ?.filter(goal => goal.progress > 0)
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
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mb-4"></div>
            <p className="text-gray-600">Loading your goals...</p>
          </div>
        ) : goals?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <GoalCard 
                key={goal.id} 
                goal={goal}
                onUpdateProgress={handleUpdateProgress}
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
        <ChatModal goals={goals || []} />
      </div>
    </div>
  );
};

export default Index;
