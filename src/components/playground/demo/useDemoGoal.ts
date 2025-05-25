
import { useState } from 'react';
import { toast } from 'sonner';
import { DemoGoal, TourStep } from './DemoGoalTypes';

export const useDemoGoal = () => {
  const [demoGoal, setDemoGoal] = useState<DemoGoal>({
    id: 'demo-goal',
    title: 'Run 5K in 30 Days',
    description: 'Train consistently to build up to running a 5K (3.1 miles) in just one month!',
    category: 'Health & Fitness',
    progress: 0,
    updated_at: new Date().toISOString(),
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo-user',
    milestones: [
      { id: '1', title: 'Complete first 1K run', isCompleted: false },
      { id: '2', title: 'Run 2K without stopping', isCompleted: false },
      { id: '3', title: 'Achieve 3K distance', isCompleted: false },
      { id: '4', title: 'Run 4K comfortably', isCompleted: false },
      { id: '5', title: 'Complete full 5K', isCompleted: false },
    ],
    completedMilestones: 0,
    todos: [
      { id: '1', title: 'Buy proper running shoes', isCompleted: false },
      { id: '2', title: '10-minute warm-up routine', isCompleted: false },
      { id: '3', title: '5-minute cooldown stretch', isCompleted: false },
      { id: '4', title: 'Track water intake', isCompleted: false },
      { id: '5', title: 'Plan running routes', isCompleted: false },
    ]
  });

  const [tourStep, setTourStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const tourSteps: TourStep[] = [
    { title: "Welcome to your Demo Goal", description: "This is a pre-loaded 5K training goal with milestones and tasks already set up for you." },
    { title: "Update Your Progress", description: "Click the button below to update your progress and see what happens!" },
    { title: "Complete a Milestone", description: "Let's mark your first milestone as completed." },
    { title: "Check Off a Task", description: "Complete one of your daily tasks to stay on track." },
    { title: "Reset or Continue", description: "You can reset the demo or continue exploring other features." }
  ];

  const updateProgress = () => {
    const newProgress = Math.min(demoGoal.progress + 20, 100);
    setDemoGoal(prev => ({...prev, progress: newProgress}));
    
    if (newProgress >= 20 && !demoGoal.milestones[0].isCompleted) {
      const updatedMilestones = [...demoGoal.milestones];
      updatedMilestones[0] = {...updatedMilestones[0], isCompleted: true};
      setDemoGoal(prev => ({
        ...prev, 
        milestones: updatedMilestones, 
        progress: newProgress
      }));
      setShowCelebration(true);
      toast.success("🎉 You've completed your first milestone!");
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
    
    setCompletedSteps([...completedSteps, tourStep]);
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    }
  };

  const completeTodo = (id: string) => {
    const updatedTodos = demoGoal.todos.map(todo => 
      todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
    );
    setDemoGoal(prev => ({
      ...prev, 
      todos: updatedTodos
    }));
    
    toast.success("Task completed! Great job staying on track.");
    setCompletedSteps([...completedSteps, tourStep]);
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    }
  };

  const resetDemo = () => {
    setDemoGoal(prev => ({
      ...prev,
      progress: 0,
      milestones: prev.milestones.map(m => ({...m, isCompleted: false})),
      todos: prev.todos.map(t => ({...t, isCompleted: false}))
    }));
    setTourStep(0);
    setCompletedSteps([]);
    setShowCelebration(false);
    toast.info("Demo reset! Start fresh and try again.");
  };

  return {
    demoGoal,
    tourStep,
    tourSteps,
    completedSteps,
    showCelebration,
    updateProgress,
    completeTodo,
    resetDemo,
    setTourStep
  };
};
