
import { useEffect } from 'react';
import { TrendingUp, Calendar, AlertCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { usePredictiveInsights } from '@/hooks/usePredictiveInsights';
import { useGoals } from '@/hooks/useGoals';

interface PredictiveInsightsCardProps {
  goalId?: string;
}

const PredictiveInsightsCard = ({ goalId }: PredictiveInsightsCardProps) => {
  const { predictions, generatePrediction } = usePredictiveInsights();
  const { goals } = useGoals();

  const goalPrediction = goalId 
    ? predictions?.find(p => p.goal_id === goalId)
    : predictions?.[0]; // Show most recent prediction if no specific goal

  const getCompletionColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100 text-green-800';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!goalPrediction && goals && goals.length > 0) {
    return (
      <Card className="modern-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Generate AI-powered completion predictions for your goals</p>
          <Button 
            onClick={() => goals[0] && generatePrediction.mutate(goals[0].id)}
            disabled={generatePrediction.isPending}
            className="modern-button"
          >
            {generatePrediction.isPending ? 'Analyzing...' : 'Generate Prediction'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!goalPrediction) {
    return null;
  }

  return (
    <Card className="modern-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          Goal Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getCompletionColor(goalPrediction.completion_probability)}`}>
            {goalPrediction.completion_probability}%
          </div>
          <p className="text-gray-600">Completion Probability</p>
        </div>

        <Progress 
          value={goalPrediction.completion_probability} 
          className="h-3"
        />

        <div className="flex items-center justify-between">
          <Badge className={getConfidenceColor(goalPrediction.confidence_score)}>
            {goalPrediction.confidence_score}% Confidence
          </Badge>
          {goalPrediction.predicted_completion_date && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {formatDate(goalPrediction.predicted_completion_date)}
            </div>
          )}
        </div>

        {goalPrediction.risk_factors && goalPrediction.risk_factors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Risk Factors
            </div>
            <ul className="space-y-1">
              {goalPrediction.risk_factors.map((factor, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-500 rounded-full" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}

        {goals && goals.length > 1 && (
          <Button 
            onClick={() => {
              const nextGoal = goals.find(g => g.id !== goalPrediction.goal_id);
              if (nextGoal) generatePrediction.mutate(nextGoal.id);
            }}
            variant="outline"
            size="sm"
            disabled={generatePrediction.isPending}
            className="w-full"
          >
            Analyze Another Goal
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictiveInsightsCard;
