import { useSite } from '../i18n/lang'
import BookingButton from './ui/BookingButton'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function HowItWorks() {
  const { site, t } = useSite()
  const { steps } = site
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="como-funciona-title" eyebrow={steps.eyebrow} title={steps.title} />

        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* linha pontilhada ligando os passos */}
          <span aria-hidden className="absolute top-10 right-[12%] left-[12%] hidden border-t-2 border-dashed border-gold/50 lg:block" />
          {steps.items.map((step, i) => (
            <li key={step.title} className="relative text-center">
              <Reveal delay={i * 120}>
                <div className="relative mx-auto grid size-20 place-items-center rounded-full bg-rose font-serif text-3xl text-wine ring-8 ring-cream transition-transform duration-500 hover:-translate-y-1.5">
                  <span aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                  <span className="sr-only">{t.step(i + 1)}</span>
                </div>
                <h3 className="mt-6 text-2xl">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-64 leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14 flex justify-center">
          <BookingButton label={steps.cta} />
        </Reveal>
      </div>
    </section>
  )
}
