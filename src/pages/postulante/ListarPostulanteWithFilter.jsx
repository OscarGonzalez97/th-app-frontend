import { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts/Layout"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './ListarPostulante.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col } from 'react-bootstrap'
import { useSelector } from "react-redux";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DeletePostulanteModal from '../../components/DeletePostulanteModal';
import { Button } from 'primereact/button';

const ListarPostulante = () => {
  const [postulantes, setPostulantes] = useState(null);
  const [filteredPostulantes, setFilteredPostulantes] = useState(null);
  const [nombreFilter, setNombreFilter] = useState('');
  const [apellidoFilter, setApellidoFilter] = useState('');
  const [documentoFilter, setDocumentoFilter] = useState('');
  const [tecnologiaFilter, setTecnologiaFilter] = useState('');
  const [convocatoriaFilter, setConvocatoriaFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [estados, setEstados] = useState([]);
  const [tecnologias, setTecnologias] = useState([]);
  const [convocatorias, setConvocatorias] = useState([]);
  const navigate = useNavigate();
  const token = useSelector(state => state.token);


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
  
            const convocatoriaResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/convocatoria`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });

            console.log("the response", convocatoriaResponse.data);
            setConvocatorias(convocatoriaResponse.data);
  
            const tecnologiaResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/tecnologia`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
  
            console.log("the response", tecnologiaResponse.data);
            setTecnologias(tecnologiaResponse.data);


          const postulantesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/postulantes`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setPostulantes(postulantesResponse.data);
          setFilteredPostulantes(postulantesResponse.data);
        } catch (error) {
          console.error('Error al obtener los postulantes:', error);
        }
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    filterPostulantes();
  }, [nombreFilter, apellidoFilter, documentoFilter, tecnologiaFilter, convocatoriaFilter, estadoFilter]);

  const filterPostulantes = () => {
    let filteredData = postulantes;
    if (nombreFilter) {
      filteredData = filteredData.filter(postulante => postulante.nombre.toLowerCase().includes(nombreFilter.toLowerCase()));
    }estadoFilter
    if (apellidoFilter) {
      filteredData = filteredData.filter(postulante => postulante.apellido.toLowerCase().includes(apellidoFilter.toLowerCase()));
    }
    if (documentoFilter) {
      filteredData = filteredData.filter(postulante => postulante.nro_documento.includes(documentoFilter));
    }
    if (estadoFilter) {
        filteredData = filteredData.filter(postulante => postulante.estado.estado.includes(estadoFilter));
    }
    if (tecnologiaFilter) {
        filteredData = filteredData.filter(postulante => 
          postulante.tecnologiasasignadas.some(tecnologia => tecnologia.nombre.includes(tecnologiaFilter))
        );
      }
    if (convocatoriaFilter) {
        filteredData = filteredData.filter(postulante => postulante.convocatoria.title.includes(estadoFilter));
    }

    setFilteredPostulantes(filteredData);
  };

  return (
    <Layout>
      <div className="listarPostulantes container">

        {/* Muestra la tabla de postulantes */}
        <div className="container mt-5">

          <div className="row">
            <div className='col d-flex gap-2'>
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '15px', color: "white" }} />

              <h1 className='h6 fw-bold'>Listado de postulantes</h1>
            </div>
          </div>


          <div className="row mt-3 border-bottom pb-2 fs">
            <div className="col d-flex align-items-center">Nombre</div>
            <div className="col d-flex align-items-center">Apellido</div>
            <div className="col d-flex align-items-center">Nro. Documento</div>
            <div className="col d-flex align-items-center">Estado</div>

            <div className="col d-flex align-items-center">Tecnologia</div>
            <div className="col d-flex align-items-center">Convocatoria</div>

          </div>
          <Form>
          <Row className="mb-3 pb-4 pt-4 ">
            <Col>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" value={nombreFilter} onChange={(e) => setNombreFilter(e.target.value)} />
            </Col>
            <Col>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="Apellido" value={apellidoFilter} onChange={(e) => setApellidoFilter(e.target.value)} />
            </Col>
            <Col>
              <Form.Label>Nro. de Documento</Form.Label>
              <Form.Control type="text" placeholder="Nro. Documento" value={documentoFilter} onChange={(e) => setDocumentoFilter(e.target.value)} />
            </Col>
            <Col>
              <Form.Label>Estado</Form.Label>
                <select className="form-select form-select fs-6" value={estadoFilter} onChange={(e) => setEstadoFilter(e.target.value)}>
                    <option value="">Todos</option>
                        {estados.map((estado) => (
                        <option key={estado.id_estado} value={estado.estado}>{estado.estado}</option>
                    ))} 
                </select>
            </Col>
            {/* <Col>
                <select className="form-select form-select fs-6" value={tecnologiaFilter} onChange={(e) => setTecnologiaFilter(e.target.value)}>
                        <option value="">Todas</option>
                            {tecnologias.map((tecnologia) => (
                            <option key={tecnologia.id_tecnologia} value={tecnologia.nombre}>{tecnologia.nombre}</option>
                        ))}
                </select>
            </Col> */}
            <Col>
              <Form.Label>Convocatoria</Form.Label>
                <select className="form-select form-select fs-6" value={convocatoriaFilter} onChange={(e) => setConvocatoriaFilter(e.target.value)}>
                      <option value="">Todas</option>
                      {convocatorias.map((convocatoria) => (
                        <option key={convocatoria.id_convocatoria} value={convocatoria.title}>{convocatoria.title}</option>
                      ))}
                </select>
            </Col>
          </Row>
        </Form>

          {filteredPostulantes ? (
            filteredPostulantes.map(postulante => (
              <div className="row mt-3 border-bottom pb-2 fs" key={postulante.id_postulante}>
                <div className="col d-flex align-items-center">{postulante.nombre.toUpperCase()}</div>
                <div className="col d-flex align-items-center">{postulante.apellido.toUpperCase()}</div>
                <div className="col d-flex align-items-center">{postulante.nro_documento}</div>
                <div className="col d-flex align-items-center">{postulante.estado.estado}</div>
                <div className="col d-flex align-items-center ">
                    {postulante.tecnologiasasignadas.length > 0 && (
                        <span key={postulante.tecnologiasasignadas[0].id_tecnologia} className='badge bg-secondary me-1 mt-1'>
                            {postulante.tecnologiasasignadas[0].nombre}
                        </span>
                    )}
                </div>
                <div className="col d-flex align-items-center">{postulante.convocatoria.title}</div>
                <div className='col-1 d-flex justify-content-end gap-3'>
                  <span role='button' onClick={() => navigate(`/postulante/${postulante.id_postulante}`)}>
                    <FontAwesomeIcon icon={faBook} style={{ fontSize: '20px', color: "white" }} />
                  </span>
                  <DeletePostulanteModal postulante={postulante} />                </div>
              </div>
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </div>
      
    </Layout>
  );
};

export default ListarPostulante;
