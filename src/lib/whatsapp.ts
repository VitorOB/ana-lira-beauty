import { site } from '../config/site'
import type { Lang, UiText } from '../config/ui'
import { cleanText, formatDate, type BookingForm } from './validation'

/**
 * Monta a mensagem já formatada que chega no WhatsApp da maquiadora, no idioma da página.
 * `intro` é o site.form.messageIntro do idioma atual; `labels` vem de ui.ts → message.
 */
export function buildBookingMessage(form: BookingForm, intro: string, labels: UiText['message'], lang: Lang): string {
  const parts = [
    `${labels.name}: ${cleanText(form.name)}`,
    `${labels.date}: ${formatDate(form.date, lang)}`,
    `${labels.city}: ${cleanText(form.city)}`,
    `${labels.attendance}: ${cleanText(form.attendance)}`,
    `${labels.package}: ${cleanText(form.packageName)}`,
  ]
  const notes = cleanText(form.notes)
  if (notes) parts.push(`${labels.notes}: ${notes}`)
  return `${intro} ${parts.join(' | ')}`
}

export function whatsappLink(message: string): string {
  const phone = site.contact.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(cleanText(message))}`
}
