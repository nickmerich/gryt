import { useState, useEffect } from 'react';
import { useMilestones } from '@/hooks/useMilestones';
import { useStreaks } from '@/hooks/useStreaks';
import { Goal } from '@/hooks/useGoals';
import EditGoalDialog from './EditGoalDialog';
import { motion } from 'framer-motion';
import { 
  GoalCardHeader, 
  GoalCardProgress, 
  GoalCardStats, 
  GoalCardActions 
} from './goal-card';

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (goalId: string, newProgress: number) => void;
  onEditGoal: (goalId: string, title: string, description: string, category: string, targetDate: string, imageFile?: File | null) => Promise<void>;
}

const GoalCard = ({ goal, onUpdateProgress, onEditGoal }: GoalCardProps) => {
  const { milestones, isLoading: loadingMilestones } = useMilestones(goal.id);
  const { streaks, getCurrentStreak } = useStreaks(goal.id);
  
  const [streakCount, setStreakCount] = useState(0);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  useEffect(() => {
    if (streaks) {
      const count = getCurrentStreak();
      setStreakCount(count);
    }
  }, [streaks, getCurrentStreak]);

  const completedMilestonesCount = milestones?.filter(m => m.is_completed).length || 0;
  const totalMilestonesCount = milestones?.length || 0;
  
  const nextMilestone = milestones?.find(m => !m.is_completed);

  const isCompleted = goal.progress >= 100;
  const daysUntilTarget = Math.ceil(
    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleProgressUpdate = () => {
    const newProgress = Math.min(goal.progress + 10, 100);
    onUpdateProgress(goal.id, newProgress);
  };

  const handleEditGoal = async (data: any, imageFile: File | null) => {
    await onEditGoal(
      goal.id,
      data.title, 
      data.description || '', 
      data.category, 
      data.target_date,
      imageFile
    );
  };

  const motivationalQuotes = [
    "Every step forward is a victory.",
    "Progress is progress, no matter how small.",
    "You're closer than you think!",
    "Keep pushing, keep growing.",
    "Small steps, big changes.",
    "You've got this!"
  ];
  
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const categoryGradients = {
    'Health & Fitness': 'from-green-500 to-emerald-600',
    'Career': 'from-indigo-500 to-purple-600',
    'Finance': 'from-yellow-500 to-orange-600',
    'Education': 'from-blue-500 to-cyan-600',
    'Personal': 'from-pink-500 to-rose-600'
  };

  const gradient = categoryGradients[goal.category as keyof typeof categoryGradients] || 'from-indigo-500 to-purple-600';

  return (
    <>
      <motion.div 
        className="group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`modern-card overflow-hidden bg-gradient-to-br ${gradient} text-white relative rounded-3xl`}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20 rounded-3xl"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <GoalCardHeader
              title={goal.title}
              description={goal.description}
              category={goal.category}
              isCompleted={isCompleted}
              streakCount={streakCount}
              onEditClick={() => setIsEditDialogOpen(true)}
            />

            <GoalCardProgress progress={goal.progress} />
            
            <GoalCardStats
              nextMilestone={nextMilestone}
              completedMilestonesCount={completedMilestonesCount}
              totalMilestonesCount={totalMilestonesCount}
              daysUntilTarget={daysUntilTarget}
              isCompleted={isCompleted}
            />
            
            <GoalCardActions
              goalId={goal.id}
              isCompleted={isCompleted}
              randomQuote={randomQuote}
              onProgressUpdate={handleProgressUpdate}
            />
          </div>
        </div>
      </motion.div>

      <EditGoalDialog 
        goal={goal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onEditGoal={handleEditGoal}
      />
    </>
  );
};

export default GoalCard;
