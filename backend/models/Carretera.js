// backend/models/Carretera.js
const mongoose = require('mongoose');

const CarreteraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
  // Omitimos presupuesto y constructora
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

module.exports = mongoose.model('Carretera', CarreteraSchema);
