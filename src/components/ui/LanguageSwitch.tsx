import { useSite } from '../../i18n/lang'

/** Botão PT/EN: mostra o idioma de destino. */
export default function LanguageSwitch() {
  const { t, setLang } = useSite()
  const { short, label, target } = t.langSwitch
  return (
    <button
      type="button"
      onClick={() => setLang(target)}
      className="grid size-11 shrink-0 place-items-center rounded-full border border-wine/20 text-sm font-medium tracking-[0.06em] text-wine transition hover:bg-blush"
    >
      <span lang={target === 'en' ? 'en' : 'pt-BR'}>
        {short}
        <span className="sr-only"> — {label}</span>
      </span>
    </button>
  )
}
