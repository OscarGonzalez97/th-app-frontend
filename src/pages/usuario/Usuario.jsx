
import React, { useEffect, useState } from 'react';
import { Layout } from "../../components/layouts/Layout"
import axios from 'axios';
import { useSelector } from "react-redux";



const Usuario = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const token = useSelector(state => state.token);
  const [usuarios, setUsuarios] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(true); // State to track email validity



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

  const handleClose = () => {
    setShowAlert(false);
  };

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
              
                  <div className="badge bg-secondary me-1 mt-1">{usuario.email}</div>
            
            ))}
            </div>
            
        {showAlert && (
          <div className="alert alert-success position-relative" role="alert" style={{ marginTop: '20px' }}>
          Se ha guardado correctamente.
            <button type="button" className="btn-close position-absolute top-6  end-0 me-2" aria-label="Close" onClick={handleClose}></button>
          </div>
        )}
          </div>
          
        </div>




      </div>
    </Layout>
  );

};

export default Usuario

