
import { useState } from 'react';
import { DemoGoal, TourStep } from './DemoGoalTypes';

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
    updated_at: '2024-01-20',
    user_id: 'demo-user',
    image_url: ''
  });

  const [tourStep, setTourStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const tourSteps: TourStep[] = [
    {
      title: 'Welcome to Your Goal',
      description: 'This is your goal dashboard where you can track progress and manage milestones.'
    },
    {
      title: 'Track Progress',
      description: 'Use the progress buttons to update your goal completion percentage.'
    },
    {
      title: 'Manage Milestones',
      description: 'Check off milestones as you complete them to stay motivated.'
    },
    {
      title: 'Daily Tasks',
      description: 'Add and complete daily tasks that help you achieve your goal.'
    },
    {
      title: 'Celebrate Success',
      description: 'Enjoy the journey and celebrate your achievements along the way!'
    }
  ];

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

  const completeTodo = (todoId: string) => {
    toggleTodo(todoId);
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

  const resetDemo = () => {
    setDemoGoal({
      id: 'demo-goal-1',
      title: 'Run a Marathon',
      description: 'Train for and complete a full 26.2-mile marathon',
      category: 'Health & Fitness',
      progress: 0,
      targetDate: '2024-12-31',
      milestones: [
        { id: '1', title: 'Run 5K without stopping', completed: false },
        { id: '2', title: 'Run 10K under 60 minutes', completed: false },
        { id: '3', title: 'Complete a half marathon', completed: false },
        { id: '4', title: 'Run 20-mile training run', completed: false },
      ],
      completedMilestones: 0,
      todos: [
        { id: '1', title: 'Morning 5K run', isCompleted: false },
        { id: '2', title: 'Strength training session', isCompleted: false },
        { id: '3', title: 'Plan next week\'s training schedule', isCompleted: false },
      ],
      userId: 'demo-user',
      created_at: '2024-01-15',
      updated_at: '2024-01-20',
      user_id: 'demo-user',
      image_url: ''
    });
    setTourStep(0);
    setCompletedSteps([]);
    setShowCelebration(false);
  };

  return {
    demoGoal,
    tourStep,
    tourSteps,
    completedSteps,
    showCelebration,
    updateProgress,
    toggleMilestone,
    toggleTodo,
    completeTodo,
    addTodo,
    updateGoalProgress,
    resetDemo,
    setTourStep
  };
};
