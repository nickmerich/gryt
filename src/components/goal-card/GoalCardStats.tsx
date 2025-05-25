
import { Target, Calendar, ChevronRight } from 'lucide-react';
import { Milestone } from '@/hooks/useMilestones';

interface GoalCardStatsProps {
  nextMilestone?: Milestone;
  completedMilestonesCount: number;
  totalMilestonesCount: number;
  daysUntilTarget: number;
  isCompleted: boolean;
}

const GoalCardStats = ({ 
  nextMilestone, 
  completedMilestonesCount, 
  totalMilestonesCount, 
  daysUntilTarget, 
  isCompleted 
}: GoalCardStatsProps) => {
  return (
    <>
      {nextMilestone && !isCompleted && (
        <div className="px-8 py-3">
          <div className="flex items-center gap-3 text-sm bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
            <ChevronRight className="w-4 h-4 text-white/70" />
            <span className="font-medium text-white">Next: {nextMilestone.title}</span>
          </div>
        </div>
      )}

      <div className="px-8 pb-3 space-y-3">
        <div className="flex items-center gap-3 text-sm text-white/90">
          <Target className="w-4 h-4" />
          <span className="text-white">{completedMilestonesCount}/{totalMilestonesCount} milestones completed</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Calendar className="w-4 h-4 text-white/80" />
          <span className={`${
            daysUntilTarget < 0 ? 'text-red-200' : 
            daysUntilTarget < 7 ? 'text-orange-200' : 
            'text-white'
          }`}>
            {daysUntilTarget > 0 
              ? `${daysUntilTarget} days remaining` 
              : daysUntilTarget === 0 
              ? 'Due today!' 
              : `${Math.abs(daysUntilTarget)} days overdue`
            }
          </span>
        </div>
      </div>
    </>
  );
};

export default GoalCardStats;
