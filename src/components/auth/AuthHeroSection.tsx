
import React from 'react';
import { CheckCircle, TrendingUp, Star } from 'lucide-react';

const AuthHeroSection: React.FC = () => {
  return (
    <div className="lg:w-3/5 flex items-center justify-center p-8 lg:p-16 min-h-screen">
      <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in">
        {/* Header Badge - Tactical Style */}
        <div className="inline-flex items-center px-6 py-3 bg-primary/10 border-2 border-primary/30 rounded-sm">
          <span className="w-8 h-8 bg-primary text-primary-foreground rounded-sm flex items-center justify-center text-sm font-bold mr-4">
            01
          </span>
          <span className="text-primary font-bold text-sm tracking-wider uppercase">Purpose</span>
        </div>

        {/* Main Heading - Bold Masculine Typography */}
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tight leading-tight">
            Gryt: Where <span className="text-primary">Ambition</span> Meets Action
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-semibold max-w-xl mx-auto">
            Your AI companion for consistency, clarity, and tactical follow-through.
          </p>
        </div>

        {/* CTA Button - Dynamic and Exciting */}
        <div className="pt-4">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-lg min-w-[280px] text-white rounded-xl bg-gradient-to-r from-[#8aa4ff] to-[#b8c6ff] shadow-[0_4px_20px_rgba(138,164,255,0.3)] transition-all duration-300 ease-out hover:shadow-[0_6px_24px_rgba(138,164,255,0.5)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] animate-slide-up overflow-hidden">
            {/* Subtle shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            
            {/* Button content */}
            <span className="relative z-10 tracking-wide">Try the Playground →</span>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#8aa4ff] to-[#b8c6ff] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></div>
          </button>
        </div>

        {/* Hero Visual - Tactical Dashboard Aesthetic */}
        <div className="pt-8">
          <div className="relative w-full max-w-lg mx-auto">
            <div className="aspect-square bg-gradient-to-br from-background-subtle via-background-muted to-card rounded-sm shadow-performance overflow-hidden relative border-2 border-primary/20">
              {/* Tactical overlay pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20"></div>
              
              {/* Performance Dashboard Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Main tactical interface panel */}
                  <div className="w-40 h-40 bg-gradient-to-br from-card to-background-subtle rounded-sm shadow-xl transform rotate-12 opacity-95 border-2 border-primary/30 overflow-hidden">
                    {/* Top tactical stripe */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
                    
                    {/* Dashboard content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-6">
                      <CheckCircle className="w-8 h-8 text-primary" />
                      <TrendingUp className="w-8 h-8 text-secondary" />
                      <Star className="w-8 h-8 text-accent" />
                    </div>
                    
                    {/* Bottom tactical indicators */}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                      <div className="w-2 h-2 bg-primary rounded-sm animate-tactical-pulse"></div>
                      <div className="w-2 h-2 bg-secondary rounded-sm animate-tactical-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-2 h-2 bg-accent rounded-sm animate-tactical-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                  </div>
                  
                  {/* Floating tactical elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-sm animate-tactical-float border border-primary/50"></div>
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-secondary/80 rounded-sm animate-tactical-float" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 -right-8 w-4 h-4 bg-accent rounded-sm opacity-90 animate-tactical-pulse" style={{ animationDelay: '1.5s' }}></div>
                  
                  {/* Data visualization lines */}
                  <div className="absolute top-1/4 -left-12 w-8 h-0.5 bg-gradient-to-r from-transparent to-primary opacity-60"></div>
                  <div className="absolute bottom-1/4 -right-12 w-8 h-0.5 bg-gradient-to-l from-transparent to-secondary opacity-60"></div>
                </div>
              </div>
              
              {/* Corner tactical accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/60"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/60"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-secondary/60"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-secondary/60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeroSection;
