
import { useState } from 'react';
import { DemoGoal } from './DemoGoalTypes';

export const useDemoGoal = () => {
  const [demoGoal, setDemoGoal] = useState<DemoGoal>({
    id: 'demo-goal-1',
    title: 'Run a Marathon',
    description: 'Train for and complete a full 26.2-mile marathon',
    category: 'Health & Fitness',
    progress: 35,
    targetDate: '2024-12-31',
    milestones: [
      { id: '1', title: 'Run 5K without stopping', completed: true },
      { id: '2', title: 'Run 10K under 60 minutes', completed: true },
      { id: '3', title: 'Complete a half marathon', completed: false },
      { id: '4', title: 'Run 20-mile training run', completed: false },
    ],
    completedMilestones: 2,
    todos: [
      { id: '1', title: 'Morning 5K run', isCompleted: false },
      { id: '2', title: 'Strength training session', isCompleted: true },
      { id: '3', title: 'Plan next week\'s training schedule', isCompleted: false },
    ],
    userId: 'demo-user',
    created_at: '2024-01-15',
    updated_at: '2024-01-20'
  });

  const updateProgress = (newProgress: number) => {
    setDemoGoal(prev => ({ ...prev, progress: Math.min(100, Math.max(0, newProgress)) }));
  };

  const toggleMilestone = (milestoneId: string) => {
    setDemoGoal(prev => {
      const updatedMilestones = prev.milestones.map(milestone =>
        milestone.id === milestoneId ? { ...milestone, completed: !milestone.completed } : milestone
      );
      
      return {
        ...prev,
        milestones: updatedMilestones,
        completedMilestones: updatedMilestones.filter(m => m.completed).length
      };
    });
  };

  const toggleTodo = (todoId: string) => {
    setDemoGoal(prev => ({
      ...prev,
      todos: prev.todos.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    }));
  };

  const addTodo = (title: string) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      isCompleted: false
    };
    setDemoGoal(prev => ({
      ...prev,
      todos: [...prev.todos, newTodo]
    }));
  };

  const updateGoalProgress = (increment: number) => {
    setDemoGoal(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, prev.progress + increment)),
      milestones: prev.milestones.map((milestone, index) => ({
        ...milestone,
        completed: (prev.progress + increment) > (index + 1) * 25
      }))
    }));
  };

  return {
    demoGoal,
    updateProgress,
    toggleMilestone,
    toggleTodo,
    addTodo,
    updateGoalProgress
  };
};
