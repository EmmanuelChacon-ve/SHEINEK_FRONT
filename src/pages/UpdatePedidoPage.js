import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header";

const UpdatePedidoPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [abonado, setAbonado] = useState("");

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${orderId}`
        );
        setPedido(response.data);
        setAbonado(response.data.amount_paid);
      } catch (error) {
        console.error("Error al cargar pedido:", error);
      }
    };

    fetchPedido();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/amount-paid`,
        {
          amount_paid: Number(abonado),
        }
      );

      Swal.fire(
        "Actualizado",
        "El monto abonado fue actualizado correctamente.",
        "success"
      );
      navigate(-1); // Vuelve a la página anterior
    } catch (error) {
      console.error("Error actualizando monto abonado:", error);
      Swal.fire("Error", "No se pudo actualizar el monto abonado.", "error");
    }
  };

  if (!pedido) return <p>Cargando pedido...</p>;

  return (
    <div>
      <Header />
      <div className="form-container">
        <h2>Actualizar Monto Abonado de {pedido.customer_name}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Monto Abonado:</label>
            <input
              type="number"
              value={abonado}
              onChange={(e) => setAbonado(e.target.value)}
              required
            />
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePedidoPage;
