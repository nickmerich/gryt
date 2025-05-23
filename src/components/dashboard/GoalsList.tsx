
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';
import GoalCard from '@/components/GoalCard';
import { Goal } from '@/hooks/useGoals';

interface GoalsListProps {
  goals?: Goal[];
  isLoading: boolean;
  onOpenCreateDialog: () => void;
  onUpdateGoalProgress: (goalId: string, newProgress: number) => void;
  onEditGoal?: (goalId: string, title: string, description: string, category: string, targetDate: string, imageFile?: File | null) => Promise<void>;
}

const GoalsList = ({ 
  goals = [], 
  isLoading, 
  onOpenCreateDialog, 
  onUpdateGoalProgress,
  onEditGoal
}: GoalsListProps) => {
  const handleEditGoal = async (
    goalId: string, 
    title: string, 
    description: string, 
    category: string, 
    targetDate: string,
    imageFile?: File | null
  ) => {
    if (onEditGoal) {
      await onEditGoal(goalId, title, description, category, targetDate, imageFile);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="ghibli-title">Your Goals</h2>
        <GhibliButton 
          onClick={onOpenCreateDialog}
          className="bg-gryt-red hover:bg-gryt-red/90 text-white"
          glowColor="red"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </GhibliButton>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gryt-red mb-4"></div>
          <p className="text-gryt-dark dark:text-gryt-gray">Loading your goals...</p>
        </div>
      ) : goals?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Link to={`/goal/${goal.id}`} key={goal.id} className="block transition-transform hover:scale-[1.01]">
              <GoalCard 
                goal={goal}
                onUpdateProgress={onUpdateGoalProgress}
                onEditGoal={handleEditGoal}
              />
            </Link>
          ))}
        </div>
      ) : (
        <GhibliCard>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold text-gryt-dark dark:text-gryt-gray mb-2">No goals yet</h3>
            <p className="text-gryt-dark/70 dark:text-gryt-gray/70 mb-4">Start your journey by creating your first goal!</p>
            <GhibliButton 
              onClick={onOpenCreateDialog}
              className="bg-gryt-red hover:bg-gryt-red/90 text-white"
              glowColor="red"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Goal
            </GhibliButton>
          </CardContent>
        </GhibliCard>
      )}
    </>
  );
};

export default GoalsList;
