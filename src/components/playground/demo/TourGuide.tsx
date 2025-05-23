
import React from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';
import { TourStep } from './DemoGoalTypes';

interface TourGuideProps {
  tourStep: number;
  tourSteps: TourStep[];
  completedSteps: number[];
  resetDemo: () => void;
  setTourStep: (step: number) => void;
}

const TourGuide: React.FC<TourGuideProps> = ({ 
  tourStep, 
  tourSteps, 
  completedSteps, 
  resetDemo,
  setTourStep 
}) => {
  return (
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
  );
};

export default TourGuide;
