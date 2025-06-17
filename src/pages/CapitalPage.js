import React, { useEffect, useState } from "react";
import Header from "../components/header.js";
import "../styles/CapitalPage.css";

const CapitalPage = () => {
  const [movements, setMovements] = useState([]);
  const [currentCapital, setCurrentCapital] = useState(0);
  const [formData, setFormData] = useState({
    type: "entrada",
    amount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener movimientos y saldo actual al montar
  useEffect(() => {
    fetchMovements();
    fetchCurrentCapital();
  }, []);

  const fetchMovements = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/capital");
      const data = await res.json();
      setMovements(data);
    } catch (err) {
      setError("Error al cargar movimientos");
    }
  };

  const fetchCurrentCapital = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/capital/actual");
      const data = await res.json();
      setCurrentCapital(data.currentCapital);
    } catch (err) {
      setError("Error al cargar saldo actual");
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar nuevo movimiento
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/capital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formData.type,
          amount: parseFloat(formData.amount),
          description: formData.description,
        }),
      });

      if (!res.ok) throw new Error("Error en el servidor");

      await fetchMovements();
      await fetchCurrentCapital();

      setFormData({ type: "entrada", amount: "", description: "" });
    } catch (err) {
      setError(err.message || "Error al crear movimiento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="capital-container">
      <Header />
      <h1 className="capital-header">Panel de Capital</h1>

      <div className="balance-display">
        Capital Disponible: ${currentCapital.toFixed(2)}
      </div>

      <form className="capital-form" onSubmit={handleSubmit}>
        <label>
          Tipo:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="entrada">Entrada</option>
            <option value="retiro">Retiro</option>
            <option value="Ganancia">Ganancia</option>
            <option value="inversión">Inversión</option>
          </select>
        </label>

        <label>
          Monto:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            required
          />
        </label>

        <label>
          Descripción:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción opcional"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Agregar Movimiento"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <h2>Movimientos recientes</h2>
      <table className="capital-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Saldo después</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((m) => (
            <tr key={m.id}>
              <td>{m.type}</td>
              <td>${parseFloat(m.amount).toFixed(2)}</td>
              <td>{m.description || "-"}</td>
              <td>{new Date(m.movement_date).toLocaleString()}</td>
              <td>${parseFloat(m.balance_after).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CapitalPage;
