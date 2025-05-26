
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailConfirmationViewProps {
  onBack: () => void;
}

const EmailConfirmationView: React.FC<EmailConfirmationViewProps> = ({ onBack }) => {
  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-primary/20">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-success to-success-hover rounded-2xl flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Check Your Email</h3>
          <p className="text-slate-700 font-medium">We've sent a verification link to your email address. Click the link to complete your registration.</p>
        </div>
        <Button 
          onClick={onBack}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmationView;
