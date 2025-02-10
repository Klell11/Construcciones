// backend/models/Presupuesto.js
const mongoose = require('mongoose');

const PresupuestoSchema = new mongoose.Schema({
  // El nuevo esquema sin "nombre" ni "destino"
  monto: {
    type: Number,
    required: true,
  },
  origenFondos: {
    type: String,
    default: '',
  },
  fechaInicio: {
    type: Date,
    default: Date.now,
  },
  fechaFin: {
    type: Date,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Presupuesto', PresupuestoSchema);
