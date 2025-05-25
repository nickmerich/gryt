
import { useState } from 'react';
import { Heart, Zap, AlertTriangle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useMoodCheckins } from '@/hooks/useMoodCheckins';
import { useGoals } from '@/hooks/useGoals';

const MoodCheckinCard = () => {
  const [moodScore, setMoodScore] = useState([7]);
  const [energyLevel, setEnergyLevel] = useState([7]);
  const [stressLevel, setStressLevel] = useState([3]);
  const [notes, setNotes] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  const { createCheckin } = useMoodCheckins();
  const { goals } = useGoals();

  const handleSubmit = () => {
    createCheckin.mutate({
      mood_score: moodScore[0],
      energy_level: energyLevel[0],
      stress_level: stressLevel[0],
      notes: notes.trim() || undefined,
      goal_id: selectedGoalId || undefined
    });

    // Reset form
    setMoodScore([7]);
    setEnergyLevel([7]);
    setStressLevel([3]);
    setNotes('');
    setSelectedGoalId('');
  };

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          Daily Check-in
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4" />
            Mood (1-10)
          </Label>
          <Slider
            value={moodScore}
            onValueChange={setMoodScore}
            max={10}
            min={1}
            step={1}
            className="mb-2"
          />
          <div className="text-sm text-gray-600 text-center">
            Current: {moodScore[0]}/10
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4" />
            Energy Level (1-10)
          </Label>
          <Slider
            value={energyLevel}
            onValueChange={setEnergyLevel}
            max={10}
            min={1}
            step={1}
            className="mb-2"
          />
          <div className="text-sm text-gray-600 text-center">
            Current: {energyLevel[0]}/10
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4" />
            Stress Level (1-10)
          </Label>
          <Slider
            value={stressLevel}
            onValueChange={setStressLevel}
            max={10}
            min={1}
            step={1}
            className="mb-2"
          />
          <div className="text-sm text-gray-600 text-center">
            Current: {stressLevel[0]}/10
          </div>
        </div>

        {goals && goals.length > 0 && (
          <div>
            <Label className="mb-3 block">Link to Goal (Optional)</Label>
            <select
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">No specific goal</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <Label className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4" />
            Notes (Optional)
          </Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling today? Any insights about your goals?"
            className="min-h-[80px]"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={createCheckin.isPending}
          className="w-full modern-button"
        >
          {createCheckin.isPending ? 'Recording...' : 'Record Check-in'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodCheckinCard;
