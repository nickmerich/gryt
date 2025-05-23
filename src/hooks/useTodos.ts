
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Todo {
  id: string;
  milestone_id: string;
  title: string;
  is_completed: boolean;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TodoInput {
  title: string;
  milestone_id: string;
  due_date?: string | null;
}

export const useTodos = (milestoneId?: string) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos', milestoneId],
    queryFn: async () => {
      if (!milestoneId) return [];
      
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('milestone_id', milestoneId)
        .order('created_at', { ascending: true });
      
      if (error) {
        setError(error.message);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!milestoneId,
  });

  const createTodo = useMutation({
    mutationFn: async (newTodo: TodoInput) => {
      const { data, error } = await supabase
        .from('todos')
        .insert([newTodo])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', milestoneId] });
      toast.success('Todo added successfully');
    },
    onError: (error: any) => {
      toast.error(`Failed to create todo: ${error.message}`);
    }
  });

  const toggleTodoCompletion = useMutation({
    mutationFn: async ({ todoId, isCompleted }: { todoId: string, isCompleted: boolean }) => {
      const { data, error } = await supabase
        .from('todos')
        .update({ 
          is_completed: isCompleted,
          updated_at: new Date().toISOString()
        })
        .eq('id', todoId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', milestoneId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update todo: ${error.message}`);
    }
  });

  const deleteTodo = useMutation({
    mutationFn: async (todoId: string) => {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', milestoneId] });
      toast.success('Todo deleted');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete todo: ${error.message}`);
    }
  });

  return {
    todos,
    isLoading,
    error,
    createTodo,
    toggleTodoCompletion,
    deleteTodo
  };
};
