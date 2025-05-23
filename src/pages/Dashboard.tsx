
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ArrowUpRight, Calendar, Clock, Target, Flame, Activity, BarChart as BarChartIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import MainNav from '@/components/MainNav';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

// Sample data - in a real app, this would come from API or context
const streakData = [
  { name: 'Mon', streaks: 1 },
  { name: 'Tue', streaks: 3 },
  { name: 'Wed', streaks: 4 },
  { name: 'Thu', streaks: 2 },
  { name: 'Fri', streaks: 5 },
  { name: 'Sat', streaks: 6 },
  { name: 'Sun', streaks: 4 },
];

const effortData = [
  { name: 'Week 1', hours: 4 },
  { name: 'Week 2', hours: 6 },
  { name: 'Week 3', hours: 5 },
  { name: 'Week 4', hours: 8 },
  { name: 'Week 5', hours: 9 },
  { name: 'Week 6', hours: 7 },
];

const completionRateData = [
  { name: 'Health', value: 70 },
  { name: 'Career', value: 45 },
  { name: 'Education', value: 85 },
  { name: 'Personal', value: 60 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const goalTrends = [
  {
    goal: 'Run a Marathon',
    previous: 50,
    current: 65,
    change: '+15%',
    category: 'Health & Fitness'
  },
  {
    goal: 'Learn Spanish',
    previous: 30,
    current: 40,
    change: '+10%',
    category: 'Education'
  },
  {
    goal: 'Save $10,000',
    previous: 20,
    current: 35,
    change: '+15%',
    category: 'Finance'
  }
];

const activityLog = [
  { date: '2024-05-22', action: 'Completed 5K run training', goal: 'Run a Marathon' },
  { date: '2024-05-21', action: 'Practiced Spanish vocabulary', goal: 'Learn Spanish' },
  { date: '2024-05-21', action: 'Added $500 to savings', goal: 'Save $10,000' },
  { date: '2024-05-19', action: 'Completed interval training', goal: 'Run a Marathon' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <MainNav />
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="text-blue-600 border-blue-600"
          >
            Back to Home
          </Button>
        </div>

        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Progress <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600">Track your journey and visualize your growth over time</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Streaks</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">6 days</div>
              <p className="text-xs text-gray-500">Current best streak</p>
              <div className="mt-4 h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={streakData}>
                    <Bar dataKey="streaks" fill="#fb923c" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Goal Completion</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">67%</div>
              <p className="text-xs text-gray-500">Average across all goals</p>
              <Progress value={67} className="mt-4 h-2" />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Monthly target: 75%</span>
                <span className="text-xs text-orange-500">8% to go</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Weekly Effort</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">9 hours</div>
              <p className="text-xs text-gray-500">15% increase from last week</p>
              <div className="mt-4 h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={effortData.slice(-4)}>
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Activity className="h-5 w-5 text-blue-500" />
                Weekly Streak Progression
              </CardTitle>
              <CardDescription>Your daily consistency over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer 
                  config={{
                    streaks: { color: '#f97316', label: 'Daily Streaks' },
                    grid: { color: '#e2e8f0' }
                  }}
                >
                  <BarChart data={streakData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis 
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                      tickCount={5}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                    />
                    <Bar 
                      dataKey="streaks" 
                      name="Daily Streaks"
                      fill="#f97316" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <BarChartIcon className="h-5 w-5 text-blue-500" />
                Goal Completion by Category
              </CardTitle>
              <CardDescription>Progress breakdown across different areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={completionRateData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {completionRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                      labelFormatter={(name) => `Category: ${name}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {completionRateData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goal Progress Trends */}
        <div className="mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <ArrowUpRight className="h-5 w-5 text-green-500" />
                Goal Progress Trends
              </CardTitle>
              <CardDescription>How your goals are trending over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Goal</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Previous</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {goalTrends.map((goal, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{goal.goal}</TableCell>
                      <TableCell>{goal.category}</TableCell>
                      <TableCell>{goal.previous}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {goal.current}%
                          <Progress value={goal.current} className="w-20 h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-green-600 font-medium">{goal.change}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-5 w-5 text-blue-500" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest goal-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                    <div>
                      <h4 className="text-sm font-medium">{activity.action}</h4>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                        <span>Goal: {activity.goal}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
