
import { supabase } from '@/integrations/supabase/client';
import { generateMilestonesForGoal } from '@/utils/milestoneGenerator';
import { toast } from 'sonner';

interface MilestoneGeneratorProps {
  goalDetails: {
    title: string;
    description: string;
    category: string;
    target_date: string;
  };
  goalId: string;
  createMilestoneMutation: any;
}

export const generateMilestonesAndTasks = async ({ 
  goalDetails, 
  goalId, 
  createMilestoneMutation 
}: MilestoneGeneratorProps) => {
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
      const response = await createMilestoneMutation.mutateAsync({ 
        goalId, 
        title: milestone.name 
      });
      
      // Access the milestone id correctly
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
