import { useState } from 'react';
import { Layout } from "../../components/layouts/Layout";
import './CambiarContraseña.css';
import axios from 'axios';
import { useSelector } from "react-redux";

const CambiarContraseña = () => {
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');
  const [registroError, setRegistroError] = useState(null);
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [correoElectronico, setCorreoElectronico] = useState("");
  const token = useSelector(state => state.token);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar la coincidencia de contraseñas
    if (nuevaContraseña !== confirmarContraseña) {
      setErrorContraseña("Las contraseñas no coinciden. Inténtalo de nuevo");
      return;
    } else {
      setErrorContraseña(""); // Limpiar el error si las contraseñas coinciden
    }

    try {
      // Aquí realizamos la solicitud PUT a la API para actualizar la contraseña
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/auth/restore-password `, {
        email: correoElectronico,
        oldPassword: contraseñaActual,
        password: nuevaContraseña
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
    <Layout>
      <div className="cambContraseña-container">
        <h2>Restablecer Contraseña</h2>
        
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-11">
            <label htmlFor="correoElectronico" className="form-label">Correo Electronico*</label>
            <input type="text" className="form-control" id="correoElectronico" name="correoElectronico"  placeholder="Ingrese la contraseña actual"
              value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />

            <label htmlFor="contraseñaActual" className="form-label">Contraseña Actual*</label>
            <input type="password" className="form-control" id="contraseñaActual" name="contraseñaActual"  placeholder="Ingrese la contraseña actual"
              value={contraseñaActual} onChange={(e) => setContraseñaActual(e.target.value)} />

            <label htmlFor="nuevaContraseña" className="form-label">Nueva Contraseña*</label>
            <input type="password" className="form-control" id="nuevaContraseña" name="nuevaContraseña" placeholder="Ingrese la nueva contraseña"
              value={nuevaContraseña} onChange={(e) => setNuevaContraseña(e.target.value)} />

            <label htmlFor="confirmarContraseña" className="form-label">Confirmar Contraseña*</label>
            <input type="password" className="form-control" id="confirmarContraseña" name="confirmarContraseña" placeholder="Confirme la nueva contraseña"
                value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} />
            {errorContraseña && <div className="text-danger">{errorContraseña}</div>}
            {registroError && <div className="error" style={{ color: 'red' }}>{registroError}</div>}

          </div>

          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-success">Guardar</button>
          </div>
        </form>
        {envioExitoso && <div className="alert alert-success">{successMessage}</div>}
      </div>
    </Layout>
  );
};

export default CambiarContraseña;
