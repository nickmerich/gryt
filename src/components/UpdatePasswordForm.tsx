
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const UpdatePasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this is a password reset session
    const checkSession = async () => {
      try {
        console.log('Checking session for password reset...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
          toast.error('Invalid or expired reset link');
          navigate('/auth');
          return;
        }
        
        if (!session) {
          console.warn('No active session found for password reset');
          toast.error('Invalid or expired reset link. Please request a new one.');
          navigate('/auth');
          return;
        }
        
        console.log('Valid session found for password reset');
      } catch (error: any) {
        console.error('Unexpected error checking session:', error);
        toast.error('An unexpected error occurred');
        navigate('/auth');
      }
    };
    
    checkSession();
  }, [navigate]);

  const validatePassword = (pass: string): boolean => {
    if (pass.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!password.trim() || !confirmPassword.trim()) {
      setFormError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }
    
    if (!validatePassword(password)) {
      toast.error('Password should be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Updating password...');
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) {
        console.error('Password update error:', error);
        setFormError(`Error updating password: ${error.message}`);
        toast.error(`Error updating password: ${error.message}`);
      } else {
        console.log('Password updated successfully');
        setIsUpdated(true);
        toast.success('Password updated successfully!');
      }
    } catch (error: any) {
      console.error('Unexpected error updating password:', error);
      setFormError(error.message || 'An unexpected error occurred');
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isUpdated) {
    return (
      <Card className="ghibli-card shadow-lg border-2 border-gryt-gray/20 dark:border-gryt-blue/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <CardTitle className="text-xl font-medium text-gryt-dark dark:text-gryt-gray">Password Updated</CardTitle>
          <CardDescription>
            Your password has been successfully updated
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white"
          >
            Continue to App
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="ghibli-card shadow-lg border-2 border-gryt-gray/20 dark:border-gryt-blue/20">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gryt-dark dark:text-gryt-gray">Update Password</CardTitle>
        <CardDescription>
          Please enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-sm text-red-600">
              <AlertTriangle size={16} />
              {formError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/50 dark:bg-gryt-dark/50 pr-10"
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gryt-dark/60 dark:text-gryt-light/60 hover:text-gryt-blue"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/50 dark:bg-gryt-dark/50 pr-10"
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gryt-dark/60 dark:text-gryt-light/60 hover:text-gryt-blue"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm;
