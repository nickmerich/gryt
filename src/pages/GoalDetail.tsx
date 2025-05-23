
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Goal, parseGoalRow } from '@/integrations/supabase/goal.types'; 
import { toast } from 'sonner';
import { Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GhibliLayout from '@/components/GhibliLayout';
import MilestoneManager from '@/components/MilestoneManager';
import MarathonTrainingTips from '@/components/MarathonTrainingTips';
import GoalDetailHeader from '@/components/goals/GoalDetailHeader';
import GoalProgressSection from '@/components/goals/GoalProgressSection';
import GoalImageSection from '@/components/goals/GoalImageSection';
import { Link } from 'react-router-dom';

const GoalDetail = () => {
  const { goalId } = useParams<{ goalId: string }>();
  const { user } = useAuth();
  const [updating, setUpdating] = useState(false);

  const { data: goal, isLoading, error } = useQuery<Goal>({
    queryKey: ['goal-detail', goalId],
    queryFn: async () => {
      if (!goalId) throw new Error("Goal ID is required");
      
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('id', goalId)
        .single();
        
      if (error) throw error;
      
      // Use parseGoalRow utility to convert database format to our Goal model
      return parseGoalRow(data);
    },
    enabled: !!goalId && !!user,
  });

  const handleUpdateProgress = async (newProgress: number) => {
    if (!goalId) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('goals')
        .update({ 
          progress: newProgress,
          updated_at: new Date().toISOString()
        })
        .eq('id', goalId);
        
      if (error) throw error;
      
      toast.success(`Progress updated to ${newProgress}%`);
    } catch (err) {
      console.error('Error updating progress:', err);
      toast.error('Failed to update progress');
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <GhibliLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-gryt-blue" />
          <p className="mt-4 text-gryt-blue">Loading goal details...</p>
        </div>
      </GhibliLayout>
    );
  }

  if (error || !goal) {
    return (
      <GhibliLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <Info className="h-12 w-12 text-gryt-red" />
          <h2 className="mt-4 font-bold text-xl">Goal not found</h2>
          <p className="text-gray-600 mb-4">The goal you're looking for doesn't exist or you don't have access to it.</p>
          <Button asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </GhibliLayout>
    );
  }

  const daysUntilTarget = Math.ceil(
    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Check if this is a marathon-related goal
  const isMarathonGoal = goal.category === 'Health & Fitness' && 
                        (goal.title.toLowerCase().includes('marathon') || 
                         goal.description?.toLowerCase().includes('marathon'));

  return (
    <GhibliLayout>
      <div className="container mx-auto px-4 py-8">
        <GoalDetailHeader goal={goal} daysUntilTarget={daysUntilTarget} />
        
        {/* Goal Progress and Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-7 space-y-6">
            {/* Progress visualization */}
            <GoalProgressSection 
              goal={goal} 
              isUpdating={updating} 
              onUpdateProgress={handleUpdateProgress} 
            />
            
            {/* Show Marathon Training Tips component for marathon-related goals */}
            {isMarathonGoal && (
              <MarathonTrainingTips goal={goal} />
            )}
          </div>
          
          <div className="md:col-span-5 space-y-6">
            {/* Goal Image */}
            <GoalImageSection goal={goal} />
          </div>
        </div>
        
        {/* Milestones & To-Dos Section */}
        <div className="bg-white dark:bg-gryt-dark/30 p-6 rounded-lg border shadow-sm">
          <MilestoneManager goalId={goal.id} />
        </div>
      </div>
    </GhibliLayout>
  );
};

export default GoalDetail;
