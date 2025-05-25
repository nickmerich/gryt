
import { CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GoalCardProgressProps {
  progress: number;
}

const GoalCardProgress = ({ progress }: GoalCardProgressProps) => {
  return (
    <CardContent className="pb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-base font-medium text-white">Progress</span>
        <span className="text-xl font-bold text-white">{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className="h-3 bg-white/30 rounded-full" 
        indicatorClassName="bg-white rounded-full" 
      />
    </CardContent>
  );
};

export default GoalCardProgress;
