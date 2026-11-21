/**
 * Regras do formulário de disponibilidade.
 * Nome e cidade: só letras (com acento), espaço, apóstrofo e hífen.
 */

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

/** AAAA-MM-DD → DD/MM/AAAA */
export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
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

export function validateField(field: keyof BookingForm, raw: string): string | undefined {
  const value = cleanText(raw)
  switch (field) {
    case 'name':
      if (!value) return 'Informe seu nome.'
      if (value !== sanitizePersonText(value, NAME_MAX)) return 'Use apenas letras, espaço, apóstrofo ou hífen.'
      if (countLetters(value) < 3) return 'O nome precisa ter pelo menos 3 letras.'
      if (value.length > NAME_MAX) return `Use no máximo ${NAME_MAX} caracteres.`
      return
    case 'date':
      if (!value) return 'Escolha a data do casamento.'
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) return 'Informe uma data válida.'
      if (value < todayISO()) return 'A data não pode ser anterior a hoje.'
      return
    case 'city':
      if (!value) return 'Informe a cidade do evento.'
      if (value !== sanitizePersonText(value, CITY_MAX)) return 'Use apenas letras, espaço, apóstrofo ou hífen.'
      if (countLetters(value) < 2) return 'A cidade precisa ter pelo menos 2 letras.'
      return
    case 'attendance':
      if (!value) return 'Selecione o tipo de atendimento.'
      return
    case 'packageName':
      if (!value) return 'Selecione um pacote (ou "ainda não decidi").'
      return
    case 'notes':
      if (value.length > NOTES_MAX) return `Use no máximo ${NOTES_MAX} caracteres.`
      return
  }
}

export function validateForm(form: BookingForm): BookingErrors {
  const errors: BookingErrors = {}
  for (const field of Object.keys(form) as (keyof BookingForm)[]) {
    const error = validateField(field, form[field])
    if (error) errors[field] = error
  }
  return errors
}
