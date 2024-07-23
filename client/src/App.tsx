import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Homepage from './pages/Homepage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Followingpage from './pages/FollowingPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Discover from './pages/Discoverpage';
import AccountVerifiedPage from './pages/AccountVerifiedPage';


// Main App component
export default function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<PublicRoute element={<ForgotPasswordPage />} />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path="/homepage" element={<ProtectedRoute element={<Homepage />} />} />
        <Route path="/following" element={<ProtectedRoute element={<Followingpage />} />} />
        <Route path="/discover" element={<ProtectedRoute element={<Discover />} />} />
        <Route path='/account-verified' element={<AccountVerifiedPage />} />
      </Routes>

    </BrowserRouter>
  );
}
