import { Layout } from "../../components/layouts/Layout"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import  'bootstrap/dist/css/bootstrap.min.css';
import './ListarBeneficios.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ListarBeneficios = () => {
  const [beneficios, setBeneficios] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/thbackend/v1/beneficio')
          .then(response => {
              setBeneficios(response.data);
              console.log('Se cargo la api');
          })
          .catch(error => {
              console.error('Error fetching :', error);
          });
  }, []);

  return (
    <Layout>
        <div className="listarbeneficios container">
            <div className="random container">
                <div className="container-fluid">
                    <h1>Listar Beneficios</h1>
                    <DataTable className="datatable4 datatable-espaciado" value={beneficios}>
                        <Column field="id" header="#" />
                        <Column field="titulo" header="Beneficio" />
                    </DataTable>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ListarBeneficios