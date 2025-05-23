
import React from 'react';
import DemoGoalCard from './demo/DemoGoalCard';
import TourGuide from './demo/TourGuide';
import { useDemoGoal } from './demo/useDemoGoal';

interface OnboardingSandboxProps {
  mode: 'sandbox' | 'real';
}

const OnboardingSandbox = ({ mode }: OnboardingSandboxProps) => {
  const { 
    demoGoal,
    tourStep,
    tourSteps,
    completedSteps,
    showCelebration,
    updateProgress,
    completeTodo,
    resetDemo,
    setTourStep
  } = useDemoGoal();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Demo Goal Card */}
        <div className="lg:col-span-2">
          <DemoGoalCard
            demoGoal={demoGoal}
            tourStep={tourStep}
            completedSteps={completedSteps}
            showCelebration={showCelebration}
            updateProgress={updateProgress}
            completeTodo={completeTodo}
            resetDemo={resetDemo}
          />
        </div>

        {/* Tour Guide Card */}
        <div>
          <TourGuide
            tourStep={tourStep}
            tourSteps={tourSteps}
            completedSteps={completedSteps}
            resetDemo={resetDemo}
            setTourStep={setTourStep}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingSandbox;
