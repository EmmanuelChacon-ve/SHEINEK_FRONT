import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBars, FaHeart } from "react-icons/fa";
import "../styles/header.css"; // Importamos los estilos

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    alert("Cerrando sesión...");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      <header>
        <Link to="/home" className="logo">
          <i className="fas fa-utensils"></i> GlobalShop
        </Link>

        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          <Link to="/home">Inicio</Link>
          <Link to="/customers">Clientes</Link>
          <Link to="/orders">Órdenes</Link>
          <Link to="/users">Usuarios</Link>
          <Link to="/capital">Capital</Link>
        </nav>

        <div className="icons">
          <FaBars id="menu-bars" onClick={toggleMenu} />
          <FaHeart className="logout" onClick={handleLogout} />
        </div>
      </header>
    </div>
  );
};

export default Header;
