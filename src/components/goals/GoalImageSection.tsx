
import { useState } from 'react';
import { Goal } from '@/integrations/supabase/goal.types';
import { Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGoals } from '@/hooks/useGoals';
import { toast } from 'sonner';

interface GoalImageSectionProps {
  goal: Goal;
}

const GoalImageSection = ({ goal }: GoalImageSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(goal.imageUrl || null);
  const { uploadGoalImage } = useGoals();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Upload image
    setIsUploading(true);
    try {
      await uploadGoalImage(file, goal.id);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload image:', error);
      // Reset preview if upload fails
      setImagePreview(goal.imageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gryt-dark/30 p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-medium mb-4">Goal Visualization</h3>
      
      {imagePreview ? (
        <div className="space-y-4">
          <div className="rounded-md overflow-hidden border">
            <img
              src={imagePreview}
              alt={goal.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                // Fallback for image loading errors
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Not+Found';
                console.error('Failed to load image:', goal.imageUrl);
              }}
            />
          </div>
          
          <div>
            <label className="block">
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Change Image
                  </>
                )}
              </Button>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-md overflow-hidden border bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-48">
            <p className="text-gray-400">No image uploaded</p>
          </div>
          
          <div>
            <label className="block">
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </>
                )}
              </Button>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalImageSection;
