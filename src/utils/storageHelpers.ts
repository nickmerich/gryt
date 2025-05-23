
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Check if a storage bucket exists, and create it if it doesn't
 */
export const ensureStorageBucket = async (bucketName: string): Promise<boolean> => {
  try {
    // First check if the bucket exists
    const { data: existingBuckets } = await supabase
      .storage
      .listBuckets();
    
    const bucketExists = existingBuckets?.some(bucket => bucket.name === bucketName);
    
    // If the bucket doesn't exist, create it
    if (!bucketExists) {
      const { error } = await supabase
        .storage
        .createBucket(bucketName, {
          public: true, // Make the bucket public
          fileSizeLimit: 10485760, // 10MB file size limit
        });
      
      if (error) {
        console.error(`Error creating ${bucketName} bucket:`, error);
        return false;
      }
      
      console.log(`Created storage bucket: ${bucketName}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error checking/creating storage bucket:', error);
    return false;
  }
};

/**
 * Get a public URL for an uploaded file
 */
export const getPublicUrl = (bucketName: string, filePath: string): string => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
};

/**
 * Upload a file to a storage bucket with error handling
 */
export const uploadFile = async (
  bucketName: string, 
  filePath: string, 
  file: File
): Promise<string | null> => {
  try {
    // Ensure the bucket exists first
    const bucketReady = await ensureStorageBucket(bucketName);
    if (!bucketReady) {
      toast.error(`Storage bucket ${bucketName} not available`);
      return null;
    }
    
    // Upload the file
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      throw error;
    }
    
    // Return the public URL
    return getPublicUrl(bucketName, data.path);
  } catch (error: any) {
    console.error('File upload error:', error);
    toast.error(`Upload failed: ${error.message}`);
    return null;
  }
};
