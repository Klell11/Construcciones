// backend/routes/presupuestos.js
const express = require('express');
const router = express.Router();

const Presupuesto = require('../models/Presupuesto');

// Crear Presupuesto
router.post('/', async (req, res) => {
  try {
    const nuevoPresupuesto = new Presupuesto(req.body);
    const presupuestoGuardado = await nuevoPresupuesto.save();
    return res.status(201).json(presupuestoGuardado);
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear presupuesto', error });
  }
});

// Listar todos los Presupuestos
router.get('/', async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find();
    return res.json(presupuestos);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener presupuestos', error });
  }
});

// Obtener un Presupuesto por ID
router.get('/:id', async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findById(req.params.id);
    if (!presupuesto) {
      return res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
    return res.json(presupuesto);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar presupuesto', error });
  }
});

// Actualizar un Presupuesto
router.put('/:id', async (req, res) => {
  try {
    const presupuestoActualizado = await Presupuesto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!presupuestoActualizado) {
      return res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
    return res.json(presupuestoActualizado);
  } catch (error) {
    return res.status(400).json({ message: 'Error al actualizar el presupuesto', error });
  }
});

// Eliminar un Presupuesto
router.delete('/:id', async (req, res) => {
  try {
    const presupuestoEliminado = await Presupuesto.findByIdAndDelete(req.params.id);
    if (!presupuestoEliminado) {
      return res.status(404).json({ message: 'Presupuesto no encontrado' });
    }
    return res.json({ message: 'Presupuesto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el presupuesto', error });
  }
});

module.exports = router;
