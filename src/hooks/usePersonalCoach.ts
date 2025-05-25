
import { useState, useEffect, useCallback } from 'react';
import { Goal } from '@/hooks/useGoals';

interface CoachState {
  showCoach: boolean;
  lastCheckIn: Date | null;
  coachMode: 'check_in' | 'motivation' | 'strategy' | 'celebration';
  userMood: 'great' | 'good' | 'okay' | 'struggling' | null;
  consecutiveDays: number;
}

export const usePersonalCoach = (goals: Goal[]) => {
  const [coachState, setCoachState] = useState<CoachState>({
    showCoach: false,
    lastCheckIn: null,
    coachMode: 'check_in',
    userMood: null,
    consecutiveDays: 0
  });

  // Check if coach should appear
  useEffect(() => {
    const shouldShowCoach = () => {
      const now = new Date();
      const lastCheckIn = coachState.lastCheckIn;
      
      // Show coach if:
      // 1. Never checked in before
      // 2. 24+ hours since last check-in
      // 3. User has made significant progress
      // 4. User might be struggling (no progress in 3+ days)
      
      if (!lastCheckIn) return true;
      
      const hoursSinceCheckIn = (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);
      if (hoursSinceCheckIn >= 24) return true;
      
      // Check for significant progress
      const recentProgress = goals.some(goal => {
        const targetDate = new Date(goal.targetDate);
        const daysSinceCreated = (now.getTime() - new Date(goal.created_at).getTime()) / (1000 * 60 * 60 * 24);
        return goal.progress > 0 && daysSinceCreated <= 1; // Progress made today
      });
      
      if (recentProgress) return true;
      
      return false;
    };

    const checkInTimer = setTimeout(() => {
      if (shouldShowCoach() && !coachState.showCoach) {
        setCoachState(prev => ({ ...prev, showCoach: true }));
      }
    }, 5000); // Wait 5 seconds after page load

    return () => clearTimeout(checkInTimer);
  }, [goals, coachState.lastCheckIn, coachState.showCoach]);

  const showCoach = useCallback((mode: CoachState['coachMode'] = 'check_in') => {
    setCoachState(prev => ({
      ...prev,
      showCoach: true,
      coachMode: mode
    }));
  }, []);

  const hideCoach = useCallback(() => {
    setCoachState(prev => ({
      ...prev,
      showCoach: false,
      lastCheckIn: new Date()
    }));
  }, []);

  const updateMood = useCallback((mood: CoachState['userMood']) => {
    setCoachState(prev => ({ ...prev, userMood: mood }));
  }, []);

  const getCoachInsight = useCallback(() => {
    const totalGoals = goals.length;
    const avgProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / totalGoals;
    const completedGoals = goals.filter(goal => goal.progress >= 100).length;
    
    if (completedGoals > 0) {
      return `You've completed ${completedGoals} goal${completedGoals > 1 ? 's' : ''}! Your consistency is building your identity.`;
    }
    
    if (avgProgress > 50) {
      return "You're making solid progress. The momentum is building!";
    }
    
    if (avgProgress > 0) {
      return "Every step counts. You're already different than when you started.";
    }
    
    return "Ready to take the first step? The person you want to become is waiting.";
  }, [goals]);

  return {
    coachState,
    showCoach,
    hideCoach,
    updateMood,
    getCoachInsight
  };
};
