
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface Milestone {
  id: string;
  goal_id: string;
  title: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useMilestones = (goalId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { data: milestones, isLoading } = useQuery({
    queryKey: ['milestones', goalId],
    queryFn: async () => {
      if (!user || !goalId) return [];
      
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .eq('goal_id', goalId)
        .order('created_at', { ascending: true });
      
      if (error) {
        setError(error.message);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user && !!goalId,
  });

  const createMilestone = useMutation({
    mutationFn: async ({ goalId, title }: { goalId: string, title: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('milestones')
        .insert([{ 
          goal_id: goalId,
          title
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones', goalId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to create milestone: ${error.message}`);
    }
  });

  const toggleMilestoneCompletion = useMutation({
    mutationFn: async ({ milestoneId, isCompleted }: { milestoneId: string, isCompleted: boolean }) => {
      const { data, error } = await supabase
        .from('milestones')
        .update({ 
          is_completed: isCompleted,
          updated_at: new Date().toISOString()
        })
        .eq('id', milestoneId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['milestones', goalId] });
      toast.success(`Milestone ${data.is_completed ? 'completed' : 'uncompleted'}`);
    },
    onError: (error: any) => {
      toast.error(`Failed to update milestone: ${error.message}`);
    }
  });

  return {
    milestones,
    isLoading,
    error,
    createMilestone,
    toggleMilestoneCompletion
  };
};
