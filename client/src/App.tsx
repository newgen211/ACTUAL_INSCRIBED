import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Homepage from './pages/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

      <Routes>

        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />

        <Route element={<ProtectedRoute />}>

          <Route path='/homepage' element={<Homepage />} />

        </Route>


        </Routes>

      </BrowserRouter>

    </AuthProvider>


  );

}