import { useCallback, useEffect, useRef, useState } from 'react'
import { useSite } from '../i18n/lang'
import BookingButton from './ui/BookingButton'
import { ArrowIcon } from './ui/Icons'
import Img from './ui/Img'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const ROTATIONS = ['-rotate-2', 'rotate-[1.5deg]', '-rotate-1', 'rotate-2']

export default function Testimonials() {
  // `ui` (e não `t`): dentro dos .map, `t` é cada depoimento.
  const { site, t: ui } = useSite()
  const { testimonials } = site
  const trackRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const total = testimonials.items.length

  const goTo = useCallback((index: number) => {
    const track = trackRef.current
    const card = track?.children[index] as HTMLElement | undefined
    if (!track || !card) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  // Descobre qual cartão está mais centralizado enquanto a pessoa arrasta
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const center = track.scrollLeft + track.clientWidth / 2
      let closest = 0
      let min = Infinity
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement
        const d = Math.abs(el.offsetLeft - track.offsetLeft + el.clientWidth / 2 - center)
        if (d < min) {
          min = d
          closest = i
        }
      })
      setActive(closest)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="overflow-hidden px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl rounded-section bg-blush py-16 lg:py-24">
        <div className="px-5 sm:px-10">
          <SectionHeading id="depoimentos-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
        </div>

        <Reveal>
          <ul
            ref={trackRef}
            aria-roledescription={ui.carousel}
            aria-label={ui.testimonialsLabel}
            className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 py-8 sm:px-10 lg:px-[calc((100%-3*340px-2*24px)/2)]"
          >
            {testimonials.items.map((t, i) => (
              <li
                key={t.name}
                aria-roledescription={ui.testimonial}
                aria-label={ui.position(i + 1, total)}
                className={`w-[min(85vw,340px)] shrink-0 snap-center ${ROTATIONS[i % ROTATIONS.length]} transition-transform duration-500 hover:rotate-0`}
              >
                <figure className="flex h-full flex-col rounded-[40px] bg-cream p-7 shadow-[0_24px_50px_-34px_rgba(42,21,24,0.55)] transition duration-500 hover:-translate-y-2">
                  <span aria-hidden className="font-serif text-6xl leading-none text-rose">“</span>
                  <blockquote className="-mt-3 flex-1 text-[17px] leading-relaxed text-ink">{t.text}</blockquote>
                  <figcaption className="mt-7 flex items-center gap-4 border-t border-wine/10 pt-5">
                    <Img src={t.photo.src} alt={t.photo.alt} widths={[96, 144]} ratio={1} sizes="56px" className="size-14 rounded-full object-cover ring-4 ring-rose" />
                    <div>
                      <p className="font-medium text-ink">{t.name}</p>
                      <p className="text-sm text-muted">
                        {t.city}
                        {t.detail && ` · ${t.detail}`}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-6 flex items-center justify-center gap-4 px-5">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            className="grid size-12 place-items-center rounded-full border border-wine/20 text-wine transition hover:bg-wine hover:text-on-wine disabled:pointer-events-none disabled:opacity-35"
            aria-label={ui.prevTestimonial}
          >
            <ArrowIcon direction="left" className="size-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.items.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={ui.seeTestimonial(t.name)}
                aria-current={active === i}
                className="grid size-6 place-items-center"
              >
                <span className={`block h-2.5 rounded-full transition-all duration-300 ${active === i ? 'w-7 bg-wine' : 'w-2.5 bg-wine/25'}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(Math.min(total - 1, active + 1))}
            disabled={active === total - 1}
            className="grid size-12 place-items-center rounded-full border border-wine/20 text-wine transition hover:bg-wine hover:text-on-wine disabled:pointer-events-none disabled:opacity-35"
            aria-label={ui.nextTestimonial}
          >
            <ArrowIcon className="size-5" />
          </button>
        </div>

        <Reveal className="mt-12 flex justify-center px-5">
          <BookingButton label={testimonials.cta} />
        </Reveal>
      </div>
    </section>
  )
}
