
import React, { useState } from 'react';
import { MessageCircle, Clock, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import GhibliButton from '@/components/GhibliButton';
import { Activity } from './types';

interface ActivityFeedProps {
  activities: Activity[];
  sendMessage: (message: string) => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t pt-4 space-y-3">
      <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <MessageCircle className="w-4 h-4" />
        Activity Feed
      </h3>
      
      <div className="h-72 overflow-y-auto space-y-3 pr-2">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-2 items-start animate-fade-in">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{activity.user.name}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.timestamp}
                </div>
              </div>
              
              <div className={`text-sm mt-1 ${
                activity.type === 'message' ? 'bg-blue-50 p-2 rounded-lg' : 
                activity.type === 'update' ? 'text-green-600' :
                activity.type === 'cheer' ? 'text-yellow-600' : 
                'text-blue-600'
              }`}>
                {activity.type === 'message' ? (
                  activity.content
                ) : activity.type === 'joined' ? (
                  <span className="font-medium">{activity.content}</span>
                ) : (
                  <span>
                    <span className="font-medium">{activity.user.name}</span> {activity.content}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 flex gap-2">
        <Input 
          placeholder="Type a message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1"
        />
        <GhibliButton 
          onClick={handleSendMessage}
          disabled={!message.trim()}
          size="icon"
        >
          <Send className="w-4 h-4" />
        </GhibliButton>
      </div>
    </div>
  );
};

export default ActivityFeed;
