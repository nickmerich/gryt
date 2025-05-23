
import React from 'react';
import { Users, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';
import { User } from './types';

interface CircleMembersProps {
  users: User[];
  invitingUser: boolean;
  inviteFriend: () => void;
}

const CircleMembers: React.FC<CircleMembersProps> = ({ 
  users, 
  invitingUser, 
  inviteFriend 
}) => {
  return (
    <GhibliCard>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Circle Members
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {users.map((user) => (
              <Avatar key={user.id} className={`border-2 border-white ${user.online ? 'ring-2 ring-green-400' : ''}`}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <GhibliButton
            size="sm"
            variant="outline"
            onClick={inviteFriend}
            disabled={invitingUser}
          >
            {invitingUser ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-blue-600 rounded-full mr-2" />
                Inviting...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Friend
              </>
            )}
          </GhibliButton>
        </div>
      </CardContent>
    </GhibliCard>
  );
};

export default CircleMembers;
