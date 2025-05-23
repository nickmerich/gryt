
import { useState } from 'react';
import { useMilestones } from '@/hooks/useMilestones';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { generateMilestonesForGoal } from '@/utils/milestoneGenerator';
import MilestoneList from './milestones/MilestoneList';
import AddMilestoneForm from './milestones/AddMilestoneForm';
import MilestoneStats from './milestones/MilestoneStats';

interface MilestoneManagerProps {
  goalId: string;
}

interface GoalDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  target_date: string;
}

const MilestoneManager = ({ goalId }: MilestoneManagerProps) => {
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [editingMilestoneTitle, setEditingMilestoneTitle] = useState('');
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);
  
  const { 
    milestones, 
    isLoading, 
    createMilestone, 
    toggleMilestoneCompletion,
    updateMilestone,
    deleteMilestone
  } = useMilestones(goalId);

  // Fetch goal details for generating milestones
  const { data: goalDetails } = useQuery<GoalDetails>({
    queryKey: ['goal-details-for-milestones', goalId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('id, title, description, category, target_date')
        .eq('id', goalId)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!goalId,
  });

  const handleSubmit = (title: string) => {
    createMilestone.mutate(
      { goalId, title },
      {
        onSuccess: () => {
          setNewMilestoneTitle('');
          toast.success('Milestone added');
        },
      }
    );
  };
  
  const handleToggleComplete = (milestoneId: string, isCompleted: boolean) => {
    toggleMilestoneCompletion.mutate({ milestoneId, isCompleted: !isCompleted });
  };
  
  const handleEdit = (milestoneId: string, currentTitle: string) => {
    setEditingMilestoneId(milestoneId);
    setEditingMilestoneTitle(currentTitle);
  };
  
  const handleCancelEdit = () => {
    setEditingMilestoneId(null);
    setEditingMilestoneTitle('');
  };

  const handleSaveEdit = (milestoneId: string) => {
    if (!editingMilestoneTitle.trim()) return;
    
    updateMilestone.mutate(
      { milestoneId, title: editingMilestoneTitle.trim() },
      {
        onSuccess: () => {
          setEditingMilestoneId(null);
          setEditingMilestoneTitle('');
          toast.success('Milestone updated');
        },
        onError: () => {
          toast.error('Failed to update milestone');
        }
      }
    );
  };

  const handleDelete = (milestoneId: string) => {
    deleteMilestone.mutate(
      { milestoneId },
      {
        onSuccess: () => {
          toast.success('Milestone deleted');
        },
        onError: () => {
          toast.error('Failed to delete milestone');
        }
      }
    );
  };

  const toggleMilestoneExpansion = (milestoneId: string) => {
    if (expandedMilestoneId === milestoneId) {
      setExpandedMilestoneId(null);
    } else {
      setExpandedMilestoneId(milestoneId);
    }
  };

  const generateMilestonesAndTasks = async () => {
    if (!goalDetails) return;
    
    try {
      // Generate milestones using our utility
      const result = generateMilestonesForGoal({
        title: goalDetails.title,
        description: goalDetails.description,
        category: goalDetails.category,
        target_date: goalDetails.target_date
      });
      
      // Create each milestone sequentially
      for (const milestone of result.milestones) {
        // Create the milestone
        const response = await createMilestone.mutateAsync({ 
          goalId, 
          title: milestone.name 
        });
        
        // Fix: Access the milestone id correctly
        const milestoneId = response?.id;
        
        // If we have a milestoneId and tasks, create todos for each task
        if (milestoneId && milestone.tasks && milestone.tasks.length > 0) {
          // We'll use a direct supabase call to create todos
          const tasksToInsert = milestone.tasks.map(task => ({
            title: task.title,
            milestone_id: milestoneId,
            is_completed: false
          }));
          
          // Insert all tasks for this milestone
          await supabase.from('todos').insert(tasksToInsert);
        }
      }
      
      toast.success("Generated milestones and tasks for your goal!");
    } catch (error) {
      console.error("Error generating milestones and tasks:", error);
      toast.error("Failed to generate milestones and tasks");
    }
  };

  return (
    <div>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle className="text-xl font-semibold">Milestones & To-Dos</CardTitle>
          <div className="flex items-center gap-2">
            {milestones && <MilestoneStats milestones={milestones} />}
            
            {milestones && milestones.length === 0 && goalDetails && (
              <Button
                size="sm"
                variant="secondary"
                onClick={generateMilestonesAndTasks}
                disabled={createMilestone.isPending}
                className="text-xs"
              >
                {createMilestone.isPending ? (
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
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Milestone List */}
          <MilestoneList
            milestones={milestones || []}
            isLoading={isLoading}
            expandedMilestoneId={expandedMilestoneId}
            editingMilestoneId={editingMilestoneId}
            editingMilestoneTitle={editingMilestoneTitle}
            onGenerateMilestones={generateMilestonesAndTasks}
            onToggleComplete={handleToggleComplete}
            onToggleExpand={toggleMilestoneExpansion}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDelete={handleDelete}
            setEditingMilestoneTitle={setEditingMilestoneTitle}
            isGenerating={createMilestone.isPending}
            goalDetails={goalDetails}
          />

          {/* Add new milestone form */}
          {(!isLoading && (milestones?.length ?? 0) > 0) && (
            <AddMilestoneForm 
              isSubmitting={createMilestone.isPending} 
              onSubmit={handleSubmit} 
            />
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default MilestoneManager;
