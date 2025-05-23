
import React from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

interface GhibliButtonProps extends ButtonProps {
  glowColor?: 'red' | 'blue' | 'light';
}

const GhibliButton: React.FC<GhibliButtonProps> = ({ 
  children, 
  className,
  glowColor = 'red',
  ...props 
}) => {
  const glowStyles = {
    red: 'before:from-gryt-red/20 before:to-gryt-red/5',
    blue: 'before:from-gryt-blue/20 before:to-gryt-purple/5',
    light: 'before:from-gryt-light/20 before:to-gryt-light/5'
  };

  return (
    <Button 
      className={cn(
        'ghibli-button',
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
