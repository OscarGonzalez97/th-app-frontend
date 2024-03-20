import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import OtraRuta from '../pages/otraRuta/OtraRuta';
import Login from "../pages/login/Login";
import OlvidasteContrasenha from '../pages/login/OlvidasteContrasenha';
import { AuthProvider } from '../pages/login/auth/AuthProvider';

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rutas que usan Layout */}
        <Route path="/"
          element={<Home/>}>
        </Route>
        <Route path="/home"
          element={<OtraRuta/>}>
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
            <OlvidasteContrasenha/>
          }>
        </Route>
        {/* rutas desprotegidas */}
      </Routes>
    </BrowserRouter>
  )
}