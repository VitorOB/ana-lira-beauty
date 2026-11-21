import type { ImgHTMLAttributes } from 'react'
import { imageSrcSet, imageUrl } from '../../lib/image'

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string
  alt: string
  /** Larguras geradas no srcset. */
  widths?: number[]
  /** largura / altura (ex.: 4/5). */
  ratio?: number
  /** true = foto principal (carrega primeiro, sem lazy). */
  priority?: boolean
}

/** Imagem responsiva com lazy loading e dimensões definidas (evita "pulos" no layout). */
export default function Img({ src, alt, widths = [320, 480, 640, 800], ratio, priority, sizes = '100vw', ...rest }: ImgProps) {
  const base = widths[Math.min(1, widths.length - 1)]
  return (
    <img
      src={imageUrl(src, base, ratio)}
      srcSet={imageSrcSet(src, widths, ratio)}
      sizes={sizes}
      alt={alt}
      width={base}
      height={ratio ? Math.round(base / ratio) : undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  )
}
