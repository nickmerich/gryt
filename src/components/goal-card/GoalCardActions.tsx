
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoalCardActionsProps {
  isCompleted: boolean;
  randomQuote: string;
  onProgressUpdate: () => void;
}

const GoalCardActions = ({ isCompleted, randomQuote, onProgressUpdate }: GoalCardActionsProps) => {
  return (
    <>
      <div className="px-8 pb-4">
        <p className="text-sm italic text-white/70">{randomQuote}</p>
      </div>

      <div className="mt-auto border-t border-white/20 p-6 bg-black/10 backdrop-blur-sm rounded-b-3xl">
        {!isCompleted ? (
          <Button 
            onClick={onProgressUpdate}
            className="w-full bg-white hover:bg-white/90 text-slate-900 rounded-2xl font-medium"
            size="default"
          >
            Update Progress (+10%)
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2 font-medium text-lg text-white">
            <CheckCircle className="w-5 h-5 text-yellow-300" />
            <span>Goal Completed! 🎉</span>
          </div>
        )}
      </div>
    </>
  );
};

export default GoalCardActions;
