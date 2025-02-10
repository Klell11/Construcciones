import React, { useState } from 'react';
import api from '../api'; // Usamos api.js en lugar de axios

function CrearPresupuesto() {
  const [formData, setFormData] = useState({
    monto: 0,
    origenFondos: '',
    fechaFin: '',
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
      await api.post('/api/presupuestos', formData); // Usa la URL dinámica
      alert('Presupuesto creado exitosamente');
      setFormData({
        monto: 0,
        origenFondos: '',
        fechaFin: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error al crear presupuesto');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Crear Presupuesto</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Monto:</label>
          <input
            type="number"
            className="form-control"
            name="monto"
            value={formData.monto}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Origen de Fondos:</label>
          <input
            type="text"
            className="form-control"
            name="origenFondos"
            value={formData.origenFondos}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Entrega (estimada):</label>
          <input
            type="date"
            className="form-control"
            name="fechaFin"
            value={formData.fechaFin}
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

export default CrearPresupuesto;
