
import { supabase } from '@/integrations/supabase/client';

/**
 * Initialize required application resources
 */
export const initializeApp = async (): Promise<void> => {
  try {
    // Check if we can access storage buckets (this will help us understand permissions)
    const { data: buckets, error: listError } = await supabase
      .storage
      .listBuckets();
    
    if (listError) {
      console.log('Storage access limited or not available:', listError.message);
      console.log('App initialization complete (storage not available)');
      return;
    }
    
    const goalImagesBucketExists = buckets?.some(bucket => bucket.name === 'goal-images');
    
    if (!goalImagesBucketExists) {
      console.log('Goal images bucket does not exist, but we will not attempt to create it due to RLS policies');
      console.log('Please create the goal-images bucket manually in the Supabase dashboard if needed');
    } else {
      console.log('Goal-images bucket already exists');
    }
    
    console.log('App initialization complete');
  } catch (error) {
    console.log('App initialization completed with limited storage access:', error);
    // Don't throw the error - just log it and continue
  }
};

/**
 * Run initializer as soon as the module is imported
 */
initializeApp()
  .catch(error => {
    console.log('App initialization completed with some limitations:', error);
  });
