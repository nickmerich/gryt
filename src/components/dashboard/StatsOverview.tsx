
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import GhibliCard from '@/components/GhibliCard';
import { Goal } from '@/hooks/useGoals';

interface StatsOverviewProps {
  goals?: Goal[];
}

const StatsOverview = ({ goals = [] }: StatsOverviewProps) => {
  const totalGoals = goals?.length || 0;
  const completedGoals = goals?.filter(goal => goal.progress >= 100).length || 0;
  const averageProgress = goals?.length ? 
    Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0;
  
  // Calculate total active streaks (goals updated in the last 24 hours)
  const today = new Date().toISOString().split('T')[0];
  const totalActiveStreaks = goals?.filter(goal => {
    if (!goal.updated_at) return false;
    const updatedAt = new Date(goal.updated_at).toISOString().split('T')[0];
    return updatedAt === today;
  }).length || 0;

  return (
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
  );
};

export default StatsOverview;
