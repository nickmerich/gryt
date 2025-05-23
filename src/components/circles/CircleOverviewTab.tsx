
import React from 'react';
import CircleWeeklyPrompt from './CircleWeeklyPrompt';
import CircleLeaderboard from './CircleLeaderboard';
import CircleFeed from './CircleFeed';
import { CircleMember } from '@/components/circles/CircleCard';
import { Post } from '@/components/circles/CirclePost';
import { Comment } from './Comment';

interface CircleOverviewTabProps {
  weeklyPrompt: {
    title: string;
    content: string;
    date: string;
  };
  members: Array<CircleMember & { joinDate: string, streak: number, progress: number }>;
  posts: Post[];
  goals: { id: string, title: string }[];
  leaderboardSort: 'streak' | 'progress';
  onSortChange: (sort: 'streak' | 'progress') => void;
  onCreatePost: (content: string, category: string, goalId?: string) => void;
  onLikePost: (postId: string) => void;
  onCommentPost: (postId: string, content: string) => void;
  currentUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const CircleOverviewTab: React.FC<CircleOverviewTabProps> = ({
  weeklyPrompt,
  members,
  posts,
  goals,
  leaderboardSort,
  onSortChange,
  onCreatePost,
  onLikePost,
  onCommentPost,
  currentUser
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Weekly prompt card */}
        <CircleWeeklyPrompt prompt={weeklyPrompt} />
        
        {/* Leaderboard */}
        <CircleLeaderboard 
          members={members} 
          sortBy={leaderboardSort} 
          onSortChange={onSortChange} 
        />
      </div>
      
      {/* Main feed */}
      <div className="lg:col-span-2">
        <CircleFeed 
          posts={posts} 
          onCreatePost={onCreatePost} 
          onLikePost={onLikePost}
          onCommentPost={onCommentPost}
          goals={goals}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default CircleOverviewTab;
