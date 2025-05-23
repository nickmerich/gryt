
import { Database } from './types';

// Define a Goals table row type from our auto-generated Database type
export type GoalRow = Database['public']['Tables']['goals']['Row'];

// Define a type for our frontend Goal model
export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  targetDate: string;
  lastCheckin?: string;
  imageUrl?: string;
  updated_at?: string;
  milestones: any[];
  completedMilestones: number;
}

// Function to convert from database row to frontend model
export const parseGoalRow = (goal: GoalRow): Goal => ({
  id: goal.id,
  title: goal.title,
  description: goal.description || '',
  category: goal.category,
  progress: goal.progress,
  targetDate: goal.target_date || '',
  lastCheckin: goal.updated_at,
  updated_at: goal.updated_at,
  imageUrl: goal.image_url as string | undefined, // Type assertion to handle potential missing field
  milestones: [],
  completedMilestones: 0
});
