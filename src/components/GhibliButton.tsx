
import React from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

interface GhibliButtonProps extends ButtonProps {
  glowColor?: 'red' | 'blue' | 'light' | 'green' | 'yellow';
}

const GhibliButton: React.FC<GhibliButtonProps> = ({ 
  children, 
  className,
  glowColor = 'blue', // Default is blue to match the primary action style
  ...props 
}) => {
  const glowStyles = {
    red: 'before:from-gryt-red/20 before:to-gryt-red/5',
    blue: 'before:from-gryt-blue/20 before:to-gryt-blue/5',
    light: 'before:from-gryt-light/20 before:to-gryt-light/5',
    green: 'before:from-green-500/20 before:to-green-500/5',
    yellow: 'before:from-yellow-500/20 before:to-yellow-500/5'
  };

  return (
    <Button 
      className={cn(
        'ghibli-button rounded-xl', // Increased radius for more inviting feel (12-16px)
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default GhibliButton;
