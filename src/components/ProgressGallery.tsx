
import React from 'react';
import { Goal } from '@/hooks/useGoals';
import ProgressVisualization from './ProgressVisualization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import GhibliIllustration from './GhibliIllustration';

interface ProgressGalleryProps {
  goals?: Goal[];
  className?: string;
}

const ProgressGallery: React.FC<ProgressGalleryProps> = ({ goals = [], className }) => {
  if (!goals.length) {
    return (
      <Card className={cn("w-full relative overflow-hidden", className)}>
        <div className="absolute inset-0 opacity-10">
          <GhibliIllustration type="mountains" className="w-full h-full" />
        </div>
        <CardContent className="pt-6 text-center relative z-10">
          <p className="text-gray-500">No goals to visualize yet. Create some goals to see your progress!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <GhibliIllustration type="grass" className="w-full h-full" />
        </div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-lg font-semibold">Your Growth Journey</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <div key={goal.id} className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium truncate">{goal.title}</h3>
                <ProgressVisualization 
                  goal={goal} 
                  type={goal.category === 'Health & Fitness' ? 'mountain' : 'tree'}
                  size="md"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressGallery;
