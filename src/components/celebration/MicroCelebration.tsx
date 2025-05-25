
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Trophy, Zap, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  trigger: string;
  achievement: string;
  identityShift: string;
  progress: number;
  onClose: () => void;
  onShare?: () => void;
}

const celebrationMessages = [
  "You're becoming exactly who you said you would! 🌟",
  "This is who you are now. Own it! 💪",
  "Small steps, big transformation! ✨",
  "You just proved to yourself what's possible! 🎯",
  "Identity shift in progress... 🚀",
  "This is the moment everything changes! 💫"
];

const achievementIcons = {
  first_step: Target,
  consistency: Zap,
  milestone: Trophy,
  breakthrough: Star,
  identity: Heart
};

const MicroCelebration = ({ 
  trigger, 
  achievement, 
  identityShift, 
  progress, 
  onClose, 
  onShare 
}: CelebrationProps) => {
  const [showCelebration, setShowCelebration] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const IconComponent = achievementIcons[trigger as keyof typeof achievementIcons] || Sparkles;
  
  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']
    });
    
    // Cycle through messages
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % celebrationMessages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <Card className="max-w-md w-full bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-2xl">
            <CardContent className="p-8 text-center space-y-6">
              {/* Animated Icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="w-20 h-20 mx-auto bg-gradient-to-br from-gryt-blue to-gryt-purple rounded-full flex items-center justify-center"
              >
                <IconComponent className="w-10 h-10 text-white" />
              </motion.div>
              
              {/* Achievement */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">{achievement}</h3>
                <motion.p
                  key={currentMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-gryt-blue font-medium"
                >
                  {celebrationMessages[currentMessage]}
                </motion.p>
              </div>
              
              {/* Identity Shift */}
              <div className="bg-gradient-to-r from-gryt-blue/10 to-gryt-purple/10 p-4 rounded-2xl">
                <p className="text-sm font-medium text-gray-700">
                  🎯 Identity Update: {identityShift}
                </p>
              </div>
              
              {/* Progress Visualization */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Transformation Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gryt-blue to-gryt-purple rounded-full"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {onShare && (
                  <Button
                    onClick={onShare}
                    variant="outline"
                    className="w-full border-gryt-blue text-gryt-blue hover:bg-gryt-blue hover:text-white"
                  >
                    Share this win! 🎉
                  </Button>
                )}
                <Button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-gryt-blue to-gryt-purple text-white"
                >
                  Keep Going! ✨
                </Button>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 20}%`
                    }}
                    animate={{
                      y: [-10, -30, -10],
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MicroCelebration;
