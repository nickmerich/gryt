
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MessageSquare, BarChart, Menu } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';

const MainNav = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full">
      {/* Mobile Navigation Toggle */}
      <div className="flex md:hidden items-center justify-between p-4">
        <div className="flex items-center">
          <span className="text-xl font-bold text-gryt-red">Gryt</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gryt-dark dark:text-gryt-gray"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gryt-dark p-4 space-y-2 shadow-lg slide-animation">
          <Link 
            to="/" 
            className={cn(
              "flex items-center p-3 rounded-md transition-all",
              isActive('/') ? "bg-gryt-red text-white" : "hover:bg-gryt-gray dark:hover:bg-gryt-dark/50"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>
          
          <Link 
            to="/circles" 
            className={cn(
              "flex items-center p-3 rounded-md transition-all",
              isActive('/circles') ? "bg-gryt-red text-white" : "hover:bg-gryt-gray dark:hover:bg-gryt-dark/50"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users className="w-5 h-5 mr-3" />
            Dream Circles
          </Link>
          
          <Link 
            to="/dashboard" 
            className={cn(
              "flex items-center p-3 rounded-md transition-all",
              isActive('/dashboard') ? "bg-gryt-red text-white" : "hover:bg-gryt-gray dark:hover:bg-gryt-dark/50"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            <BarChart className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
        </div>
      )}

      {/* Desktop Navigation */}
      <NavigationMenu className="max-w-none justify-start hidden md:block">
        <NavigationMenuList className="flex flex-row gap-2 p-2">
          <NavigationMenuItem>
            <Link to="/" className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all",
              isActive('/') 
                ? "bg-gryt-red text-white"
                : "hover:bg-gryt-gray dark:hover:bg-gryt-dark/50"
            )}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/circles" className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all",
              isActive('/circles') 
                ? "bg-gryt-red text-white"
                : "hover:bg-gryt-gray dark:hover:bg-gryt-dark/50"
            )}>
              <Users className="w-4 h-4 mr-2" />
              Dream Circles
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/dashboard" className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all",
              isActive('/dashboard') 
                ? "bg-gryt-red text-white"
                : "hover:bg-gryt-gray dark:hover:bg-gryt-dark/50"
            )}>
              <BarChart className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MainNav;
