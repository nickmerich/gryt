
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

// Update the Goal interface to include imageUrl property
export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  targetDate: string;
  lastCheckin?: string;
  imageUrl?: string;  // Add this property
  updated_at?: string; // Add this for StatsOverview component
}

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
  image_url?: string;  // Add this property
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

    return data.map(parseGoal);
  };

  const createNewGoal = async (newGoal: GoalInput): Promise<string> => {
    const goalId = uuidv4();
    const { error } = await supabase
      .from('goals')
      .insert([
        { 
          id: goalId, 
          ...newGoal,
          progress: 0,
          // Get user_id from current session
          user_id: (await supabase.auth.getSession()).data.session?.user.id
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
        image_url: editGoal.image_url
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
    
    const { data, error } = await supabase
      .storage
      .from('goal-images')
      .upload(imageName, imageFile, {
        cacheControl: '3600',
        upsert: false
      });
  
    if (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      throw new Error(error.message);
    }
  
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/goal-images/${data.path}`;
    return imageUrl;
  };

  const updateProgress = async ({ goalId, newProgress }: { goalId: string, newProgress: number }): Promise<void> => {
    const { error } = await supabase
      .from('goals')
      .update({ progress: newProgress, updated_at: new Date().toISOString() })
      .eq('id', goalId);

    if (error) {
      console.error("Error updating progress:", error);
      toast.error("Failed to update progress");
      throw new Error(error.message);
    }
  };

  const { data: goals, isLoading } = useQuery({
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
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  // Make sure the parseGoal function maps image_url to imageUrl
  const parseGoal = (goal: any): Goal => ({
    id: goal.id,
    title: goal.title,
    description: goal.description || '',
    category: goal.category,
    progress: goal.progress,
    targetDate: goal.target_date,
    lastCheckin: goal.updated_at,
    updated_at: goal.updated_at,
    imageUrl: goal.image_url // Map the database column to the interface property
  });

  return {
    goals,
    isLoading,
    createGoal,
    editGoal,
    uploadGoalImage,
    updateGoalProgress
  };
};

export { useGoals };
