
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { GoalInput } from '@/hooks/useGoals';

interface GoalSuggestionProps {
  title: string;
  description: string;
  category: string;
  onAddGoal: (goal: GoalInput) => void;
}

const GoalSuggestion: React.FC<GoalSuggestionProps> = ({
  title,
  description,
  category,
  onAddGoal
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Health & Fitness': 'bg-green-100 text-green-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Career': 'bg-purple-100 text-purple-800',
      'Personal': 'bg-orange-100 text-orange-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleAdd = () => {
    const goal: GoalInput = {
      title,
      description,
      category,
      target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
    };
    onAddGoal(goal);
  };

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6 px-5">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getCategoryColor(category)}>
            {category}
          </Badge>
          <button
            onClick={handleAdd}
            className="flex items-center text-xs text-gryt-blue hover:text-gryt-red transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
        <h3 className="font-medium text-gryt-dark mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default GoalSuggestion;
