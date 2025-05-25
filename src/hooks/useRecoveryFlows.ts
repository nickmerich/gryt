
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface RecoveryIntervention {
  id: string;
  user_id: string;
  goal_id: string;
  trigger_type: string;
  intervention_type: string;
  intervention_data?: any;
  was_accepted?: boolean;
  was_effective?: boolean;
  created_at: string;
  resolved_at?: string;
}

export interface InterventionInput {
  goal_id: string;
  trigger_type: string;
  intervention_type: string;
  intervention_data?: any;
}

export const useRecoveryFlows = () => {
  const queryClient = useQueryClient();

  const getInterventions = async (): Promise<RecoveryIntervention[]> => {
    const { data, error } = await supabase
      .from('recovery_interventions')
      .select(`
        *,
        goals(title)
      `)
      .is('resolved_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching interventions:", error);
      throw new Error(error.message);
    }

    return data || [];
  };

  const createIntervention = async (intervention: InterventionInput): Promise<void> => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      toast.error("You must be logged in");
      throw new Error("Authentication required");
    }
    
    const { error } = await supabase
      .from('recovery_interventions')
      .insert([{ 
        ...intervention,
        user_id: sessionData.session.user.id
      }]);

    if (error) {
      console.error("Error creating intervention:", error);
      toast.error("Failed to create recovery intervention");
      throw new Error(error.message);
    }
  };

  const respondToIntervention = async ({ 
    id, 
    was_accepted, 
    was_effective 
  }: { 
    id: string, 
    was_accepted: boolean, 
    was_effective?: boolean 
  }): Promise<void> => {
    const updateData: any = { 
      was_accepted,
      resolved_at: new Date().toISOString()
    };
    
    if (was_effective !== undefined) {
      updateData.was_effective = was_effective;
    }

    const { error } = await supabase
      .from('recovery_interventions')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error("Error responding to intervention:", error);
      throw new Error(error.message);
    }
  };

  const { data: interventions, isLoading, error } = useQuery({
    queryKey: ['recovery-interventions'],
    queryFn: getInterventions,
  });

  const createRecovery = useMutation({
    mutationFn: createIntervention,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recovery-interventions'] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const respondToRecovery = useMutation({
    mutationFn: respondToIntervention,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recovery-interventions'] });
      toast.success("Response recorded successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return {
    interventions,
    isLoading,
    error,
    createRecovery,
    respondToRecovery
  };
};
