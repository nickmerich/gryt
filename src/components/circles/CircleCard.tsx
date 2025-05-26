
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

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
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:translate-y-[-4px] duration-300 bg-white border border-orange-100/50 rounded-3xl shadow-lg">
      <CardHeader className="p-8">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-orange-200 text-orange-600 bg-orange-50 rounded-full px-4 py-2 font-medium">
            {circle.category}
          </Badge>
          <div className="flex -space-x-2">
            {circle.members.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                {member.avatar ? (
                  <AvatarImage src={member.avatar} alt={member.name} />
                ) : (
                  <AvatarFallback className="text-xs">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
            ))}
            {circle.memberCount > 3 && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold border-2 border-white">
                +{circle.memberCount - 3}
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900 mb-2">{circle.name}</CardTitle>
        <CardDescription className="text-slate-600 font-medium">{circle.memberCount} members</CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-6">
        <p className="text-slate-700 mb-6 leading-relaxed">{circle.description}</p>
        <Progress value={70} className="h-2 bg-orange-100" indicatorClassName="bg-orange-500" />
      </CardContent>
      <CardFooter className="p-8 pt-0">
        {circle.isJoined ? (
          <Button asChild variant="default" className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-lg font-semibold">
            <Link to={`/circles/${circle.id}`}>
              View Circle <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        ) : (
          <Button onClick={handleJoin} className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 text-lg font-semibold">
            <Users className="mr-2 h-5 w-5" />
            Join Circle
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CircleCard;
