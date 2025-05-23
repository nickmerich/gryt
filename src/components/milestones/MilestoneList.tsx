
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MilestoneCard from './MilestoneCard';
import { Milestone } from '@/hooks/useMilestones';

interface MilestoneListProps {
  milestones: Milestone[];
  isLoading: boolean;
  expandedMilestoneId: string | null;
  editingMilestoneId: string | null;
  editingMilestoneTitle: string;
  onGenerateMilestones: () => void;
  onToggleComplete: (milestoneId: string, isCompleted: boolean) => void;
  onToggleExpand: (milestoneId: string) => void;
  onEdit: (milestoneId: string, currentTitle: string) => void;
  onSaveEdit: (milestoneId: string) => void;
  onCancelEdit: () => void;
  onDelete: (milestoneId: string) => void;
  setEditingMilestoneTitle: (title: string) => void;
  isGenerating: boolean;
  goalDetails?: { id: string; title: string; description: string; category: string; target_date: string } | null;
}

const MilestoneList = ({
  milestones,
  isLoading,
  expandedMilestoneId,
  editingMilestoneId,
  editingMilestoneTitle,
  onGenerateMilestones,
  onToggleComplete,
  onToggleExpand,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  setEditingMilestoneTitle,
  isGenerating,
  goalDetails
}: MilestoneListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-6 w-6 animate-spin text-gryt-blue" />
      </div>
    );
  }

  if (milestones.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center py-6">
          <p className="text-gray-500">No milestones yet. Add your first milestone to break down your goal!</p>
        </div>
        
        {goalDetails && (
          <Button
            size="sm"
            variant="secondary"
            onClick={onGenerateMilestones}
            disabled={isGenerating}
            className="text-xs mx-auto block"
          >
            {isGenerating ? (
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
    );
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <MilestoneCard
          key={milestone.id}
          milestone={milestone}
          isExpanded={expandedMilestoneId === milestone.id}
          onToggleComplete={onToggleComplete}
          onToggleExpand={onToggleExpand}
          onEdit={onEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDelete}
          editingMilestoneId={editingMilestoneId}
          editingMilestoneTitle={editingMilestoneTitle}
          setEditingMilestoneTitle={setEditingMilestoneTitle}
        />
      ))}
    </div>
  );
};

export default MilestoneList;
