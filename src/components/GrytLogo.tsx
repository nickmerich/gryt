
import React from 'react';
import { cn } from '@/lib/utils';

interface GrytLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full-color' | 'black' | 'white';
  showMotionLine?: boolean;
}

const GrytLogo = ({ 
  className, 
  size = 'md', 
  variant = 'full-color',
  showMotionLine = true 
}: GrytLogoProps) => {
  // Size mapping for the container
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  // Icon size mapping
  const iconSizes = {
    sm: 24,
    md: 36,
    lg: 48,
    xl: 60
  };

  const iconSize = iconSizes[size];

  // Color variants
  const getColors = () => {
    switch (variant) {
      case 'black':
        return {
          background: 'bg-black',
          runner: '#000000',
          sparkle: '#000000',
          motionLine: '#000000'
        };
      case 'white':
        return {
          background: 'bg-white border border-gray-200',
          runner: '#ffffff',
          sparkle: '#ffffff',
          motionLine: '#ffffff'
        };
      default: // full-color
        return {
          background: 'bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600',
          runner: '#ffffff',
          sparkle: '#ffffff',
          motionLine: 'rgba(255,255,255,0.3)'
        };
    }
  };

  const colors = getColors();

  return (
    <div 
      className={cn(
        "relative rounded-2xl flex items-center justify-center overflow-hidden shadow-lg",
        colors.background,
        sizeClasses[size],
        className
      )}
    >
      {/* Motion line background - subtle track curve */}
      {showMotionLine && (
        <div className="absolute inset-0">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 64 64"
            className="opacity-20"
          >
            <path
              d="M10 45 Q32 35 55 42"
              stroke={colors.motionLine}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M8 50 Q30 40 53 47"
              stroke={colors.motionLine}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* Main runner icon with sparkle */}
      <div className="relative z-10">
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 24 24" 
          fill="none"
        >
          {/* Dynamic runner silhouette */}
          <g transform="translate(-1, 0)">
            {/* Runner body */}
            <path
              d="M8 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"
              fill={colors.runner}
            />
            {/* Runner torso and arms in motion */}
            <path
              d="M9 9h2l1 3-1 1h-2l-1-1 1-3z"
              fill={colors.runner}
            />
            {/* Leading arm */}
            <path
              d="M11 10l3-1c.5-.2 1 .1 1 .6 0 .3-.2.6-.5.7l-2.5 1-1-1.3z"
              fill={colors.runner}
            />
            {/* Trailing arm */}
            <path
              d="M9 11l-2 1c-.3.1-.5.4-.5.7 0 .5.5.8 1 .6l2-1 .5-1.3z"
              fill={colors.runner}
            />
            {/* Leading leg (extended forward) */}
            <path
              d="M10 13l1 4 2 2c.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0l-2.5-2.5L9 13h1z"
              fill={colors.runner}
            />
            {/* Trailing leg (pushing off) */}
            <path
              d="M10 13l-1 3-1 3c-.2.4-.7.6-1.1.4-.4-.2-.6-.7-.4-1.1l1.5-4L9 13h1z"
              fill={colors.runner}
            />
          </g>

          {/* Achievement sparkle/swoosh */}
          <g transform="translate(3, -1)">
            <path
              d="M16 4l-1 2 2 1-2 1 1 2-2-1-2 1 1-2-2-1 2-1-1-2 2 1 2-1z"
              fill={colors.sparkle}
              className="animate-pulse"
            />
            {/* Upward swoosh */}
            <path
              d="M18 8 Q20 6 22 8"
              stroke={colors.sparkle}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              className="opacity-80"
            />
          </g>
        </svg>
      </div>

      {/* Subtle glow effect for full-color variant */}
      {variant === 'full-color' && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 rounded-2xl"></div>
      )}
    </div>
  );
};

export default GrytLogo;
