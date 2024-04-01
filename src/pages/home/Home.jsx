import React from "react";
import { Layout } from "../../components/layouts/Layout";
import { TaskProvider, LaneSection } from "./TaskContext";
import "./Kanban.css";
import { useSelector } from "react-redux";


const Home = () => {
  const token = useSelector(state => state.auth);
  React.useEffect(() => {
    if (token){
      console.log(token);
    }
  }, [])
  return  (
    <Layout>
      <TaskProvider>
        <div className="kanban">
          <header className="header">
            <h1 className="header__title">Tablero</h1>
          </header>
          <main className="main">
            <LaneSection />
          </main>
        </div>
      </TaskProvider>
    </Layout>
  );
};

export default Home;
