
import React from 'react';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';
import { Badge } from '@/components/ui/badge';
import { DemoGoal } from './DemoGoalTypes';

interface DemoGoalCardProps {
  demoGoal: DemoGoal;
  tourStep: number;
  completedSteps: number[];
  showCelebration: boolean;
  updateProgress: () => void;
  completeTodo: (id: string) => void;
  resetDemo: () => void;
}

const DemoGoalCard: React.FC<DemoGoalCardProps> = ({ 
  demoGoal, 
  tourStep, 
  completedSteps, 
  showCelebration, 
  updateProgress, 
  completeTodo, 
  resetDemo 
}) => {
  return (
    <GhibliCard glow={showCelebration} illustrationOpacity={0.04} illustration="mountains">
      <CardHeader className="pb-2 relative">
        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce text-6xl">🎉</div>
          </div>
        )}
        <Badge className="bg-green-100 text-green-800 mb-2">{demoGoal.category}</Badge>
        <CardTitle>{demoGoal.title}</CardTitle>
        <p className="text-gray-600 mt-1">{demoGoal.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-semibold text-gryt-blue">{demoGoal.progress}%</span>
          </div>
          <Progress value={demoGoal.progress} className="h-2" 
            indicatorClassName="bg-gradient-to-r from-gryt-red to-gryt-blue" />
        </div>

        {/* Milestones */}
        <div>
          <h3 className="font-semibold mb-3">Milestones</h3>
          <div className="space-y-2">
            {demoGoal.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${milestone.isCompleted ? 'bg-gryt-blue' : 'bg-gray-300'}`} />
                <span className={milestone.isCompleted ? 'text-gryt-blue line-through' : ''}>
                  {milestone.title}
                </span>
                {milestone.isCompleted && (
                  <CheckCircle className="w-4 h-4 text-gryt-blue ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Daily Tasks */}
        <div>
          <h3 className="font-semibold mb-3">Daily Tasks</h3>
          <div className="space-y-2">
            {demoGoal.todos.map((todo) => (
              <div 
                key={todo.id} 
                className={`flex items-center gap-2 p-2 rounded-md ${tourStep === 3 && !completedSteps.includes(3) ? 'bg-blue-50 border border-blue-200 pulse-animation' : ''}`}
                onClick={() => tourStep === 3 && completeTodo(todo.id)}
              >
                <div className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center ${todo.isCompleted ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                  {todo.isCompleted && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className={todo.isCompleted ? 'line-through text-gray-500' : ''}>
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          {tourStep === 1 && (
            <GhibliButton 
              onClick={updateProgress}
              className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white pulse-animation"
              glowColor="blue"
            >
              Update Progress (+20%)
            </GhibliButton>
          )}
          {tourStep === 2 && (
            <GhibliButton 
              onClick={updateProgress}
              className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white pulse-animation"
              glowColor="blue"
            >
              Complete First Milestone
            </GhibliButton>
          )}
          {tourStep === 4 && (
            <GhibliButton 
              onClick={resetDemo}
              className="w-full bg-gryt-red hover:bg-gryt-red/90 text-white"
              glowColor="red"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Demo
            </GhibliButton>
          )}
        </div>
      </CardContent>
    </GhibliCard>
  );
};

export default DemoGoalCard;
