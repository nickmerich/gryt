
import { Goal } from '@/integrations/supabase/goal.types';

interface GoalImageSectionProps {
  goal: Goal;
}

const GoalImageSection = ({ goal }: GoalImageSectionProps) => {
  if (!goal.imageUrl) return null;

  return (
    <div className="bg-white dark:bg-gryt-dark/30 p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-medium mb-4">Goal Visualization</h3>
      <div className="rounded-md overflow-hidden border">
        <img
          src={goal.imageUrl}
          alt={goal.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            // Fallback for image loading errors
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
            console.error('Failed to load image:', goal.imageUrl);
          }}
        />
      </div>
    </div>
  );
};

export default GoalImageSection;
