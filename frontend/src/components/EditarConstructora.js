// frontend/src/components/EditarConstructora.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarConstructora() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    representante: '',
  });

  useEffect(() => {
    const getConstructora = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/constructoras/${id}`);
        if (res.data) {
          setFormData({
            nombre: res.data.nombre || '',
            direccion: res.data.direccion || '',
            telefono: res.data.telefono || '',
            representante: res.data.representante || '',
          });
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar datos de la constructora');
      }
    };
    getConstructora();
  }, [id]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/constructoras/${id}`, formData);
      alert('Constructora actualizada');
      navigate('/constructoras');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar constructora');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Editar Constructora</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            value={formData.direccion}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono:</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={formData.telefono}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Representante:</label>
          <input
            type="text"
            className="form-control"
            name="representante"
            value={formData.representante}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default EditarConstructora;
