
import { Brain, Lightbulb, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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

// Helper function to analyze goals and generate insights
const analyzeGoals = (goals: Goal[]) => {
  if (goals.length === 0) {
    return {
      tip: "Start by setting your first goal! Research shows that people who write down their goals are 42% more likely to achieve them.",
      motivation: "Every expert was once a beginner. Take the first step towards your dreams today!",
      suggestion: "Consider starting with a SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound).",
      actionSteps: []
    };
  }

  const avgProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;
  const slowGoals = goals.filter(goal => goal.progress < 25);
  const fastGoals = goals.filter(goal => goal.progress > 75);
  const categories = [...new Set(goals.map(goal => goal.category))];
  const mostUrgentGoal = [...goals].sort((a, b) => {
    const aDate = new Date(a.targetDate);
    const bDate = new Date(b.targetDate);
    return aDate.getTime() - bDate.getTime();
  })[0];

  let tip = "Keep up the great work! ";
  let motivation = "You're making excellent progress on your journey!";
  let suggestion = "Consider celebrating small wins to maintain momentum.";
  let actionSteps: string[] = [];

  // Generate personalized tips
  if (avgProgress < 30) {
    tip = "Don't worry about slow progress - consistency beats perfection! Break your goals into smaller, daily actions.";
    motivation = "Every small step counts. You're building the foundation for lasting success!";
  } else if (avgProgress > 70) {
    tip = "You're doing amazing! Your dedication is paying off.";
    motivation = "You're in the final stretch! Keep pushing forward to achieve your goals.";
    suggestion = "Consider setting new, more challenging goals to continue growing.";
  }

  if (slowGoals.length > 0) {
    suggestion = `Focus on '${slowGoals[0].title}' - try breaking it down into smaller weekly tasks.`;
    actionSteps.push(`Break down '${slowGoals[0].title}' into 3-5 smaller tasks you can complete this week`);
    actionSteps.push(`Schedule specific times on your calendar to work on '${slowGoals[0].title}'`);
  }

  if (categories.length > 3) {
    tip = "You're ambitious with goals across multiple areas! Consider focusing on 2-3 key goals to avoid burnout.";
    actionSteps.push("Identify your top 3 priority goals and focus primarily on those");
  }

  if (mostUrgentGoal) {
    const daysLeft = Math.ceil((new Date(mostUrgentGoal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 14 && mostUrgentGoal.progress < 50) {
      tip = `'${mostUrgentGoal.title}' is approaching its deadline with only ${daysLeft} days left and ${mostUrgentGoal.progress}% completion.`;
      suggestion = "Consider revising the timeline or breaking it into more manageable chunks.";
      actionSteps.push(`Review and potentially adjust the timeline for '${mostUrgentGoal.title}'`);
      actionSteps.push(`Focus on completing the next milestone for '${mostUrgentGoal.title}' this week`);
    }
  }

  if (fastGoals.length > 0) {
    actionSteps.push(`Plan your next goal after completing '${fastGoals[0].title}'`);
    actionSteps.push("Reflect on what strategies worked well that you can apply to other goals");
  }

  // Add general action steps if we don't have many specific ones
  if (actionSteps.length < 2) {
    actionSteps.push("Review your progress on all goals weekly");
    actionSteps.push("Share your progress with an accountability partner");
  }

  return { tip, motivation, suggestion, actionSteps };
};

const AIInsights = ({ goals }: AIInsightsProps) => {
  const [expanded, setExpanded] = useState(false);
  const insights = analyzeGoals(goals);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {insights.actionSteps.length > 0 && (
        <Collapsible
          open={expanded}
          onOpenChange={setExpanded}
          className="mt-4"
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center w-full justify-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Target className="w-4 h-4" />
              {expanded ? 'Hide Suggested Action Steps' : 'Show Suggested Action Steps'}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Target className="w-4 h-4" />
                  This Week's Action Steps
                </CardTitle>
                <CardDescription>Recommended actions to make progress on your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {insights.actionSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default AIInsights;
