import { site } from '../config/site'
import BookingButton from './ui/BookingButton'
import Reveal from './ui/Reveal'
import RichText from './ui/RichText'

const { finalCta } = site

export default function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="relative mt-10">
      {/* Onda antes da chamada final */}
      <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-16 w-full text-blush sm:h-24">
        <path
          fill="currentColor"
          d="M0,64 C180,120 360,120 540,80 C720,40 900,0 1080,24 C1260,48 1350,88 1440,96 L1440,120 L0,120 Z"
        />
      </svg>
      <div className="relative overflow-hidden bg-gradient-to-b from-blush to-rose/70 px-5 pt-14 pb-24 sm:pt-16 sm:pb-32">
        <div aria-hidden className="animate-blob absolute -top-24 -right-24 size-80 bg-rose/70" />
        <div aria-hidden className="animate-blob absolute -bottom-32 -left-20 size-96 bg-cream/60 [animation-delay:-6s]" />

        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex rounded-full bg-wine px-4 py-1.5 text-sm font-medium tracking-[0.14em] text-on-wine uppercase">{finalCta.eyebrow}</p>
          <h2 id="final-title" className="text-4xl leading-[1.06] sm:text-6xl">
            <RichText text={finalCta.title} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">{finalCta.text}</p>
          <BookingButton label={finalCta.cta} size="lg" className="mt-10" />
        </Reveal>
      </div>
    </section>
  )
}
