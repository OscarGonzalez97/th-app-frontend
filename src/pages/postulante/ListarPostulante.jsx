import { Layout } from "../../components/layouts/Layout"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './ListarPostulante.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button } from 'react-bootstrap'


const ListarPostulante = () => {
  return (
    <Layout>
      <div className="listarPostulantes container">
        <Form>
          <div className="container-wrapper">
            <div className="container-fluid">
              <h1>Listado de postulantes</h1>
              <div className="row justify-content-start gy-2">
                <div className="col-md-2">
                  <input type="text" className="form-control" placeholder="Nombre"></input>
                </div>
                <div className="col-md-2">
                  <button type="button" className="btn btn-primary">Buscar</button>
                </div>
              </div>
              <div className="row justify-content-start gy-2">
                <div className="col-md-2">
                  <label className="form-label">Estado</label>
                </div>
                <div className="col-md-2">
                  <select className="form-select form-select-sm">
                    <option selected>Todas</option>
                    <option value="1">Nuevo</option>
                    <option value="2">Contactado</option>
                    <option value="3">Rechazado</option>
                    <option value="4">Contratado</option>
                    <option value="5">Volver a llamar</option>
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
        <DataTable className="datatable datatable-spacing">
          <Column header="#"></Column>
          <Column header="Nombre"></Column>
          <Column header="Nivel de ingles"></Column>
          <Column header="Experiencia"></Column>
          <Column header="Tecnologías"></Column>
          <Column header="Tecnologías"></Column>
          <Column footer="Total postulantes"></Column>
        </DataTable>
      </div>
    </Layout>
  )
}

export default ListarPostulante
