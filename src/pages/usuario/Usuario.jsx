import React, { useEffect, useState } from 'react';
import { Layout } from "../../components/layouts/Layout"
import axios from 'axios';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
const Usuario = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const token = useSelector(state => state.token);
  const [usuarios, setUsuarios] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(true); // State to track email validity
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [showEliminar, setEliminar] = useState(false);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const handleCloseEliminar = () => setEliminar(false);
  const handleShowEliminar = () => setEliminar(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        if (!isValidEmail) return; // Don't submit if email is invalid
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/allowedUsers`, {
          email: email
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Respuesta del servidor:', response.data);
        setEmail('');
        fetchData();
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        console.error('Error al enviar el pedido POST:', error);
      }
    };
  };




  const fetchData = async () => {
    if (token) {
      try {
        const allowedUsers = await axios.get(`${import.meta.env.VITE_API_URL}/v1/allowedUsers`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsuarios(allowedUsers.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    }
  };



  useEffect(() => {
    setIsValidEmail(validateEmail(email));
    fetchData();
  }, [token, email]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@roshka\.com$/i;
    return regex.test(email);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors['email'] = 'Este campo es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && isValidEmail;
  };




  const handleEliminarUsuario = (id) => {
    // Setea el id del beneficio seleccionado para eliminar
    setUsuarioSeleccionado(id);
    // Abre el modal de confirmación
    setEliminar(true);

  }



  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_API_URL}/v1/allowedUsers/${idToDelete}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .then(response => {
  //       setUsuarios(usuarios.filter(usuario => usuario.id_user !== idToDelete));
  //       setEliminar(false);
  //       setBeneficioSeleccionado(null);
  //     })
  //     .catch(error => {
  //       console.error('Error al eliminar el beneficio:', error);
  //       setEliminar(false);
  //       setBeneficioSeleccionado(null);
  //     });


  //     console.log('Usuario eliminado con ID:', idToDelete);
  //     // Actualizar la lista de usuarios eliminando el usuario eliminado
  //     fetchData();
  //     setUsuarios(usuarios.filter(usuario => usuario.id_user !== idToDelete));
  //   } catch (error) {
  //     console.error('Error al eliminar el usuario:', error);
  //   }
  // };


  const confirmarEliminar = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/v1/allowedUsers/${usuarioSeleccionado}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        fetchData();
        setUsuarios(usuarios.filter(usuario => usuario.id_user !== usuarioSeleccionado));
        // Cierra el modal de confirmación
        setEliminar(false);
        setUsuarioSeleccionado(null);
       
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
        setEliminar(false);
        setUsuarioSeleccionado(null);
      });
  }



 
  const cancelarEliminar = () => {
    // Cierra el modal de confirmación
    setEliminar(false);
    setUsuarioSeleccionado(null);
  }


  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-5 p-5'>
            <div className="tecnologia-container p-5">
              <h2>Correo</h2>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <input type="text" className="form-control" id="email" name="email"
                    placeholder="usuario@roshka.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors['email'] && <span className="error-message" style={{ color: 'red' }}>{errors['email']}</span>}
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <button type="submit" className="btn btn-success">Guardar</button>
                </div>
              </form>
            </div>
          </div>
          <div className='col pt-sm-5'>
            <div className=''>
              {usuarios && usuarios.object.map(usuario => (
                <div key={usuario.id_user} className='badge bg-secondary me-1 mt-1' onMouseEnter={() => setHoveredUserId(usuario.id_user)} onMouseLeave={() => setHoveredUserId(null)}>
                  <div className="badge bg-secondary me-1 mt-1 fs-6">{usuario.email}</div>
                  {hoveredUserId === usuario.id_user && (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className='delete-icon'
                      onClick={() => handleEliminarUsuario(usuario.id_user)}
                    />
                  )}
                </div>
              ))}
            </div>
            {showAlert && (
              <div className="alert alert-success position-relative" role="alert" style={{ marginTop: '20px' }}>
                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                Se ha guardado correctamente.
              </div>
            )}
          </div>
        </div>
      </div>

      <>
        <Modal show={showEliminar} onHide={handleCloseEliminar} className=''>
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
  );
};
export default Usuario












