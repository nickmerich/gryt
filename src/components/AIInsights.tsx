
import { Brain, Lightbulb, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  milestones: string[];
  completedMilestones: number;
}

interface AIInsightsProps {
  goals: Goal[];
}

const AIInsights = ({ goals }: AIInsightsProps) => {
  const generateInsights = () => {
    if (goals.length === 0) {
      return {
        tip: "Start by setting your first goal! Research shows that people who write down their goals are 42% more likely to achieve them.",
        motivation: "Every expert was once a beginner. Take the first step towards your dreams today!",
        suggestion: "Consider starting with a SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound)."
      };
    }

    const avgProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;
    const slowGoals = goals.filter(goal => goal.progress < 25);
    const categories = [...new Set(goals.map(goal => goal.category))];

    let tip = "Keep up the great work! ";
    let motivation = "You're making excellent progress on your journey!";
    let suggestion = "Consider celebrating small wins to maintain momentum.";

    if (avgProgress < 30) {
      tip = "Don't worry about slow progress - consistency beats perfection! Break your goals into smaller, daily actions.";
      motivation = "Every small step counts. You're building the foundation for lasting success!";
    } else if (avgProgress > 70) {
      tip = "You're doing amazing! Your dedication is paying off.";
      motivation = "You're in the final stretch! Keep pushing forward to achieve your goals.";
      suggestion = "Consider setting new, more challenging goals to continue growing.";
    }

    if (slowGoals.length > 0) {
      suggestion = `Focus on ${slowGoals[0].title} - try breaking it down into smaller weekly tasks.`;
    }

    if (categories.length > 3) {
      tip = "You're ambitious with goals across multiple areas! Consider focusing on 2-3 key goals to avoid burnout.";
    }

    return { tip, motivation, suggestion };
  };

  const insights = generateInsights();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{insights.tip}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Motivation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{insights.motivation}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Suggestion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{insights.suggestion}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
