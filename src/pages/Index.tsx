import { useState } from 'react';
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
import GhibliLayout from '@/components/GhibliLayout';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';

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
    <GhibliLayout illustrationType="mountains">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {user && (
              <div className="text-sm text-gray-600 mr-2">
                {user.email}
              </div>
            )}
            <GhibliButton 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gryt-red hover:bg-gryt-red/90 text-white"
              glowColor="red"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </GhibliButton>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 slide-animation">
          <h1 className="ghibli-title mb-2">
            Welcome to <span className="text-gryt-red">Gryt</span>
          </h1>
          <p className="ghibli-subtitle">Your AI-powered goal achievement companion</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
          <GhibliCard className="pulse-animation">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gryt-dark dark:text-gryt-light">Active Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gryt-blue">{totalGoals}</div>
            </CardContent>
          </GhibliCard>
          
          <GhibliCard className="pulse-animation">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gryt-dark dark:text-gryt-light">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedGoals}</div>
            </CardContent>
          </GhibliCard>
          
          <GhibliCard className="pulse-animation">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gryt-dark dark:text-gryt-light">Active Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{totalActiveStreaks}</div>
            </CardContent>
          </GhibliCard>
          
          <GhibliCard className="pulse-animation">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gryt-dark dark:text-gryt-light">Avg Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{averageProgress}%</div>
              <Progress value={averageProgress} className="mt-2" indicatorClassName="bg-gryt-red" />
            </CardContent>
          </GhibliCard>
        </div>

        {/* Dream Circles Callout */}
        <GhibliCard className="mb-8 overflow-hidden" glow={true}>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 p-6">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-gryt-blue mr-2" />
                <h3 className="text-xl font-semibold text-gryt-blue">Dream Circles</h3>
              </div>
              <p className="mb-4 text-gryt-dark dark:text-gryt-gray">
                Join micro-communities centered around specific goals. Connect with others on similar journeys, 
                share progress, overcome challenges together, and celebrate each other's wins.
              </p>
              <Link to="/circles">
                <GhibliButton className="bg-gryt-blue hover:bg-gryt-blue/90 text-white" glowColor="blue">
                  Find Your Circle
                </GhibliButton>
              </Link>
            </div>
            <div className="bg-gradient-to-r from-gryt-blue to-gryt-blue/70 md:w-1/3 p-6 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-3xl font-bold mb-2">6+</div>
                <div className="text-sm">Active Dream Circles</div>
              </div>
            </div>
          </div>
        </GhibliCard>

        {/* AI Insights */}
        {goals && goals.length > 0 && <AIInsights goals={goals} />}

        {/* Weekly Review Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="ghibli-subtitle">Weekly Review</h2>
            <Button variant="ghost" className="text-gryt-blue p-0">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GhibliCard>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-gryt-dark text-base dark:text-gryt-light">
                  <Calendar className="w-4 h-4 mr-2 text-gryt-red" />
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
            </GhibliCard>

            <GhibliCard>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-gryt-dark text-base dark:text-gryt-light">
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
            </GhibliCard>
          </div>
        </div>

        {/* Goals Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="ghibli-title">Your Goals</h2>
          <GhibliButton 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gryt-red hover:bg-gryt-red/90 text-white"
            glowColor="red"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </GhibliButton>
        </div>

        {/* Goals Grid */}
        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gryt-red mb-4"></div>
            <p className="text-gryt-dark dark:text-gryt-gray">Loading your goals...</p>
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
          <GhibliCard>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold text-gryt-dark dark:text-gryt-gray mb-2">No goals yet</h3>
              <p className="text-gryt-dark/70 dark:text-gryt-gray/70 mb-4">Start your journey by creating your first goal!</p>
              <GhibliButton 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gryt-red hover:bg-gryt-red/90 text-white"
                glowColor="red"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Goal
              </GhibliButton>
            </CardContent>
          </GhibliCard>
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
    </GhibliLayout>
  );
};

export default Index;
