import React, { useState } from "react"; // Importamos React y el hook useState
import "../styles/login.css"; // Importamos los estilos del login
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la navegación programada
import axios from "axios"; // Importamos Axios para hacer solicitudes HTTP
import Swal from "sweetalert2";
const Login = () => {
  // Definimos los estados para almacenar el correo, la contraseña y los posibles errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook de React Router para redirigir a otras páginas

  // Función que maneja el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Respuesta del backend:", response.data);

      if (response.data.user) {
        setError("");

        Swal.fire({
          icon: "success",
          title: "Login exitoso",
          text: `¡Bienvenido, ${response.data.user.first_name || "usuario"}!`,
          confirmButtonColor: "#192a56",
        }).then(() => {
          navigate("/home");
        });
      } else {
        setError("Credenciales incorrectas");
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: "Por favor, verifica tu correo y contraseña",
          confirmButtonColor: "#192a56",
        });
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Error al iniciar sesión");

      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo iniciar sesión. Intenta más tarde.",
        confirmButtonColor: "#192a56",
      });
    }
  };
  return (
    <div className="container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          {/* Input para el correo electrónico */}
          <input
            type="email"
            className="input-field"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado con el valor ingresado
            required
          />
          {/* Input para la contraseña */}
          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado con el valor ingresado
            required
          />
          {/* Mensaje de error si las credenciales son incorrectas */}
          {error && <div className="error-message">{error}</div>}
          {/* Botón para enviar el formulario */}
          <button type="submit" className="button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; // Exportamos el componente para usarlo en otras partes de la aplicación
