
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
}

const GrytLogoFull = ({ 
  className, 
  size = 'md', 
  variant = 'full-color',
  layout = 'horizontal',
  showMotionLine = true 
}: GrytLogoFullProps) => {
  const spacing = {
    sm: layout === 'horizontal' ? 'gap-2' : 'gap-1',
    md: layout === 'horizontal' ? 'gap-3' : 'gap-2',
    lg: layout === 'horizontal' ? 'gap-4' : 'gap-3',
    xl: layout === 'horizontal' ? 'gap-6' : 'gap-4'
  };

  return (
    <div 
      className={cn(
        "flex items-center",
        layout === 'horizontal' ? 'flex-row' : 'flex-col',
        spacing[size],
        className
      )}
    >
      <GrytLogo 
        size={size} 
        variant={variant} 
        showMotionLine={showMotionLine}
      />
      <GrytWordmark 
        size={size} 
        variant={variant}
        italic={true}
      />
    </div>
  );
};

export default GrytLogoFull;
