import React from 'react';
import './PaginaNoEncontrada.css'; // Importa el archivo CSS para estilos específicos de esta página
import Error from "../../imagenes/error.png"; // Importa la imagen de error

function PaginaNoEncontrada() {
  const handleGoBack = () => {
    window.history.back(); // Vuelve a la página anterior
  };

  return (
    <div className="pagina-no-encontrada-container">
      <img src={Error} alt="error404" /> {/* Usa llaves para referenciar la variable Error */}
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe o ha sido eliminada. Por favor, comprueba la dirección que has introducido.</p>
      <button onClick={handleGoBack}>Volver a la página anterior</button>
    </div>
  );
}

export default PaginaNoEncontrada;
