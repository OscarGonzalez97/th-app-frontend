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
import { faEye, faPencil  } from '@fortawesome/free-solid-svg-icons';
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
        <div className="container-fluid">
          <h1>Listar Postulantes</h1>
          <br />
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
          <DataTable paginator rows={20} value={filteredPostulantes} stripedRows>
            <Column field="nombre" header="Nombre" className='columna-ajuste'/>
            <Column field="apellido" header="Apellido" className='columna-ajuste'/>
            <Column field="nro_documento" header="Nro. de Documento" className='columna-ajuste'/>
            <Column field="estado.estado" header="Estado" className='columna-ajuste'/>
            <Column field="convocatoria.title" header="Convocatoria" className='columna-ajuste'/>
            <Column header="Acciones" body={(rowData) => (
                            <div >
                                <Button icon={<FontAwesomeIcon icon={faEye} />}onClick={() => navigate(`/postulante/${rowData.id_postulante}`)} className="btn btn-primary" />
                                <Button icon={<FontAwesomeIcon icon={faPencil} />}onClick={() => navigate(`/editarPostulante/${rowData.id_postulante}`)} className="btn btn-dark" />
                                <DeletePostulanteModal postulante={rowData} />
                            </div>
                        )} className='columna-ajuste'/>
          </DataTable>            
        </div>
      </div>
      
    </Layout>
  );
};

export default ListarPostulante;
