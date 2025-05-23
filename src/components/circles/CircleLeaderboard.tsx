
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CircleMember } from '@/components/circles/CircleCard';

interface CircleLeaderboardProps {
  members: Array<CircleMember & { joinDate: string, streak: number, progress: number }>;
  sortBy: 'streak' | 'progress';
  onSortChange: (sort: 'streak' | 'progress') => void;
}

const CircleLeaderboard: React.FC<CircleLeaderboardProps> = ({ 
  members, 
  sortBy, 
  onSortChange 
}) => {
  const sortedMembers = [...members].sort((a, b) => 
    sortBy === 'streak' 
      ? b.streak - a.streak 
      : b.progress - a.progress
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Leaderboard</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant={sortBy === 'streak' ? 'default' : 'outline'} 
            size="sm" 
            className="text-xs" 
            onClick={() => onSortChange('streak')}
          >
            By Streak
          </Button>
          <Button 
            variant={sortBy === 'progress' ? 'default' : 'outline'} 
            size="sm" 
            className="text-xs"
            onClick={() => onSortChange('progress')}
          >
            By Progress
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {sortedMembers.slice(0, 5).map((member, index) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500 w-5">{index + 1}</span>
              <Avatar className="h-8 w-8">
                {member.avatar ? (
                  <AvatarImage src={member.avatar} alt={member.name} />
                ) : (
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm">{member.name}</span>
            </div>
            <div className="text-sm font-medium">
              {sortBy === 'streak' ? (
                <span className="text-gryt-red">{member.streak} days</span>
              ) : (
                <span className="text-gryt-blue">{member.progress}%</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircleLeaderboard;
