
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

  // Color variants - updated for more purposeful branding
  const getColors = () => {
    switch (variant) {
      case 'black':
        return {
          background: 'bg-black',
          primary: '#000000',
          secondary: '#333333',
          accent: '#000000'
        };
      case 'white':
        return {
          background: 'bg-white border border-gray-200',
          primary: '#ffffff',
          secondary: '#f0f0f0',
          accent: '#ffffff'
        };
      default: // full-color - bold, purposeful gradient
        return {
          background: 'bg-gradient-to-br from-slate-800 via-blue-600 to-indigo-700',
          primary: '#ffffff',
          secondary: 'rgba(255,255,255,0.8)',
          accent: '#FFC107' // Golden accent for achievement
        };
    }
  };

  const colors = getColors();

  return (
    <div 
      className={cn(
        "relative rounded-2xl flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl",
        colors.background,
        sizeClasses[size],
        className
      )}
    >
      {/* Mountain path background - representing the journey */}
      {showMotionLine && (
        <div className="absolute inset-0 opacity-10">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 64 64"
          >
            {/* Mountain silhouette */}
            <path
              d="M5 45 L15 25 L25 35 L35 15 L45 30 L55 20 L60 45 Z"
              fill="currentColor"
              className="text-white"
            />
            {/* Path/trail */}
            <path
              d="M8 50 Q20 42 35 45 Q45 47 58 40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="text-white"
            />
          </svg>
        </div>
      )}

      {/* Main icon - stylized "G" with forward momentum */}
      <div className="relative z-10">
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 32 32" 
          fill="none"
        >
          {/* Main "G" shape with forward arrow integration */}
          <path
            d="M16 4 C9.4 4 4 9.4 4 16 C4 22.6 9.4 28 16 28 C19.8 28 23.2 26.2 25.4 23.2 L22.8 21.2 C21.4 23.2 18.8 24.4 16 24.4 C11.8 24.4 8.4 20.8 8.4 16 C8.4 11.2 11.8 7.6 16 7.6 C18.8 7.6 21.2 8.8 22.6 10.8 L25.2 8.8 C23 5.8 19.6 4 16 4 Z"
            fill={colors.primary}
          />
          
          {/* Inner cutout forming the "G" */}
          <path
            d="M16 11 C13.8 11 12 12.8 12 15 C12 17.2 13.8 19 16 19 L18 19 L18 16 L16 16 L16 14 L20 14 L20 21 L16 21 C12.6 21 10 18.4 10 15 C10 11.6 12.6 9 16 9 C17.8 9 19.4 9.8 20.4 11 L22.6 9.2 C21 7.4 18.6 6.2 16 6.2"
            fill={colors.background.includes('gradient') ? 'transparent' : colors.background}
            stroke={colors.background.includes('gradient') ? colors.primary : 'none'}
            strokeWidth={colors.background.includes('gradient') ? '0.5' : '0'}
          />

          {/* Forward momentum arrow/spark */}
          <g transform="translate(20, 12)">
            <path
              d="M0 4 L6 4 L4 2 L8 6 L4 10 L6 8 L0 8 Z"
              fill={colors.accent}
              className="animate-pulse"
            />
          </g>

          {/* Achievement spark */}
          <g transform="translate(22, 8)">
            <path
              d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z"
              fill={colors.accent}
              className="animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </g>
        </svg>
      </div>

      {/* Subtle inner glow for full-color variant */}
      {variant === 'full-color' && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-2xl"></div>
      )}
    </div>
  );
};

export default GrytLogo;
