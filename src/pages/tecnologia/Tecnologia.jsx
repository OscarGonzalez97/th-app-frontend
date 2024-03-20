import { Layout } from "../../components/layouts/Layout"
import './Tecnologia.css';

const Tecnologia = () => {
  return (
    <Layout>
    <div className="tecnologia-container">
            <h2>Tecnologia</h2>

            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre*</label>
                    <input type="text" className="form-control" id="nombre" name="nombre"
                        placeholder="Ingrese el nombre" />
                </div>




                <div className="col-12 d-flex justify-content-end">
                
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>




            </form>
     </div>
            
    </Layout>
  )
}

export default Tecnologia
