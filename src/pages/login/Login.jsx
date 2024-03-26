import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../components/login/CustomAlert';
import './styles/login.css';


export default function Login() {

  //Estados del formulario LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para controlar los errores


  // Estados del formulario de registro
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenha, setContrasenha] = useState("");
  const [confirmarContrasenha, setConfirmarContrasenha] = useState("");
  const [registroError, setRegistroError] = useState(null);
  const [errorContrasenha, setErrorContrasenha] = useState("");

  //Estado para validar si el registro fue exitoso
  const[registroExitoso, setRegistroExitoso] = useState (false);

  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const navigate = useNavigate();


  // Función para activar el formulario de registro
  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  // Función para volver al formulario de inicio de sesión
  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("@", import.meta.env.VITE_API_URL);
    try {
      const response = await axios.post("http://192.168.67.86:8080/thbackend/auth/signin", {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
      if (response.status === 200) { //si la respuesta es exitosa (cód de estado 200)
        navigate('/home'); //se va a la pag de inicio 
      } else {
        setError(response.data.message || "Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
    
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
  try {
    const response = await fetch(`${apiUrl}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: correoElectronico,
        password: contrasenha
      }),
    });

    if (response.ok) {
      setRegistroExitoso(true);
      setCorreoElectronico("");
      setContrasenha("");
      setConfirmarContrasenha("");
      navigate('/home');
    } else {
      const data = await response.json();
      setRegistroError(data.message || "Error al registrar. Por favor, inténtalo de nuevo.");
    }
  } catch (error) {
    console.error('Error al registrar:', error);
    setRegistroError('Error al registrar. Por favor, inténtalo de nuevo.');
  }
  };
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
            onSubmit={handleLoginSubmit}>
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
