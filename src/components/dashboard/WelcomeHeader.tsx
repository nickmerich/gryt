
import { Plus } from 'lucide-react';
import GhibliButton from '@/components/GhibliButton';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeHeaderProps {
  onOpenCreateDialog: () => void;
}

const WelcomeHeader = ({ onOpenCreateDialog }: WelcomeHeaderProps) => {
  const { user } = useAuth();

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
            className="bg-gryt-red hover:bg-gryt-red/90 text-white"
            glowColor="red"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </GhibliButton>
        </div>
      </div>

      <div className="text-center mb-8 slide-animation">
        <h1 className="ghibli-title mb-2">
          Welcome to <span className="text-gryt-red">Gryt</span>
        </h1>
        <p className="ghibli-subtitle">Your AI-powered goal achievement companion</p>
      </div>
    </>
  );
};

export default WelcomeHeader;
