
import { Plus } from 'lucide-react';
import GhibliButton from '@/components/GhibliButton';
import { useAuth } from '@/contexts/AuthContext';
import GhibliIllustration from '@/components/GhibliIllustration';

interface WelcomeHeaderProps {
  onOpenCreateDialog: () => void;
}

const WelcomeHeader = ({ onOpenCreateDialog }: WelcomeHeaderProps) => {
  const { user } = useAuth();
  
  // Get the time of day to display an appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  const userName = user?.email?.split('@')[0] || 'there';

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {user && (
            <div className="text-sm text-gray-600 mr-2">
              {user.email}
            </div>
          )}
          <GhibliButton 
            onClick={onOpenCreateDialog}
            className="bg-gryt-blue hover:bg-gryt-blue/90 text-white"
            glowColor="blue"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </GhibliButton>
        </div>
      </div>

      <div className="bg-gryt-light rounded-lg p-6 mb-8 slide-animation flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-gryt-blue mb-1">
            {getGreeting()} {userName}!
          </h1>
          <p className="text-gray-600 italic">
            "Journey together, achieve together."
          </p>
        </div>
        <div className="hidden md:block w-1/3">
          <GhibliIllustration 
            type="sunset" 
            className="h-32 w-full rounded-lg opacity-80"
            animate={true}
          />
        </div>
      </div>
    </>
  );
};

export default WelcomeHeader;
