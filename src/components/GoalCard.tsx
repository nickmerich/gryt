
import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Target, Flame, Trophy, Edit, ChevronRight } from 'lucide-react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMilestones } from '@/hooks/useMilestones';
import { useStreaks } from '@/hooks/useStreaks';
import ProgressVisualization from './ProgressVisualization';
import { Goal } from '@/hooks/useGoals';
import EditGoalDialog from './EditGoalDialog';
import { motion } from 'framer-motion';

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
          
          {/* Goal Image Section */}
          {goal.imageUrl && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={goal.imageUrl}
                alt={goal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
          )}
          
          <div className="relative z-10 flex flex-col h-full">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm rounded-full px-3 py-1">
                  {goal.category}
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
                    onClick={() => setIsEditDialogOpen(true)}
                    className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                    title="Edit goal"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold mb-2 text-white">{goal.title}</CardTitle>
              <CardDescription className="text-white/90 text-base line-clamp-2">
                {goal.description}
              </CardDescription>
            </CardHeader>
            
            <div className="px-8">
              <div className="h-20 mb-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <ProgressVisualization 
                  goal={goal} 
                  type={goal.category === 'Health & Fitness' ? 'mountain' : 'tree'} 
                  size="sm"
                />
              </div>
            </div>

            <CardContent className="pb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base font-medium text-white">Progress</span>
                <span className="text-xl font-bold text-white">{goal.progress}%</span>
              </div>
              <Progress 
                value={goal.progress} 
                className="h-3 bg-white/30 rounded-full" 
                indicatorClassName="bg-white rounded-full" 
              />
            </CardContent>
            
            {nextMilestone && !isCompleted && (
              <div className="px-8 py-3">
                <div className="flex items-center gap-3 text-sm bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
                  <ChevronRight className="w-4 h-4 text-white/70" />
                  <span className="font-medium text-white">Next: {nextMilestone.title}</span>
                </div>
              </div>
            )}

            <div className="px-8 pb-3 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/90">
                <Target className="w-4 h-4" />
                <span className="text-white">{completedMilestonesCount}/{totalMilestonesCount} milestones completed</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-white/80" />
                <span className={`${
                  daysUntilTarget < 0 ? 'text-red-200' : 
                  daysUntilTarget < 7 ? 'text-orange-200' : 
                  'text-white'
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
            
            <div className="px-8 pb-4">
              <p className="text-sm italic text-white/70">{randomQuote}</p>
            </div>

            <div className="mt-auto border-t border-white/20 p-6 bg-black/10 backdrop-blur-sm rounded-b-3xl">
              {!isCompleted ? (
                <Button 
                  onClick={handleProgressUpdate}
                  className="w-full bg-white hover:bg-white/90 text-slate-900 rounded-2xl font-medium"
                  size="default"
                >
                  Update Progress (+10%)
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 font-medium text-lg text-white">
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span>Goal Completed! 🎉</span>
                </div>
              )}
            </div>
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
