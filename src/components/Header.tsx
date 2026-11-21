import { useEffect, useState } from 'react'
import { site } from '../config/site'
import { useBooking } from '../context/BookingContext'
import { CloseIcon, MenuIcon } from './ui/Icons'

/** Menu em cápsula flutuante com fundo translúcido e blur. */
export default function Header() {
  const { openBooking } = useBooking()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-5 sm:px-6">
      <nav
        aria-label="Principal"
        className={`mx-auto max-w-6xl rounded-[32px] border border-white/60 bg-cream/70 backdrop-blur-xl transition-shadow duration-300 supports-[backdrop-filter]:bg-cream/60 ${
          scrolled ? 'shadow-[0_18px_40px_-24px_rgba(42,21,24,0.45)]' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-3 py-2 pr-2 pl-5">
          <a href="#inicio" className="font-serif text-xl whitespace-nowrap text-wine sm:text-2xl" onClick={() => setOpen(false)}>
            {site.brand.name}
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-3 py-2 text-[15px] text-muted transition-colors hover:bg-blush hover:text-wine">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openBooking()}
              aria-haspopup="dialog"
              className="hidden rounded-full bg-wine px-5 py-2.5 text-[15px] font-medium text-on-wine transition hover:bg-wine-dark sm:inline-flex"
            >
              Consultar data
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-wine transition hover:bg-blush lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="menu-mobile" className="animate-fade-in px-3 pb-4 lg:hidden">
            <ul className="grid gap-1 border-t border-wine/10 pt-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-full px-4 py-3 text-ink transition-colors hover:bg-blush hover:text-wine"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openBooking()
              }}
              className="mt-3 w-full rounded-full bg-wine px-5 py-3.5 font-medium text-on-wine"
            >
              Consultar disponibilidade
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
