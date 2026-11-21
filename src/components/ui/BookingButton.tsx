import { useBooking } from '../../context/BookingContext'
import { ArrowIcon, WhatsAppIcon } from './Icons'

interface BookingButtonProps {
  label: string
  packageId?: string
  variant?: 'wine' | 'light' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variants = {
  wine: 'bg-wine text-on-wine hover:bg-wine-dark shadow-[0_14px_30px_-14px_rgba(91,30,45,0.7)]',
  light: 'bg-on-wine text-wine hover:bg-white shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)]',
  outline: 'border border-wine/30 text-wine hover:bg-wine hover:text-on-wine',
}

/** Botão principal do site: sempre abre o formulário "Consultar disponibilidade". */
export default function BookingButton({ label, packageId, variant = 'wine', size = 'md', className = '' }: BookingButtonProps) {
  const { openBooking } = useBooking()
  const sizes = { sm: 'px-4 py-3 text-[15px]', md: 'px-6 py-3 text-[15px]', lg: 'px-7 py-4 text-base' }[size]
  return (
    <button
      type="button"
      onClick={() => openBooking(packageId)}
      aria-haspopup="dialog"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition duration-300 hover:-translate-y-0.5 ${sizes} ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon className="size-[18px] shrink-0" />
      <span>{label}</span>
      {size !== 'sm' && <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  )
}
