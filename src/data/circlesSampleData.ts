
import { Circle, CircleMember } from '@/components/circles/CircleCard';
import { Post } from '@/components/circles/CirclePost';
import { Comment } from '@/components/circles/Comment';

// Sample members with join dates added
export const sampleMembers: (CircleMember & { joinDate: string, streak: number, progress: number })[] = [
  { id: '1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=1', joinDate: '2023-01-15', streak: 12, progress: 78 },
  { id: '2', name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?img=2', joinDate: '2023-02-20', streak: 8, progress: 65 },
  { id: '3', name: 'Jamie Smith', avatar: 'https://i.pravatar.cc/150?img=3', joinDate: '2023-03-05', streak: 21, progress: 92 },
  { id: '4', name: 'Taylor Wilson', avatar: 'https://i.pravatar.cc/150?img=4', joinDate: '2023-04-10', streak: 5, progress: 45 },
  { id: '5', name: 'Jordan Blake', avatar: 'https://i.pravatar.cc/150?img=5', joinDate: '2023-05-25', streak: 16, progress: 81 },
  { id: '6', name: 'Casey Morgan', avatar: 'https://i.pravatar.cc/150?img=6', joinDate: '2023-06-12', streak: 7, progress: 59 },
  { id: '7', name: 'Riley Johnson', avatar: 'https://i.pravatar.cc/150?img=7', joinDate: '2023-07-30', streak: 3, progress: 32 },
];

// Sample circles data
export const circlesData: Circle[] = [
  {
    id: '1',
    name: 'Founders Circle',
    description: 'A community for entrepreneurs and startup founders to share their journey, challenges, and victories.',
    category: 'Career',
    memberCount: 24,
    members: sampleMembers.slice(0, 4),
    isJoined: true
  },
  {
    id: '2',
    name: 'Marathon Runners',
    description: 'Training for a marathon? Join fellow runners to track progress, share training tips, and motivate each other.',
    category: 'Health & Fitness',
    memberCount: 42,
    members: sampleMembers.slice(1, 5),
    isJoined: true
  }
];

// Sample posts data
export const samplePosts: Post[] = [
  {
    id: '1',
    author: sampleMembers[0],
    content: "Just secured our first angel investor! It's been a long journey but we finally got someone who believes in our vision. Next step: building our MVP faster with the new resources.",
    timestamp: '2 hours ago',
    likes: 12,
    comments: 5,
    category: 'celebration',
    goalTitle: 'Secure Funding'
  },
  {
    id: '2',
    author: sampleMembers[1],
    content: "I'm stuck on how to approach customer acquisition. Our product is great, but we're struggling to get it in front of the right people. Has anyone had success with content marketing for B2B SaaS?",
    timestamp: '5 hours ago',
    likes: 8,
    comments: 7,
    category: 'challenge'
  },
  {
    id: '3',
    author: sampleMembers[2],
    content: "We've increased our MRR by 15% this month by focusing on reducing churn. The key was implementing a better onboarding flow and more proactive customer success outreach.",
    timestamp: '1 day ago',
    likes: 21,
    comments: 3,
    category: 'progress',
    goalTitle: 'Increase Monthly Revenue'
  }
];

// Sample user goals for the form
export const userGoals = [
  { id: 'g1', title: 'Launch MVP' },
  { id: 'g2', title: 'Reach 100 Users' },
  { id: 'g3', title: 'Secure Funding' }
];

// Weekly prompts for the circle
export const weeklyPrompt = {
  title: "This week's focus",
  content: "What's one small step you've taken this week that you're proud of, even if it didn't lead to the results you hoped for?",
  date: "May 20 - May 26"
};

// Current user information
export const currentUser = {
  id: 'current-user',
  name: 'You',
  avatar: 'https://i.pravatar.cc/150?img=8'
};
