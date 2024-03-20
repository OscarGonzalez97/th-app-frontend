import { Layout } from "../../components/layouts/Layout"
import './Convocatoria.css';
const Convocatoria = () => {
  return (
    <Layout>
       <div className="convocatoria-container">
            <h2>Convocatorias</h2>
         

            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="titulo" className="form-label">Título *</label>
                    <input type="text" className="form-control" id="titulo" name="titulo"
                        placeholder="Ingrese el titulo" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="descripcion" className="form-label">Descripción *</label>
                    <input type="text" className="form-control" id="descripcion" name="descripcion"
                        placeholder="Ingrese la descripcion" />
                </div>
            


                <div className="col-md-6">
                    <label htmlFor="fecha_inicio" className="form-label">Fecha de inicio *</label>
                    <input type="date" className="form-control" id="fecha_inicio" name="fecha_inicio"
                        placeholder="Ingrese la fecha" />
                </div>
                

               
                <div className="col-md-6">
                    <label htmlFor="fecha_fin" className="form-label">Fecha finalizada*</label>
                    <input type="date" className="form-control" id="fecha_fin" name="fecha_fin"
                        placeholder="Ingrese la fecha" />
                </div>



                <div className="col-md-6">
                    <label htmlFor="link_convocatoria" className="form-label">Cargar link*</label>
                    <input href="#" className="form-control" id="link_convocatoria" name="link_convocatoria"  placeholder="Ingrese la url" />
                </div>

                
               
                 
                <div className="col-md-6">
                    <label htmlFor="file_convocatoria" className="form-label">Cargar imagen*</label>
                    <input type="file" className="form-control" id="file_convocatoria" name="file_convocatoria" />
                </div>
           


                <div className="col-12 d-flex justify-content-end">
                
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>
           </form>
     </div>
            
    </Layout>
  )
}

export default Convocatoria
