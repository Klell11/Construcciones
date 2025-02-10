// backend/routes/carreteras.js
const express = require('express');
const router = express.Router();

const Carretera = require('../models/Carretera');

// Crear Carretera
router.post('/', async (req, res) => {
  try {
    const nuevaCarretera = new Carretera(req.body);
    const carreteraGuardada = await nuevaCarretera.save();
    res.status(201).json(carreteraGuardada);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear carretera', error });
  }
});

// Listar todas las Carreteras
router.get('/', async (req, res) => {
  try {
    const carreteras = await Carretera.find();
    res.json(carreteras);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener carreteras', error });
  }
});

// Obtener una Carretera por ID
router.get('/:id', async (req, res) => {
  try {
    const carretera = await Carretera.findById(req.params.id);
    if (!carretera) {
      return res.status(404).json({ message: 'Carretera no encontrada' });
    }
    res.json(carretera);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar carretera', error });
  }
});

// Actualizar una Carretera
router.put('/:id', async (req, res) => {
  try {
    const carreteraActualizada = await Carretera.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!carreteraActualizada) {
      return res.status(404).json({ message: 'Carretera no encontrada' });
    }
    res.json(carreteraActualizada);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la carretera', error });
  }
});

// Eliminar una Carretera
router.delete('/:id', async (req, res) => {
  try {
    const carreteraEliminada = await Carretera.findByIdAndDelete(req.params.id);
    if (!carreteraEliminada) {
      return res.status(404).json({ message: 'Carretera no encontrada' });
    }
    res.json({ message: 'Carretera eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la carretera', error });
  }
});

// Exportamos el router (CommonJS)
module.exports = router;
