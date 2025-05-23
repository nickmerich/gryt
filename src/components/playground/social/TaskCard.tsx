
import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GhibliButton from '@/components/GhibliButton';
import { DemoTask } from './types';

interface TaskCardProps {
  task: DemoTask;
  updateTaskProgress: (taskId: string, increment: number) => void;
  cheerTask: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, updateTaskProgress, cheerTask }) => {
  return (
    <div 
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
  );
};

export default TaskCard;
