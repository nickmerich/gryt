
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentFormProps {
  userAvatar?: string;
  userName: string;
  onSubmit: (content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ userAvatar, userName, onSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    onSubmit(content);
    setContent('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start space-x-3 mt-3">
      <Avatar className="h-8 w-8">
        {userAvatar ? (
          <AvatarImage src={userAvatar} alt={userName} />
        ) : (
          <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1 space-y-2">
        <Textarea
          placeholder="Write a comment..."
          className="min-h-[60px] resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="sm" 
            disabled={!content.trim() || isSubmitting}
          >
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
