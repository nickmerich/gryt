
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import GhibliIllustration from './GhibliIllustration';

interface GhibliCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
  illustration?: 'mountains' | 'forest' | 'landscape' | 'grass' | 'sunset' | 'foggy';
  illustrationOpacity?: number;
  variant?: 'default' | 'goal' | 'streak' | 'success';
}

const GhibliCard: React.FC<GhibliCardProps> = ({ 
  children, 
  className,
  glow = false,
  illustration,
  illustrationOpacity = 0.05,
  variant = 'default',
  ...props 
}) => {
  // Apply variant-specific styles - all monochrome
  const variantStyles = {
    default: '',
    goal: 'border-l-4 border-l-foreground',
    streak: 'border-l-4 border-l-muted-foreground',
    success: 'border-2 border-foreground bg-background'
  };

  return (
    <Card 
      className={cn(
        'overflow-hidden relative bg-background border-2 border-border',
        glow && 'shadow-lg',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {illustration && (
        <div className="absolute inset-0" style={{ opacity: illustrationOpacity }}>
          <GhibliIllustration type={illustration} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </Card>
  );
};

export default GhibliCard;
