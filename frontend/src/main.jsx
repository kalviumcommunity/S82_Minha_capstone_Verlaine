import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../dist/output.css';
import '@fontsource/playfair-display';


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
