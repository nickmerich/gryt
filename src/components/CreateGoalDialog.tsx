
import { useState } from 'react';
import { Calendar, Plus, Target, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GoalInput } from '@/hooks/useGoals';
import { generateMilestonesForGoal, GeneratedMilestone } from '@/utils/milestoneGenerator';
import { toast } from 'sonner';

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGoal: (goal: GoalInput) => void;
}

const CreateGoalDialog = ({ open, onOpenChange, onCreateGoal }: CreateGoalDialogProps) => {
  const [formData, setFormData] = useState<GoalInput>({
    title: '',
    description: '',
    category: '',
    target_date: '',
  });
  
  const [generatedMilestones, setGeneratedMilestones] = useState<GeneratedMilestone[]>([]);
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
    
    if (!formData.title || !formData.category || !formData.target_date) {
      return;
    }
    
    onCreateGoal(formData);

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      target_date: '',
    });
    setMilestones(['']);
    setGeneratedMilestones([]);
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

  const generateMilestones = () => {
    if (!formData.title || !formData.category) {
      toast.error("Please provide at least a title and category to generate milestones");
      return;
    }

    // Generate milestones using our utility
    const result = generateMilestonesForGoal(formData);
    setGeneratedMilestones(result.milestones);

    // Also update the milestones array with the generated milestone names
    setMilestones(result.milestones.map(m => m.name));
    
    toast.success("Generated milestones and tasks for your goal!");
  };

  const useSuggestedMilestones = () => {
    setMilestones(generatedMilestones.map(m => m.name));
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
            <Label htmlFor="target_date">Target Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="target_date"
                type="date"
                className="pl-10"
                value={formData.target_date}
                onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Generate Milestones Button */}
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={generateMilestones}
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Target className="w-4 h-4 mr-2" />
              Generate Milestones & Tasks
            </Button>
          </div>

          {/* Generated Milestones Preview */}
          {generatedMilestones.length > 0 && (
            <div className="space-y-4 border rounded-md p-4 bg-blue-50/50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-blue-700">Suggested Milestones</h3>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={useSuggestedMilestones}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Use These
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto text-sm">
                {generatedMilestones.map((milestone, i) => (
                  <div key={i} className="pb-2">
                    <p className="font-medium text-gray-800">{milestone.name}</p>
                    <ul className="list-disc pl-5 text-xs text-gray-600 mt-1">
                      {milestone.tasks.slice(0, 3).map((task, j) => (
                        <li key={j}>{task.title}</li>
                      ))}
                      {milestone.tasks.length > 3 && (
                        <li className="text-gray-500 italic">+{milestone.tasks.length - 3} more tasks</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Milestones - We'll handle these separately after goal creation */}
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
