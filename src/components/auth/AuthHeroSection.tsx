
import React from 'react';
import { Target, TrendingUp, Link, Users, Shield, Zap } from 'lucide-react';

const AuthHeroSection: React.FC = () => {
  return (
    <div className="lg:w-3/5 flex items-center justify-center p-8 lg:p-16">
      <div className="max-w-2xl space-y-12 animate-fade-in">
        {/* Brand - Bold Text Only */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-gryt-blue to-gryt-purple bg-clip-text text-transparent tracking-tight">
              Gryt
            </h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Where Goals Meet
              <span className="bg-gradient-to-r from-gryt-blue to-gryt-purple bg-clip-text text-transparent"> Achievement</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Your AI-powered companion that learns and adapts alongside you on your journey to success.
            </p>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-gryt-blue/20 to-gryt-blue/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-gryt-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Smart Goal Setting</h3>
              <p className="text-sm text-slate-600">AI helps you break down big dreams into achievable milestones</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-gryt-purple/20 to-gryt-purple/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gryt-purple" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Progress Tracking</h3>
              <p className="text-sm text-slate-600">Beautiful visualizations that keep you motivated</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-gryt-blue/20 to-gryt-blue/10 rounded-xl flex items-center justify-center">
              <Link className="w-6 h-6 text-gryt-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Smart Integrations</h3>
              <p className="text-sm text-slate-600">Connect your favorite apps for seamless progress updates</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-gryt-purple/20 to-gryt-purple/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-gryt-purple" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Community Support</h3>
              <p className="text-sm text-slate-600">Join circles of like-minded achievers</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-slate-500">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeroSection;
