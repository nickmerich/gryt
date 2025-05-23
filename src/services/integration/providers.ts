
import { IntegrationProvider } from './types';

// List of available integration providers
export const integrationProviders: IntegrationProvider[] = [
  {
    id: 'strava',
    name: 'Strava',
    icon: 'strava.svg',
    description: 'Connect your running and cycling activities',
    category: 'Fitness',
    status: 'available',
    color: '#FC4C02',
    authType: 'oauth',
    authUrl: '/api/auth/strava'
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    icon: 'duolingo.svg',
    description: 'Track your language learning streaks and XP',
    category: 'Learning',
    status: 'available',
    color: '#58CC02',
    authType: 'oauth',
    authUrl: '/api/auth/duolingo'
  },
  {
    id: 'chess',
    name: 'Chess.com',
    icon: 'chess.svg',
    description: 'Connect your chess games and puzzles',
    category: 'Games',
    status: 'available',
    color: '#7FA650',
    authType: 'api_key'
  },
  {
    id: 'whoop',
    name: 'WHOOP',
    icon: 'whoop.svg',
    description: 'Track your recovery, strain, and sleep data',
    category: 'Fitness',
    status: 'coming_soon',
    color: '#00A9E0',
    authType: 'oauth'
  },
  {
    id: 'garmin',
    name: 'Garmin',
    icon: 'garmin.svg',
    description: 'Connect your fitness and health metrics',
    category: 'Fitness',
    status: 'coming_soon',
    color: '#007CC3',
    authType: 'oauth'
  },
  {
    id: 'apple_health',
    name: 'Apple Health',
    icon: 'apple-health.svg',
    description: 'Import health and fitness data from Apple Health',
    category: 'Fitness',
    status: 'coming_soon',
    color: '#FF2D55',
    authType: 'oauth'
  },
  {
    id: 'headspace',
    name: 'Headspace',
    icon: 'headspace.svg',
    description: 'Track your meditation minutes and streaks',
    category: 'Wellness',
    status: 'coming_soon',
    color: '#F47D31',
    authType: 'oauth'
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'github.svg',
    description: 'Track your code commits and contributions',
    category: 'Creativity',
    status: 'available',
    color: '#171515',
    authType: 'oauth',
    authUrl: '/api/auth/github'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube.svg',
    description: 'Connect your videos and channel stats',
    category: 'Creativity',
    status: 'coming_soon',
    color: '#FF0000',
    authType: 'oauth'
  },
  {
    id: 'goodreads',
    name: 'Goodreads',
    icon: 'goodreads.svg',
    description: 'Track your reading progress and books completed',
    category: 'Learning',
    status: 'coming_soon',
    color: '#553B08',
    authType: 'oauth'
  },
];
