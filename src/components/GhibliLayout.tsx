
import React from 'react';
import MainNav from './MainNav';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import GrytLogo from './GrytLogo';

interface GhibliLayoutProps {
  children: React.ReactNode;
  illustrationType?: 'mountains' | 'forest' | 'landscape' | 'grass' | 'sunset' | 'foggy';
  className?: string;
  hideIllustration?: boolean;
}

const GhibliLayout: React.FC<GhibliLayoutProps> = ({ 
  children, 
  className,
}) => {
  return (
    <div className="min-h-screen bg-gryt-gray">
      <header className="sticky top-0 z-30 w-full backdrop-blur-sm bg-white/90 border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GrytLogo size="sm" className="mr-2" />
              <span className="font-bold text-lg text-gryt-blue">Gryt</span>
            </Link>
            <nav className="ml-8 hidden md:flex space-x-6">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gryt-blue transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/circles" 
                className="text-gray-600 hover:text-gryt-blue transition-colors"
              >
                Goal Circles
              </Link>
              <Link 
                to="/integrations" 
                className="text-gray-600 hover:text-gryt-blue transition-colors"
              >
                Integrations
              </Link>
            </nav>
          </div>
          <MainNav />
        </div>
      </header>
      
      <main className="flex-1 relative">
        <div className={cn(
          "relative z-10 container mx-auto py-8 px-4",
          className
        )}>
          {children}
        </div>
      </main>
      
      <footer className="py-4 px-4 border-t bg-white text-center text-sm text-gryt-blue relative">
        <div className="container mx-auto relative z-10">
          <p>© {new Date().getFullYear()} Gryt. Journey together, achieve together.</p>
        </div>
      </footer>
    </div>
  );
};

export default GhibliLayout;
