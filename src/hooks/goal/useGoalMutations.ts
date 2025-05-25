
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Goal, GoalRow, mapGoalRowToGoal } from "@/types/goal";
import { GoalInput, EditGoalInput } from "./types";

export const useGoalMutations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createGoal = useMutation({
    mutationFn: async (goalData: GoalInput) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("goals")
        .insert([{ 
          title: goalData.title,
          description: goalData.description,
          category: goalData.category,
          target_date: goalData.target_date,
          image_url: goalData.image_url,
          user_id: user.id 
        }])
        .select()
        .single();

      if (error) {
        console.error("Error creating goal:", error);
        throw error;
      }

      return mapGoalRowToGoal(data);
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

      return mapGoalRowToGoal(data);
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
    mutationFn: async ({ goalId, updates }: { goalId: string; updates: Partial<GoalRow> }) => {
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

      return mapGoalRowToGoal(data);
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

      return mapGoalRowToGoal(data);
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

  return {
    createGoal,
    editGoal,
    updateGoal,
    updateGoalProgress,
    deleteGoal,
  };
};
