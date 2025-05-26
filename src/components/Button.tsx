
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-foreground hover:bg-muted-foreground text-background border-2 border-foreground hover:border-muted-foreground transform hover:scale-[1.02]',
      outline: 'border-2 border-border bg-background hover:bg-muted hover:border-muted-foreground text-foreground',
      ghost: 'hover:bg-muted text-foreground'
    };
    
    const sizes = {
      default: 'h-12 px-6 py-3',
      sm: 'h-10 px-4 py-2 text-sm',
      lg: 'h-14 px-8 py-4 text-lg'
    };
    
    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
