
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Streak {
  id: string;
  goal_id: string;
  user_id: string;
  streak_date: string;
  created_at: string;
}

export const useStreaks = (goalId?: string) => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { data: streaks, isLoading } = useQuery({
    queryKey: ['streaks', goalId],
    queryFn: async () => {
      if (!user || !goalId) return [];
      
      const { data, error } = await supabase
        .from('streaks')
        .select('*')
        .eq('goal_id', goalId)
        .order('streak_date', { ascending: false });
      
      if (error) {
        setError(error.message);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user && !!goalId,
  });

  // Calculate current streak (consecutive days)
  const getCurrentStreak = (): number => {
    if (!streaks || streaks.length === 0) return 0;
    
    const sortedDates = [...streaks]
      .map(s => s.streak_date)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let currentStreak = 1;
    const today = new Date().toISOString().split('T')[0];
    
    // Check if there's an entry for today
    const hasToday = sortedDates.includes(today);
    if (!hasToday) return 0;
    
    // Calculate consecutive days
    for (let i = 1; i < sortedDates.length; i++) {
      const current = new Date(sortedDates[i-1]);
      const prev = new Date(sortedDates[i]);
      
      const diffTime = current.getTime() - prev.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    return currentStreak;
  };

  return {
    streaks,
    isLoading,
    error,
    getCurrentStreak
  };
};
