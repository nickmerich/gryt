
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MainNav from '@/components/MainNav';
import CircleCard, { Circle, CircleMember } from '@/components/circles/CircleCard';
import { toast } from "sonner";
import GhibliIllustration from '@/components/GhibliIllustration';

// Sample data for the Goal Circles
const sampleMembers: CircleMember[] = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Jamie Smith', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Taylor Wilson', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Jordan Blake', avatar: 'https://i.pravatar.cc/150?img=5' },
];

const initialCircles: Circle[] = [
  {
    id: '1',
    name: 'Founders Circle',
    description: 'A community for entrepreneurs and startup founders to share their journey, challenges, and victories.',
    category: 'Career',
    memberCount: 24,
    members: sampleMembers.slice(0, 4),
    isJoined: false
  },
  {
    id: '2',
    name: 'Marathon Runners',
    description: 'Training for a marathon? Join fellow runners to track progress, share training tips, and motivate each other.',
    category: 'Health & Fitness',
    memberCount: 42,
    members: sampleMembers.slice(1, 5),
    isJoined: true
  },
  {
    id: '3',
    name: 'Mindful Creators',
    description: 'A safe space for artists, writers, and creators to share work, give feedback, and overcome creative blocks.',
    category: 'Creativity',
    memberCount: 18,
    members: sampleMembers.slice(0, 3),
    isJoined: false
  },
  {
    id: '4',
    name: 'Comeback Dads',
    description: 'For fathers looking to rebuild and strengthen relationships with their children and families.',
    category: 'Relationships',
    memberCount: 15,
    members: sampleMembers.slice(2, 5),
    isJoined: false
  },
  {
    id: '5',
    name: 'Financial Freedom',
    description: 'A group dedicated to helping each other reach financial goals, from saving for retirement to becoming debt-free.',
    category: 'Finance',
    memberCount: 31,
    members: sampleMembers.slice(1, 4),
    isJoined: false
  },
  {
    id: '6',
    name: 'Language Learners',
    description: 'Practicing a new language? Connect with others on the same journey for practice and encouragement.',
    category: 'Education',
    memberCount: 27,
    members: sampleMembers.slice(0, 3),
    isJoined: false
  }
];

const Circles = () => {
  const [circles, setCircles] = useState<Circle[]>(initialCircles);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCircles = circles.filter((circle) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      circle.name.toLowerCase().includes(searchLower) ||
      circle.description.toLowerCase().includes(searchLower) ||
      circle.category.toLowerCase().includes(searchLower)
    );
  });

  const handleJoinCircle = (circleId: string) => {
    setCircles(
      circles.map((circle) => {
        if (circle.id === circleId) {
          toast.success(`You've joined the ${circle.name}!`);
          return {
            ...circle,
            isJoined: true,
            memberCount: circle.memberCount + 1
          };
        }
        return circle;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gryt-gray">
      <div className="container mx-auto px-4 py-8">
        {/* Simple header with just profile menu */}
        <div className="flex justify-end mb-8">
          <MainNav />
        </div>
        
        {/* Hero section - Elevated and styled as main focus */}
        <div className="min-h-[25vh] flex flex-col items-center justify-center py-12 mb-10 relative">
          <div className="absolute inset-0 z-0 opacity-10">
            <GhibliIllustration type="mountains" className="w-full h-full" />
          </div>
          <div className="text-center relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gryt-dark mb-4">Goal Circles</h1>
            <p className="text-xl text-gray-600 mb-8">
              Join micro-communities centered around specific goals. Share progress, overcome challenges, 
              and celebrate wins with people on similar journeys.
            </p>
            
            {/* Search and filters positioned as primary actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search circles..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="md:w-auto flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </div>
        
        {/* Circle grid - centered with more spacing */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCircles.length > 0 ? (
              filteredCircles.map((circle) => (
                <CircleCard 
                  key={circle.id} 
                  circle={circle} 
                  onJoin={handleJoinCircle} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No circles found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circles;
