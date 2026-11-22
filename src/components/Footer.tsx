import { useBooking } from '../context/BookingContext'
import { useSite } from '../i18n/lang'
import { InstagramIcon, PinIcon, WhatsAppIcon } from './ui/Icons'

export default function Footer() {
  const { openBooking } = useBooking()
  const { site, t } = useSite()
  const { brand, contact, location, footer } = site

  return (
    <footer className="bg-wine text-on-wine">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-28 sm:px-8 sm:pb-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="font-serif text-4xl">{brand.name}</p>
            <p className="mt-3 max-w-sm leading-relaxed text-on-wine/80">{footer.description}</p>
          </div>

          <ul className="grid gap-3 text-[15px]">
            <li>
              {contact.instagramUrl ? (
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full transition-colors hover:text-rose">
                  <span className="grid size-10 place-items-center rounded-full bg-on-wine/10">
                    <InstagramIcon className="size-5" />
                  </span>
                  @{contact.instagram}
                </a>
              ) : (
                // Sem usuário configurado (site de demonstração): só texto, sem link para nenhuma conta.
                <span className="inline-flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-on-wine/10">
                    <InstagramIcon className="size-5" />
                  </span>
                  Instagram
                  <span className="rounded-full bg-on-wine/15 px-2.5 py-0.5 text-xs tracking-[0.08em] uppercase">{t.demo}</span>
                </span>
              )}
            </li>
            <li>
              <button type="button" onClick={() => openBooking()} aria-haspopup="dialog" className="inline-flex items-center gap-3 rounded-full transition-colors hover:text-rose">
                <span className="grid size-10 place-items-center rounded-full bg-on-wine/10">
                  <WhatsAppIcon className="size-5" />
                </span>
                WhatsApp {contact.whatsappDisplay}
              </button>
            </li>
            <li className="inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-on-wine/10">
                <PinIcon className="size-5" />
              </span>
              {t.servingIn(location.region)}
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-on-wine/15 pt-6 text-sm text-on-wine/75 sm:flex-row">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {brand.name}. {t.rights}
          </p>
          <p>
            {footer.credit.label}{' '}
            <a href={footer.credit.url} target="_blank" rel="noopener noreferrer" className="font-medium text-on-wine underline decoration-on-wine/40 underline-offset-4 hover:decoration-on-wine">
              {footer.credit.handle}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
