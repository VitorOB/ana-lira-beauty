/**
 * Regras do formulário de disponibilidade.
 * Nome e cidade: só letras (com acento), espaço, apóstrofo e hífen.
 */
import type { Lang, UiText } from '../config/ui'

type ErrorMessages = UiText['errors']

export const NAME_MAX = 60
export const CITY_MAX = 60
export const NOTES_MAX = 500

/** Tudo que NÃO for letra (inclui acentos), espaço, apóstrofo ou hífen. */
const BLOCKED_CHARS = /[^\p{L}\p{M} '’-]/gu
const LETTER = /\p{L}/gu

/**
 * Limpa o texto enquanto a pessoa digita: remove números/símbolos,
 * impede espaço no início e espaços duplicados, e respeita o limite.
 */
export function sanitizePersonText(value: string, max: number): string {
  return value
    .replace(/\s/g, ' ') // tabs/quebras viram espaço
    .replace(BLOCKED_CHARS, '')
    .replace(/^ +/, '')
    .replace(/ {2,}/g, ' ')
    .slice(0, max)
}

/** Versão final para enviar: sem espaços nas pontas nem duplicados. */
export const cleanText = (value: string) => value.replace(/\s+/g, ' ').trim()

const countLetters = (value: string) => value.match(LETTER)?.length ?? 0

/** Data de hoje no fuso da visitante, no formato do input (AAAA-MM-DD). */
export function todayISO(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/**
 * Data para a mensagem do WhatsApp.
 * Português: AAAA-MM-DD → DD/MM/AAAA. Inglês: por extenso ("June 12, 2027"),
 * para não haver confusão entre dia/mês e mês/dia.
 */
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split('-')
  if (lang === 'pt') return `${d}/${m}/${y}`
  return new Date(Date.UTC(+y, +m - 1, +d)).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })
}

export interface BookingForm {
  name: string
  date: string
  city: string
  attendance: string
  packageName: string
  notes: string
}

export type BookingErrors = Partial<Record<keyof BookingForm, string>>

/** `msg` são as mensagens de erro do idioma atual (ui.ts → errors). */
export function validateField(field: keyof BookingForm, raw: string, msg: ErrorMessages): string | undefined {
  const value = cleanText(raw)
  switch (field) {
    case 'name':
      if (!value) return msg.nameRequired
      if (value !== sanitizePersonText(value, NAME_MAX)) return msg.invalidChars
      if (countLetters(value) < 3) return msg.nameShort
      if (value.length > NAME_MAX) return msg.tooLong(NAME_MAX)
      return
    case 'date':
      if (!value) return msg.dateRequired
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) return msg.dateInvalid
      if (value < todayISO()) return msg.datePast
      return
    case 'city':
      if (!value) return msg.cityRequired
      if (value !== sanitizePersonText(value, CITY_MAX)) return msg.invalidChars
      if (countLetters(value) < 2) return msg.cityShort
      return
    case 'attendance':
      if (!value) return msg.attendanceRequired
      return
    case 'packageName':
      if (!value) return msg.packageRequired
      return
    case 'notes':
      if (value.length > NOTES_MAX) return msg.tooLong(NOTES_MAX)
      return
  }
}

export function validateForm(form: BookingForm, msg: ErrorMessages): BookingErrors {
  const errors: BookingErrors = {}
  for (const field of Object.keys(form) as (keyof BookingForm)[]) {
    const error = validateField(field, form[field], msg)
    if (error) errors[field] = error
  }
  return errors
}
