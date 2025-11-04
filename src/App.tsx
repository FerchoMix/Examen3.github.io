import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom' // Usa BrowserRouter desde react-router-dom
import { Shell } from '@/components/Chrome' // Asegúrate de que 'Chrome.tsx' está en src/components
import Dashboard from '@/pages/Dashboard' // Asegúrate de que 'Dashboard.tsx' está en src/pages
import Explorar from '@/pages/Explorar' // Asegúrate de que 'Explorar.tsx' está en src/pages
import Pais from '@/pages/Pais' // Asegúrate de que 'Pais.tsx' está en src/pages
import Universidades from '@/pages/Universidades' // Asegúrate de que 'Universidades.tsx' está en src/pages
import Galeria from '@/pages/Galeria' // Asegúrate de que 'Galeria.tsx' está en src/pages

export default function App() {
  return (
    <BrowserRouter> {/* El Router debe envolver toda la aplicación */}
      <Shell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/pais" element={<Pais />} />
          <Route path="/universidades" element={<Universidades />} />
          <Route path="/galeria" element={<Galeria />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}
