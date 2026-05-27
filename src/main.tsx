import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/index.css'
import App from './app/App.tsx'

// son importaciones necesarias para que el proyecto funcione, no se pueden eliminar
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
