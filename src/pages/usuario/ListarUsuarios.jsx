import { Layout } from "../../components/layouts/Layout";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'react-bootstrap';
import  'bootstrap/dist/css/bootstrap.min.css';
import './ListarUsuarios.css';
import { useState } from "react";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { "nombre": "Juan", "telefono": "123456789", "email": "juan@example.com" },
    { "nombre": "María", "telefono": "987654321", "email": "maria@example.com" },
    { "nombre": "Pedro", "telefono": "456123789", "email": "pedro@example.com" }
  ]);

  const [editandoIndex, setEditandoIndex] = useState(null);

  const handleEditar = (index) => {
    setEditandoIndex(index);
  }

  const handleGuardar = (index) => {
    setEditandoIndex(null);
  }

  const handleCancelar = () => {
    setEditandoIndex(null);
  }

  const handleBorrar = (usuario) => {
    const nuevosUsuarios = usuarios.filter((u) => u !== usuario);
    setUsuarios(nuevosUsuarios);
  }

  return (
    <Layout>
      <div className="listarusuarios container">
        <div className="random container">
          <div className="container-fluid">
            <h1>Listar Usuarios Permitidos</h1>
            <DataTable className="datatable3 datatable-espaciado" value={usuarios}>
              <Column field="nombre" header="Nombre" body={(rowData, rowIndex) => {
                if (editandoIndex === rowIndex) {
                  return <input value={rowData.nombre} onChange={(e) => {}} />;
                } else {
                  return rowData.nombre;
                }
              }}></Column>
              <Column field="telefono" header="Teléfono" body={(rowData, rowIndex) => {
                if (editandoIndex === rowIndex) {
                  return <input value={rowData.telefono} onChange={(e) => {}} />;
                } else {
                  return rowData.telefono;
                }
              }}></Column>
              <Column field="email" header="Email" body={(rowData, rowIndex) => {
                if (editandoIndex === rowIndex) {
                  return <input value={rowData.email} onChange={(e) => {}} />;
                } else {
                  return rowData.email;
                }
              }}></Column>
              <Column header="Acciones" body={(rowData, rowIndex) => {
                if (editandoIndex === rowIndex) {
                  return (
                    <div>
                      <Button variant="success" className="me-2" onClick={() => handleGuardar(rowIndex)}>Guardar</Button>
                      <Button variant="danger" onClick={() => handleCancelar()}>Cancelar</Button>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <Button variant="success" className="me-2" onClick={() => handleEditar(rowIndex)}>Editar</Button>
                      <Button variant="danger" onClick={() => handleBorrar(rowData)}>Borrar</Button>
                    </div>
                  );
                }
              }}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ListarUsuarios;
