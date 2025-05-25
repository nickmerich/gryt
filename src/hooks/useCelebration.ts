
import { useState, useCallback } from 'react';
import { Goal } from '@/hooks/useGoals';

export interface CelebrationEvent {
  type: 'first_step' | 'consistency' | 'milestone' | 'breakthrough' | 'identity';
  achievement: string;
  identityShift: string;
  progress: number;
  goal?: Goal;
}

export const useCelebration = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<CelebrationEvent | null>(null);

  const triggerCelebration = useCallback((event: CelebrationEvent) => {
    setCelebrationData(event);
    setShowCelebration(true);
  }, []);

  const closeCelebration = useCallback(() => {
    setShowCelebration(false);
    setCelebrationData(null);
  }, []);

  const celebrateFirstStep = useCallback((goal: Goal) => {
    triggerCelebration({
      type: 'first_step',
      achievement: 'You took your first step!',
      identityShift: `You are becoming someone who takes action on ${goal.category.toLowerCase()} goals`,
      progress: goal.progress,
      goal
    });
  }, [triggerCelebration]);

  const celebrateConsistency = useCallback((goal: Goal, streakDays: number) => {
    triggerCelebration({
      type: 'consistency',
      achievement: `${streakDays} days of consistency!`,
      identityShift: `You are becoming someone who shows up consistently`,
      progress: goal.progress,
      goal
    });
  }, [triggerCelebration]);

  const celebrateMilestone = useCallback((goal: Goal, milestone: string) => {
    triggerCelebration({
      type: 'milestone',
      achievement: `Milestone achieved: ${milestone}`,
      identityShift: `You are proving you can achieve anything you set your mind to`,
      progress: goal.progress,
      goal
    });
  }, [triggerCelebration]);

  const celebrateBreakthrough = useCallback((goal: Goal, breakthrough: string) => {
    triggerCelebration({
      type: 'breakthrough',
      achievement: `Breakthrough moment: ${breakthrough}`,
      identityShift: `You are becoming unstoppable`,
      progress: goal.progress,
      goal
    });
  }, [triggerCelebration]);

  const celebrateIdentityShift = useCallback((goal: Goal, newIdentity: string) => {
    triggerCelebration({
      type: 'identity',
      achievement: 'Identity transformation complete!',
      identityShift: newIdentity,
      progress: goal.progress,
      goal
    });
  }, [triggerCelebration]);

  return {
    showCelebration,
    celebrationData,
    closeCelebration,
    celebrateFirstStep,
    celebrateConsistency,
    celebrateMilestone,
    celebrateBreakthrough,
    celebrateIdentityShift
  };
};
