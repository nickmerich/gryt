
import React from 'react';
import { MessageCircle, Heart, Share2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PostAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: 'celebration' | 'progress' | 'challenge' | 'general';
  goalTitle?: string;
}

interface CirclePostProps {
  post: Post;
  onLike?: (postId: string) => void;
}

const getCategoryColor = (category: Post['category']) => {
  switch (category) {
    case 'celebration':
      return 'bg-green-100 text-green-800';
    case 'progress':
      return 'bg-blue-100 text-blue-800';
    case 'challenge':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryLabel = (category: Post['category']) => {
  switch (category) {
    case 'celebration':
      return '🎉 Celebration';
    case 'progress':
      return '📈 Progress';
    case 'challenge':
      return '💪 Challenge';
    default:
      return 'General';
  }
};

const CirclePost = ({ post, onLike }: CirclePostProps) => {
  const handleLike = () => {
    if (onLike) {
      onLike(post.id);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar>
              {post.author.avatar ? (
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
              ) : (
                <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">{post.author.name}</h3>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>
          <Badge className={getCategoryColor(post.category)}>
            {getCategoryLabel(post.category)}
          </Badge>
        </div>
        {post.goalTitle && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-gray-50">
              Goal: {post.goalTitle}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="py-2">
        <p className="whitespace-pre-line">{post.content}</p>
      </CardContent>
      <CardFooter className="border-t pt-2 flex justify-between">
        <div className="flex space-x-4">
          <Button onClick={handleLike} variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 hover:text-red-500">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <Share2 className="w-4 h-4 mr-1" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CirclePost;
