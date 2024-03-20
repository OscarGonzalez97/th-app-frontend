import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home'
import OtraRuta from '../pages/otraRuta/OtraRuta'
import Login from "../pages/login/Login"
import Convocatoria from '../pages/convocatoria/Convocatoria'
import OlvidasteContrasenha from "../pages/login/OlvidasteContrasenha"
import { AuthProvider } from '../pages/login/auth/AuthProvider';
import PostulanteForm from '../pages/postulante/PostulanteForm';

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rutas que usan Layout */}
        <Route path="/"
          element={<Home />}>
        </Route>

        <Route path="/home"
          element={<OtraRuta />}>
        </Route>


        <Route path="/convocatoria"
          element={<Convocatoria/>}>
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