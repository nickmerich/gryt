
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const ChatBubble = ({ message, isUser, timestamp }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex w-full gap-2 mb-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className={cn(
        "w-8 h-8 border flex-shrink-0",
        isUser 
          ? "bg-foreground border-foreground" 
          : "bg-muted border-border"
      )}>
        <div className={cn(
          "text-sm font-semibold",
          isUser ? "text-background" : "text-foreground"
        )}>
          {isUser ? "You" : "🤖"}
        </div>
      </Avatar>
      
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2 text-sm",
        isUser 
          ? "bg-foreground text-background font-semibold" 
          : "bg-background text-foreground border border-border font-medium"
      )}>
        <div className="whitespace-pre-wrap leading-relaxed">{message}</div>
        <div className={cn(
          "text-xs mt-1 font-normal opacity-80",
          isUser ? "text-background/90" : "text-muted-foreground"
        )}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
