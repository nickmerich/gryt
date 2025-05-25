
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
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome to Gryt</h3>
        <p className="text-slate-600">Start your journey to achieving your goals</p>
      </div>
      
      {authError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-red-700">
            {authError}
          </div>
        </div>
      )}
      
      <Tabs defaultValue="signin" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 rounded-2xl p-1">
          <TabsTrigger 
            value="signin" 
            className="rounded-xl font-medium data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger 
            value="signup" 
            className="rounded-xl font-medium data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin" className="space-y-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-signin" className="text-slate-700 font-medium">Email</Label>
              <Input
                id="email-signin"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 rounded-2xl border-slate-200 bg-white/80 focus:bg-white transition-all duration-200 placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password-signin" className="text-slate-700 font-medium">Password</Label>
                <button 
                  type="button"
                  onClick={onPasswordReset}
                  className="text-sm text-gryt-blue hover:text-gryt-purple transition-colors"
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
                  className="h-12 rounded-2xl border-slate-200 bg-white/80 focus:bg-white pr-12 transition-all duration-200 focus:border-black focus:ring-1 focus:ring-black"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-black transition-colors disabled:opacity-50"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gryt-blue to-gryt-purple hover:from-gryt-blue/90 hover:to-gryt-purple/90 text-white rounded-2xl h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="signup" className="space-y-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-signup" className="text-slate-700 font-medium">Email</Label>
              <Input
                id="email-signup"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-12 rounded-2xl border-slate-200 bg-white/80 focus:bg-white transition-all duration-200 placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-signup" className="text-slate-700 font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password-signup"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-2xl border-slate-200 bg-white/80 focus:bg-white pr-12 transition-all duration-200 placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black"
                  minLength={6}
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-black transition-colors disabled:opacity-50"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gryt-purple to-gryt-blue hover:from-gryt-purple/90 hover:to-gryt-blue/90 text-white rounded-2xl h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
      
      <div className="text-center text-sm text-slate-500 mt-6">
        <div className="flex items-center justify-center space-x-2">
          <Shield className="w-4 h-4" />
          <span>Secure authentication powered by Supabase</span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
