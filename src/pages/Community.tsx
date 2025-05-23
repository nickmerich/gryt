
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Star, MessageSquare, Share } from "lucide-react";
import MainNav from '@/components/MainNav';
import GhibliLayout from '@/components/GhibliLayout';

const Community = () => {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <GhibliLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gryt-dark dark:text-gryt-gray mb-2">Gryt Community</h1>
          <p className="text-lg text-gryt-blue/80 dark:text-gryt-light/80">
            Connect, share, and grow with fellow Gryt members
          </p>
        </div>

        <Tabs 
          defaultValue="events" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="events" className="flex gap-2 items-center">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="recognition" className="flex gap-2 items-center">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Recognition</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex gap-2 items-center">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex gap-2 items-center">
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events & Challenges</h2>
              <p>Events and challenges section coming soon!</p>
            </div>
          </TabsContent>

          <TabsContent value="recognition">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">Member Spotlights</h2>
              <p>User recognition and achievements section coming soon!</p>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">Community Feedback</h2>
              <p>Feedback forums and suggestion box coming soon!</p>
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">Share Your Progress</h2>
              <p>Social sharing tools and integrations coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GhibliLayout>
  );
};

export default Community;
