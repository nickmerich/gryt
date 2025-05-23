
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import MainNav from '@/components/MainNav';
import GhibliButton from '@/components/GhibliButton';
import { Circle, CircleMember } from '@/components/circles/CircleCard';
import { Post } from '@/components/circles/CirclePost';
import CircleDetailHeader from '@/components/circles/CircleDetailHeader';
import CircleOverviewTab from '@/components/circles/CircleOverviewTab';
import CircleMembersTab from '@/components/circles/CircleMembersTab';
import CircleProgressTab from '@/components/circles/CircleProgressTab';

// Sample members with join dates added
const sampleMembers: (CircleMember & { joinDate: string, streak: number, progress: number })[] = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=1', joinDate: '2023-01-15', streak: 12, progress: 78 },
  { id: '2', name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?img=2', joinDate: '2023-02-20', streak: 8, progress: 65 },
  { id: '3', name: 'Jamie Smith', avatar: 'https://i.pravatar.cc/150?img=3', joinDate: '2023-03-05', streak: 21, progress: 92 },
  { id: '4', name: 'Taylor Wilson', avatar: 'https://i.pravatar.cc/150?img=4', joinDate: '2023-04-10', streak: 5, progress: 45 },
  { id: '5', name: 'Jordan Blake', avatar: 'https://i.pravatar.cc/150?img=5', joinDate: '2023-05-25', streak: 16, progress: 81 },
  { id: '6', name: 'Casey Morgan', avatar: 'https://i.pravatar.cc/150?img=6', joinDate: '2023-06-12', streak: 7, progress: 59 },
  { id: '7', name: 'Riley Johnson', avatar: 'https://i.pravatar.cc/150?img=7', joinDate: '2023-07-30', streak: 3, progress: 32 },
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

// Weekly prompts for the circle
const weeklyPrompt = {
  title: "This week's focus",
  content: "What's one small step you've taken this week that you're proud of, even if it didn't lead to the results you hoped for?",
  date: "May 20 - May 26"
};

const CircleDetail = () => {
  const { circleId } = useParams<{ circleId: string }>();
  const [circle, setCircle] = useState<Circle | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [leaderboardSort, setLeaderboardSort] = useState<'streak' | 'progress'>('streak');
  
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
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast.success('Share link copied to clipboard!');
  };
  
  const handleInvite = () => {
    // In a real app, this would open an invite dialog
    toast.success('Invitation dialog would open here');
  };

  if (!circle) {
    return <div className="container mx-auto px-4 py-8">Circle not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/circles" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <GhibliButton variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to circles
            </GhibliButton>
          </Link>
          <MainNav />
        </div>
        
        {/* Circle Header */}
        <CircleDetailHeader 
          circle={circle} 
          onShare={handleShare} 
          onInvite={handleInvite} 
        />
        
        {/* Main tabs and content */}
        <Tabs defaultValue="overview" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <CircleOverviewTab 
              weeklyPrompt={weeklyPrompt}
              members={sampleMembers}
              posts={posts}
              goals={userGoals}
              leaderboardSort={leaderboardSort}
              onSortChange={setLeaderboardSort}
              onCreatePost={handleCreatePost}
              onLikePost={handleLikePost}
            />
          </TabsContent>
          
          <TabsContent value="members">
            <CircleMembersTab 
              members={sampleMembers} 
              onInvite={handleInvite} 
            />
          </TabsContent>
          
          <TabsContent value="progress">
            <CircleProgressTab 
              members={sampleMembers} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CircleDetail;
