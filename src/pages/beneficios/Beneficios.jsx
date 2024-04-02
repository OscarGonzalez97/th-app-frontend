import { Layout } from "../../components/layouts/Layout"
import React from 'react';

const Beneficios = () => {
  return (
    <Layout>
    
    <div className="tecnologia-container convocatoria-container">
            <h2>Beneficios</h2>

            <form className="row g-3">
                <div className="col-md-12">
                <label htmlFor="nombre" className="form-label">Titulo*</label>
                    <input type="text" className="form-control" id="titulo" name="titulo"
                        placeholder="Titulo de beneficio" 
                      />
                </div>

                
                <div className="col-md-12">
                    <label htmlFor="descripcion" className="form-label">Descripción *</label>
                    <textarea 
                      className="form-control  description-input" 
                      id="descripcion" 
                      name="descripcion" 
                     rows="4" 
                    placeholder="Ingrese la descripción"   ></textarea>
                </div>

                <div className="col-12 d-flex justify-content-end">
                
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>

            </form>
      
    </div>
   </Layout> 
  );
};

export default Beneficios