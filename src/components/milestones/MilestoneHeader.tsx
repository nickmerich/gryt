
import { Loader2, Plus } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Milestone } from '@/hooks/useMilestones';
import MilestoneStats from './MilestoneStats';

interface MilestoneHeaderProps {
  milestones: Milestone[] | undefined;
  isEmpty: boolean;
  isPending: boolean;
  onGenerateMilestones: () => void;
  goalDetails: any;
}

const MilestoneHeader = ({ 
  milestones, 
  isEmpty, 
  isPending, 
  onGenerateMilestones,
  goalDetails
}: MilestoneHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <CardTitle className="text-xl font-semibold">Milestones & To-Dos</CardTitle>
      <div className="flex items-center gap-2">
        {milestones && <MilestoneStats milestones={milestones} />}
        
        {isEmpty && goalDetails && (
          <Button
            size="sm"
            variant="secondary"
            onClick={onGenerateMilestones}
            disabled={isPending}
            className="text-xs"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="mr-1 h-3 w-3" />
                Generate Milestones
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MilestoneHeader;
