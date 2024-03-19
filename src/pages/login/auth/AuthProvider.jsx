import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Definimos el proveedor de autenticación
// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (email, password) => {
        // Simulamos la autenticación utilizando valores predeterminados
        if (email === 'test@test.com' && password === 'test') {
            setIsAuthenticated(true);
            return true;
        } else {
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

// Creamos un hook personalizado para usar el contexto de autenticación
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
