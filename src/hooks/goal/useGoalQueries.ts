
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { mapGoalRowToGoal } from "@/types/goal";

export const useGoalQueries = () => {
  const { user } = useAuth();

  const {
    data: goals,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["goals", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching goals:", error);
        throw error;
      }

      // Map database rows to frontend Goal objects
      return (data || []).map(mapGoalRowToGoal);
    },
    enabled: !!user,
  });

  return {
    goals,
    loading,
    isLoading: loading,
    error,
  };
};
