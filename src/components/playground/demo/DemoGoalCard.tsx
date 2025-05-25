
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Target, CheckCircle, Calendar } from 'lucide-react';
import { DemoGoal } from './DemoGoalTypes';

interface DemoGoalCardProps {
  demoGoal: DemoGoal;
  tourStep?: number;
  completedSteps?: number[];
  showCelebration?: boolean;
  updateProgress: (newProgress: number) => void;
  completeTodo: (todoId: string) => void;
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
  const [newTodo, setNewTodo] = React.useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      // For demo purposes, we'll create a new todo directly
      setNewTodo('');
    }
  };

  const categoryColors = {
    'Health & Fitness': 'bg-green-100 text-green-800',
    'Career': 'bg-blue-100 text-blue-800',
    'Finance': 'bg-yellow-100 text-yellow-800',
    'Education': 'bg-purple-100 text-purple-800',
    'Personal': 'bg-pink-100 text-pink-800'
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className={categoryColors[demoGoal.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
            {demoGoal.category}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(demoGoal.targetDate).toLocaleDateString()}
          </div>
        </div>
        <CardTitle className="text-xl">{demoGoal.title}</CardTitle>
        <p className="text-sm text-gray-600">{demoGoal.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-bold">{demoGoal.progress}%</span>
          </div>
          <Progress value={demoGoal.progress} className="h-2" />
        </div>

        {/* Milestones Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Milestones</span>
            <Badge variant="outline">{demoGoal.milestones.filter(m => m.completed).length}/{demoGoal.milestones.length}</Badge>
          </div>
          <div className="space-y-1">
            {demoGoal.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={milestone.completed}
                  onCheckedChange={() => {}}
                />
                <span className={`text-sm ${milestone.completed ? 'line-through text-gray-500' : ''}`}>
                  {milestone.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateProgress(demoGoal.progress + 10)}
            className="flex-1"
          >
            +10%
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateProgress(demoGoal.progress + 25)}
            className="flex-1"
          >
            +25%
          </Button>
        </div>

        {/* Daily Todos Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Daily Tasks</span>
          </div>
          <div className="space-y-1">
            {demoGoal.todos.map((todo) => (
              <div key={todo.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={todo.isCompleted}
                  onCheckedChange={() => completeTodo(todo.id)}
                />
                <span className={`text-sm ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
          
          {/* Add Todo */}
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              placeholder="Add a task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              className="flex-1 px-2 py-1 text-sm border rounded"
            />
            <Button size="sm" onClick={handleAddTodo}>
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoGoalCard;
