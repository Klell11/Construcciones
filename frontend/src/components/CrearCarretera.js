import React, { useState } from 'react';
import api from '../api'; // Importamos la configuración de API

function CrearCarretera() {
  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    longitud: 0,
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
      await api.post('/carreteras', formData); // Se corrigió la ruta
      alert('✅ Carretera creada exitosamente');
      setFormData({
        nombre: '',
        ubicacion: '',
        longitud: 0,
        fechaFin: '',
      });
    } catch (error) {
      console.error("❌ Error al crear la carretera:", error.response?.data || error.message);
      alert(`Error al crear carretera: ${error.response?.data?.message || "Intenta nuevamente"}`);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Crear Carretera</h2>
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
          <label className="form-label">Ubicación:</label>
          <input
            type="text"
            className="form-control"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Longitud (km):</label>
          <input
            type="number"
            className="form-control"
            name="longitud"
            value={formData.longitud}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha Fin (estimada):</label>
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

export default CrearCarretera;
