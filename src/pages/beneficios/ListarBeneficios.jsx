import React, { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListarBeneficios.css';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Modal, Button } from 'react-bootstrap';

const ListarBeneficios = () => {
  const token = useSelector(state => state.token);
  const [beneficios, setBeneficios] = useState([]);
  const [beneficioSeleccionado, setBeneficioSeleccionado] = useState(null);
  const [showEliminar, setEliminar] = useState(false);
  const handleCloseEliminar = () => setEliminar(false);
  const handleShowEliminar = () => setEliminar(true);

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
  }, [token]); 

  const handleEliminarBeneficio = (id) => {
    // Setea el id del beneficio seleccionado para eliminar
    setBeneficioSeleccionado(id);
    // Abre el modal de confirmación
    setEliminar(true);
  }

  const confirmarEliminar = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/v1/beneficio/${beneficioSeleccionado}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setBeneficios(beneficios.filter(beneficio => beneficio.id !== beneficioSeleccionado));
        console.log('Beneficio eliminado:', response.data);
        // Cierra el modal de confirmación
        setEliminar(false);
        setBeneficioSeleccionado(null);
      })
      .catch(error => {
        console.error('Error al eliminar el beneficio:', error);
        setEliminar(false);
        setBeneficioSeleccionado(null);
      });
  }

  const cancelarEliminar = () => {
    // Cierra el modal de confirmación
    setEliminar(false);
    setBeneficioSeleccionado(null);
  }

  return (
    <Layout>
      <div className="listarbeneficios container">
        <div className="container-fluid">
          <h1>Listar Beneficios</h1>
          <br />
          <DataTable paginator rows={20} value={beneficios} stripedRows>
            <Column field="id" header="#" />
            <Column field="titulo" header="Beneficio" />
            <Column field="descripcion" header="Descripcion" />
            <Column header="Acciones" body={(rowData) => (
              <button className="btn btn-danger" onClick={() => handleEliminarBeneficio(rowData.id)}>Eliminar</button>
            )} />
          </DataTable>
        </div>
      </div>
      <>
        <Modal show={showEliminar} onHide={handleCloseEliminar} className='modal-'>
          <Modal.Header closeButton>
            <Modal.Title className='modal-title text-black'>¿Estás seguro de eliminar?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={confirmarEliminar} className='btn btn-danger'>
              Eliminar
            </Button>
            <Button variant="secondary" onClick={cancelarEliminar}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Layout>
  )
}

export default ListarBeneficios;
