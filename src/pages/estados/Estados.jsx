import React, { useEffect, useState } from 'react';
import { Layout } from "../../components/layouts/Layout"
import './Estados.css';
import axios from "axios";
import { useSelector } from "react-redux";
import { Form } from 'react-router-dom';
import { faArrowRight, faBook, faBookAtlas, faBookBookmark, faBookDead, faBookOpen, faDeleteLeft, faPeopleArrows, faPeopleGroup, faPerson, faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the right arrow icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';



const Estados = () => {
  const [nombre, setNombre] = useState('');
  const [estados, setEstados] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const token = useSelector(state => state.token);
  const [selectedState, setSelectedState] = useState("");



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/estado`, {
        estado: nombre 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Respuesta del servidor:', response.data);

      setNombre(''); 
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      fetchData();
    } catch (error) {
      console.error('Error al enviar el pedido POST:', error);
    }
  };



  const handleClose = () => {
    setShowAlert(false);
  };


  const fetchData = async () => {
    try {
      const estadosResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/estados`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setEstados(estadosResponse.data);
    } catch (error) {
      console.error('Error al obtener los estados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-4 p-5'>
            <div className='estado-container p-5'>
              <h2>Estados</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="nombre" className="form-label">Nombre*</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese el estado"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-success">Guardar</button>
                </div>
              </form>
            </div>

            
          </div>
          <div className='col pt-sm-5'>
            <div className=''> 
             {estados && estados.map(estado => (
               <span key={estado.id_estado} className='badge bg-secondary me-1 mt-1'>{estado.estado}</span>
            ))}
            </div>
            {showAlert && (
          <div className="alert alert-success position-relative" role="alert" style={{ marginTop: '20px' }}>
              <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Se ha guardado correctamente.
          </div>
        )} 
          </div>

        </div>

      </div>
    </Layout>
    </>
  );
}

export default Estados
