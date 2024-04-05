import { Layout } from "../../components/layouts/Layout"
import React, { useEffect ,useState } from 'react';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
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
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Se ha guardado correctamente.
          </Alert>
            )}
    </div>
   </Layout> 
  );
};

export default Beneficios