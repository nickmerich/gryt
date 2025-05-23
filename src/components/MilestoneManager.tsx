
import { useState, useEffect } from 'react';
import { useMilestones } from '@/hooks/useMilestones';
import { Check, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TodoList from '@/components/TodoList';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { generateMilestonesForGoal } from '@/utils/milestoneGenerator';

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
    toggleMilestoneCompletion 
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;

    createMilestone.mutate(
      { goalId, title: newMilestoneTitle.trim() },
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
        const { data: milestoneData } = await createMilestone.mutateAsync({ 
          goalId, 
          title: milestone.name 
        });
        
        // If we have a milestoneId and tasks, create todos for each task
        if (milestoneData?.id && milestone.tasks && milestone.tasks.length > 0) {
          // We'll use a direct supabase call to create todos
          const tasksToInsert = milestone.tasks.map(task => ({
            title: task.title,
            milestone_id: milestoneData.id,
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

  const toggleMilestoneExpansion = (milestoneId: string) => {
    if (expandedMilestoneId === milestoneId) {
      setExpandedMilestoneId(null);
    } else {
      setExpandedMilestoneId(milestoneId);
    }
  };

  const completedMilestonesCount = milestones?.filter(m => m.is_completed).length || 0;
  const totalMilestonesCount = milestones?.length || 0;
  const completionPercentage = totalMilestonesCount > 0 
    ? Math.round((completedMilestonesCount / totalMilestonesCount) * 100) 
    : 0;

  return (
    <div>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle className="text-xl font-semibold">Milestones & To-Dos</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white dark:bg-gryt-dark-900 font-normal">
              {completedMilestonesCount}/{totalMilestonesCount} ({completionPercentage}%)
            </Badge>
            
            {totalMilestonesCount === 0 && goalDetails && (
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
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-gryt-blue" />
          </div>
        ) : (
          <div className="space-y-6">
            {milestones && milestones.length > 0 ? (
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <Card key={milestone.id} className={milestone.is_completed ? "border-green-200 bg-green-50/30 dark:bg-green-950/10" : ""}>
                    <CardContent className="p-4">
                      <div 
                        className="flex items-start justify-between cursor-pointer" 
                        onClick={() => toggleMilestoneExpansion(milestone.id)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div 
                            className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                              milestone.is_completed 
                                ? 'bg-green-500 border-green-500 flex items-center justify-center' 
                                : 'border-gray-300'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleComplete(milestone.id, milestone.is_completed);
                            }}
                          >
                            {milestone.is_completed && <Check className="h-3 w-3 text-white" />}
                          </div>
                          
                          {editingMilestoneId === milestone.id ? (
                            <div className="flex-1 flex gap-2">
                              <Input
                                value={editingMilestoneTitle}
                                onChange={(e) => setEditingMilestoneTitle(e.target.value)}
                                className="h-8 text-sm"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelEdit();
                                  }}
                                  className="h-8 px-2"
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="default"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Save logic would go here
                                    handleCancelEdit();
                                  }} 
                                  className="h-8 px-2"
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className={`flex-1 ${milestone.is_completed ? 'text-gray-600 line-through' : ''}`}>
                              {milestone.title}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Todo List for each milestone */}
                      {expandedMilestoneId === milestone.id && (
                        <div className="mt-4 border-t pt-4">
                          <TodoList milestoneId={milestone.id} className="mb-0" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No milestones yet. Add your first milestone to break down your goal!</p>
              </div>
            )}

            {/* Add new milestone form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="Add a new milestone..."
                value={newMilestoneTitle}
                onChange={(e) => setNewMilestoneTitle(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={createMilestone.isPending || !newMilestoneTitle.trim()}
              >
                {createMilestone.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default MilestoneManager;
