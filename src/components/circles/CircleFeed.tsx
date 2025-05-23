
import React, { useState } from 'react';
import CirclePost, { Post } from '@/components/circles/CirclePost';
import CreatePostForm from '@/components/circles/CreatePostForm';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface CircleFeedProps {
  posts: Post[];
  onCreatePost: (content: string, category: string, goalId?: string) => void;
  onLikePost: (postId: string) => void;
  goals: { id: string, title: string }[];
}

type CategoryFilter = 'all' | 'celebration' | 'progress' | 'challenge' | 'general';

const categoryLabels: Record<Exclude<CategoryFilter, 'all'>, string> = {
  celebration: '🎉 Celebrations',
  progress: '📈 Progress',
  challenge: '💪 Challenges',
  general: 'General'
};

const CircleFeed: React.FC<CircleFeedProps> = ({ 
  posts, 
  onCreatePost, 
  onLikePost,
  goals
}) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  const getFilterCount = (category: CategoryFilter) => {
    if (category === 'all') return posts.length;
    return posts.filter(post => post.category === category).length;
  };

  return (
    <div>
      <CreatePostForm onSubmit={onCreatePost} goals={goals} />
      
      <div className="flex justify-between items-center my-6">
        <h3 className="text-lg font-medium">Posts</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {activeFilter === 'all' ? 'All posts' : categoryLabels[activeFilter]}
              <Badge variant="secondary" className="ml-1">{filteredPosts.length}</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem 
              onClick={() => setActiveFilter('all')}
              className={activeFilter === 'all' ? 'bg-accent text-accent-foreground' : ''}
            >
              All posts <Badge variant="secondary" className="ml-auto">{getFilterCount('all')}</Badge>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {Object.entries(categoryLabels).map(([category, label]) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setActiveFilter(category as Exclude<CategoryFilter, 'all'>)}
                className={activeFilter === category ? 'bg-accent text-accent-foreground' : ''}
              >
                {label} <Badge variant="secondary" className="ml-auto">{getFilterCount(category as Exclude<CategoryFilter, 'all'>)}</Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <CirclePost key={post.id} post={post} onLike={onLikePost} />
          ))
        ) : (
          <div className="text-center py-8 bg-muted/40 rounded-lg">
            <p className="text-muted-foreground">No {activeFilter !== 'all' ? categoryLabels[activeFilter].toLowerCase() : ''} posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CircleFeed;
