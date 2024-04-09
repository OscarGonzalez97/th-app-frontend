import { Layout } from "../../components/layouts/Layout"
import React, { useEffect ,useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const Beneficios = () => {

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const token = useSelector(state => state.token);



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/beneficio`, {
        
        
titulo: titulo ,
descripcion: descripcion
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Respuesta del servidor:', response.data);

      setTitulo('');
      setDescripcion('');  
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
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

const validateForm = () => {
    const newErrors = {};
    if (!titulo) {
      newErrors['titulo'] = 'Este campo es requerido';
    }
    if (!descripcion) {
      newErrors['descripcion'] = 'Este campo es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  return (
    <Layout>
    
    <div className="tecnologia-container convocatoria-container">
            <h2>Beneficios</h2>

            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                <label htmlFor="titulo" className="form-label">Titulo*</label>
                    <input type="text" className="form-control" id="titulo" name="titulo"
                        placeholder="Titulo de beneficio" 
                        value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
                      />
                      {errors['titulo'] && <span className="error-message" style={{ color: 'red' }}>{errors['titulo']}</span>}
                </div>

                <div className="col-md-12">
                    <label htmlFor="descripcion" className="form-label">Descripción *</label>
                    <textarea 
                      className="form-control  description-input" 
                      id="descripcion" 
                      name="descripcion" 
                     rows="4" 
                    placeholder="Ingrese la descripción"  
                    value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
                     ></textarea>
              {errors['descripcion'] && <span className="error-message" style={{ color: 'red' }}>{errors['descripcion']}</span>}
                

                </div>

                <div className="col-12 d-flex justify-content-end">
                
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>

            </form>
     
            {showAlert && (
          <div className="alert alert-success position-relative" role="alert" style={{ marginTop: '20px' }}>
             <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Se ha guardado correctamente.
          </div>
        )}

    </div>
   </Layout> 
  );
};

export default Beneficios