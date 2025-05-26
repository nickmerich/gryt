import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface AuthFormProps {
  onPasswordReset: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onPasswordReset }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const validateInputs = () => {
    setAuthError('');
    
    if (!email.trim()) {
      setAuthError('Please enter your email address');
      return false;
    }
    
    if (!password.trim()) {
      setAuthError('Please enter your password');
      return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setAuthError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) {
      setAuthError('Password should be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    
    setIsLoading(true);
    setAuthError('');
    
    try {
      console.log('Attempting sign in for:', email);
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Sign in error:', error);
        let errorMessage = 'Failed to sign in';
        
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before signing in. Check your email for a verification link.';
        } else if (error.message?.includes('signup_disabled')) {
          errorMessage = 'New signups are currently disabled. Please contact support.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        setAuthError(errorMessage);
        toast.error(errorMessage);
      } else {
        console.log('Sign in successful');
        toast.success('Successfully signed in!');
      }
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      const errorMessage = error.message || 'An unexpected error occurred during sign in';
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    
    setIsLoading(true);
    setAuthError('');
    
    try {
      console.log('Attempting sign up for:', email);
      const { error, emailConfirmationRequired } = await signUp(email, password);
      
      if (error) {
        console.error('Sign up error:', error);
        let errorMessage = 'Failed to create account';
        
        if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
          errorMessage = 'This email is already registered. Please try signing in instead or use a different email.';
        } else if (error.message?.includes('password')) {
          errorMessage = 'Password should be at least 6 characters long and meet security requirements.';
        } else if (error.message?.includes('signup_disabled')) {
          errorMessage = 'New signups are currently disabled. Please contact support.';
        } else if (error.message?.includes('Captcha')) {
          errorMessage = 'CAPTCHA verification failed. Please try again or contact support if the issue persists.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        setAuthError(errorMessage);
        toast.error(errorMessage);
      } else {
        console.log('Sign up successful');
        if (emailConfirmationRequired) {
          toast.success('Account created! Please check your email to verify your account before signing in.');
        } else {
          toast.success('Account created successfully!');
        }
      }
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      const errorMessage = error.message || 'An unexpected error occurred during account creation';
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-card/95 backdrop-blur-lg rounded-lg p-8 shadow-xl border-2 border-card-border">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Welcome to Gryt</h1>
        <p className="text-lg text-muted-foreground font-medium">Start your journey to achieving your goals</p>
      </div>
      
      {authError && (
        <div className="mb-6 p-4 bg-error-background border-2 border-error/20 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
          <div className="text-sm text-error font-medium leading-relaxed">
            {authError}
          </div>
        </div>
      )}
      
      <Tabs defaultValue="signin" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted rounded-md p-1 h-12 relative">
          <TabsTrigger 
            value="signin" 
            className="rounded-md font-semibold text-base h-10 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md text-muted-foreground transition-all duration-200 relative z-10"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger 
            value="signup" 
            className="rounded-md font-semibold text-base h-10 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md text-muted-foreground transition-all duration-200 relative z-10"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin" className="space-y-4 mt-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-signin" className="text-foreground font-semibold text-base">Email Address</Label>
              <Input
                id="email-signin"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 text-base font-medium"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password-signin" className="text-foreground font-semibold text-base">Password</Label>
                <button 
                  type="button"
                  onClick={onPasswordReset}
                  className="text-sm text-primary hover:text-primary-hover transition-colors font-medium underline underline-offset-2"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password-signin"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className="h-12 pr-12 text-base font-medium"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 p-1"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="default"
              size="lg"
              className="w-full font-bold text-base"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="signup" className="space-y-4 mt-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-signup" className="text-foreground font-semibold text-base">Email Address</Label>
              <Input
                id="email-signup"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 text-base font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-signup" className="text-foreground font-semibold text-base">Password</Label>
              <div className="relative">
                <Input
                  id="password-signup"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 pr-12 text-base font-medium"
                  minLength={6}
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 p-1"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              variant="secondary"
              size="lg"
              className="w-full font-bold text-base"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <div className="flex items-center justify-center space-x-2">
          <Shield className="w-4 h-4" />
          <span className="font-medium">Secure authentication powered by Supabase</span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
