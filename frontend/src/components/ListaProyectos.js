// frontend/src/components/ListaProyectos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListaProyectos() {
  const [proyectos, setProyectos] = useState([]);

  const getProyectos = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/proyectos');
      setProyectos(res.data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar proyectos');
    }
  };

  useEffect(() => {
    getProyectos();
  }, []);

  const eliminarProyecto = async (id) => {
    if (!window.confirm('¿Desea eliminar este proyecto?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/proyectos/${id}`);
      alert('Proyecto eliminado');
      getProyectos();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Lista de Proyectos</h2>
      <div className="mb-3">
        <Link to="/crear-proyecto" className="btn btn-primary">
          Crear Proyecto
        </Link>
      </div>
      {proyectos.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No hay proyectos registrados
        </div>
      ) : (
        <table class="table" >
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Contratista</th>
              <th>Presupuesto</th>
              <th>Carretera</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th style={{ width: '160px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p) => (
              <tr key={p._id}>
                <td>{p.nombre}</td>
                <td>{p.contratista?.nombre || ''}</td>
                <td>
                  {p.presupuesto ? `$${p.presupuesto.monto}` : ''}
                </td>
                <td>{p.carretera?.nombre || ''}</td>
                <td>
                  {p.fechaInicio
                    ? new Date(p.fechaInicio).toLocaleDateString()
                    : ''}
                </td>
                <td>
                  {p.fechaFin ? new Date(p.fechaFin).toLocaleDateString() : ''}
                </td>
                <td>

                  <Link
                    to={`/editar-proyecto/${p._id}`}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarProyecto(p._id)}
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

export default ListaProyectos;
