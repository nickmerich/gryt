
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatBubble from './ChatBubble';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateChatResponse } from '@/lib/grytgpt';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatInterfaceProps {
  goals?: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    progress: number;
  }>;
}

const ChatInterface = ({ goals }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        content: "Hello! I'm GrytGPT, your personal goal coach. How can I help you today? I can provide motivation, break down goals, or suggest journaling prompts.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await generateChatResponse(inputValue, goals);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSuggestion = (type: string) => {
    let message = "";
    
    switch(type) {
      case 'motivation':
        message = "I need some motivation to keep going with my goals today.";
        break;
      case 'journal':
        message = "Can you give me a journaling prompt related to my goals?";
        break;
      case 'reflection':
        message = "Help me reflect on my progress so far.";
        break;
      default:
        message = "I need some advice on my goals.";
    }
    
    setInputValue(message);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.content}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="px-4 py-2 bg-gray-50">
        <div className="flex flex-wrap gap-2 mb-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs bg-white"
            onClick={() => getSuggestion('motivation')}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Motivation
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs bg-white"
            onClick={() => getSuggestion('journal')}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Journal Prompt
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs bg-white"
            onClick={() => getSuggestion('reflection')}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Reflection
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-h-[60px] resize-none border-gray-300 focus:border-blue-500"
            maxRows={4}
          />
          <Button 
            className="self-end bg-blue-600 hover:bg-blue-700 min-w-[40px]"
            onClick={handleSendMessage}
            disabled={isLoading || inputValue.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
