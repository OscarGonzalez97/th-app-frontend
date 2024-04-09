import React, { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts/Layout"
import './Convocatoria.css';
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const Convocatoria = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [file, setFile] = useState(null);
    const [tecnologias, setTecnologias] = useState([]);
    const [tecnologiaSeleccionada, setTecnologiaSeleccionada] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState({});
    const token = useSelector(state => state.token);



    useEffect(() => {
        const fetchTecnologias = async () => {
            try {


                const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/tecnologia`);


                setTecnologias(response.data);
            }

            catch (error) {
                console.error('Error al obtener las tecnologías:', error);
            }


        }

        fetchTecnologias();
    }, []);

    const handleTecnologiaChange = (e) => {
        const inputsArray = Array.from(e.target.selectedOptions);
        const valoresArray = inputsArray.map(input => input.value);
        setTecnologiaSeleccionada(valoresArray);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const formData = new FormData();
            formData.append('convocatoria_info', JSON.stringify({
                title: title,
                description: description,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,


            }));
            formData.append('file', file);
            formData.append('convocatorias_tecnologias_ids', JSON.stringify(tecnologiaSeleccionada));

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/convocatoria`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Respuesta del servidor:', response.data);
            console.log(formData);


            setTitle('');
            setDescription('');
            setFechaInicio('');
            setFechaFin('');
            setFile(null);
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
    if (!title) {
        newErrors['title'] = 'Este campo es requerido';
    }
    if (!description) {
        newErrors['description'] = 'Este campo es requerido';
    }
    if (!fechaInicio) {
        newErrors['fechaInicio'] = 'Este campo es requerido';
    }
    if (!fechaFin) {
        newErrors['fechaFin'] = 'Este campo es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


    return (
        <Layout>
            <div className="convocatoria-container">
                <h2>Convocatorias</h2>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="title" className="form-label">Título *</label>
                        <input type="text" className="form-control" id="title" name="title"
                            placeholder="Ingrese el titulo" value={title} onChange={(e) => setTitle(e.target.value)} />
                      {errors['title'] && <span className="error-message"style={{color: 'red'}}>{errors['title']}</span>}
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Descripción *</label>
                        <textarea
                            className="form-control  description-input"
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Ingrese la descripción" value={description} onChange={(e) => setDescription(e.target.value)}  ></textarea>
                            {errors['description'] && <span className="error-message"style={{color: 'red'}}>{errors['description']}</span>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="fecha_inicio" className="form-label">Fecha de inicio *</label>
                        <input type="date" className="form-control" id="fecha_inicio" name="fecha_inicio"
                            placeholder="Ingrese la fecha" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                            {errors['fechaInicio'] && <span className="error-message"style={{color: 'red'}}>{errors['fechaInicio']}</span>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="fecha_fin" className="form-label">Fecha finalizada*</label>
                        <input type="date" className="form-control" id="fecha_fin" name="fecha_fin"
                            placeholder="Ingrese la fecha" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                        {errors['fechaFin'] && <span className="error-message"style={{color: 'red'}}>{errors['fechaFin']}</span>}
                    </div>



                    <div className="col-md-6">
                        <label htmlFor="file" className="form-label">Cargar imagen*</label>
                        <input type="file" className="form-control" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Tecnologías*</label>
                        <select className="form-select" id="tecnologia" onChange={(e) => handleTecnologiaChange(e)} multiple>
                            {tecnologias.map((tecnologia, index) => {
                                return <option key={index} value={tecnologia.id_tecnologia}>{tecnologia.nombre}</option>
                            })}

                        </select>
                        <span style={{ fontSize: '0.8em', fontStyle: 'italic' }}>Ctrl + click para seleccionar</span>
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
    )
}

export default Convocatoria
