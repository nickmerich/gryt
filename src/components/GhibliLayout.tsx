
import React from 'react';
import MainNav from './MainNav';
import { cn } from '@/lib/utils';
import GhibliIllustration from './GhibliIllustration';

interface GhibliLayoutProps {
  children: React.ReactNode;
  illustrationType?: 'mountains' | 'forest' | 'landscape' | 'grass' | 'sunset' | 'foggy';
  className?: string;
  hideIllustration?: boolean;
}

const GhibliLayout: React.FC<GhibliLayoutProps> = ({ 
  children, 
  illustrationType = 'landscape',
  className,
  hideIllustration = false
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 w-full backdrop-blur-sm bg-white/80 dark:bg-gryt-dark/80 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <MainNav />
          <div className="hidden md:block py-2 italic text-gryt-blue font-medium">
            Build yourself. Do the thing.
          </div>
        </div>
      </header>
      
      <main className="flex-1 relative">
        {!hideIllustration && (
          <div className="fixed inset-0 z-0 pointer-events-none">
            <GhibliIllustration 
              type={illustrationType} 
              className="opacity-20 w-full h-full"
            />
          </div>
        )}
        
        <div className={cn(
          "relative z-10 container mx-auto py-8 px-4",
          className
        )}>
          {children}
        </div>
      </main>
      
      <footer className="py-6 px-4 border-t backdrop-blur-sm bg-white/80 dark:bg-gryt-dark/80 text-center text-sm text-gryt-blue dark:text-gryt-light">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Gryt. Journey together, achieve together.</p>
        </div>
      </footer>
    </div>
  );
};

export default GhibliLayout;
