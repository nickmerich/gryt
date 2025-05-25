
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface HabitStack {
  id: string;
  user_id: string;
  anchor_routine: string;
  new_goal_id: string;
  trigger_time?: string;
  trigger_context?: string;
  success_rate: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HabitStackInput {
  anchor_routine: string;
  new_goal_id: string;
  trigger_time?: string;
  trigger_context?: string;
}

export const useHabitStacking = () => {
  const queryClient = useQueryClient();

  const getHabitStacks = async (): Promise<HabitStack[]> => {
    const { data, error } = await supabase
      .from('habit_stacks')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching habit stacks:", error);
      throw new Error(error.message);
    }

    return data || [];
  };

  const createHabitStack = async (habitStack: HabitStackInput): Promise<void> => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      toast.error("You must be logged in to create a habit stack");
      throw new Error("Authentication required");
    }
    
    const { error } = await supabase
      .from('habit_stacks')
      .insert([{ 
        ...habitStack,
        user_id: sessionData.session.user.id
      }]);

    if (error) {
      console.error("Error creating habit stack:", error);
      toast.error("Failed to create habit stack");
      throw new Error(error.message);
    }
  };

  const updateSuccessRate = async ({ id, success_rate }: { id: string, success_rate: number }): Promise<void> => {
    const { error } = await supabase
      .from('habit_stacks')
      .update({ success_rate, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error("Error updating habit stack success rate:", error);
      throw new Error(error.message);
    }
  };

  const { data: habitStacks, isLoading, error } = useQuery({
    queryKey: ['habit-stacks'],
    queryFn: getHabitStacks,
  });

  const createStack = useMutation({
    mutationFn: createHabitStack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habit-stacks'] });
      toast.success("Habit stack created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const updateStack = useMutation({
    mutationFn: updateSuccessRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habit-stacks'] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return {
    habitStacks,
    isLoading,
    error,
    createStack,
    updateStack
  };
};
