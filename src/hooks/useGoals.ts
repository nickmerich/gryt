
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Goal } from "@/integrations/supabase/types";

export interface GoalInput {
  title: string;
  description: string;
  category: string;
  target_date: string;
  image_url?: string;
}

export interface EditGoalInput {
  id: string;
  title: string;
  description: string;
  category: string;
  target_date: string;
  image_url?: string;
}

export const useGoals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: goals,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["goals", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching goals:", error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const createGoal = useMutation({
    mutationFn: async (goalData: Omit<Goal, "id" | "user_id" | "created_at" | "updated_at">) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("goals")
        .insert([{ ...goalData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error("Error creating goal:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal created successfully!");
    },
    onError: (error) => {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal. Please try again.");
    },
  });

  const editGoal = useMutation({
    mutationFn: async (goalData: EditGoalInput) => {
      const { id, ...updates } = goalData;
      
      const { data, error } = await supabase
        .from("goals")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating goal:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal. Please try again.");
    },
  });

  const updateGoal = useMutation({
    mutationFn: async ({ goalId, updates }: { goalId: string; updates: Partial<Goal> }) => {
      const { data, error } = await supabase
        .from("goals")
        .update(updates)
        .eq("id", goalId)
        .select()
        .single();

      if (error) {
        console.error("Error updating goal:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: (error) => {
      console.error("Error updating goal:", error);
      toast.error("Failed to update goal. Please try again.");
    },
  });

  const updateGoalProgress = useMutation({
    mutationFn: async ({ goalId, newProgress }: { goalId: string; newProgress: number }) => {
      const { data, error } = await supabase
        .from("goals")
        .update({ progress: newProgress })
        .eq("id", goalId)
        .select()
        .single();

      if (error) {
        console.error("Error updating goal progress:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Progress updated!");
    },
    onError: (error) => {
      console.error("Error updating goal progress:", error);
      toast.error("Failed to update progress. Please try again.");
    },
  });

  const deleteGoal = useMutation({
    mutationFn: async (goalId: string) => {
      const { error } = await supabase
        .from("goals")
        .delete()
        .eq("id", goalId);

      if (error) {
        console.error("Error deleting goal:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting goal:", error);
      toast.error("Failed to delete goal. Please try again.");
    },
  });

  const uploadGoalImage = async (file: File, goalId: string): Promise<string> => {
    if (!user) throw new Error("User not authenticated");

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${goalId}/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('goal-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('goal-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  return {
    goals,
    loading,
    isLoading: loading,
    error,
    createGoal,
    editGoal,
    updateGoal,
    updateGoalProgress,
    deleteGoal,
    uploadGoalImage,
  };
};
