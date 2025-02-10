// backend/models/Proyecto.js
const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  contratista: {
    // Referencia a la colección 'Constructora'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Constructora',
    required: true,
  },
  presupuesto: {
    // Referencia a la colección 'Presupuesto'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Presupuesto',
  },
  carretera: {
    // Referencia a la colección 'Carretera'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carretera',
  },
  fechaInicio: {
    type: Date,
    default: Date.now,
  },
  fechaFin: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
