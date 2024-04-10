import React, { useState, useEffect } from 'react';
import { Layout } from "../../components/layouts/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Importa Axios
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faTrashCan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import "./ListarConvocatoria.css";
import {Modal} from 'react-bootstrap';

const ListarConvocatoria = () => {
    const token = useSelector(state => state.token);
    const [convocatorias, setConvocatorias] = useState([]);
    const [showEliminar, setEliminar] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [convocatoriaSeleccionada, setConvocatoriaSeleccionada] = useState(null); // Agrega un estado para almacenar la convocatoria seleccionada
    const handleCloseEliminar = () => setEliminar(false);
    const handleShowEliminar = () => setEliminar(true);



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
    }, [token]);

    const handleEliminarConvocatoria = (id) => {
        // Setea el id de la convocatoria seleccionada para eliminar
        setConvocatoriaSeleccionada(id);
        // Abre el modal de confirmación
        setEliminar(true);
    }

    const confirmarEliminarConvocatoria = () => {
        axios.delete(`${import.meta.env.VITE_API_URL}/v1/convocatoria/delete/${convocatoriaSeleccionada}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setConvocatorias(convocatorias.filter(convocatoria => convocatoria.id_convocatoria !== convocatoriaSeleccionada));
                console.log('Convocatoria eliminada:', response.data);
                // Cierra el modal de confirmación
                setEliminar(false);
                setConvocatoriaSeleccionada(null);
            })
            .catch(error => {
                console.error('Error al eliminar la convocatoria:', error);
                setEliminar(false);
                setConvocatoriaSeleccionada(null);
            });
    }

    const cancelarEliminarConvocatoria = () => {
        // Cierra el modal de confirmación
        setEliminar(false);
        setConvocatoriaSeleccionada(null);
    }
    const copyText = (link) => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_FRONT_URL}${link}`).then(function() {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        });
    }
    

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
                    <br />

                    {showAlert && (
                        <div className="alert alert-success position-relative" role="alert" style={{ marginTop: '20px'}}>
                            <FontAwesomeIcon icon={faCheckCircle} className="me-5" />
                            Link copiado al portapapeles
                        </div>
                        )}

                    <DataTable paginator rows={20} value={convocatorias} stripedRows>
                        <Column field="id_convocatoria" header="#" className='columna-ajuste'/>
                        <Column field="title" header="Titulo" className='columna-ajuste'/>
                        <Column field="description" header="Descripcion" className='columna-ajuste'/>
                        <Column field="fecha_inicio" header="Fecha Inicio" body={(rowData) => formatDate(rowData.fecha_inicio)} className='columna-ajuste'/>
                        <Column field="fecha_fin" header="Fecha Fin" body={(rowData) => formatDate(rowData.fecha_fin)} className='columna-ajuste'/>
                        <Column header="Acciones" body={(rowData) => (
                            <div >
                                <Button icon={<FontAwesomeIcon icon={faLink} />} className="btn btn-primary" onClick={() => copyText(rowData.link)}/>
                                <Button icon={<FontAwesomeIcon icon={faTrashCan} />} className="btn btn-danger" onClick={() => handleEliminarConvocatoria(rowData.id_convocatoria)} />
                            </div>
                        )} className='columna-ajuste'/>
                    </DataTable>
                </div>

            </div>

         

            <>
                <Modal show={showEliminar} onHide={handleCloseEliminar} className='modal-'>
                    <Modal.Header closeButton>
                        <Modal.Title className='modal-title text-black'>¿Estás seguro de eliminar?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button className="btn btn-danger" variant="secondary" onClick={confirmarEliminarConvocatoria}>
                            Eliminar
                        </Button>
                        <Button className="btn btn-secondary" variant="secondary" onClick={cancelarEliminarConvocatoria}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Layout>
    )
}

export default ListarConvocatoria;
