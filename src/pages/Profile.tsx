
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import GhibliLayout from '@/components/GhibliLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";
import { User, Mail, Camera, Settings, Shield } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.email?.split('@')[0] || '');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GhibliLayout>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="heading-lg gradient-text mb-4">My Profile</h1>
          <p className="body-lg">Manage your account settings and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview Card */}
          <div className="lg:col-span-1">
            <Card className="modern-card text-center animate-slide-up">
              <CardHeader className="pb-6">
                <div className="relative mx-auto mb-6">
                  <Avatar className="h-32 w-32 mx-auto shadow-lg">
                    <AvatarImage src="" alt={user?.email || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-4xl">
                      {getInitials(user?.email || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon"
                    variant="outline" 
                    className="absolute bottom-2 right-2 rounded-full h-10 w-10 bg-white shadow-lg border-2"
                    disabled={!isEditing}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardTitle className="text-2xl gradient-text">{displayName || "User"}</CardTitle>
                <CardDescription className="text-lg">{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-2xl">
                  <Mail className="h-5 w-5 mr-3" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-2xl">
                  <User className="h-5 w-5 mr-3" />
                  <span className="text-sm">Member since {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-slate-600 bg-slate-50 p-3 rounded-2xl">
                  <Shield className="h-5 w-5 mr-3" />
                  <span className="text-sm">Account Verified</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="modern-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Personal Information</CardTitle>
                    <CardDescription className="text-base">Update your profile information and preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="name" className="text-base font-medium text-slate-700">Display Name</Label>
                  <Input
                    id="name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={!isEditing}
                    className="modern-input"
                    placeholder="Enter your display name"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-base font-medium text-slate-700">Email Address</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="modern-input bg-slate-50"
                  />
                  <p className="text-sm text-slate-500">Email cannot be changed for security reasons</p>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="bio" className="text-base font-medium text-slate-700">Bio</Label>
                  <textarea
                    id="bio"
                    className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:border-indigo-300 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself and your goals..."
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                {isEditing ? (
                  <div className="flex gap-3 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="modern-button flex-1"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="modern-button w-full"
                  >
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </GhibliLayout>
  );
};

export default Profile;
