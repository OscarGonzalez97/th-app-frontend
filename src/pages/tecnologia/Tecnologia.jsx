import React, { useState } from 'react';

import { Layout } from "../../components/layouts/Layout"
import './Tecnologia.css';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';



const Tecnologia = () => {
  const [nombre, setNombre] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

  

      try {
        const data = {
          nombre: nombre 
        };

const response = await axios.post('http://localhost:8080/thbackend/v1/tecnologia/agregar', data);

      console.log('Respuesta del servidor:', response.data);
      
      
   
setNombre(''); 
setShowAlert(true);
    } catch (error) {
      console.error('Error al enviar el pedido POST:', error);
    }
  };





  return (

    <Layout>
    <div className="tecnologia-container">
            <h2>Tecnología</h2>

            <form className="row g-3"onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="nombre" className="form-label">Nombre*</label>
                    <input type="text" className="form-control" id="nombre" name="nombre"
                        placeholder="Ingrese el nombre" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                </div>

                <div className="col-12 d-flex justify-content-end">
                
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>

            </form>


            {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Se ha guardado correctamente.
          </Alert>
        )}


     </div>
            
    </Layout>
  )
}

export default Tecnologia
