import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './PostulanteForm.css';
import imagen from '../../imagenes/prog_backend.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCode, faStar, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector } from "react-redux";

const PostulanteForm = () => {
    const token = useSelector(state => state.token);

    // Estudios
    const [showEstudios, setShowEstudios] = useState(false);
    const handleCloseEstudios = () => setShowEstudios(false);
    const handleShowEstudios = () => setShowEstudios(true);

    //Experiencias
    const [showExperiencias, setShowExperiencias] = useState(false);
    const handleCloseExperiencias = () => setShowExperiencias(false);
    const handleShowExperiencias = () => setShowExperiencias(true);

    // Referencia
    const [showReferencias, setShowReferencias] = useState(false);
    const handleCloseReferencias = () => setShowReferencias(false);
    const handleShowReferencias = () => setShowReferencias(true);

    // Ciudades y Tecnología
    const [ciudades, setCiudades] = useState([]);
    const [tecnologias, setTecnologias] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/v1/ciudades`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCiudades(response.data);
            })
            .catch(error => {
                console.error('Error fetching ciudades:', error);
            }, [token])


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

    const [showTecnologias, setShowTecnologias] = useState(false);
    const handleCloseTecnologias = () => setShowTecnologias(false);
    const handleShowTecnologias = () => setShowTecnologias(true);


    // Validación de campos requeridos
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        nacionalidad: 'py',
        tipo_documento: 'ci',
        nro_documento: '',
        direccion: '',
        ciudad: '',
        fecha_nacimiento: '',
        telefono: '',
        nivel_ingles: 'basico',
        estado_civil: 'soltero',
        cargar_cv: ''
    });

    const validateForm = () => {
        const requiredFields = ['nombre', 'apellido', 'email', 'nro_documento', 'direccion', 'fecha_nacimiento', 'telefono', 'cargar_cv'];
        const newErrors = {};
    
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Este campo es requerido';
            }
        });
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    }

    // Post
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Aquí puedes enviar el formulario
            console.log('Formulario válido, enviando...');
        } else {
            console.log('Formulario inválido, por favor completa los campos requeridos');
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }


    return (
        <div className="postulante-container">
            <h1>Título</h1>
            <h2>Descripción</h2>

            <div className="d-flex justify-content-center">
                <img src={imagen} alt="Vacante" className="img-fluid" />
            </div>

            <h4>Datos Personales</h4>
            <h6>Todos los campos con (*) deben estar rellenados</h6>

            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre *</label>
                    <input type="text" className="form-control" id="nombre" name="nombre"
                        placeholder="Ingrese su nombre" 
                        value={formData.nombre}
                        onChange={handleChange}   
                    />
                    {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">Apellido *</label>
                    <input type="text" className="form-control" id="apellido" name="apellido"
                        placeholder="Ingrese su apellido"
                        value={formData.apellido}
                        onChange={handleChange} 
                    />
                    {errors.apellido && <div className="text-danger">{errors.apellido}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input type="email" className="form-control" id="email" name="email"
                        placeholder="Ingrese su email"
                        value={formData.email}
                        onChange={handleChange} 
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="nacionalidad" className="form-label">Nacionalidad</label>
                    <select id="nacionalidad" className="form-select" name="nacionalidad"
                        value={formData.nacionalidad}
                        onChange={handleChange}
                    >
                        <option value="py">Paraguay</option>
                        <option value="ar">Argentina</option>
                        <option value="br">Brasil</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="tipo_documento" className="form-label">Tipo de documento</label>
                    <select id="tipo_documento" className="form-select" name="tipo_documento"
                        value={formData.tipo_documento}
                        onChange={handleChange}
                    >
                        <option value="ci">Cédula de Identidad</option>
                        <option value="pass">Pasaporte</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="nro_documento" className="form-label">Número de documento *</label>
                    <input type="text" className="form-control" id="nro_documento" name="nro_documento"
                        placeholder="Ingrese su número de documento"
                        value={formData.nro_documento}
                        onChange={handleChange}
                    />
                    {errors.nro_documento && <div className="text-danger">{errors.nro_documento}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="direccion" className="form-label">Dirección *</label>
                    <input type="text" className="form-control" id="direccion" name="direccion"
                        placeholder="Ingrese su dirección"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                    {errors.direccion && <div className="text-danger">{errors.direccion}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <select className="form-select" id="ciudad" name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                    >
                        {ciudades.map(ciudad => (
                            <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento *</label>
                    <input type="date" className="form-control" id="fecha_nacimiento" name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                    />
                    {errors.fecha_nacimiento && <div className="text-danger">{errors.fecha_nacimiento}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label">Teléfono *</label>
                    <input type="text" className="form-control" id="telefono" name="telefono"
                        placeholder="Ingrese su número de teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                    {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="nivel_ingles" className="form-label">Nivel de inglés</label>
                    <select id="nivel_ingles" className="form-select" name="nivel_ingles"
                        value={formData.nivel_ingles}
                        onChange={handleChange}
                    >
                        <option value="basico">Básico</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="estado_civil" className="form-label">Estado civil</label>
                    <select id="estado_civil" className="form-select" name="estado_civil"
                        value={formData.estado_civil}
                        onChange={handleChange}
                    >
                        <option value="soltero">Soltero/a</option>
                        <option value="casado">Casado/a</option>
                        <option value="divorciado">Divorciado/a</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-12">
                    <label htmlFor="cargar_cv" className="form-label">Cargar CV *</label>
                    <input type="file" className="form-control" id="cargar_cv" name="cargar_cv"
                        value={formData.cargar_cv}
                        onChange={handleChange}
                    />
                    {errors.cargar_cv && <div className="text-danger">{errors.cargar_cv}</div>}
                </div>


                {/* Modal Estudios */}
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
                                    <Form.Select>
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
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="descripcion_estudio">
                                    <Form.Label>Carrera/Bachiller/Tema de curso *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su carrera/bachiller/tema de curso "
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="estado_estudio">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select>
                                        <option>En curso</option>
                                        <option>Finalizado</option>
                                        <option>Suspendido</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-md-6" controlId="fecha_inicio">
                                    <Form.Label>Fecha de inicio *</Form.Label>
                                    <Form.Control
                                        type="date"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-6" controlId="fecha_fin">
                                    <Form.Label>Fecha de fin</Form.Label>
                                    <Form.Control
                                        type="date"
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


                {/* Modal Tecnologías */} 
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
                                    <Form.Select>
                                        {tecnologias.map(tecnologia => (
                                            <option key={tecnologia.id} value={tecnologia.id}>{tecnologia.nombre}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="nivel">
                                    <Form.Label>Nivel</Form.Label>
                                    <Form.Select>
                                        <option>Básico</option>
                                        <option>Intermedio</option>
                                        <option>Avanzado</option>
                                    </Form.Select>
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

                <div className="col-12">
                    <h4>Otras Tecnologías</h4>
                    <textarea className="form-control" id="otras_tecnologias" name="otras_tecnologias"
                        placeholder="Si tienes alguna tecnología que no figura en la sección anterior. Escríbelo aquí." rows="3"></textarea>
                </div>


                {/* Modal Experiencias */} 
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
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="cargo">
                                    <Form.Label>Cargo *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su cargo"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-6" controlId="fecha_desde">
                                    <Form.Label>Fecha de desde *</Form.Label>
                                    <Form.Control
                                        type="date"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-6" controlId="fecha_hasta">
                                    <Form.Label>Fecha hasta</Form.Label>
                                    <Form.Control
                                        type="date"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="descripcion_experiencia">
                                    <Form.Label>Descripción *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese una descripción"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="referencia">
                                    <Form.Label>Nombre de la referencia</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre de su referencia"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="telefono_referencia">
                                    <Form.Label>Teléfono de la refencia</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el teléfono de su refencia"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="motivo_salida">
                                    <Form.Label>Motivo de salida</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Ingrese el motivo de su salida"
                                        style={{ height: '75px' }}
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="tipo_experiencia">
                                    <Form.Label>Tipo de experiencia</Form.Label>
                                    <Form.Select>
                                        <option>Trabajo normal</option>
                                        <option>Pasantia</option>
                                    </Form.Select>
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


                {/* Modal Referencia Personal */} 
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
                                <Form.Group className="col-md-12" controlId="nombre_relacion">
                                    <Form.Label>Nombre *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre de su referencia"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="relacion">
                                    <Form.Label>Relación *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la relación con su referencia"
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-12" controlId="telefono_relacion">
                                    <Form.Label>Teléfono *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el número de teléfono de su relación"
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


                <div className="col-12 d-flex justify-content-end">
                    <button type="button" className="btn btn-danger me-2">Cancelar</button>
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>

            </form>
        </div>
    );
}

export default PostulanteForm;
