// backend/server.js
require('dotenv').config();
const path = require('path'); // Importa el módulo 'path'
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importa tus rutas
const carreterasRoutes = require('./routes/carreteras');
const constructorasRoutes = require('./routes/constructoras');
const presupuestosRoutes = require('./routes/presupuestos');
const proyectosRoutes = require('./routes/proyectos');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/carreteras', carreterasRoutes);
app.use('/api/constructoras', constructorasRoutes);
app.use('/api/presupuestos', presupuestosRoutes);
app.use('/api/proyectos', proyectosRoutes);

// Servir archivos estáticos del frontend (solo en producción)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Ruta para manejar todas las solicitudes y servir el archivo index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Conexión a MongoDB
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI; // Verifica que esta variable no sea undefined

if (!URI) {
  console.error("❌ MONGODB_URI no está definido. Revisa tu archivo .env");
  process.exit(1);
}

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});