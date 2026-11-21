/**
 * Gera URLs responsivas. Para fotos do Unsplash adiciona largura, recorte e formato
 * automático (WebP/AVIF). Para fotos próprias (ex.: "/fotos/noiva.jpg") usa a URL como está.
 */

const isUnsplash = (src: string) => src.includes('images.unsplash.com')

/** ratio = largura / altura (ex.: 4/5 para retrato). */
export function imageUrl(src: string, width: number, ratio?: number): string {
  if (!isUnsplash(src)) return src
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(width), q: '70' })
  if (ratio) params.set('h', String(Math.round(width / ratio)))
  return `${src}${src.includes('?') ? '&' : '?'}${params}`
}

export function imageSrcSet(src: string, widths: number[], ratio?: number): string | undefined {
  if (!isUnsplash(src)) return undefined
  return widths.map((w) => `${imageUrl(src, w, ratio)} ${w}w`).join(', ')
}

/** Configuração da foto principal: usada no componente e no preload do index.html. */
export const HERO_IMAGE = {
  widths: [400, 600, 800, 1000],
  ratio: 4 / 5,
  sizes: '(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 80vw',
}
