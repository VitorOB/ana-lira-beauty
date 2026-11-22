import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site } from './src/config/site.ts'
import { HERO_IMAGE, imageSrcSet, imageUrl } from './src/lib/image.ts'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Gera as tags de SEO no HTML estático a partir do src/config/site.ts.
 * Assim a prévia do link no WhatsApp/Instagram/Google funciona sem depender de JavaScript.
 */
function seoFromConfig(): Plugin {
  const { seo, brand, location, contact } = site
  const url = `${seo.siteUrl}/`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['BeautySalon', 'LocalBusiness'],
    name: brand.name,
    description: seo.description,
    url,
    image: seo.ogImage,
    telephone: `+${contact.whatsapp}`,
    founder: { '@type': 'Person', name: brand.professional },
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: 'BR',
    },
    areaServed: location.region,
    ...(contact.instagramUrl ? { sameAs: [contact.instagramUrl] } : {}),
    priceRange: '$$',
    makesOffer: site.packages.items.map((p) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: p.name, description: p.description },
    })),
  }

  const favicon = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#5B1E2D"/><text x="32" y="42" font-family="Georgia,serif" font-style="italic" font-size="28" fill="#F8EDE6" text-anchor="middle">${brand.initials}</text></svg>`,
  )}`

  const heroPreload = () => {
    const { src } = site.hero.image
    const srcset = imageSrcSet(src, HERO_IMAGE.widths, HERO_IMAGE.ratio)
    return srcset
      ? `<link rel="preload" as="image" imagesrcset="${esc(srcset)}" imagesizes="${esc(HERO_IMAGE.sizes)}" fetchpriority="high" />`
      : `<link rel="preload" as="image" href="${esc(imageUrl(src, 800))}" fetchpriority="high" />`
  }

  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="keywords" content="${esc(seo.keywords.join(', '))}" />`,
    `<meta name="author" content="${esc(brand.name)}" />`,
    // Versões por idioma (o inglês é a mesma página com ?lang=en).
    `<link rel="alternate" hreflang="pt-BR" href="${esc(url)}" />`,
    `<link rel="alternate" hreflang="en" href="${esc(url)}?lang=en" />`,
    `<link rel="alternate" hreflang="x-default" href="${esc(url)}" />`,
    `<link rel="icon" href="${favicon}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:locale:alternate" content="en_US" />`,
    `<meta property="og:site_name" content="${esc(brand.name)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(seo.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(site.hero.image.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(seo.ogImage)}" />`,
    heroPreload(),
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')

  return {
    name: 'seo-from-config',
    transformIndexHtml: (html) => html.replace('<!-- SEO -->', tags),
    // robots.txt e sitemap.xml gerados no build com o domínio do site.ts
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${seo.siteUrl}/sitemap.xml\n` })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod><priority>1.0</priority></url>\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFromConfig()],
})
