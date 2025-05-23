
import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Target, Flame, Trophy, Edit, ChevronRight } from 'lucide-react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GhibliCard from './GhibliCard';
import { useMilestones } from '@/hooks/useMilestones';
import { useStreaks } from '@/hooks/useStreaks';
import { useTodos } from '@/hooks/useTodos';
import ProgressVisualization from './ProgressVisualization';
import { Goal } from '@/hooks/useGoals';
import EditGoalDialog from './EditGoalDialog';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

  // Random motivational quotes
  const motivationalQuotes = [
    "Every step forward is a victory.",
    "Progress is progress, no matter how small.",
    "You're closer than you think!",
    "Keep pushing, keep growing.",
    "Small steps, big changes.",
    "You've got this!"
  ];
  
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <>
      <div className="group">
        <div className={`rounded-xl overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] bg-gradient-to-r ${
          goal.category === 'Health & Fitness' ? 'from-green-400 to-teal-500' :
          goal.category === 'Career' ? 'from-gryt-blue to-gryt-purple' :
          goal.category === 'Finance' ? 'from-yellow-400 to-orange-500' :
          'from-pink-400 to-purple-500'
        } text-white`}>
          <div className="flex flex-col h-full">
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {goal.category}
                </Badge>
                <div className="flex gap-2">
                  {isCompleted && <Trophy className="w-5 h-5 text-yellow-300" />}
                  {!isCompleted && streakCount >= 3 && 
                    <Badge variant="outline" className="flex items-center gap-1 border-white/30 text-white bg-white/10 backdrop-blur-sm">
                      <Flame className="w-3 h-3 text-orange-300" />
                      {streakCount}
                    </Badge>
                  }
                  <button 
                    onClick={() => setIsEditDialogOpen(true)}
                    className="text-white/70 hover:text-white transition-colors"
                    title="Edit goal"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-2 mb-1">{goal.title}</h3>
              <p className="text-white/80 text-sm line-clamp-2">{goal.description}</p>
            </div>
            
            {/* Visualization area */}
            <div className="px-6">
              <div className="h-20 mb-2">
                <ProgressVisualization 
                  goal={goal} 
                  type={goal.category === 'Health & Fitness' ? 'mountain' : 'tree'} 
                  size="sm"
                />
              </div>
            </div>

            {/* Progress section */}
            <div className="px-6 pb-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-white/80">Progress</span>
                <span className="text-sm font-bold">{goal.progress}%</span>
              </div>
              <Progress 
                value={goal.progress} 
                className="h-2 bg-white/30" 
                indicatorClassName="bg-white" 
              />
            </div>
            
            {/* Next milestone */}
            {nextMilestone && !isCompleted && (
              <div className="px-6 py-2">
                <div className="flex items-center gap-2 text-sm bg-white/10 p-2 rounded-md backdrop-blur-sm">
                  <ChevronRight className="w-4 h-4 text-white/70" />
                  <span className="font-medium">Next: {nextMilestone.title}</span>
                </div>
              </div>
            )}

            {/* Milestones summary */}
            <div className="px-6 pb-2 pt-1">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Target className="w-4 h-4" />
                <span>{completedMilestonesCount}/{totalMilestonesCount} milestones</span>
              </div>
            </div>

            {/* Target date */}
            <div className="px-6 pb-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-white/80" />
                <span className={`${
                  daysUntilTarget < 0 ? 'text-red-200' : 
                  daysUntilTarget < 7 ? 'text-orange-200' : 
                  'text-white/80'
                }`}>
                  {daysUntilTarget > 0 
                    ? `${daysUntilTarget} days remaining` 
                    : daysUntilTarget === 0 
                    ? 'Due today!' 
                    : `${Math.abs(daysUntilTarget)} days overdue`
                  }
                </span>
              </div>
            </div>
            
            {/* Motivational quote */}
            <div className="px-6 pb-3">
              <p className="text-xs italic text-white/70 mt-1">{randomQuote}</p>
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-white/20 p-4 bg-black/10 backdrop-blur-sm">
              {!isCompleted ? (
                <Button 
                  onClick={handleProgressUpdate}
                  className="w-full bg-white hover:bg-white/90 text-gryt-blue"
                  size="sm"
                >
                  Update Progress (+10%)
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-yellow-300" />
                  <span>Goal completed!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
