
import React from 'react';
import MainNav from './MainNav';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface GhibliLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const GhibliLayout: React.FC<GhibliLayoutProps> = ({ 
  children, 
  className,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <header className="sticky top-0 z-30 w-full backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm">
        <div className="container mx-auto flex justify-between items-center p-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl ml-3 text-black">Gryt</span>
            </Link>
            <nav className="ml-12 hidden md:flex space-x-8">
              <Link 
                to="/" 
                className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Goals
              </Link>
              <Link 
                to="/circles" 
                className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Community
              </Link>
              <Link 
                to="/integrations" 
                className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
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
          "relative z-10 container mx-auto py-8 px-6",
          className
        )}>
          {children}
        </div>
      </main>
      
      <footer className="py-8 px-6 border-t border-white/20 bg-white/50 backdrop-blur-sm text-center text-base text-slate-600 relative">
        <div className="container mx-auto relative z-10">
          <p>© {new Date().getFullYear()} Gryt. Journey together, achieve together.</p>
        </div>
      </footer>
    </div>
  );
};

export default GhibliLayout;
