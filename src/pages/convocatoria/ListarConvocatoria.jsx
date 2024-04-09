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
                console.error('Error fetching convocatorias:', error);
            });
    }, []);

    // Función para formatear la fecha en formato "dd/mm/yyyy"
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <Layout>
            <div className="listarconvocatoria container">
                <div className="container-fluid">
                    <h1>Listar convocatorias</h1>
                    <br/>
                    <DataTable paginator rows={20} value={convocatorias} stripedRows tableStyle={{ maxWidth: '100px' }}>
                        <Column field="id_convocatoria" header="#" className="columna-ajuste"/>
                        <Column field="title" header="Titulo" className="columna-ajuste"></Column>
                        <Column field="description" header="Descripcion" className="columna-ajuste"/>
                        <Column field="fecha_inicio" header="Fecha Inicio" body={(rowData) => formatDate(rowData.fecha_inicio)} className="columna-ajuste"/>
                        <Column field="fecha_fin" header="Fecha Fin" body={(rowData) => formatDate(rowData.fecha_fin)} className="columna-ajuste"/>
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}

export default ListarConvocatoria;
