
import { Goal } from "@/types/goal";
import { useGoalQueries } from "./goal/useGoalQueries";
import { useGoalMutations } from "./goal/useGoalMutations";
import { useGoalImageUpload } from "./goal/useGoalImageUpload";

// Export types for other components to use
export type { Goal };
export type { GoalInput, EditGoalInput } from "./goal/types";

export const useGoals = () => {
  const { goals, loading, isLoading, error } = useGoalQueries();
  const { createGoal, editGoal, updateGoal, updateGoalProgress, deleteGoal } = useGoalMutations();
  const { uploadGoalImage } = useGoalImageUpload();

  return {
    goals,
    loading,
    isLoading,
    error,
    createGoal,
    editGoal,
    updateGoal,
    updateGoalProgress,
    deleteGoal,
    uploadGoalImage,
  };
};
