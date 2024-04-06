import React, { useState, useEffect } from 'react';

import { Layout } from "../../components/layouts/Layout"

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './ListarPostulante.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useSelector } from "react-redux";
import axios from 'axios';


const ListarPostulante = () => {


  const [selectedState, setSelectedState] = useState("");
  const [estados, setEstados] = useState([]);
  const [postulantes, setPostulantes] = useState([]);
  const token = useSelector(state => state.token);
  console.log(token);
  useEffect(() => {
    console.log(token);
    const fetchData = async () => {
      if (token) {
   
        try {
          console.log("token set", token);
          const estadosResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/estados`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          setEstados(estadosResponse.data);

          const postulantesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/v1/postulante`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setPostulantes(postulantesResponse.data);
        } catch (error) {
          console.error('Error al obtener los estados o postulantes:', error);
        }
      }
    };

    fetchData();
    console.log(estados);
    console.log(postulantes);
  }, []);






  return (
    <Layout>
      <div className="listarPostulantes container">
        <Form>
          <div className="container-wrapper">
            <div className="container-fluid">
              <h1>Listado de postulantes</h1>
              <div className="row justify-content-start gy-2">
                <div className="col-auto">
                  <input type="text" className="form-control" placeholder="Nombre"></input>
                </div>
                <div className="col-auto">
                  <button type="button" className="btn btn-primary">Buscar</button>
                </div>
              </div>
              <br/>
              <div className="row justify-content-start gy-2">
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
                  <label className="form-label">Experiencia en general</label>
                </div>
                <div className="col-md-2">
                  <select className="form-select form-select-sm">
                    <option>Todas</option>
                    <option value="1">Menor a 6 meses</option>
                    <option value="2">Menor a 1 año</option>
                    <option value="3">Menor a 3 años</option>
                    <option value="4">Menor a 5 año</option>
                    <option value="4">Mayor a 5 años</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label">Cargo</label>
                </div>
                <div className="col-md-2">
                  <select className="form-select form-select-sm">
                    <option>Todas</option>
                  </select>
                </div>
              </div>
              <br/> 
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
        <DataTable className="datatable datatable-spacing custom-datatable p-datatable-responsive" resizableColumns columnResizeMode="fit">
          <Column header="#"  style={{width: '20%'}}/>
          <Column header="Nombre"  style={{width: '20%'}}/>
          <Column header="Nivel de inglés"  style={{width: '20%'}}/>
          <Column header="Experiencia"  style={{width: '20%'}}/>
          <Column header="Tecnologías"  style={{width: '20%'}}/>
          <Column footer="Total postulantes: "  style={{width: '20%'}}/>
        </DataTable>
      </div>
    </Layout>
  )
}

export default ListarPostulante;
