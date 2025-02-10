// backend/models/Constructora.js
const mongoose = require('mongoose');

const ConstructoraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    default: '',
  },
  telefono: {
    type: String,
    default: '',
  },
  representante: {
    type: String,
    default: '',
  },
  // Agrega los campos que quieras. Ejemplo:
  // ruc: { type: String, default: '' },
  // fechaRegistro: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Constructora', ConstructoraSchema);
