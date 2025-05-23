
import React, { useState } from 'react';
import { Goal } from '@/hooks/useGoals';
import { CheckCircle, ArrowRight, RotateCcw, Party } from 'lucide-react';
import GhibliCard from '@/components/GhibliCard';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import GhibliButton from '@/components/GhibliButton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface OnboardingSandboxProps {
  mode: 'sandbox' | 'real';
}

const OnboardingSandbox = ({ mode }: OnboardingSandboxProps) => {
  const [demoGoal, setDemoGoal] = useState<Goal>({
    id: 'demo-goal',
    title: 'Run 5K in 30 Days',
    description: 'Train consistently to build up to running a 5K (3.1 miles) in just one month!',
    category: 'Health & Fitness',
    progress: 0,
    createdAt: new Date().toISOString(),
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    userId: 'demo-user',
    milestones: [
      { id: '1', title: 'Complete first 1K run', isCompleted: false },
      { id: '2', title: 'Run 2K without stopping', isCompleted: false },
      { id: '3', title: 'Achieve 3K distance', isCompleted: false },
      { id: '4', title: 'Run 4K comfortably', isCompleted: false },
      { id: '5', title: 'Complete full 5K', isCompleted: false },
    ],
    todos: [
      { id: '1', title: 'Buy proper running shoes', isCompleted: false },
      { id: '2', title: '10-minute warm-up routine', isCompleted: false },
      { id: '3', title: '5-minute cooldown stretch', isCompleted: false },
      { id: '4', title: 'Track water intake', isCompleted: false },
      { id: '5', title: 'Plan running routes', isCompleted: false },
    ]
  });

  const [tourStep, setTourStep] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const tourSteps = [
    { title: "Welcome to your Demo Goal", description: "This is a pre-loaded 5K training goal with milestones and tasks already set up for you." },
    { title: "Update Your Progress", description: "Click the button below to update your progress and see what happens!" },
    { title: "Complete a Milestone", description: "Let's mark your first milestone as completed." },
    { title: "Check Off a Task", description: "Complete one of your daily tasks to stay on track." },
    { title: "Reset or Continue", description: "You can reset the demo or continue exploring other features." }
  ];

  const updateProgress = () => {
    const newProgress = Math.min(demoGoal.progress + 20, 100);
    setDemoGoal({...demoGoal, progress: newProgress});
    
    if (newProgress >= 20 && !demoGoal.milestones[0].isCompleted) {
      const updatedMilestones = [...demoGoal.milestones];
      updatedMilestones[0] = {...updatedMilestones[0], isCompleted: true};
      setDemoGoal({...demoGoal, milestones: updatedMilestones, progress: newProgress});
      setShowCelebration(true);
      toast.success("🎉 You've completed your first milestone!");
      
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
    
    setCompletedSteps([...completedSteps, tourStep]);
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    }
  };

  const completeTodo = (id: string) => {
    const updatedTodos = demoGoal.todos.map(todo => 
      todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
    );
    setDemoGoal({...demoGoal, todos: updatedTodos});
    
    toast.success("Task completed! Great job staying on track.");
    setCompletedSteps([...completedSteps, tourStep]);
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    }
  };

  const resetDemo = () => {
    setDemoGoal({
      ...demoGoal,
      progress: 0,
      milestones: demoGoal.milestones.map(m => ({...m, isCompleted: false})),
      todos: demoGoal.todos.map(t => ({...t, isCompleted: false}))
    });
    setTourStep(0);
    setCompletedSteps([]);
    setShowCelebration(false);
    toast.info("Demo reset! Start fresh and try again.");
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Demo Goal Card */}
        <div className="lg:col-span-2">
          <GhibliCard glow={showCelebration} illustrationOpacity={0.04} illustration="mountains">
            <CardHeader className="pb-2 relative">
              {showCelebration && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-bounce text-6xl">🎉</div>
                </div>
              )}
              <Badge className="bg-green-100 text-green-800 mb-2">{demoGoal.category}</Badge>
              <CardTitle>{demoGoal.title}</CardTitle>
              <p className="text-gray-600 mt-1">{demoGoal.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-semibold text-gryt-blue">{demoGoal.progress}%</span>
                </div>
                <Progress value={demoGoal.progress} className="h-2" 
                  indicatorClassName="bg-gradient-to-r from-gryt-red to-gryt-blue" />
              </div>

              {/* Milestones */}
              <div>
                <h3 className="font-semibold mb-3">Milestones</h3>
                <div className="space-y-2">
                  {demoGoal.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${milestone.isCompleted ? 'bg-gryt-blue' : 'bg-gray-300'}`} />
                      <span className={milestone.isCompleted ? 'text-gryt-blue line-through' : ''}>
                        {milestone.title}
                      </span>
                      {milestone.isCompleted && (
                        <CheckCircle className="w-4 h-4 text-gryt-blue ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Tasks */}
              <div>
                <h3 className="font-semibold mb-3">Daily Tasks</h3>
                <div className="space-y-2">
                  {demoGoal.todos.map((todo) => (
                    <div 
                      key={todo.id} 
                      className={`flex items-center gap-2 p-2 rounded-md ${tourStep === 3 && !completedSteps.includes(3) ? 'bg-blue-50 border border-blue-200 pulse-animation' : ''}`}
                      onClick={() => tourStep === 3 && completeTodo(todo.id)}
                    >
                      <div className={`w-4 h-4 rounded border cursor-pointer flex items-center justify-center ${todo.isCompleted ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                        {todo.isCompleted && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className={todo.isCompleted ? 'line-through text-gray-500' : ''}>
                        {todo.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                {tourStep === 1 && (
                  <GhibliButton 
                    onClick={updateProgress}
                    className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white pulse-animation"
                    glowColor="blue"
                  >
                    Update Progress (+20%)
                  </GhibliButton>
                )}
                {tourStep === 2 && (
                  <GhibliButton 
                    onClick={updateProgress}
                    className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white pulse-animation"
                    glowColor="blue"
                  >
                    Complete First Milestone
                  </GhibliButton>
                )}
                {tourStep === 4 && (
                  <GhibliButton 
                    onClick={resetDemo}
                    className="w-full bg-gryt-red hover:bg-gryt-red/90 text-white"
                    glowColor="red"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Demo
                  </GhibliButton>
                )}
              </div>
            </CardContent>
          </GhibliCard>
        </div>

        {/* Tour Guide Card */}
        <div>
          <GhibliCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Interactive Tour Guide</CardTitle>
              <p className="text-sm text-gray-600">Step {tourStep + 1} of {tourSteps.length}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress 
                value={(tourStep / (tourSteps.length - 1)) * 100} 
                className="h-1" 
                indicatorClassName="bg-gryt-blue" 
              />
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-medium text-blue-800">{tourSteps[tourStep].title}</h3>
                <p className="text-sm mt-2 text-blue-700">{tourSteps[tourStep].description}</p>
              </div>

              <div className="space-y-2">
                {tourSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs 
                      ${idx === tourStep ? 'bg-blue-500 text-white' : 
                        completedSteps.includes(idx) ? 'bg-green-100 text-green-800 border border-green-200' : 
                        'bg-gray-100 text-gray-500'}`}>
                      {completedSteps.includes(idx) ? '✓' : idx + 1}
                    </div>
                    <span className={`text-sm ${idx === tourStep ? 'font-medium' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <GhibliButton
                  variant="outline"
                  size="sm"
                  disabled={tourStep === 0}
                  onClick={() => setTourStep(Math.max(0, tourStep - 1))}
                >
                  Previous
                </GhibliButton>
                <GhibliButton
                  variant="outline"
                  size="sm"
                  disabled={tourStep === tourSteps.length - 1}
                  onClick={() => setTourStep(Math.min(tourSteps.length - 1, tourStep + 1))}
                >
                  Skip <ArrowRight className="w-4 h-4 ml-1" />
                </GhibliButton>
              </div>

              <div className="text-center pt-4">
                <GhibliButton
                  variant="ghost"
                  size="sm"
                  onClick={resetDemo}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RotateCcw className="w-4 h-4 mr-1" /> Start Over
                </GhibliButton>
              </div>
            </CardContent>
          </GhibliCard>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSandbox;
