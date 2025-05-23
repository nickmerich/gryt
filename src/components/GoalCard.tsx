
import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Target, Flame, Trophy, Edit } from 'lucide-react';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import GhibliCard from './GhibliCard';
import GhibliButton from './GhibliButton';
import { useMilestones } from '@/hooks/useMilestones';
import { useStreaks } from '@/hooks/useStreaks';
import ProgressVisualization from './ProgressVisualization';
import { Goal } from '@/hooks/useGoals';
import EditGoalDialog from './EditGoalDialog';

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

  const getStreakDescription = (streaks?: number): string => {
    if (!streaks) return "No active streak yet";
    if (streaks === 1) return "1 day streak";
    if (streaks < 5) return `${streaks} day streak`;
    if (streaks < 10) return `${streaks} day streak 🔥`;
    return `${streaks} day streak 🔥🔥`;
  };

  return (
    <>
      <GhibliCard 
        glow={isCompleted} 
        className="slide-animation transition-all duration-300 hover:scale-[1.02]"
        illustration={goal.category === 'Health & Fitness' ? 'mountains' : 
                     goal.category === 'Education' ? 'landscape' : 
                     goal.category === 'Personal' ? 'foggy' : 'grass'}
        illustrationOpacity={0.03}
      >
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-2">
            <Badge className={getCategoryColor(goal.category)}>
              {goal.category}
            </Badge>
            <div className="flex gap-2">
              {isCompleted && <Trophy className="w-5 h-5 text-yellow-500" />}
              {!isCompleted && streakCount >= 5 && 
                <Badge variant="outline" className="flex items-center gap-1 border-gryt-red/30 text-gryt-red">
                  <Flame className="w-3 h-3" />
                  {streakCount}
                </Badge>
              }
              <button 
                onClick={() => setIsEditDialogOpen(true)}
                className="text-gryt-blue hover:text-gryt-blue/70 transition-colors"
                title="Edit goal"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
          <CardTitle className="text-lg font-bold text-gryt-dark dark:text-gryt-gray">{goal.title}</CardTitle>
          <CardDescription className="text-gryt-blue/80 dark:text-gryt-light/80">{goal.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Goal image if available */}
          {goal.imageUrl && (
            <div className="rounded-md overflow-hidden border mb-4 h-32">
              <img
                src={goal.imageUrl}
                alt={goal.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Mini progress visualization */}
          <div className="h-16">
            <ProgressVisualization 
              goal={goal} 
              type={goal.category === 'Health & Fitness' ? 'mountain' : 'tree'} 
              size="sm"
            />
          </div>
        
          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gryt-dark/70 dark:text-gryt-gray/70">Progress</span>
              <span className="text-sm font-semibold text-gryt-blue dark:text-gryt-light">{goal.progress}%</span>
            </div>
            <Progress value={goal.progress} className="h-2 bg-gryt-gray dark:bg-gryt-dark/50" 
              indicatorClassName="bg-gradient-to-r from-gryt-red to-gryt-blue" />
          </div>

          {/* Streaks */}
          {!isCompleted && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gryt-red">
                <Flame className="w-4 h-4" />
                <span>{getStreakDescription(streakCount)}</span>
              </div>
              {goal.lastCheckin && <span className="text-xs text-gryt-blue/60 dark:text-gryt-light/60">
                Last update: {new Date(goal.lastCheckin).toLocaleDateString()}
              </span>}
            </div>
          )}

          {/* Milestones */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-gryt-dark/70 dark:text-gryt-gray/70" />
              <span className="text-sm font-medium text-gryt-dark/80 dark:text-gryt-gray/80">
                Milestones ({completedMilestonesCount}/{milestones?.length || 0})
              </span>
            </div>
            {loadingMilestones ? (
              <div className="text-sm text-gray-500">Loading milestones...</div>
            ) : milestones && milestones.length > 0 ? (
              <div className="space-y-1">
                {milestones.slice(0, 3).map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${
                      milestone.is_completed ? 'bg-gryt-blue dark:bg-gryt-light' : 'bg-gryt-gray dark:bg-gryt-dark/50'
                    }`} />
                    <span className={milestone.is_completed ? 'text-gryt-blue dark:text-gryt-light line-through' : 'text-gryt-dark/70 dark:text-gryt-gray/70'}>
                      {milestone.title}
                    </span>
                    {milestone.is_completed && (
                      <CheckCircle className="w-3 h-3 text-gryt-blue dark:text-gryt-light ml-auto" />
                    )}
                  </div>
                ))}
                {milestones.length > 3 && (
                  <div className="text-xs text-gryt-blue hover:text-gryt-red dark:text-gryt-light dark:hover:text-gryt-red mt-1 pl-4 cursor-pointer hover:underline transition-colors">
                    +{milestones.length - 3} more milestones
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No milestones added yet</div>
            )}
          </div>

          {/* Target Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gryt-dark/70 dark:text-gryt-gray/70" />
            <span className={`${
              daysUntilTarget < 0 ? 'text-gryt-red' : 
              daysUntilTarget < 7 ? 'text-gryt-red/70' : 
              'text-gryt-blue dark:text-gryt-light'
            }`}>
              {daysUntilTarget > 0 
                ? `${daysUntilTarget} days remaining` 
                : daysUntilTarget === 0 
                ? 'Due today!' 
                : `${Math.abs(daysUntilTarget)} days overdue`
              }
            </span>
          </div>

          {/* Action Button */}
          {!isCompleted && (
            <GhibliButton 
              onClick={handleProgressUpdate}
              className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white dark:bg-gryt-blue dark:hover:bg-gryt-blue/90"
              size="sm"
              glowColor="blue"
            >
              Update Progress (+10%)
            </GhibliButton>
          )}

          {isCompleted && (
            <div className="flex items-center justify-center text-gryt-blue dark:text-gryt-light gap-2 font-medium pulse-animation">
              <CheckCircle className="w-4 h-4" />
              <span>Goal completed!</span>
            </div>
          )}
        </CardContent>
      </GhibliCard>

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
