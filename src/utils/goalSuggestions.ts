
import { Goal } from "@/hooks/useGoals";

interface SuggestedGoal {
  title: string;
  description: string;
  category: string;
  confidence: number; // How confident the system is that this goal matches the user (0-100)
}

// Analyze user's goals and generate personalized recommendations
export const analyzeAndSuggestGoals = (goals: Goal[]): SuggestedGoal[] => {
  // Extract categories user is interested in
  const userCategories = goals.map(goal => goal.category);
  const uniqueCategories = [...new Set(userCategories)];
  
  // Analyze completion rates per category
  const categoryAnalysis = uniqueCategories.reduce((acc, category) => {
    const categoryGoals = goals.filter(goal => goal.category === category);
    const avgProgress = categoryGoals.reduce((sum, goal) => sum + goal.progress, 0) / categoryGoals.length;
    
    acc[category] = {
      count: categoryGoals.length,
      avgProgress,
      highestProgress: Math.max(...categoryGoals.map(goal => goal.progress)),
    };
    
    return acc;
  }, {} as Record<string, { count: number; avgProgress: number; highestProgress: number }>);
  
  // Get keywords from goal titles and descriptions
  const keywords = goals.flatMap(goal => {
    const words = (goal.title + " " + (goal.description || ""))
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .split(' ')
      .filter(word => word.length > 3);
    return words;
  });
  
  const keywordFrequency: Record<string, number> = {};
  keywords.forEach(word => {
    keywordFrequency[word] = (keywordFrequency[word] || 0) + 1;
  });
  
  // Generate suggestions based on analysis
  const suggestions: SuggestedGoal[] = [];
  
  // Suggest goals based on category interest and progress patterns
  uniqueCategories.forEach(category => {
    const analysis = categoryAnalysis[category];
    
    // If user has high success in this category, suggest more challenging goals
    if (analysis.avgProgress > 70) {
      if (category === 'Health & Fitness') {
        suggestions.push({
          title: "Take your fitness to the next level",
          description: "Challenge yourself with a more intensive workout routine or train for a specific event like a 10k run or marathon.",
          category,
          confidence: 85,
        });
      } else if (category === 'Education') {
        suggestions.push({
          title: "Master an advanced topic",
          description: "Take your learning to the next level with an advanced course or certification in your field of interest.",
          category,
          confidence: 80,
        });
      } else if (category === 'Career') {
        suggestions.push({
          title: "Develop leadership skills",
          description: "Take on more leadership responsibilities or work toward a promotion by developing key management abilities.",
          category,
          confidence: 85,
        });
      } else if (category === 'Personal') {
        suggestions.push({
          title: "Start a meaningful side project",
          description: "Channel your personal growth into a project that can benefit others or bring you fulfillment.",
          category,
          confidence: 75,
        });
      } else if (category === 'Finance') {
        suggestions.push({
          title: "Create a passive income stream",
          description: "Build upon your financial discipline to create a sustainable source of passive income.",
          category,
          confidence: 80,
        });
      }
    } 
    // If user has moderate success, suggest complementary goals
    else if (analysis.avgProgress > 30) {
      if (category === 'Health & Fitness') {
        suggestions.push({
          title: "Add mindfulness to your routine",
          description: "Complement your physical routine with mental wellness practices like meditation or yoga.",
          category,
          confidence: 75,
        });
      } else if (category === 'Education') {
        suggestions.push({
          title: "Apply your knowledge to a project",
          description: "Put what you've learned into practice with a hands-on project that demonstrates your skills.",
          category,
          confidence: 70,
        });
      } else if (category === 'Career') {
        suggestions.push({
          title: "Expand your professional network",
          description: "Attend industry events or join professional groups to expand your connections and opportunities.",
          category,
          confidence: 75,
        });
      }
    } 
    // If user is struggling in this category, suggest easier entry points
    else {
      if (category === 'Health & Fitness') {
        suggestions.push({
          title: "Build a simple daily habit",
          description: "Start with a small, achievable daily exercise like a 10-minute walk or quick stretch routine.",
          category,
          confidence: 90,
        });
      } else if (category === 'Education') {
        suggestions.push({
          title: "Learn through micro-lessons",
          description: "Try bite-sized learning through short videos or articles that fit easily into your schedule.",
          category,
          confidence: 85,
        });
      } else if (category === 'Finance') {
        suggestions.push({
          title: "Start a small savings challenge",
          description: "Begin with an easy savings goal like putting aside a fixed small amount each week.",
          category,
          confidence: 90,
        });
      }
    }
  });
  
  // Look for gaps in categories and suggest trying new areas
  const allCategories = ['Health & Fitness', 'Education', 'Career', 'Personal', 'Finance'];
  const missingCategories = allCategories.filter(cat => !uniqueCategories.includes(cat));
  
  missingCategories.forEach(category => {
    if (category === 'Health & Fitness') {
      suggestions.push({
        title: "Start a simple fitness routine",
        description: "Begin your fitness journey with a beginner-friendly exercise plan that fits your schedule.",
        category,
        confidence: 65,
      });
    } else if (category === 'Education') {
      suggestions.push({
        title: "Learn something new each week",
        description: "Dedicate time to learning something new that interests you, even if it's just for 20 minutes per week.",
        category,
        confidence: 60,
      });
    } else if (category === 'Career') {
      suggestions.push({
        title: "Develop a valuable career skill",
        description: "Identify and develop a skill that could help advance your career or open new opportunities.",
        category,
        confidence: 60,
      });
    } else if (category === 'Personal') {
      suggestions.push({
        title: "Begin a gratitude practice",
        description: "Start recording three things you're grateful for each day to improve wellbeing and perspective.",
        category,
        confidence: 65,
      });
    } else if (category === 'Finance') {
      suggestions.push({
        title: "Create a simple budget",
        description: "Start tracking your expenses and create a basic budget to gain control of your finances.",
        category,
        confidence: 70,
      });
    }
  });
  
  // If user has very few goals, suggest starter goals
  if (goals.length <= 2) {
    suggestions.push({
      title: "Read 10 pages daily",
      description: "Build a consistent reading habit by committing to just 10 pages every day.",
      category: "Personal",
      confidence: 85,
    });
    suggestions.push({
      title: "Daily water intake goal",
      description: "Improve your health by ensuring you drink enough water each day.",
      category: "Health & Fitness",
      confidence: 90,
    });
  }
  
  // Sort by confidence and return top suggestions
  return suggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5); // Limit to top 5 suggestions
};
