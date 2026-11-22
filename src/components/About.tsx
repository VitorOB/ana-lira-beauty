import { useSite } from '../i18n/lang'
import BookingButton from './ui/BookingButton'
import Img from './ui/Img'
import Reveal from './ui/Reveal'
import RichText from './ui/RichText'

export default function About() {
  const { site, t } = useSite()
  const { about } = site
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-14 rounded-section bg-blush px-6 py-16 sm:px-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-16 lg:py-20">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div aria-hidden className="absolute -top-5 -left-5 size-24 rounded-full bg-rose" />
          <div aria-hidden className="absolute -right-4 -bottom-4 h-2/3 w-2/3 rounded-tr-section rounded-bl-section border border-gold/60" />
          <div className="group relative overflow-hidden rounded-tl-[120px] rounded-tr-[24px] rounded-br-[120px] rounded-bl-[24px] shadow-[0_30px_60px_-30px_rgba(91,30,45,0.55)]">
            <Img
              src={about.image.src}
              alt={about.image.alt}
              ratio={4 / 5}
              widths={[360, 540, 720]}
              sizes="(min-width: 1024px) 384px, 90vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-3 text-sm font-medium tracking-[0.18em] text-wine uppercase">
              <span aria-hidden className="h-px w-8 bg-gold" />
              {about.eyebrow}
            </p>
            <h2 id="sobre-title" className="text-4xl leading-[1.08] sm:text-5xl">
              <RichText text={about.title} />
            </h2>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-9 grid grid-cols-3 gap-3">
              {about.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse rounded-[28px] bg-cream px-3 py-5 text-center">
                  <dt className="mt-1 text-sm leading-snug text-muted">{s.label}</dt>
                  <dd className="font-serif text-[1.7rem] whitespace-nowrap text-wine sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label={t.styleTagsLabel}>
              {about.styleTags.map((tag) => (
                <li key={tag} className="rounded-full border border-wine/15 bg-white/60 px-4 py-2 text-[15px] text-ink">
                  {tag}
                </li>
              ))}
            </ul>
            <BookingButton label={about.cta} className="mt-9" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
