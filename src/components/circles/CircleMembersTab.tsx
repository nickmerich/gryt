
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { CircleMember } from '@/components/circles/CircleCard';

interface CircleMembersTabProps {
  members: Array<CircleMember & { joinDate: string, streak: number, progress: number }>;
  onInvite: () => void;
}

const CircleMembersTab: React.FC<CircleMembersTabProps> = ({ members, onInvite }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Members</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <TooltipProvider>
          {members.map(member => (
            <Tooltip key={member.id}>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 mb-2">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : (
                      <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm text-center">{member.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{member.name}</p>
                <p className="text-xs text-gray-500">Joined: {member.joinDate}</p>
                <p className="text-xs text-gray-500">Streak: {member.streak} days</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      
      <Button variant="outline" className="flex items-center gap-2" onClick={onInvite}>
        <UserPlus className="h-4 w-4" /> Invite New Members
      </Button>
    </div>
  );
};

export default CircleMembersTab;
