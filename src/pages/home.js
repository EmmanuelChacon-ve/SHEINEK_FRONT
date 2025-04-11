import React from "react";
import Header from "../components/header.js"; // Ajusta la ruta si está en otro lugar
import "../styles/home.css";
const Home = () => {
  return (
    <div>
      <Header />

      <section className="main-content" id="home">
        <h1>Bienvenido a SHEINEK</h1>
      </section>
    </div>
  );
};

export default Home;
