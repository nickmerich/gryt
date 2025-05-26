
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
      <Card className="border-2 border-border bg-background">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-muted rounded-full flex items-center justify-center border-2 border-border">
            <Mail className="h-6 w-6 text-foreground" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">Check Your Email</CardTitle>
          <CardDescription className="text-muted-foreground">
            We've sent a password reset link to <strong className="text-foreground">{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
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
              className="w-full"
            >
              Try Different Email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-border bg-background">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">Reset Password</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          {formError && (
            <div className="p-3 bg-muted border-2 border-foreground rounded-md flex items-center gap-2 text-sm text-foreground">
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
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Button
              type="submit"
              className="w-full"
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
