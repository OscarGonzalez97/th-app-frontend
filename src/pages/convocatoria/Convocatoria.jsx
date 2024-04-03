import React, { useState } from 'react';
import { Layout } from "../../components/layouts/Layout"
import './Convocatoria.css';
import axios from "axios";

const Convocatoria = () => {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [linkConvocatoria, setLinkConvocatoria] = useState('');
    const [fileConvocatoria, setFileConvocatoria] = useState('');
    
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = {
            titulo: titulo,
            descripcion: descripcion,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            link: linkConvocatoria,
            file_path: fileConvocatoria,
            tecnologias: tecnologias

        };
        const response = await axios.post('http://localhost:8082/thbackend/v1/convocatoria', formData);
    
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    }

    
  return (
    <Layout>
       <div className="convocatoria-container">
            <h2>Convocatorias</h2>
         

            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="titulo" className="form-label">Título *</label>
                    <input type="text" className="form-control" id="titulo" name="titulo"
                        placeholder="Ingrese el titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                </div>

                <div className="col-md-12">
                    <label htmlFor="descripcion" className="form-label">Descripción *</label>
                    <textarea 
                      className="form-control  description-input" 
                      id="descripcion" 
                      name="descripcion" 
                     rows="4" 
                    placeholder="Ingrese la descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}  ></textarea>
                </div>
            


                <div className="col-md-6">
                    <label htmlFor="fecha_inicio" className="form-label">Fecha de inicio *</label>
                    <input type="date" className="form-control" id="fecha_inicio" name="fecha_inicio"
                        placeholder="Ingrese la fecha" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                </div>
                

               
                <div className="col-md-6">
                    <label htmlFor="fecha_fin" className="form-label">Fecha finalizada*</label>
                    <input type="date" className="form-control" id="fecha_fin" name="fecha_fin"
                        placeholder="Ingrese la fecha"value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                </div>



                <div className="col-md-6">
                    <label htmlFor="link_convocatoria" className="form-label">Cargar link*</label>
                    <input href="#" className="form-control" id="link_convocatoria" name="link_convocatoria"  placeholder="Ingrese la url" value={linkConvocatoria} onChange={(e) => setLinkConvocatoria(e.target.value)} />
                </div>

                
               
                 
                <div className="col-md-6">
                    <label htmlFor="file_convocatoria" className="form-label">Cargar imagen*</label>
                    <input type="file" className="form-control" id="file_convocatoria" name="file_convocatoria"value={fileConvocatoria} onChange={(e) => setFileConvocatoria(e.target.value)} />
                </div>
           

                <div className="col-md-6">
                  <label className="form-label">Lista de Tecnologias</label>
                  <select className="form-select form-select-sm" >
                    <option value="">Seleccionar tecnologias</option>
                    <option value="1">Tecnología 1</option>
                     <option value="2">Tecnología 2</option>
                    </select>
                </div>


                


                <div className="col-12 d-flex justify-content-end">
                
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>
           </form>
     </div>
            
    </Layout>
  )
}

export default Convocatoria
