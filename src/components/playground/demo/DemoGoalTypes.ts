
import { Goal } from '@/hooks/useGoals';

// Define a custom type for our demo goal that extends Goal but includes todos
export interface DemoGoal extends Goal {
  todos: { id: string; title: string; isCompleted: boolean }[];
  userId: string;
}

export interface TourStep {
  title: string;
  description: string;
}

