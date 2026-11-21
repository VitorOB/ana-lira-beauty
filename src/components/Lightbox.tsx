import { useEffect, useRef } from 'react'
import type { PortfolioItem } from '../config/types'
import { useModalBehavior } from '../hooks/useModalBehavior'
import { ArrowIcon, CloseIcon } from './ui/Icons'
import Img from './ui/Img'

interface LightboxProps {
  items: PortfolioItem[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

export default function Lightbox({ items, index, onChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useModalBehavior(dialogRef, onClose)

  const item = items[index]
  const prev = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, onChange])

  return (
    <div className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Foto ${index + 1} de ${items.length}: ${item.alt}`}
        className="animate-slide-up relative flex max-h-full w-full max-w-3xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-1 right-0 z-10 grid size-11 place-items-center rounded-full bg-cream text-wine shadow-lg transition hover:bg-white sm:-right-14"
          aria-label="Fechar foto"
        >
          <CloseIcon className="size-5" />
        </button>

        <figure className="w-full">
          <Img
            key={item.src}
            src={item.src}
            alt={item.alt}
            widths={[640, 960, 1280]}
            sizes="(min-width: 768px) 768px, 92vw"
            priority
            className="animate-fade-in mx-auto max-h-[78vh] w-auto rounded-[40px] object-contain"
          />
          <figcaption className="mt-4 text-center text-on-wine">
            <span className="mr-2 rounded-full bg-wine px-3 py-1 text-sm font-medium">{item.category}</span>
            <span className="text-[15px]">{item.alt}</span>
          </figcaption>
        </figure>

        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={prev} className="grid size-12 place-items-center rounded-full bg-cream text-wine transition hover:bg-white" aria-label="Foto anterior">
            <ArrowIcon direction="left" className="size-5" />
          </button>
          <span className="min-w-16 text-center text-sm text-on-wine" aria-live="polite">
            {index + 1} / {items.length}
          </span>
          <button type="button" onClick={next} className="grid size-12 place-items-center rounded-full bg-cream text-wine transition hover:bg-white" aria-label="Próxima foto">
            <ArrowIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
