import React, { useState } from 'react';
import CustomAlert from '../../components/login/CustomAlert';
import './styles/login.css';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function OlvidasteContrasenha() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [registroError, setRegistroError] = useState(null);
  const [envioExitoso, setEnvioExitoso] = useState(false);

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

    // Aquí iría el código para enviar el link de recuperación de la cuenta
    // Supongamos que el envío se realizó con éxito
    setEnvioExitoso(true);
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
      {envioExitoso && <CustomAlert message="Se ha enviado el link de recuperación a su correo electrónico. Si no lo recibió, intente nuevamente." />}
    </div>
  );
}

export default OlvidasteContrasenha;
