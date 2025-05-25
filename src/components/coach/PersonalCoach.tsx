
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Target, TrendingUp, Coffee, Moon, Sun, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Goal } from '@/hooks/useGoals';

interface PersonalCoachProps {
  goals: Goal[];
  userProgress: any;
  onResponse: (response: string) => void;
  onClose: () => void;
}

const coachPersonalities = {
  supportive: {
    name: "Alex",
    emoji: "🤗",
    tone: "warm and encouraging",
    responses: [
      "I see you're doing amazing work on your goals! How are you feeling about your progress?",
      "You've shown such consistency lately. What's been working best for you?",
      "I noticed you've been pushing through some challenges. Want to talk about it?"
    ]
  },
  analytical: {
    name: "Sam",
    emoji: "📊", 
    tone: "data-driven and insightful",
    responses: [
      "Looking at your patterns, I see some interesting trends. Let's dive deeper.",
      "Your consistency score is up 23% this week. What changed?",
      "The data shows you're strongest on Tuesday mornings. How can we leverage that?"
    ]
  },
  motivational: {
    name: "Jamie",
    emoji: "🔥",
    tone: "energetic and action-focused",
    responses: [
      "You're absolutely crushing it! Ready to level up even more?",
      "I see that fire in your progress. What's your next big move?",
      "You've got momentum building. Let's ride this wave!"
    ]
  }
};

const checkInQuestions = [
  {
    type: "reflection",
    question: "What's one thing you learned about yourself this week?",
    follow_up: "That's such valuable insight. How might you use this learning going forward?"
  },
  {
    type: "struggle",
    question: "What's been the hardest part of your journey lately?",
    follow_up: "Struggles are where growth happens. You're exactly where you need to be."
  },
  {
    type: "celebration",
    question: "What's a small win you're proud of but maybe haven't celebrated?",
    follow_up: "Yes! Those small wins are building the person you're becoming. Own that victory!"
  },
  {
    type: "future",
    question: "If your future self could give you one piece of advice right now, what would it be?",
    follow_up: "Trust that wisdom. Your future self is rooting for you."
  }
];

const PersonalCoach = ({ goals, userProgress, onResponse, onClose }: PersonalCoachProps) => {
  const [currentCoach, setCurrentCoach] = useState(coachPersonalities.supportive);
  const [currentQuestion, setCurrentQuestion] = useState(checkInQuestions[0]);
  const [chatStage, setChatStage] = useState('greeting');
  const [userInput, setUserInput] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);

  const timeOfDay = new Date().getHours();
  const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 17 ? 'Good afternoon' : 'Good evening';
  
  const getPersonalizedGreeting = () => {
    const recentGoal = goals[0]?.title || 'your goals';
    const progress = goals[0]?.progress || 0;
    
    if (progress > 80) {
      return `${greeting}! You're so close to achieving ${recentGoal}. I can feel the excitement building! 🎯`;
    } else if (progress > 50) {
      return `${greeting}! You're making solid progress on ${recentGoal}. The momentum is real! 📈`;
    } else {
      return `${greeting}! Ready to take another step toward ${recentGoal}? Every journey starts with showing up! ✨`;
    }
  };

  const handleQuickResponse = (response: string) => {
    setUserInput(response);
    onResponse(response);
    if (!showFollowUp) {
      setShowFollowUp(true);
    } else {
      setChatStage('wrap_up');
    }
  };

  const getEncouragement = () => {
    const encouragements = [
      "You're building something beautiful, one day at a time. 🌱",
      "The person you're becoming is worth every effort you're making. 💪",
      "Progress isn't always linear, but you're always moving forward. 🎯",
      "You showed up today. That's what champions do. 👑",
      "Your consistency is creating your identity. Keep going! ⚡"
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Card className="w-96 bg-white shadow-2xl border-2 border-gryt-blue/20">
          <CardContent className="p-6 space-y-4">
            {/* Coach Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gryt-blue to-gryt-purple rounded-full flex items-center justify-center text-xl">
                  {currentCoach.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Coach {currentCoach.name}</h3>
                  <Badge variant="secondary" className="text-xs">Your personal guide</Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
            </div>

            {/* Chat Content */}
            <div className="space-y-4">
              {chatStage === 'greeting' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-gryt-blue/10 to-gryt-purple/10 p-4 rounded-2xl">
                    <p className="text-sm">{getPersonalizedGreeting()}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">How would you like to connect today?</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setChatStage('check_in');
                          setCurrentQuestion(checkInQuestions[Math.floor(Math.random() * checkInQuestions.length)]);
                        }}
                        className="text-xs"
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        Check-in
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setChatStage('strategy')}
                        className="text-xs"
                      >
                        <Target className="w-3 h-3 mr-1" />
                        Strategy
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setChatStage('motivation')}
                        className="text-xs"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Motivation
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setChatStage('celebration')}
                        className="text-xs"
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Celebrate
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {chatStage === 'check_in' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-gryt-blue/10 to-gryt-purple/10 p-4 rounded-2xl">
                    <p className="text-sm">
                      {showFollowUp ? currentQuestion.follow_up : currentQuestion.question}
                    </p>
                  </div>
                  
                  {!showFollowUp && (
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-left text-xs"
                        onClick={() => handleQuickResponse("I'm feeling good about my progress")}
                      >
                        I'm feeling good about my progress
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-left text-xs"
                        onClick={() => handleQuickResponse("I'm struggling a bit lately")}
                      >
                        I'm struggling a bit lately
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-left text-xs"
                        onClick={() => handleQuickResponse("I need some motivation")}
                      >
                        I need some motivation
                      </Button>
                    </div>
                  )}
                  
                  {showFollowUp && (
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-3">{getEncouragement()}</p>
                      <Button 
                        onClick={() => setChatStage('wrap_up')}
                        className="bg-gradient-to-r from-gryt-blue to-gryt-purple text-white text-xs"
                      >
                        Thanks, Coach! 💚
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {chatStage === 'wrap_up' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-3"
                >
                  <div className="text-2xl">✨</div>
                  <p className="text-sm font-medium">You've got this!</p>
                  <p className="text-xs text-gray-600">I'll check in with you again soon. Keep being amazing! 🌟</p>
                  <Button 
                    onClick={onClose}
                    size="sm"
                    className="bg-gradient-to-r from-gryt-blue to-gryt-purple text-white"
                  >
                    Continue Growing
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default PersonalCoach;
