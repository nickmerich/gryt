
import { Target, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface WelcomeHeaderProps {
  onOpenCreateDialog: () => void;
  subtitle?: string;
}

const WelcomeHeader = ({ onOpenCreateDialog, subtitle }: WelcomeHeaderProps) => {
  const { user } = useAuth();
  
  const userName = user?.email?.split('@')[0] || 'Champion';

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-8 mb-8">
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black leading-tight">
                  Welcome back, {userName}
                </h1>
                <p className="text-red-100 text-xl font-medium mt-2">
                  Your Purpose-Driven Growth Partner
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
                Transform overwhelm into disciplined leadership
              </h2>
              <p className="text-red-100 text-lg leading-relaxed max-w-3xl">
                Through AI coaching and real mentorship, we're rewiring your identity—one habit, one prayer, one rep at a time. 
                Join dads and professionals who refuse to settle for average.
              </p>
              {subtitle && (
                <p className="text-white font-semibold bg-red-800/30 rounded-lg px-4 py-2 inline-block">
                  💡 {subtitle}
                </p>
              )}
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Button
              onClick={onOpenCreateDialog}
              className="bg-white text-red-600 hover:bg-red-50 font-black text-lg px-8 py-4 rounded-lg shadow-lg border-2 border-white"
              size="lg"
            >
              <Target className="w-6 h-6 mr-3" />
              Start Your Transformation
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12" />
      </div>
    </div>
  );
};

export default WelcomeHeader;
