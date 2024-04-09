import { Layout } from "../../components/layouts/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import "./ListarConvocatoria.css";

const ListarConvocatoria = () => {
    const token = useSelector(state => state.token);
    const [convocatorias, setConvocatorias] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/v1/convocatoria`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setConvocatorias(response.data);
            })
            .catch(error => {
                console.error('Error fetching tecnologias:', error);
            });
    }, []);

    return (
        <Layout>
            <div className="listarconvocatoria container">
                <div className="container-fluid">
                    <h1>Listar convocatorias</h1>
                    <br/>
                    <DataTable paginator rows={20} value={convocatorias} stripedRows>
                        <Column field="id_convocatoria" header="#" />
                        <Column field="title" header="Titulo"></Column>
                        <Column field="description" header="Descripcion" />
                        <Column field="fecha_inicio" header="Fecha Inicio" />
                        <Column field="fecha_fin" header="Fecha Fin" />
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}

export default ListarConvocatoria;
