
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import GhibliButton from '@/components/GhibliButton';
import { Eye, EyeOff, Target, Puzzle, TrendingUp, Link, Users } from 'lucide-react';
import { Navigate, Link as RouterLink } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  // Redirect if user is already authenticated
  if (user) {
    return <Navigate to="/" />;
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - How Gryt Works */}
      <div className="md:w-1/2 bg-gradient-to-br from-gryt-dark/95 to-gryt-blue/70 text-white p-8 flex items-center justify-center">
        <div className="max-w-md space-y-8 slide-animation">
          <div>
            <h1 className="ghibli-title text-4xl mb-4 text-white">🌱 How <span className="text-gryt-red">Gryt</span> Works</h1>
            <p className="text-gryt-gray/80 mb-8">Your companion on the path of personal growth and achievement</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Target className="h-6 w-6 text-gryt-red" />
              </div>
              <div>
                <h3 className="font-medium text-lg">1. Set a Goal That Matters</h3>
                <p className="text-gryt-gray/80">Big or small. Marathon or mindfulness. Choose what moves you.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Puzzle className="h-6 w-6 text-gryt-red" />
              </div>
              <div>
                <h3 className="font-medium text-lg">2. Break It Into Daily Focus</h3>
                <p className="text-gryt-gray/80">We help you turn that goal into small, trackable steps — no fluff, no overwhelm.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <TrendingUp className="h-6 w-6 text-gryt-red" />
              </div>
              <div>
                <h3 className="font-medium text-lg">3. Track Progress, Build Streaks</h3>
                <p className="text-gryt-gray/80">Each day you show up, Gryt tracks it. Progress is progress.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Link className="h-6 w-6 text-gryt-red" />
              </div>
              <div>
                <h3 className="font-medium text-lg">4. Connect Tools You Already Use</h3>
                <p className="text-gryt-gray/80">Sync Strava, Duolingo, Chess.com, and more — progress updates automatically.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Users className="h-6 w-6 text-gryt-red" />
              </div>
              <div>
                <h3 className="font-medium text-lg">5. Join a Circle, Grow Together</h3>
                <p className="text-gryt-gray/80">Find your crew. Share wins. Stay accountable.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <RouterLink to="/how-gryt-works" className="inline-flex items-center text-gryt-red hover:text-gryt-red/80 font-medium">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>

      {/* Right side - Authentication */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-background to-gryt-gray/20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 md:text-left slide-animation">
            <h2 className="text-3xl font-bold text-gryt-dark dark:text-gryt-gray mb-2">
              Welcome to <span className="text-gryt-red">Gryt</span>
            </h2>
            <p className="text-gryt-blue dark:text-gryt-light text-sm">Your AI-powered goal achievement companion</p>
          </div>
          
          {showEmailConfirmation ? (
            <Card className="ghibli-card shadow-lg border-2 border-gryt-gray/20 dark:border-gryt-blue/20">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-gryt-dark dark:text-gryt-gray">Email Verification</CardTitle>
                <CardDescription>Please check your email to complete registration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center">
                  A verification link has been sent to your email address. 
                  Please click on the link to verify your account.
                </p>
                <p className="text-center text-sm text-gryt-blue dark:text-gryt-light">
                  If you don't see the email, please check your spam folder.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <GhibliButton 
                  className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white text-base py-6 font-medium"
                  glowColor="blue"
                  onClick={() => {
                    setShowEmailConfirmation(false);
                    setEmail('');
                    setPassword('');
                  }}
                >
                  Back to Login
                </GhibliButton>
              </CardFooter>
            </Card>
          ) : (
            <Card className="ghibli-card shadow-lg border-2 border-gryt-gray/20 dark:border-gryt-blue/20">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-gryt-dark dark:text-gryt-gray">Authentication</CardTitle>
                <CardDescription>Sign in to your account or create a new one</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="slide-animation">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="signin" className="text-base font-medium">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="text-base font-medium">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-signin">Email</Label>
                          <Input
                            id="email-signin"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/50 dark:bg-gryt-dark/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password-signin">Password</Label>
                            <a href="#" className="text-sm text-gryt-blue hover:text-gryt-red dark:text-gryt-light dark:hover:text-gryt-red">
                              Forgot password?
                            </a>
                          </div>
                          <div className="relative">
                            <Input
                              id="password-signin"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="bg-white/50 dark:bg-gryt-dark/50 pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gryt-dark/60 dark:text-gryt-light/60 hover:text-gryt-blue"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                        <GhibliButton
                          type="submit"
                          className="w-full bg-gryt-red hover:bg-gryt-red/90 text-white text-base py-6 font-medium shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                          glowColor="red"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Signing in...' : 'Sign In'}
                        </GhibliButton>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-signup">Email</Label>
                          <Input
                            id="email-signup"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white/50 dark:bg-gryt-dark/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password-signup">Password</Label>
                          <div className="relative">
                            <Input
                              id="password-signup"
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
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                        <GhibliButton
                          type="submit"
                          className="w-full bg-gryt-blue hover:bg-gryt-blue/90 text-white text-base py-6 font-medium shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                          glowColor="blue"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating account...' : 'Create Account'}
                        </GhibliButton>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gryt-dark/60 dark:text-gryt-light/60">
                Protected by Supabase Authentication
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
