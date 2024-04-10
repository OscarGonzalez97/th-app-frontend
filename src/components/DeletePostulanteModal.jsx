import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";

function DeletePostulanteModal({ postulante }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = useSelector(state => state.token);

  const handleDelete = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/v1/postulante/${postulante.id_postulante}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => console.log(response))
      .catch(error => console.error(error));
    handleClose();
    window.location.reload();
  }

  return (
    <>
      
      <Button icon={<FontAwesomeIcon icon={faTrashCan} />} className="btn btn-danger ml-2" onClick={handleShow}/>


      <Modal show={show} onHide={handleClose}>

        <Modal.Body className='text-black'>
          <p className='h6'>Deseas elminar a <span className='h6 fw-bold'>{postulante.nombre} {postulante.apellido}</span>?</p>
        </Modal.Body>
        <Modal.Footer>
        <Button className="btn btn-danger" variant="secondary" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePostulanteModal;