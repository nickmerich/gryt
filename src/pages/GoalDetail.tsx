
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useGoals } from '@/hooks/useGoals';
import { useMilestones } from '@/hooks/useMilestones';
import GhibliLayout from '@/components/GhibliLayout';
import MilestoneList from '@/components/milestones/MilestoneList';
import GoalImageSection from '@/components/goals/GoalImageSection';
import GoalProgressSection from '@/components/goals/GoalProgressSection';
import GoalDetailHeader from '@/components/goals/GoalDetailHeader';
import { toast } from 'sonner';

const GoalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { goals, isLoading } = useGoals();
  const { milestones, isLoading: milestonesLoading, updateMilestone, deleteMilestone, toggleMilestoneCompletion } = useMilestones(id);
  
  // State for milestone management
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [editingMilestoneTitle, setEditingMilestoneTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (isLoading || !id) {
    return (
      <GhibliLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </GhibliLayout>
    );
  }

  const goal = goals?.find(g => g.id === id);

  if (!goal) {
    return (
      <GhibliLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-black mb-4">Goal Not Found</h2>
          <p className="text-black mb-6">The goal you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </GhibliLayout>
    );
  }

  const targetDate = goal.targetDate ? new Date(goal.targetDate) : null;
  const daysRemaining = targetDate ? Math.ceil((targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  // Milestone handlers
  const handleGenerateMilestones = () => {
    setIsGenerating(true);
    // Add generation logic here
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Milestones generated successfully!');
    }, 2000);
  };

  const handleToggleComplete = (milestoneId: string, isCompleted: boolean) => {
    toggleMilestoneCompletion.mutate({ milestoneId, isCompleted: !isCompleted });
  };

  const handleToggleExpand = (milestoneId: string) => {
    setExpandedMilestoneId(expandedMilestoneId === milestoneId ? null : milestoneId);
  };

  const handleEdit = (milestoneId: string, currentTitle: string) => {
    setEditingMilestoneId(milestoneId);
    setEditingMilestoneTitle(currentTitle);
  };

  const handleSaveEdit = (milestoneId: string) => {
    updateMilestone.mutate({ milestoneId, title: editingMilestoneTitle });
    setEditingMilestoneId(null);
    setEditingMilestoneTitle('');
  };

  const handleCancelEdit = () => {
    setEditingMilestoneId(null);
    setEditingMilestoneTitle('');
  };

  const handleDelete = (milestoneId: string) => {
    deleteMilestone.mutate({ milestoneId });
  };

  const goalDetails = goal ? {
    id: goal.id,
    title: goal.title,
    description: goal.description || '',
    category: goal.category,
    target_date: goal.targetDate || ''
  } : null;

  return (
    <GhibliLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Button 
          onClick={() => navigate('/')} 
          variant="ghost" 
          className="hover:bg-white/50 text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Goal Header */}
        <GoalDetailHeader goal={goal} />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="modern-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Progress</h3>
            <div className="text-3xl font-bold text-black mb-2">{goal.progress}%</div>
            <Progress value={goal.progress} className="h-2" />
          </div>

          {targetDate && (
            <div className="modern-card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Target Date</h3>
              <div className="text-lg font-medium text-black mb-1">
                {targetDate.toLocaleDateString()}
              </div>
              {daysRemaining !== null && (
                <div className="text-sm text-black">
                  {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Overdue'}
                </div>
              )}
            </div>
          )}

          <div className="modern-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Milestones</h3>
            <div className="text-3xl font-bold text-black mb-2">
              {milestones?.filter(m => m.is_completed).length || 0}
            </div>
            <div className="text-sm text-black">
              of {milestones?.length || 0} completed
            </div>
          </div>
        </div>

        {/* Goal Image Section */}
        <GoalImageSection goal={goal} />

        {/* Goal Progress Section */}
        <GoalProgressSection goal={goal} />

        {/* Milestones Section */}
        <div className="modern-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Milestones</h2>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
              {milestones?.filter(m => m.is_completed).length || 0} / {milestones?.length || 0} Complete
            </Badge>
          </div>
          
          <MilestoneList 
            milestones={milestones || []}
            isLoading={milestonesLoading}
            expandedMilestoneId={expandedMilestoneId}
            editingMilestoneId={editingMilestoneId}
            editingMilestoneTitle={editingMilestoneTitle}
            onGenerateMilestones={handleGenerateMilestones}
            onToggleComplete={handleToggleComplete}
            onToggleExpand={handleToggleExpand}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDelete={handleDelete}
            setEditingMilestoneTitle={setEditingMilestoneTitle}
            isGenerating={isGenerating}
            goalDetails={goalDetails}
          />
        </div>

        {/* Additional Details */}
        {goal.description && (
          <div className="modern-card p-8">
            <h2 className="text-2xl font-bold text-black mb-4">Description</h2>
            <p className="text-black leading-relaxed whitespace-pre-wrap">
              {goal.description}
            </p>
          </div>
        )}
      </div>
    </GhibliLayout>
  );
};

export default GoalDetail;
