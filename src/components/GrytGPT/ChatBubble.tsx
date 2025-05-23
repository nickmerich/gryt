
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
        isUser ? "bg-blue-100 border-blue-300" : "bg-purple-100 border-purple-300"
      )}>
        <div className="text-sm font-semibold">
          {isUser ? "You" : "🤖"}
        </div>
      </Avatar>
      
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2 text-sm",
        isUser ? "bg-blue-100 text-blue-900" : "bg-white text-gray-800 border border-gray-200"
      )}>
        <div className="whitespace-pre-wrap">{message}</div>
        <div className={cn(
          "text-xs mt-1 opacity-70",
          isUser ? "text-blue-700" : "text-gray-500"
        )}>
          {timestamp}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
