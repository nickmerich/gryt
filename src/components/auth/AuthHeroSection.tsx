
import React from 'react';
import { CheckCircle, TrendingUp, Star } from 'lucide-react';

const AuthHeroSection: React.FC = () => {
  return (
    <div className="lg:w-3/5 flex items-center justify-center p-8 lg:p-16 min-h-screen bg-background">
      <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in">
        {/* Header Badge - Monochrome Style */}
        <div className="inline-flex items-center px-6 py-3 bg-muted border-2 border-border rounded-lg">
          <span className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center text-sm font-bold mr-4">
            01
          </span>
          <span className="text-foreground font-bold text-sm tracking-wider uppercase">Purpose</span>
        </div>

        {/* Main Heading - Monochrome Typography */}
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tight leading-tight">
            Gryt: Where <span className="border-b-4 border-foreground">Ambition</span> Meets Action
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium max-w-xl mx-auto">
            Your AI companion for consistency, clarity, and tactical follow-through.
          </p>
        </div>

        {/* CTA Button - Monochrome Design */}
        <div className="pt-4">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-lg min-w-[280px] text-background rounded-lg bg-foreground border-2 border-foreground transition-all duration-300 ease-out hover:bg-muted-foreground hover:border-muted-foreground hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] animate-slide-up overflow-hidden">
            {/* Button content */}
            <span className="relative z-10 tracking-wide">Try the Playground →</span>
          </button>
        </div>

        {/* Hero Visual - Monochrome Dashboard Aesthetic */}
        <div className="pt-8">
          <div className="relative w-full max-w-lg mx-auto">
            <div className="aspect-square bg-background rounded-lg overflow-hidden relative border-2 border-border">
              {/* Monochrome overlay pattern */}
              <div className="absolute inset-0 bg-muted/50"></div>
              
              {/* Performance Dashboard Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Main monochrome interface panel */}
                  <div className="w-40 h-40 bg-background rounded-lg transform rotate-12 opacity-95 border-2 border-muted-foreground overflow-hidden">
                    {/* Top stripe */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-foreground"></div>
                    
                    {/* Dashboard content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-6">
                      <CheckCircle className="w-8 h-8 text-foreground" />
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                      <Star className="w-8 h-8 text-foreground" />
                    </div>
                    
                    {/* Bottom indicators */}
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <div className="w-2 h-2 bg-foreground rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Floating monochrome elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-muted rounded-lg border border-border"></div>
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-muted-foreground rounded-lg"></div>
                  <div className="absolute top-1/2 -right-8 w-4 h-4 bg-foreground rounded-lg"></div>
                  
                  {/* Data visualization lines */}
                  <div className="absolute top-1/4 -left-12 w-8 h-0.5 bg-border"></div>
                  <div className="absolute bottom-1/4 -right-12 w-8 h-0.5 bg-border"></div>
                </div>
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-foreground"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-foreground"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-muted-foreground"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-muted-foreground"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeroSection;
