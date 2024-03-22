import { useState } from 'react';
import { Layout } from "../../components/layouts/Layout";
import './CambiarContraseña.css';

const CambiarContraseña = () => {
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar la coincidencia de contraseñas
    if (nuevaContraseña !== confirmarContraseña) {
      setErrorContraseña("Las contraseñas no coinciden. Inténtalo de nuevo");
      return;
    } else {
      setErrorContraseña(""); // Limpiar el error si las contraseñas coinciden
    }

    // Simular la comprobación de la contraseña actual (deberías hacer una verificación real aquí)
    const contraseñaCorrecta = true; // Deberías implementar la lógica real de comparación aquí

    if (!contraseñaCorrecta) {
      setErrorContraseña("La contraseña actual es incorrecta");
      return;
    }

    // Si todas las validaciones pasan, muestra el mensaje de éxito y limpia los campos
    setSuccessMessage("¡La contraseña se ha cambiado con éxito!");
    setContraseñaActual('');
    setNuevaContraseña('');
    setConfirmarContraseña('');
  };

  return (
    <Layout>
      <div className="cambContraseña-container">
        <h2>Restablecer Contraseña</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-11">
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

          </div>

          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-success">Guardar</button>
          </div>
        </form>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
      </div>
    </Layout>
  );
};

export default CambiarContraseña;
