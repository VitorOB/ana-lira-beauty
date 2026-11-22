import { createContext, useContext } from 'react'
import { site, type Site } from '../config/site'
import { ui, type Lang, type UiText } from '../config/ui'

const STORAGE_KEY = 'lang'

export interface SiteContextValue {
  lang: Lang
  /** Conteúdo do site.ts (ou site.en.ts) no idioma atual. */
  site: Site
  /** Textos fixos da interface no idioma atual. */
  t: UiText
  setLang: (lang: Lang) => void
}

export const SiteContext = createContext<SiteContextValue>({ lang: 'pt', site, t: ui.pt, setLang: () => {} })

export const useSite = () => useContext(SiteContext)

const isLang = (v: unknown): v is Lang => v === 'pt' || v === 'en'

/** Ordem: ?lang= na URL → escolha salva → idioma do navegador (português = pt, outros = en). */
export function detectLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    /* armazenamento bloqueado: segue para o idioma do navegador */
  }
  const browser = navigator.languages?.[0] ?? navigator.language ?? 'pt'
  return browser.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* sem armazenamento: a escolha vale só nesta visita */
  }
}
