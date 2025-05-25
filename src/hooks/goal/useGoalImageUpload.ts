
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useGoalImageUpload = () => {
  const { user } = useAuth();

  const uploadGoalImage = async (file: File, goalId: string): Promise<string> => {
    if (!user) throw new Error("User not authenticated");

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${goalId}/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('goal-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('goal-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  return {
    uploadGoalImage,
  };
};
