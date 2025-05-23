
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Users, BarChart, X, MessageCircle, User, Settings } from 'lucide-react';
import ProfileMenu from './ProfileMenu';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'My Dashboard',
      href: '/',
      icon: Home
    },
    {
      name: 'Circles',
      href: '/circles',
      icon: Users
    },
    {
      name: 'Progress',
      href: '/dashboard',
      icon: BarChart
    },
    {
      name: 'Community',
      href: '/community',
      icon: MessageCircle
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings
    }
  ];

  const NavLinks = () => (
    <div className="flex flex-col gap-1 md:w-full">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:bg-gryt-light/50 hover:text-gryt-blue transition-colors ${
            isActive(item.href) ? 'bg-gryt-light text-gryt-blue font-medium' : ''
          }`}
          onClick={() => setIsOpen(false)}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex items-center md:block py-2">
      <div className="hidden md:flex md:flex-col md:w-full">
        <NavLinks />
      </div>
      
      <div className="ml-auto md:hidden flex items-center gap-4">
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
                <span className="text-xl font-bold text-gryt-blue">Gryt</span>
              </Link>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MainNav;
