import React from "react";
import { Layout } from "../../components/layouts/Layout";
import Tablero from "./Tablero";
import "./Tablero.css";
import { useSelector } from "react-redux";


const Home = () => {
  //PRUEBA DEL TOKEN
  const token = useSelector(state => state.token);
  React.useEffect(() => {
    if (token){
      console.log("home",token);
    }
  }, [])
  return  (
    <Layout>
      <div className="tablero-container">
        <h1>Postulantes</h1>
        <Tablero />
      </div>
    </Layout>
  );
};

export default Home;
