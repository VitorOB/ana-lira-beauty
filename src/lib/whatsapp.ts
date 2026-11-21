import { site } from '../config/site'
import { cleanText, formatDateBR, type BookingForm } from './validation'

/** Monta a mensagem já formatada que chega no WhatsApp da maquiadora. */
export function buildBookingMessage(form: BookingForm): string {
  const parts = [
    `Nome: ${cleanText(form.name)}`,
    `Data do casamento: ${formatDateBR(form.date)}`,
    `Cidade: ${cleanText(form.city)}`,
    `Atendimento: ${cleanText(form.attendance)}`,
    `Pacote: ${cleanText(form.packageName)}`,
  ]
  const notes = cleanText(form.notes)
  if (notes) parts.push(`Observações: ${notes}`)
  return `${site.form.messageIntro} ${parts.join(' | ')}`
}

export function whatsappLink(message: string): string {
  const phone = site.contact.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(cleanText(message))}`
}
