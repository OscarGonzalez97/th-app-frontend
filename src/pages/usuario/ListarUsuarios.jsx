import { Layout } from "../../components/layouts/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import './ListarUsuarios.css';


const ListarUsuarios = () => {
    const token = useSelector(state => state.token);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/v1/allowedUsers`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error('Error fetching tecnologias:', error);
            });
    }, []);

    const handleEliminarUsuarios = (id) => {
      axios.delete(`${import.meta.env.VITE_API_URL}/v1/allowedUsers/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          // Actualizar la lista de beneficios después de la eliminación
          setUsuarios(usuarios.filter(usuarios => usuarios.id !== id));
          console.log('Beneficio eliminado:', response.data);
        })
        .catch(error => {
          console.error('Error al eliminar el beneficio:', error);
        });
    }

    return (
        <Layout>
            <div className="listarusuarios container">
                <div className="container-fluid">
                    <h1>Listar usuarios permitidos</h1>
                    <br/>
                    <DataTable paginator rows={20} value={usuarios} stripedRows >
                        <Column field="email" header="Email"/>
                        <Column header="Acciones" body={(rowData) => (
                          <button className="btn btn-danger" onClick={() => handleEliminarUsuarios(rowData.id)}>Eliminar</button>
                        )}/>
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}

export default ListarUsuarios;
