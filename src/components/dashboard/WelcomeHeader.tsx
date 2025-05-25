
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeHeaderProps {
  onOpenCreateDialog: () => void;
}

const WelcomeHeader = ({ onOpenCreateDialog }: WelcomeHeaderProps) => {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const userName = user?.email?.split('@')[0] || 'there';

  return (
    <div className="modern-card p-8 mb-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-black mb-2">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Ready to make progress on your goals today?
            </p>
          </div>
        </div>
        <Button 
          onClick={onOpenCreateDialog}
          size="lg"
          className="modern-button"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Goal
        </Button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
