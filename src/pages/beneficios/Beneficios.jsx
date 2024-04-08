import { Layout } from "../../components/layouts/Layout"
import React, { useEffect ,useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";

const Beneficios = () => {

  const [titulo, setTitulo] = useState('');
 
  const [descripcion, setDescripcion] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const token = useSelector(state => state.token);


   useEffect(() => {
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    } catch (error) {
      console.error('Error al enviar el pedido POST:', error);
    }
  };


  const handleClose = () => {
    setShowAlert(false);
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
  );
};

export default Beneficios