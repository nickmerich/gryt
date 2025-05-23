
import { Calendar, CheckCircle, Target } from 'lucide-react';
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

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getCategoryColor(goal.category)}>
            {goal.category}
          </Badge>
          {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
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
              </div>
            ))}
          </div>
        </div>

        {/* Target Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
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
      </CardContent>
    </Card>
  );
};

export default GoalCard;
