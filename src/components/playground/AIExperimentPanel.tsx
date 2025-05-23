
import React, { useState } from 'react';
import { Sparkles, Send, Lightbulb, ArrowRight, Move } from 'lucide-react';
import GhibliCard from '@/components/GhibliCard';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GhibliButton from '@/components/GhibliButton';
import { toast } from 'sonner';

interface AIExperimentPanelProps {
  mode: 'sandbox' | 'real';
}

interface AISuggestion {
  id: string;
  type: 'milestone' | 'task' | 'insight';
  content: string;
  isApplied: boolean;
}

const AIExperimentPanel = ({ mode }: AIExperimentPanelProps) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [activeGoal, setActiveGoal] = useState({
    title: 'Learn Spanish in 3 Months',
    category: 'Education',
    milestones: [
      'Master basic greetings and introductions',
      'Build vocabulary of 500 common words',
      'Hold a 5-minute conversation',
      'Understand Spanish TV shows with subtitles',
      'Pass A1 level Spanish test'
    ],
    tasks: [
      'Practice 20 minutes daily with language app',
      'Learn 10 new words each day',
      'Watch Spanish YouTube video (10 min)',
      'Review grammar rules',
      'Find language exchange partner'
    ]
  });

  const generateSuggestions = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }

    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      // Generate different suggestions based on prompt keywords
      let newSuggestions: AISuggestion[] = [];

      if (prompt.toLowerCase().includes('train') || prompt.toLowerCase().includes('day')) {
        newSuggestions = [
          { 
            id: 'sug1', 
            type: 'milestone', 
            content: 'Adjust milestone: Complete 20 minutes of Spanish practice 4 days per week', 
            isApplied: false 
          },
          { 
            id: 'sug2', 
            type: 'task', 
            content: 'New task: Schedule specific days (Mon, Wed, Fri, Sun) for intensive practice', 
            isApplied: false 
          },
          { 
            id: 'sug3', 
            type: 'insight', 
            content: 'Consistency is more important than duration. Four focused sessions per week will be more effective than irregular practice.', 
            isApplied: false 
          }
        ];
      } else if (prompt.toLowerCase().includes('recovery') || prompt.toLowerCase().includes('ritual')) {
        newSuggestions = [
          { 
            id: 'sug4', 
            type: 'milestone', 
            content: 'New milestone: Develop a language learning ritual that supports long-term memory', 
            isApplied: false 
          },
          { 
            id: 'sug5', 
            type: 'task', 
            content: 'New task: Create a 5-minute review ritual before bedtime to reinforce daily learning', 
            isApplied: false 
          },
          { 
            id: 'sug6', 
            type: 'task', 
            content: 'New task: Implement spaced repetition system for vocabulary retention', 
            isApplied: false 
          }
        ];
      } else {
        // Default suggestions
        newSuggestions = [
          { 
            id: 'sug7', 
            type: 'milestone', 
            content: 'New milestone: Join a Spanish language meetup group and participate in a conversation', 
            isApplied: false 
          },
          { 
            id: 'sug8', 
            type: 'task', 
            content: 'New task: Listen to Spanish podcast during daily commute', 
            isApplied: false 
          },
          { 
            id: 'sug9', 
            type: 'insight', 
            content: 'Consider immersion techniques by labeling household items with Spanish vocabulary', 
            isApplied: false 
          }
        ];
      }
      
      setSuggestions(newSuggestions);
      setIsLoading(false);
    }, 1500);
  };

  const applySuggestion = (id: string) => {
    // Find the suggestion
    const suggestion = suggestions.find(s => s.id === id);
    if (!suggestion) return;

    // Mark as applied
    const updatedSuggestions = suggestions.map(s => 
      s.id === id ? {...s, isApplied: true} : s
    );
    setSuggestions(updatedSuggestions);

    // Update the active goal based on suggestion type
    if (suggestion.type === 'milestone') {
      const content = suggestion.content.replace('New milestone: ', '').replace('Adjust milestone: ', '');
      setActiveGoal({
        ...activeGoal,
        milestones: [...activeGoal.milestones, content]
      });
      toast.success('Milestone added to your goal!');
    } else if (suggestion.type === 'task') {
      const content = suggestion.content.replace('New task: ', '');
      setActiveGoal({
        ...activeGoal,
        tasks: [...activeGoal.tasks, content]
      });
      toast.success('Task added to your goal!');
    } else {
      // For insights, just show a toast
      toast.info('Insight noted!');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* AI Prompt and Suggestions */}
      <div className="space-y-6">
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              AI "What If..." Experiments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Ask the AI to help you explore different approaches to your goals. Type a "What if..." question below.
            </p>
            
            <div className="flex gap-2">
              <Input 
                placeholder="What if I train 4 days/week? What if I add a recovery ritual?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1"
              />
              
              <GhibliButton 
                onClick={generateSuggestions}
                disabled={isLoading || !prompt.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full" />
                    Generating...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Ask AI
                  </>
                )}
              </GhibliButton>
            </div>
            
            {/* AI Suggestions */}
            <div className="space-y-3 pt-2">
              {suggestions.length === 0 && !isLoading && (
                <div className="text-center py-8 text-gray-500">
                  <Lightbulb className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>AI suggestions will appear here</p>
                  <p className="text-xs mt-1">Try asking "What if I train 4 days/week?"</p>
                </div>
              )}
              
              {isLoading && (
                <div className="text-center py-8 text-gray-500">
                  <div className="w-8 h-8 mx-auto mb-2">
                    <div className="animate-spin h-8 w-8 border-4 border-purple-100 border-t-purple-600 rounded-full" />
                  </div>
                  <p>Generating AI suggestions...</p>
                  <p className="text-xs mt-1">Creating personalized recommendations</p>
                </div>
              )}
              
              {suggestions.map((suggestion) => (
                <div 
                  key={suggestion.id} 
                  className={`p-4 rounded-lg relative transition-all
                    ${suggestion.type === 'milestone' ? 'bg-blue-50 border border-blue-200' :
                      suggestion.type === 'task' ? 'bg-green-50 border border-green-200' :
                      'bg-purple-50 border border-purple-200'}
                    ${suggestion.isApplied ? 'opacity-60' : ''}
                  `}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('suggestionId', suggestion.id);
                  }}
                >
                  <div className="absolute top-2 right-2">
                    <Move className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div className="flex gap-3">
                    <div className={`rounded-full p-1.5 flex-shrink-0
                      ${suggestion.type === 'milestone' ? 'bg-blue-200 text-blue-700' : 
                        suggestion.type === 'task' ? 'bg-green-200 text-green-700' : 
                        'bg-purple-200 text-purple-700'}`}>
                      {suggestion.type === 'milestone' ? 
                        <ArrowRight className="w-4 h-4" /> : 
                        suggestion.type === 'task' ? 
                        <CheckIcon className="w-4 h-4" /> : 
                        <Lightbulb className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold mb-1 uppercase">
                        {suggestion.type}
                      </div>
                      <p className="text-sm">{suggestion.content}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    {!suggestion.isApplied ? (
                      <GhibliButton 
                        size="sm" 
                        variant="outline"
                        onClick={() => applySuggestion(suggestion.id)}
                        className={`text-xs
                          ${suggestion.type === 'milestone' ? 'border-blue-300 text-blue-700 hover:bg-blue-50' : 
                            suggestion.type === 'task' ? 'border-green-300 text-green-700 hover:bg-green-50' : 
                            'border-purple-300 text-purple-700 hover:bg-purple-50'}`}
                      >
                        Apply Suggestion
                      </GhibliButton>
                    ) : (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <CheckIcon className="w-3 h-3" />
                        Applied
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </GhibliCard>
      </div>
      
      {/* Active Goal with Drop Zones */}
      <div>
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle>Your Active Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{activeGoal.title}</h2>
              <div className="text-sm text-blue-600 font-medium">{activeGoal.category}</div>
            </div>
            
            {/* Milestones Drop Zone */}
            <div 
              className="p-4 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/50 space-y-3"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('suggestionId');
                applySuggestion(id);
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Milestones
                </h3>
                <div className="text-xs text-gray-500">Drag milestones here</div>
              </div>
              
              <div className="space-y-2">
                {activeGoal.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-2 rounded border border-blue-100">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                    <span className="text-sm">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tasks Drop Zone */}
            <div 
              className="p-4 border-2 border-dashed border-green-200 rounded-lg bg-green-50/50 space-y-3"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('suggestionId');
                applySuggestion(id);
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-green-800 flex items-center">
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Daily Tasks
                </h3>
                <div className="text-xs text-gray-500">Drag tasks here</div>
              </div>
              
              <div className="space-y-2">
                {activeGoal.tasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white p-2 rounded border border-green-100">
                    <div className="w-4 h-4 rounded border border-green-300" />
                    <span className="text-sm">{task}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <GhibliButton variant="outline" size="sm">
                Save Experiment
              </GhibliButton>
            </div>
          </CardContent>
        </GhibliCard>
      </div>
    </div>
  );
};

// Simple check icon component to avoid lucide-react import conflict
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default AIExperimentPanel;
