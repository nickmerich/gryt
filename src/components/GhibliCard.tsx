
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import GhibliIllustration from './GhibliIllustration';

interface GhibliCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
  illustration?: 'mountains' | 'forest' | 'landscape' | 'grass' | 'sunset' | 'foggy';
  illustrationOpacity?: number;
}

const GhibliCard: React.FC<GhibliCardProps> = ({ 
  children, 
  className,
  glow = false,
  illustration,
  illustrationOpacity = 0.05,
  ...props 
}) => {
  return (
    <Card 
      className={cn(
        'ghibli-card overflow-hidden relative',
        glow && 'relative after:absolute after:inset-0 after:rounded-lg after:shadow-md after:shadow-gryt-blue/10',
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
