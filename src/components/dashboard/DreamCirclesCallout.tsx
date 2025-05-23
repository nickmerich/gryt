
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';

const DreamCirclesCallout = () => {
  return (
    <GhibliCard className="mb-8 overflow-hidden" glow={true}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 p-6">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-gryt-blue mr-2" />
            <h3 className="text-xl font-semibold text-gryt-blue">Dream Circles</h3>
          </div>
          <p className="mb-4 text-gryt-dark dark:text-gryt-gray">
            Join micro-communities centered around specific goals. Connect with others on similar journeys, 
            share progress, overcome challenges together, and celebrate each other's wins.
          </p>
          <Link to="/circles">
            <GhibliButton className="bg-gryt-blue hover:bg-gryt-blue/90 text-white" glowColor="blue">
              Find Your Circle
            </GhibliButton>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-gryt-blue to-gryt-purple md:w-1/3 p-6 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-3xl font-bold mb-2">6+</div>
            <div className="text-sm">Active Dream Circles</div>
          </div>
        </div>
      </div>
    </GhibliCard>
  );
};

export default DreamCirclesCallout;
