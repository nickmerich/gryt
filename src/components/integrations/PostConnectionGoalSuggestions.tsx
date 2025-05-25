
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Zap, CheckCircle } from 'lucide-react';

interface GoalSuggestion {
  title: string;
  description: string;
  category: string;
  icon: string;
  targetType: string;
}

interface PostConnectionGoalSuggestionsProps {
  integration: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGoal: (suggestion: GoalSuggestion) => void;
}

const PostConnectionGoalSuggestions: React.FC<PostConnectionGoalSuggestionsProps> = ({
  integration,
  open,
  onOpenChange,
  onCreateGoal
}) => {
  const getGoalSuggestions = (integrationName: string): GoalSuggestion[] => {
    const suggestions: Record<string, GoalSuggestion[]> = {
      'Strava': [
        {
          title: '🏃‍♂️ 7-Day Running Streak',
          description: 'Run at least 1 mile every day for a week',
          category: 'Health & Fitness',
          icon: '🏃‍♂️',
          targetType: 'streak'
        },
        {
          title: '📏 50 Miles This Month',
          description: 'Complete 50 miles of running/cycling combined',
          category: 'Health & Fitness',
          icon: '📏',
          targetType: 'distance'
        }
      ],
      'Duolingo': [
        {
          title: '🎯 200 XP/Week Challenge',
          description: 'Earn 200+ XP each week for consistent learning',
          category: 'Education',
          icon: '🎯',
          targetType: 'points'
        },
        {
          title: '🔥 30-Day Streak Master',
          description: 'Maintain a 30-day learning streak',
          category: 'Education',
          icon: '🔥',
          targetType: 'streak'
        }
      ],
      'GitHub': [
        {
          title: '✅ 3 PRs Merged This Week',
          description: 'Get 3 pull requests merged into main branches',
          category: 'Career',
          icon: '✅',
          targetType: 'contributions'
        },
        {
          title: '🚀 Daily Commit Habit',
          description: 'Make at least 1 meaningful commit every day',
          category: 'Career',
          icon: '🚀',
          targetType: 'streak'
        }
      ],
      'Goodreads': [
        {
          title: '📚 Read 2 Books This Month',
          description: 'Complete 2 books and write reviews',
          category: 'Personal',
          icon: '📚',
          targetType: 'quantity'
        }
      ],
      'Chess.com': [
        {
          title: '♟️ Improve Rating by 100',
          description: 'Increase your chess rating by 100 points',
          category: 'Games',
          icon: '♟️',
          targetType: 'rating'
        }
      ]
    };

    return suggestions[integrationName] || [];
  };

  const suggestions = getGoalSuggestions(integration);

  const handleUseGoal = (suggestion: GoalSuggestion) => {
    onCreateGoal(suggestion);
    onOpenChange(false);
  };

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            {integration} Connected!
          </DialogTitle>
          <DialogDescription>
            Get started with these goal ideas based on your {integration} activity:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 pt-4">
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleUseGoal(suggestion)}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="text-xs">{suggestion.category}</Badge>
                  <Button 
                    size="sm" 
                    className="bg-gryt-blue hover:bg-gryt-blue/90 text-xs h-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseGoal(suggestion);
                    }}
                  >
                    Use This Goal
                  </Button>
                </div>
                <h3 className="font-medium text-sm mb-1">{suggestion.title}</h3>
                <p className="text-xs text-gray-600">{suggestion.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-500">
            Maybe Later
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            I'll Create My Own
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostConnectionGoalSuggestions;
