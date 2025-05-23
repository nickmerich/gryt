import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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
import ProtectedRoute from '@/components/ProtectedRoute';
import GoalDetail from '@/pages/GoalDetail'; // Add this import

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/goal/:goalId" element={ // Add this route
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
