
import { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Goal, useGoals } from '@/hooks/useGoals';
import { toast } from 'sonner';

interface GoalImageSectionProps {
  goal: Goal;
}

const GoalImageSection = ({ goal }: GoalImageSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { uploadGoalImage } = useGoals();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    setIsUploading(true);
    try {
      await uploadGoalImage(file, goal.id);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modern-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-black">Goal Image</h2>
      </div>

      <div className="space-y-6">
        {goal.imageUrl ? (
          <div className="relative group">
            <img
              src={goal.imageUrl}
              alt={goal.title}
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
              <label className="cursor-pointer">
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-black">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-slate-400 transition-colors">
            <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">Add a goal image</h3>
            <p className="text-slate-600 mb-6">
              Upload an inspiring image to visualize your goal
            </p>
            <label className="cursor-pointer">
              <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-black">
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
        )}

        <div className="text-sm text-slate-600">
          <p>• Maximum file size: 5MB</p>
          <p>• Supported formats: JPG, PNG, GIF</p>
          <p>• Recommended dimensions: 16:9 aspect ratio</p>
        </div>
      </div>
    </div>
  );
};

export default GoalImageSection;
