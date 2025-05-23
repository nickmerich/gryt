
import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  CheckCircle, 
  Target, 
  ChevronDown, 
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from './ui/collapsible';
import { Milestone, useMilestones } from '@/hooks/useMilestones';
import TodoList from './TodoList';

interface MilestoneManagerProps {
  goalId: string;
}

const MilestoneManager: React.FC<MilestoneManagerProps> = ({ goalId }) => {
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);
  
  const {
    milestones,
    isLoading,
    createMilestone,
    toggleMilestoneCompletion
  } = useMilestones(goalId);

  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;

    try {
      const result = await createMilestone.mutateAsync({
        goalId,
        title: newMilestoneTitle.trim()
      });
      setNewMilestoneTitle('');
      // Auto-expand the newly created milestone
      if (result?.id) {
        setExpandedMilestoneId(result.id);
      }
    } catch (error) {
      console.error('Error adding milestone:', error);
    }
  };

  const handleToggleMilestone = async (milestoneId: string, currentState: boolean) => {
    await toggleMilestoneCompletion.mutateAsync({
      milestoneId,
      isCompleted: !currentState
    });
  };

  const toggleExpanded = (milestoneId: string) => {
    setExpandedMilestoneId(expandedMilestoneId === milestoneId ? null : milestoneId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-4 h-4 text-gryt-dark/70 dark:text-gryt-gray/70" />
        <h3 className="text-lg font-medium text-gryt-dark dark:text-gryt-gray">
          Milestones & To-Do's
        </h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-gryt-blue" />
        </div>
      ) : (
        <div className="space-y-3">
          {milestones && milestones.map((milestone: Milestone) => (
            <Collapsible
              key={milestone.id}
              open={expandedMilestoneId === milestone.id}
              onOpenChange={() => toggleExpanded(milestone.id)}
              className="border rounded-md"
            >
              <div className="flex items-center p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "p-0 h-6 w-6 rounded-full",
                    milestone.is_completed ? "text-gryt-blue" : "text-gray-400"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleMilestone(milestone.id, milestone.is_completed);
                  }}
                >
                  {milestone.is_completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-current" />
                  )}
                </Button>

                <CollapsibleTrigger className="flex items-center justify-between flex-1 ml-2">
                  <span className={cn(
                    "text-sm font-medium",
                    milestone.is_completed && "text-gryt-blue line-through"
                  )}>
                    {milestone.title}
                  </span>
                  <div>
                    {expandedMilestoneId === milestone.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <div className="px-3 pb-3 pt-1 border-t">
                  <TodoList milestoneId={milestone.id} />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}

          {(!milestones || milestones.length === 0) && (
            <div className="text-sm text-gray-500 py-2">
              No milestones added yet. Add your first milestone below.
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleAddMilestone} className="flex items-center gap-2 pt-2">
        <Input
          value={newMilestoneTitle}
          onChange={(e) => setNewMilestoneTitle(e.target.value)}
          placeholder="Add a new milestone..."
          className="text-sm"
        />
        <Button 
          type="submit"
          size="sm"
          disabled={!newMilestoneTitle.trim() || createMilestone.isPending}
          className="bg-gryt-blue hover:bg-gryt-blue/90 text-white"
        >
          {createMilestone.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Add
        </Button>
      </form>
    </div>
  );
};

// Helper function for conditional classes
const cn = (...classes: (string | boolean | undefined)[]) => 
  classes.filter(Boolean).join(' ');

export default MilestoneManager;
