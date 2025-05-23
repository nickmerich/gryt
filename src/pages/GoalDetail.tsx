import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Goal, parseGoalRow } from '@/integrations/supabase/goal.types'; 
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Calendar, 
  Loader2, 
  Clock,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import GhibliLayout from '@/components/GhibliLayout';
import MilestoneManager from '@/components/MilestoneManager';
import ProgressVisualization from '@/components/ProgressVisualization';

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
  const isCompleted = goal.progress >= 100;

  return (
    <GhibliLayout>
      <div className="container mx-auto px-4 py-8">
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
        
        {/* Goal Progress and Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-7 space-y-6">
            {/* Progress visualization */}
            <div className="bg-white dark:bg-gryt-dark/30 p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-medium mb-4">Progress Tracker</h3>
              
              <div className="h-40 mb-4">
                <ProgressVisualization 
                  goal={goal} 
                  type={goal.category === 'Health & Fitness' ? 'mountain' : 'tree'} 
                />
              </div>
              
              <div className="mb-2 flex justify-between items-center">
                <span className="font-medium">Overall Progress</span>
                <span className="font-bold text-gryt-blue">{goal.progress}%</span>
              </div>
              
              <Progress value={goal.progress} className="h-2.5 mb-4" />
              
              <div className="flex justify-end">
                <Button
                  onClick={() => handleUpdateProgress(Math.min(goal.progress + 10, 100))}
                  disabled={isCompleted || updating}
                  className="bg-gryt-blue hover:bg-gryt-blue/90 text-white"
                >
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Progress (+10%)'
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 space-y-6">
            {/* Goal Image */}
            {goal.imageUrl && (
              <div className="bg-white dark:bg-gryt-dark/30 p-6 rounded-lg border shadow-sm">
                <h3 className="text-lg font-medium mb-4">Goal Visualization</h3>
                <div className="rounded-md overflow-hidden border">
                  <img
                    src={goal.imageUrl}
                    alt={goal.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      // Fallback for image loading errors
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
                      console.error('Failed to load image:', goal.imageUrl);
                    }}
                  />
                </div>
              </div>
            )}
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
