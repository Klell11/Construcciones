import React, { useState } from 'react';
import api from '../api'; // Usamos api.js en lugar de axios

function CrearConstructora() {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    representante: '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/constructoras', formData); // Usa la URL dinámica
      alert('Constructora creada exitosamente');
      setFormData({
        nombre: '',
        direccion: '',
        telefono: '',
        representante: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error al crear constructora');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Crear Constructora</h2>
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
          Crear
        </button>
      </form>
    </div>
  );
}

export default CrearConstructora;
