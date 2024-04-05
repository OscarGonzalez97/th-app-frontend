import { Layout } from "../../components/layouts/Layout"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'react-bootstrap';
import  'bootstrap/dist/css/bootstrap.min.css';
import './ListarUsuarios.css';

const ListarUsuarios = () => {

  const actionTemplate = (rowData) => {
    return (
      <div>
        {/* Botón Editar */}
        <Button variant="success" className="me-2" onClick={() => handleEditar(rowData)}>Editar</Button>
        {/* Botón Eliminar */}
        <Button variant="danger" onClick={() => handleEliminar(rowData)}>Eliminar</Button>
      </div>
    ); }

  const handleEditar = (rowData) => {
    // Lógica para editar el usuario
    console.log("Editar usuario:", rowData);
  }

  const handleEliminar = (rowData) => {
    // Lógica para eliminar el usuario
    console.log("Eliminar usuario:", rowData);
  }


  return (
    <Layout>
      <div className="listarusuarios container">
        <div className="random container">
          <div className="container-fluid">
            <h1>Listar Usuarios Permitidos</h1>
            <DataTable className="datatable3 datatable-espaciado">
              <Column  header="Nombre"></Column>
              <Column  header="Telefono"></Column>
              <Column  header="Nombre encargado"></Column>
              <Column header="Acciones" body={actionTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ListarUsuarios