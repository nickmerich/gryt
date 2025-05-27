
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import GhibliButton from '@/components/GhibliButton';
import GhibliCard from '@/components/GhibliCard';

const DreamCirclesCallout = () => {
  return (
    <GhibliCard className="mb-8 p-6">
      <div>
        <div className="flex items-center mb-3">
          <Users className="h-6 w-6 text-foreground mr-2" />
          <h3 className="text-2xl font-semibold text-foreground">Goal Circles</h3>
        </div>
        
        <p className="mb-5 text-foreground text-base leading-relaxed max-w-2xl">
          Join micro-communities centered around specific goals. Connect with others on similar journeys, 
          share progress, overcome challenges together, and celebrate each other's wins.
        </p>
        
        <Link to="/circles">
          <GhibliButton className="bg-foreground hover:bg-muted-foreground text-background px-8 py-3 text-lg">
            Find Your Circle
          </GhibliButton>
        </Link>
      </div>
    </GhibliCard>
  );
};

export default DreamCirclesCallout;
