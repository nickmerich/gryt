
import React from 'react';
import CircleMembers from './social/CircleMembers';
import ActivityFeed from './social/ActivityFeed';
import TasksArea from './social/TasksArea';
import { useSocialPlayground } from './social/useSocialPlayground';
import { SocialPlaygroundProps } from './social/types';

const SocialPlayground = ({ mode }: SocialPlaygroundProps) => {
  const {
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
  } = useSocialPlayground();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Circle Members and Activity Feed */}
      <div className="space-y-6">
        <CircleMembers 
          users={users} 
          invitingUser={invitingUser} 
          inviteFriend={inviteFriend} 
        />
        
        <div className="border-t pt-4">
          <ActivityFeed 
            activities={activities} 
            sendMessage={sendMessage} 
          />
        </div>
      </div>
      
      {/* Live Progress and Tasks */}
      <div className="lg:col-span-2 space-y-6">
        <TasksArea
          tasks={tasks}
          users={users}
          buddyMode={buddyMode}
          cursors={cursors}
          toggleBuddyMode={toggleBuddyMode}
          updateTaskProgress={updateTaskProgress}
          cheerTask={cheerTask}
        />
      </div>
    </div>
  );
};

export default SocialPlayground;
