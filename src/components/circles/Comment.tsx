
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

export interface CommentAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: CommentAuthor;
  content: string;
  timestamp: string;
  createdAt: Date;
}

interface CommentProps {
  comment: Comment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const timeAgo = formatDistanceToNow(comment.createdAt, { addSuffix: true });

  return (
    <div className="flex space-x-3 py-3">
      <Avatar className="h-8 w-8">
        {comment.author.avatar ? (
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        ) : (
          <AvatarFallback>{comment.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1">
        <div className="bg-muted px-3 py-2 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>
          <p className="text-sm mt-1">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
