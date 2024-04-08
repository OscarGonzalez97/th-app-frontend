import React, { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts/Layout";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './PostulanteInfo.css';
import Tooltip from '../../components/tooltip';




const PostulanteInfo = () => {
    const [postulante, setPostulante] = useState(null);
    const token = useSelector(state => state.token);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const postulanteResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/postulante/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setPostulante(postulanteResponse.data);
                    console.log('Postulante data:', postulanteResponse.data);
                } catch (error) {
                    console.error('Error fetching postulante data:', error);

                }
            }
        };

        fetchData();
    }, [id, token]);

    return (
        <Layout>
            <div className='postulanteInfo'>
                {postulante ? (
                    <div className='bg-white m-5 rounded-5 text-black d-flex flex-column justify-content-center p-5 gap-4 '>
                        <div className='d-flex flex-column align-items-start'>
                            <p className='fw-bold'>Postulante</p>
                            <p className='h5 fw-bold'>{postulante.nombre.toUpperCase()} {postulante.apellido.toUpperCase()}</p>
                        </div>
                        <div className='d-flex flex-column align-items-start'>
                            <p className='fw-bold'>Convocatoria</p>
                            <p className='h5 fw-bold'>{postulante.convocatoria.title}</p>
                        </div>
                        <div className='d-flex flex-column align-items-start'>
                            <p className='fw-bold '>Datos Personales</p>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col ps-1'>
                                        <p className='fw-bold subtitle'>{postulante.tipo_documento}</p>
                                        <p className='information-item'>{postulante.nro_documento}</p>
                                        <p className='information-item'>{postulante.nacionalidad}</p>
                                    </div>
                                    <div className='col ps-1'>
                                        <p className='fw-bold subtitle'>Contactos</p>
                                        <p className='information-item'>{postulante.correo}</p>
                                        <p className='information-item'>{postulante.nro_telefono}</p>
                                    </div>
                                    <div className='col ps-1'>
                                        <p className='fw-bold subtitle'>Direccion</p>
                                        <p className='information-item'>{postulante.ciudad.nombre}</p>
                                        <p className='information-item'>{postulante.direccion}</p>
                                    </div>
                                    <div className='col ps-1'>
                                        <p className='fw-bold subtitle'>Nivel de Ingles</p>
                                        <p className='information-item'>{postulante.nivel_ingles}</p>

                                    </div>
                                    <div className='col ps-1'>
                                        <p className='fw-bold subtitle'>Fecha de Nacimiento</p>
                                        <p className='information-item'>{postulante.fecha_nacimiento}</p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex flex-column align-items-start'>
                            <p className='fw-bold'>Tecnologias</p>
                            <p className='h5'>{postulante.tecnologiasasignadas.map(tecnologia => (
                                <span key={tecnologia.id_tecnologia} className='badge bg-secondary me-1 mt-1'>{tecnologia.nombre}</span>
                            ))}</p>
                        </div>

                        {/* EXPERIENCIAS */}

                        <div className='d-flex flex-column align-items-start'>
                            <p className='fw-bold'>Experiencias</p>

                            <div className='d-flex gap-2 flex-wrap'>
                                {postulante.experiencias.map(experiencia => (

                                    <>
                                        <div className="card" style={{ maxWidth: '12rem' }}>
                                            <div className="card-body" key={experiencia.id}>
                                                <p className="card-text fw-bold subtitle">{experiencia.cargo}</p>
                                                <h5 className="fw-bold subtitle ">{experiencia.empresa} <span className='experiencia_fecha'>({experiencia.fecha_desde.slice(0, 10)} / {experiencia.fecha_hasta.slice(0, 10)})</span></h5>
                                                <p className="card-text information-item">{experiencia.descripcion}</p>
                                                <Tooltip nombre_referencia={experiencia.nombre_referencia} telefono_referencia={experiencia.telefono_referencia} />

                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>


                        {/* Educacion */}


                        <div className='d-flex flex-column align-items-start'>
                            <p className='fw-bold'>Educación</p>

                            <div className='d-flex gap-2 flex-wrap'>
                                {postulante.estudios.map(estudio => (

                                    <>
                                        <div className="card" style={{ maxWidth: '12rem' }} key={estudio.id_estudios}>
                                            <div className="card-body">
                                                <p className="card-text fw-bold subtitle">{estudio.institucion}</p>
                                                <h5 className="fw-bold subtitle ">{estudio.descripcion} <span className='experiencia_fecha'>({estudio.fecha_inicio.slice(0, 10)} / {estudio.fecha_fin.slice(0, 10)})</span></h5>
                                                <p className="card-text information-item">{estudio.tipo_estudio}</p>
                                                <p className="card-text information-item">{estudio.estado}</p>

                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>

                    </div>
                ) : (
                    <p>Loading...</p>

                )}
            </div>
        </Layout>
    );
}

export default PostulanteInfo;
