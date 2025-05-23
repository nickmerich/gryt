
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CircleMember } from '@/components/circles/CircleCard';

interface CircleProgressTabProps {
  members: Array<CircleMember & { joinDate: string, streak: number, progress: number }>;
}

const CircleProgressTab: React.FC<CircleProgressTabProps> = ({ members }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Circle Progress</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Streak</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Last Activity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {member.avatar ? (
                    <AvatarImage src={member.avatar} alt={member.name} />
                  ) : (
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>
                <span>{member.name}</span>
              </TableCell>
              <TableCell>{member.streak} days</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gryt-blue rounded-full"
                      style={{ width: `${member.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{member.progress}%</span>
                </div>
              </TableCell>
              <TableCell>Today</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CircleProgressTab;
