
import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GoalSuggestion from './GoalSuggestion';
import GoalTrackerCard from './GoalTrackerCard';
import { Goal, GoalInput } from '@/hooks/useGoals';
import { analyzeAndSuggestGoals } from '@/utils/goalSuggestions';

interface AISuggestionsProps {
  goals?: Goal[];
  onAddGoal?: (goal: GoalInput) => void;
  onUpdateGoalProgress?: (goalId: string, newProgress: number) => void;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ 
  goals = [], 
  onAddGoal,
  onUpdateGoalProgress
}) => {
  const [suggestions, setSuggestions] = useState<ReturnType<typeof analyzeAndSuggestGoals>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingNewSuggestion, setLoadingNewSuggestion] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showTrackerCard, setShowTrackerCard] = useState(true);
  const [activeGoal, setActiveGoal] = useState<Goal | undefined>(goals?.[0]);
  
  // Generate suggestions when goals change
  useEffect(() => {
    if (goals.length > 0) {
      const newSuggestions = analyzeAndSuggestGoals(goals);
      setSuggestions(newSuggestions);
      setActiveGoal(goals[0]); // Set the first goal as active
    } else {
      setSuggestions(analyzeAndSuggestGoals([])); // Generate starter suggestions
    }
  }, [goals]);
  
  const handleNext = () => {
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop back to beginning
      setCurrentIndex(0);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Loop to end
      setCurrentIndex(suggestions.length - 1);
    }
  };
  
  const handleSkip = () => {
    // If we've gone through all suggestions, generate new ones
    if (suggestions.length <= 1) {
      handleRegenerateOptions();
      return;
    }
    
    // Remove the current suggestion
    setSuggestions(suggestions.filter((_, idx) => idx !== currentIndex));
    if (currentIndex >= suggestions.length - 1) {
      setCurrentIndex(0);
    }
  };
  
  const handleAdopt = () => {
    // Remove the adopted suggestion and show next one
    handleSkip();
  };

  const handleSwitchGoal = () => {
    // Switch to the next goal in the list
    if (goals && goals.length > 0) {
      const currentIndex = goals.findIndex(g => g.id === activeGoal?.id);
      const nextIndex = (currentIndex + 1) % goals.length;
      setActiveGoal(goals[nextIndex]);
    }
  };
  
  const handleRegenerateOptions = () => {
    setLoadingNewSuggestion(true);
    
    // Simulate AI processing time (in a real app, this would call an API)
    setTimeout(() => {
      // Get new suggestions with some randomness
      const newSuggestions = analyzeAndSuggestGoals(goals);
      setSuggestions(newSuggestions);
      setCurrentIndex(0);
      setLoadingNewSuggestion(false);
    }, 1000);
  };
  
  if (!showSuggestions) {
    return (
      <div className="text-center py-2">
        <Button 
          variant="ghost" 
          className="text-black hover:text-gryt-blue"
          onClick={() => setShowSuggestions(true)}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Show Goal Suggestions
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="ghibli-subtitle flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-gryt-blue" /> 
          {showTrackerCard ? "Today's Focus" : "Personalized Goal Suggestions"}
        </h2>
        <div className="flex space-x-2">
          {suggestions.length > 1 && !showTrackerCard && (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous</span>
              </Button>
              
              <Button 
                variant="ghost"
                size="icon" 
                className="h-8 w-8"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next</span>
              </Button>
            </>
          )}
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-sm text-black hover:text-gryt-blue"
            onClick={() => {
              if (showTrackerCard) {
                setShowTrackerCard(false);
              } else {
                setShowSuggestions(false);
              }
            }}
          >
            {showTrackerCard ? "View Suggestions" : "Hide"}
          </Button>
        </div>
      </div>
      
      <div className="relative">
        {showTrackerCard ? (
          <GoalTrackerCard 
            goal={activeGoal} 
            onUpdateProgress={onUpdateGoalProgress}
            onEditGoal={() => {}} // You can implement this functionality later
            onSwitchGoal={handleSwitchGoal}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {suggestions.length > 0 && currentIndex < suggestions.length && (
              <GoalSuggestion 
                suggestion={suggestions[currentIndex]} 
                onAdopt={handleAdopt} 
                onSkip={handleSkip}
                onAddGoal={onAddGoal}
              />
            )}
          </div>
        )}
        
        {/* Removed the Generate More Ideas button here */}
      </div>
    </div>
  );
};

export default AISuggestions;
