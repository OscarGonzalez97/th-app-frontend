import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostulanteForm.css';
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
    const [nacimiento, setNacimiento] = useState('');
    const [ingles, setIngles] = useState('');
    const [idCiudad, setIdCiudad] = useState('');
    const [idEstado, setIdEstado] = useState('');
    const [comentarioRRHH, setComentarioRRHH] = useState('');

    // Agrega más estados según sea necesario para otros campos del formulario

   
    useEffect(() => {
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
                setTipoDeDocumento(response.data.tipoDeDocumento); //nose va poder cambiar
                setNumeroDeDocumento(response.data.nro_documento);
                setDireccion(response.data.direccion);
                setTelefono(response.data.nro_telefono);
                setNacimiento(response.data.fecha_nacimiento);
                setIngles(response.data.nivel_ingles);
                setIdCiudad(response.data.id_ciudad);
                setIdEstado(response.data.id_estado);
                setComentarioRRHH(response.data.comentario_rrhh);
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        }
        if(id && token) {
            fetchData(); // Llamar a la función para obtener datos cuando el componente se monta
        }
    }, [id, token]); // Este efecto se ejecutará cada vez que cambie el ID o el token

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí enviarías los datos modificados a otra API para guardarlos
            console.log('Datos modificados:', { nombre, apellido, correo });
            // Lógica para enviar los datos modificados a otra API...
        } catch (error) {
            console.error('Error al guardar los datos modificados:', error);
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                {datosAPI ? (
                    <>
                        <div className="col-md-6">
                            <label htmlFor="nombre" className="form-label">Nombre *</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="nombre" 
                                value={nombre} // Si hay un valor en "nombre", se mostrará, de lo contrario se mostrará el valor de la API
                                onChange={(e) => setNombre(e.target.value)} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="apellido" className="form-label">Apellido *</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="apellido" 
                                value={apellido || datosAPI.apellido} 
                                onChange={(e) => setApellido(e.target.value)} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="correo" className="form-label">Correo *</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="correo" 
                                value={correo || datosAPI.correo} 
                                onChange={(e) => setCorreo(e.target.value)} 
                            />
                        </div>
                        {/* Agrega más campos según sea necesario */}
                        <button type="submit">Guardar</button>

                    </>
                ):(
                    <p style= {{textAlign: 'center', fontSize:'25px', margin: '100px auto 0' }}>No hay datos disponibles para actualizar</p>
                )
                }
            </form>
        </Layout>
    );
}

export default EditarPostulante;
