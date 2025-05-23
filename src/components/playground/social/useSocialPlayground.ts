
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, Activity, DemoTask, CursorPositions } from './types';

export const useSocialPlayground = () => {
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

  const [invitingUser, setInvitingUser] = useState(false);
  const [buddyMode, setBuddyMode] = useState(false);
  const [cursors, setCursors] = useState<CursorPositions>({});

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
              'Let\'s motivate each other this week!',
              'I\'m struggling with consistency, any tips?'
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
  }, [buddyMode, users, cursors]);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const newActivity: Activity = {
      id: `a${Date.now()}`,
      type: 'message',
      user: users[0], // You
      content: message,
      timestamp: 'Just now'
    };
    
    setActivities([newActivity, ...activities]);
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
      toast.info('Live Buddy Mode activated! See your friends\' cursors in real-time.');
    }
  };

  return {
    users,
    activities,
    tasks,
    invitingUser,
    buddyMode,
    cursors,
    sendMessage,
    updateTaskProgress,
    cheerTask,
    inviteFriend,
    toggleBuddyMode
  };
};
