
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
    <div className="min-h-screen bg-gryt-gray">
      <header className="sticky top-0 z-30 w-full backdrop-blur-sm bg-white/90 border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gryt-blue rounded-lg flex items-center justify-center text-white mr-2">
              <span className="font-bold">G</span>
            </div>
            <span className="font-bold text-lg text-gryt-blue">Gryt</span>
          </div>
          <MainNav />
        </div>
      </header>
      
      <main className="flex-1 relative">
        {!hideIllustration && (
          <div className="fixed inset-0 z-0 pointer-events-none">
            <GhibliIllustration 
              type={illustrationType} 
              className="opacity-10 w-full h-full"
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
      
      <footer className="py-4 px-4 border-t bg-white text-center text-sm text-gryt-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <GhibliIllustration type="sunset" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto relative z-10">
          <p>© {new Date().getFullYear()} Gryt. Journey together, achieve together.</p>
        </div>
      </footer>
    </div>
  );
};

export default GhibliLayout;
