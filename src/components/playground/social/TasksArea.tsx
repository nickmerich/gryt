
import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';
import TaskCard from './TaskCard';
import { DemoTask, User, CursorPositions } from './types';

interface TasksAreaProps {
  tasks: DemoTask[];
  users: User[];
  buddyMode: boolean;
  cursors: CursorPositions;
  toggleBuddyMode: () => void;
  updateTaskProgress: (taskId: string, increment: number) => void;
  cheerTask: (taskId: string) => void;
}

const TasksArea: React.FC<TasksAreaProps> = ({ 
  tasks, 
  users,
  buddyMode, 
  cursors, 
  toggleBuddyMode,
  updateTaskProgress,
  cheerTask
}) => {
  return (
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
                <TaskCard 
                  key={task.id} 
                  task={task}
                  updateTaskProgress={updateTaskProgress}
                  cheerTask={cheerTask}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </GhibliCard>
  );
};

export default TasksArea;
