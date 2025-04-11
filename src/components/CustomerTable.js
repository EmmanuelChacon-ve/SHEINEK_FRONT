// src/components/CustomerTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CustomerTable.css";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setCustomers(response.data); // Asegúrate de que el backend devuelva un array
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="table-container">
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
