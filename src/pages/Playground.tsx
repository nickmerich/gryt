
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GhibliLayout from '@/components/GhibliLayout';
import PlaygroundHeader from '@/components/playground/PlaygroundHeader';
import OnboardingSandbox from '@/components/playground/OnboardingSandbox';
import GameModePanel from '@/components/playground/GameModePanel';
import TemplateCreation from '@/components/playground/TemplateCreation';
import AIExperimentPanel from '@/components/playground/AIExperimentPanel';
import SocialPlayground from '@/components/playground/SocialPlayground';
import ResetPanel from '@/components/playground/ResetPanel';

const Playground = () => {
  const [activeTab, setActiveTab] = useState('sandbox');
  const [playgroundMode, setPlaygroundMode] = useState<'sandbox' | 'real'>('sandbox');

  const handleModeToggle = (mode: 'sandbox' | 'real') => {
    setPlaygroundMode(mode);
  };

  return (
    <GhibliLayout>
      <div className="container mx-auto px-4 py-8">
        <PlaygroundHeader 
          mode={playgroundMode} 
          onModeToggle={handleModeToggle}
        />

        <Tabs 
          defaultValue="sandbox" 
          className="mt-8"
          onValueChange={(value) => setActiveTab(value as string)}
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
            <TabsTrigger value="sandbox" className="text-xs md:text-sm">Onboarding</TabsTrigger>
            <TabsTrigger value="game" className="text-xs md:text-sm">Gamified Mode</TabsTrigger>
            <TabsTrigger value="templates" className="text-xs md:text-sm">Templates</TabsTrigger>
            <TabsTrigger value="ai" className="text-xs md:text-sm">AI Experiments</TabsTrigger>
            <TabsTrigger value="social" className="text-xs md:text-sm">Social Play</TabsTrigger>
            <TabsTrigger value="reset" className="text-xs md:text-sm">Reset & Iterate</TabsTrigger>
          </TabsList>

          <TabsContent value="sandbox" className="animate-fade-in">
            <OnboardingSandbox mode={playgroundMode} />
          </TabsContent>

          <TabsContent value="game" className="animate-fade-in">
            <GameModePanel mode={playgroundMode} />
          </TabsContent>

          <TabsContent value="templates" className="animate-fade-in">
            <TemplateCreation mode={playgroundMode} />
          </TabsContent>

          <TabsContent value="ai" className="animate-fade-in">
            <AIExperimentPanel mode={playgroundMode} />
          </TabsContent>

          <TabsContent value="social" className="animate-fade-in">
            <SocialPlayground mode={playgroundMode} />
          </TabsContent>

          <TabsContent value="reset" className="animate-fade-in">
            <ResetPanel mode={playgroundMode} />
          </TabsContent>
        </Tabs>
      </div>
    </GhibliLayout>
  );
};

export default Playground;
