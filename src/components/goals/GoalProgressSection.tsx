
import { useState } from 'react';
import { TrendingUp, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Goal, useGoals } from '@/hooks/useGoals';

interface GoalProgressSectionProps {
  goal: Goal;
}

const GoalProgressSection = ({ goal }: GoalProgressSectionProps) => {
  const [newProgress, setNewProgress] = useState(goal.progress.toString());
  const { updateGoalProgress } = useGoals();

  const handleProgressUpdate = () => {
    const progressValue = Math.max(0, Math.min(100, parseInt(newProgress) || 0));
    updateGoalProgress.mutate({ goalId: goal.id, newProgress: progressValue });
  };

  const incrementProgress = (amount: number) => {
    const currentProgress = parseInt(newProgress) || 0;
    const newValue = Math.max(0, Math.min(100, currentProgress + amount));
    setNewProgress(newValue.toString());
  };

  return (
    <div className="modern-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-black">Update Progress</h2>
      </div>

      <div className="space-y-6">
        {/* Current Progress Display */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-medium text-black">Current Progress</span>
            <span className="text-2xl font-bold text-black">{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-3" />
        </div>

        {/* Progress Update Controls */}
        <div className="space-y-4">
          <Label htmlFor="progress-input" className="text-base font-medium text-black">
            New Progress Percentage
          </Label>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => incrementProgress(-5)}
              className="border-slate-300 hover:bg-slate-50"
            >
              <Minus className="w-4 h-4" />
            </Button>
            
            <Input
              id="progress-input"
              type="number"
              min="0"
              max="100"
              value={newProgress}
              onChange={(e) => setNewProgress(e.target.value)}
              className="text-center font-medium"
            />
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => incrementProgress(5)}
              className="border-slate-300 hover:bg-slate-50"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => incrementProgress(10)}
              className="border-slate-300 hover:bg-slate-50 text-black"
            >
              +10%
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => incrementProgress(25)}
              className="border-slate-300 hover:bg-slate-50 text-black"
            >
              +25%
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewProgress('100')}
              className="border-slate-300 hover:bg-slate-50 text-black"
            >
              Complete
            </Button>
          </div>

          <Button 
            onClick={handleProgressUpdate}
            className="w-full modern-button"
            disabled={updateGoalProgress.isPending}
          >
            {updateGoalProgress.isPending ? 'Updating...' : 'Update Progress'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoalProgressSection;
