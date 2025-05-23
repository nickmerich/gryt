
import { ReactNode } from 'react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  badgeIcon: ReactNode;
  badgeColor: string;
  isCompleted: boolean;
  isActive: boolean;
  points: number;
}

export interface GameModePanelProps {
  mode: 'sandbox' | 'real';
}
