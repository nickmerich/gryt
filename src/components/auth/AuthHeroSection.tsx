
import React from 'react';
import { CheckCircle, TrendingUp, Star } from 'lucide-react';

const AuthHeroSection: React.FC = () => {
  return (
    <div className="lg:w-3/5 flex items-center justify-center p-8 lg:p-16 min-h-screen">
      <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in">
        {/* Header Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-secondary/10 border-2 border-secondary/20 rounded-md">
          <span className="w-6 h-6 bg-secondary text-secondary-foreground rounded-sm flex items-center justify-center text-sm font-bold mr-3">
            01
          </span>
          <span className="text-secondary font-semibold">Purpose</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tight leading-tight">
            Gryt: Where Ambition Meets Action
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium max-w-xl mx-auto">
            Your AI companion for consistency, clarity, and follow-through.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold text-lg rounded-md transition-all duration-300 hover:scale-105 shadow-lg min-w-[280px] border-2 border-secondary/20 hover:border-secondary">
            Try the Playground →
          </button>
        </div>

        {/* Hero Visual */}
        <div className="pt-8">
          <div className="relative w-full max-w-lg mx-auto">
            <div className="aspect-square bg-gradient-to-br from-primary via-primary-hover to-primary rounded-lg shadow-performance overflow-hidden relative">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-secondary/30"></div>
              
              {/* 3D Visual Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Glowing checklist visual */}
                  <div className="w-40 h-40 bg-gradient-to-br from-secondary to-secondary-hover rounded-lg shadow-xl transform rotate-12 opacity-90 border-2 border-secondary/30">
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-6">
                      <CheckCircle className="w-8 h-8 text-secondary-foreground" />
                      <TrendingUp className="w-8 h-8 text-secondary-foreground" />
                      <Star className="w-8 h-8 text-secondary-foreground" />
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-sm animate-gentle-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-accent/70 rounded-sm animate-float"></div>
                  <div className="absolute top-1/2 -right-8 w-4 h-4 bg-primary-foreground rounded-sm opacity-80"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeroSection;
