
import React from 'react';
import { cn } from '@/lib/utils';

type IllustrationType = 'mountains' | 'forest' | 'landscape' | 'grass' | 'sunset' | 'foggy';

interface GhibliIllustrationProps {
  type: IllustrationType;
  className?: string;
  animate?: boolean;
}

const GhibliIllustration: React.FC<GhibliIllustrationProps> = ({ 
  type, 
  className,
  animate = true
}) => {
  // Map of illustration types to image URLs
  const illustrations = {
    mountains: 'photo-1501854140801-50d01698950b',
    forest: 'photo-1509316975850-ff9c5deb0cd9',
    landscape: 'photo-1469474968028-56623f02e42e',
    grass: 'photo-1518495973542-4542c06a5843',
    sunset: 'photo-1472396961693-142e6e269027',
    foggy: 'photo-1470071459604-3b5ec3a7fe05',
  };

  const imageId = illustrations[type];
  
  return (
    <div className={cn(
      'ghibli-illustration overflow-hidden rounded-lg',
      animate && 'floating-animation',
      className
    )}>
      <img 
        src={`https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=800&q=80`}
        alt={`Ghibli-inspired ${type} illustration`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  );
};

export default GhibliIllustration;
