
import React from 'react';
import { cn } from '@/lib/utils';

interface GrytWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full-color' | 'black' | 'white';
  italic?: boolean;
}

const GrytWordmark = ({ 
  className, 
  size = 'md', 
  variant = 'full-color',
  italic = true 
}: GrytWordmarkProps) => {
  // Size mapping
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  // Color variants
  const getTextColor = () => {
    switch (variant) {
      case 'black':
        return 'text-black';
      case 'white':
        return 'text-white';
      default: // full-color
        return 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent';
    }
  };

  return (
    <div 
      className={cn(
        "font-bold tracking-tight select-none",
        sizeClasses[size],
        getTextColor(),
        italic && "italic transform -skew-x-6",
        className
      )}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 800,
        letterSpacing: '-0.02em'
      }}
    >
      Gryt
    </div>
  );
};

export default GrytWordmark;
