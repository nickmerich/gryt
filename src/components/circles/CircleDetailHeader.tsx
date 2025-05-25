
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Share2, UserPlus, Link2 } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Circle, CircleMember } from '@/components/circles/CircleCard';

interface CircleDetailHeaderProps {
  circle: Circle;
  onShare: () => void;
  onInvite: () => void;
}

const CircleDetailHeader: React.FC<CircleDetailHeaderProps> = ({ 
  circle, 
  onShare, 
  onInvite 
}) => {
  return (
    <div className="mb-8">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-100 text-blue-800">{circle.category}</Badge>
              <span className="text-sm text-gray-500">{circle.memberCount} members</span>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-black">{circle.name}</h1>
            <p className="text-gray-600 mb-4">{circle.description}</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2" onClick={onShare}>
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={onInvite}>
              <UserPlus className="h-4 w-4" /> Invite
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Link2 className="h-4 w-4" /> Link Integration
            </Button>
          </div>
        </div>
        
        <div className="flex items-center mt-4">
          <TooltipProvider>
            <div className="flex -space-x-2 mr-3">
              {circle.members.slice(0, 5).map((member) => (
                <Tooltip key={member.id}>
                  <TooltipTrigger asChild>
                    <Avatar className="border-2 border-white h-8 w-8">
                      {member.avatar ? (
                        <AvatarImage src={member.avatar} alt={member.name} />
                      ) : (
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      )}
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{member.name}</p>
                    <p className="text-xs text-gray-500">Joined: {(member as any).joinDate}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              {circle.memberCount > 5 && (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-800 text-xs font-bold border-2 border-white">
                  +{circle.memberCount - 5}
                </div>
              )}
            </div>
          </TooltipProvider>
          <span className="text-sm text-gray-500">Join the conversation!</span>
        </div>
      </div>
    </div>
  );
};

export default CircleDetailHeader;
