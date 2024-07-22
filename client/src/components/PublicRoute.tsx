import { useEffect, useState } from 'react';
import api from '../util/api';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

interface PublicRouteProps {
    element: React.ReactElement;
  }
  
  const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
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
  
    return isAuthenticated ? <Navigate to="/homepage" replace /> : element;
  };
  

  export default PublicRoute;