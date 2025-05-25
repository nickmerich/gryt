
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreatePostFormProps {
  onSubmit: (content: string, category: string, goalId?: string) => void;
  goals: Array<{
    id: string;
    title: string;
  }>;
}

const CreatePostForm = ({ onSubmit, goals }: CreatePostFormProps) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [goalId, setGoalId] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim(), category, goalId);
      setContent('');
      setCategory('general');
      setGoalId(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-medium mb-2">Share with your circle</h3>
      <Textarea
        placeholder="What's on your mind? Share your progress, challenges, or celebrate your wins!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] mb-3"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <div>
          <label className="text-sm text-gray-700 mb-1 block">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="progress">Progress Update</SelectItem>
              <SelectItem value="challenge">Challenge I'm Facing</SelectItem>
              <SelectItem value="celebration">Celebration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm text-gray-700 mb-1 block">Related Goal (Optional)</label>
          <Select value={goalId || "none"} onValueChange={(value) => setGoalId(value === "none" ? undefined : value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No specific goal</SelectItem>
              {goals.map((goal) => (
                <SelectItem key={goal.id} value={goal.id}>
                  {goal.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700" 
          disabled={content.trim() === ''}
        >
          Share
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
