
import React, { useEffect, useState } from 'react';
import { Layout } from "../../components/layouts/Layout"

import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useSelector } from "react-redux";







const Usuario = () => {

  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const token = useSelector(state => state.token);



  useEffect(() => {
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/allowedUsers`, {
        
        
email: email
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Respuesta del servidor:', response.data);

      setEmail(''); 
      setShowAlert(true);
    } catch (error) {
      console.error('Error al enviar el pedido POST:', error);
    }
  };












  return (
    <Layout>
    
    <div className="tecnologia-container">
            <h2>Correo</h2>

            <form className="row g-3"onSubmit={handleSubmit}>
                <div className="col-md-12">
                
                    <input type="text" className="form-control" id="email" name="email"
                        placeholder="Ingresa el correo" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default Usuario

