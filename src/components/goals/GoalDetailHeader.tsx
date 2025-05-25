
import { useState } from 'react';
import { Edit, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Goal, useGoals } from '@/hooks/useGoals';
import EditGoalDialog from '@/components/EditGoalDialog';

interface GoalDetailHeaderProps {
  goal: Goal;
}

const GoalDetailHeader = ({ goal }: GoalDetailHeaderProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { editGoal, uploadGoalImage } = useGoals();

  const handleEditGoal = async (data: any, file?: File | null) => {
    if (file) {
      await uploadGoalImage(file, goal.id);
    }
    await editGoal.mutateAsync(data);
  };

  return (
    <>
      <div className="modern-card p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-indigo-100 text-indigo-800">
                <Tag className="w-3 h-3 mr-1" />
                {goal.category}
              </Badge>
              {goal.targetDate && (
                <Badge variant="outline" className="border-slate-300 text-slate-700">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(goal.targetDate).toLocaleDateString()}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
              {goal.title}
            </h1>
            
            {goal.description && (
              <p className="text-lg text-black leading-relaxed">
                {goal.description}
              </p>
            )}
          </div>
          
          <div className="flex-shrink-0">
            <Button 
              onClick={() => setIsEditDialogOpen(true)}
              variant="outline"
              className="border-slate-300 hover:bg-slate-50 text-black"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Goal
            </Button>
          </div>
        </div>
      </div>

      <EditGoalDialog
        goal={goal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onEditGoal={handleEditGoal}
      />
    </>
  );
};

export default GoalDetailHeader;
