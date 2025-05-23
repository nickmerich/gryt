
import { supabase } from '@/integrations/supabase/client';

/**
 * Initialize required application resources
 */
export const initializeApp = async (): Promise<void> => {
  try {
    // Check if the goal-images bucket exists
    const { data: buckets, error } = await supabase
      .storage
      .listBuckets();
    
    const goalImagesBucketExists = buckets?.some(bucket => bucket.name === 'goal-images');
    
    // Only create the bucket if it doesn't exist
    if (!goalImagesBucketExists) {
      console.log('Goal images bucket does not exist, creating it...');
      const { error: createError } = await supabase
        .storage
        .createBucket('goal-images', {
          public: true,
          fileSizeLimit: 10485760, // 10MB file size limit
        });
      
      if (createError) {
        console.error('Error creating goal-images bucket:', createError);
      } else {
        console.log('Created goal-images bucket successfully');
      }
    } else {
      console.log('Goal-images bucket already exists');
    }
    
    console.log('App initialization complete');
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
};

/**
 * Run initializer as soon as the module is imported
 */
initializeApp()
  .catch(error => {
    console.error('Failed to initialize app:', error);
  });
