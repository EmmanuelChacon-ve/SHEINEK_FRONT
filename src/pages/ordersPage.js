// src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/OrdersPage.css";
import API_BASE_URL from "../config/config.js";
const Orders = () => {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/orderBatch`);
        setBatches(response.data);
      } catch (error) {
        console.error("Error al obtener las fechas de pedidos:", error);
      }
    };

    fetchBatches();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Esta acción no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#ff69b4",
      });

      if (result.isConfirmed) {
        await axios.delete(`${API_BASE_URL}/orderBatch/${id}`);
        setBatches(batches.filter((batch) => batch.id !== id));

        Swal.fire({
          icon: "success",
          title: "Fecha eliminada",
          text: "La fecha de pedido ha sido eliminada correctamente.",
          confirmButtonColor: "#192a56",
        });
      }
    } catch (error) {
      console.error("Error al eliminar la fecha:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al eliminar la fecha.",
        confirmButtonColor: "#192a56",
      });
    }
  };

  const handleInsertOrder = (batchId) => {
    navigate(`/insertar-orden/${batchId}`);
  };

  const handleShowOrders = (batchId) => {
    navigate(`/ver-pedidos/${batchId}`);
  };

  return (
    <div>
      <Header />
      <div className="orders-page-container">
        <div className="top-button-container">
          <button onClick={() => navigate("/agfecha")} className="add-date-btn">
            ➕ Agregar Fecha
          </button>
        </div>

        <h2>Fechas de pedidos</h2>
        <div className="batch-list">
          {batches.map((batch) => (
            <div key={batch.id} className="batch-card">
              <span className="batch-date">
                {new Date(batch.batch_date).toLocaleDateString()}
              </span>
              <div className="button-group-orders">
                <button
                  onClick={() => handleShowOrders(batch.id)}
                  className="view-btn-orders"
                >
                  📄 Ver Pedidos
                </button>
                <button
                  onClick={() => handleInsertOrder(batch.id)}
                  className="insert-btn-orders"
                >
                  📥 Insertar Orden
                </button>

                <button
                  onClick={() => handleDelete(batch.id)}
                  className="delete-btn-orders"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
