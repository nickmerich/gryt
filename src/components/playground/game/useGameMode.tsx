
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Clock, Award, Target, BookOpen, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import { Challenge } from './GameModeTypes';
import { useGameTimer } from './useGameTimer';

export const useGameMode = (mode: 'sandbox' | 'real') => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'challenge-1',
      title: 'Speed Creator',
      description: 'Create a goal with 3 milestones in under 30 seconds',
      timeLimit: 30,
      badgeIcon: <Clock className="w-4 h-4" />,
      badgeColor: 'bg-blue-500',
      isCompleted: false,
      isActive: false,
      points: 50
    },
    {
      id: 'challenge-2',
      title: 'Progress Master',
      description: 'Update progress to hit exactly 80% completion',
      timeLimit: 45,
      badgeIcon: <Target className="w-4 h-4" />,
      badgeColor: 'bg-green-500',
      isCompleted: false,
      isActive: false,
      points: 75
    },
    {
      id: 'challenge-3',
      title: 'Task Champion',
      description: 'Complete 5 tasks in different categories under 1 minute',
      timeLimit: 60,
      badgeIcon: <BookOpen className="w-4 h-4" />,
      badgeColor: 'bg-purple-500',
      isCompleted: false,
      isActive: false,
      points: 100
    },
    {
      id: 'challenge-4',
      title: 'Milestone Sprint',
      description: 'Reach all 5 milestones with perfect timing (20% increments)',
      timeLimit: 90,
      badgeIcon: <Trophy className="w-4 h-4" />,
      badgeColor: 'bg-yellow-500',
      isCompleted: false,
      isActive: false,
      points: 150
    },
  ]);

  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  // Find the active challenge object
  const activeChallengeObject = useMemo(() => {
    return challenges.find(c => c.id === activeChallenge);
  }, [challenges, activeChallenge]);

  // Handle when time is up
  const handleTimeUp = useCallback(() => {
    if (activeChallenge) {
      handleChallengeEnd(activeChallenge, false);
    }
  }, [activeChallenge]);

  // Use our custom timer hook
  const { timeRemaining, startTimer, stopTimer } = useGameTimer({
    initialTime: 0,
    onTimeUp: handleTimeUp
  });

  const handleChallengeEnd = useCallback((id: string, success: boolean) => {
    // Stop the timer
    stopTimer();

    const updatedChallenges = challenges.map(c => {
      if (c.id === id) {
        return {
          ...c,
          isActive: false,
          isCompleted: success
        };
      }
      return c;
    });

    setChallenges(updatedChallenges);
    setActiveChallenge(null);

    if (success) {
      const challenge = challenges.find(c => c.id === id);
      if (challenge) {
        setUserScore(prev => prev + challenge.points);
        setEarnedBadges(prev => [...prev, challenge.title]);
        toast.success(`Challenge completed! +${challenge.points} points`);
      }
    } else {
      toast.error("Time's up! Challenge failed. Try again!");
    }
  }, [challenges, stopTimer]);

  const startChallenge = useCallback((id: string) => {
    // Find the challenge and update its status
    const challenge = challenges.find(c => c.id === id);
    if (!challenge) return;

    // Update all challenges to set the selected one as active
    const updatedChallenges = challenges.map(c => ({
      ...c,
      isActive: c.id === id
    }));

    setChallenges(updatedChallenges);
    setActiveChallenge(id);

    // Start the timer with the challenge time limit
    startTimer(challenge.timeLimit);
    
    toast.info(`Challenge started! You have ${challenge.timeLimit} seconds.`);

    // Simulate random challenge completion for demonstration
    if (mode === 'sandbox') {
      const randomSuccess = Math.random() > 0.3; // 70% chance of success
      const randomTime = Math.floor(Math.random() * (challenge.timeLimit - 5)) + 3; // Random time between 3 and timeLimit-5 seconds
      
      setTimeout(() => {
        if (activeChallenge === id) { // Only proceed if this is still the active challenge
          handleChallengeEnd(id, randomSuccess);
        }
      }, randomTime * 1000);
    }
  }, [challenges, activeChallenge, startTimer, handleChallengeEnd, mode]);

  const completeChallenge = useCallback((id: string) => {
    // This is for demonstration - in a real app, you'd verify the user actually completed the challenge
    handleChallengeEnd(id, true);
  }, [handleChallengeEnd]);

  const resetAllChallenges = useCallback(() => {
    // Stop any active timer
    stopTimer();

    const resetChallenges = challenges.map(c => ({
      ...c,
      isActive: false,
      isCompleted: false
    }));

    setChallenges(resetChallenges);
    setActiveChallenge(null);
    setUserScore(0);
    setEarnedBadges([]);
    toast.info("All challenges reset. Start fresh!");
  }, [challenges, stopTimer]);

  return {
    challenges,
    activeChallenge,
    timeRemaining,
    userScore,
    earnedBadges,
    startChallenge,
    completeChallenge,
    handleChallengeEnd,
    resetAllChallenges
  };
};
