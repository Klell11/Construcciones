// frontend/src/components/ListaCarretera.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListaCarretera() {
  const [carreteras, setCarreteras] = useState([]);

  const getCarreteras = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/carreteras');
      setCarreteras(res.data);
    } catch (error) {
      console.error(error);
      alert('Error al obtener carreteras');
    }
  };

  useEffect(() => {
    getCarreteras();
  }, []);

  const eliminarCarretera = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta carretera?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/carreteras/${id}`);
      alert('Carretera eliminada');
      getCarreteras();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Listado de Carreteras</h2>

      <div className="mb-3">
        <Link to="/crear" className="btn btn-primary">
          Crear Carretera
        </Link>
      </div>

      {carreteras.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No hay carreteras registradas
        </div>
      ) : (
        <table class="table" >
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Longitud (km)</th>
              <th style={{ width: '160px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carreteras.map((carretera, index) => (
              <tr key={carretera._id}>
                <td>{index + 1}</td>
                <td>{carretera.nombre}</td>
                <td>{carretera.ubicacion}</td>
                <td>{carretera.longitud}</td>
                <td>
                  <Link
                    to={`/editar/${carretera._id}`}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarCarretera(carretera._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaCarretera;
