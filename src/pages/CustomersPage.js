// src/pages/CustomersPage.jsx
import React, { useState } from "react";
import Header from "../components/header.js";
import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";
import "../styles/CustomersPage.css";

const CustomersPage = () => {
  const [view, setView] = useState(null); // No muestra nada por defecto

  return (
    <div>
      <Header />
      <div className="customers-page-container">
        <div className="button-group">
          <button
            onClick={() => setView("form")}
            className={view === "form" ? "active" : ""}
          >
            Registrar Cliente
          </button>
          <button
            onClick={() => setView("table")}
            className={view === "table" ? "active" : ""}
          >
            Ver Clientes
          </button>
        </div>

        <div className="view-container">
          {view === "form" && <CustomerForm />}
          {view === "table" && <CustomerTable />}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
