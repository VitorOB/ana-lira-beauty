import About from './components/About'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Marquee from './components/Marquee'
import Packages from './components/Packages'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import WhatsAppFloat from './components/WhatsAppFloat'
import { BookingProvider } from './context/BookingContext'
import { useSite } from './i18n/lang'

export default function App() {
  const { t } = useSite()
  return (
    <BookingProvider>
      <a
        href="#conteudo"
        className="sr-only z-[80] rounded-full bg-wine px-5 py-3 text-on-wine focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {t.skipLink}
      </a>
      <Header />
      <main id="conteudo" className="overflow-x-clip">
        <Hero />
        <Marquee />
        <About />
        <Portfolio />
        <Packages />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </BookingProvider>
  )
}
