import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.js";
import Home from "./pages/home.js";
import CustomersPage from "./pages/CustomersPage.js";
import Orders from "./pages/ordersPage.js";
import AgregarFechaPage from "./pages/AgregarFechaPage.js";
import OrderForm from "./pages/OrderForm.js";
import VerPedidosPage from "./pages/VerPedidosPage";
import UpdateTotalCostForm from "./pages/UpdateTotalCostForm.js";
import UserPage from "./pages/UserPage.js";
import CapitalPage from "./pages/CapitalPage.js";
import UpdatePedidoPage from "./pages/UpdatePedidoPage.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/insertar-orden/:batchId" element={<OrderForm />} />
        <Route path="/ver-pedidos/:batchId" element={<VerPedidosPage />} />
        <Route path="/updatebatch/:batchId" element={<UpdateTotalCostForm />} />
        <Route path="/agfecha" element={<AgregarFechaPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/capital" element={<CapitalPage />} />
        <Route path="/updatepedido/:orderId" element={<UpdatePedidoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
