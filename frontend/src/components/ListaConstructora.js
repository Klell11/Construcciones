// frontend/src/components/ListaConstructora.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListaConstructora() {
  const [constructoras, setConstructoras] = useState([]);

  const getConstructoras = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/constructoras');
      setConstructoras(res.data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar constructoras');
    }
  };

  useEffect(() => {
    getConstructoras();
  }, []);

  const eliminarConstructora = async (id) => {
    if (!window.confirm('¿Desea eliminar esta constructora?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/constructoras/${id}`);
      alert('Constructora eliminada');
      getConstructoras();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Listado de Constructoras</h2>

      <div className="mb-3">
        <Link to="/crear-constructora" className="btn btn-primary">
          Crear Constructora
        </Link>
      </div>

      {constructoras.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No hay constructoras registradas
        </div>
      ) : (
        <table class="table" >
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Representante</th>
              <th style={{ width: '160px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {constructoras.map((item) => (
              <tr key={item._id}>
                <td>{item.nombre}</td>
                <td>{item.direccion}</td>
                <td>{item.telefono}</td>
                <td>{item.representante}</td>
                <td>
                  <Link
                    to={`/editar-constructora/${item._id}`}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarConstructora(item._id)}
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

export default ListaConstructora;
