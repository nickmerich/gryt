
import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Comment, { Comment as CommentType } from '@/components/circles/Comment';
import CommentForm from '@/components/circles/CommentForm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  commentsList?: CommentType[];
}

interface CirclePostProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, content: string) => void;
  currentUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

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

const CirclePost = ({ post, onLike, onComment, currentUser }: CirclePostProps) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  
  const handleLike = () => {
    if (onLike) {
      onLike(post.id);
    }
  };

  const handleComment = (content: string) => {
    if (onComment && currentUser) {
      onComment(post.id, content);
    }
  };

  const showComments = post.commentsList && post.commentsList.length > 0;
  const hasCommentsOrCanComment = showComments || currentUser;

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
              <h3 className="font-medium text-foreground">{post.author.name}</h3>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <Badge variant="outline">
            {getCategoryLabel(post.category)}
          </Badge>
        </div>
        {post.goalTitle && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-muted">
              Goal: {post.goalTitle}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="py-2">
        <p className="whitespace-pre-line">{post.content}</p>
      </CardContent>
      <CardFooter className="border-t pt-2 flex flex-col">
        <div className="flex justify-between w-full">
          <div className="flex space-x-4">
            <Button onClick={handleLike} variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => hasCommentsOrCanComment && setIsCommentsOpen(!isCommentsOpen)}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Share2 className="w-4 h-4 mr-1" /> Share
          </Button>
        </div>
        
        {hasCommentsOrCanComment && (
          <Collapsible
            open={isCommentsOpen}
            onOpenChange={setIsCommentsOpen}
            className="w-full mt-2"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full flex items-center justify-center text-xs text-muted-foreground">
                {isCommentsOpen ? (
                  <>Hide comments <ChevronUp className="h-3 w-3 ml-1" /></>
                ) : (
                  <>Show comments <ChevronDown className="h-3 w-3 ml-1" /></>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              {showComments && (
                <div className="border-t pt-2">
                  {post.commentsList.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
              
              {currentUser && (
                <div className={showComments ? "" : "border-t pt-2"}>
                  <CommentForm 
                    userName={currentUser.name}
                    userAvatar={currentUser.avatar}
                    onSubmit={handleComment}
                  />
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardFooter>
    </Card>
  );
};

export default CirclePost;
