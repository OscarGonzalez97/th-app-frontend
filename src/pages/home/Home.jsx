import { Layout } from "../../components/layouts/Layout";
import imagen from '../../imagenes/ilustracion-herov3.svg';

const Home = () => {
  return (
    <Layout>
      <div className="seccion hero">
        <div className="contenido-home">
          <div className="texto-home">
            <h1>Título de la sección</h1>
            <p>Descripción de la sección</p>
          </div>
          <div className="grafico-home">
            <img src={imagen} alt="Vacante" className="img-fluid" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
