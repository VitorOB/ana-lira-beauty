import { useCallback, useMemo, useState } from 'react'
import { site } from '../config/site'
import Lightbox from './Lightbox'
import BookingButton from './ui/BookingButton'
import Img from './ui/Img'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const { portfolio } = site

/** Formatos que se alternam na galeria: arco, círculo e cantos alternados. */
const SHAPES = [
  { className: 'rounded-t-full rounded-b-[32px]', ratio: 3 / 4 },
  { className: 'rounded-full', ratio: 1 },
  { className: 'rounded-tl-section rounded-br-section rounded-tr-xl rounded-bl-xl', ratio: 4 / 5 },
  { className: 'rounded-tr-section rounded-bl-section rounded-tl-xl rounded-br-xl', ratio: 4 / 5 },
  { className: 'rounded-b-full rounded-t-[32px]', ratio: 3 / 4 },
  { className: 'rounded-[40px]', ratio: 1 },
]

export default function Portfolio() {
  const [filter, setFilter] = useState<string>(portfolio.allLabel)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const items = useMemo(
    () => (filter === portfolio.allLabel ? portfolio.items : portfolio.items.filter((i) => i.category === filter)),
    [filter],
  )
  const filters = [portfolio.allLabel, ...portfolio.categories]
  const closeLightbox = useCallback(() => setLightbox(null), [])

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="portfolio-title" eyebrow={portfolio.eyebrow} title={portfolio.title} subtitle={portfolio.subtitle} />

        <Reveal className="mt-10 flex justify-center">
          <div role="group" aria-label="Filtrar portfólio por categoria" className="flex flex-wrap justify-center gap-2 rounded-full bg-blush p-1.5">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors ${
                  filter === f ? 'bg-wine text-on-wine shadow-md' : 'text-muted hover:text-wine'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 items-center gap-4 sm:gap-6 lg:grid-cols-3" aria-live="polite">
          {items.map((item, i) => {
            const shape = SHAPES[i % SHAPES.length]
            return (
              <li key={item.src}>
                <Reveal delay={(i % 3) * 90}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className={`group relative block w-full overflow-hidden bg-blush ${shape.className}`}
                    aria-label={`Ampliar foto: ${item.alt}`}
                  >
                    <Img
                      src={item.src}
                      alt={item.alt}
                      ratio={shape.ratio}
                      widths={[300, 450, 600]}
                      sizes="(min-width: 1024px) 360px, 46vw"
                      className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ aspectRatio: shape.ratio }}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-wine/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute bottom-[14%] left-1/2 -translate-x-1/2 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-wine opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {item.category}
                    </span>
                  </button>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <Reveal className="mt-14 flex justify-center">
          <BookingButton label={portfolio.cta} />
        </Reveal>
      </div>

      {lightbox !== null && <Lightbox items={items} index={lightbox} onChange={setLightbox} onClose={closeLightbox} />}
    </section>
  )
}
