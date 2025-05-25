import React, { useState } from 'react';
import { Check, Plus, Trash2, Calendar, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTodos, TodoInput } from '@/hooks/useTodos';
import { useCalendarIntegration } from '@/hooks/useCalendarIntegration';

interface TodoListProps {
  milestoneId: string;
  goalId?: string;
  className?: string;
}

const TodoList: React.FC<TodoListProps> = ({ milestoneId, goalId, className }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const {
    todos,
    isLoading,
    createTodo,
    toggleTodoCompletion,
    deleteTodo
  } = useTodos(milestoneId);

  const { syncGoal } = useCalendarIntegration();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const todoInput: TodoInput = {
      title: newTodoTitle.trim(),
      milestone_id: milestoneId,
      due_date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null
    };

    try {
      await createTodo.mutateAsync(todoInput);
      setNewTodoTitle('');
      setSelectedDate(undefined);

      // Auto-sync to calendar if todo has due date and goalId is provided
      if (selectedDate && goalId) {
        try {
          await syncGoal.mutateAsync({ goalId });
        } catch (error) {
          console.error('Failed to sync to calendar:', error);
        }
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (todoId: string, currentState: boolean) => {
    await toggleTodoCompletion.mutateAsync({
      todoId,
      isCompleted: !currentState
    });
  };

  const handleDeleteTodo = async (todoId: string) => {
    await deleteTodo.mutateAsync(todoId);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-medium">Daily To-Do's</h4>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-2">
          <Loader2 className="h-4 w-4 animate-spin text-gryt-blue" />
        </div>
      ) : (
        <div className="space-y-2">
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id} className="flex items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 flex-grow">
                  <Checkbox
                    checked={todo.is_completed}
                    onCheckedChange={() => handleToggleTodo(todo.id, todo.is_completed)}
                    className={todo.is_completed ? 'border-gryt-blue' : ''}
                  />
                  <span className={cn(
                    "text-sm",
                    todo.is_completed && "line-through text-gray-500"
                  )}>
                    {todo.title}
                  </span>
                </div>
                {todo.due_date && (
                  <span className="text-xs text-gray-500">
                    {format(new Date(todo.due_date), 'MMM dd')}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <Trash2 className="h-3 w-3 text-gray-500" />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500 py-1">No to-do items yet</div>
          )}
        </div>
      )}
      
      <form onSubmit={handleAddTodo} className="flex items-center gap-2">
        <Input
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a to-do..."
          className="h-8 text-sm"
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              title="Set due date"
            >
              <Calendar className="h-4 w-4 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Button 
          type="submit"
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          disabled={!newTodoTitle.trim() || createTodo.isPending}
        >
          {createTodo.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 text-gryt-blue" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default TodoList;
