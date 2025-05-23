
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';

const DreamCirclesCallout = () => {
  return (
    <GhibliCard className="mb-8 p-6">
      <div>
        <div className="flex items-center mb-3">
          <Users className="h-6 w-6 text-gryt-blue mr-2" />
          <h3 className="text-2xl font-semibold text-gryt-blue">Dream Circles</h3>
        </div>
        
        <p className="mb-5 text-gryt-dark dark:text-gryt-gray text-base leading-relaxed max-w-2xl">
          Join micro-communities centered around specific goals. Connect with others on similar journeys, 
          share progress, overcome challenges together, and celebrate each other's wins.
        </p>
        
        <Link to="/circles">
          <GhibliButton className="bg-gryt-blue hover:bg-gryt-blue/90 text-white px-8 py-3 text-lg">
            Find Your Circle
          </GhibliButton>
        </Link>
      </div>
    </GhibliCard>
  );
};

export default DreamCirclesCallout;
