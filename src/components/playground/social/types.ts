
export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Activity {
  id: string;
  type: 'message' | 'update' | 'cheer' | 'joined';
  user: User;
  content: string;
  timestamp: string;
}

export interface DemoTask {
  id: string;
  title: string;
  progress: number;
  assignedTo?: User;
  cheers: number;
}

export interface SocialPlaygroundProps {
  mode: 'sandbox' | 'real';
}

export interface CursorPosition {
  x: number;
  y: number;
}

export type CursorPositions = {[key: string]: CursorPosition};
