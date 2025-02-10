// backend/routes/proyectos.js
const express = require('express');
const router = express.Router();

const Proyecto = require('../models/Proyecto');

// Crear Proyecto
router.post('/', async (req, res) => {
  try {
    const nuevoProyecto = new Proyecto(req.body);
    const proyectoGuardado = await nuevoProyecto.save();
    return res.status(201).json(proyectoGuardado);
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear proyecto', error });
  }
});

// Listar todos los Proyectos
router.get('/', async (req, res) => {
  try {
    // Populate para traer datos de otras colecciones
    const proyectos = await Proyecto.find()
      .populate('contratista', 'nombre') // trae solo "nombre" de la constructora
      .populate('presupuesto', 'nombre monto') // de Presupuesto, muestra "nombre" y "monto"
      .populate('carretera', 'nombre ubicacion'); // de Carretera
    return res.json(proyectos);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener proyectos', error });
  }
});

// Obtener un Proyecto por ID
router.get('/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id)
      .populate('contratista', 'nombre')
      .populate('presupuesto', 'nombre monto')
      .populate('carretera', 'nombre ubicacion');

    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    return res.json(proyecto);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar proyecto', error });
  }
});

// Actualizar un Proyecto
router.put('/:id', async (req, res) => {
  try {
    const proyectoActualizado = await Proyecto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!proyectoActualizado) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    return res.json(proyectoActualizado);
  } catch (error) {
    return res.status(400).json({ message: 'Error al actualizar el proyecto', error });
  }
});

// Eliminar un Proyecto
router.delete('/:id', async (req, res) => {
  try {
    const proyectoEliminado = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyectoEliminado) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    return res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el proyecto', error });
  }
});

module.exports = router;
