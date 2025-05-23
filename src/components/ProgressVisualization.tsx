
import React, { useMemo } from 'react';
import { Goal } from '@/hooks/useGoals';
import { cn } from '@/lib/utils';
import { Trees, Leaf } from 'lucide-react';
import { useMilestones } from '@/hooks/useMilestones';

interface ProgressVisualizationProps {
  goal?: Goal;
  type?: 'tree' | 'mountain';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressVisualization: React.FC<ProgressVisualizationProps> = ({ 
  goal, 
  type = 'tree',
  size = 'md',
  className
}) => {
  const { milestones } = useMilestones(goal?.id);
  
  const completedMilestones = useMemo(() => {
    return milestones?.filter(m => m.is_completed).length || 0;
  }, [milestones]);
  
  const totalMilestones = milestones?.length || 0;
  const progress = goal?.progress || 0;
  
  const sizeClasses = {
    sm: 'h-24',
    md: 'h-32',
    lg: 'h-48'
  };
  
  const generateTreeVisualization = () => {
    // Define growth stages for the tree
    const stages = [
      { threshold: 0, color: 'text-gray-300', element: 'seed' },
      { threshold: 20, color: 'text-green-200', element: 'sprout' },
      { threshold: 40, color: 'text-green-300', element: 'small' },
      { threshold: 60, color: 'text-green-400', element: 'medium' },
      { threshold: 80, color: 'text-green-500', element: 'large' },
      { threshold: 100, color: 'text-green-600', element: 'flourishing' }
    ];
    
    // Find the current stage based on progress
    const currentStage = stages.reduce((acc, stage) => {
      if (progress >= stage.threshold) return stage;
      return acc;
    }, stages[0]);
    
    const leafCount = Math.max(1, Math.ceil((completedMilestones / Math.max(1, totalMilestones)) * 5));
    
    return (
      <div className="flex flex-col items-center justify-end relative h-full">
        {/* Leaves based on completed milestones */}
        <div className="relative mb-2">
          {Array.from({ length: leafCount }).map((_, i) => (
            <Leaf 
              key={i}
              className={cn(
                "absolute animate-gentle-pulse",
                currentStage.color,
                i % 2 === 0 ? '-left-4' : '-right-4',
                i % 3 === 0 ? '-top-4' : i % 3 === 1 ? 'top-0' : '-top-8'
              )}
              size={16 + (i * 2)}
              strokeWidth={2}
            />
          ))}
        </div>
        
        {/* Tree trunk that grows based on progress */}
        <div className="relative flex flex-col items-center">
          {currentStage.element === 'seed' ? (
            <div className="w-4 h-4 rounded-full bg-brown-600" />
          ) : (
            <Trees 
              className={cn(
                "transition-all duration-700", 
                currentStage.color
              )}
              size={
                currentStage.element === 'sprout' ? 32 : 
                currentStage.element === 'small' ? 48 :
                currentStage.element === 'medium' ? 64 :
                currentStage.element === 'large' ? 80 : 96
              }
              strokeWidth={2}
            />
          )}
        </div>
        
        {/* Soil/ground */}
        <div className="w-full h-4 rounded-full bg-brown-200 dark:bg-brown-800 mt-2" />
        
        {/* Progress text */}
        <div className="text-center mt-2">
          <span className="text-sm font-medium">
            {progress}% Complete
          </span>
          {totalMilestones > 0 && (
            <div className="text-xs text-gray-500">
              {completedMilestones}/{totalMilestones} milestones
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const generateMountainVisualization = () => {
    const progressPercentage = progress / 100;
    const pathHeight = 60; // max height of the mountain in viewBox units
    const flagPosition = {
      x: 80 * progressPercentage,
      y: pathHeight - (pathHeight * progressPercentage)
    };
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-end">
          <svg viewBox="0 0 100 70" className="w-full h-full">
            {/* Sky background */}
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a8dafc" />
                <stop offset="100%" stopColor="#e1f2fe" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="100" height="60" fill="url(#skyGradient)" />
            
            {/* Mountain path */}
            <path 
              d={`M0,60 L80,0 L100,20 L100,60 Z`} 
              fill="#a0a0a0" 
              stroke="#808080"
              strokeWidth="0.5"
            />
            
            {/* Progress indicator - climber or flag */}
            {progress > 0 && (
              <g transform={`translate(${flagPosition.x}, ${flagPosition.y})`}>
                <rect x="0" y="-10" width="1" height="10" fill="#333" />
                <rect x="1" y="-10" width="5" height="5" fill="#e63946" />
              </g>
            )}
            
            {/* Summit indicator */}
            {progress >= 100 && (
              <g transform="translate(80, 0)">
                <polygon points="0,0 2,-5 4,0" fill="#e63946" />
              </g>
            )}
            
            {/* Base ground */}
            <rect x="0" y="60" width="100" height="10" fill="#8a5a44" />
          </svg>
        </div>
        
        {/* Progress text */}
        <div className="text-center mt-2">
          <span className="text-sm font-medium">
            {progress}% Complete
          </span>
          {totalMilestones > 0 && (
            <div className="text-xs text-gray-500">
              {completedMilestones}/{totalMilestones} milestones
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className={cn(
      "relative w-full overflow-hidden bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800",
      sizeClasses[size],
      className
    )}>
      {type === 'tree' ? generateTreeVisualization() : generateMountainVisualization()}
    </div>
  );
};

export default ProgressVisualization;
