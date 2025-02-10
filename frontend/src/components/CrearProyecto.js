// frontend/src/components/CrearProyecto.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CrearProyecto() {
  const navigate = useNavigate();

  // Listas para llenar selects
  const [constructoras, setConstructoras] = useState([]);
  const [carreteras, setCarreteras] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);

  const [formData, setFormData] = useState({
    nombre: '',
    contratista: '',
    presupuesto: '',
    carretera: '',
    fechaInicio: '',
    fechaFin: '',
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resCon, resCar, resPre] = await Promise.all([
          axios.get('http://localhost:4000/api/constructoras'),
          axios.get('http://localhost:4000/api/carreteras'),
          axios.get('http://localhost:4000/api/presupuestos'),
        ]);
        setConstructoras(resCon.data);
        setCarreteras(resCar.data);
        setPresupuestos(resPre.data);
      } catch (error) {
        console.error(error);
      }
    };
    cargarDatos();
  }, []);

  const onChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/proyectos', formData);
      alert('Proyecto creado');
      navigate('/proyectos');
    } catch (error) {
      console.error(error);
      alert('Error al crear proyecto');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Crear Proyecto</h2>
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

        {/* Contratista */}
        <div className="mb-3">
          <label className="form-label">Contratista (Constructora):</label>
          <select
            className="form-select"
            name="contratista"
            value={formData.contratista}
            onChange={onChange}
            required
          >
            <option value="">-- Seleccionar --</option>
            {constructoras.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Presupuesto */}
        <div className="mb-3">
          <label className="form-label">Presupuesto:</label>
          <select
            className="form-select"
            name="presupuesto"
            value={formData.presupuesto}
            onChange={onChange}
          >
            <option value="">-- Seleccionar --</option>
            {presupuestos.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre} - ${p.monto}
              </option>
            ))}
          </select>
        </div>

        {/* Carretera */}
        <div className="mb-3">
          <label className="form-label">Carretera:</label>
          <select
            className="form-select"
            name="carretera"
            value={formData.carretera}
            onChange={onChange}
          >
            <option value="">-- Seleccionar --</option>
            {carreteras.map((r) => (
              <option key={r._id} value={r._id}>
                {r.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Fechas */}
        <div className="mb-3">
          <label className="form-label">Fecha Inicio:</label>
          <input
            type="date"
            className="form-control"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha Fin:</label>
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

export default CrearProyecto;
