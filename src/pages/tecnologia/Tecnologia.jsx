import React, { useState } from 'react';
import { Layout } from "../../components/layouts/Layout"
import './Tecnologia.css';
import axios from "axios";
import { useSelector } from "react-redux";
import { Form } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowRight, faBook, faBookAtlas, faBookBookmark, faBookDead, faBookOpen, faDeleteLeft, faPeopleArrows, faPeopleGroup, faPerson, faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the right arrow icon


const Tecnologia = () => {
  const [nombre, setNombre] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const token = useSelector(state => state.token);
  const [selectedState, setSelectedState] = useState("");

 
  const [estados, setEstados] = useState([]);
  const [postulantes, setPostulantes] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/tecnologia/agregar`, {
        nombre: nombre 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Respuesta del servidor:', response.data);

      setNombre(''); 
      setShowAlert(true);
    } catch (error) {
      console.error('Error al enviar el pedido POST:', error);
    }
  };



  const handleClose = () => {
    setShowAlert(false);
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
          <div className="alert alert-success position-relative" role="alert" style={{ marginTop: '20px' }}>
            Se ha guardado correctamente.
            <button type="button" className="btn-close position-absolute top-0  end-0 me-2" aria-label="Close" onClick={handleClose}></button>
          </div>
        )}


     </div>
            
    </Layout>
  )
}

export default Tecnologia
