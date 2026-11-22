import { constants, site, type Site } from './site'

/* ============================================================================
 *  VERSÃO EM INGLÊS — mesmo formato do site.ts.
 *  Contato, fotos e números vêm da versão em português; aqui só muda o texto.
 *  Ao mudar um texto no site.ts, mude também aqui.
 * ========================================================================== */

const { BRAND, PROFESSIONAL, CITY, NEXT_SEASON } = constants
const REGION = `${CITY} and surrounding area`
/** Mesma foto da versão em português (só a descrição muda). */
const photo = (i: number) => site.portfolio.items[i].src

export const siteEn: Site = {
  ...site,

  location: { ...site.location, region: REGION },

  seo: {
    ...site.seo,
    title: `Bridal Makeup Artist in ${CITY} | ${BRAND}`,
    description: `Makeup and hair for brides, bridesmaids and debutantes in ${REGION}. Natural, long-lasting skin, trial included and on-site service. Check your date on WhatsApp.`,
    keywords: [
      `bridal makeup artist ${CITY}`,
      `wedding makeup ${CITY}`,
      'bridal hair',
      'bridal day',
      'bridesmaid makeup',
      'debutante makeup',
    ],
  },

  nav: [
    { label: 'About', href: '#sobre' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Packages', href: '#pacotes' },
    { label: 'How it works', href: '#como-funciona' },
    { label: 'Testimonials', href: '#depoimentos' },
    { label: 'FAQ', href: '#duvidas' },
  ],

  /* ------------------------------------------------------------------ HERO */
  hero: {
    ...site.hero,
    eyebrow: `Bridal makeup artist · ${REGION}`,
    title: 'Bridal makeup that lasts *from “I do” to the last dance*',
    subtitle: `Glowing, natural, tear-proof skin for brides in ${REGION}. On-site service wherever you get ready, with a trial before the big day.`,
    cta: 'Check availability for my date',
    secondaryCta: { label: 'See portfolio', href: '#portfolio' },
    note: `Reply within 24h · ${NEXT_SEASON} bookings open`,
    image: { ...site.hero.image, alt: 'Bride smiling under her veil at sunset, embraced by the groom' },
    detailImage: { ...site.hero.detailImage, alt: 'Close-up of eye makeup being applied with a brush' },
    sealText: `BRIDAL MAKEUP ✦ ${BRAND.toUpperCase()} ✦ `,
  },

  marquee: [
    'Glowing skin',
    'Long-lasting',
    'Tear-proof',
    'On-site getting ready',
    'Trial included',
    'Brides',
    'Bridesmaids',
    'Debutantes',
  ],

  /* ----------------------------------------------------------------- SOBRE */
  about: {
    ...site.about,
    eyebrow: `Nice to meet you, I'm ${PROFESSIONAL}`,
    title: 'I enhance your beauty *without hiding who you are*',
    paragraphs: [
      `For almost a decade I've been by the side of brides in ${REGION} on the most anticipated day of their lives. My job is to make you look in the mirror and recognize yourself — just in your most radiant version.`,
      'I work with light, luminous skin, a finish that looks beautiful in photos and long-wear products tested against heat, hugs and lots of emotion. I arrive early and calm, and turn getting ready into a lovely, unhurried moment.',
    ],
    stats: [
      { value: '+350', label: 'brides' },
      { value: '9 years', label: 'of experience' },
      { value: '5.0', label: 'rating' },
    ],
    styleTags: ['Natural glow skin', 'Tailored statement eyes', 'Long-lasting wear', 'Punctual, calm service'],
    image: { ...site.about.image, alt: `${PROFESSIONAL}, bridal makeup artist, smiling in a white shirt` },
    cta: 'I want you on my big day',
  },

  /* ------------------------------------------------------------- PORTFÓLIO */
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Real beauty, *each in her own way*',
    subtitle: 'A selection of brides, bridesmaids and debutantes. Tap a photo to see it larger.',
    allLabel: 'All',
    categories: ['Brides', 'Bridesmaids', 'Debutantes'],
    items: [
      { category: 'Brides', src: photo(0), alt: 'Bride with a long veil on the beach beside the groom' },
      { category: 'Bridesmaids', src: photo(1), alt: 'Bridesmaid with a high bun and natural makeup' },
      { category: 'Brides', src: photo(2), alt: 'Close-up of makeup with glowing skin and red lipstick' },
      { category: 'Debutantes', src: photo(3), alt: 'Debutante with a bun and light makeup showing her freckles' },
      { category: 'Brides', src: photo(4), alt: 'Bride and groom kissing at sunset, the veil blowing in the wind' },
      { category: 'Bridesmaids', src: photo(5), alt: 'Red-haired bridesmaid with striking eye makeup' },
      { category: 'Debutantes', src: photo(6), alt: 'Blonde debutante with soft makeup' },
      { category: 'Brides', src: photo(7), alt: 'Bride holding a bouquet of peach roses' },
      { category: 'Bridesmaids', src: photo(8), alt: 'Bride, groom and bridesmaids celebrating as they leave the ceremony' },
      { category: 'Debutantes', src: photo(9), alt: 'Debutante with platinum hair and glowing makeup' },
      { category: 'Brides', src: photo(10), alt: 'Lace wedding dress laid out for getting ready' },
      { category: 'Bridesmaids', src: photo(11), alt: 'Bridesmaid with loose hair and smoky makeup' },
    ],
    cta: 'I want makeup like this',
  },

  /* --------------------------------------------------------------- PACOTES */
  packages: {
    eyebrow: 'Packages',
    title: 'The right care *for your day*',
    subtitle: 'Every bride is unique, so pricing is tailored to the date, location and number of people.',
    priceLabel: 'Pricing on request',
    cta: 'Check availability',
    note: `Service in ${CITY} with no travel fee. Other cities on request.`,
    items: [
      {
        id: 'noiva-essencial',
        name: 'Essential Bride',
        description: 'For the bride who wants flawless beauty, made easy.',
        includes: [
          'Bridal makeup with long-wear products',
          'False lashes included',
          'On-site service wherever you get ready',
          'Touch-up kit to keep in your bag',
        ],
      },
      {
        id: 'noiva-completa',
        name: 'Complete Bride',
        description: 'Makeup and hair designed together, with a trial first.',
        featured: true,
        badge: 'Most popular',
        includes: [
          'Makeup and hair trial',
          'Makeup + hair on the big day',
          'On-site service wherever you get ready',
          'Tear-proof setting',
          'Personalized touch-up kit',
        ],
      },
      {
        id: 'dia-da-noiva',
        name: 'Bridal Day',
        description: 'A whole morning of care for you and the people you love.',
        includes: [
          'Makeup and hair trial',
          'Bridal makeup + hair',
          'Makeup for up to 4 bridesmaids or mothers',
          'Stays for touch-ups until the ceremony',
          'On-site service wherever you get ready',
        ],
      },
    ],
  },

  /* --------------------------------------------------------- COMO FUNCIONA */
  steps: {
    eyebrow: 'How it works',
    title: 'From the first hello *to the big day*',
    items: [
      { title: 'Date check', text: 'Send me your date and city through the form and I confirm availability on WhatsApp.' },
      { title: 'Makeup trial', text: 'Together we test the ideal look for your style, dress and ceremony time.' },
      { title: 'Deposit to book', text: 'Once the contract is signed and the deposit paid, your date is reserved just for you.' },
      { title: 'The big day', text: 'I arrive where you are getting ready at the agreed time. All you have to do is enjoy it.' },
    ],
    cta: 'Start by checking your date',
  },

  /* ----------------------------------------------------------- DEPOIMENTOS */
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'Words from those who *said yes*',
    items: [
      {
        ...site.testimonials.items[0],
        detail: 'Married in March',
        text: 'I cried through the entire ceremony and my makeup stayed perfect until the end of the party. In the photos it looked like I had just finished getting ready!',
        photo: { ...site.testimonials.items[0].photo, alt: 'Photo of Mariana Costa' },
      },
      {
        ...site.testimonials.items[1],
        detail: 'Married in January',
        text: 'Beach wedding, 32 °C heat, and nothing melted. Ana brought a calm to getting ready that I didn’t even know I needed.',
        photo: { ...site.testimonials.items[1].photo, alt: 'Photo of Juliana Ribeiro' },
      },
      {
        ...site.testimonials.items[2],
        detail: 'Bridal Day',
        text: 'I booked the Bridal Day with my mom and my bridesmaids. Everyone looked beautiful, each in her own way, and everything ran on time. I can’t recommend her enough.',
        photo: { ...site.testimonials.items[2].photo, alt: 'Photo of Camila Andrade' },
      },
      {
        ...site.testimonials.items[3],
        detail: 'Married in October',
        text: 'I was afraid of looking “overdone”. She understood exactly what I wanted: I felt like myself, just more beautiful.',
        photo: { ...site.testimonials.items[3].photo, alt: 'Photo of Beatriz Martins' },
      },
    ],
    cta: 'I want to live this too',
  },

  /* ------------------------------------------------------------ PERGUNTAS */
  faq: {
    eyebrow: 'Questions',
    title: 'Frequently asked *questions*',
    items: [
      {
        question: 'How far in advance should I book?',
        answer: 'Ideally 8 to 12 months ahead, especially for dates between September and December, which sell out first. Even so, it’s worth asking about dates coming up soon.',
      },
      {
        question: 'Do you travel outside the city?',
        answer: `Yes! I serve ${REGION} as well as other cities and destinations. For events outside ${CITY}, a travel fee applies and is included in the quote.`,
      },
      {
        question: 'How does booking a date work?',
        answer: 'After confirming availability, we send the contract. The date is reserved once it’s signed and the deposit is paid; the balance is due by the wedding day.',
      },
      {
        question: 'Is the trial included?',
        answer: 'The trial is included in the Complete Bride and Bridal Day packages. It can be added separately to the Essential Bride package.',
      },
      {
        question: 'How long does the makeup last?',
        answer: 'We use skin prep and professional setting so it lasts 12 to 14 hours, standing up to tears, heat and hugs. You also take home a lip touch-up kit.',
      },
    ],
    cta: 'I have another question',
  },

  /* -------------------------------------------------------- CHAMADA FINAL */
  finalCta: {
    eyebrow: `${NEXT_SEASON} season`,
    title: 'Wedding season dates *book up fast*',
    text: 'Secure yours before another bride books it first. Checking is quick, free and with no commitment.',
    cta: 'Check availability for my date',
  },

  /* --------------------------------------------------------------- RODAPÉ */
  footer: {
    description: `Makeup and hair for brides, bridesmaids and debutantes in ${REGION}.`,
    credit: { ...site.footer.credit, label: 'Website by' },
  },

  /* ----------------------------------------------- FORMULÁRIO / WHATSAPP */
  form: {
    title: 'Check availability',
    subtitle: 'Takes less than a minute. When you send it, the conversation continues on WhatsApp.',
    attendanceTypes: ['Bride', 'Bride + bridesmaids', 'Debutante', 'Other'],
    noPackageLabel: 'I haven’t decided yet',
    messageIntro: 'Hi! I found your website and would like to check availability.',
    submitLabel: 'Send via WhatsApp',
    successTitle: 'All set!',
    successText: 'We opened WhatsApp with your message ready. Just tap send.',
  },

  floatingButtonLabel: 'Check availability on WhatsApp',
}
