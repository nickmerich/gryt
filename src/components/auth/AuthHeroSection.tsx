
import React from 'react';
import { CheckCircle, TrendingUp, Star } from 'lucide-react';

const AuthHeroSection: React.FC = () => {
  return (
    <div className="lg:w-3/5 flex items-center justify-center p-8 lg:p-16 min-h-screen">
      <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in">
        {/* Header Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full">
          <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
            01
          </span>
          <span className="text-orange-600 font-medium">Purpose</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">
            Gryt: Where Ambition Meets Action
          </h1>
          <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
            Your AI companion for consistency, clarity, and follow-through.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg min-w-[280px]">
            Try the Playground →
          </button>
        </div>

        {/* Hero Visual */}
        <div className="pt-8">
          <div className="relative w-full max-w-lg mx-auto">
            <div className="aspect-square bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-600/30"></div>
              
              {/* 3D Visual Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Glowing checklist visual */}
                  <div className="w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-2xl transform rotate-12 opacity-90">
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 p-6">
                      <CheckCircle className="w-8 h-8 text-white" />
                      <TrendingUp className="w-8 h-8 text-white" />
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-300 rounded-full animate-gentle-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-orange-200 rounded-full animate-float"></div>
                  <div className="absolute top-1/2 -right-8 w-4 h-4 bg-white rounded-full opacity-80"></div>
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
