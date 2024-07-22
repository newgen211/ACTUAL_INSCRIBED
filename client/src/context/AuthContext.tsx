import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthState {
    userId: string;
    username: string;
    token: string;
}

interface AuthContextType {
    auth: AuthState | null;
    setAuth: Dispatch<SetStateAction<AuthState | null>>;
    clearAuth: () => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState | null>(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : null;
    });

    const updateAuth: Dispatch<SetStateAction<AuthState | null>> = (authData) => {
        const newAuth = authData instanceof Function ? authData(auth) : authData;
        if (newAuth) {
            localStorage.setItem('auth', JSON.stringify(newAuth));
        } else {
            localStorage.removeItem('auth');
        }
        setAuth(newAuth);
    };

    const clearAuth = () => {
        localStorage.removeItem('auth');
        setAuth(null);
    };

    const logout = () => {
        clearAuth();
        <Navigate to='/' />
    };

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth: updateAuth, clearAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
