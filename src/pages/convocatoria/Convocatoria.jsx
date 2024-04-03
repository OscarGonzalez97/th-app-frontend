import React, { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts/Layout"
import './Convocatoria.css';
import axios from "axios";
import { useSelector } from "react-redux";

const Convocatoria = () => {
    const token = useSelector(state => state.token);

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [linkConvocatoria, setLinkConvocatoria] = useState('');
    const [fileConvocatoria, setFileConvocatoria] = useState('');
    const [tecnologias, setTecnologias] = useState([]);

    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/v1/tecnologia`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setTecnologias(response.data);
            })
            .catch(error => {
                console.error('Error fetching tecnologias:', error);
            });
    }, [token])


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
                tecnologias: [4]

            };
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/convocatoria`, formData);
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
                            placeholder="Ingrese el titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
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
                            placeholder="Ingrese la fecha" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="link_convocatoria" className="form-label">Cargar link*</label>
                        <input href="#" className="form-control" id="link_convocatoria" name="link_convocatoria" placeholder="Ingrese la url" value={linkConvocatoria} onChange={(e) => setLinkConvocatoria(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="file_convocatoria" className="form-label">Cargar imagen*</label>
                        <input type="file" className="form-control" id="file_convocatoria" name="file_convocatoria" value={fileConvocatoria} onChange={(e) => setFileConvocatoria(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Tecnologías</label>
                        <select className="form-select" id="tecnologia">
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
