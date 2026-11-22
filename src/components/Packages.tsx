import { useSite } from '../i18n/lang'
import BookingButton from './ui/BookingButton'
import { CheckIcon, SparkleIcon } from './ui/Icons'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

export default function Packages() {
  const { packages } = useSite().site
  return (
    <section id="pacotes" aria-labelledby="pacotes-title" className="px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl rounded-section bg-blush px-5 py-16 sm:px-10 lg:px-14 lg:py-24">
        <SectionHeading id="pacotes-title" eyebrow={packages.eyebrow} title={packages.title} subtitle={packages.subtitle} />

        <ul className="mt-14 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-3 lg:items-end">
          {packages.items.map((pkg, i) => {
            const featured = Boolean(pkg.featured)
            return (
              <li key={pkg.id} className="h-full">
                <Reveal delay={i * 120} className="h-full">
                  <article
                    className={`relative flex h-full flex-col px-6 pb-8 sm:px-7 transition-all duration-500 hover:-translate-y-2 ${
                      featured
                        ? 'rounded-t-[220px] rounded-b-[40px] bg-wine pt-20 text-on-wine shadow-[0_40px_70px_-35px_rgba(91,30,45,0.9)] lg:pb-10'
                        : 'rounded-[40px] bg-cream pt-9 shadow-[0_24px_50px_-36px_rgba(42,21,24,0.5)] hover:shadow-[0_34px_60px_-30px_rgba(42,21,24,0.45)]'
                    }`}
                  >
                    {pkg.badge && (
                      <span className="absolute top-7 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-sm font-medium whitespace-nowrap text-ink">
                        <SparkleIcon className="size-3.5" />
                        {pkg.badge}
                      </span>
                    )}
                    <h3 className={`text-3xl ${featured ? 'text-center text-on-wine' : 'text-ink'}`}>{pkg.name}</h3>
                    <p className={`mt-3 leading-relaxed ${featured ? 'text-center text-on-wine/85' : 'text-muted'}`}>{pkg.description}</p>

                    <ul className="mt-7 grid gap-3">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-snug">
                          <span className={`mt-px grid size-6 shrink-0 place-items-center rounded-full ${featured ? 'bg-on-wine/15 text-on-wine' : 'bg-rose text-wine'}`}>
                            <CheckIcon className="size-3.5" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-auto pt-8 ${featured ? 'border-on-wine/20' : 'border-wine/10'}`}>
                      <p className={`mb-4 border-t pt-6 text-center font-serif text-xl italic ${featured ? 'border-on-wine/20 text-on-wine' : 'border-wine/10 text-wine'}`}>
                        {packages.priceLabel}
                      </p>
                      <BookingButton label={packages.cta} packageId={pkg.id} variant={featured ? 'light' : 'wine'} size="sm" className="w-full" />
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>

        <Reveal>
          <p className="mt-10 text-center text-[15px] text-muted">{packages.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
