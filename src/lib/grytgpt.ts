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

// Marathon training tips
const marathonTrainingTips = [
  "Victory Visualization Mini-Workout: Take 10 minutes to perform light dynamic stretching while mentally rehearsing your race day success. Visualize yourself crossing the finish line under your goal time, feeling strong and accomplished.",
  
  "Marathon Macros Strategic Snacking: Focus on recovery nutrition with a 4:1 carb-to-protein ratio snack. Try a banana with Greek yogurt or a smoothie with berries and protein powder to replenish glycogen stores while supporting muscle repair.",
  
  "Mile Marker Motivation System: Create a playlist with 26 of your favorite energizing songs - one for each mile of the marathon. Listen to portions during light recovery walks to mentally prepare for race day while keeping your body active without overtraining.",
  
  "Runner's Reset Recovery Hack: Implement a 15-minute targeted recovery routine focusing on your feet and calves using a tennis ball for rolling and gentle self-massage. This addresses marathon-specific stress points and maintains circulation.",
  
  "Pace Progress Celebration Ritual: Document today's successful pace achievement in a dedicated marathon journal with three specific observations about what went well. This builds confidence and creates a resource of strategies for race day.",
  
  "Zone 2 Recovery Session: Spend 20-30 minutes in heart rate zone 2 (very easy effort where you can still hold a conversation) to improve aerobic capacity without adding training stress.",
  
  "Pre-Race Mental Rehearsal: Visualize potential race day challenges (weather, crowds, hills) and mentally practice your coping strategies. This builds psychological resilience for marathon day.",
  
  "Carb Cycling Strategy: On hard training days, increase carbohydrate intake to 7-10g per kg of bodyweight. On recovery days, moderate to 5-7g per kg to optimize glycogen storage for race day.",
  
  "Compression Recovery Protocol: Use compression socks or sleeves for 2-3 hours after training sessions to reduce inflammation and improve venous return, speeding recovery between sessions.",
  
  "Technique Focus Mini-Session: Spend 5-10 minutes practicing proper running form (arm swing, foot strike, posture) at an easy pace to ingrain efficiency that will save energy during your marathon."
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
      
      // Check for specific marathon training requests
      if (input.includes('marathon') && 
          (input.includes('training') || input.includes('run') || input.includes('tips'))) {
        response = getMarathonTrainingResponse(goals);
      }
      // Check for specific user intents
      else if (input.includes('motivat') || input.includes('encouragement') || input.includes('inspire')) {
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

// Generate marathon training tips
const getMarathonTrainingResponse = (goals: Goal[]): string => {
  // Find marathon-related goals
  const marathonGoals = goals.filter(goal => 
    goal.category === 'Health & Fitness' && 
    goal.title.toLowerCase().includes('marathon')
  );
  
  if (marathonGoals.length > 0) {
    const marathonGoal = marathonGoals[0];
    const randomTips = shuffleArray([...marathonTrainingTips]).slice(0, 5);
    
    let progressStatus = "just getting started";
    if (marathonGoal.progress > 80) progressStatus = "almost at the finish line";
    else if (marathonGoal.progress > 50) progressStatus = "making great progress";
    else if (marathonGoal.progress > 20) progressStatus = "building momentum";
    
    const response = `Here are 5 training tips for your "${marathonGoal.title}" goal, where you're ${progressStatus} at ${marathonGoal.progress}%:\n\n` +
      randomTips.map((tip, index) => `${index + 1}. ${tip}`).join('\n\n');
    
    return response;
  }
  
  // Generic marathon tips if no specific marathon goal is found
  return `Here are some marathon training tips to help you succeed:\n\n` +
    shuffleArray([...marathonTrainingTips]).slice(0, 3).map((tip, index) => `${index + 1}. ${tip}`).join('\n\n');
};

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
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
