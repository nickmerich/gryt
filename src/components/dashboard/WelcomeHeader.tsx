
import { Plus } from 'lucide-react';
import GhibliButton from '@/components/GhibliButton';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeHeaderProps {
  onOpenCreateDialog: () => void;
}

const WelcomeHeader = ({ onOpenCreateDialog }: WelcomeHeaderProps) => {
  const { user } = useAuth();
  
  // Get the time of day to display an appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const userName = user?.email?.split('@')[0] || 'there';

  return (
    <div className="flex items-center justify-between mb-8 bg-gryt-light rounded-lg p-6">
      <div className="text-left">
        <h1 className="text-2xl font-bold text-gryt-blue mb-2">
          Welcome to Gryt — Your Personalized Goal Achieving Platform
        </h1>
        <p className="text-gray-600">
          {getGreeting()}, {userName}. Let's build momentum today.
        </p>
      </div>
      <div>
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
  );
};

export default WelcomeHeader;
