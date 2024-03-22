import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home'
import ListarPostulante from '../pages/postulante/ListarPostulante';
import Login from "../pages/login/Login"
import Convocatoria from '../pages/convocatoria/Convocatoria'
import Tecnologia from '../pages/tecnologia/Tecnologia'
import OlvidasteContrasenha from "../pages/login/OlvidasteContrasenha"
import { AuthProvider } from '../pages/login/auth/AuthProvider';
import PostulanteForm from '../pages/postulante/PostulanteForm';
import CambiarContraseña from '../pages/cambiarContraseña/CambiarContraseña';

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rutas que usan Layout */}
        <Route path="/"
          element={<Home />}>
        </Route>
        <Route path="/postulante/listar"
          element={<ListarPostulante/>}>
        </Route>
        <Route path="/convocatoria"
          element={<Convocatoria/>}>
        </Route>
        <Route path="/tecnologia"
          element={<Tecnologia/>}>
        </Route>

        <Route path="/cambiarcontraseña"
          element={<CambiarContraseña/>}>
        </Route>


        {/* rutas que usan Layout */}
        {/* rutas desprotegidas */}
        <Route path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }>
        </Route>


        <Route path="/Recuperar"
          element={
            <OlvidasteContrasenha />
          }>
        </Route>
        <Route path="/postulante"
          element={<PostulanteForm />}>
        </Route>
        {/* rutas desprotegidas */}
      </Routes>
    </BrowserRouter>
  )
}