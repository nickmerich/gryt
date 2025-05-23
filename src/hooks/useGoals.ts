
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { Goal, parseGoalRow } from "@/integrations/supabase/goal.types";
import { uploadFile } from "@/utils/storageHelpers";

// Re-export the Goal interface so existing imports continue to work
export type { Goal } from "@/integrations/supabase/goal.types";

export interface GoalInput {
  title: string;
  description?: string;
  category: string;
  target_date?: string;
}

export interface EditGoalInput {
  id: string;
  title: string;
  description?: string;
  category: string;
  target_date?: string;
  image_url?: string;  // This is the database field name
}

const useGoals = () => {
  const queryClient = useQueryClient();

  const getGoals = async (): Promise<Goal[]> => {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching goals:", error);
      throw new Error(error.message);
    }

    return data.map(parseGoalRow);
  };

  const createNewGoal = async (newGoal: GoalInput): Promise<string> => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      console.error("Error getting session:", sessionError);
      toast.error("You must be logged in to create a goal");
      throw new Error("Authentication required");
    }
    
    const goalId = uuidv4();
    const { error } = await supabase
      .from('goals')
      .insert([
        { 
          id: goalId, 
          ...newGoal,
          progress: 0,
          user_id: sessionData.session.user.id
        }
      ]);

    if (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal");
      throw new Error(error.message);
    }

    return goalId;
  };

  const updateExistingGoal = async (editGoal: EditGoalInput): Promise<void> => {
    const { error } = await supabase
      .from('goals')
      .update({ 
        title: editGoal.title,
        description: editGoal.description,
        category: editGoal.category,
        target_date: editGoal.target_date,
        image_url: editGoal.image_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', editGoal.id);

    if (error) {
      console.error("Error editing goal:", error);
      toast.error("Failed to edit goal");
      throw new Error(error.message);
    }
  };

  const uploadImage = async (imageFile: File, goalId: string): Promise<string> => {
    const imageName = `${goalId}/${imageFile.name}`;
    
    // Use the improved uploadFile helper function
    const publicUrl = await uploadFile('goal-images', imageName, imageFile);
    
    if (!publicUrl) {
      throw new Error("Failed to upload image");
    }
    
    return publicUrl;
  };

  const updateProgress = async ({ goalId, newProgress }: { goalId: string, newProgress: number }): Promise<void> => {
    // Get current progress for logging
    const { data: goalData, error: fetchError } = await supabase
      .from('goals')
      .select('progress')
      .eq('id', goalId)
      .single();
    
    if (fetchError) {
      console.error("Error fetching current progress:", fetchError);
      toast.error("Failed to update progress");
      throw new Error(fetchError.message);
    }
    
    const previousProgress = goalData.progress;
    
    // Update the goal progress
    const { error: updateError } = await supabase
      .from('goals')
      .update({ 
        progress: newProgress, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', goalId);

    if (updateError) {
      console.error("Error updating progress:", updateError);
      toast.error("Failed to update progress");
      throw new Error(updateError.message);
    }
    
    // Log the progress change
    try {
      const { error: logError } = await supabase
        .from('progress_logs')
        .insert([{
          goal_id: goalId,
          previous_progress: previousProgress,
          new_progress: newProgress
        }]);
        
      if (logError) {
        console.error("Error logging progress change:", logError);
      }
    } catch (error) {
      console.error("Failed to log progress change:", error);
    }
    
    // If the goal is completed (progress = 100), add a streak entry
    if (newProgress >= 100) {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData && userData.user) {
          const today = new Date().toISOString().split('T')[0];
          
          // Check if streak already exists for today
          const { data: existingStreak } = await supabase
            .from('streaks')
            .select('id')
            .eq('goal_id', goalId)
            .eq('streak_date', today)
            .eq('user_id', userData.user.id);
            
          if (!existingStreak || existingStreak.length === 0) {
            // Create streak entry
            const { error: streakError } = await supabase
              .from('streaks')
              .insert([{
                goal_id: goalId,
                user_id: userData.user.id,
                streak_date: today
              }]);
              
            if (streakError) {
              console.error("Error recording streak:", streakError);
            }
          }
        }
      } catch (error) {
        console.error("Failed to record streak:", error);
      }
    }
  };

  const { data: goals, isLoading, error } = useQuery({
    queryKey: ['goals'],
    queryFn: getGoals,
  });

  const createGoal = useMutation({
    mutationFn: createNewGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success("Goal created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const editGoal = useMutation({
    mutationFn: updateExistingGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success("Goal edited successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const uploadGoalImage = async (imageFile: File, goalId: string): Promise<string> => {
    try {
      const imageUrl = await uploadImage(imageFile, goalId);
      
      // Update the goal with the new image URL
      await updateExistingGoal({
        id: goalId,
        image_url: imageUrl,
        title: '', // These fields will be ignored in the update
        category: ''
      });
      
      // Optimistically update the goal in the cache
      queryClient.setQueryData(['goals'], (oldGoals: Goal[] | undefined) => {
        if (!oldGoals) return oldGoals;
        return oldGoals.map(goal => {
          if (goal.id === goalId) {
            return { ...goal, imageUrl: imageUrl };
          }
          return goal;
        });
      });
      
      return imageUrl;
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const updateGoalProgress = useMutation({
    mutationFn: updateProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success("Progress updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return {
    goals,
    isLoading,
    error,
    createGoal,
    editGoal,
    uploadGoalImage,
    updateGoalProgress
  };
};

export { useGoals };
