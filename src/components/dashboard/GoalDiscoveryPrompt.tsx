
import { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Calendar, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import GhibliCard from '@/components/GhibliCard';
import { motion, AnimatePresence } from 'framer-motion';

interface GoalDiscoveryPromptProps {
  onCreateGoal: (goalData: any) => void;
}

const GoalDiscoveryPrompt = ({ onCreateGoal }: GoalDiscoveryPromptProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [responses, setResponses] = useState({
    daily1: '',
    daily2: '',
    shortTerm1: '',
    shortTerm2: '',
    midTerm1: '',
    midTerm2: '',
    longTerm1: '',
    longTerm2: ''
  });

  const handleResponseChange = (key: string, value: string) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmitDiscovery = () => {
    // Create goals based on responses
    const goalData = {
      title: "My Transformation Journey",
      description: "Goals discovered through deep reflection",
      category: "Personal Growth",
      target_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      responses: responses
    };
    
    onCreateGoal(goalData);
    setIsExpanded(false);
  };

  return (
    <GhibliCard className="mb-8 overflow-hidden border-2 border-red-200">
      <div 
        className="p-6 bg-gradient-to-r from-red-600 to-red-700 text-white cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6" />
            <div>
              <h3 className="text-xl font-bold">Goal Discovery Framework</h3>
              <p className="text-red-100 text-sm">
                "You can't change your life if you don't know what you're building."
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-8">
              <div className="text-center bg-red-50 p-4 rounded-lg">
                <p className="text-red-800 font-medium">
                  Sit in stillness. Then answer each of the following with radical honesty:
                </p>
              </div>

              {/* Daily Goals */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-red-900">Daily Goals (repeatable actions)</h4>
                </div>
                
                <div className="space-y-3 pl-11">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What 3 things, if done daily, would quietly shift everything over time?
                    </label>
                    <Textarea
                      value={responses.daily1}
                      onChange={(e) => handleResponseChange('daily1', e.target.value)}
                      placeholder="Be specific about daily habits that compound..."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What would "a faithful, disciplined version of me" do before checking my phone?
                    </label>
                    <Textarea
                      value={responses.daily2}
                      onChange={(e) => handleResponseChange('daily2', e.target.value)}
                      placeholder="Morning routine, spiritual practices, physical preparation..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Short-Term Goals */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-red-900">Short-Term Goals (next 4–8 weeks)</h4>
                </div>
                
                <div className="space-y-3 pl-11">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What is one physical challenge I will conquer?
                    </label>
                    <Textarea
                      value={responses.shortTerm1}
                      onChange={(e) => handleResponseChange('shortTerm1', e.target.value)}
                      placeholder="Specific fitness goal, weight target, athletic achievement..."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What self-destructive habit must I confront—and replace?
                    </label>
                    <Textarea
                      value={responses.shortTerm2}
                      onChange={(e) => handleResponseChange('shortTerm2', e.target.value)}
                      placeholder="Be honest about what needs to change and what will replace it..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Mid-Term Goals */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-red-900">Mid-Term Goals (next 3–6 months)</h4>
                </div>
                
                <div className="space-y-3 pl-11">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What identity shift do I want to become visible to my family and friends?
                    </label>
                    <Textarea
                      value={responses.midTerm1}
                      onChange={(e) => handleResponseChange('midTerm1', e.target.value)}
                      placeholder="How do you want to be seen and known differently..."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What new standard do I want to set in my household?
                    </label>
                    <Textarea
                      value={responses.midTerm2}
                      onChange={(e) => handleResponseChange('midTerm2', e.target.value)}
                      placeholder="Leadership example, family culture, household rhythm..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              {/* Long-Term Goals */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-600 p-2 rounded-full">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-red-900">Long-Term Goals (1–5 years)</h4>
                </div>
                
                <div className="space-y-3 pl-11">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Who am I becoming?
                    </label>
                    <Textarea
                      value={responses.longTerm1}
                      onChange={(e) => handleResponseChange('longTerm1', e.target.value)}
                      placeholder="The man you're growing into, your character, your calling..."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What will I be remembered for by my kids, my wife, my community?
                    </label>
                    <Textarea
                      value={responses.longTerm2}
                      onChange={(e) => handleResponseChange('longTerm2', e.target.value)}
                      placeholder="Your legacy, your impact, how you want to be remembered..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4 italic">
                  Start small. Think big. Act daily. Gryt exists to walk with you through all four levels—one rep, one prayer, one habit at a time.
                </p>
                
                <Button
                  onClick={handleSubmitDiscovery}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3"
                  size="lg"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Begin My Transformation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GhibliCard>
  );
};

export default GoalDiscoveryPrompt;
