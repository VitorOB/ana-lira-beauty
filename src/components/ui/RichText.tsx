import { Fragment } from 'react'

/** Transforma "texto *destaque*" em texto com <em>destaque</em> (itálico vinho). */
export default function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  )
}
