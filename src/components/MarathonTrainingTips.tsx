
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, ChevronRight } from 'lucide-react';
import { Goal } from '@/hooks/useGoals';
import { cn } from '@/lib/utils';
import { generateChatResponse } from '@/lib/grytgpt';
import { toast } from 'sonner';

interface MarathonTrainingTipsProps {
  goal?: Goal;
  className?: string;
}

const MarathonTrainingTips: React.FC<MarathonTrainingTipsProps> = ({ goal, className }) => {
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [implementedTips, setImplementedTips] = useState<number[]>([]);
  
  const isMarathonGoal = goal?.category === 'Health & Fitness' && 
                          goal?.title.toLowerCase().includes('marathon');
  
  const generateTrainingTips = async () => {
    if (!goal) return;
    
    setLoading(true);
    try {
      // Construct a prompt specifically for marathon training
      const prompt = `I'm training for a marathon with the goal: "${goal.title}". 
                      I'm currently at ${goal.progress}% of today's goal. 
                      Please suggest 5 specific, actionable training tips that could help me 
                      stay on track today. Focus on recovery, nutrition, mental preparation, 
                      and effective training strategies.`;
      
      const response = await generateChatResponse(prompt, [goal]);
      
      // Parse the response into individual tips
      // Look for numbered items like "1." or "#1" or "1:" in the response
      const extractedTips = response
        .split(/(?:\r?\n){2,}/)
        .filter(paragraph => /^(?:\d+[\.\:\)]\s|\#\d+\s)/i.test(paragraph.trim()))
        .map(tip => tip.trim());
      
      // If we couldn't extract specific tips, use the whole response as one tip
      setTips(extractedTips.length >= 1 ? extractedTips : [response]);
      setCurrentTipIndex(0);
      setImplementedTips([]);
    } catch (error) {
      console.error("Error generating training tips:", error);
      toast.error("Failed to generate training tips");
    } finally {
      setLoading(false);
    }
  };

  const handleNextTip = () => {
    if (currentTipIndex < tips.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1);
    } else {
      // Loop back to the first non-implemented tip or just the first tip
      const nextNonImplementedIndex = tips.findIndex((_, index) => !implementedTips.includes(index));
      setCurrentTipIndex(nextNonImplementedIndex >= 0 ? nextNonImplementedIndex : 0);
    }
  };

  const handleImplementTip = () => {
    if (!implementedTips.includes(currentTipIndex)) {
      setImplementedTips([...implementedTips, currentTipIndex]);
      toast.success("Great job implementing this tip!");
    }
  };

  // If user hasn't generated tips yet, or if no marathon-related goal is found
  if (tips.length === 0) {
    if (!isMarathonGoal) {
      return null; // Don't render the component if it's not a marathon-related goal
    }
    
    return (
      <Card className={cn("border-dashed border-gryt-blue/30", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Marathon Training Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Get personalized training tips for your marathon goal based on your current progress.
          </p>
          <Button 
            onClick={generateTrainingTips} 
            disabled={loading || !goal}
            className="w-full bg-gryt-blue hover:bg-gryt-blue/90"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating tips...
              </>
            ) : (
              'Generate Training Tips'
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("border-gryt-blue/30", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          Marathon Training Tip {currentTipIndex + 1}/{tips.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="min-h-[100px] text-sm">
            {implementedTips.includes(currentTipIndex) ? (
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-600">{tips[currentTipIndex]}</p>
              </div>
            ) : (
              <p>{tips[currentTipIndex]}</p>
            )}
          </div>
          
          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={generateTrainingTips}
              disabled={loading}
              className="text-xs"
            >
              {loading ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3 mr-1" />
              )}
              New Tips
            </Button>
            
            <div className="space-x-2">
              {!implementedTips.includes(currentTipIndex) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImplementTip}
                  className="text-xs border-green-500 text-green-600 hover:bg-green-50"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  I Did This!
                </Button>
              )}
              
              {tips.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextTip}
                  className="text-xs"
                >
                  Next Tip
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarathonTrainingTips;
