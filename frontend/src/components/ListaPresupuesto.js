import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Importar api.js

function ListaPresupuesto() {
  const [presupuestos, setPresupuestos] = useState([]);

  const getPresupuestos = async () => {
    try {
      const res = await api.get('/api/presupuestos');
      setPresupuestos(res.data);
    } catch (error) {
      console.error('Error al obtener presupuestos:', error);
      alert('Error al obtener presupuestos');
    }
  };

  useEffect(() => {
    getPresupuestos();
  }, []);

  const eliminarPresupuesto = async (id) => {
    if (!window.confirm('¿Deseas eliminar este presupuesto?')) return;
    try {
      await api.delete(`/api/presupuestos/${id}`);
      alert('Presupuesto eliminado');
      getPresupuestos();
    } catch (error) {
      console.error('Error al eliminar presupuesto:', error);
      alert('Error al eliminar presupuesto');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Lista de Presupuestos</h2>

      <div className="mb-3">
        <Link to="/crear-presupuesto" className="btn btn-primary">
          Crear Presupuesto
        </Link>
      </div>

      {presupuestos.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No hay presupuestos registrados.
        </div>
      ) : (
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Monto</th>
              <th>Origen de Fondos</th>
              <th>Fecha de Entrega</th>
              <th style={{ width: '150px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {presupuestos.map((item) => (
              <tr key={item._id}>
                <td>{item.monto}</td>
                <td>{item.origenFondos}</td>
                <td>
                  {item.fechaFin
                    ? new Date(item.fechaFin).toLocaleDateString()
                    : 'Sin definir'}
                </td>
                <td>
                  <Link
                    to={`/editar-presupuesto/${item._id}`}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarPresupuesto(item._id)}
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

export default ListaPresupuesto;
