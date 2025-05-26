
import { useState } from 'react';
import { Target } from 'lucide-react';
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
    <div className="bg-white rounded-3xl border border-orange-100/50 shadow-lg p-8">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          placeholder="Add a new milestone..."
          value={newMilestoneTitle}
          onChange={(e) => setNewMilestoneTitle(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || !newMilestoneTitle.trim()}
          variant="secondary"
          size="default"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Target className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddMilestoneForm;
