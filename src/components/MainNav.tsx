
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Target, Users, Zap } from 'lucide-react';
import ProfileMenu from './ProfileMenu';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  return (
    <div className="flex items-center md:block py-2">
      <div className="ml-auto flex items-center gap-4">
        <ProfileMenu />
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <div className="flex items-center space-x-2">
                  <div className="bg-red-600 p-2 rounded-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-red-600">The Gryt</span>
                    <p className="text-xs text-gray-600 font-medium">Purpose-Driven Growth</p>
                  </div>
                </div>
              </Link>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Target className="w-5 h-5" />
                <span>Transformation</span>
              </Link>
              <Link
                to="/circles"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Users className="w-5 h-5" />
                <span>Brotherhood</span>
              </Link>
              <Link
                to="/integrations"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Zap className="w-5 h-5" />
                <span>AI Coaching</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MainNav;
