import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// No build de produção o HTML já vem pré-renderizado (carrega mais rápido e ajuda no SEO);
// em desenvolvimento a página é montada do zero.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
