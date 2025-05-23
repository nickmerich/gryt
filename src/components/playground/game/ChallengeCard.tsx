
import React from 'react';
import { Check, X } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';
import { Progress } from '@/components/ui/progress';
import { Challenge } from './GameModeTypes';

interface ChallengeCardProps {
  challenge: Challenge;
  activeChallenge: string | null;
  timeRemaining: number;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onAbort: (id: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  activeChallenge,
  timeRemaining,
  onStart,
  onComplete,
  onAbort
}) => {
  return (
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
              value={(timeRemaining / challenge.timeLimit) * 100} 
              className="h-2" 
              indicatorClassName={timeRemaining < 10 ? "bg-red-500" : "bg-blue-500"} 
            />
          </div>
        )}
        
        <div className="pt-2 flex justify-end space-x-3">
          {!challenge.isActive && !challenge.isCompleted && (
            <GhibliButton 
              onClick={() => onStart(challenge.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              Start Challenge
            </GhibliButton>
          )}
          
          {challenge.isActive && (
            <>
              <GhibliButton 
                onClick={() => onAbort(challenge.id)}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Abort
              </GhibliButton>
              
              <GhibliButton 
                onClick={() => onComplete(challenge.id)}
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
  );
};

export default ChallengeCard;
