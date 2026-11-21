import { site } from '../config/site'
import { SparkleIcon } from './ui/Icons'

/** Faixa vinho levemente inclinada com palavras passando. */
export default function Marquee() {
  const words = [...site.marquee, ...site.marquee]
  return (
    <div className="relative z-10 -my-4 overflow-hidden py-8" aria-label={site.marquee.join(', ')} role="img">
      <div className="relative left-1/2 w-[112vw] -translate-x-1/2 -rotate-2 bg-wine py-4 shadow-[0_20px_40px_-24px_rgba(91,30,45,0.8)] sm:py-5">
        <div className="animate-marquee flex w-max" aria-hidden>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {words.map((word, i) => (
                <li key={`${copy}-${i}`} className="flex items-center gap-6 pr-6 font-serif text-2xl whitespace-nowrap text-on-wine sm:text-3xl">
                  <span className={i % 2 ? 'italic' : ''}>{word}</span>
                  <SparkleIcon className="size-4 text-gold" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
