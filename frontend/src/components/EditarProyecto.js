import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarProyecto() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Cargar listas de opciones
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
        console.error('Error al cargar listas de datos:', error);
      }
    };
    cargarDatos();
  }, []);

  // Cargar datos del proyecto
  useEffect(() => {
    const getProyectoById = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/proyectos/${id}`);
        setFormData({
          nombre: res.data.nombre,
          contratista: res.data.contratista?._id || '',
          presupuesto: res.data.presupuesto?._id || '',
          carretera: res.data.carretera?._id || '',
          fechaInicio: res.data.fechaInicio ? res.data.fechaInicio.substring(0, 10) : '',
          fechaFin: res.data.fechaFin ? res.data.fechaFin.substring(0, 10) : '',
        });
      } catch (error) {
        console.error('Error al cargar el proyecto:', error);
      }
    };
    getProyectoById();
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
      await axios.put(`http://localhost:4000/api/proyectos/${id}`, formData);
      alert('Proyecto actualizado exitosamente');
      navigate('/proyectos');
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
      alert('Error al actualizar el proyecto.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Proyecto</h2>
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
          <label className="form-label">Contratista:</label>
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
                ${p.monto}
              </option>
            ))}
          </select>
        </div>

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
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default EditarProyecto;
