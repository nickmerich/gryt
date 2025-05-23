
import { Calendar, CheckCircle, Target, Flame, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (goalId: string, newProgress: number) => void;
}

const GoalCard = ({ goal, onUpdateProgress }: GoalCardProps) => {
  const isCompleted = goal.progress >= 100;
  const daysUntilTarget = Math.ceil(
    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleProgressUpdate = () => {
    const newProgress = Math.min(goal.progress + 10, 100);
    onUpdateProgress(goal.id, newProgress);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Health & Fitness': 'bg-green-100 text-green-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Career': 'bg-purple-100 text-purple-800',
      'Personal': 'bg-orange-100 text-orange-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStreakDescription = (streaks?: number): string => {
    if (!streaks) return "No active streak yet";
    if (streaks === 1) return "1 day streak";
    if (streaks < 5) return `${streaks} day streak`;
    if (streaks < 10) return `${streaks} day streak 🔥`;
    return `${streaks} day streak 🔥🔥`;
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getCategoryColor(goal.category)}>
            {goal.category}
          </Badge>
          {isCompleted && <Trophy className="w-5 h-5 text-yellow-500" />}
          {!isCompleted && goal.streaks && goal.streaks >= 5 && 
            <Badge variant="outline" className="flex items-center gap-1 border-orange-300 text-orange-600">
              <Flame className="w-3 h-3" />
              {goal.streaks}
            </Badge>
          }
        </div>
        <CardTitle className="text-lg font-bold text-gray-900">{goal.title}</CardTitle>
        <CardDescription className="text-gray-600">{goal.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-semibold text-blue-600">{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>

        {/* Streaks */}
        {!isCompleted && goal.streaks !== undefined && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-orange-600">
              <Flame className="w-4 h-4" />
              <span>{getStreakDescription(goal.streaks)}</span>
            </div>
            {goal.lastCheckin && <span className="text-xs text-gray-500">
              Last update: {new Date(goal.lastCheckin).toLocaleDateString()}
            </span>}
          </div>
        )}

        {/* Milestones */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Milestones ({goal.completedMilestones}/{goal.milestones.length})
            </span>
          </div>
          <div className="space-y-1">
            {goal.milestones.slice(0, 3).map((milestone, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  index < goal.completedMilestones ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <span className={index < goal.completedMilestones ? 'text-green-700 line-through' : 'text-gray-600'}>
                  {milestone}
                </span>
                {index < goal.completedMilestones && (
                  <CheckCircle className="w-3 h-3 text-green-500 ml-auto" />
                )}
              </div>
            ))}
            {goal.milestones.length > 3 && (
              <div className="text-xs text-blue-600 mt-1 pl-4 cursor-pointer hover:underline">
                +{goal.milestones.length - 3} more milestones
              </div>
            )}
          </div>
        </div>

        {/* Target Date */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className={`${
            daysUntilTarget < 0 ? 'text-red-600' : 
            daysUntilTarget < 7 ? 'text-orange-600' : 
            'text-gray-600'
          }`}>
            {daysUntilTarget > 0 
              ? `${daysUntilTarget} days remaining` 
              : daysUntilTarget === 0 
              ? 'Due today!' 
              : `${Math.abs(daysUntilTarget)} days overdue`
            }
          </span>
        </div>

        {/* Action Button */}
        {!isCompleted && (
          <Button 
            onClick={handleProgressUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            Update Progress (+10%)
          </Button>
        )}

        {isCompleted && (
          <div className="flex items-center justify-center text-green-700 gap-2 font-medium">
            <CheckCircle className="w-4 h-4" />
            <span>Goal completed!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalCard;
