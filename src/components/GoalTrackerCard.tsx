
import React, { useState, useEffect } from 'react';
import { CircleArrowRight, Edit, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Goal } from '@/hooks/useGoals';

interface GoalTrackerCardProps {
  goal?: Goal;
  onUpdateProgress?: (goalId: string, newProgress: number) => void;
  onEditGoal?: () => void;
  onSwitchGoal?: () => void;
}

const GoalTrackerCard: React.FC<GoalTrackerCardProps> = ({
  goal,
  onUpdateProgress,
  onEditGoal,
  onSwitchGoal,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  
  // Default goal data if no goal is provided
  const defaultGoal = {
    id: 'default',
    title: 'Daily Water Intake',
    description: 'Stay hydrated for better health and focus',
    category: 'Health & Fitness',
    progress: 50,
    targetDate: new Date().toISOString(),
    milestones: [],
    completedMilestones: 0
  };
  
  const activeGoal = goal || defaultGoal;
  const progressValue = activeGoal.progress || 0;
  const progressText = `${progressValue}% Complete`;
  
  // Get user bio tag based on category
  const getBioTag = (category: string) => {
    const categoryTags = {
      'Health & Fitness': 'Health & Fitness for Runners',
      'Education': 'Learning & Development Focus',
      'Career': 'Professional Growth Track',
      'Personal': 'Personal Development Journey',
      'Finance': 'Financial Wellness Path',
    };
    return categoryTags[category as keyof typeof categoryTags] || 'Personal Development';
  };
  
  const bioTag = getBioTag(activeGoal.category);
  
  // Calculate time remaining until midnight
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    setTimeRemaining(calculateTimeRemaining());
    
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle progress update
  const handleUpdateProgress = () => {
    if (onUpdateProgress && activeGoal.id) {
      // Increment by 10% (or your preferred increment)
      const newProgress = Math.min(100, progressValue + 10);
      onUpdateProgress(activeGoal.id, newProgress);
    }
  };

  // Get emoji based on progress
  const getProgressEmoji = (progress: number) => {
    if (progress < 25) return '🌱';
    if (progress < 50) return '🌿';
    if (progress < 75) return '🌲';
    return '🎯';
  };
  
  return (
    <Card className="border-2 border-gryt-blue/10 shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="bg-gradient-to-r from-gryt-blue/10 to-transparent p-4 flex justify-between items-start">
        <div>
          <Badge variant="secondary" className="mb-2 bg-gryt-blue/20">
            {bioTag}
          </Badge>
          <h3 className="font-semibold text-lg text-gryt-dark">
            {activeGoal.title} — You've hit {progressValue}% today {getProgressEmoji(progressValue)}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Stay on pace. {timeRemaining.split(':')[0]} hours left to complete today's goal.
          </p>
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{progressText}</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" /> {timeRemaining} left
            </span>
          </div>
          <Progress 
            value={progressValue} 
            className="h-2"
            indicatorClassName={`bg-gradient-to-r from-gryt-blue to-gryt-red`}
          />
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="default"
            size="sm"
            className="bg-gryt-blue hover:bg-gryt-blue/90 text-white"
            onClick={handleUpdateProgress}
          >
            Update Progress
            <CircleArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-gryt-dark border-gryt-gray/20"
              onClick={onSwitchGoal}
            >
              Switch
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-gryt-dark border-gryt-gray/20"
              onClick={onEditGoal}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalTrackerCard;
