// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import './login.css'; // Asegúrate de importar tu archivo CSS

export default function MyComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { handleLogin, isAuthenticated } = useAuth();
  const [isSignUpActive, setIsSignUpActive] = useState(false);


  // Función para activar el formulario de registro
  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  // Función para volver al formulario de inicio de sesión
  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleLogin(email, password); //aca mandamos para validar que existe esa cuenta
    if (!success) setError("Usuario o contraseña incorrectos"); //sino manda un error
  };

  if (isAuthenticated) return <Navigate to="/Principal" />;

  return (
    <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        {/* Formulario de registro */}
        <form className="form" >
          <h1>Crea tu Cuenta</h1>
          {/* Aquí va tu formulario de registro */}
        </form>
      </div>
      <div className="form-container sign-in-container">
        {/* Formulario de inicio de sesión */}
        <form className="form"
          onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>

          <label htmlFor="email"
            className="label"></label>
          <input type="text"
            id="email"
            className="input-field"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password"
            className="label"></label>
          <input type="password"
            id="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

          {error && <div className="error"
            style={{color: 'red'}}>{error}</div>}

          <button type="submit"
            className="button">Ingresar</button>

          <a href="/olvidaste-contrasena"
            className="forgot-password-link">¿Olvidaste tu contraseña?</a>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>¡Bienvenido!</h1>
            <p>Inicia sesión con tu cuenta</p>
            <button className="ghost"
              onClick={handleSignInClick}>Inicia sesión</button>
          </div>

          <div className="overlay-panel overlay-right">
            <h1>¿No tienes una cuenta?</h1>
            <p>Crea una </p>
            <button className="ghost"
              onClick={handleSignUpClick}>Registrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
