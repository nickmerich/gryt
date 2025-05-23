
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useGoals, GoalInput } from '@/hooks/useGoals';

interface SuggestedGoal {
  title: string;
  description: string;
  category: string;
  confidence: number;
}

interface GoalSuggestionProps {
  suggestion: SuggestedGoal;
  onAdopt: () => void;
  onSkip: () => void;
}

const GoalSuggestion: React.FC<GoalSuggestionProps> = ({ suggestion, onAdopt, onSkip }) => {
  const { createGoal } = useGoals();
  
  const adoptGoal = () => {
    const newGoal: GoalInput = {
      title: suggestion.title,
      description: suggestion.description,
      category: suggestion.category,
      target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to 30 days
    };
    
    createGoal.mutate(newGoal, {
      onSuccess: () => {
        toast.success('New goal added to your journey!');
        onAdopt();
      },
      onError: (error) => {
        toast.error(`Failed to add goal: ${error.message}`);
      }
    });
  };
  
  return (
    <Card className="bg-white/80 dark:bg-gryt-dark/30 backdrop-blur-sm border-2 border-gryt-blue/10 hover:border-gryt-blue/20 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-2 relative">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <Badge className="bg-gryt-blue/10 text-gryt-blue hover:bg-gryt-blue/20 dark:text-gryt-light">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Suggested
          </Badge>
        </div>
        <Badge className={`mb-2 inline-flex ${
          suggestion.category === 'Health & Fitness' ? 'bg-green-100 text-green-800' : 
          suggestion.category === 'Education' ? 'bg-blue-100 text-blue-800' :
          suggestion.category === 'Career' ? 'bg-gryt-blue/20 text-gryt-blue' :
          suggestion.category === 'Personal' ? 'bg-orange-100 text-orange-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {suggestion.category}
        </Badge>
        <CardTitle className="text-lg font-semibold">{suggestion.title}</CardTitle>
        <CardDescription>{suggestion.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:hover:bg-gray-800"
          onClick={onSkip}
        >
          <ThumbsDown className="h-4 w-4 mr-1" />
          Skip
        </Button>
        <Button 
          size="sm" 
          className="bg-gryt-blue hover:bg-gryt-blue/90 text-white" 
          onClick={adoptGoal}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add to My Goals
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalSuggestion;
