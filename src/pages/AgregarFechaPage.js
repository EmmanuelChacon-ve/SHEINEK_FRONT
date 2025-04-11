import React, { useState } from "react";
import Header from "../components/header.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/AgregarFechaPage.css"; // (opcional) para estilos personalizados

const AgregarFechaPage = () => {
  const [batchDate, setBatchDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!batchDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha es Obligatoria",
        confirmButtonColor: "#192a56",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orderBatch", {
        batch_date: batchDate,
      });
      Swal.fire({
        icon: "success",
        title: "¡Fecha agregada!",
        text: "La nueva fecha de pedido ha sido agregada correctamente.",
        confirmButtonColor: "#192a56",
      }).then(() => {
        navigate("/orders"); // Redirige a la página de órdenes después de la alerta
      });
    } catch (err) {
      setError("Error al agregar la fecha");
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al agregar la fecha de pedido.",
        confirmButtonColor: "#192a56",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="agregar-fecha-container">
        <h2>Agregar Nueva Fecha de Pedido</h2>
        <form onSubmit={handleSubmit} className="agregar-fecha-form">
          <input
            type="date"
            value={batchDate}
            onChange={(e) => setBatchDate(e.target.value)}
          />
          <button type="submit">Agregar Fecha</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AgregarFechaPage;
