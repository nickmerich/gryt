
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, Home, Users, BarChart, X } from 'lucide-react';
import ProfileMenu from './ProfileMenu';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home
    },
    {
      name: 'Circles',
      href: '/circles',
      icon: Users
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: BarChart
    }
  ];

  const NavLinks = () => (
    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="flex items-center gap-2 py-2 px-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center mr-6">
        <span className="text-xl font-bold text-blue-600">Gryt</span>
      </Link>
      
      <div className="hidden md:flex">
        <NavLinks />
      </div>
      
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
                <span className="text-xl font-bold text-blue-600">Gryt</span>
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
