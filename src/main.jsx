import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './pages/login/auth/AuthProvider';
import ProtectedRoute from './pages/login/ProtectedRoute';
import Login from './pages/login/Login.jsx';
import Principal from './pages/Principal';
const router = createBrowserRouter([
    {
        path: "/", // Ruta de inicio de sesión
        element: <Login />,
    },
    {
        path: "/", // Ruta protegida
        element: <ProtectedRoute />,
        children: [
            {
                path: "/Principal", // Ruta de la página principal
                element: <Principal />,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
