
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface GoalPrediction {
  id: string;
  goal_id: string;
  completion_probability: number;
  predicted_completion_date?: string;
  risk_factors?: any[];
  confidence_score: number;
  calculation_date: string;
  created_at: string;
}

export interface PredictionInput {
  goal_id: string;
  completion_probability: number;
  predicted_completion_date?: string;
  risk_factors?: any[];
  confidence_score: number;
}

export const usePredictiveInsights = () => {
  const queryClient = useQueryClient();

  const getPredictions = async (): Promise<GoalPrediction[]> => {
    const { data, error } = await supabase
      .from('goal_predictions')
      .select(`
        *,
        goals(title, progress)
      `)
      .order('calculation_date', { ascending: false });

    if (error) {
      console.error("Error fetching predictions:", error);
      throw new Error(error.message);
    }

    return data || [];
  };

  const calculatePrediction = async (goalId: string): Promise<GoalPrediction> => {
    // Get goal progress data
    const { data: goal, error: goalError } = await supabase
      .from('goals')
      .select('progress, created_at, target_date')
      .eq('id', goalId)
      .single();

    if (goalError || !goal) {
      throw new Error("Goal not found");
    }

    // Get progress logs for trend analysis
    const { data: progressLogs, error: logsError } = await supabase
      .from('progress_logs')
      .select('logged_at, new_progress')
      .eq('goal_id', goalId)
      .order('logged_at', { ascending: true });

    if (logsError) {
      console.error("Error fetching progress logs:", logsError);
    }

    // Simple prediction algorithm
    const daysSinceCreation = Math.floor((Date.now() - new Date(goal.created_at).getTime()) / (1000 * 60 * 60 * 24));
    const progressRate = daysSinceCreation > 0 ? goal.progress / daysSinceCreation : 0;
    
    let completionProbability = 50; // Base probability
    const riskFactors: string[] = [];
    
    // Adjust based on progress rate
    if (progressRate > 2) {
      completionProbability += 30;
    } else if (progressRate < 0.5) {
      completionProbability -= 20;
      riskFactors.push("Slow progress rate");
    }
    
    // Adjust based on current progress
    if (goal.progress > 70) {
      completionProbability += 20;
    } else if (goal.progress < 20 && daysSinceCreation > 7) {
      completionProbability -= 15;
      riskFactors.push("Low progress after initial week");
    }
    
    // Check if there are recent progress updates
    const recentLogs = progressLogs?.filter(log => 
      Date.now() - new Date(log.logged_at).getTime() < 7 * 24 * 60 * 60 * 1000
    );
    
    if (!recentLogs?.length && daysSinceCreation > 3) {
      completionProbability -= 10;
      riskFactors.push("No recent progress updates");
    }
    
    completionProbability = Math.max(5, Math.min(95, completionProbability));
    
    // Calculate predicted completion date
    let predictedDate = null;
    if (progressRate > 0) {
      const remainingProgress = 100 - goal.progress;
      const daysToComplete = remainingProgress / progressRate;
      predictedDate = new Date(Date.now() + daysToComplete * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }
    
    const prediction: PredictionInput = {
      goal_id: goalId,
      completion_probability: completionProbability,
      predicted_completion_date: predictedDate,
      risk_factors: riskFactors,
      confidence_score: progressLogs && progressLogs.length > 3 ? 80 : 60
    };

    // Save prediction to database
    const { data, error } = await supabase
      .from('goal_predictions')
      .insert([prediction])
      .select()
      .single();

    if (error) {
      console.error("Error saving prediction:", error);
      throw new Error(error.message);
    }

    return data;
  };

  const { data: predictions, isLoading, error } = useQuery({
    queryKey: ['goal-predictions'],
    queryFn: getPredictions,
  });

  const generatePrediction = useMutation({
    mutationFn: calculatePrediction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goal-predictions'] });
      toast.success("Prediction generated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return {
    predictions,
    isLoading,
    error,
    generatePrediction
  };
};
