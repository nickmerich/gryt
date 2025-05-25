
import React from 'react';
import { cn } from '@/lib/utils';

interface GrytLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GrytLogo = ({ className, size = 'md' }: GrytLogoProps) => {
  // Size mapping
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const iconSize = {
    sm: '1rem',
    md: '1.25rem', 
    lg: '2rem'
  };

  return (
    <div 
      className={cn(
        "relative rounded-md bg-gradient-to-br from-gryt-blue to-gryt-blue/80 flex items-center justify-center overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {/* Grid structure - subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
          {Array(9).fill(0).map((_, i) => (
            <div key={i} className="border border-white/20"></div>
          ))}
        </div>
      </div>

      {/* Strong Arm SVG Icon */}
      <div className="relative text-white" style={{ fontSize: iconSize[size] }}>
        <svg 
          width={iconSize[size]} 
          height={iconSize[size]} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-white"
        >
          {/* Strong Arm/Bicep Icon */}
          <path d="M6 12c0-4 2-6 4-6s4 2 4 6" />
          <path d="M14 12v6a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-6" />
          <circle cx="10" cy="8" r="2" />
          <path d="M18 12c0-2-1-4-3-4" />
          <path d="M15 8c1-1 2-1 3 0" />
        </svg>
        
        {/* Progress indicator - subtle upward arrow */}
        <div className="absolute -bottom-1 -right-1 w-[30%] h-[30%] border-t-2 border-r-2 border-white/90 transform rotate-45 rounded-tr-sm"></div>
      </div>

      {/* Grit texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMC41Ij48L3BhdGg+Cjwvc3ZnPg==')] opacity-20"></div>
    </div>
  );
};

export default GrytLogo;
