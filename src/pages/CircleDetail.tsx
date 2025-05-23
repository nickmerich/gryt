
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainNav from '@/components/MainNav';
import GhibliButton from '@/components/GhibliButton';
import CircleDetailHeader from '@/components/circles/CircleDetailHeader';
import CircleOverviewTab from '@/components/circles/CircleOverviewTab';
import CircleMembersTab from '@/components/circles/CircleMembersTab';
import CircleProgressTab from '@/components/circles/CircleProgressTab';
import { useCircleDetail } from '@/hooks/useCircleDetail';
import { sampleMembers, weeklyPrompt, userGoals } from '@/data/circlesSampleData';

const CircleDetail = () => {
  const { circleId } = useParams<{ circleId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    circle,
    posts,
    leaderboardSort,
    setLeaderboardSort,
    handleCreatePost,
    handleLikePost,
    handleCommentPost,
    handleShare,
    handleInvite,
    currentUser
  } = useCircleDetail(circleId);

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
              onCommentPost={handleCommentPost}
              currentUser={currentUser}
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
