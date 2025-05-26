
import React from 'react';
import MainNav from './MainNav';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface GhibliLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const GhibliLayout: React.FC<GhibliLayoutProps> = ({ 
  children, 
  className,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      <header className="sticky top-0 z-30 w-full backdrop-blur-lg bg-white/80 border-b border-orange-100/50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center p-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="font-black text-3xl text-slate-900">Gryt</span>
            </Link>
            <nav className="ml-12 hidden md:flex space-x-8">
              <Link 
                to="/" 
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-lg"
              >
                Goals
              </Link>
              <Link 
                to="/circles" 
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-lg"
              >
                Community
              </Link>
              <Link 
                to="/integrations" 
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium text-lg"
              >
                Sync
              </Link>
            </nav>
          </div>
          <MainNav />
        </div>
      </header>
      
      <main className="flex-1 relative">
        <div className={cn(
          "relative z-10 container mx-auto py-12 px-6",
          className
        )}>
          {children}
        </div>
      </main>
      
      <footer className="py-12 px-6 border-t border-orange-100/50 bg-white/50 backdrop-blur-sm text-center text-lg text-slate-600 relative">
        <div className="container mx-auto relative z-10">
          <p>© {new Date().getFullYear()} Gryt. Journey together, achieve together.</p>
        </div>
      </footer>
    </div>
  );
};

export default GhibliLayout;
