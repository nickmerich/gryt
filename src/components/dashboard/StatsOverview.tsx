
import { Target, TrendingUp, Calendar, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Goal } from '@/hooks/useGoals';

interface StatsOverviewProps {
  goals?: Goal[];
}

const StatsOverview = ({ goals = [] }: StatsOverviewProps) => {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.progress >= 100).length;
  const avgProgress = totalGoals > 0 ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / totalGoals) : 0;
  const activeGoals = goals.filter(goal => goal.progress < 100).length;

  const stats = [
    {
      title: "Total Goals",
      value: totalGoals,
      icon: Target,
      borderStyle: "border-l-4 border-l-foreground",
      description: "Your journey milestones"
    },
    {
      title: "Completed",
      value: completedGoals,
      icon: TrendingUp,
      borderStyle: "border-l-4 border-l-muted-foreground",
      description: "Achievements unlocked"
    },
    {
      title: "Average Progress",
      value: `${avgProgress}%`,
      icon: Calendar,
      borderStyle: "border-t-4 border-t-foreground",
      description: "Overall momentum"
    },
    {
      title: "Active Goals",
      value: activeGoals,
      icon: Flame,
      borderStyle: "border-t-4 border-t-muted-foreground",
      description: "Currently pursuing"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={stat.title} className={cn("bg-background hover:bg-background-subtle transition-all duration-200", stat.borderStyle)} style={{ animationDelay: `${index * 0.1}s` }}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-background" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <CardTitle className="text-lg text-foreground">{stat.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground font-medium">{stat.description}</p>
            {stat.title === "Average Progress" && (
              <Progress value={avgProgress} className="mt-3 h-2" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
