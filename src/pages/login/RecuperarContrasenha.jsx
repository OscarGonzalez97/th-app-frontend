import React, { useState, useEffect } from 'react';
import CustomAlert from '../../components/login/CustomAlert';
import './styles/login.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RecuperarContrasenha() {
  const [contrasenha, setContrasenha] = useState("");
  const [confirmarContrasenha, setConfirmarContrasenha] = useState("");
  const [errorContrasenha, setErrorContrasenha] = useState("");
  const [registroError, setRegistroError] = useState(null);
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [token, setToken] = useState(""); // Para guardar el token

  const { token: tokenParam } = useParams(); // Capturar el token de la URL

  useEffect(() => {
    // Actualizar el estado del token cuando cambie el parámetro de la URL
    setToken(tokenParam);
  }, [tokenParam]);

  const handleRegistroSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (contrasenha !== confirmarContrasenha) {
      setErrorContrasenha("Las contraseñas no coinciden. Inténtalo de nuevo");
      setConfirmarContrasenha("");
      setContrasenha("");
      return;
    } else {
      setErrorContrasenha(""); // Limpiar el error si las contraseñas coinciden
    }

    try {
      // Aquí realizamos la solicitud PUT a la API para actualizar la contraseña
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        password: contrasenha,
        token// Mandar el token en el cuerpo de la solicitud PUT
      });

      // Manejar la respuesta según la necesidad
      if (response.status === 200) {
        setEnvioExitoso(true); // Indicar que el envío fue exitoso
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setRegistroError(error.response.data.message);
    }
  };

  return (
    <div className='login-base recuperar'>
      <div className="top-right-button">
        <a href="/login" className="button">
          <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '24px' }} />
        </a>
      </div>

      <h1>Restablecer Contraseña</h1>
      <div className='recuperar-container'>
        <input
          type="password"
          className="input-field"
          placeholder="Nueva Contraseña"
          value={contrasenha}
          onChange={(e) => setContrasenha(e.target.value)} />

        <input
          type="password"
          className="input-field"
          placeholder="Confirmar Contraseña"
          value={confirmarContrasenha}
          onChange={(e) => setConfirmarContrasenha(e.target.value)} />

        {errorContrasenha && <div className="error" style={{ color: 'red' }}>{errorContrasenha}</div>}
        {registroError && <div className="error" style={{ color: 'red' }}>{registroError}</div>}

        {/* Campo oculto para guardar el token */}
        <input type="hidden" name="token" value={token} />

        <button onClick={handleRegistroSubmit} className="button">Enviar</button>
      </div>

      <div className="login-custom-alert-container">
        {envioExitoso && <CustomAlert message="¡Registro exitoso!" />}
      </div>
    </div>
  );
}

export default RecuperarContrasenha;
