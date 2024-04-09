import React, { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListarBeneficios.css';
import axios from 'axios';
import { useSelector } from "react-redux";

const ListarBeneficios = () => {
  const token = useSelector(state => state.token);
  const [beneficios, setBeneficios] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/v1/beneficio`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setBeneficios(response.data);
      })
      .catch(error => {
        console.error('Error fetching beneficios:', error);
      });
  }, [token]); // Añade token a las dependencias de useEffect

  const handleEliminarBeneficio = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/v1/beneficio/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        // Actualizar la lista de beneficios después de la eliminación
        setBeneficios(beneficios.filter(beneficio => beneficio.id !== id));
        console.log('Beneficio eliminado:', response.data);
      })
      .catch(error => {
        console.error('Error al eliminar el beneficio:', error);
      });
  }

  return (
    <Layout>
      <div className="listarbeneficios container">
        <div className="container-fluid">
          <h1>Listar Beneficios</h1>
          <br/>
          <DataTable paginator rows={20} value={beneficios} stripedRows>
            <Column field="id" header="#"/>
            <Column field="titulo" header="Beneficio" />
            <Column field="descripcion" header="Descripcion" />
            <Column header="Acciones" body={(rowData) => (
              <button className="btn btn-danger" onClick={() => handleEliminarBeneficio(rowData.id)}>Eliminar</button>
            )} />
          </DataTable>
        </div>
      </div>
    </Layout>
  )
}

export default ListarBeneficios;
