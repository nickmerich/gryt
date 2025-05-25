
import { Brain, TrendingUp } from 'lucide-react';
import MoodCheckinCard from './MoodCheckinCard';
import PredictiveInsightsCard from './PredictiveInsightsCard';
import HabitStackingCard from './HabitStackingCard';
import RecoveryFlowCard from './RecoveryFlowCard';

const MotivationDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black">Motivation & Insights</h2>
          <p className="text-gray-600">AI-powered support to keep you on track</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MoodCheckinCard />
          <HabitStackingCard />
        </div>
        
        <div className="space-y-6">
          <PredictiveInsightsCard />
          <RecoveryFlowCard />
        </div>
      </div>
    </div>
  );
};

export default MotivationDashboard;
