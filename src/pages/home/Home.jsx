import React from "react";
import { Layout } from "../../components/layouts/Layout";
import { TaskProvider, LaneSection } from "./TaskContext";
import "./Kanban.css";

const Home = () => {
  return (
    <Layout>
      <TaskProvider>
        <div className="kanban">
          <header className="header">
            <h1 className="header__title"></h1>
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
