
export interface GoalInput {
  title: string;
  description: string;
  category: string;
  target_date: string;
  image_url?: string;
}

export interface EditGoalInput {
  id: string;
  title: string;
  description: string;
  category: string;
  target_date: string;
  image_url?: string;
}
