
import { useState } from 'react';
import { Calendar, Plus, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGoal: (goal: {
    title: string;
    description: string;
    category: string;
    targetDate: string;
    milestones: string[];
  }) => void;
}

const CreateGoalDialog = ({ open, onOpenChange, onCreateGoal }: CreateGoalDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    targetDate: '',
  });
  
  const [milestones, setMilestones] = useState<string[]>(['']);

  const categories = [
    'Health & Fitness',
    'Education',
    'Career',
    'Personal',
    'Finance',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.targetDate) {
      return;
    }

    const filteredMilestones = milestones.filter(m => m.trim() !== '');
    
    onCreateGoal({
      ...formData,
      milestones: filteredMilestones,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      targetDate: '',
    });
    setMilestones(['']);
  };

  const addMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const updateMilestone = (index: number, value: string) => {
    const updated = [...milestones];
    updated[index] = value;
    setMilestones(updated);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Create New Goal
          </DialogTitle>
          <DialogDescription>
            Set a meaningful goal and break it down into achievable milestones.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="e.g., Run a Marathon"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Target Date */}
          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="targetDate"
                type="date"
                className="pl-10"
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-2">
            <Label>Milestones</Label>
            <div className="space-y-2">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Milestone ${index + 1}`}
                    value={milestone}
                    onChange={(e) => updateMilestone(index, e.target.value)}
                  />
                  {milestones.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeMilestone(index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMilestone}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGoalDialog;
