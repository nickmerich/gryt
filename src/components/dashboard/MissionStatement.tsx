
import { Heart, Target, Zap, Shield } from 'lucide-react';
import GhibliCard from '@/components/GhibliCard';

const MissionStatement = () => {
  return (
    <div className="mb-8 space-y-6">
      {/* Core Problem & Urgency */}
      <GhibliCard className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 p-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-red-600 p-4 rounded-full">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-black text-red-900">
            The Crisis is Real
          </h2>
          
          <p className="text-red-800 text-lg leading-relaxed max-w-4xl mx-auto">
            Today's dads and professionals aged 25–45 struggle deeply with maintaining balance, 
            battling self-destructive behaviors, and feeling disconnected spiritually and emotionally. 
            <strong className="text-red-900"> The urgency is now:</strong> rising rates of burnout, addiction, 
            mental health crises, and family breakdowns demand immediate, effective intervention.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center space-y-2">
              <div className="bg-red-600 p-3 rounded-full w-fit mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-red-900">Spiritual Emptiness</h3>
              <p className="text-red-700 text-sm">Disconnected from purpose and faith</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="bg-red-600 p-3 rounded-full w-fit mx-auto">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-red-900">Physical Decline</h3>
              <p className="text-red-700 text-sm">Poor health habits and energy</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="bg-red-600 p-3 rounded-full w-fit mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-red-900">Leadership Crisis</h3>
              <p className="text-red-700 text-sm">Struggling to lead family and self</p>
            </div>
          </div>
        </div>
      </GhibliCard>

      {/* Our Unique Edge */}
      <GhibliCard className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Why The Gryt Wins
            </h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              <strong>Relatable authenticity combined with relentless innovation.</strong> 
              Led by someone who's walked your path and built what he needed to change his life.
            </p>
          </div>
          
          <div className="bg-red-600 text-white rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Meet Nick Merich</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-lg">The Journey:</h4>
                <ul className="space-y-1 text-red-100">
                  <li>• 35-year-old recommitted Christian</li>
                  <li>• Recently sober, down 40 lbs (260→220)</li>
                  <li>• 5x marathon runner training for sub-4</li>
                  <li>• Dedicated 2x boy dad</li>
                  <li>• Former college baseball player</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-bold text-lg">The Credentials:</h4>
                <ul className="space-y-1 text-red-100">
                  <li>• Certified strength coach (20+ athletes)</li>
                  <li>• Multiple business exits (music tech)</li>
                  <li>• 5-year CMU Entrepreneurship Mentor</li>
                  <li>• Pittsburgh Dad Day Run Club Lead</li>
                  <li>• Pursuing NSCA-CPT, CSCS, CMPC</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-red-100 text-lg italic">
                "This isn't theory. It's testimony-powered transformation."
              </p>
            </div>
          </div>
        </div>
      </GhibliCard>
    </div>
  );
};

export default MissionStatement;
