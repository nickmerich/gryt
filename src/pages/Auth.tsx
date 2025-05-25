
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import GhibliButton from '@/components/GhibliButton';
import { Eye, EyeOff, Target, Puzzle, TrendingUp, Link, Users, Sparkles, Zap, Shield } from 'lucide-react';
import { Navigate, Link as RouterLink, useSearchParams } from 'react-router-dom';
import PasswordResetForm from '@/components/PasswordResetForm';
import UpdatePasswordForm from '@/components/UpdatePasswordForm';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [searchParams] = useSearchParams();

  // Check if this is a password reset mode
  const mode = searchParams.get('mode');
  const isPasswordReset = mode === 'reset';

  // Redirect if user is already authenticated (except for password reset)
  if (user && !isPasswordReset) {
    return <Navigate to="/" />;
  }

  // Show password update form if in reset mode
  if (isPasswordReset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md">
          <UpdatePasswordForm />
        </div>
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    
    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        let errorMessage = 'Failed to sign in';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before signing in.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    
    setIsLoading(true);
    try {
      const { error, emailConfirmationRequired } = await signUp(email, password);
      if (error) {
        let errorMessage = 'Failed to create account';
        
        if (error.message.includes('already registered')) {
          errorMessage = 'This email is already registered. Try signing in instead.';
        } else if (error.message.includes('password')) {
          errorMessage = 'Password should be at least 6 characters long.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
      } else if (emailConfirmationRequired) {
        setShowEmailConfirmation(true);
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }
    
    if (!password.trim()) {
      toast.error('Please enter your password');
      return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) {
      toast.error('Password should be at least 6 characters long');
      return false;
    }
    
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Show password reset form
  if (showPasswordReset) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md">
          <PasswordResetForm onBack={() => setShowPasswordReset(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gryt-blue/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gryt-blue/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gryt-purple/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left Hero Section */}
        <div className="lg:w-3/5 flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-2xl space-y-12 animate-fade-in">
            {/* Logo and Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gryt-blue to-gryt-purple rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-gryt-blue to-gryt-purple bg-clip-text text-transparent">
                  Gryt
                </h1>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  Where Goals Meet
                  <span className="bg-gradient-to-r from-gryt-blue to-gryt-purple bg-clip-text text-transparent"> Achievement</span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Your AI-powered companion that learns and adapts alongside you on your journey to success.
                </p>
              </div>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-gryt-blue/20 to-gryt-blue/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-gryt-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Smart Goal Setting</h3>
                  <p className="text-sm text-slate-600">AI helps you break down big dreams into achievable milestones</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-gryt-purple/20 to-gryt-purple/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gryt-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Progress Tracking</h3>
                  <p className="text-sm text-slate-600">Beautiful visualizations that keep you motivated</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-gryt-blue/20 to-gryt-blue/10 rounded-xl flex items-center justify-center">
                  <Link className="w-6 h-6 text-gryt-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Smart Integrations</h3>
                  <p className="text-sm text-slate-600">Connect your favorite apps for seamless progress updates</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-gryt-purple/20 to-gryt-purple/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-gryt-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Community Support</h3>
                  <p className="text-sm text-slate-600">Join circles of like-minded achievers</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Auth Section */}
        <div className="lg:w-2/5 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm border-l border-white/20">
          <div className="w-full max-w-md space-y-8">
            {showEmailConfirmation ? (
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Check Your Email</h3>
                    <p className="text-slate-600">We've sent a verification link to your email address. Click the link to complete your registration.</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setShowEmailConfirmation(false);
                      setEmail('');
                      setPassword('');
                    }}
                    className="w-full bg-gradient-to-r from-gryt-blue to-gryt-purple hover:from-gryt-blue/90 hover:to-gryt-purple/90 text-white rounded-2xl h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h3>
                  <p className="text-slate-600">Sign in to continue your journey</p>
                </div>
                
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
                          className="h-12 rounded-2xl border-slate-200 bg-white/80 focus:bg-white transition-all duration-200 placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password-signin" className="text-slate-700 font-medium">Password</Label>
                          <button 
                            type="button"
                            onClick={() => setShowPasswordReset(true)}
                            className="text-sm text-gryt-blue hover:text-gryt-purple transition-colors"
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
                            className="h-12 rounded-2xl border-slate-200 bg-white/80 focus:bg-white pr-12 transition-all duration-200 focus:border-black focus:ring-1 focus:ring-black"
                          />
                          <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-gryt-blue to-gryt-purple hover:from-gryt-blue/90 hover:to-gryt-purple/90 text-white rounded-2xl h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
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
                            className="h-12 rounded-2xl border-slate-200 bg-white/80 focus:bg-white pr-12 transition-all duration-200 placeholder:text-slate-400 focus:border-black focus:ring-1 focus:ring-black"
                            minLength={6}
                            placeholder="At least 6 characters"
                          />
                          <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-gryt-purple to-gryt-blue hover:from-gryt-purple/90 hover:to-gryt-blue/90 text-white rounded-2xl h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
                
                <div className="text-center text-sm text-slate-500 mt-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Protected by Supabase Authentication</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
