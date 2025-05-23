
import { GoalInput } from '@/hooks/useGoals';

interface Task {
  title: string;
}

export interface GeneratedMilestone {
  name: string;
  tasks: Task[];
}

export interface GeneratedMilestonesOutput {
  milestones: GeneratedMilestone[];
}

// Categories used in the app
const CATEGORIES = [
  'Health & Fitness',
  'Education',
  'Career',
  'Personal',
  'Finance',
];

/**
 * Generate milestones and tasks based on goal details
 */
export const generateMilestonesForGoal = (goal: GoalInput): GeneratedMilestonesOutput => {
  const { title, description, category, target_date } = goal;
  
  // Calculate time span if target date exists
  let timeSpanInDays = 90; // Default to 3 months if no target date
  if (target_date) {
    const targetDate = new Date(target_date);
    const today = new Date();
    timeSpanInDays = Math.max(1, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  }
  
  // Determine number of milestones (4-6) based on time span and complexity
  const milestoneCount = timeSpanInDays <= 30 ? 4 : 
                        timeSpanInDays <= 90 ? 5 : 6;

  // Generate milestones based on category and goal details
  switch (category) {
    case 'Health & Fitness':
      return generateHealthFitnessMilestones(title, description, timeSpanInDays, milestoneCount);
    case 'Education':
      return generateEducationMilestones(title, description, timeSpanInDays, milestoneCount);
    case 'Career':
      return generateCareerMilestones(title, description, timeSpanInDays, milestoneCount);
    case 'Personal':
      return generatePersonalMilestones(title, description, timeSpanInDays, milestoneCount);
    case 'Finance':
      return generateFinanceMilestones(title, description, timeSpanInDays, milestoneCount);
    default:
      return generateGenericMilestones(title, description, timeSpanInDays, milestoneCount);
  }
};

/**
 * Generate milestones for Health & Fitness goals
 */
const generateHealthFitnessMilestones = (
  title: string, 
  description: string = '', 
  timeSpanInDays: number,
  milestoneCount: number
): GeneratedMilestonesOutput => {
  const milestones: GeneratedMilestone[] = [];
  const isRunningGoal = title.toLowerCase().includes('run') || 
                       title.toLowerCase().includes('marathon') || 
                       description.toLowerCase().includes('run') ||
                       description.toLowerCase().includes('marathon');
  
  const isWeightGoal = title.toLowerCase().includes('weight') || 
                      title.toLowerCase().includes('lose') || 
                      description.toLowerCase().includes('weight') ||
                      description.toLowerCase().includes('lose');
  
  if (isRunningGoal) {
    milestones.push({
      name: "Build Base Endurance (0-25%)",
      tasks: [
        { title: "Run 20 minutes at conversational pace" },
        { title: "Track run data in Gryt" },
        { title: "Complete 10-minute post-run stretching" },
        { title: "Prepare workout clothes for tomorrow's run" },
        { title: "Drink 2 extra glasses of water today" }
      ]
    });
    
    milestones.push({
      name: "Increase Distance (25-50%)",
      tasks: [
        { title: "Add 10% to your longest run distance" },
        { title: "Complete 2 shorter runs this week" },
        { title: "Plan recovery meal after your long run" },
        { title: "Schedule next week's running days" },
        { title: "Share your progress with a friend" }
      ]
    });
    
    milestones.push({
      name: "Build Speed (50-75%)",
      tasks: [
        { title: "Include 3 intervals in today's run" },
        { title: "Track your pace improvements" },
        { title: "Foam roll for 10 minutes post-run" },
        { title: "Research proper running form techniques" },
        { title: "Rest and hydrate properly" }
      ]
    });
    
    milestones.push({
      name: "Race Preparation (75-100%)",
      tasks: [
        { title: "Complete final long run before tapering" },
        { title: "Plan race day nutrition strategy" },
        { title: "Visualize crossing the finish line" },
        { title: "Prepare race day outfit and gear" },
        { title: "Create race day checklist" }
      ]
    });
  }
  else if (isWeightGoal) {
    milestones.push({
      name: "Establish Healthy Routines (0-25%)",
      tasks: [
        { title: "Track all meals today in a journal" },
        { title: "Walk for 20 minutes after dinner" },
        { title: "Drink water instead of sugary beverages" },
        { title: "Prep healthy snacks for tomorrow" },
        { title: "Set up your workout area at home" }
      ]
    });
    
    milestones.push({
      name: "Build Consistency (25-50%)",
      tasks: [
        { title: "Complete 30 minutes of moderate exercise" },
        { title: "Eat protein with each meal today" },
        { title: "Avoid processed foods for the day" },
        { title: "Take progress photos for comparison" },
        { title: "Get 7+ hours of quality sleep" }
      ]
    });
    
    milestones.push({
      name: "Sustainable Progress (50-75%)",
      tasks: [
        { title: "Try a new healthy recipe today" },
        { title: "Complete a strength training session" },
        { title: "Share a goal update in Gryt" },
        { title: "Practice mindful eating at each meal" },
        { title: "Plan meals for the next three days" }
      ]
    });
    
    milestones.push({
      name: "Lifestyle Integration (75-100%)",
      tasks: [
        { title: "Identify three non-scale victories" },
        { title: "Adjust workout intensity based on progress" },
        { title: "Plan strategies for challenging situations" },
        { title: "Reflect on habit changes in a journal" },
        { title: "Share your success story with someone" }
      ]
    });
  }
  else {
    milestones.push({
      name: "Getting Started (0-25%)",
      tasks: [
        { title: "Set up your fitness tracking in Gryt" },
        { title: "Schedule 3 weekly workout sessions" },
        { title: "Create a dedicated workout playlist" },
        { title: "Stock your kitchen with healthy options" },
        { title: "Find a workout buddy or accountability partner" }
      ]
    });
    
    milestones.push({
      name: "Building Habits (25-50%)",
      tasks: [
        { title: "Complete today's scheduled workout" },
        { title: "Track your water intake throughout the day" },
        { title: "Prepare healthy post-workout snack" },
        { title: "Stretch for 10 minutes before bed" },
        { title: "Review your weekly progress so far" }
      ]
    });
    
    milestones.push({
      name: "Gaining Momentum (50-75%)",
      tasks: [
        { title: "Try a new workout format today" },
        { title: "Share a progress update in Gryt" },
        { title: "Practice proper form during exercises" },
        { title: "Plan your active recovery day" },
        { title: "Set a small challenge for next week" }
      ]
    });
    
    milestones.push({
      name: "Sustaining Success (75-100%)",
      tasks: [
        { title: "Evaluate what's working best for you" },
        { title: "Update your fitness goals based on progress" },
        { title: "Create a maintenance plan" },
        { title: "Celebrate your achievements so far" },
        { title: "Share your fitness journey with others" }
      ]
    });
  }
  
  return { milestones: milestones.slice(0, milestoneCount) };
};

/**
 * Generate milestones for Education goals
 */
const generateEducationMilestones = (
  title: string, 
  description: string = '', 
  timeSpanInDays: number,
  milestoneCount: number
): GeneratedMilestonesOutput => {
  const isCourseGoal = title.toLowerCase().includes('course') || 
                      title.toLowerCase().includes('class') || 
                      description.toLowerCase().includes('course') ||
                      description.toLowerCase().includes('class');
  
  const isLanguageGoal = title.toLowerCase().includes('language') || 
                        title.toLowerCase().includes('speak') || 
                        description.toLowerCase().includes('language') ||
                        description.toLowerCase().includes('speak');
  
  const milestones: GeneratedMilestone[] = [];
  
  if (isCourseGoal) {
    milestones.push({
      name: "Course Preparation (0-25%)",
      tasks: [
        { title: "Create study schedule in your calendar" },
        { title: "Set up dedicated study environment" },
        { title: "Review course syllabus and materials" },
        { title: "Connect with classmates or study groups" },
        { title: "Prepare note-taking templates" }
      ]
    });
    
    milestones.push({
      name: "Foundation Building (25-50%)",
      tasks: [
        { title: "Complete today's lesson or module" },
        { title: "Create flashcards for key concepts" },
        { title: "Schedule Q&A session with instructor" },
        { title: "Practice applying concepts to real scenarios" },
        { title: "Summarize today's learning in your own words" }
      ]
    });
    
    milestones.push({
      name: "Deep Understanding (50-75%)",
      tasks: [
        { title: "Work through practice problems" },
        { title: "Explain difficult concepts to someone else" },
        { title: "Connect new knowledge to previous topics" },
        { title: "Create visual mind map of course content" },
        { title: "Schedule time for course project work" }
      ]
    });
    
    milestones.push({
      name: "Mastery & Application (75-100%)",
      tasks: [
        { title: "Complete practice assessments or quizzes" },
        { title: "Create study guide for final exam" },
        { title: "Apply course concepts to a personal project" },
        { title: "Schedule review sessions for challenging topics" },
        { title: "Reflect on how to apply knowledge going forward" }
      ]
    });
  }
  else if (isLanguageGoal) {
    milestones.push({
      name: "Basic Vocabulary (0-25%)",
      tasks: [
        { title: "Learn 10 new words or phrases today" },
        { title: "Practice pronunciation for 15 minutes" },
        { title: "Set up language learning app reminder" },
        { title: "Label items around your home in new language" },
        { title: "Find a language exchange partner" }
      ]
    });
    
    milestones.push({
      name: "Simple Conversations (25-50%)",
      tasks: [
        { title: "Practice introducing yourself out loud" },
        { title: "Listen to a short podcast in target language" },
        { title: "Write a simple journal entry with new words" },
        { title: "Role-play ordering food in target language" },
        { title: "Review grammar rules for 15 minutes" }
      ]
    });
    
    milestones.push({
      name: "Intermediate Fluency (50-75%)",
      tasks: [
        { title: "Watch a show with target language subtitles" },
        { title: "Have a 5-minute conversation with language partner" },
        { title: "Write responses to common questions" },
        { title: "Learn idioms and colloquial expressions" },
        { title: "Read a short article in target language" }
      ]
    });
    
    milestones.push({
      name: "Conversational Comfort (75-100%)",
      tasks: [
        { title: "Discuss a current event in target language" },
        { title: "Translate a favorite song or poem" },
        { title: "Record yourself speaking for 5 minutes" },
        { title: "Practice complex grammar structures" },
        { title: "Plan a trip itinerary in target language" }
      ]
    });
  }
  else {
    milestones.push({
      name: "Learning Foundations (0-25%)",
      tasks: [
        { title: "Research the best learning resources" },
        { title: "Set up distraction-free study environment" },
        { title: "Create SMART sub-goals for your learning" },
        { title: "Schedule consistent daily learning time" },
        { title: "Find an accountability partner or community" }
      ]
    });
    
    milestones.push({
      name: "Knowledge Building (25-50%)",
      tasks: [
        { title: "Complete today's learning module" },
        { title: "Take effective notes on new concepts" },
        { title: "Explain what you learned to someone else" },
        { title: "Connect new knowledge to what you already know" },
        { title: "Review yesterday's material before moving on" }
      ]
    });
    
    milestones.push({
      name: "Skill Development (50-75%)",
      tasks: [
        { title: "Apply new knowledge to a practice problem" },
        { title: "Find a real-world application for today's learning" },
        { title: "Create a visual representation of complex concepts" },
        { title: "Seek feedback on your progress" },
        { title: "Teach someone else a concept you've mastered" }
      ]
    });
    
    milestones.push({
      name: "Mastery & Implementation (75-100%)",
      tasks: [
        { title: "Create a portfolio showing your new skills" },
        { title: "Work on final project applying learned concepts" },
        { title: "Connect with experts in the field" },
        { title: "Share your learning journey with others" },
        { title: "Plan how to continue developing this skill" }
      ]
    });
  }
  
  return { milestones: milestones.slice(0, milestoneCount) };
};

/**
 * Generate milestones for Career goals
 */
const generateCareerMilestones = (
  title: string, 
  description: string = '', 
  timeSpanInDays: number,
  milestoneCount: number
): GeneratedMilestonesOutput => {
  const isJobSearchGoal = title.toLowerCase().includes('job') || 
                         title.toLowerCase().includes('career') || 
                         title.toLowerCase().includes('interview') ||
                         description.toLowerCase().includes('job') ||
                         description.toLowerCase().includes('career') ||
                         description.toLowerCase().includes('interview');
  
  const isSkillDevelopmentGoal = title.toLowerCase().includes('skill') || 
                               title.toLowerCase().includes('learn') || 
                               title.toLowerCase().includes('develop') ||
                               description.toLowerCase().includes('skill') ||
                               description.toLowerCase().includes('learn') ||
                               description.toLowerCase().includes('develop');
  
  const milestones: GeneratedMilestone[] = [];
  
  if (isJobSearchGoal) {
    milestones.push({
      name: "Career Assessment (0-25%)",
      tasks: [
        { title: "Update your resumé with recent achievements" },
        { title: "Identify 3 target companies or positions" },
        { title: "Create a compelling LinkedIn headline" },
        { title: "Research industry salary expectations" },
        { title: "Reconnect with a professional contact" }
      ]
    });
    
    milestones.push({
      name: "Application Preparation (25-50%)",
      tasks: [
        { title: "Tailor your cover letter for a specific role" },
        { title: "Request a recommendation from a colleague" },
        { title: "Practice your elevator pitch" },
        { title: "Set up job alerts on relevant platforms" },
        { title: "Research company culture for interviews" }
      ]
    });
    
    milestones.push({
      name: "Active Job Search (50-75%)",
      tasks: [
        { title: "Apply to three promising positions" },
        { title: "Follow up on previous applications" },
        { title: "Prepare for common interview questions" },
        { title: "Schedule an informational interview" },
        { title: "Update your portfolio with relevant projects" }
      ]
    });
    
    milestones.push({
      name: "Interview Success (75-100%)",
      tasks: [
        { title: "Research the company before interview" },
        { title: "Prepare questions to ask the interviewer" },
        { title: "Practice with a mock interview session" },
        { title: "Plan your interview outfit and logistics" },
        { title: "Send a thoughtful thank-you email after interview" }
      ]
    });
  }
  else if (isSkillDevelopmentGoal) {
    milestones.push({
      name: "Skill Assessment (0-25%)",
      tasks: [
        { title: "Research best resources for learning this skill" },
        { title: "Take a baseline assessment of current abilities" },
        { title: "Set up learning schedule in your calendar" },
        { title: "Join community of learners in this field" },
        { title: "Identify how this skill will advance your career" }
      ]
    });
    
    milestones.push({
      name: "Fundamental Practice (25-50%)",
      tasks: [
        { title: "Complete 30 minutes of focused skill practice" },
        { title: "Apply new technique to a small project" },
        { title: "Get feedback from someone more experienced" },
        { title: "Document your learning progress in Gryt" },
        { title: "Identify areas that need more attention" }
      ]
    });
    
    milestones.push({
      name: "Advanced Application (50-75%)",
      tasks: [
        { title: "Apply skill to solve real workplace challenge" },
        { title: "Create portfolio piece showcasing this skill" },
        { title: "Teach a basic concept to reinforce learning" },
        { title: "Connect with mentor for guidance" },
        { title: "Plan how to incorporate skill into daily work" }
      ]
    });
    
    milestones.push({
      name: "Professional Integration (75-100%)",
      tasks: [
        { title: "Update resumé to highlight new skill" },
        { title: "Seek opportunities to use skill at work" },
        { title: "Share your expertise with colleagues" },
        { title: "Plan next level of skill development" },
        { title: "Measure impact of skill on your performance" }
      ]
    });
  }
  else {
    milestones.push({
      name: "Career Planning (0-25%)",
      tasks: [
        { title: "Define your ideal professional outcome" },
        { title: "Identify gaps between current and desired state" },
        { title: "Research industry trends and opportunities" },
        { title: "Connect with someone in your target role" },
        { title: "Create action items for your professional growth" }
      ]
    });
    
    milestones.push({
      name: "Building Foundations (25-50%)",
      tasks: [
        { title: "Update professional profiles and materials" },
        { title: "Learn one new relevant industry concept" },
        { title: "Attend networking event or webinar" },
        { title: "Seek feedback on your professional strengths" },
        { title: "Schedule monthly career development time" }
      ]
    });
    
    milestones.push({
      name: "Professional Growth (50-75%)",
      tasks: [
        { title: "Take initiative on high-visibility project" },
        { title: "Share industry insights with colleagues" },
        { title: "Request additional responsibilities aligned with goals" },
        { title: "Document recent achievements for performance review" },
        { title: "Develop leadership skills through practice" }
      ]
    });
    
    milestones.push({
      name: "Career Advancement (75-100%)",
      tasks: [
        { title: "Prepare case for advancement or transition" },
        { title: "Schedule meeting with decision makers" },
        { title: "Create 90-day plan for new role or responsibilities" },
        { title: "Build support network for next career phase" },
        { title: "Reflect on career journey and achievements" }
      ]
    });
  }
  
  return { milestones: milestones.slice(0, milestoneCount) };
};

/**
 * Generate milestones for Personal goals
 */
const generatePersonalMilestones = (
  title: string, 
  description: string = '', 
  timeSpanInDays: number,
  milestoneCount: number
): GeneratedMilestonesOutput => {
  const isHabitGoal = title.toLowerCase().includes('habit') || 
                     title.toLowerCase().includes('routine') || 
                     description.toLowerCase().includes('habit') ||
                     description.toLowerCase().includes('routine');
  
  const isHobbyGoal = title.toLowerCase().includes('hobby') || 
                     title.toLowerCase().includes('learn') || 
                     description.toLowerCase().includes('hobby') ||
                     description.toLowerCase().includes('learn');
  
  const milestones: GeneratedMilestone[] = [];
  
  if (isHabitGoal) {
    milestones.push({
      name: "Habit Foundation (0-25%)",
      tasks: [
        { title: "Identify your habit trigger or cue" },
        { title: "Set up physical environment for success" },
        { title: "Track your current behavior pattern" },
        { title: "Create visual reminder of your goal" },
        { title: "Remove obstacles to your new habit" }
      ]
    });
    
    milestones.push({
      name: "Consistency Building (25-50%)",
      tasks: [
        { title: "Complete your habit today, even if small" },
        { title: "Link new habit to existing routine" },
        { title: "Celebrate completing your streak in Gryt" },
        { title: "Share your commitment with someone" },
        { title: "Identify what helped you succeed today" }
      ]
    });
    
    milestones.push({
      name: "Habit Strengthening (50-75%)",
      tasks: [
        { title: "Increase duration or difficulty slightly" },
        { title: "Notice how habit completion affects mood" },
        { title: "Prepare for tomorrow's habit success" },
        { title: "Create backup plan for challenging days" },
        { title: "Reflect on benefits you're experiencing" }
      ]
    });
    
    milestones.push({
      name: "Lifestyle Integration (75-100%)",
      tasks: [
        { title: "Examine how habit has changed your routine" },
        { title: "Plan how to maintain during disruptions" },
        { title: "Help someone else develop a similar habit" },
        { title: "Document your journey and insights" },
        { title: "Set new challenge to build upon success" }
      ]
    });
  }
  else if (isHobbyGoal) {
    milestones.push({
      name: "Exploration & Discovery (0-25%)",
      tasks: [
        { title: "Research equipment or materials needed" },
        { title: "Follow 3 experts or creators in this field" },
        { title: "Schedule dedicated time for your hobby" },
        { title: "Learn basic terminology and concepts" },
        { title: "Find local community or online forum" }
      ]
    });
    
    milestones.push({
      name: "Skill Building (25-50%)",
      tasks: [
        { title: "Practice fundamental techniques for 30 minutes" },
        { title: "Complete a beginner-level project" },
        { title: "Share your progress with supportive friends" },
        { title: "Watch tutorial on next-level techniques" },
        { title: "Organize your hobby space or materials" }
      ]
    });
    
    milestones.push({
      name: "Growing Expertise (50-75%)",
      tasks: [
        { title: "Try a more challenging technique or project" },
        { title: "Seek feedback from more experienced hobbyists" },
        { title: "Experiment with a creative variation" },
        { title: "Document your process and improvements" },
        { title: "Learn from mistakes made in previous attempts" }
      ]
    });
    
    milestones.push({
      name: "Mastery & Sharing (75-100%)",
      tasks: [
        { title: "Complete showcase-worthy project" },
        { title: "Share your work with a wider audience" },
        { title: "Help a beginner learn basics of the hobby" },
        { title: "Join event or challenge related to hobby" },
        { title: "Plan next evolution of your skills" }
      ]
    });
  }
  else {
    milestones.push({
      name: "Self-Discovery (0-25%)",
      tasks: [
        { title: "Identify why this goal matters to you" },
        { title: "Create a vision board of your ideal outcome" },
        { title: "Set up tracking system in Gryt" },
        { title: "Schedule non-negotiable time for this goal" },
        { title: "Find someone who will support your journey" }
      ]
    });
    
    milestones.push({
      name: "Building Momentum (25-50%)",
      tasks: [
        { title: "Take one small action toward your goal" },
        { title: "Celebrate consistency in your efforts" },
        { title: "Notice and overcome a specific challenge" },
        { title: "Connect with others on a similar path" },
        { title: "Reflect on early benefits or changes" }
      ]
    });
    
    milestones.push({
      name: "Deepening Practice (50-75%)",
      tasks: [
        { title: "Increase complexity or duration of practice" },
        { title: "Share a milestone victory in Gryt" },
        { title: "Adjust approach based on what you've learned" },
        { title: "Integrate goal work into your identity" },
        { title: "Help someone else with similar aspirations" }
      ]
    });
    
    milestones.push({
      name: "Personal Transformation (75-100%)",
      tasks: [
        { title: "Document changes you've experienced" },
        { title: "Create system to maintain your progress" },
        { title: "Share your journey to inspire others" },
        { title: "Express gratitude to those who supported you" },
        { title: "Set new horizon goals building on success" }
      ]
    });
  }
  
  return { milestones: milestones.slice(0, milestoneCount) };
};

/**
 * Generate milestones for Finance goals
 */
const generateFinanceMilestones = (
  title: string, 
  description: string = '', 
  timeSpanInDays: number,
  milestoneCount: number
): GeneratedMilestonesOutput => {
  const isSavingGoal = title.toLowerCase().includes('save') || 
                      title.toLowerCase().includes('saving') || 
                      description.toLowerCase().includes('save') ||
                      description.toLowerCase().includes('saving');
  
  const isDebtGoal = title.toLowerCase().includes('debt') || 
                    title.toLowerCase().includes('pay off') || 
                    description.toLowerCase().includes('debt') ||
                    description.toLowerCase().includes('pay off');
  
  const milestones: GeneratedMilestone[] = [];
  
  if (isSavingGoal) {
    milestones.push({
      name: "Financial Assessment (0-25%)",
      tasks: [
        { title: "Create spending tracker for daily expenses" },
        { title: "Calculate your current savings rate" },
        { title: "Identify 3 areas to reduce spending" },
        { title: "Set up dedicated savings account" },
        { title: "Automate small recurring savings transfer" }
      ]
    });
    
    milestones.push({
      name: "Budget Optimization (25-50%)",
      tasks: [
        { title: "Review last month's expenses for patterns" },
        { title: "Pack lunch instead of buying today" },
        { title: "Cancel one unused subscription" },
        { title: "Research better deals on recurring bills" },
        { title: "Increase automated savings by 1%" }
      ]
    });
    
    milestones.push({
      name: "Income Growth (50-75%)",
      tasks: [
        { title: "Brainstorm 3 ways to increase income" },
        { title: "Dedicate 1 hour to skill development" },
        { title: "Explore passive income opportunities" },
        { title: "Research salary benchmarks in your field" },
        { title: "Allocate any windfalls to savings" }
      ]
    });
    
    milestones.push({
      name: "Financial Security (75-100%)",
      tasks: [
        { title: "Review and adjust investment allocations" },
        { title: "Increase emergency fund contribution" },
        { title: "Calculate time to financial goal at current rate" },
        { title: "Create plan for reaching next financial milestone" },
        { title: "Share a money-saving tip with a friend" }
      ]
    });
  }
  else if (isDebtGoal) {
    milestones.push({
      name: "Debt Assessment (0-25%)",
      tasks: [
        { title: "List all debts with interest rates and terms" },
        { title: "Calculate total debt and minimum payments" },
        { title: "Choose debt payoff strategy (snowball/avalanche)" },
        { title: "Contact one creditor about better terms" },
        { title: "Find one expense to cut and redirect to debt" }
      ]
    });
    
    milestones.push({
      name: "Payment Optimization (25-50%)",
      tasks: [
        { title: "Make payment above minimum on target debt" },
        { title: "Set up automatic payments for all debts" },
        { title: "Track total debt reduction in Gryt" },
        { title: "Find additional income source for debt payments" },
        { title: "Celebrate paying off smallest debt" }
      ]
    });
    
    milestones.push({
      name: "Debt Reduction (50-75%)",
      tasks: [
        { title: "Review budget for additional payment sources" },
        { title: "Calculate interest saved through early payments" },
        { title: "Check credit score and report" },
        { title: "Redirect newly available funds to next debt" },
        { title: "Share progress milestone in Gryt" }
      ]
    });
    
    milestones.push({
      name: "Financial Freedom (75-100%)",
      tasks: [
        { title: "Plan celebration for becoming debt-free" },
        { title: "Create post-debt financial plan" },
        { title: "Set up savings to prevent future debt" },
        { title: "Document lessons learned through process" },
        { title: "Make final payment on target debt" }
      ]
    });
  }
  else {
    milestones.push({
      name: "Financial Foundations (0-25%)",
      tasks: [
        { title: "Track all expenses for the day" },
        { title: "Identify your top financial values" },
        { title: "Calculate your net worth" },
        { title: "Set up automatic bill payments" },
        { title: "Review recent bank statements for errors" }
      ]
    });
    
    milestones.push({
      name: "Building Financial Habits (25-50%)",
      tasks: [
        { title: "Follow today's spending plan" },
        { title: "Research one investment opportunity" },
        { title: "Learn about tax-advantaged accounts" },
        { title: "Review insurance coverage needs" },
        { title: "Make one money-saving decision today" }
      ]
    });
    
    milestones.push({
      name: "Growing Financial Knowledge (50-75%)",
      tasks: [
        { title: "Calculate key financial ratios" },
        { title: "Adjust investment allocations if needed" },
        { title: "Research optimal savings percentage" },
        { title: "Create financial independence timeline" },
        { title: "Automate one financial task" }
      ]
    });
    
    milestones.push({
      name: "Financial Optimization (75-100%)",
      tasks: [
        { title: "Review progress toward financial goals" },
        { title: "Create estate planning documents" },
        { title: "Optimize tax strategies for next year" },
        { title: "Create financial legacy plan" },
        { title: "Share financial wisdom with someone" }
      ]
    });
  }
  
  return { milestones: milestones.slice(0, milestoneCount) };
};

/**
 * Generate generic milestones for any goal type
 */
const generateGenericMilestones = (
  title: string, 
  description: string = '', 
  timeSpanInDays: number,
  milestoneCount: number
): GeneratedMilestonesOutput => {
  return {
    milestones: [
      {
        name: "Getting Started (0-25%)",
        tasks: [
          { title: "Research best practices for your goal" },
          { title: "Set up tracking system in Gryt" },
          { title: "Schedule dedicated time blocks" },
          { title: "Share your commitment with a friend" },
          { title: "Create visual reminder of your goal" }
        ]
      },
      {
        name: "Building Momentum (25-50%)",
        tasks: [
          { title: "Take action toward your goal today" },
          { title: "Celebrate small victories" },
          { title: "Adjust approach based on early feedback" },
          { title: "Connect with others on similar journey" },
          { title: "Track progress in your Gryt journal" }
        ]
      },
      {
        name: "Overcoming Challenges (50-75%)",
        tasks: [
          { title: "Address a specific obstacle today" },
          { title: "Try a new approach or technique" },
          { title: "Seek advice from someone successful" },
          { title: "Review and adjust your timeline" },
          { title: "Share progress update in Gryt" }
        ]
      },
      {
        name: "Achieving Success (75-100%)",
        tasks: [
          { title: "Document key learnings from your journey" },
          { title: "Prepare to celebrate goal completion" },
          { title: "Plan how to maintain your success" },
          { title: "Share your story to inspire others" },
          { title: "Set next level goals building on achievement" }
        ]
      },
      {
        name: "Securing Long-Term Results (Extension)",
        tasks: [
          { title: "Integrate your success into daily life" },
          { title: "Teach others what you've learned" },
          { title: "Create systems to maintain progress" },
          { title: "Identify new challenges to pursue" },
          { title: "Reflect on personal transformation" }
        ]
      }
    ].slice(0, milestoneCount)
  };
};
