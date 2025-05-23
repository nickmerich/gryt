
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link2, Zap, Shield, RefreshCw } from 'lucide-react';

const IntegrationsFeature = () => {
  const integrationCategories = [
    {
      name: 'Fitness',
      services: ['Strava', 'Garmin', 'WHOOP', 'Apple Health'],
      examples: 'Track runs, rides, workouts, heart rate'
    },
    {
      name: 'Learning',
      services: ['Duolingo', 'Anki', 'Goodreads'],
      examples: 'Language progress, flashcards, books read'
    },
    {
      name: 'Creativity',
      services: ['GitHub', 'YouTube', 'Figma'],
      examples: 'Code commits, videos uploaded, designs created'
    },
    {
      name: 'Games',
      services: ['Chess.com', 'Lichess'],
      examples: 'Games played, rating progress, puzzles solved'
    }
  ];

  return (
    <div className="py-12 bg-gryt-light/20">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Connect Your Tools & Track Progress Automatically</h2>
          <p className="text-lg text-gray-600">
            Link your favorite apps and services to your Goal Circles for automatic progress tracking, 
            more consistent updates, and deeper insights into your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Link2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Seamless Connections</h3>
              <p className="text-gray-600">
                Connect once and your Goal Circles update automatically from the apps you already use.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Effortless Progress</h3>
              <p className="text-gray-600">
                No more manual updates. Your progress syncs automatically as you complete activities.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">
                You control exactly what data is shared and can revoke access at any time.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <RefreshCw className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Daily Syncing</h3>
              <p className="text-gray-600">
                Your data syncs daily or in real-time (when available) to keep your circles updated.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6 text-center">Connect Your Favorite Tools</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {integrationCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border">
                <h4 className="font-semibold text-lg mb-3">{category.name}</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {category.services.map((service, i) => (
                    <span 
                      key={i} 
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{category.examples}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/integrations">
              <Button size="lg" className="bg-gryt-blue hover:bg-gryt-blue/90">
                Explore All Integrations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsFeature;
