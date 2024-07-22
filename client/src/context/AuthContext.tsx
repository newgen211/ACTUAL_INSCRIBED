import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the AuthState type
interface AuthState {

    userId: string;
    username: string;
    token: string;

}

// Define the AuthContext value type
interface AuthContextType {

    auth: AuthState | null;
    setAuth: Dispatch<SetStateAction<AuthState | null>>;

}

// Define the props type for the AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component to provide the auth state
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [auth, setAuth] = useState<AuthState | null>(null);

    return (

        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>

    );

};

// Custom hook to use the AuthContext
export const useAuth = () => {

    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
    
};
