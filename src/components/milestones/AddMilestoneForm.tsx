
import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddMilestoneFormProps {
  isSubmitting: boolean;
  onSubmit: (title: string) => void;
}

const AddMilestoneForm = ({ isSubmitting, onSubmit }: AddMilestoneFormProps) => {
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    
    onSubmit(newMilestoneTitle.trim());
    setNewMilestoneTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Add a new milestone..."
        value={newMilestoneTitle}
        onChange={(e) => setNewMilestoneTitle(e.target.value)}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={isSubmitting || !newMilestoneTitle.trim()}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default AddMilestoneForm;
