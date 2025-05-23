
import { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import TodoList from '@/components/TodoList';
import { Milestone } from '@/hooks/useMilestones';

interface MilestoneCardProps {
  milestone: Milestone;
  isExpanded: boolean;
  onToggleComplete: (milestoneId: string, isCompleted: boolean) => void;
  onToggleExpand: (milestoneId: string) => void;
  onEdit: (milestoneId: string, currentTitle: string) => void;
  onSaveEdit: (milestoneId: string, newTitle: string) => void;
  onCancelEdit: () => void;
  onDelete: (milestoneId: string) => void;
  editingMilestoneId: string | null;
  editingMilestoneTitle: string;
  setEditingMilestoneTitle: (title: string) => void;
}

const MilestoneCard = ({
  milestone,
  isExpanded,
  onToggleComplete,
  onToggleExpand,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  editingMilestoneId,
  editingMilestoneTitle,
  setEditingMilestoneTitle
}: MilestoneCardProps) => {
  const isEditing = editingMilestoneId === milestone.id;

  return (
    <Card className={milestone.is_completed ? "border-green-200 bg-green-50/30 dark:bg-green-950/10" : ""}>
      <CardContent className="p-4">
        <div 
          className="flex items-start justify-between cursor-pointer" 
          onClick={() => onToggleExpand(milestone.id)}
        >
          <div className="flex items-center gap-3 flex-1">
            <div 
              className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                milestone.is_completed 
                  ? 'bg-green-500 border-green-500 flex items-center justify-center' 
                  : 'border-gray-300'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(milestone.id, milestone.is_completed);
              }}
            >
              {milestone.is_completed && <Check className="h-3 w-3 text-white" />}
            </div>
            
            {isEditing ? (
              <div className="flex-1 flex gap-2">
                <Input
                  value={editingMilestoneTitle}
                  onChange={(e) => setEditingMilestoneTitle(e.target.value)}
                  className="h-8 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancelEdit();
                    }}
                    className="h-8 px-2"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSaveEdit(milestone.id, editingMilestoneTitle);
                    }} 
                    className="h-8 px-2"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className={`flex-1 ${milestone.is_completed ? 'text-gray-600 line-through' : ''}`}>
                {milestone.title}
              </p>
            )}
          </div>
          
          {!isEditing && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(milestone.id, milestone.title);
                }}
              >
                <span className="sr-only">Edit</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(milestone.id);
                }}
              >
                <span className="sr-only">Delete</span>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Todo List for each milestone */}
        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <TodoList milestoneId={milestone.id} className="mb-0" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MilestoneCard;
