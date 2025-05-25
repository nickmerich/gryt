
import { Database } from './types';

// Define a Goals table row type from our auto-generated Database type
export type GoalRow = Database['public']['Tables']['goals']['Row'] & {
  image_url?: string; // Add image_url as an optional property
};

// Re-export the Goal type from our centralized types
export type { Goal, mapGoalRowToGoal } from '@/types/goal';
