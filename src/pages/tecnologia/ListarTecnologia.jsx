import { Layout } from "../../components/layouts/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListarTecnologia.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "primereact/resources/themes/lara-light-cyan/theme.css";


const ListarTecnologia = () => {
    const [tecnologias, setTecnologias] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/thbackend/v1/tecnologia')
            .then(response => {
                setTecnologias(response.data);
            })
            .catch(error => {
                console.error('Error fetching tecnologias:', error);
            });
    }, []);

    return (
        <Layout>
            <div className="listartecnologia container">
                <div className="container-fluid">
                    <h1>Listar tecnologia</h1>
                    <DataTable value={tecnologias} stripedRows>
                        <Column field="id_tecnologia" header="#" />
                        <Column field="nombre" header="Tecnologia" />
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}

export default ListarTecnologia;
