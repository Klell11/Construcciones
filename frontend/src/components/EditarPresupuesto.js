// frontend/src/components/EditarPresupuesto.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarPresupuesto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    monto: 0,
    origenFondos: '',
    fechaFin: '',
  });

  useEffect(() => {
    const getPresupuestoById = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/presupuestos/${id}`);
        if (res.data) {
          setFormData({
            monto: res.data.monto || 0,
            origenFondos: res.data.origenFondos || '',
            fechaFin: res.data.fechaFin ? res.data.fechaFin.substring(0, 10) : '',
          });
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar el presupuesto');
      }
    };
    getPresupuestoById();
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
      await axios.put(`http://localhost:4000/api/presupuestos/${id}`, formData);
      alert('Presupuesto actualizado');
      navigate('/presupuestos');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar presupuesto');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Editar Presupuesto</h2>
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
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default EditarPresupuesto;
