
import { ensureStorageBucket } from './storageHelpers';

/**
 * Initialize required application resources
 */
export const initializeApp = async (): Promise<void> => {
  try {
    // Ensure required storage buckets exist
    await ensureStorageBucket('goal-images');
    
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
