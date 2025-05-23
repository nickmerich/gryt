
import { useState } from 'react';
import { useMilestones } from '@/hooks/useMilestones';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import MilestoneList from './milestones/MilestoneList';
import AddMilestoneForm from './milestones/AddMilestoneForm';
import MilestoneHeader from './milestones/MilestoneHeader';
import { useMilestoneActions } from '@/hooks/useMilestoneActions';
import { generateMilestonesAndTasks } from './milestones/MilestoneGenerator';

interface MilestoneManagerProps {
  goalId: string;
}

interface GoalDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  target_date: string;
}

const MilestoneManager = ({ goalId }: MilestoneManagerProps) => {
  const { 
    milestones, 
    isLoading, 
    createMilestone, 
    toggleMilestoneCompletion,
    updateMilestone,
    deleteMilestone
  } = useMilestones(goalId);

  // Fetch goal details for generating milestones
  const { data: goalDetails } = useQuery<GoalDetails>({
    queryKey: ['goal-details-for-milestones', goalId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('id, title, description, category, target_date')
        .eq('id', goalId)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!goalId,
  });

  // Use the milestone actions hook
  const {
    editingMilestoneId,
    editingMilestoneTitle,
    setEditingMilestoneTitle,
    expandedMilestoneId,
    handleSubmit,
    handleToggleComplete,
    handleEdit,
    handleCancelEdit,
    handleSaveEdit,
    handleDelete,
    toggleMilestoneExpansion
  } = useMilestoneActions(
    goalId,
    createMilestone,
    updateMilestone,
    deleteMilestone,
    toggleMilestoneCompletion
  );

  // Handler for generating milestones
  const handleGenerateMilestones = async () => {
    if (!goalDetails) return;
    
    await generateMilestonesAndTasks({
      goalDetails,
      goalId,
      createMilestoneMutation: createMilestone
    });
  };

  return (
    <div>
      <CardHeader className="pb-3">
        <MilestoneHeader 
          milestones={milestones} 
          isEmpty={milestones?.length === 0}
          isPending={createMilestone.isPending}
          onGenerateMilestones={handleGenerateMilestones}
          goalDetails={goalDetails}
        />
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Milestone List */}
          <MilestoneList
            milestones={milestones || []}
            isLoading={isLoading}
            expandedMilestoneId={expandedMilestoneId}
            editingMilestoneId={editingMilestoneId}
            editingMilestoneTitle={editingMilestoneTitle}
            onGenerateMilestones={handleGenerateMilestones}
            onToggleComplete={handleToggleComplete}
            onToggleExpand={toggleMilestoneExpansion}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDelete={handleDelete}
            setEditingMilestoneTitle={setEditingMilestoneTitle}
            isGenerating={createMilestone.isPending}
            goalDetails={goalDetails}
          />

          {/* Add new milestone form */}
          {(!isLoading && (milestones?.length ?? 0) > 0) && (
            <AddMilestoneForm 
              isSubmitting={createMilestone.isPending} 
              onSubmit={handleSubmit} 
            />
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default MilestoneManager;
