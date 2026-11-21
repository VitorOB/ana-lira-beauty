import Reveal from './Reveal'
import RichText from './RichText'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  id?: string
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', id }: SectionHeadingProps) {
  const center = align === 'center'
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <p className={`mb-4 inline-flex items-center gap-3 text-sm font-medium tracking-[0.18em] text-wine uppercase ${center ? 'justify-center' : ''}`}>
        <span aria-hidden className="h-px w-8 bg-gold" />
        {eyebrow}
        {center && <span aria-hidden className="h-px w-8 bg-gold" />}
      </p>
      <h2 id={id} className="text-4xl leading-[1.08] sm:text-5xl">
        <RichText text={title} />
      </h2>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </Reveal>
  )
}
