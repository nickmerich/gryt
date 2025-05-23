
// Mock responses for the GrytGPT chatbot
// In a real application, this would connect to an AI service or API

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
}

// Daily affirmations and motivational messages
const affirmations = [
  "You're making incredible progress. Keep going!",
  "Every small step you take is bringing you closer to your goals.",
  "You have what it takes to accomplish anything you set your mind to.",
  "Your dedication is inspiring. I believe in you!",
  "Today is a new opportunity to move forward with purpose.",
  "You've already come so far - be proud of that journey.",
  "Challenges help you grow. You're becoming stronger with each one.",
  "Your goals are within reach. Keep pushing!",
  "You're building amazing habits that will serve you for life.",
  "Consistency is your superpower. Keep showing up for yourself."
];

// Journaling prompts related to goal achievement
const journalingPrompts = [
  "What small win can you celebrate from yesterday?",
  "What's one obstacle you're facing right now, and how might you overcome it?",
  "How has working toward your goals changed you so far?",
  "What's one thing you're learning about yourself through this process?",
  "If you could give advice to yourself from a month ago, what would it be?",
  "What are you most proud of in your journey so far?",
  "How do you want to feel when you accomplish your current goal?",
  "What's one thing you can do today that your future self will thank you for?",
  "What's something you're grateful for in your current progress?",
  "How has your perspective changed since starting this goal?"
];

// Reflection questions
const reflectionQuestions = [
  "What has been your biggest challenge so far, and how did you handle it?",
  "Which habits have been most helpful in making progress?",
  "How has working on this goal affected other areas of your life?",
  "What unexpected benefits have you experienced from pursuing this goal?",
  "How have your strategies evolved since you started?",
  "What would make the next phase of your journey even more successful?",
  "Which part of this process has been most enjoyable?",
  "How are you different today compared to when you started?"
];

// Generate a chat response based on user input and their goals
export const generateChatResponse = (
  userInput: string,
  goals: Goal[] = []
): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const input = userInput.toLowerCase();
      let response = "";
      
      // Check for specific user intents
      if (input.includes('motivat') || input.includes('encouragement') || input.includes('inspire')) {
        response = getMotivationalResponse(goals);
      } 
      else if (input.includes('journal') || input.includes('prompt') || input.includes('write')) {
        response = getJournalingPrompt(goals);
      }
      else if (input.includes('reflect') || input.includes('progress') || input.includes('review')) {
        response = getReflectionResponse(goals);
      }
      else if (input.includes('plan') || input.includes('step') || input.includes('how')) {
        response = getActionPlanResponse(goals);
      }
      else if (input.includes('hello') || input.includes('hi ') || input.includes('hey')) {
        response = "Hello! I'm GrytGPT, your personal goal achievement assistant. How can I help you today with your goals and aspirations?";
      }
      else {
        // Generic response based on goals if available
        response = getGenericResponse(goals);
      }
      
      resolve(response);
    }, 1000);
  });
};

// Generate a motivational response
const getMotivationalResponse = (goals: Goal[]): string => {
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
  
  if (goals && goals.length > 0) {
    // Find the goal with the most progress
    const mostProgressGoal = [...goals].sort((a, b) => b.progress - a.progress)[0];
    
    if (mostProgressGoal.progress > 70) {
      return `${randomAffirmation} You're making amazing progress on "${mostProgressGoal.title}" - you're already ${mostProgressGoal.progress}% of the way there! Keep this momentum going!`;
    } else if (mostProgressGoal.progress > 30) {
      return `${randomAffirmation} I see you've made solid progress on "${mostProgressGoal.title}". Keep building on what you've already accomplished!`;
    } else {
      return `${randomAffirmation} Every journey begins with small steps, and you've already started with "${mostProgressGoal.title}". Keep moving forward!`;
    }
  }
  
  return randomAffirmation;
};

// Generate a journaling prompt
const getJournalingPrompt = (goals: Goal[]): string => {
  const randomPrompt = journalingPrompts[Math.floor(Math.random() * journalingPrompts.length)];
  
  if (goals && goals.length > 0) {
    const randomGoal = goals[Math.floor(Math.random() * goals.length)];
    return `Here's a journaling prompt related to your "${randomGoal.title}" goal:\n\n${randomPrompt}\n\nTake 5-10 minutes to write freely about this. There's no right or wrong answer!`;
  }
  
  return `Here's a journaling prompt for today:\n\n${randomPrompt}\n\nTake 5-10 minutes to write freely about this. There's no right or wrong answer!`;
};

// Generate a reflection response
const getReflectionResponse = (goals: Goal[]): string => {
  const randomReflection = reflectionQuestions[Math.floor(Math.random() * reflectionQuestions.length)];
  
  if (goals && goals.length > 0) {
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;
    
    if (totalProgress > 50) {
      return `You're making wonderful progress across your goals! Here's a question to reflect on:\n\n${randomReflection}\n\nThinking about this might give you insights for the rest of your journey.`;
    } else {
      return `As you continue building momentum with your goals, here's something to reflect on:\n\n${randomReflection}\n\nReflection can be a powerful tool for staying aligned with what matters most to you.`;
    }
  }
  
  return `Here's a reflection question for today:\n\n${randomReflection}\n\nTaking time to reflect can help you gain clarity and stay connected to your purpose.`;
};

// Generate an action plan response
const getActionPlanResponse = (goals: Goal[]): string => {
  if (goals && goals.length > 0) {
    // Find the goal with least progress
    const leastProgressGoal = [...goals].sort((a, b) => a.progress - b.progress)[0];
    
    return `For your "${leastProgressGoal.title}" goal, consider these next steps:\n\n1. Break it down into smaller, manageable tasks\n2. Schedule specific times to work on these tasks\n3. Find an accountability partner or system\n4. Track your progress daily, even small wins\n5. Identify potential obstacles and plan how to overcome them\n\nWhat specific part of this goal feels most challenging right now?`;
  }
  
  return `When planning your next steps, I recommend:\n\n1. Choose one specific goal to focus on first\n2. Break it down into smaller, manageable tasks\n3. Schedule these tasks in your calendar\n4. Create a simple tracking system\n5. Celebrate small wins along the way\n\nWhich goal would you like to focus on first?`;
};

// Generate a generic response
const getGenericResponse = (goals: Goal[]): string => {
  if (goals && goals.length > 0) {
    return `I see you're working on ${goals.length} goal${goals.length > 1 ? 's' : ''}. How can I help you today? I can provide motivation, journaling prompts, reflection questions, or help you plan your next steps.`;
  }
  
  return "I'm here to support your goal journey! I can provide motivation, journaling prompts, reflection questions, or help you plan. What would be most helpful right now?";
};
