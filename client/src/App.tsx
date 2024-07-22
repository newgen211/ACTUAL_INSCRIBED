import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { useEffect, useState } from 'react';
import axios from 'axios';


// Main App component
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<PublicRoute element={<LoginPage />} />} />

        <Route path='/dashboard' element={<ProtectedRoute element={<DashboardPage />} />} />

      </Routes>
    </BrowserRouter>
  );
}


interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get the login token from localStorage
        const token = localStorage.getItem('token');

        // Ensure the token is valid and present
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        // Send the request to check authentication status
        const response = await axios.get('/api/auth/is-auth', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if the response has isAuthenticated property
        if (response.status === 200 && response.data.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading indicator or skeleton screen while the auth status is being checked
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/" replace />;
};



interface PublicRouteProps {
  element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get the login token from localStorage
        const token = localStorage.getItem('token');

        // If token is not present, user is not authenticated
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        // Send the request to check authentication status
        const response = await axios.get('/api/auth/is-auth', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set the authentication status based on the response
        if (response.status === 200 && response.data.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading indicator or skeleton screen while the auth status is being checked
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : element;
};
