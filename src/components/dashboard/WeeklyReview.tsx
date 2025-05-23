
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import GhibliCard from '@/components/GhibliCard';
import { Calendar, BarChart, ChevronRight } from 'lucide-react';
import { Goal } from '@/hooks/useGoals';

interface WeeklyReviewProps {
  goals?: Goal[];
  isLoading: boolean;
}

const WeeklyReview = ({ goals = [], isLoading }: WeeklyReviewProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="ghibli-subtitle">Weekly Review</h2>
        <Button variant="ghost" className="text-gryt-blue p-0">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-gryt-dark text-base dark:text-gryt-light">
              <Calendar className="w-4 h-4 mr-2 text-gryt-red" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : goals?.filter(goal => {
              const daysLeft = Math.ceil(
                (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              return daysLeft <= 14 && daysLeft > 0;
            }).length > 0 ? (
              <ul className="space-y-3">
                {goals?.filter(goal => {
                  const daysLeft = Math.ceil(
                    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  return daysLeft <= 14 && daysLeft > 0;
                }).slice(0, 3).map(goal => {
                  const daysLeft = Math.ceil(
                    (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <li key={goal.id} className="flex justify-between">
                      <span className="text-gray-700">{goal.title}</span>
                      <span className={`font-medium ${
                        daysLeft <= 3 ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No upcoming deadlines in the next 14 days.</p>
            )}
          </CardContent>
        </GhibliCard>

        <GhibliCard>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-gryt-dark text-base dark:text-gryt-light">
              <BarChart className="w-4 h-4 mr-2 text-green-500" />
              Progress Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : goals?.filter(goal => goal.progress > 0).length > 0 ? (
              <ul className="space-y-3">
                {goals
                  ?.filter(goal => goal.progress > 0)
                  .sort((a, b) => b.progress - a.progress)
                  .slice(0, 3)
                  .map(goal => (
                    <li key={goal.id} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-700">{goal.title}</span>
                        <span className="font-medium text-blue-600">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-1.5" />
                    </li>
                  ))
                }
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No progress recorded yet. Start working on your goals!</p>
            )}
          </CardContent>
        </GhibliCard>
      </div>
    </div>
  );
};

export default WeeklyReview;
