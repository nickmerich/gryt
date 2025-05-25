
import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Flame, Edit } from 'lucide-react';

interface GoalCardHeaderProps {
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
  streakCount: number;
  onEditClick: () => void;
}

const GoalCardHeader = ({ 
  title, 
  description, 
  category, 
  isCompleted, 
  streakCount, 
  onEditClick 
}: GoalCardHeaderProps) => {
  return (
    <CardHeader className="pb-4">
      <div className="flex justify-between items-start mb-2">
        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm rounded-full px-3 py-1">
          {category}
        </Badge>
        <div className="flex gap-2">
          {isCompleted && <Trophy className="w-5 h-5 text-yellow-300" />}
          {!isCompleted && streakCount >= 3 && 
            <Badge variant="outline" className="flex items-center gap-1 border-white/30 text-white bg-white/10 backdrop-blur-sm rounded-full">
              <Flame className="w-3 h-3 text-orange-300" />
              {streakCount}
            </Badge>
          }
          <button 
            onClick={onEditClick}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            title="Edit goal"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
      <CardTitle className="text-2xl font-bold mb-2 text-white">{title}</CardTitle>
      <CardDescription className="text-white/90 text-base line-clamp-2">
        {description}
      </CardDescription>
    </CardHeader>
  );
};

export default GoalCardHeader;
