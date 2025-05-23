
import React, { useState } from 'react';
import { Clock, Award, Target, Check, X, Trophy, BookOpen } from 'lucide-react';
import GhibliCard from '@/components/GhibliCard';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface GameModePanelProps {
  mode: 'sandbox' | 'real';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  badgeIcon: React.ReactNode;
  badgeColor: string;
  isCompleted: boolean;
  isActive: boolean;
  points: number;
}

const GameModePanel = ({ mode }: GameModePanelProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'challenge-1',
      title: 'Speed Creator',
      description: 'Create a goal with 3 milestones in under 30 seconds',
      timeLimit: 30,
      badgeIcon: <Clock className="w-4 h-4" />,
      badgeColor: 'bg-blue-500',
      isCompleted: false,
      isActive: false,
      points: 50
    },
    {
      id: 'challenge-2',
      title: 'Progress Master',
      description: 'Update progress to hit exactly 80% completion',
      timeLimit: 45,
      badgeIcon: <Target className="w-4 h-4" />,
      badgeColor: 'bg-green-500',
      isCompleted: false,
      isActive: false,
      points: 75
    },
    {
      id: 'challenge-3',
      title: 'Task Champion',
      description: 'Complete 5 tasks in different categories under 1 minute',
      timeLimit: 60,
      badgeIcon: <BookOpen className="w-4 h-4" />,
      badgeColor: 'bg-purple-500',
      isCompleted: false,
      isActive: false,
      points: 100
    },
    {
      id: 'challenge-4',
      title: 'Milestone Sprint',
      description: 'Reach all 5 milestones with perfect timing (20% increments)',
      timeLimit: 90,
      badgeIcon: <Trophy className="w-4 h-4" />,
      badgeColor: 'bg-yellow-500',
      isCompleted: false,
      isActive: false,
      points: 150
    },
  ]);

  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const startChallenge = (id: string) => {
    // Clear any existing timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    // Find the challenge and update its status
    const challenge = challenges.find(c => c.id === id);
    if (!challenge) return;

    // Update all challenges to set the selected one as active
    const updatedChallenges = challenges.map(c => ({
      ...c,
      isActive: c.id === id
    }));

    setChallenges(updatedChallenges);
    setActiveChallenge(id);
    setTimeRemaining(challenge.timeLimit);

    // Start the countdown timer
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Time's up!
          clearInterval(interval);
          handleChallengeEnd(id, false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerInterval(interval as unknown as NodeJS.Timeout);
    toast.info(`Challenge started! You have ${challenge.timeLimit} seconds.`);

    // Simulate random challenge completion for demonstration
    if (mode === 'sandbox') {
      const randomSuccess = Math.random() > 0.3; // 70% chance of success
      const randomTime = Math.floor(Math.random() * (challenge.timeLimit - 5)) + 3; // Random time between 3 and timeLimit-5 seconds
      
      setTimeout(() => {
        if (activeChallenge === id) { // Only proceed if this is still the active challenge
          handleChallengeEnd(id, randomSuccess);
        }
      }, randomTime * 1000);
    }
  };

  const handleChallengeEnd = (id: string, success: boolean) => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    const updatedChallenges = challenges.map(c => {
      if (c.id === id) {
        return {
          ...c,
          isActive: false,
          isCompleted: success
        };
      }
      return c;
    });

    setChallenges(updatedChallenges);
    setActiveChallenge(null);

    if (success) {
      const challenge = challenges.find(c => c.id === id);
      if (challenge) {
        setUserScore(prev => prev + challenge.points);
        setEarnedBadges(prev => [...prev, challenge.title]);
        toast.success(`Challenge completed! +${challenge.points} points`);
      }
    } else {
      toast.error("Time's up! Challenge failed. Try again!");
    }
  };

  const completeChallenge = (id: string) => {
    // This is for demonstration - in a real app, you'd verify the user actually completed the challenge
    handleChallengeEnd(id, true);
  };

  const resetAllChallenges = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    const resetChallenges = challenges.map(c => ({
      ...c,
      isActive: false,
      isCompleted: false
    }));

    setChallenges(resetChallenges);
    setActiveChallenge(null);
    setTimeRemaining(0);
    setUserScore(0);
    setEarnedBadges([]);
    toast.info("All challenges reset. Start fresh!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Challenge Cards */}
      <div className="lg:col-span-2 space-y-6">
        {challenges.map((challenge) => (
          <GhibliCard 
            key={challenge.id} 
            glow={challenge.isActive}
            className={`transition-all ${challenge.isActive ? 'scale-102 border-blue-300' : ''} ${challenge.isCompleted ? 'border-green-300 bg-green-50/30' : ''}`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1.5 text-white ${challenge.badgeColor}`}>
                    {challenge.badgeIcon}
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {challenge.points} pts
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{challenge.description}</p>
              
              {challenge.isActive && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-800">Time Remaining</span>
                    <span className="text-sm font-bold text-blue-800">{timeRemaining}s</span>
                  </div>
                  <Progress 
                    value={(timeRemaining / challenges.find(c => c.id === activeChallenge)?.timeLimit! || 1) * 100} 
                    className="h-2" 
                    indicatorClassName={timeRemaining < 10 ? "bg-red-500" : "bg-blue-500"} 
                  />
                </div>
              )}
              
              <div className="pt-2 flex justify-end space-x-3">
                {!challenge.isActive && !challenge.isCompleted && (
                  <GhibliButton 
                    onClick={() => startChallenge(challenge.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    Start Challenge
                  </GhibliButton>
                )}
                
                {challenge.isActive && (
                  <>
                    <GhibliButton 
                      onClick={() => handleChallengeEnd(challenge.id, false)}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Abort
                    </GhibliButton>
                    
                    <GhibliButton 
                      onClick={() => completeChallenge(challenge.id)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Complete
                    </GhibliButton>
                  </>
                )}
                
                {challenge.isCompleted && (
                  <div className="flex items-center text-green-600">
                    <Check className="w-4 h-4 mr-1" />
                    Completed
                  </div>
                )}
              </div>
            </CardContent>
          </GhibliCard>
        ))}
      </div>
      
      {/* Score and Badges Panel */}
      <div className="space-y-6">
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Game Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-blue-600">{userScore}</div>
              <div className="text-sm text-gray-500 mt-1">Total Points</div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-yellow-500" />
                Earned Badges
              </h3>
              
              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {earnedBadges.map((badge, index) => (
                    <div 
                      key={index} 
                      className="bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-lg border border-blue-100 text-center"
                    >
                      <div className="text-lg mb-1">🏆</div>
                      <div className="text-xs font-medium">{badge}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 italic text-sm">
                  Complete challenges to earn badges
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <GhibliButton
                variant="outline"
                onClick={resetAllChallenges}
                className="w-full"
              >
                Reset All Challenges
              </GhibliButton>
            </div>
          </CardContent>
        </GhibliCard>
        
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                  <Clock className="w-3 h-3 text-blue-600" />
                </div>
                <span>Each challenge has a time limit - beat the clock!</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-1 mt-0.5">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>Complete challenges to earn points and badges</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-purple-100 p-1 mt-0.5">
                  <Trophy className="w-3 h-3 text-purple-600" />
                </div>
                <span>Collect all badges to become a Gryt Master!</span>
              </li>
            </ul>
          </CardContent>
        </GhibliCard>
      </div>
    </div>
  );
};

export default GameModePanel;
