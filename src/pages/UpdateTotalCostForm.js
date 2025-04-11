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
      await axios.put("http://localhost:5000/api/orderBatch/totalCost", {
        batch_id: batchId,
        total_cost: totalCost,
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

        <h2 className="ver-pedidos-title">Actualizar Valor de la Compra</h2>

        <form onSubmit={handleUpdate} style={{ marginTop: "30px" }}>
          <input
            type="number"
            placeholder="Ingresa el nuevo valor de la compra"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              width: "100%",
              maxWidth: "400px",
              marginBottom: "20px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <button
            type="submit"
            className="add-date-btn"
            style={{ display: "block", margin: "0 auto" }}
          >
            💾 Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBatchPage;
