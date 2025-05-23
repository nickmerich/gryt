
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { Goal } from '@/integrations/supabase/goal.types';

interface GoalDetailHeaderProps {
  goal: Goal;
  daysUntilTarget: number;
}

const GoalDetailHeader = ({ goal, daysUntilTarget }: GoalDetailHeaderProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Health & Fitness': 'bg-green-100 text-green-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Career': 'bg-gryt-blue/20 text-gryt-blue',
      'Personal': 'bg-orange-100 text-orange-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-gryt-blue hover:text-gryt-blue/80"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      {/* Goal Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Badge className={getCategoryColor(goal.category)}>
            {goal.category}
          </Badge>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className={`${
              daysUntilTarget < 0 ? 'text-gryt-red' : 
              daysUntilTarget < 7 ? 'text-gryt-red/70' : 
              'text-gryt-blue'
            }`}>
              {daysUntilTarget > 0 
                ? `${daysUntilTarget} days remaining` 
                : daysUntilTarget === 0 
                ? 'Due today!' 
                : `${Math.abs(daysUntilTarget)} days overdue`
              }
            </span>
          </div>
          
          {goal.lastCheckin && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date(goal.lastCheckin).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold text-gryt-dark dark:text-gryt-gray">{goal.title}</h1>
        {goal.description && (
          <p className="mt-2 text-gryt-blue/80 dark:text-gryt-light/80">{goal.description}</p>
        )}
      </div>
    </>
  );
};

export default GoalDetailHeader;
