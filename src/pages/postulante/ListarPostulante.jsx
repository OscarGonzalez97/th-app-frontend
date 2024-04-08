import React, { useState, useEffect } from 'react';

import { Layout } from "../../components/layouts/Layout"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './ListarPostulante.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from "react-redux";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBook, faBookAtlas, faBookBookmark, faBookDead, faBookOpen, faDeleteLeft, faPeopleArrows, faPeopleGroup, faPerson, faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the right arrow icon
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DeletePostulanteModal from '../../components/DeletePostulanteModal';



const ListarPostulante = () => {


  const [selectedState, setSelectedState] = useState("");
  const [estados, setEstados] = useState([]);
  const [postulantes, setPostulantes] = useState(null);
  const token = useSelector(state => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          console.log("token Listar postulantes", token);
          const estadosResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/estados`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          console.log("the response", estadosResponse.data);
          setEstados(estadosResponse.data);

          const postulantesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/postulante`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log("the response2", postulantesResponse.data);
          setPostulantes(postulantesResponse.data);
        } catch (error) {
          console.error('Error al obtener los estados o postulantes:', error);
        }
      }
    };

    fetchData();

  }, [token]);



  return (
    <>
      <Layout>
        <div className="listarPostulantes container">
          <Form>
            <div className="container-wrapper">
              <div className="container-fluid">
                <div className='d-flex gap-3 border-bottom mb-5'>
      
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: '15px', color: "white" }} />
            
                  <h1 type="button" className='h6  fw-bold '>Listado de postulantes</h1>
                </div>

                <div className="row justify-content-start gy-2">
                  <div className="col-auto">
                    <input type="text" className="form-control form-control-sm" placeholder="Nombre"></input>
                  </div>
                  <div className="col-auto">
                    <button type="button" className="btn btn-primary">Buscar</button>
                  </div>
                </div>

                <br />
                
                <div className="row justify-content-start">
                  <div className="col-md-2">
                    <label className="form-label">Estado</label>
                  </div>


                  <div className="col-md-2">
                    <select className="form-select form-select-sm" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                      <option value="">Seleccionar estado</option>
                      {estados.map((estado) => (
                        <option key={estado.id_estado} value={estado.estado}>{estado.estado}</option>
                      ))}
                    </select>
                  </div>


                  <div className="col-md-2">
                    <label className="form-label h6 text-start">Años de experiencia</label>
                  </div>
                  <div className="col-md-2">
                    <select className="form-select form-select-sm">
                      <option>Todas</option>
                      <option value="1">Menor a 6 meses</option>
                      <option value="2">Menor a 1 año</option>
                      <option value="3">Menor a 3 años</option>
                      <option value="4">Menor a 5 año</option>
                      <option value="5">Mayor a 5 años</option>
                    </select>
                  </div>

                </div>



            
                <div className="row justify-content-start gy-2">
                  <div className="col-md-2">
                    <label className="form-label">Tipo de estudio</label>
                  </div>
                  <div className="col-md-2">
                    <select className="form-select form-select-sm">
                      <option>Todas</option>
                      <option value="1">Terciario</option>
                      <option value="2">Secundario</option>
                      <option value="3">Curso</option>
                      <option value="4">Post Grado</option>
                      <option value="4">Otro</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Nivel de ingles</label>
                  </div>
                  <div className="col-md-2">
                    <select className="form-select form-select-sm">
                      <option>Todas</option>
                      <option value="1">Basico</option>
                      <option value="2">Regular</option>
                      <option value="3">Intermedio</option>
                      <option value="4">Avanzado</option>
                      <option value="4">Proficiente</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">Tecnologias</label>
                  </div>
                  <div className="col-md-2">
                    <select className="form-select form-select-sm">
                      <option>Todas</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </Form>

          <div className="container mt-5">
            <div className='row'>
            </div>
            {postulantes ? (
              postulantes.map(postulante => (
              <div className="row mt-3 border-bottom pb-2 fs" key={postulante.id_postulante}>
                <div className="col-8 d-flex align-items-center">{postulante.apellido.toUpperCase()}, {postulante.nombre.toUpperCase()}</div>
                <div className="col d-flex align-items-center">{postulante.estado.estado} </div>
                <div className='col-1 d-flex justify-content-end gap-3'>
                  <span role='button' onClick={() => navigate(`/postulante/${postulante.id_postulante}`)}>
                    <FontAwesomeIcon icon={faBook} style={{ fontSize: '20px', color: "white" }} />
                  </span>
                  <DeletePostulanteModal postulante={postulante} />
                </div>
              </div>
            ))
            )
            : (
              <p>Loading ...</p>
            )}
          </div>


        </div>






      </Layout>
    </>

  )
}

export default ListarPostulante;
