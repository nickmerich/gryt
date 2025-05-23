
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface CircleMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  members: CircleMember[];
  isJoined?: boolean;
}

interface CircleCardProps {
  circle: Circle;
  onJoin?: (circleId: string) => void;
}

const CircleCard = ({ circle, onJoin }: CircleCardProps) => {
  const handleJoin = () => {
    if (onJoin && !circle.isJoined) {
      onJoin(circle.id);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gryt-blue to-gryt-purple text-white">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-white text-white">
            {circle.category}
          </Badge>
          <div className="flex -space-x-2">
            {circle.members.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="border-2 border-white h-7 w-7">
                {member.avatar ? (
                  <AvatarImage src={member.avatar} alt={member.name} />
                ) : (
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
            ))}
            {circle.memberCount > 3 && (
              <div className="flex items-center justify-center h-7 w-7 rounded-full bg-white text-gryt-blue text-xs font-bold border-2 border-white">
                +{circle.memberCount - 3}
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-xl">{circle.name}</CardTitle>
        <CardDescription className="text-blue-50">{circle.memberCount} members</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-700">{circle.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
        {circle.isJoined ? (
          <Button asChild variant="outline" className="flex items-center">
            <Link to={`/circles/${circle.id}`}>
              View Circle <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button onClick={handleJoin} className="bg-gryt-blue hover:bg-gryt-blue/90">
            <Users className="mr-2 h-4 w-4" />
            Join Circle
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CircleCard;
