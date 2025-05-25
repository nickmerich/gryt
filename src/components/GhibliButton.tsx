
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

interface GhibliButtonProps extends ButtonProps {
  glowColor?: 'red' | 'blue' | 'light' | 'green' | 'yellow' | 'magical';
  magical?: boolean;
  hoverText?: string;
  energizing?: boolean;
  transformText?: string;
}

const GhibliButton: React.FC<GhibliButtonProps> = ({ 
  children, 
  className,
  glowColor = 'blue',
  magical = false,
  hoverText,
  energizing = false,
  transformText,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const glowStyles = {
    red: 'before:from-gryt-red/20 before:to-gryt-red/5',
    blue: 'before:from-gryt-blue/20 before:to-gryt-blue/5',
    light: 'before:from-gryt-light/20 before:to-gryt-light/5',
    green: 'before:from-green-500/20 before:to-green-500/5',
    yellow: 'before:from-gryt-purple/20 before:to-gryt-purple/5',
    magical: 'before:from-purple-500/30 before:to-blue-500/30'
  };

  const magicalStyles = magical ? 
    'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 rounded-2xl' +
    ' relative overflow-hidden' +
    ' before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-white/20 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700 before:ease-in-out' +
    ' after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:blur-sm hover:after:animate-pulse'
    : '';

  const energizingStyles = energizing ?
    'bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-400 hover:via-red-400 hover:to-pink-500 shadow-2xl hover:shadow-3xl drop-shadow-2xl hover:drop-shadow-[0_25px_25px_rgba(239,68,68,0.4)] transform hover:scale-110 transition-all duration-300 rounded-xl font-bold text-white border-2 border-white/20' +
    ' relative overflow-hidden' +
    ' before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:via-transparent before:to-white/30 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-500 before:ease-in-out'
    : '';

  // Extract the icon and text content
  const childrenArray = React.Children.toArray(children);
  const icon = childrenArray.find(child => React.isValidElement(child) && child.type !== 'string');
  const textContent = childrenArray.filter(child => typeof child === 'string' || !React.isValidElement(child)).join('');

  return (
    <Button 
      className={cn(
        'ghibli-button rounded-xl relative group',
        magical ? magicalStyles : energizing ? energizingStyles : `rounded-xl ${glowStyles[glowColor]}`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className={cn(
        "relative z-10 flex items-center gap-2 transition-all duration-300",
        (magical || energizing) && isHovered && "transform"
      )}>
        {/* Icon with pulse animation on hover */}
        {icon && (
          <span className={cn(
            "transition-all duration-300",
            (magical || energizing) && isHovered && "animate-pulse scale-110"
          )}>
            {icon}
          </span>
        )}
        
        {/* Text transformation for energizing buttons */}
        {energizing && transformText ? (
          <span className="relative overflow-hidden">
            <span className={cn(
              "block transition-all duration-300 font-bold",
              isHovered ? "transform -translate-y-full opacity-0" : "transform translate-y-0 opacity-100"
            )}>
              {textContent}
            </span>
            <span className={cn(
              "absolute top-0 left-0 block transition-all duration-300 font-bold text-gryt-purple",
              isHovered ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"
            )}>
              {transformText}
            </span>
          </span>
        ) : (
          // Regular text content when not using transform
          textContent
        )}
        
        {/* Magical hover text */}
        {magical && hoverText && isHovered && !energizing && (
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

      {energizing && (
        <>
          {/* Energizing glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/60 via-red-500/60 to-pink-600/60 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          
          {/* Lightning effect */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className={cn(
              "absolute top-1 right-3 w-1 h-1 bg-gryt-purple rounded-full opacity-0 transition-all duration-300",
              isHovered && "opacity-100 animate-ping"
            )}></div>
            <div className={cn(
              "absolute bottom-2 left-4 w-0.5 h-0.5 bg-gryt-purple rounded-full opacity-0 transition-all duration-400",
              isHovered && "opacity-100 animate-ping"
            )}></div>
            <div className={cn(
              "absolute top-3 left-2 w-0.5 h-0.5 bg-white rounded-full opacity-0 transition-all duration-500",
              isHovered && "opacity-100 animate-ping"
            )}></div>
          </div>
        </>
      )}
    </Button>
  );
};

export default GhibliButton;
