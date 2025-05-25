
import React from 'react';
import { cn } from '@/lib/utils';
import GrytLogo from './GrytLogo';
import GrytWordmark from './GrytWordmark';

interface GrytLogoFullProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full-color' | 'black' | 'white';
  layout?: 'horizontal' | 'vertical';
  showMotionLine?: boolean;
  showTagline?: boolean;
}

const GrytLogoFull = ({ 
  className, 
  size = 'md', 
  variant = 'full-color',
  layout = 'horizontal',
  showMotionLine = true,
  showTagline = false 
}: GrytLogoFullProps) => {
  const spacing = {
    sm: layout === 'horizontal' ? 'gap-3' : 'gap-2',
    md: layout === 'horizontal' ? 'gap-4' : 'gap-3',
    lg: layout === 'horizontal' ? 'gap-6' : 'gap-4',
    xl: layout === 'horizontal' ? 'gap-8' : 'gap-6'
  };

  return (
    <div 
      className={cn(
        "flex items-center group transition-all duration-300",
        layout === 'horizontal' ? 'flex-row' : 'flex-col items-center',
        spacing[size],
        className
      )}
    >
      <div className="transition-transform duration-300 group-hover:scale-110">
        <GrytLogo 
          size={size} 
          variant={variant} 
          showMotionLine={showMotionLine}
        />
      </div>
      <div className={cn(
        "transition-all duration-300",
        layout === 'vertical' && "text-center"
      )}>
        <GrytWordmark 
          size={size} 
          variant={variant}
          showTagline={showTagline}
        />
      </div>
    </div>
  );
};

export default GrytLogoFull;
