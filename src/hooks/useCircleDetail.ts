
import { useState, useEffect } from 'react';
import { Circle } from '@/components/circles/CircleCard';
import { Post } from '@/components/circles/CirclePost';
import { Comment } from '@/components/circles/Comment';
import { toast } from 'sonner';
import { circlesData, samplePosts, currentUser } from '@/data/circlesSampleData';

export const useCircleDetail = (circleId: string | undefined) => {
  const [circle, setCircle] = useState<Circle | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [leaderboardSort, setLeaderboardSort] = useState<'streak' | 'progress'>('streak');
  
  useEffect(() => {
    // In a real app, fetch circle data from API
    const foundCircle = circlesData.find(c => c.id === circleId);
    if (foundCircle) {
      setCircle(foundCircle);
      
      // In a real app, fetch posts for this circle from API
      // Add empty commentsList to each post
      setPosts(samplePosts.map(post => ({
        ...post,
        commentsList: []
      })));
    }
  }, [circleId]);
  
  const handleCreatePost = (content: string, category: string, goalId?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
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
  
  const handleCommentPost = (postId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          author: currentUser,
          content,
          timestamp: 'Just now',
          createdAt: new Date()
        };
        
        const commentsList = post.commentsList || [];
        
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [newComment, ...commentsList]
        };
      }
      return post;
    }));
    
    toast.success('Comment added!');
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast.success('Share link copied to clipboard!');
  };
  
  const handleInvite = () => {
    // In a real app, this would open an invite dialog
    toast.success('Invitation dialog would open here');
  };

  return {
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
  };
};

// Need to import userGoals for the handleCreatePost function
import { userGoals } from '@/data/circlesSampleData';
