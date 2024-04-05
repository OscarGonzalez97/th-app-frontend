import { Layout } from "../../components/layouts/Layout"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  'bootstrap/dist/css/bootstrap.min.css';
import './ListarTecnologia.css';

const ListarTecnologia = () => {




  
  return (
    <Layout>
      <div className="listartecnologia container">
        <div className="random container">
          <div className="container-fluid">
            <h1>Listar tecnologia</h1>
            <DataTable className="datatable4 datatable-espaciado">
              <Column  header="#"></Column>
              <Column  header="Tecnologia"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ListarTecnologia