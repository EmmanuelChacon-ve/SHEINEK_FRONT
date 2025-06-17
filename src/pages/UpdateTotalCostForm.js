import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header";
import "../styles/VerPedidosPage.css";

const UpdateBatchPage = () => {
  const [totalCost, setTotalCost] = useState("");
  const navigate = useNavigate();
  const { batchId } = useParams(); // Obtenemos el batchId desde la URL

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!batchId || !totalCost) {
      Swal.fire("Error", "Faltan datos necesarios", "error");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/orderBatch/${batchId}`, {
        total_cost: parseInt(totalCost, 10),
      });

      Swal.fire(
        "Éxito",
        "Valor de la compra actualizado correctamente",
        "success"
      ).then(() => {
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar el valor", "error");
    }
  };

  return (
    <div>
      <Header />
      <div className="orders-page-container">
        <div className="verpedidobtn">
          <button onClick={() => navigate(-1)} className="add-date-btn">
            🔙 Volver
          </button>
        </div>

        <form onSubmit={handleUpdate} className="update-form">
          <h2 className="ver-pedidos-title">Actualizar Valor de la Compra</h2>

          <input
            type="number"
            placeholder="Ingresa el nuevo valor de la compra"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            className="input-update"
          />
          <button type="submit" className="add-btn-update">
            💾 Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBatchPage;
