
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, TrendingUp, Sparkles, Target } from 'lucide-react';
import { Goal } from '@/hooks/useGoals';

interface IdentityTrackerProps {
  goals: Goal[];
  className?: string;
}

const IdentityTracker = ({ goals, className }: IdentityTrackerProps) => {
  // Calculate identity metrics
  const identityGoals = goals.filter(goal => goal.description?.includes('Becoming'));
  const avgProgress = identityGoals.reduce((sum, goal) => sum + goal.progress, 0) / identityGoals.length || 0;
  const completedGoals = identityGoals.filter(goal => goal.progress >= 100).length;
  
  const identityShifts = [
    { trait: 'Disciplined', progress: Math.min(avgProgress + 10, 100), icon: '🎯' },
    { trait: 'Resilient', progress: Math.min(avgProgress + 5, 100), icon: '💪' },
    { trait: 'Consistent', progress: avgProgress, icon: '⚡' },
    { trait: 'Growth-Minded', progress: Math.min(avgProgress + 15, 100), icon: '🌱' }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gryt-blue" />
          <span>Identity Transformation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Becoming Your Future Self</span>
            <span className="text-sm font-medium">{Math.round(avgProgress)}%</span>
          </div>
          <Progress value={avgProgress} className="h-3" />
          <p className="text-xs text-gray-600">
            {completedGoals} identity goals completed • {identityGoals.length - completedGoals} in progress
          </p>
        </div>

        {/* Identity Traits */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-gryt-blue" />
            Your Growing Traits
          </h4>
          {identityShifts.map((trait, index) => (
            <motion.div
              key={trait.trait}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs flex items-center">
                  <span className="mr-2">{trait.icon}</span>
                  {trait.trait}
                </span>
                <span className="text-xs font-medium">{Math.round(trait.progress)}%</span>
              </div>
              <Progress value={trait.progress} className="h-2" />
            </motion.div>
          ))}
        </div>

        {/* Identity Statement */}
        {identityGoals.length > 0 && (
          <div className="bg-gradient-to-r from-gryt-blue/10 to-gryt-purple/10 p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Your Identity Statement
            </h4>
            <p className="text-xs text-gray-700">
              "I am someone who {identityShifts.slice(0, 2).map(t => t.trait.toLowerCase()).join(' and ')} pursues growth through {identityGoals[0]?.category?.toLowerCase() || 'personal development'}."
            </p>
          </div>
        )}

        {/* Next Level */}
        <div className="text-center">
          <Badge variant="secondary" className="bg-gryt-blue/10 text-gryt-blue">
            <TrendingUp className="w-3 h-3 mr-1" />
            Identity Level {Math.floor(avgProgress / 20) + 1}
          </Badge>
          <p className="text-xs text-gray-600 mt-1">
            {100 - avgProgress > 0 
              ? `${Math.round(100 - avgProgress)}% to next identity level`
              : "You've achieved your identity transformation! 🎉"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityTracker;
