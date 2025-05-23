
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, ArrowLeft, Share2, UserPlus, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MainNav from '@/components/MainNav';
import CirclePost, { Post } from '@/components/circles/CirclePost';
import CreatePostForm from '@/components/circles/CreatePostForm';
import { toast } from 'sonner';
import { Circle, CircleMember } from '@/components/circles/CircleCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import GhibliCard from '@/components/GhibliCard';
import GhibliButton from '@/components/GhibliButton';

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
  
  const getSortedMembers = () => {
    return [...sampleMembers].sort((a, b) => 
      leaderboardSort === 'streak' 
        ? b.streak - a.streak 
        : b.progress - a.progress
    );
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
        <div className="mb-8">
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
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2" onClick={handleShare}>
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="outline" className="flex items-center gap-2" onClick={handleInvite}>
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
        
        {/* Main tabs and content */}
        <Tabs defaultValue="overview" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Weekly prompt card */}
                <GhibliCard className="p-6" illustration="sunset" illustrationOpacity={0.07}>
                  <h3 className="font-medium text-gray-900 mb-2">{weeklyPrompt.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{weeklyPrompt.content}</p>
                  <p className="text-xs text-gray-500">{weeklyPrompt.date}</p>
                </GhibliCard>
                
                {/* Leaderboard */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-900">Leaderboard</h3>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant={leaderboardSort === 'streak' ? 'default' : 'outline'} 
                        size="sm" 
                        className="text-xs" 
                        onClick={() => setLeaderboardSort('streak')}
                      >
                        By Streak
                      </Button>
                      <Button 
                        variant={leaderboardSort === 'progress' ? 'default' : 'outline'} 
                        size="sm" 
                        className="text-xs"
                        onClick={() => setLeaderboardSort('progress')}
                      >
                        By Progress
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {getSortedMembers().slice(0, 5).map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500 w-5">{index + 1}</span>
                          <Avatar className="h-8 w-8">
                            {member.avatar ? (
                              <AvatarImage src={member.avatar} alt={member.name} />
                            ) : (
                              <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-sm">{member.name}</span>
                        </div>
                        <div className="text-sm font-medium">
                          {leaderboardSort === 'streak' ? (
                            <span className="text-gryt-red">{member.streak} days</span>
                          ) : (
                            <span className="text-gryt-blue">{member.progress}%</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Main feed */}
              <div className="lg:col-span-2">
                <CreatePostForm onSubmit={handleCreatePost} goals={userGoals} />
                
                <div className="space-y-4 mt-6">
                  {posts.map(post => (
                    <CirclePost key={post.id} post={post} onLike={handleLikePost} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="members">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Members</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                <TooltipProvider>
                  {sampleMembers.map(member => (
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
              
              <Button variant="outline" className="flex items-center gap-2" onClick={handleInvite}>
                <UserPlus className="h-4 w-4" /> Invite New Members
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="progress">
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
                  {sampleMembers.map((member) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CircleDetail;

