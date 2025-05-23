
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MessageSquare, BarChart } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <NavigationMenu className="max-w-none justify-start">
      <NavigationMenuList className="flex flex-row gap-2">
        <NavigationMenuItem>
          <Link to="/" className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors",
            isActive('/') 
              ? "bg-accent/50 text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          )}>
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/circles" className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors",
            isActive('/circles') 
              ? "bg-accent/50 text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          )}>
            <Users className="w-4 h-4 mr-2" />
            Dream Circles
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/dashboard" className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors",
            isActive('/dashboard') 
              ? "bg-accent/50 text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          )}>
            <BarChart className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
