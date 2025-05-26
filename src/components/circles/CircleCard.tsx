
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Flame, Calendar, CheckCircle2 } from 'lucide-react';
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

  // Determine gradient CSS class based on category
  const getGradientClass = (category: string) => {
    switch (category) {
      case 'Health & Fitness':
        return 'bg-gradient-to-br from-success to-emerald-600';
      case 'Career':
        return 'bg-gradient-to-br from-primary to-blue-600';
      case 'Mindfulness':
        return 'bg-gradient-to-br from-purple-600 to-indigo-700';
      case 'Learning':
        return 'bg-gradient-to-br from-amber-500 to-orange-600';
      case 'Creativity':
        return 'bg-gradient-to-br from-pink-500 to-rose-600';
      case 'Finance':
        return 'bg-gradient-to-br from-slate-600 to-gray-700';
      case 'Social':
        return 'bg-gradient-to-br from-cyan-500 to-blue-500';
      case 'Adventure':
        return 'bg-gradient-to-br from-lime-500 to-green-600';
      default:
        return 'bg-gradient-to-br from-secondary to-red-600';
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-lg hover:translate-y-[-4px] duration-300 ${getGradientClass(circle.category)}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-white text-white bg-white/20 backdrop-blur-sm">
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
              <div className="flex items-center justify-center h-7 w-7 rounded-full bg-white text-primary text-xs font-bold border-2 border-white">
                +{circle.memberCount - 3}
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-xl mt-2 text-white">{circle.name}</CardTitle>
        <CardDescription className="text-white/80">{circle.memberCount} members</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-white/90 mb-4">{circle.description}</p>
        <Progress value={70} className="h-1.5 bg-white/30" indicatorClassName="bg-white" />
      </CardContent>
      <CardFooter className="flex justify-between border-t border-white/20 p-4 bg-black/10 backdrop-blur-sm">
        {circle.isJoined ? (
          <Button asChild variant="secondary" className="flex items-center bg-white/20 hover:bg-white/30 text-white">
            <Link to={`/circles/${circle.id}`}>
              View Circle <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button onClick={handleJoin} className="bg-white hover:bg-white/90 text-primary">
            <Users className="mr-2 h-4 w-4" />
            Join Circle
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CircleCard;
