import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { LanguageProvider } from './i18n/LanguageProvider'

/** Usado só no build (scripts/prerender.mjs) para gerar o HTML estático da página, em português. */
export function render() {
  return renderToString(
    <StrictMode>
      <LanguageProvider initialLang="pt">
        <App />
      </LanguageProvider>
    </StrictMode>,
  )
}
