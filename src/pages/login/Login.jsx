import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../components/login/CustomAlert';
import './styles/login.css';
import { useDispatch } from 'react-redux';


export default function Login() {

  //Estados del formulario LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para controlar los errores


  // Estados del formulario de registro
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenha, setContrasenha] = useState("");
  const [registroError, setRegistroError] = useState(null);

  //Estado para validar si el registro fue exitoso
  const[registroExitoso, setRegistroExitoso] = useState (false);

  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch(); // inicializamos useDispatch


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
    try {
      localStorage.removeItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.status === 200) {
        dispatch({ type: 'SET_TOKEN', payload: response.data.accessToken });
        localStorage.setItem('token', response.data.accessToken); // Store token in localStorage
        navigate('/');
      } else {
        setError(response.data.message || "Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
    
  };

  const handleRegistroSubmit = async (e) => {
    e.preventDefault();

    // Validar dominio de correo electrónico
    if (!/^[\w-\.]+@roshka\.com$/.test(correoElectronico.trim())) {
      setRegistroError("Correo electrónico debe ser de dominio @roshka.com");
      return;
    } else {
      setRegistroError(""); // Limpiar el error si el correo electrónico es válido
    }
  
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        nombre,
        apellido,
        "email": correoElectronico,
        "password": contrasenha
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if (response.status === 201) {
        setRegistroExitoso(true);
        setNombre("");
        setApellido("");
        setCorreoElectronico("");
        setContrasenha("");
        setConfirmarContrasenha("");
        navigate('/login');
      } 
      } catch (error) {
      console.error('Error al registrar:', error);
      setRegistroError(error.response.data.mensaje);
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
              id="nombre"
              className="input-field"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} />

            <input type="text"
              id="apellido"
              className="input-field"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)} />

            <input type="text"
              id="email_r"
              className="input-field"
              placeholder="Correo Electrónico"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)} />
            {registroError && <div className="error"
              style={{ color: 'red' }}>{registroError}</div>}
              
            <input type="password"
              id="password_r"
              className="input-field"
              placeholder="Contraseña"
              value={contrasenha}
              onChange={(e) => setContrasenha(e.target.value)} />
           

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
