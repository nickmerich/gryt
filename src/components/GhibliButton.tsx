
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

interface GhibliButtonProps extends ButtonProps {
  glowColor?: 'red' | 'blue' | 'light' | 'green' | 'yellow' | 'magical';
  magical?: boolean;
  hoverText?: string;
}

const GhibliButton: React.FC<GhibliButtonProps> = ({ 
  children, 
  className,
  glowColor = 'blue',
  magical = false,
  hoverText,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const glowStyles = {
    red: 'before:from-gryt-red/20 before:to-gryt-red/5',
    blue: 'before:from-gryt-blue/20 before:to-gryt-blue/5',
    light: 'before:from-gryt-light/20 before:to-gryt-light/5',
    green: 'before:from-green-500/20 before:to-green-500/5',
    yellow: 'before:from-yellow-500/20 before:to-yellow-500/5',
    magical: 'before:from-purple-500/30 before:to-blue-500/30'
  };

  const magicalStyles = magical ? 
    'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 rounded-2xl' +
    ' relative overflow-hidden' +
    ' before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-white/20 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700 before:ease-in-out' +
    ' after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:blur-sm hover:after:animate-pulse'
    : '';

  return (
    <Button 
      className={cn(
        'ghibli-button rounded-xl relative group',
        magical ? magicalStyles : `rounded-xl ${glowStyles[glowColor]}`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className={cn(
        "relative z-10 flex items-center gap-2 transition-all duration-300",
        magical && isHovered && "transform"
      )}>
        {React.Children.map(children, (child, index) => {
          // If it's the plus icon (first child), add pulse animation on hover
          if (index === 0 && magical && React.isValidElement(child)) {
            return (
              <span className={cn(
                "transition-all duration-300",
                isHovered && "animate-pulse scale-110"
              )}>
                {child}
              </span>
            );
          }
          return child;
        })}
        {magical && hoverText && isHovered && (
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold whitespace-nowrap animate-fade-in">
            {hoverText}
          </span>
        )}
      </span>
      
      {magical && (
        <>
          {/* Magical glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-indigo-600/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          
          {/* Sparkle effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <div className={cn(
              "absolute top-2 right-4 w-1 h-1 bg-white rounded-full opacity-0 transition-all duration-500",
              isHovered && "opacity-100 animate-ping"
            )}></div>
            <div className={cn(
              "absolute bottom-3 left-6 w-1 h-1 bg-white rounded-full opacity-0 transition-all duration-700",
              isHovered && "opacity-100 animate-ping"
            )}></div>
            <div className={cn(
              "absolute top-4 left-4 w-0.5 h-0.5 bg-white rounded-full opacity-0 transition-all duration-600",
              isHovered && "opacity-100 animate-ping"
            )}></div>
          </div>
        </>
      )}
    </Button>
  );
};

export default GhibliButton;
