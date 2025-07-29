// src/components/CustomerForm.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/CustomerForm.css";
import API_BASE_URL from "../config/config.js";
const CustomerForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, formData);

      Swal.fire({
        icon: "success",
        title: "¡Cliente creado!",
        text:
          response.data.message || "El cliente fue registrado exitosamente.",
        confirmButtonColor: "#192a56",
      });

      setFormData({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error("Error al registrar cliente", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.error ||
          "Ocurrió un error al registrar el cliente.",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="Nombre"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
        />
        <button type="submit">Guardar Cliente</button>
      </form>
    </div>
  );
};

export default CustomerForm;
