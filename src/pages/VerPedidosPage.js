import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/header";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/VerPedidosPage.css";

const VerPedidosPage = () => {
  const { batchId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalCobrado, setTotalCobrado] = useState(0);
  const [totalRestante, setTotalRestante] = useState(0);
  const [totalAbonado, setTotalAbonado] = useState(0);
  const [totalComisiones, setTotalComisiones] = useState(0); // Para almacenar el total de comisiones
  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  const formatCurrency = (number) => {
    return `$${Number(number).toLocaleString("es-CO")}`;
  };

  const fetchPedidos = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/details/${batchId}`
      );
      setOrderDetails(response.data);

      const totalCobrado = response.data.reduce(
        (sum, order) => sum + Number(order.total_with_commission),
        0
      );
      setTotalCobrado(totalCobrado);

      const totalRestante = response.data.reduce(
        (sum, order) => sum + Number(order.remaining_balance),
        0
      );
      setTotalRestante(totalRestante);

      const totalAbonado = response.data.reduce(
        (sum, order) => sum + Number(order.amount_paid),
        0
      );
      setTotalAbonado(totalAbonado);

      const totalComisiones = response.data.reduce(
        (sum, order) => sum + Number(order.commission),
        0
      );
      setTotalComisiones(totalComisiones); // Calcula el total de comisiones

      if (response.data.length > 0) {
        const date = new Date(response.data[0].batch_date).toLocaleDateString();
        setFecha(date);
      }
    } catch (error) {
      console.error("Error al obtener detalles de pedidos:", error);
    }
  }, [batchId]);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const handleDelete = async (order_id, batch_id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este pedido será eliminado permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:5000/api/orders/${order_id}/${batch_id}`
        );
        Swal.fire("¡Eliminado!", "El pedido ha sido eliminado.", "success");
        fetchPedidos(); // Actualiza la tabla
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al eliminar el pedido.", "error");
        console.error("Error al eliminar pedido:", error);
      }
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
          <button
            onClick={() => navigate("/updatebatch/:batchId")}
            className="add-date-btn"
          >
            Precio de la compra
          </button>
        </div>

        <h2>Pedidos del {fecha}</h2>
        <div className="order-details-table">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Monto del Producto</th>
                <th>Comisión</th>
                <th>Total con Comisión</th>
                <th>Monto Abonado</th>
                <th>Total Restante</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((order, index) => (
                <tr key={index}>
                  <td>{order.customer_name}</td>
                  <td>{order.product_name}</td>
                  <td>{formatCurrency(order.total_amount)}</td>
                  <td>{formatCurrency(order.commission)}</td>
                  <td>{formatCurrency(order.total_with_commission)}</td>
                  <td>{formatCurrency(order.amount_paid)}</td>
                  <td>{formatCurrency(order.remaining_balance)}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDelete(order.order_id, order.batch_id)
                      }
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-summary">
            <strong>Total Abonado:</strong> {formatCurrency(totalAbonado)}
          </div>
          <div className="total-summary">
            <strong>Total en Comisiones:</strong>{" "}
            {formatCurrency(totalComisiones)}{" "}
            {/* Muestra la suma de las comisiones */}
          </div>
          <div className="total-summary">
            <strong>Total Restante:</strong> {formatCurrency(totalRestante)}
          </div>
          <div className="total-summary">
            <strong>Total Cobrado en este pedido:</strong>{" "}
            {formatCurrency(totalCobrado)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerPedidosPage;
