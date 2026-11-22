import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
import { detectLang } from './i18n/lang'
import './index.css'

const root = document.getElementById('root')!
const lang = detectLang()
const app = (
  <StrictMode>
    <LanguageProvider initialLang={lang}>
      <App />
    </LanguageProvider>
  </StrictMode>
)

// No build de produção o HTML já vem pré-renderizado em português (carrega mais rápido e ajuda no SEO)
// e é só hidratado. Em inglês, ou em desenvolvimento, a página é montada do zero no idioma certo.
if (root.hasChildNodes() && lang === 'pt') hydrateRoot(root, app)
else {
  root.replaceChildren()
  createRoot(root).render(app)
}
