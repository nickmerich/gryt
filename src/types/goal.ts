
// Central Goal type definition
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
  created_at?: string;
  user_id?: string;
  milestones: any[];
  completedMilestones: number;
}

// Database row type (what comes from Supabase)
export interface GoalRow {
  id: string;
  title: string;
  description: string | null;
  category: string;
  progress: number;
  target_date: string | null;
  image_url: string | null;
  updated_at: string;
  created_at: string;
  user_id: string;
}

// Function to convert database row to frontend Goal
export const mapGoalRowToGoal = (row: GoalRow): Goal => ({
  id: row.id,
  title: row.title,
  description: row.description || '',
  category: row.category,
  progress: row.progress,
  targetDate: row.target_date || '',
  imageUrl: row.image_url || undefined,
  updated_at: row.updated_at,
  created_at: row.created_at,
  user_id: row.user_id,
  milestones: [],
  completedMilestones: 0
});
