
import React from 'react';
import { cn } from '@/lib/utils';

interface GrytWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full-color' | 'black' | 'white';
  italic?: boolean;
  showTagline?: boolean;
}

const GrytWordmark = ({ 
  className, 
  size = 'md', 
  variant = 'full-color',
  italic = false,
  showTagline = false 
}: GrytWordmarkProps) => {
  // Size mapping - stronger, more purposeful typography
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-7xl'
  };

  const taglineSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  // Color variants - updated for bold, purposeful branding
  const getTextColor = () => {
    switch (variant) {
      case 'black':
        return 'text-black';
      case 'white':
        return 'text-white';
      default: // full-color - bold gradient
        return 'bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent';
    }
  };

  const getTaglineColor = () => {
    switch (variant) {
      case 'black':
        return 'text-gray-600';
      case 'white':
        return 'text-white/70';
      default: // full-color
        return 'text-slate-600';
    }
  };

  return (
    <div className={cn("select-none", className)}>
      {/* Main wordmark */}
      <div 
        className={cn(
          "font-black tracking-tight",
          sizeClasses[size],
          getTextColor(),
          italic && "italic transform -skew-x-3",
          "transition-all duration-300 hover:scale-105"
        )}
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 900,
          letterSpacing: '-0.03em'
        }}
      >
        Gryt
      </div>

      {/* Optional tagline */}
      {showTagline && (
        <div 
          className={cn(
            "font-medium tracking-wide mt-1",
            taglineSizes[size],
            getTaglineColor()
          )}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif',
            letterSpacing: '0.02em'
          }}
        >
          Turn ambition into identity.
        </div>
      )}
    </div>
  );
};

export default GrytWordmark;
