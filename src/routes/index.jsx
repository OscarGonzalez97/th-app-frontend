import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home'
import Login from "../pages/login/Login"
import Convocatoria from '../pages/convocatoria/Convocatoria'
import Tecnologia from '../pages/tecnologia/Tecnologia'
import Estados from '../pages/estados/Estados'
import OlvidasteContrasenha from "../pages/login/OlvidasteContrasenha"
import ListarPostulante from '../pages/postulante/ListarPostulante';
import PostulanteForm from '../pages/postulante/PostulanteForm';
import CambiarContraseña from '../pages/cambiarContraseña/CambiarContraseña';
import ListarTecnologia from '../pages/tecnologia/ListarTecnologia';
import RecuperarContrasenha from '../pages/login/RecuperarContrasenha';
import Usuario from '../pages/usuario/Usuario';
import Beneficios from '../pages/beneficios/Beneficios';
import ListarBeneficios from '../pages/beneficios/ListarBeneficios';
import ListarUsuarios from '../pages/usuario/ListarUsuarios';
import PaginaNoEncontrada from '../pages/pagNoEncontrada/PaginaNoEncontrada';
import PostulanteInfo from '../pages/postulanteInfo/PostulanteInfo';
import EditarPostulante from '../pages/postulante/EditarPostulante';import ListarConvocatoria from '../pages/convocatoria/ListarConvocatoria';


export function Routing() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas que usan Layout */}
        <Route path="/" element={<Home />} />
        <Route path="/convocatoria/listar" element={<ListarConvocatoria/>}> </Route>
        <Route path="/postulante/listar" element={<ListarPostulante />} />
        <Route path="/convocatoria" element={<Convocatoria />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/cambiarcontraseña" element={<CambiarContraseña />} />
        <Route path="/tecnologia/listar" element={<ListarTecnologia />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/usuario/listar" element={<ListarUsuarios />} />
        <Route path="/beneficios" element={<Beneficios />} />
        <Route path="/beneficios/listar" element={<ListarBeneficios />} />
        <Route path="/estados" element={<Estados />} />
        <Route path="/postulante/:id" element={<PostulanteInfo />} />
        <Route path="/editarPostulante/:id" element={<EditarPostulante />} />

        {/* Rutas desprotegidas */}
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar" element={<OlvidasteContrasenha />} />
        <Route path="/confirm-reset" element={<RecuperarContrasenha />} />
        <Route path="/convocatoria/:id" element={<PostulanteForm />} />
        {/* Ruta para página no encontrada */}
        <Route path="*" element={<PaginaNoEncontrada />} />
        
      </Routes>
    </BrowserRouter>
  );
}
