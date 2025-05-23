
import React, { useState } from 'react';
import { Copy, Calendar, Clock, Edit, ArrowRight, Music, Running, BookOpen } from 'lucide-react';
import GhibliCard from '@/components/GhibliCard';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GhibliButton from '@/components/GhibliButton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface TemplateCreationProps {
  mode: 'sandbox' | 'real';
}

interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  durationDays: number;
  milestones: string[];
  tasks: string[];
}

const TemplateCreation = ({ mode }: TemplateCreationProps) => {
  const [templates, setTemplates] = useState<GoalTemplate[]>([
    {
      id: 'marathon',
      title: 'Marathon Training Plan',
      description: 'A 16-week training program to prepare for your first marathon',
      category: 'Health & Fitness',
      icon: <Running className="w-5 h-5" />,
      color: 'bg-green-100 text-green-800',
      durationDays: 112,
      milestones: [
        'Complete first 5K run',
        'Reach 10K distance',
        'Half-marathon ready (21K)',
        'Long run of 30K',
        'Marathon race day (42.2K)'
      ],
      tasks: [
        'Create weekly running schedule',
        'Purchase proper running shoes',
        'Plan nutrition strategy',
        'Develop stretching routine',
        'Set up recovery plan'
      ]
    },
    {
      id: 'writing',
      title: 'Daily Writing Habit',
      description: 'Build a consistent writing practice over 30 days',
      category: 'Education',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-800',
      durationDays: 30,
      milestones: [
        'Write 500 words daily for one week',
        'Complete first short story',
        'Develop character profiles',
        'Create story outline',
        'Edit and polish final draft'
      ],
      tasks: [
        'Set up writing environment',
        'Create writing prompt list',
        'Schedule daily writing time',
        'Join writers community',
        'Find accountability partner'
      ]
    },
    {
      id: 'guitar',
      title: 'Learn Guitar Basics',
      description: 'Master guitar fundamentals in 60 days',
      category: 'Personal',
      icon: <Music className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-800',
      durationDays: 60,
      milestones: [
        'Learn basic chords (A, D, E)',
        'Switch between chords smoothly',
        'Play first simple song',
        'Master basic strumming patterns',
        'Perform a complete song'
      ],
      tasks: [
        'Practice 15 minutes daily',
        'Set up guitar properly',
        'Learn music notation basics',
        'Record practice sessions',
        'Find learning resources'
      ]
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<GoalTemplate | null>(null);
  const [customizedTemplate, setCustomizedTemplate] = useState<GoalTemplate | null>(null);

  const selectTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      setSelectedTemplate(template);
      setCustomizedTemplate({...template});
    }
  };

  const updateCustomTemplate = (field: string, value: string) => {
    if (!customizedTemplate) return;
    
    setCustomizedTemplate({
      ...customizedTemplate,
      [field]: value
    });
  };

  const remixTemplate = () => {
    if (!customizedTemplate) return;
    
    // In a real app, this would save the template to the database
    toast.success('Template remixed! Now you can use it to create a real goal.');
    
    // Reset the selection for demo purposes
    setTimeout(() => {
      setSelectedTemplate(null);
      setCustomizedTemplate(null);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Template Selection */}
      <div className="lg:col-span-1">
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle>Choose a Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Select a template below to quickly create a well-structured goal with predefined milestones and tasks.
            </p>
            
            <div className="space-y-3 pt-2">
              {templates.map(template => (
                <div
                  key={template.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all
                    ${selectedTemplate?.id === template.id 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'}`}
                  onClick={() => selectTemplate(template.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full text-white ${template.id === 'marathon' ? 'bg-green-500' : 
                                              template.id === 'writing' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{template.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{template.durationDays} days</span>
                        <span>•</span>
                        <Badge className={template.color}>{template.category}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </GhibliCard>
      </div>
      
      {/* Template Preview or Customization */}
      <div className="lg:col-span-2">
        {selectedTemplate ? (
          <GhibliCard>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle>Customize Template</CardTitle>
                <GhibliButton variant="ghost" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </GhibliButton>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info Editing */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Title</label>
                  <Input 
                    value={customizedTemplate?.title || ''} 
                    onChange={(e) => updateCustomTemplate('title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input 
                    value={customizedTemplate?.description || ''} 
                    onChange={(e) => updateCustomTemplate('description', e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Input 
                      value={customizedTemplate?.category || ''} 
                      onChange={(e) => updateCustomTemplate('category', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Duration (days)</label>
                    <Input 
                      type="number"
                      value={customizedTemplate?.durationDays || 0} 
                      onChange={(e) => updateCustomTemplate('durationDays', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Milestones & Tasks Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium flex items-center mb-3">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                    Milestones
                  </h3>
                  
                  <div className="space-y-2">
                    {customizedTemplate?.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        <span>{milestone}</span>
                        <Edit className="w-3 h-3 text-gray-400 ml-auto cursor-pointer hover:text-blue-500" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center mb-3">
                    <Clock className="w-4 h-4 mr-2 text-purple-500" />
                    Daily Tasks
                  </h3>
                  
                  <div className="space-y-2">
                    {customizedTemplate?.tasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 rounded border border-purple-300" />
                        <span>{task}</span>
                        <Edit className="w-3 h-3 text-gray-400 ml-auto cursor-pointer hover:text-purple-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="pt-4 flex justify-end gap-3">
                <GhibliButton 
                  variant="outline" 
                  onClick={() => {
                    setSelectedTemplate(null);
                    setCustomizedTemplate(null);
                  }}
                >
                  Cancel
                </GhibliButton>
                
                <GhibliButton 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={remixTemplate}
                >
                  Create from Template
                </GhibliButton>
              </div>
            </CardContent>
          </GhibliCard>
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <ArrowRight className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Template</h3>
            <p className="text-gray-600 max-w-md">
              Choose a template from the left to quickly create a structured goal with predefined milestones and tasks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateCreation;
