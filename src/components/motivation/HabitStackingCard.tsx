
import { useState } from 'react';
import { Link2, Clock, Plus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useHabitStacking } from '@/hooks/useHabitStacking';
import { useGoals } from '@/hooks/useGoals';

const HabitStackingCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [anchorRoutine, setAnchorRoutine] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [triggerTime, setTriggerTime] = useState('');
  const [triggerContext, setTriggerContext] = useState('after');

  const { habitStacks, createStack } = useHabitStacking();
  const { goals } = useGoals();

  const handleSubmit = () => {
    if (!anchorRoutine.trim() || !selectedGoalId) return;

    createStack.mutate({
      anchor_routine: anchorRoutine.trim(),
      new_goal_id: selectedGoalId,
      trigger_time: triggerTime || undefined,
      trigger_context: triggerContext
    });

    // Reset form
    setAnchorRoutine('');
    setSelectedGoalId('');
    setTriggerTime('');
    setTriggerContext('after');
    setShowForm(false);
  };

  const getSuccessColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-100 text-green-800';
    if (rate >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-purple-500" />
            Habit Stacking
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            size="sm"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Stack
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="mb-2 block">Existing Routine</Label>
              <Input
                value={anchorRoutine}
                onChange={(e) => setAnchorRoutine(e.target.value)}
                placeholder="e.g., Drink morning coffee, Check email, Brush teeth"
              />
            </div>

            <div>
              <Label className="mb-2 block">Goal to Stack</Label>
              <select
                value={selectedGoalId}
                onChange={(e) => setSelectedGoalId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select a goal</option>
                {goals?.map((goal) => (
                  <option key={goal.id} value={goal.id}>
                    {goal.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">When</Label>
                <select
                  value={triggerContext}
                  onChange={(e) => setTriggerContext(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="after">After</option>
                  <option value="before">Before</option>
                  <option value="during">During</option>
                </select>
              </div>
              <div>
                <Label className="mb-2 block">Time (Optional)</Label>
                <Input
                  type="time"
                  value={triggerTime}
                  onChange={(e) => setTriggerTime(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSubmit}
                disabled={!anchorRoutine.trim() || !selectedGoalId || createStack.isPending}
                className="flex-1"
              >
                {createStack.isPending ? 'Creating...' : 'Create Stack'}
              </Button>
              <Button 
                onClick={() => setShowForm(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {habitStacks && habitStacks.length > 0 ? (
          <div className="space-y-3">
            {habitStacks.map((stack) => (
              <div key={stack.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    {stack.trigger_context} "{stack.anchor_routine}"
                  </div>
                  <Badge className={getSuccessColor(stack.success_rate)}>
                    {stack.success_rate}% success
                  </Badge>
                </div>
                {stack.trigger_time && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Clock className="w-3 h-3" />
                    {stack.trigger_time}
                  </div>
                )}
                <div className="text-sm text-gray-600">
                  Goal: {goals?.find(g => g.id === stack.new_goal_id)?.title || 'Unknown Goal'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Link2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No habit stacks yet. Create one to boost your success rate!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HabitStackingCard;
