// frontend/src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>Construcción de Infraestructuras Viales</h1>
      <div style={styles.buttons}>
        <button style={{ ...styles.button, backgroundColor: "#198754" }}>
          <Link to="/" style={styles.link}>
            Inicio
          </Link>
        </button>
        <button style={{ ...styles.button, backgroundColor: "#0d6efd" }}>
          <Link to="/carreteras" style={styles.link}>
            Carreteras
          </Link>
        </button>
        <button style={{ ...styles.button, backgroundColor: "#fd7e14" }}>
          <Link to="/constructoras" style={styles.link}>
            Constructoras
          </Link>
        </button>
        <button style={{ ...styles.button, backgroundColor: "#6f42c1" }}>
          <Link to="/presupuestos" style={styles.link}>
            Presupuestos
          </Link>
        </button>
        <button style={{ ...styles.button, backgroundColor: "#d63384" }}>
          <Link to="/proyectos" style={styles.link}>
            Proyectos
          </Link>
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#000",      // Fondo negro
    borderBottom: "1px solid #444",
  },
  title: {
    color: "#fff",
    margin: 0,
    fontSize: "1.5rem",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#fff",  // Texto en blanco
    fontWeight: "bold",
  },
};

export default Navbar;
