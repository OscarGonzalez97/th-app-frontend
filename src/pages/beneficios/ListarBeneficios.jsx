import { Layout } from "../../components/layouts/Layout"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  'bootstrap/dist/css/bootstrap.min.css';
import './ListarBeneficios.css';

const ListarBeneficios = () => {
  return (
    <Layout>
      <div className="listarbeneficios container">
        <div className="random container">
          <div className="container-fluid">
            <h1>Listar Beneficios</h1>
            <div className="row justify-content-start gy-2">
              <div className="col-auto">
                <input type="text" className="form-control" placeholder="Algo"></input>
              </div>
              <div className="col-auto">
                <button type="button" className="btn btn-primary">Buscar</button>
              </div>
            </div>
            <DataTable className="datatable2 datatable-espaciado">
              <Column  header="#"></Column>
              <Column  header="Beneficio"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ListarBeneficios