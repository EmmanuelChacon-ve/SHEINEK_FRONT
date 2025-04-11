import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import "../styles/OrderForm.css";

const OrderForm = () => {
  const { batchId } = useParams();

  const [formData, setFormData] = useState({
    batch_id: batchId || "",
    customer_id: "",
    items: [{ product_name: "", quantity: "", unit_price: "" }],
    amount_paid: "",
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setFormData({ ...formData, items: newItems });
  };

  const parseToNumber = (value) => {
    if (typeof value === "number") return value;
    return Number(value.toString().replace(/\./g, "").replace(",", "."));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.batch_id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El ID de lote (batch_id) es obligatorio.",
      });
      return;
    }

    if (
      formData.items.some(
        (item) =>
          !item.product_name ||
          parseToNumber(item.quantity) <= 0 ||
          parseToNumber(item.unit_price) <= 0
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos del producto deben estar completos y los valores deben ser positivos.",
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        items: formData.items.map((item) => ({
          ...item,
          quantity: parseToNumber(item.quantity),
          unit_price: parseToNumber(item.unit_price),
        })),
        amount_paid: parseToNumber(formData.amount_paid),
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        payload
      );

      Swal.fire({
        icon: "success",
        title: "¡Orden registrada!",
        text: response.data.message || "La orden fue registrada exitosamente.",
        confirmButtonColor: "#192a56",
      });

      setFormData({
        batch_id: batchId || "",
        customer_id: "",
        items: [{ product_name: "", quantity: "", unit_price: "" }],
        amount_paid: "",
      });
    } catch (error) {
      console.error("Error al registrar la orden", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.error ||
          "Ocurrió un error al registrar la orden.",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="form-container">
        <BackButton />
        <h2>Registrar Orden</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un cliente</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </select>

          <div className="item-container">
            <div className="product-info">
              <input
                type="text"
                name="product_name"
                value={formData.items[0].product_name}
                onChange={(e) => handleItemChange(0, e)}
                placeholder="Nombre del producto"
                required
              />
              <div className="quantity-price">
                <input
                  type="text"
                  name="quantity"
                  value={formData.items[0].quantity}
                  onChange={(e) => handleItemChange(0, e)}
                  placeholder="Cantidad"
                  required
                  inputMode="numeric"
                />
                <input
                  type="text"
                  name="unit_price"
                  value={formData.items[0].unit_price}
                  onChange={(e) => handleItemChange(0, e)}
                  placeholder="Precio Unitario"
                  required
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>

          <div className="amount-paid">
            <input
              type="text"
              name="amount_paid"
              value={formData.amount_paid}
              onChange={handleChange}
              placeholder="Monto Pagado"
              required
              inputMode="numeric"
            />
          </div>

          <button type="submit">Registrar Orden</button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
