
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface GhibliCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

const GhibliCard: React.FC<GhibliCardProps> = ({ 
  children, 
  className,
  glow = false,
  ...props 
}) => {
  return (
    <Card 
      className={cn(
        'ghibli-card overflow-hidden',
        glow && 'relative after:absolute after:inset-0 after:rounded-lg after:shadow-md after:shadow-gryt-blue/10',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GhibliCard;
