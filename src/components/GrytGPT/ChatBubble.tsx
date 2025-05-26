
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
          ? "bg-gradient-to-r from-primary to-secondary border-primary/30" 
          : "bg-gradient-to-r from-primary-light to-background border-primary/30"
      )}>
        <div className={cn(
          "text-sm font-semibold",
          isUser ? "text-white" : "text-primary"
        )}>
          {isUser ? "You" : "🤖"}
        </div>
      </Avatar>
      
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2 text-sm backdrop-blur-sm",
        isUser 
          ? "bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg" 
          : "bg-gradient-to-br from-background/95 to-primary-light/50 text-foreground border border-primary/15 font-medium shadow-sm"
      )}>
        <div className="whitespace-pre-wrap leading-relaxed">{message}</div>
        <div className={cn(
          "text-xs mt-1 font-normal opacity-80",
          isUser ? "text-white/90" : "text-muted-foreground"
        )}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
