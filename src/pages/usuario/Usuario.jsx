import { Layout } from "../../components/layouts/Layout"
import React from 'react';

const Usuario = () => {
  return (
    <Layout>
    
    <div className="tecnologia-container">
            <h2>Correo</h2>

            <form className="row g-3">
                <div className="col-md-12">
                    <input type="text" className="form-control" id="nombre" name="nombre"
                        placeholder="Ingresa el correo" 
                      />
                </div>

                <div className="col-12 d-flex justify-content-end">
                
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>

            </form>
      
    </div>
   </Layout> 
  );
};

export default Usuario

