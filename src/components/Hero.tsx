import type { CSSProperties } from 'react'
import { site } from '../config/site'
import { HERO_IMAGE } from '../lib/image'
import BookingButton from './ui/BookingButton'
import Img from './ui/Img'
import RichText from './ui/RichText'

const { hero } = site
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

/** Selo circular girando com texto em volta. */
function RotatingSeal() {
  return (
    <div className="absolute -top-4 -right-2 z-20 size-28 sm:-right-6 sm:size-32" aria-hidden>
      <div className="grid size-full place-items-center rounded-full bg-cream/90 shadow-[0_10px_30px_-12px_rgba(42,21,24,0.35)] backdrop-blur">
        <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 size-full">
          <defs>
            <path id="seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text className="fill-wine font-sans text-[10.5px] font-medium tracking-[0.2em]">
            <textPath href="#seal-path" textLength="272">
              {hero.sealText}
            </textPath>
          </text>
        </svg>
        <span className="font-serif text-3xl text-wine italic">{site.brand.initials}</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24">
      {/* brilho de fundo */}
      <div aria-hidden className="glow pointer-events-none absolute -top-48 -left-48 size-[640px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-wine/15 bg-white/50 px-4 py-2 text-sm font-medium text-wine" style={delay(0)}>
            <span className="size-1.5 rounded-full bg-gold" aria-hidden />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="animate-rise-soft text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]" style={delay(120)}>
            <RichText text={hero.title} />
          </h1>
          <p className="animate-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0" style={delay(260)}>
            {hero.subtitle}
          </p>
          <div className="animate-rise mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start" style={delay(400)}>
            <BookingButton label={hero.cta} size="lg" />
            <a href={hero.secondaryCta.href} className="rounded-full px-5 py-3 font-medium text-wine underline decoration-gold/60 underline-offset-8 transition hover:decoration-wine">
              {hero.secondaryCta.label}
            </a>
          </div>
          <p className="animate-rise mt-6 text-sm text-muted" style={delay(520)}>
            {hero.note}
          </p>
        </div>

        {/* Foto em arco + mancha orgânica + foto redonda + selo */}
        <div className="animate-rise relative mx-auto w-full max-w-[400px] lg:max-w-[440px]" style={delay(200)}>
          <div aria-hidden className="animate-blob absolute -inset-6 bg-rose sm:-inset-10" />
          <div aria-hidden className="absolute -inset-3 rounded-t-full border border-gold/50 sm:-inset-4" />
          <div className="relative overflow-hidden rounded-t-full rounded-b-[48px] bg-blush shadow-[0_40px_80px_-40px_rgba(91,30,45,0.6)]">
            <Img
              src={hero.image.src}
              alt={hero.image.alt}
              widths={HERO_IMAGE.widths}
              ratio={HERO_IMAGE.ratio}
              sizes={HERO_IMAGE.sizes}
              priority
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-4 z-10 size-32 overflow-hidden rounded-full border-[6px] border-cream shadow-xl sm:-left-10 sm:size-40">
            <Img src={hero.detailImage.src} alt={hero.detailImage.alt} widths={[200, 320]} ratio={1} sizes="160px" className="size-full object-cover" />
          </div>
          <RotatingSeal />
        </div>
      </div>
    </section>
  )
}
