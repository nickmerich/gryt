
import { Badge } from '@/components/ui/badge';
import { Milestone } from '@/hooks/useMilestones';

interface MilestoneStatsProps {
  milestones: Milestone[];
}

const MilestoneStats = ({ milestones }: MilestoneStatsProps) => {
  const completedMilestonesCount = milestones.filter(m => m.is_completed).length || 0;
  const totalMilestonesCount = milestones.length || 0;
  const completionPercentage = totalMilestonesCount > 0 
    ? Math.round((completedMilestonesCount / totalMilestonesCount) * 100) 
    : 0;

  return (
    <Badge variant="outline" className="bg-white dark:bg-gryt-dark-900 font-normal">
      {completedMilestonesCount}/{totalMilestonesCount} ({completionPercentage}%)
    </Badge>
  );
};

export default MilestoneStats;
