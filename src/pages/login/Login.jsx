import React, { useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import CustomAlert from '../../components/login/CustomAlert';
import './styles/login.css';


export default function Login() {
  //Estados del formulario LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para controlar los errores
  const { handleLogin, isAuthenticated } = useAuth();


  // Estados del formulario de registro
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenha, setContrasenha] = useState("");
  const [confirmarContrasenha, setConfirmarContrasenha] = useState("");
  const [registroError, setRegistroError] = useState(null);
  const [errorContrasenha, setErrorContrasenha] = useState("");

  //Estado para validar si el registro fue exitoso
  const[registroExitoso, setRegistroExitoso] = useState (false);

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

  // Función para manejar el registro
  const handleRegistroSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (contrasenha !== confirmarContrasenha) {
      setErrorContrasenha("Las contraseñas no coinciden. Inténtalo de nuevo");
      return;
    } else {
      setErrorContrasenha(""); // Limpiar el error si las contraseñas coinciden
    }

    // Validar dominio de correo electrónico
    if (!/^[\w-\.]+@roshka\.com$/.test(correoElectronico.trim())) {
      setRegistroError("Correo electrónico debe ser de dominio @roshka.com");
      return;
    } else {
      setRegistroError(""); // Limpiar el error si el correo electrónico es válido
    }

  // Si las contraseñas coinciden y el correo electrónico es válido, continuamos con el registro
  // aca debemos enviar la solicitud de registro ()
    setRegistroExitoso(true);
     // Limpiar los campos del formulario después del registro exitoso
    setCorreoElectronico("");
    setContrasenha("");
    setConfirmarContrasenha("");
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className='login-base'>
      <div className={`container-login ${isSignUpActive ? 'right-panel-active' : ''}`}>
        <div className="form-container-login sign-up-container-login">
          {/* Formulario de registro */}
          <form className="form"
            onSubmit={handleRegistroSubmit}>
            <h1>Crea tu Cuenta</h1>
            <input type="text"
              className="input-field"
              placeholder="Correo Electrónico"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)} />
            {registroError && <div className="error"
              style={{ color: 'red' }}>{registroError}</div>}
            <input type="password"
              className="input-field"
              placeholder="Contraseña"
              value={contrasenha}
              onChange={(e) => setContrasenha(e.target.value)} />
            <input type="password"
              className="input-field"
              placeholder="Confirmar Contraseña"
              value={confirmarContrasenha}
              onChange={(e) => setConfirmarContrasenha(e.target.value)} />
            {errorContrasenha && <div className="error"
              style={{ color: 'red' }}>{errorContrasenha}</div>}

            <button type="submit"
              className="button registrar-button ">Registrarse</button>
          </form>
          <div className="login-custom-alert-container">
            {registroExitoso && <CustomAlert message="¡Registro exitoso!" />}
          </div>
        </div>

        <div className="form-container-login sign-in-container-login">
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

            <a href="/Recuperar"
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
    </div>
  );
}
