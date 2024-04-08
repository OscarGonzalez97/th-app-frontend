import React, { useState } from 'react';
import CustomAlert from '../../components/login/CustomAlert';
import './styles/login.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {ColorRing} from 'react-loader-spinner'

function OlvidasteContrasenha() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [registroError, setRegistroError] = useState(null);
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para controlar si se está cargando o no

  const handleRegistroSubmit = async (e) => {
    e.preventDefault();

    if (!correoElectronico.trim()) {
      setRegistroError("Ingrese su correo electrónico");
      return;
    }

    if (!/^[\w-\.]+@roshka\.com$/.test(correoElectronico.trim())) {
      setRegistroError("El correo electrónico debe ser de dominio @roshka.com");
      return;
    }

    try {
      setLoading(true); // Establece el estado de carga a true al iniciar la solicitud
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        email: correoElectronico
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setLoading(false); // Establece el estado de carga a false después de recibir la respuesta
      if (response.status === 200) {
        setEnvioExitoso(true);
        setCorreoElectronico("");
        navigate('/login');
      }
    } catch (error) {
      setLoading(false); 
      console.error('Error al registrar:', error);
      setRegistroError(error.response.data.mensaje);
    }
  }

  return (
    <div className='login-base recuperar'>
      <div className="top-right-button">
        <a href="/login" className="button">
          <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '24px' }} />
        </a>
      </div>

      <h1>Recuperación de la cuenta</h1>
      <div className='recuperar-container'>
        <h4>Te enviaremos el link de recuperación a tu email</h4>
        <input
          type="text"
          className="input-field"
          placeholder="Correo Electrónico"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)} />
        {registroError && <div className="error" style={{ color: 'red' }}>{registroError}</div>}
        <button onClick={handleRegistroSubmit} className="button">Enviar</button>
      </div>
      {/* Mostrar el componente de carga si loading es true */}
      <div className="loader-container">
        {loading &&     <ColorRing
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                          />}
      </div>
      {envioExitoso && <CustomAlert message="Se ha enviado el link de recuperación a su correo electrónico. Si no lo recibió, intente nuevamente." />}
    </div>
  );
}

export default OlvidasteContrasenha;
