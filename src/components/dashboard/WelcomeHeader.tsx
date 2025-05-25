
import { Plus, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface WelcomeHeaderProps {
  onOpenCreateDialog: () => void;
  subtitle?: string;
}

const WelcomeHeader = ({ onOpenCreateDialog, subtitle }: WelcomeHeaderProps) => {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  const userName = user?.email?.split('@')[0] || 'there';
  const greeting = getGreeting();
  const motivationalMessage = 'Ready to make progress on your goals today?';

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <Sparkles className="w-8 h-8 text-gryt-blue" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-gryt-dark">
              {greeting}, {userName}!
            </h1>
            {subtitle && (
              <p className="text-gryt-blue font-medium mt-1">{subtitle}</p>
            )}
            <p className="text-gray-600">
              {motivationalMessage}
            </p>
          </div>
        </div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onOpenCreateDialog}
          className="bg-gradient-to-r from-gryt-blue to-gryt-purple hover:from-gryt-blue/90 hover:to-gryt-purple/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Transform Your Identity
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomeHeader;
