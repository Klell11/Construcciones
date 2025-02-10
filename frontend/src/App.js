// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tu nuevo Navbar
import Navbar from './components/Navbar';

// Rutas Carreteras
import ListaCarretera from './components/ListaCarretera';
import CrearCarretera from './components/CrearCarretera';
import EditarCarretera from './components/EditarCarretera';

// Rutas Constructoras
import ListaConstructora from './components/ListaConstructora';
import CrearConstructora from './components/CrearConstructora';
import EditarConstructora from './components/EditarConstructora';

// Rutas Presupuestos
import ListaPresupuesto from './components/ListaPresupuesto';
import CrearPresupuesto from './components/CrearPresupuesto';
import EditarPresupuesto from './components/EditarPresupuesto';

// Rutas Proyectos
import ListaProyectos from './components/ListaProyectos';
import CrearProyecto from './components/CrearProyecto';
import EditarProyecto from './components/EditarProyecto';


function App() {
  return (
    <Router>
      {/* Reemplaza la <nav> antigua por tu <Navbar /> */}
      <Navbar />

      <div style={{ padding: '20px' }}>
        
        <hr />

        <Routes>
          {/* Proyectos */}
          <Route path="/proyectos" element={<ListaProyectos />} />
          <Route path="/crear-proyecto" element={<CrearProyecto />} />
          <Route path="/editar-proyecto/:id" element={<EditarProyecto />} />

          {/* Carreteras */}
          <Route path="/carreteras" element={<ListaCarretera />} />
          <Route path="/crear" element={<CrearCarretera />} />
          <Route path="/editar/:id" element={<EditarCarretera />} />

          {/* Constructoras */}
          <Route path="/constructoras" element={<ListaConstructora />} />
          <Route path="/crear-constructora" element={<CrearConstructora />} />
          <Route path="/editar-constructora/:id" element={<EditarConstructora />} />

          {/* Presupuestos */}
          <Route path="/presupuestos" element={<ListaPresupuesto />} />
          <Route path="/crear-presupuesto" element={<CrearPresupuesto />} />
          <Route path="/editar-presupuesto/:id" element={<EditarPresupuesto />} />

          {/* Ruta por defecto */}
          <Route path="/" element={<ListaCarretera />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
