/**
 * Tipos do arquivo de configuração. Você não precisa editar este arquivo:
 * ele só garante que o site.ts esteja completo e sem erros de digitação.
 */

export interface ImageInfo {
  /** URL completa da imagem (Unsplash ou arquivo em /public, ex.: "/fotos/noiva.jpg"). */
  src: string
  /** Texto alternativo: descreva a foto para acessibilidade e SEO. */
  alt: string
}

export interface Stat {
  value: string
  label: string
}

export interface PortfolioItem extends ImageInfo {
  category: string
}

export interface PackageInfo {
  id: string
  name: string
  description: string
  includes: string[]
  featured?: boolean
  badge?: string
}

export interface Step {
  title: string
  text: string
}

export interface Testimonial {
  name: string
  city: string
  text: string
  photo: ImageInfo
  detail?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface SiteConfig {
  brand: { name: string; professional: string; initials: string }
  contact: { whatsapp: string; whatsappDisplay: string; instagram: string; instagramUrl: string }
  location: { city: string; state: string; region: string }
  seo: { siteUrl: string; title: string; description: string; ogImage: string; keywords: string[] }
  nav: { label: string; href: string }[]
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    cta: string
    secondaryCta: { label: string; href: string }
    note: string
    image: ImageInfo
    detailImage: ImageInfo
    sealText: string
  }
  marquee: string[]
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    stats: Stat[]
    styleTags: string[]
    image: ImageInfo
    cta: string
  }
  portfolio: {
    eyebrow: string
    title: string
    subtitle: string
    allLabel: string
    categories: string[]
    items: PortfolioItem[]
    cta: string
  }
  packages: {
    eyebrow: string
    title: string
    subtitle: string
    priceLabel: string
    cta: string
    note: string
    items: PackageInfo[]
  }
  steps: { eyebrow: string; title: string; items: Step[]; cta: string }
  testimonials: { eyebrow: string; title: string; items: Testimonial[]; cta: string }
  faq: { eyebrow: string; title: string; items: FaqItem[]; cta: string }
  finalCta: { eyebrow: string; title: string; text: string; cta: string }
  footer: {
    description: string
    credit: { label: string; handle: string; url: string }
  }
  form: {
    title: string
    subtitle: string
    attendanceTypes: string[]
    noPackageLabel: string
    messageIntro: string
    submitLabel: string
    successTitle: string
    successText: string
  }
  floatingButtonLabel: string
}
