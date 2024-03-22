//esto es para tener una ruta protegida
//la unica caracteristica es la de validar
//si el usuario este autenticado te deje mostrar el contenido
//De esa ruta sino podemos redirigir a una publica
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from '../pages/login/auth/AuthProvider';

export default function ProtectedRoute({ element }) {
    const auth = useAuth();

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

//si es verdadero mostramos lo que existe bajo el ProtectedRoute (la ruta protegida)
//sino mandamos a iniciarSesion
