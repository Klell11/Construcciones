// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importa tus otras rutas:
const carreterasRoutes = require('./routes/carreteras');
const constructorasRoutes = require('./routes/constructoras');
const presupuestosRoutes = require('./routes/presupuestos');

// Importa la nueva ruta de proyectos
const proyectosRoutes = require('./routes/proyectos');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/carreteras', carreterasRoutes);
app.use('/api/constructoras', constructorasRoutes);
app.use('/api/presupuestos', presupuestosRoutes);

// Nueva ruta para Proyectos
app.use('/api/proyectos', proyectosRoutes);


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

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
