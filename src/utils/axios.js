import axios from "axios";

// Configura la base URL para las solicitudes
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Asegúrate de que la URL corresponda al backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
