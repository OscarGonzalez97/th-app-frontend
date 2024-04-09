import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './PostulanteForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCode, faStar, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'

const PostulanteForm = () => {
    const token = useSelector(state => state.token);

    // Datos del Postulante
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [tipo_documento, setTipoDocumento] = useState('ci');
    const [nro_documento, setNroDocumento] = useState('');
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState([]);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState('1');
    const [fecha_nacimiento, setFechaNacimiento] = useState('');
    const [nro_telefono, setNroTelefono] = useState('');
    const [nivel_ingles, setNivelIngles] = useState('basico');
    const [estado, setEstado] = useState('');

    const [files, setFiles] = useState(null);

    const [comentario_rrhh, setComentarioRRHH] = useState('');
    const [fecha_actualizacion, setFechaActualizacion] = useState('');
    const [fecha_creacion, setFechaCreacion] = useState('');
    const [fecha_contratado, setFechaContratado] = useState('');


    // Estudios
    const [estudios, setEstudios] = useState([]);
    const [showEstudios, setShowEstudios] = useState(false);
    const handleCloseEstudios = () => setShowEstudios(false);
    const handleShowEstudios = () => setShowEstudios(true);
    const [estado_estudios, setEstadoEstudios] = useState([]);
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');
    const [descripcion_estudios, setDescripcionEstudios] = useState('');
    const [tipo_estudio, setTipoEstudio] = useState([]);
    const [institucion, setInstitucion] = useState('');

    // Tecnologías
    const [tecnologias, setTecnologias] = useState([]);
    const [tecnologiasasignadas, setTecnologiasAsignadas] = useState([]);
    const [showTecnologias, setShowTecnologias] = useState(false);
    const handleCloseTecnologias = () => setShowTecnologias(false);
    const handleShowTecnologias = () => setShowTecnologias(true);

    // Experiencias
    const [experiencias, setExperiencias] = useState([]);
    const [showExperiencias, setShowExperiencias] = useState(false);
    const handleCloseExperiencias = () => setShowExperiencias(false);
    const handleShowExperiencias = () => setShowExperiencias(true);
    const [cargo, setCargo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_desde, setFechaDesde] = useState('');
    const [fecha_hasta, setFechaHasta] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [nombre_referencia, setNombreReferencia] = useState('');
    const [telefono_referencia, setTelefonoReferencia] = useState('');
    const [tipo_experiencia, setTipoExperiencia] = useState([]);


    // Referencias
    const [referencia_personal, setReferenciaPersonal] = useState([]);
    const [showReferencias, setShowReferencias] = useState(false);
    const handleCloseReferencias = () => setShowReferencias(false);
    const handleShowReferencias = () => setShowReferencias(true);
    const [nombre_ref, setNombreRef] = useState('');
    const [relacion, setRelacion] = useState('');
    const [telefono, setTelefono] = useState('');


    // Convocatorias
    const [convocatorias, setConvocatorias] = useState([]);
    const [convocatoriaActual, setConvocatoriaActual] = useState(null);
    const { id } = useParams();


    const [loading, setLoading] = useState(false); // Estado para controlar si se está cargando o no
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/v1/ciudades`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCiudad(response.data);
            })
            .catch(error => {
                console.error('Error fetching ciudades:', error);
            });


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


        axios.get(`${import.meta.env.VITE_API_URL}/v1/convocatoria`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setConvocatorias(response.data);
            })
            .catch(error => {
                console.error('Error fetching convocatorias:', error);
            });

    }, []);

    useEffect(() => {
        const convocatoria = convocatorias.find(convocatoria => convocatoria.id_convocatoria === parseInt(id));
        setConvocatoriaActual(convocatoria);
    }, [convocatorias, id]);

    const handleTecnologiaChange = (e) => {
        const inputsArray = Array.from(e.target.selectedOptions);
        const valoresArray = inputsArray.map(input => input.value);
        setTecnologiasAsignadas(valoresArray);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {

            try {
                const formData = new FormData();
                formData.append('postulante_info', JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    nro_documento: nro_documento,
                    tipo_documento: tipo_documento,
                    correo: correo,
                    direccion: direccion,
                    nro_telefono: nro_telefono,
                    fecha_nacimiento: fecha_nacimiento,
                    nivel_ingles: nivel_ingles,
                    id_ciudad: ciudadSeleccionada,
                    id_estado: "2",
                }));
                formData.append('files', files);
                formData.append('convocatoria_id', convocatoriaActual.id_convocatoria);
                formData.append('experiencias', "");
                formData.append('estudios', "");
                formData.append('tecnologias_id', "[]");
                formData.append('referencias_personales', "");

                setLoading(true); // Establece el estado de carga a true al iniciar la solicitud
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/postulante`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setLoading(false); // Establece el estado de carga a false después de recibir la respuesta

                console.log('Respuesta del servidor:', response.data);
                console.log(formData);


                setNombre('');
                setApellido('');
                setNroDocumento('');
                setTipoDocumento("");
                setNroDocumento('');
                setCorreo('');
                setDireccion('');
                setNroTelefono('');
                setFechaNacimiento('');
                setNivelIngles([]);
                setCiudad([]);
                setEstado('');

                setFiles(null);

                setCargo('');
                setDescripcion('');
                setFechaDesde('');
                setFechaHasta('');
                setEmpresa('');
                setNombreReferencia('');
                setTelefonoReferencia('');
                setTipoExperiencia('');

                setEstadoEstudios('');
                setFechaInicio('');
                setFechaFin('');
                setDescripcionEstudios('');
                setTipoEstudio('');
                setInstitucion('');

                setNombreRef('');
                setRelacion('');
                setTelefono('');

                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
            } catch (error) {
                setLoading(false);
                console.error('Error al enviar el pedido POST:', error);
            }
            console.log('Formulario válido, enviando...');
        } else {
            console.log('Formulario inválido, por favor completa los campos requeridos');
        }
    }


    const validateForm = () => {
        const newErrors = {};
        if (!nombre) {
            newErrors['nombre'] = 'Este campo es requerido';
        }
        if (!apellido) {
            newErrors['apellido'] = 'Este campo es requerido';
        }
        if (!correo) {
            newErrors['correo'] = 'Este campo es requerido';
        }
        if (!nro_documento) {
            newErrors['nro_documento'] = 'Este campo es requerido';
        }
        if (!direccion) {
            newErrors['direccion'] = 'Este campo es requerido';
        }
        if (!fecha_nacimiento) {
            newErrors['fecha_nacimiento'] = 'Este campo es requerido';
        }
        if (!nro_telefono) {
            newErrors['nro_telefono'] = 'Este campo es requerido';
        }
        if (!files) {
            newErrors['files'] = 'Este campo es requerido';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    return (
        <div className="postulante-container">

            {convocatoriaActual && (
                <>
                    <h1>{convocatoriaActual.title}</h1>
                    <h2>{convocatoriaActual.description}</h2>
                    <div className="d-flex justify-content-center">
                        <img src={convocatoriaActual.file_path} alt="Vacante" className="img-fluid" />
                    </div>
                    <h4>Datos Personales</h4>
                    <h6>Todos los campos con (*) deben estar rellenados</h6>
                </>
            )}

            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre *</label>
                    <input type="text" className="form-control" id="nombre" name="nombre"
                        placeholder="Ingrese su nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    {errors['nombre'] && <span className="error-message" style={{ color: 'red' }}>{errors['nombre']}</span>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">Apellido *</label>
                    <input type="text" className="form-control" id="apellido" name="apellido"
                        placeholder="Ingrese su apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    {errors['apellido'] && <span className="error-message" style={{ color: 'red' }}>{errors['apellido']}</span>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="correo" className="form-label">Correo *</label>
                    <input type="email" className="form-control" id="correo" name="correo"
                        placeholder="Ingrese su correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    {errors['correo'] && <span className="error-message" style={{ color: 'red' }}>{errors['correo']}</span>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="nro_telefono" className="form-label">Teléfono *</label>
                    <input type="text" className="form-control" id="nro_telefono" name="nro_telefono"
                        placeholder="Ingrese su número de teléfono"
                        value={nro_telefono}
                        onChange={(e) => setNroTelefono(e.target.value)}
                    />
                    {errors['nro_telefono'] && <span className="error-message" style={{ color: 'red' }}>{errors['nro_telefono']}</span>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="tipo_documento" className="form-label">Tipo de documento</label>
                    <select id="tipo_documento" className="form-select" name="tipo_documento"
                        value={tipo_documento}
                        onChange={(e) => {
                            setTipoDocumento(e.target.value)
                        }}
                    >
                        <option value="ci">Cédula de Identidad</option>
                        <option value="pass ">Pasaporte</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="nro_documento" className="form-label">Número de documento *</label>
                    <input type="text" className="form-control" id="nro_documento" name="nro_documento"
                        placeholder="Ingrese su número de documento"
                        value={nro_documento}
                        onChange={(e) => setNroDocumento(e.target.value)}
                    />
                    {errors['nro_documento'] && <span className="error-message" style={{ color: 'red' }}>{errors['nro_documento']}</span>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="direccion" className="form-label">Dirección *</label>
                    <input type="text" className="form-control" id="direccion" name="direccion"
                        placeholder="Ingrese su dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                    {errors['direccion'] && <span className="error-message" style={{ color: 'red' }}>{errors['direccion']}</span>}
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
                    {errors['fecha_nacimiento'] && <span className="error-message" style={{ color: 'red' }}>{errors['fecha_nacimiento']}</span>}
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
                    <label htmlFor="files" className="form-label">Cargar CV *</label>
                    <input type="file" className="form-control" id="files" name="files"
                        onChange={(e) => setFiles(e.target.files[0])}
                    />
                    {errors['files'] && <span className="error-message" style={{ color: 'red' }}>{errors['files']}</span>}
                </div>


                {/*

                <div className="col-12 d-flex align-items-center">
                    <h4 className="m-10 me-2"><FontAwesomeIcon icon={faGraduationCap} /> Estudios</h4>
                    <Button variant="light" size="sm" onClick={handleShowEstudios}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>

                <>
                    <Modal show={showEstudios} onHide={handleCloseEstudios} className="postulante-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>Estudios</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className='row g-3'>
                                <Form.Group className="col-md-12" controlId="tipo_estudio">
                                    <Form.Label>Tipo de estudio</Form.Label>
                                    <Form.Select value={tipo_estudio} onChange={(e) => setTipoEstudio(e.target.value)}>
                                        <option>Terciario</option>
                                        <option>Secundario</option>
                                        <option>Curso</option>
                                        <option>Post Grado</option>
                                        <option>Otro</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="institucion_estudio">
                                    <Form.Label>Institución *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre de la institución"
                                        value={institucion} onChange={(e) => setInstitucion(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="descripcion_estudio">
                                    <Form.Label>Carrera/Bachiller/Tema de curso *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su carrera/bachiller/tema de curso "
                                        value={descripcion_estudios} onChange={(e) => setDescripcionEstudios(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="estado_estudio">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select id="estado" value={estado_estudios} onChange={(e) => setEstadoEstudios(e.target.value)}>
                                        <option>En curso</option>
                                        <option>Finalizado</option>
                                        <option>Suspendido</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-md-6" controlId="fecha_inicio">
                                    <Form.Label>Fecha de inicio *</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fecha_inicio} onChange={(e) => setFechaInicio(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-6" controlId="fecha_fin">
                                    <Form.Label>Fecha de fin</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fecha_fin} onChange={(e) => setFechaFin(e.target.value)}
                                    />
                                </Form.Group>
                                <Button className="col-md-3 me-2 ms-auto" variant="secondary" onClick={handleCloseEstudios}>
                                    Cerrar
                                </Button>
                                <Button className="col-md-3" variant="primary" type="submit">
                                    Agregar
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>


                <div className="col-12 d-flex align-items-center">
                    <h4 className="m-10 me-2"><FontAwesomeIcon icon={faCode} /> Tecnologías *</h4>
                    <Button variant="light" size="sm" onClick={handleShowTecnologias}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>

                <>
                    <Modal show={showTecnologias} onHide={handleCloseTecnologias} className="postulante-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>Tecnologías</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className='row g-3'>
                                <Form.Group className="col-md-12" controlId="tecnologia">
                                    <Form.Label>Tecnología</Form.Label>
                                    <Form.Select onChange={(e) => handleTecnologiaChange(e)}>
                                        {tecnologias.map(tecnologia => (
                                            <option key={tecnologia.id_tecnologia} value={tecnologia.id_tecnologia}>{tecnologia.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Button className="col-md-3 me-2 ms-auto" variant="secondary" onClick={handleCloseTecnologias}>
                                    Cerrar
                                </Button>
                                <Button className="col-md-3" variant="primary" type="submit">
                                    Agregar
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>

                <div className="col-12">
                    <h4>Otras Tecnologías</h4>
                    <textarea className="form-control" id="otras_tecnologias" name="otras_tecnologias"
                        placeholder="Si tienes alguna tecnología que no figura en la sección anterior. Escríbelo aquí." rows="3"></textarea>
                </div>


                <div className="col-12 d-flex align-items-center">
                    <h4 className="m-10 me-2"><FontAwesomeIcon icon={faStar} /> Experiencias</h4>
                    <Button variant="light" size="sm" onClick={handleShowExperiencias}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>

                <>
                    <Modal show={showExperiencias} onHide={handleCloseExperiencias} className="postulante-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>Experiencia</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className='row g-3'>
                                <Form.Group className="col-md-12" controlId="empresa">
                                    <Form.Label>Empresa *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre de la empresa"
                                        value={empresa} onChange={(e) => setEmpresa(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="cargo">
                                    <Form.Label>Cargo *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su cargo"
                                        value={cargo} onChange={(e) => setCargo(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-6" controlId="fecha_desde">
                                    <Form.Label>Fecha de desde *</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fecha_desde} onChange={(e) => setFechaDesde(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-6" controlId="fecha_hasta">
                                    <Form.Label>Fecha hasta</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fecha_hasta} onChange={(e) => setFechaHasta(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="descripcion">
                                    <Form.Label>Descripción *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese una descripción"
                                        value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="nombre_referencia">
                                    <Form.Label>Nombre de la referencia</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre de su referencia"
                                        value={nombre_referencia} onChange={(e) => setNombreReferencia(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="telefono_referencia">
                                    <Form.Label>Teléfono de la refencia</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el teléfono de su refencia"
                                        value={telefono_referencia} onChange={(e) => setTelefonoReferencia(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="tipo_experiencia">
                                    <Form.Label>Tipo de experiencia</Form.Label>
                                    <Form.Select value={tipo_experiencia} onChange={(e) => setTipoExperiencia(e.target.value)}>
                                        <option>Trabajo normal</option>
                                        <option>Pasantia</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button className="col-md-3 me-2 ms-auto" variant="secondary" onClick={handleCloseExperiencias}>
                                    Cerrar
                                </Button>
                                <Button className="col-md-3" variant="primary" type="submit">
                                    Agregar
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>


                <div className="col-12 d-flex align-items-center">
                    <h4 className="m-10 me-2"><FontAwesomeIcon icon={faUser} /> Referencia Personal</h4>
                    <Button variant="light" size="sm" onClick={handleShowReferencias}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>

                <>
                    <Modal show={showReferencias} onHide={handleCloseReferencias} className="postulante-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>Referencia personal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className='row g-3'>
                                <Form.Group className="col-md-12" controlId="nombre">
                                    <Form.Label>Nombre *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre de su referencia"
                                        value={nombre_ref} onChange={(e) => setNombreRef(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="relacion">
                                    <Form.Label>Relación *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la relación con su referencia"
                                        value={relacion} onChange={(e) => setRelacion(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="telefono">
                                    <Form.Label>Teléfono *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el número de teléfono de su relación"
                                        value={telefono} onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </Form.Group>
                                <Button className="col-md-3 me-2 ms-auto" variant="secondary" onClick={handleCloseReferencias}>
                                    Cerrar
                                </Button>
                                <Button className="col-md-3" variant="primary" type="submit">
                                    Agregar
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>

            */}

                <div className="col-12 d-flex justify-content-end">
                    <div className='flex'>
                        <button type="button" className="btn btn-danger me-2">Cancelar</button>
                        <button type="submit" className="btn btn-success">Guardar</button>
                    </div>

                    {/* Mostrar el componente de carga si loading es true */}
                    <div className="loader-container">
                        {loading && <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />}
                    </div>

                </div>

            </form>

            {showAlert && (
                <div className="alert alert-success position-relative" role="alert" style={{ marginTop: '20px' }}>
                    <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                    Se ha guardado correctamente.
                </div>
            )}

        </div>
    );
}

export default PostulanteForm;
