import React, { useEffect, useState } from 'react';
import { Layout } from "../../components/layouts/Layout"
import './Tecnologia.css';
import axios from "axios";
import { useSelector } from "react-redux";

const Tecnologia = () => {
  const [nombre, setNombre] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [tecnologias, setTecnologias] = useState(null);
  const token = useSelector(state => state.token);
  const [selectedState, setSelectedState] = useState("");
  const [estados, setEstados] = useState([]);
  const [postulantes, setPostulantes] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {

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
      fetchData();
    } catch (error) {
      console.error('Error al enviar el pedido POST:', error);
    }
  } else {
    console.log('Formulario inválido, por favor completa los campos requeridos');
  }
  };

  const handleClose = () => {
    setShowAlert(false);
  };
  const fetchData = async () => {
    try {
      const tecnologiasResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/tecnologia`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setTecnologias(tecnologiasResponse.data);
    } catch (error) {
      console.error('Error al obtener las tecnologías:', error);
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
            <div className='tecnologia-container p-5'>
              <h2>Tecnología</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="nombre" className="form-label">Nombre*</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese el nombre"
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
             {tecnologias && tecnologias.map(tec => (
               <span key={tec.id_tecnologia} className='badge bg-secondary me-1 mt-1'>{tec.nombre}</span>
            ))}
            </div>
          </div>

        </div>

        {/* {showAlert && (
          <div className="alert alert-success position-relative" role="alert" style={{ marginTop: '20px' }}>
            Se ha guardado correctamente.
            <button type="button" className="btn-close position-absolute top-0 end-0 me-2" aria-label="Close" onClick={handleClose}></button>
          </div>
        )} */}
      </div>
    </Layout>
    </>
  );
}

export default Tecnologia;
