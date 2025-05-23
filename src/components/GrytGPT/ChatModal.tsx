
import React from 'react';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ChatInterface from './ChatInterface';

interface ChatModalProps {
  goals?: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    progress: number;
  }>;
}

const ChatModal = ({ goals }: ChatModalProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 border-0 text-white"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="border-b p-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <SheetTitle className="text-white flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            GrytGPT Coach
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ChatInterface goals={goals} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatModal;
