
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailConfirmationViewProps {
  onBack: () => void;
}

const EmailConfirmationView: React.FC<EmailConfirmationViewProps> = ({ onBack }) => {
  return (
    <div className="bg-background border-2 border-border rounded-lg p-8">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-foreground rounded-lg flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-background" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h3>
          <p className="text-muted-foreground font-medium">We've sent a verification link to your email address. Click the link to complete your registration.</p>
        </div>
        <Button 
          onClick={onBack}
          className="w-full h-12 font-semibold"
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmationView;
