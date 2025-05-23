
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import MainNav from '@/components/MainNav';
import CirclePost, { Post } from '@/components/circles/CirclePost';
import CreatePostForm from '@/components/circles/CreatePostForm';
import { toast } from 'sonner';
import { Circle, CircleMember } from '@/components/circles/CircleCard';

// Sample members
const sampleMembers: CircleMember[] = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Jamie Smith', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Taylor Wilson', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Jordan Blake', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Casey Morgan', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: '7', name: 'Riley Johnson', avatar: 'https://i.pravatar.cc/150?img=7' },
];

// Sample circles data
const circlesData: Circle[] = [
  {
    id: '1',
    name: 'Founders Circle',
    description: 'A community for entrepreneurs and startup founders to share their journey, challenges, and victories.',
    category: 'Career',
    memberCount: 24,
    members: sampleMembers.slice(0, 4),
    isJoined: true
  },
  {
    id: '2',
    name: 'Marathon Runners',
    description: 'Training for a marathon? Join fellow runners to track progress, share training tips, and motivate each other.',
    category: 'Health & Fitness',
    memberCount: 42,
    members: sampleMembers.slice(1, 5),
    isJoined: true
  }
];

// Sample posts data
const samplePosts: Post[] = [
  {
    id: '1',
    author: sampleMembers[0],
    content: "Just secured our first angel investor! It's been a long journey but we finally got someone who believes in our vision. Next step: building our MVP faster with the new resources.",
    timestamp: '2 hours ago',
    likes: 12,
    comments: 5,
    category: 'celebration',
    goalTitle: 'Secure Funding'
  },
  {
    id: '2',
    author: sampleMembers[1],
    content: "I'm stuck on how to approach customer acquisition. Our product is great, but we're struggling to get it in front of the right people. Has anyone had success with content marketing for B2B SaaS?",
    timestamp: '5 hours ago',
    likes: 8,
    comments: 7,
    category: 'challenge'
  },
  {
    id: '3',
    author: sampleMembers[2],
    content: "We've increased our MRR by 15% this month by focusing on reducing churn. The key was implementing a better onboarding flow and more proactive customer success outreach.",
    timestamp: '1 day ago',
    likes: 21,
    comments: 3,
    category: 'progress',
    goalTitle: 'Increase Monthly Revenue'
  }
];

// Sample user goals for the form
const userGoals = [
  { id: 'g1', title: 'Launch MVP' },
  { id: 'g2', title: 'Reach 100 Users' },
  { id: 'g3', title: 'Secure Funding' }
];

const CircleDetail = () => {
  const { circleId } = useParams<{ circleId: string }>();
  const [circle, setCircle] = useState<Circle | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // In a real app, fetch circle data from API
    const foundCircle = circlesData.find(c => c.id === circleId);
    if (foundCircle) {
      setCircle(foundCircle);
      
      // In a real app, fetch posts for this circle from API
      setPosts(samplePosts);
    }
  }, [circleId]);

  const handleCreatePost = (content: string, category: string, goalId?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: { 
        id: 'current-user', 
        name: 'You', 
        avatar: 'https://i.pravatar.cc/150?img=8' 
      },
      content,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      category: category as 'celebration' | 'progress' | 'challenge' | 'general',
      goalTitle: goalId ? userGoals.find(g => g.id === goalId)?.title : undefined
    };
    
    setPosts([newPost, ...posts]);
    toast.success('Your post has been shared with the circle!');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1
        };
      }
      return post;
    }));
  };

  if (!circle) {
    return <div className="container mx-auto px-4 py-8">Circle not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <MainNav />
        </div>
        
        {/* Circle Header */}
        <div className="mb-8">
          <Link to="/circles" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to all circles
          </Link>
          
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800">{circle.category}</Badge>
                  <span className="text-sm text-gray-500">{circle.memberCount} members</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">{circle.name}</h1>
                <p className="text-gray-600 mb-4">{circle.description}</p>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> View Members
              </Button>
            </div>
            
            <div className="flex items-center mt-4">
              <div className="flex -space-x-2 mr-3">
                {circle.members.slice(0, 5).map((member) => (
                  <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : (
                      <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                ))}
                {circle.memberCount > 5 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-800 text-xs font-bold border-2 border-white">
                    +{circle.memberCount - 5}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-500">Join the conversation!</span>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - on larger screens */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-3">About this circle</h3>
              <p className="text-gray-600 text-sm mb-4">{circle.description}</p>
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Top contributors</h4>
                <div className="space-y-3">
                  {circle.members.slice(0, 3).map(member => (
                    <div key={member.id} className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        {member.avatar ? (
                          <AvatarImage src={member.avatar} alt={member.name} />
                        ) : (
                          <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main feed */}
          <div className="lg:col-span-2">
            <CreatePostForm onSubmit={handleCreatePost} goals={userGoals} />
            
            <div className="space-y-4">
              {posts.map(post => (
                <CirclePost key={post.id} post={post} onLike={handleLikePost} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleDetail;
