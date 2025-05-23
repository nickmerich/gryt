
import React from 'react';
import GhibliCard from '@/components/GhibliCard';

interface WeeklyPrompt {
  title: string;
  content: string;
  date: string;
}

interface CircleWeeklyPromptProps {
  prompt: WeeklyPrompt;
}

const CircleWeeklyPrompt: React.FC<CircleWeeklyPromptProps> = ({ prompt }) => {
  return (
    <GhibliCard className="p-6" illustration="sunset" illustrationOpacity={0.07}>
      <h3 className="font-medium text-gray-900 mb-2">{prompt.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{prompt.content}</p>
      <p className="text-xs text-gray-500">{prompt.date}</p>
    </GhibliCard>
  );
};

export default CircleWeeklyPrompt;
