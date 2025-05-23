
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Sparkles, Gamepad2 } from 'lucide-react';
import GhibliButton from '@/components/GhibliButton';
import { Link } from 'react-router-dom';

interface PlaygroundHeaderProps {
  mode: 'sandbox' | 'real';
  onModeToggle: (mode: 'sandbox' | 'real') => void;
}

const PlaygroundHeader = ({ mode, onModeToggle }: PlaygroundHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Gamepad2 className="h-8 w-8 text-gryt-blue" />
          <h1 className="text-3xl font-bold text-gryt-blue">Gryt Playground</h1>
          <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
            Beta
          </div>
        </div>
        <Link to="/">
          <GhibliButton variant="outline" size="sm">
            Back to Dashboard
          </GhibliButton>
        </Link>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-600">
          Welcome to the Gryt Playground! This is your safe space to experiment with all of Gryt's features without affecting your real goals. Try out different templates, challenge yourself, or co-create with friends!
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-gryt-blue" />
          <span className="font-semibold">Playground Mode:</span>
          <span className="text-gray-600">{mode === 'sandbox' ? 'Just Playing' : 'Real Tracking'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sandbox</span>
          <Switch
            checked={mode === 'real'}
            onCheckedChange={(checked) => onModeToggle(checked ? 'real' : 'sandbox')}
          />
          <span className="text-sm text-gray-500">Real</span>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundHeader;
