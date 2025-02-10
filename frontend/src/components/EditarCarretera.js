import React, { useState, useEffect } from 'react';
import api from '../api'; // Importar api.js
import { useParams, useNavigate } from 'react-router-dom';

function EditarCarretera() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    longitud: 0,
    fechaFin: '',
  });

  useEffect(() => {
    const getCarreteraById = async () => {
      try {
        const res = await api.get(`/api/carreteras/${id}`);
        if (res.data) {
          setFormData({
            nombre: res.data.nombre,
            ubicacion: res.data.ubicacion,
            longitud: res.data.longitud,
            fechaFin: res.data.fechaFin ? res.data.fechaFin.substring(0, 10) : '',
          });
        }
      } catch (error) {
        console.error('Error al cargar la carretera:', error);
      }
    };
    getCarreteraById();
  }, [id]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/carreteras/${id}`, formData);
      alert('Carretera actualizada exitosamente');
      navigate('/carreteras');
    } catch (error) {
      console.error('Error al actualizar la carretera:', error);
      alert('Error al actualizar la carretera.');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Editar Carretera</h2>
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
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default EditarCarretera;
