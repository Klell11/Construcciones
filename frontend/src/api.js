import axios from 'axios';

// Definir la URL base de la API desde las variables de entorno en Vite
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
