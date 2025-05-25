
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface MoodCheckin {
  id: string;
  user_id: string;
  goal_id?: string;
  mood_score: number;
  energy_level: number;
  stress_level: number;
  notes?: string;
  checkin_date: string;
  created_at: string;
  updated_at: string;
}

export interface MoodCheckinInput {
  goal_id?: string;
  mood_score: number;
  energy_level: number;
  stress_level: number;
  notes?: string;
}

export const useMoodCheckins = () => {
  const queryClient = useQueryClient();

  const getMoodCheckins = async (): Promise<MoodCheckin[]> => {
    const { data, error } = await supabase
      .from('mood_checkins')
      .select('*')
      .order('checkin_date', { ascending: false });

    if (error) {
      console.error("Error fetching mood check-ins:", error);
      throw new Error(error.message);
    }

    return data || [];
  };

  const createMoodCheckin = async (checkin: MoodCheckinInput): Promise<void> => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      toast.error("You must be logged in to record a mood check-in");
      throw new Error("Authentication required");
    }
    
    const { error } = await supabase
      .from('mood_checkins')
      .insert([{ 
        ...checkin,
        user_id: sessionData.session.user.id
      }]);

    if (error) {
      console.error("Error creating mood check-in:", error);
      toast.error("Failed to record mood check-in");
      throw new Error(error.message);
    }
  };

  const { data: moodCheckins, isLoading, error } = useQuery({
    queryKey: ['mood-checkins'],
    queryFn: getMoodCheckins,
  });

  const createCheckin = useMutation({
    mutationFn: createMoodCheckin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mood-checkins'] });
      toast.success("Mood check-in recorded successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return {
    moodCheckins,
    isLoading,
    error,
    createCheckin
  };
};
