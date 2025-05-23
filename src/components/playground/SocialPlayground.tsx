
import React, { useState, useEffect } from 'react';
import { Users, UserPlus, MessageCircle, Send, ThumbsUp, Clock } from 'lucide-react';
import GhibliCard from '@/components/GhibliCard';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface SocialPlaygroundProps {
  mode: 'sandbox' | 'real';
}

interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

interface Activity {
  id: string;
  type: 'message' | 'update' | 'cheer' | 'joined';
  user: User;
  content: string;
  timestamp: string;
}

interface DemoTask {
  id: string;
  title: string;
  progress: number;
  assignedTo?: User;
  cheers: number;
}

const SocialPlayground = ({ mode }: SocialPlaygroundProps) => {
  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'You', avatar: 'https://i.pravatar.cc/150?img=68', online: true },
    { id: 'u2', name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=33', online: true },
    { id: 'u3', name: 'Jamie', avatar: 'https://i.pravatar.cc/150?img=17', online: false },
    { id: 'u4', name: 'Taylor', avatar: 'https://i.pravatar.cc/150?img=20', online: true },
    { id: 'u5', name: 'Morgan', avatar: 'https://i.pravatar.cc/150?img=53', online: false },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { 
      id: 'a1', 
      type: 'joined', 
      user: users[1], // Alex
      content: 'Alex joined the circle',
      timestamp: '2 min ago'
    },
    { 
      id: 'a2', 
      type: 'message', 
      user: users[1], // Alex
      content: 'Hey everyone! Excited to work on our fitness goals together.',
      timestamp: '1 min ago'
    },
    { 
      id: 'a3', 
      type: 'update', 
      user: users[3], // Taylor
      content: 'updated "Morning Run" task to 65%',
      timestamp: 'Just now'
    },
  ]);

  const [tasks, setTasks] = useState<DemoTask[]>([
    { 
      id: 't1', 
      title: 'Morning Yoga Session', 
      progress: 30,
      assignedTo: users[0], // You
      cheers: 2
    },
    { 
      id: 't2', 
      title: 'Healthy Meal Prep', 
      progress: 0,
      cheers: 0
    },
    { 
      id: 't3', 
      title: 'Morning Run', 
      progress: 65,
      assignedTo: users[3], // Taylor
      cheers: 3
    },
    { 
      id: 't4', 
      title: 'Meditation Practice', 
      progress: 100,
      assignedTo: users[1], // Alex
      cheers: 5
    },
  ]);

  const [message, setMessage] = useState('');
  const [invitingUser, setInvitingUser] = useState(false);
  const [buddyMode, setBuddyMode] = useState(false);
  const [cursors, setCursors] = useState<{[key: string]: {x: number, y: number}}>({}); // For buddy mode

  // Simulate real-time activity
  useEffect(() => {
    const activityInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // Generate random activity
        const randomUser = users[Math.floor(Math.random() * users.length)];
        if (randomUser.id !== 'u1') { // Not "You"
          const activityTypes = ['message', 'update', 'cheer'];
          const type = activityTypes[Math.floor(Math.random() * activityTypes.length)] as 'message' | 'update' | 'cheer';
          
          let content = '';
          if (type === 'message') {
            const messages = [
              'How is everyone doing today?',
              'Just completed my morning workout!',
              'Anyone want to join me for a virtual run?',
              'Let's motivate each other this week!',
              'I'm struggling with consistency, any tips?'
            ];
            content = messages[Math.floor(Math.random() * messages.length)];
          } else if (type === 'update') {
            const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
            const newProgress = Math.min(100, randomTask.progress + (Math.floor(Math.random() * 3) + 1) * 10);
            
            content = `updated "${randomTask.title}" task to ${newProgress}%`;
            
            // Actually update the task
            setTasks(currentTasks => 
              currentTasks.map(task => 
                task.id === randomTask.id ? {...task, progress: newProgress} : task
              )
            );
          } else if (type === 'cheer') {
            const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
            content = `cheered on ${randomTask.assignedTo?.name || 'someone'}'s progress`;
            
            // Actually update the cheers
            setTasks(currentTasks => 
              currentTasks.map(task => 
                task.id === randomTask.id ? {...task, cheers: task.cheers + 1} : task
              )
            );
          }
          
          const newActivity = {
            id: `a${Date.now()}`,
            type,
            user: randomUser,
            content,
            timestamp: 'Just now'
          };
          
          setActivities(prev => [newActivity, ...prev].slice(0, 20)); // Keep only last 20 activities
        }
      }
    }, 8000);
    
    return () => clearInterval(activityInterval);
  }, [users, tasks]);

  // Simulate cursor movement in buddy mode
  useEffect(() => {
    if (buddyMode) {
      const cursorInterval = setInterval(() => {
        // Update random user cursor positions
        const updatedCursors = {...cursors};
        users.forEach(user => {
          if (user.id !== 'u1' && user.online) { // Not "You" and is online
            updatedCursors[user.id] = {
              x: Math.random() * 800,
              y: Math.random() * 500
            };
          }
        });
        setCursors(updatedCursors);
      }, 2000);
      
      return () => clearInterval(cursorInterval);
    }
  }, [buddyMode, users]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newActivity: Activity = {
      id: `a${Date.now()}`,
      type: 'message',
      user: users[0], // You
      content: message,
      timestamp: 'Just now'
    };
    
    setActivities([newActivity, ...activities]);
    setMessage('');
  };

  const updateTaskProgress = (taskId: string, increment: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newProgress = Math.min(100, task.progress + increment);
        
        // Add activity for significant progress
        if (newProgress >= 50 && task.progress < 50 || newProgress === 100) {
          const newActivity: Activity = {
            id: `a${Date.now()}`,
            type: 'update',
            user: users[0], // You
            content: `updated "${task.title}" task to ${newProgress}%`,
            timestamp: 'Just now'
          };
          setActivities([newActivity, ...activities]);
        }
        
        return {
          ...task,
          progress: newProgress,
          assignedTo: task.assignedTo || users[0] // Assign to you if unassigned
        };
      }
      return task;
    }));
  };

  const cheerTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        // Add activity
        const newActivity: Activity = {
          id: `a${Date.now()}`,
          type: 'cheer',
          user: users[0], // You
          content: `cheered on ${task.assignedTo?.name || 'someone'}'s progress`,
          timestamp: 'Just now'
        };
        setActivities([newActivity, ...activities]);
        
        return {
          ...task,
          cheers: task.cheers + 1
        };
      }
      return task;
    }));
    
    toast.success('You cheered someone on! 🎉');
  };

  const inviteFriend = () => {
    setInvitingUser(true);
    
    // Simulate invitation process
    setTimeout(() => {
      const newUser: User = {
        id: `u${users.length + 1}`,
        name: `Friend ${users.length}`,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        online: true
      };
      
      setUsers([...users, newUser]);
      
      const newActivity: Activity = {
        id: `a${Date.now()}`,
        type: 'joined',
        user: newUser,
        content: `${newUser.name} joined the circle`,
        timestamp: 'Just now'
      };
      
      setActivities([newActivity, ...activities]);
      setInvitingUser(false);
      toast.success(`${newUser.name} joined your circle!`);
    }, 2000);
  };

  const toggleBuddyMode = () => {
    setBuddyMode(!buddyMode);
    if (!buddyMode) {
      toast.info('Live Buddy Mode activated! See your friends' cursors in real-time.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Circle Members and Activity Feed */}
      <div className="space-y-6">
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Circle Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {users.map((user) => (
                  <Avatar key={user.id} className={`border-2 border-white ${user.online ? 'ring-2 ring-green-400' : ''}`}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <GhibliButton
                size="sm"
                variant="outline"
                onClick={inviteFriend}
                disabled={invitingUser}
              >
                {invitingUser ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-blue-600 rounded-full mr-2" />
                    Inviting...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Friend
                  </>
                )}
              </GhibliButton>
            </div>

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
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <GhibliButton 
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </GhibliButton>
              </div>
            </div>
          </CardContent>
        </GhibliCard>
      </div>
      
      {/* Live Progress and Tasks */}
      <div className="lg:col-span-2 space-y-6">
        <GhibliCard>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Demo Circle: Fitness Challenge</CardTitle>
              <GhibliButton 
                variant="outline" 
                size="sm"
                onClick={toggleBuddyMode}
                className={buddyMode ? "bg-blue-50 border-blue-300 text-blue-700" : ""}
              >
                {buddyMode ? "Exit Buddy Mode" : "Live Buddy Mode"}
              </GhibliButton>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Buddy Mode Cursors */}
              {buddyMode && Object.entries(cursors).map(([userId, position]) => {
                const user = users.find(u => u.id === userId);
                if (!user) return null;
                
                return (
                  <div 
                    key={userId} 
                    className="absolute pointer-events-none transition-all duration-500 ease-out"
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                  >
                    <div className="relative">
                      <div className="absolute -left-3 -top-3 transform -rotate-45">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4L20 20M20 20H10M20 20V10" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="absolute -left-1 -top-8 bg-indigo-100 rounded-md px-2 py-1 text-xs border border-indigo-200 whitespace-nowrap">
                        {user.name}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Task Progress Cards */}
              <div className="space-y-5 pt-4">
                <p className="text-sm text-gray-600">
                  This is a shared workspace where everyone can see and update tasks in real-time. Try updating a task or cheering someone on!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium">{task.title}</h3>
                        {task.assignedTo && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                            <AvatarFallback>{task.assignedTo.name.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center text-sm mb-1">
                            <span>Progress</span>
                            <span className="font-medium">{task.progress}%</span>
                          </div>
                          <Progress 
                            value={task.progress} 
                            className="h-2"
                            indicatorClassName={
                              task.progress === 100 ? "bg-green-500" : 
                              task.progress > 60 ? "bg-blue-500" : 
                              "bg-blue-400"
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center">
                            <GhibliButton 
                              variant="ghost" 
                              size="sm"
                              className="gap-1"
                              onClick={() => cheerTask(task.id)}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>{task.cheers}</span>
                            </GhibliButton>
                          </div>
                          
                          <div className="space-x-1">
                            <GhibliButton 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateTaskProgress(task.id, 10)}
                              disabled={task.progress === 100}
                            >
                              +10%
                            </GhibliButton>
                            <GhibliButton 
                              size="sm"
                              onClick={() => updateTaskProgress(task.id, 20)}
                              disabled={task.progress === 100}
                              className={task.progress === 100 ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700 text-white"}
                            >
                              +20%
                            </GhibliButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </GhibliCard>
      </div>
    </div>
  );
};

export default SocialPlayground;
