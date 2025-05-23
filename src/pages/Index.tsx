
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import GoalCard from '@/components/GoalCard';
import CreateGoalDialog from '@/components/CreateGoalDialog';
import AIInsights from '@/components/AIInsights';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  milestones: string[];
  completedMilestones: number;
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
      completedMilestones: 2
    },
    {
      id: '2',
      title: 'Learn Spanish',
      description: 'Achieve conversational fluency in Spanish',
      category: 'Education',
      targetDate: '2024-08-15',
      progress: 40,
      milestones: ['Complete Basics', 'Hold 5-min Conversation', 'Read Spanish Book'],
      completedMilestones: 1
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const addGoal = (newGoal: Omit<Goal, 'id' | 'progress' | 'completedMilestones'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      progress: 0,
      completedMilestones: 0
    };
    setGoals([...goals, goal]);
    setIsCreateDialogOpen(false);
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.progress >= 100).length;
  const averageProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)
    : 0;

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <CardTitle className="text-sm font-medium text-gray-600">Average Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{averageProgress}%</div>
              <Progress value={averageProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <AIInsights goals={goals} />

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
      </div>
    </div>
  );
};

export default Index;
