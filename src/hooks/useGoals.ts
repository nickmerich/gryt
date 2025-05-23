
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  milestones: any[];  // Adding required properties
  completedMilestones: number;  // Adding required properties
  streaks?: number;  // Optional property used in some components
  lastCheckin?: string;  // Optional property used in some components
}

export interface GoalInput {
  title: string;
  description?: string;
  category: string;
  target_date: string;
}

export const useGoals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { data: goals, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        setError(error.message);
        throw error;
      }
      
      // Transform snake_case to camelCase for the expected Goal interface
      // and include all required properties
      return (data || []).map(goal => ({
        id: goal.id,
        title: goal.title,
        description: goal.description || '',
        category: goal.category,
        targetDate: goal.target_date,
        progress: goal.progress,
        user_id: goal.user_id,
        created_at: goal.created_at,
        updated_at: goal.updated_at,
        milestones: [],  // Initialize with empty array
        completedMilestones: 0,  // Initialize with zero
        streaks: 0,  // Initialize optional properties
        lastCheckin: new Date(goal.updated_at).toISOString().split('T')[0]
      }));
    },
    enabled: !!user,
  });

  const createGoal = useMutation({
    mutationFn: async (goalData: GoalInput) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('goals')
        .insert([{ ...goalData, user_id: user.id }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success('Goal created successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to create goal: ${error.message}`);
    }
  });

  const updateGoalProgress = useMutation({
    mutationFn: async ({ goalId, newProgress }: { goalId: string, newProgress: number }) => {
      if (!user) throw new Error('User not authenticated');
      
      // First get the current progress
      const { data: currentGoal } = await supabase
        .from('goals')
        .select('progress')
        .eq('id', goalId)
        .single();
        
      if (!currentGoal) throw new Error('Goal not found');
      
      // Update the goal progress
      const { data, error } = await supabase
        .from('goals')
        .update({ 
          progress: newProgress,
          updated_at: new Date().toISOString()
        })
        .eq('id', goalId)
        .select()
        .single();
      
      if (error) throw error;
      
      // Log the progress update
      await supabase
        .from('progress_logs')
        .insert({
          goal_id: goalId,
          previous_progress: currentGoal.progress,
          new_progress: newProgress
        });
        
      // If progress updated today, update streak or create new streak entry
      const today = new Date().toISOString().split('T')[0];
      
      const { data: existingStreak } = await supabase
        .from('streaks')
        .select()
        .eq('goal_id', goalId)
        .eq('streak_date', today)
        .single();
        
      if (!existingStreak) {
        await supabase
          .from('streaks')
          .insert({
            goal_id: goalId,
            user_id: user.id,
            streak_date: today
          });
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update progress: ${error.message}`);
    }
  });

  const deleteGoal = useMutation({
    mutationFn: async (goalId: string) => {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast.success('Goal deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete goal: ${error.message}`);
    }
  });

  return {
    goals,
    isLoading,
    error,
    createGoal,
    updateGoalProgress,
    deleteGoal
  };
};
