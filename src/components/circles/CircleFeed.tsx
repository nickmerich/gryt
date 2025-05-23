
import React from 'react';
import CirclePost, { Post } from '@/components/circles/CirclePost';
import CreatePostForm from '@/components/circles/CreatePostForm';

interface CircleFeedProps {
  posts: Post[];
  onCreatePost: (content: string, category: string, goalId?: string) => void;
  onLikePost: (postId: string) => void;
  goals: { id: string, title: string }[];
}

const CircleFeed: React.FC<CircleFeedProps> = ({ 
  posts, 
  onCreatePost, 
  onLikePost,
  goals
}) => {
  return (
    <div>
      <CreatePostForm onSubmit={onCreatePost} goals={goals} />
      
      <div className="space-y-4 mt-6">
        {posts.map(post => (
          <CirclePost key={post.id} post={post} onLike={onLikePost} />
        ))}
      </div>
    </div>
  );
};

export default CircleFeed;
