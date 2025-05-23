
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
  // Apply variant-specific styles
  const variantStyles = {
    default: '',
    goal: 'border-l-4 border-l-gryt-blue',
    streak: 'border-l-4 border-l-gryt-red streak-pulse',
    success: 'border-green-400/30 bg-gradient-to-br from-white to-green-50 dark:from-gryt-dark dark:to-gryt-dark/80'
  };

  return (
    <Card 
      className={cn(
        'ghibli-card overflow-hidden relative',
        glow && 'relative after:absolute after:inset-0 after:rounded-xl after:shadow-md after:shadow-gryt-blue/10',
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
