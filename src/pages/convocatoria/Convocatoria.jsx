import React, { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts/Layout"
import './Convocatoria.css';
import axios from "axios";
import { useSelector } from "react-redux";

const Convocatoria = () => {
   

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState(null);
    const [tecnologias, setTecnologias] = useState([]);
    const token = useSelector(state => state.token);


 
    

    useEffect(() => {
        const fetchTecnologias = async () => {
            try {
                
           
const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/tecnologia`);
                
            
setTecnologias(response.data); // Asignas las tecnologías recibidas del backend al estado
            } 
   
catch (error) {
                console.error('Error al obtener las tecnologías:', error);
            }
        
        
            }
        
fetchTecnologias();
    }, []);
    
    const handleTecnologiaChange = (e) => {
        const selectedTecnologias = Array.from(e.target.selectedOptions, option => option.value);
        setTecnologias(selectedTecnologias);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('convocatoria_info', JSON.stringify({
                title: title,
                description: description,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                link: link,
            
                // Asegúrate de incluir otros campos necesarios aquí
            }));
            formData.append('file', file);
            formData.append('convocatorias_tecnologias_ids', JSON.stringify(tecnologias));
    
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/convocatoria`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Respuesta del servidor:', response.data);
            console.log(formData);
    
            // Restablecer los campos del formulario después de enviar la solicitud
            setTitle('');
            setDescription('');
            setFechaInicio('');
            setFechaFin('');
            setLink('');
            setFile(null);
            setTecnologias([]);
    
        } catch (error) {
            console.log("aquiasdasd")
            console.error('Error al enviar el pedido POST:', error);
        }
    };



















   

    

    return (
        <Layout>
            <div className="convocatoria-container">
                <h2>Convocatorias</h2>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="title" className="form-label">Título *</label>
                        <input type="title" className="form-control" id="title" name="title"
                            placeholder="Ingrese el titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Descripción *</label>
                        <textarea
                            className="form-control  description-input"
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Ingrese la descripción" value={description} onChange={(e) => setDescription(e.target.value)}  ></textarea>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="fecha_inicio" className="form-label">Fecha de inicio *</label>
                        <input type="date" className="form-control" id="fecha_inicio" name="fecha_inicio"
                            placeholder="Ingrese la fecha" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="fecha_fin" className="form-label">Fecha finalizada*</label>
                        <input type="date" className="form-control" id="fecha_fin" name="fecha_fin"
                            placeholder="Ingrese la fecha" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="link" className="form-label">Cargar link*</label>
                        <input href="link" className="form-control" id="link" name="link" placeholder="Ingrese la url" value={link} onChange={(e) => setLink(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="file" className="form-label">Cargar imagen*</label>
                        <input type="file" className="form-control" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Tecnologías</label>
                        <select className="form-select" id="tecnologia"onChange={(e) => handleTecnologiaChange(e)}multiple>
                            {tecnologias.map(tecnologia => (
                                <option key={tecnologia.id} value={tecnologia.id}>{tecnologia.nombre}</option>
                            ))}
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
