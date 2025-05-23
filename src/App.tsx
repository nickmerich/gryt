
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Circles from "./pages/Circles";
import CircleDetail from "./pages/CircleDetail";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import GhibliLayout from "./components/GhibliLayout";

// Initialize Supabase storage bucket
import { supabase } from "@/integrations/supabase/client";

// Create storage bucket if it doesn't exist (this is just a check, the actual creation happens in SQL)
const initializeStorage = async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.find(bucket => bucket.name === 'goal-images')) {
      console.log('Goal images bucket needs to be created');
    }
  } catch (error) {
    console.error('Error checking storage buckets:', error);
  }
};

// Initialize storage when app loads
initializeStorage();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/circles" element={<Circles />} />
              <Route path="/circles/:circleId" element={<CircleDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
