import { site } from '../config/site'
import { useBooking } from '../context/BookingContext'
import { WhatsAppIcon } from './ui/Icons'

/** Botão flutuante com pulso. Abre o mesmo formulário de disponibilidade. */
export default function WhatsAppFloat() {
  const { openBooking, isOpen } = useBooking()
  if (isOpen) return null

  return (
    <button
      type="button"
      onClick={() => openBooking()}
      aria-haspopup="dialog"
      aria-label={site.floatingButtonLabel}
      title={site.floatingButtonLabel}
      className="pulse-ring fixed right-4 bottom-4 z-50 isolate grid size-16 place-items-center rounded-full bg-whats text-white shadow-[0_14px_30px_-10px_rgba(30,138,82,0.75)] transition hover:scale-105 hover:bg-whats-dark sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-8" />
    </button>
  )
}
