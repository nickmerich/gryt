
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseGameTimerProps {
  initialTime: number;
  onTimeUp: () => void;
}

export const useGameTimer = ({ initialTime, onTimeUp }: UseGameTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef(onTimeUp);

  // Update the ref when onTimeUp changes
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const startTimer = useCallback((durationInSeconds: number) => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimeRemaining(durationInSeconds);
    
    // Start a new timer that updates once per second
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up!
          clearInterval(timerRef.current as NodeJS.Timeout);
          timerRef.current = null;
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start timer with initial time if provided
  useEffect(() => {
    if (initialTime > 0) {
      startTimer(initialTime);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [initialTime, startTimer]);

  return {
    timeRemaining,
    startTimer,
    stopTimer,
    isRunning: timerRef.current !== null
  };
};
