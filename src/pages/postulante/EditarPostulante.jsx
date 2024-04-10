import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostulanteForm.css';
import './EditarPostulante.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle , faTrash} from '@fortawesome/free-solid-svg-icons';
import { ColorRing } from 'react-loader-spinner'
import { Layout } from "../../components/layouts/Layout";


function EditarPostulante() {
    const token = useSelector(state => state.token); // para extraer el valor del token del store
    const { id } = useParams();
    const [datosAPI, setDatosAPI] = useState(null);
   
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [tipoDeDocumento, setTipoDeDocumento] = useState(''); 
    const [numeroDeDocumento, setNumeroDeDocumento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState('');
    const [nivel_ingles, setNivelIngles] = useState('basico');
    const [ciudad, setCiudad] = useState([]);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
    const [estados, setEstados] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [convocatoria, setConvocatoria] = useState('');
    const [updatedFiles, setUpdatedFiles] = useState([])

    const [comentarioRRHH, setComentarioRRHH] = useState('');

    const [files, setFiles] = useState([]);

    const [showAlert, setShowAlert] = useState(false);

    const [loading, setLoading] = useState(false); // Estado para controlar si se está cargando o no


    // Agrega más estados según sea necesario para otros campos del formulario

    const showFile = (file) => {
        // Verifica si el archivo está presente en la lista de archivos
        return files.some(f => f.id_files === file.id_files);
    };

    // Función para obtener los datos del postulante desde la API
    async function fetchData() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/postulante/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDatosAPI(response.data); // Almacenar todos los datos en la variable de estado
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setCorreo(response.data.correo);
            setTipoDeDocumento(response.data.tipo_documento); //nose va poder cambiar
            setNumeroDeDocumento(response.data.nro_documento);
            setDireccion(response.data.direccion);
            setTelefono(response.data.nro_telefono);
            setFechaNacimiento(response.data.fecha_nacimiento);
            setNivelIngles(response.data.nivel_ingles);
            setCiudadSeleccionada(response.data.ciudad.id_ciudad);
            setEstadoSeleccionado(response.data.estado.id_estado);
            setConvocatoria(response.data.convocatoria.id_convocatoria);
            setComentarioRRHH(response.data.comentario_rrhh);
            setFiles(response.data.files);
        } catch (error) {
            console.error('Error al obtener los datos de la API:', error);
        }
    }
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/v1/ciudades`)
            .then(response => {
                setCiudad(response.data);
            })
            .catch(error => {
                console.error('Error fetching ciudades:', error);
            });
    },[]);
    
    useEffect(() => {
        async function fetchEstados() {
            axios.get(`${import.meta.env.VITE_API_URL}/v1/estados`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setEstados(response.data);
            })
            .catch(error => {
                console.error('Error fetching estados:', error);
            });
        }
        if(id && token) {
            fetchEstados(); // Llamar a la función para obtener datos cuando el componente se monta
            fetchData(); // Llamar a la función para obtener datos cuando el componente se monta
        }
    }, [id, token]); // Este efecto se ejecutará cada vez que cambie el ID o el token

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                const formData = new FormData();
                formData.append('postulante_info', JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    nro_documento: numeroDeDocumento,
                    tipo_documento: tipoDeDocumento,
                    correo: correo,
                    direccion: direccion,
                    nro_telefono: telefono,
                    fecha_nacimiento: fecha_nacimiento,
                    nivel_ingles: nivel_ingles,
                    id_ciudad: ciudadSeleccionada,
                    id_estado: estadoSeleccionado,
                    comentario_rrhh :comentarioRRHH,
                }));
                formData.append('files', updatedFiles);
                formData.append('convocatoria_id', convocatoria);
                formData.append('experiencias', "");
                formData.append('estudios', "");
                formData.append('tecnologias_id', "[]");
                formData.append('referencias_personales', "");
                setLoading(true); 
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/v1/postulante/${id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'

                    }
                }).then(() =>{
                    fetchData();
                    setUpdatedFiles([]);

                });
                setLoading(false);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);

            } catch (error) {
                setLoading(false);
                console.error('Error al enviar el pedido POST:', error);
            }
           
    }


    const deleteFile = async (id) => {
        // Eliminar el archivo
        axios.delete(`${import.meta.env.VITE_API_URL}/v1/eliminarfile/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(() => {
            fetchData();
        })
        
        .catch((error) => {
            // Manejar el error al eliminar el archivo
            console.error("Error al eliminar el archivo:", error);
        });
    };
    
    



    return (
        <Layout>
            <div className="postulante-container "> 
            <h1>Editar Postulantes</h1>               
            <form className="row g-3 form-container"  onSubmit={handleSubmit}>
                {datosAPI ? (
                    <>
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">Nombre </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre" 
                                name= "nombre"
                                value={nombre} // Si hay un valor en "nombre", se mostrará, de lo contrario se mostrará el valor de la API
                                onChange={(e) => setNombre(e.target.value)} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="apellido" className="form-label">Apellido </label>
                            <input type="text" className="form-control" id="apellido" name="apellido"
                                placeholder="Ingrese su apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="correo" className="form-label">Correo *</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="correo" 
                                value={correo} 
                                onChange={(e) => setCorreo(e.target.value)} 
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telefono" className="form-label">Teléfono </label>
                            <input type="text" className="form-control" id="nro_telefono" name="nro_telefono"
                                placeholder="Ingrese su número de teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="tipoDeDocumento" className="form-label">Tipo de documento</label>
                            <select id="tipo_documento" className="form-select" name="tipo_documento" disabled>
                            {/* Opción seleccionada según el valor actual */}
                            <option value={tipoDeDocumento}>{tipoDeDocumento === 'ci' ? 'Cédula de Identidad' : 'Pasaporte'}</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="numeroDeDocumento" className="form-label">Número de documento </label>
                            <input type="text" className="form-control" id="nro_documento" name="nro_documento"
                                placeholder="Ingrese su número de documento"
                                value={numeroDeDocumento}
                                onChange={(e) => setNumeroDeDocumento(e.target.value)}
                            />
                        </div> 
                        <div className="col-md-6">
                            <label htmlFor="direccion" className="form-label">Dirección </label>
                            <input type="text" className="form-control" id="direccion" name="direccion"
                                placeholder="Ingrese su dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>


                        <div className="col-md-6">
                            <label htmlFor="ciudad" className="form-label">Ciudad</label>
                            <select className="form-select" id="ciudad" name="ciudad"
                                value={ciudadSeleccionada}
                                onChange={(e) => setCiudadSeleccionada(e.target.value)}
                            >
                                {ciudad.map(ciudad => (
                                    <option key={ciudad.id_ciudad} value={ciudad.id_ciudad}>{ciudad.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento *</label>
                            <input type="date" className="form-control" id="fecha_nacimiento" name="fecha_nacimiento"
                                value={fecha_nacimiento}
                                 onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nivel_ingles" className="form-label">Nivel de inglés</label>
                            <select id="nivel_ingles" className="form-select" name="nivel_ingles"
                                value={nivel_ingles}
                                onChange={(e) => setNivelIngles(e.target.value)}
                            >
                                <option value="basico">Básico</option>
                                <option value="intermedio">Intermedio</option>
                                <option value="avanzado">Avanzado</option>
                                {/* Agrega más opciones según sea necesario */}
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label htmlFor="files" className="form-label">Archivos *</label>
                            {files && (
                                <ul>
                                    {files.map(file => (
                                        <li key={file.id_files}>
                                            {showFile(file) && (
                                                <div className='d-flex gap-1' >
                                                    <a href={file.linkToFile} className='linkToFile'>{file.linkToFile}</a>
                                                    <div type='button' onClick={() => deleteFile(file.id_files)}>
                                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#fcfcfc",marginTop:'15px', marginLeft: 'auto'}} />
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <input type="file" multiple className="form-control" id="filesUpdated" name="filesUpdated"
                                onChange={(e) => setUpdatedFiles(e.target.files[0])}
                            />
                        </div>


                        <div className="col-md-12">
                            <label htmlFor="estados" className="form-label">Estado</label>
                            <select className="form-select" id="estados" name="estados"
                                value={estadoSeleccionado}
                                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                            >
                                {estados.map(estados => (
                                    <option key={estados.id_estado} value={estados.id_estado}>{estados.estado}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-md-12">
                            <label htmlFor="comentarioRRHH" className="form-label">Comentarios RRHH *</label>
                            <input type="text" className="form-control" id="comentarioRRHH" name="comentarioRRHH"
                                value={comentarioRRHH}
                                onChange={(e) => setComentarioRRHH(e.target.value)}
                            />
                        </div>

                        <button type="submit">Guardar</button>
                        <div className="loader-container">
                        { loading && <ColorRing
                            visible={true}
                            width="auto"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />}
                    </div>
                    </>
                ):(
                    <p style= {{textAlign: 'center', fontSize:'25px', margin: '100px auto 0' }}>No hay datos disponibles para actualizar</p>
                )
                }
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
}

export default EditarPostulante;
