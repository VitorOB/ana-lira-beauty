import { useId, useState } from 'react'
import { site } from '../config/site'
import BookingButton from './ui/BookingButton'
import { PlusIcon } from './ui/Icons'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const { faq } = site

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="duvidas-title" eyebrow={faq.eyebrow} title={faq.title} />

        <ul className="mt-12 grid gap-4">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            const btnId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`
            return (
              <li key={item.question}>
                <Reveal delay={i * 70}>
                  <div
                    className={`border transition-all duration-500 ${
                      isOpen ? 'rounded-[36px] border-rose bg-blush' : 'rounded-[36px] border-wine/12 bg-white/50 hover:border-rose hover:bg-blush/60 sm:rounded-full'
                    }`}
                  >
                    <h3 className="font-sans text-base">
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 py-4 pr-4 pl-7 text-left text-[17px] font-medium text-ink"
                      >
                        {item.question}
                        <span
                          className={`grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${isOpen ? 'rotate-45 bg-wine text-on-wine' : 'bg-rose text-wine'}`}
                        >
                          <PlusIcon className="size-5" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden" inert={!isOpen}>
                        <p className="px-7 pb-6 leading-relaxed text-muted">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <BookingButton label={faq.cta} variant="outline" />
        </Reveal>
      </div>
    </section>
  )
}
