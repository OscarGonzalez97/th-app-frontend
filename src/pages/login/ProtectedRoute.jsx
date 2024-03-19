//esto es para tener una ruta protegida
//la unica caracteristica es la de validar
//si el usuario este autenticado te deje mostrar el contenido
//De esa ruta sino podemos redirigir a una publica

import { Outlet,Navigate } from "react-router-dom" //nos va a ayudar a poner un placeHolder
import { useAuth } from './auth/AuthProvider';

export default function ProtectedRoute() {
    const auth = useAuth(); // Invocamos useAuth como una función

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

//si es verdadero mostramos lo que existe bajo el ProtectedRoute (la ruta protegida)
//sino mandamos a iniciarSesion
