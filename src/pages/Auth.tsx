
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import GhibliIllustration from '@/components/GhibliIllustration';
import GhibliButton from '@/components/GhibliButton';
import { Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Signed in successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await signUp(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Check your email to confirm your account!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Illustration */}
      <div className="hidden md:flex md:w-1/2 relative">
        <GhibliIllustration 
          type="foggy" 
          className="absolute inset-0 w-full h-full"
          animate={true}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gryt-dark/40 to-transparent flex items-center justify-center">
          <div className="text-white max-w-md p-8">
            <h1 className="ghibli-title text-4xl mb-4 text-white">Journey with <span className="text-gryt-red">Gryt</span></h1>
            <p className="ghibli-subtitle mb-6 text-gryt-gray">
              "The most beautiful things in the world cannot be seen or touched, they are felt with the heart."
            </p>
            <p className="text-gryt-gray/80 text-sm">
              Gryt is your companion on the path of personal growth and achievement, inspired by the perseverance and wonder found in life's journey.
            </p>
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
        </div>
      </div>
    </div>
  );
};

export default Auth;
