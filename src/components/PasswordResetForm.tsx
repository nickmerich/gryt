
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PasswordResetFormProps {
  onBack: () => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formError, setFormError] = useState('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!email.trim()) {
      setFormError('Please enter your email address');
      toast.error('Please enter your email address');
      return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFormError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Sending password reset email to:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      });
      
      if (error) {
        console.error('Password reset error:', error);
        setFormError(error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.log('Password reset email sent successfully');
        setIsEmailSent(true);
        toast.success('Password reset email sent! Check your inbox.');
      }
    } catch (error: any) {
      console.error('Unexpected error during password reset:', error);
      setFormError(error.message || 'An unexpected error occurred');
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <Card className="ghibli-card shadow-lg border-2 border-gryt-gray/20 dark:border-gryt-blue/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gryt-blue/10 rounded-full flex items-center justify-center">
            <Mail className="h-6 w-6 text-gryt-blue" />
          </div>
          <CardTitle className="text-xl font-medium text-gryt-dark dark:text-gryt-gray">Check Your Email</CardTitle>
          <CardDescription>
            We've sent a password reset link to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-gryt-dark/60 dark:text-gryt-light/60">
            Click the link in the email to reset your password. The link will expire in 24 hours.
          </p>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsEmailSent(false);
                setEmail('');
              }}
              className="w-full text-gryt-blue hover:text-gryt-blue/80"
            >
              Try Different Email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="ghibli-card shadow-lg border-2 border-gryt-gray/20 dark:border-gryt-blue/20">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gryt-dark dark:text-gryt-gray">Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-sm text-red-600">
              <AlertTriangle size={16} />
              {formError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/50 dark:bg-gryt-dark/50"
            />
          </div>
          <div className="space-y-2">
            <Button
              type="submit"
              className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <Button 
              type="button"
              variant="ghost" 
              onClick={onBack}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordResetForm;
