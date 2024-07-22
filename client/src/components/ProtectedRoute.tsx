import { useEffect, useState } from 'react';
import api from '../util/api';
import Spinner from './Spinner';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactElement;
  }
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const response = await api.get('/api/auth/is-auth');
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
      return <Spinner />;
    }
  
    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  export default ProtectedRoute;