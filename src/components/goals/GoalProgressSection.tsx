
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ProgressVisualization from '@/components/ProgressVisualization';
import { Goal } from '@/integrations/supabase/goal.types';

interface GoalProgressSectionProps {
  goal: Goal;
  isUpdating: boolean;
  onUpdateProgress: (newProgress: number) => Promise<void>;
}

const GoalProgressSection = ({ goal, isUpdating, onUpdateProgress }: GoalProgressSectionProps) => {
  const handleUpdateProgress = () => {
    onUpdateProgress(Math.min(goal.progress + 10, 100));
  };

  return (
    <div className="bg-white dark:bg-gryt-dark/30 p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-medium mb-4">Progress Tracker</h3>
      
      <div className="h-40 mb-4">
        <ProgressVisualization 
          goal={goal} 
          type={goal.category === 'Health & Fitness' ? 'mountain' : 'tree'} 
        />
      </div>
      
      <div className="mb-2 flex justify-between items-center">
        <span className="font-medium">Overall Progress</span>
        <span className="font-bold text-gryt-blue">{goal.progress}%</span>
      </div>
      
      <Progress value={goal.progress} className="h-2.5 mb-4" />
      
      <div className="flex justify-end">
        <Button
          onClick={handleUpdateProgress}
          disabled={goal.progress >= 100 || isUpdating}
          className="bg-gryt-blue hover:bg-gryt-blue/90 text-white"
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Progress (+10%)'
          )}
        </Button>
      </div>
    </div>
  );
};

export default GoalProgressSection;
