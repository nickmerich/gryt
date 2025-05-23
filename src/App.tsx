
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "./contexts/AuthContext";
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Circles from '@/pages/Circles';
import CircleDetail from '@/pages/CircleDetail';
import Community from '@/pages/Community';
import Integrations from '@/pages/Integrations';
import IntegrationCallback from '@/pages/IntegrationCallback';
import ProtectedRoute from '@/components/ProtectedRoute';
import GoalDetail from '@/pages/GoalDetail';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/how-gryt-works" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/goal/:goalId" element={
            <ProtectedRoute>
              <GoalDetail />
            </ProtectedRoute>
          } />
          <Route path="/circles" element={
            <ProtectedRoute>
              <Circles />
            </ProtectedRoute>
          } />
          <Route path="/circles/:circleId" element={
            <ProtectedRoute>
              <CircleDetail />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/integrations" element={
            <ProtectedRoute>
              <Integrations />
            </ProtectedRoute>
          } />
          <Route path="/integration-callback" element={
            <ProtectedRoute>
              <IntegrationCallback />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
