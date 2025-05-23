
import React from 'react';
import { Award, Clock, Check, Trophy } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';

interface StatsPanelProps {
  userScore: number;
  earnedBadges: string[];
  onResetAll: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ userScore, earnedBadges, onResetAll }) => {
  return (
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
              onClick={onResetAll}
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
  );
};

export default StatsPanel;
