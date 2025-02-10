// backend/routes/constructoras.js
const express = require('express');
const router = express.Router();

const Constructora = require('../models/Constructora');

// Crear Constructora
router.post('/', async (req, res) => {
  try {
    const nuevaConstructora = new Constructora(req.body);
    const constructoraGuardada = await nuevaConstructora.save();
    return res.status(201).json(constructoraGuardada);
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear constructora', error });
  }
});

// Listar todas las Constructoras
router.get('/', async (req, res) => {
  try {
    const constructoras = await Constructora.find();
    return res.json(constructoras);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener constructoras', error });
  }
});

// Obtener una Constructora por ID
router.get('/:id', async (req, res) => {
  try {
    const constructora = await Constructora.findById(req.params.id);
    if (!constructora) {
      return res.status(404).json({ message: 'Constructora no encontrada' });
    }
    return res.json(constructora);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar constructora', error });
  }
});

// Actualizar una Constructora
router.put('/:id', async (req, res) => {
  try {
    const constructoraActualizada = await Constructora.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // new:true para retornar el documento actualizado
    );
    if (!constructoraActualizada) {
      return res.status(404).json({ message: 'Constructora no encontrada' });
    }
    return res.json(constructoraActualizada);
  } catch (error) {
    return res.status(400).json({ message: 'Error al actualizar la constructora', error });
  }
});

// Eliminar una Constructora
router.delete('/:id', async (req, res) => {
  try {
    const constructoraEliminada = await Constructora.findByIdAndDelete(req.params.id);
    if (!constructoraEliminada) {
      return res.status(404).json({ message: 'Constructora no encontrada' });
    }
    return res.json({ message: 'Constructora eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la constructora', error });
  }
});

module.exports = router;
