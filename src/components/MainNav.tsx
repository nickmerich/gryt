
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
          <SheetContent side="left">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <span className="text-xl font-bold text-foreground">Gryt</span>
              </Link>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>Goals</span>
              </Link>
              <Link
                to="/circles"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>Community</span>
              </Link>
              <Link
                to="/integrations"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>Sync</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MainNav;
