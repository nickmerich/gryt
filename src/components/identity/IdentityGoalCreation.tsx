
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, User, Target, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IdentityGoalCreationProps {
  onCreateGoal: (goalData: any) => void;
  onClose: () => void;
}

const identityArchetypes = [
  { id: 'athlete', label: 'The Athlete', description: 'Strong, disciplined, resilient', icon: '🏃‍♂️' },
  { id: 'creator', label: 'The Creator', description: 'Innovative, expressive, bold', icon: '🎨' },
  { id: 'leader', label: 'The Leader', description: 'Inspiring, decisive, empowering', icon: '👥' },
  { id: 'scholar', label: 'The Scholar', description: 'Curious, wise, growing', icon: '📚' },
  { id: 'healer', label: 'The Healer', description: 'Caring, balanced, nurturing', icon: '🌱' },
  { id: 'builder', label: 'The Builder', description: 'Ambitious, systematic, impactful', icon: '🏗️' }
];

const IdentityGoalCreation = ({ onCreateGoal, onClose }: IdentityGoalCreationProps) => {
  const [step, setStep] = useState(1);
  const [identity, setIdentity] = useState('');
  const [archetype, setArchetype] = useState('');
  const [goal, setGoal] = useState('');
  const [firstStep, setFirstStep] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState('Personal');

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleCreate = () => {
    const identityGoal = {
      title: goal,
      description: `Becoming ${identity} through ${goal}`,
      category,
      target_date: targetDate,
      identity_archetype: archetype,
      first_action: firstStep,
      identity_vision: identity
    };
    onCreateGoal(identityGoal);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gryt-blue to-gryt-purple rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who do you want to become?</h2>
                <p className="text-gray-600">Transform your identity, one step at a time</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= num ? 'bg-gryt-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 4 && <div className={`w-12 h-1 mx-2 ${step > num ? 'bg-gryt-blue' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <User className="w-16 h-16 mx-auto text-gryt-blue" />
                  <h3 className="text-xl font-semibold">Your Future Self</h3>
                  <p className="text-gray-600">Describe who you want to become. Think about the version of yourself you admire most.</p>
                </div>
                
                <Textarea
                  placeholder="I want to become someone who..."
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="min-h-[120px] text-lg"
                />
                
                <Button 
                  onClick={handleNext} 
                  disabled={!identity.trim()}
                  className="w-full bg-gradient-to-r from-gryt-blue to-gryt-purple text-white h-12"
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Choose Your Archetype</h3>
                  <p className="text-gray-600">Which identity resonates with your vision?</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {identityArchetypes.map((type) => (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        archetype === type.id ? 'ring-2 ring-gryt-blue bg-gryt-blue/5' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setArchetype(type.id)}
                    >
                      <CardContent className="p-4 text-center space-y-2">
                        <div className="text-2xl">{type.icon}</div>
                        <h4 className="font-medium">{type.label}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Button 
                  onClick={handleNext} 
                  disabled={!archetype}
                  className="w-full bg-gradient-to-r from-gryt-blue to-gryt-purple text-white h-12"
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <Target className="w-16 h-16 mx-auto text-gryt-blue" />
                  <h3 className="text-xl font-semibold">Your Transformation Goal</h3>
                  <p className="text-gray-600">What specific goal will help you become this person?</p>
                </div>
                
                <div className="space-y-4">
                  <Input
                    placeholder="e.g., Run my first marathon"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="text-lg h-12"
                  />
                  
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Career">Career</option>
                    <option value="Education">Education</option>
                    <option value="Personal">Personal</option>
                    <option value="Finance">Finance</option>
                  </select>
                  
                  <Input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <Button 
                  onClick={handleNext} 
                  disabled={!goal.trim() || !targetDate}
                  className="w-full bg-gradient-to-r from-gryt-blue to-gryt-purple text-white h-12"
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 mx-auto text-gryt-blue" />
                  <h3 className="text-xl font-semibold">Your First Step</h3>
                  <p className="text-gray-600">What's one small action you can take today to start becoming this person?</p>
                </div>
                
                <Input
                  placeholder="e.g., Put on running shoes and walk for 10 minutes"
                  value={firstStep}
                  onChange={(e) => setFirstStep(e.target.value)}
                  className="text-lg h-12"
                />
                
                <div className="bg-gradient-to-r from-gryt-blue/10 to-gryt-purple/10 p-6 rounded-2xl">
                  <h4 className="font-semibold mb-2">Your Identity Transformation</h4>
                  <p className="text-sm text-gray-700">
                    "I am becoming {identity} by {goal}. My first step is: {firstStep}"
                  </p>
                </div>
                
                <Button 
                  onClick={handleCreate} 
                  disabled={!firstStep.trim()}
                  className="w-full bg-gradient-to-r from-gryt-blue to-gryt-purple text-white h-12"
                >
                  Start My Transformation ✨
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default IdentityGoalCreation;
