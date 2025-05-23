
import { useState } from 'react';
import { toast } from 'sonner';
import { Milestone } from '@/hooks/useMilestones';

export const useMilestoneActions = (
  goalId: string,
  createMilestone: any,
  updateMilestone: any,
  deleteMilestone: any,
  toggleMilestoneCompletion: any
) => {
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [editingMilestoneTitle, setEditingMilestoneTitle] = useState('');
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);
  
  const handleSubmit = (title: string) => {
    createMilestone.mutate(
      { goalId, title },
      {
        onSuccess: () => {
          toast.success('Milestone added');
        },
      }
    );
  };
  
  const handleToggleComplete = (milestoneId: string, isCompleted: boolean) => {
    toggleMilestoneCompletion.mutate({ milestoneId, isCompleted: !isCompleted });
  };
  
  const handleEdit = (milestoneId: string, currentTitle: string) => {
    setEditingMilestoneId(milestoneId);
    setEditingMilestoneTitle(currentTitle);
  };
  
  const handleCancelEdit = () => {
    setEditingMilestoneId(null);
    setEditingMilestoneTitle('');
  };

  const handleSaveEdit = (milestoneId: string) => {
    if (!editingMilestoneTitle.trim()) return;
    
    updateMilestone.mutate(
      { milestoneId, title: editingMilestoneTitle.trim() },
      {
        onSuccess: () => {
          setEditingMilestoneId(null);
          setEditingMilestoneTitle('');
          toast.success('Milestone updated');
        },
        onError: () => {
          toast.error('Failed to update milestone');
        }
      }
    );
  };

  const handleDelete = (milestoneId: string) => {
    deleteMilestone.mutate(
      { milestoneId },
      {
        onSuccess: () => {
          toast.success('Milestone deleted');
        },
        onError: () => {
          toast.error('Failed to delete milestone');
        }
      }
    );
  };

  const toggleMilestoneExpansion = (milestoneId: string) => {
    if (expandedMilestoneId === milestoneId) {
      setExpandedMilestoneId(null);
    } else {
      setExpandedMilestoneId(milestoneId);
    }
  };

  return {
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
  };
};
