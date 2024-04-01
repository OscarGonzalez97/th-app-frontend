import React from "react";
import { Layout } from "../../components/layouts/Layout";
import Tablero from "./Tablero";
import "./Tablero.css";

const Home = () => {
  return (
    <Layout>
      <div className="tablero-container">
        <h1>Postulantes</h1>
        <Tablero />
      </div>
    </Layout>
  );
};

export default Home;
