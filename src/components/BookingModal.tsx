import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { site } from '../config/site'
import { useModalBehavior } from '../hooks/useModalBehavior'
import {
  CITY_MAX,
  NAME_MAX,
  NOTES_MAX,
  sanitizePersonText,
  todayISO,
  validateField,
  validateForm,
  type BookingErrors,
  type BookingForm,
} from '../lib/validation'
import { buildBookingMessage, whatsappLink } from '../lib/whatsapp'
import { CheckIcon, CloseIcon, WhatsAppIcon } from './ui/Icons'

interface BookingModalProps {
  initialPackageId?: string
  onClose: () => void
}

const { form: copy, packages } = site
const FIELD_ORDER: (keyof BookingForm)[] = ['name', 'date', 'city', 'attendance', 'packageName', 'notes']

const inputBase =
  'w-full rounded-[22px] border bg-white px-5 py-3.5 text-base text-ink placeholder:text-muted/60 transition-colors outline-none focus:ring-4'
const inputState = (hasError: boolean) =>
  hasError ? 'border-error ring-error/15 focus:border-error' : 'border-wine/15 ring-rose/60 focus:border-wine/50'

export default function BookingModal({ initialPackageId, onClose }: BookingModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  useModalBehavior(dialogRef, onClose)
  const uid = useId()
  const fid = (name: string) => `${uid}-${name}`

  const initialPackage = packages.items.find((p) => p.id === initialPackageId)?.name ?? ''
  const [values, setValues] = useState<BookingForm>({
    name: '',
    date: '',
    city: '',
    attendance: '',
    packageName: initialPackage,
    notes: '',
  })
  const [errors, setErrors] = useState<BookingErrors>({})
  const [sentLink, setSentLink] = useState<string | null>(null)
  const minDate = todayISO()

  /** Atualiza o valor e limpa (ou atualiza) o erro assim que a pessoa corrige. */
  const update = (field: keyof BookingForm, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validateField(field, value) }))
  }

  /** Nome e cidade: bloqueia números e símbolos já na digitação, mantendo o cursor no lugar. */
  const onPersonText = (field: 'name' | 'city', max: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const raw = input.value
    const caret = input.selectionStart ?? raw.length
    const clean = sanitizePersonText(raw, max)
    if (clean !== raw) {
      // Corrige o campo na hora (antes do React) para o cursor não pular para o fim
      const removedBeforeCaret = raw.slice(0, caret).length - sanitizePersonText(raw.slice(0, caret), max).length
      const newCaret = Math.min(clean.length, Math.max(0, caret - removedBeforeCaret))
      input.value = clean
      input.setSelectionRange(newCaret, newCaret)
    }
    update(field, clean)
  }

  const onBlur = (field: keyof BookingForm) => () => {
    // Só valida ao sair do campo se a pessoa já escreveu algo
    if (values[field]) setErrors((e) => ({ ...e, [field]: validateField(field, values[field]) }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateForm(values)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((f) => found[f])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus()
      return
    }
    const link = whatsappLink(buildBookingMessage(values))
    // (não usar "noopener" aqui: com ele o navegador sempre retorna null e não dá para saber se abriu)
    const win = window.open(link, '_blank')
    if (win) win.opener = null
    else window.location.href = link // pop-up bloqueado: abre na mesma aba
    setSentLink(link)
  }

  const errorProps = (field: keyof BookingForm) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? fid(`${field}-error`) : undefined,
  })

  return (
    <div className="animate-fade-in fixed inset-0 z-[70] flex items-end justify-center bg-ink/45 backdrop-blur-md sm:items-center sm:p-6" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={fid('title')}
        aria-describedby={fid('desc')}
        onMouseDown={(e) => e.stopPropagation()}
        className="animate-slide-up relative max-h-[94dvh] w-full max-w-xl overflow-y-auto rounded-t-[40px] bg-cream shadow-[0_40px_90px_-30px_rgba(42,21,24,0.6)] sm:rounded-[40px]"
      >
        <div aria-hidden className="glow pointer-events-none absolute -top-24 -right-20 size-72" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 grid size-11 place-items-center rounded-full bg-blush text-wine transition hover:bg-rose"
          aria-label="Fechar formulário"
        >
          <CloseIcon className="size-5" />
        </button>

        {sentLink ? (
          <div className="relative px-7 py-14 text-center sm:px-12" aria-live="polite">
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-whats text-white">
              <CheckIcon className="size-10" />
            </span>
            <h2 id={fid('title')} className="mt-6 text-4xl">
              {copy.successTitle}
            </h2>
            <p id={fid('desc')} className="mx-auto mt-3 max-w-sm leading-relaxed text-muted">
              {copy.successText}
            </p>
            <a
              href={sentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-whats px-7 py-4 font-medium text-white transition hover:bg-whats-dark"
            >
              <WhatsAppIcon className="size-5" />
              Abrir o WhatsApp novamente
            </a>
            <button type="button" onClick={onClose} className="mt-4 block w-full text-[15px] font-medium text-wine underline underline-offset-4">
              Voltar ao site
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate className="relative px-6 pt-9 pb-8 sm:px-10 sm:pt-11 sm:pb-10">
            <h2 id={fid('title')} className="pr-12 text-[2.1rem] leading-tight sm:text-4xl">
              {copy.title}
            </h2>
            <p id={fid('desc')} className="mt-2 text-muted">
              {copy.subtitle}
            </p>

            <div className="mt-7 grid gap-5">
              <Field id={fid('name')} label="Nome" required error={errors.name}>
                <input
                  id={fid('name')}
                  data-field="name"
                  data-autofocus
                  type="text"
                  name="name"
                  autoComplete="name"
                  autoCapitalize="words"
                  maxLength={NAME_MAX}
                  placeholder="Seu nome completo"
                  value={values.name}
                  onChange={onPersonText('name', NAME_MAX)}
                  onBlur={onBlur('name')}
                  className={`${inputBase} ${inputState(Boolean(errors.name))}`}
                  {...errorProps('name')}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={fid('date')} label="Data do casamento" required error={errors.date}>
                  <input
                    id={fid('date')}
                    data-field="date"
                    type="date"
                    name="date"
                    min={minDate}
                    value={values.date}
                    onChange={(e) => update('date', e.target.value)}
                    onBlur={onBlur('date')}
                    className={`${inputBase} ${inputState(Boolean(errors.date))} min-h-[54px]`}
                    {...errorProps('date')}
                  />
                </Field>

                <Field id={fid('city')} label="Cidade do evento" required error={errors.city}>
                  <input
                    id={fid('city')}
                    data-field="city"
                    type="text"
                    name="city"
                    autoComplete="address-level2"
                    autoCapitalize="words"
                    maxLength={CITY_MAX}
                    placeholder={`Ex.: ${site.location.city}`}
                    value={values.city}
                    onChange={onPersonText('city', CITY_MAX)}
                    onBlur={onBlur('city')}
                    className={`${inputBase} ${inputState(Boolean(errors.city))}`}
                    {...errorProps('city')}
                  />
                </Field>
              </div>

              <fieldset {...errorProps('attendance')}>
                <legend className="mb-2 text-[15px] font-medium text-ink">
                  Tipo de atendimento <span className="text-wine">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {copy.attendanceTypes.map((type, i) => {
                    const checked = values.attendance === type
                    return (
                      <label
                        key={type}
                        className={`cursor-pointer rounded-full border px-4 py-2.5 text-[15px] transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-rose ${
                          checked
                            ? 'border-wine bg-wine text-on-wine'
                            : errors.attendance
                              ? 'border-error bg-white text-ink'
                              : 'border-wine/15 bg-white text-ink hover:border-wine/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={type}
                          checked={checked}
                          data-field={i === 0 ? 'attendance' : undefined}
                          onChange={() => update('attendance', type)}
                          className="sr-only"
                        />
                        {type}
                      </label>
                    )
                  })}
                </div>
                <ErrorMessage id={fid('attendance-error')} message={errors.attendance} />
              </fieldset>

              <Field id={fid('package')} label="Pacote de interesse" required error={errors.packageName} errorId={fid('packageName-error')}>
                <select
                  id={fid('package')}
                  data-field="packageName"
                  name="package"
                  value={values.packageName}
                  onChange={(e) => update('packageName', e.target.value)}
                  className={`${inputBase} ${inputState(Boolean(errors.packageName))} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%235B1E2D'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:20px] bg-[right_18px_center] bg-no-repeat pr-12`}
                  {...errorProps('packageName')}
                >
                  <option value="" disabled>
                    Selecione um pacote
                  </option>
                  {packages.items.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value={copy.noPackageLabel}>{copy.noPackageLabel}</option>
                </select>
              </Field>

              <Field id={fid('notes')} label="Observações" optional error={errors.notes}>
                <textarea
                  id={fid('notes')}
                  data-field="notes"
                  name="notes"
                  rows={3}
                  maxLength={NOTES_MAX}
                  placeholder="Horário da cerimônia, número de madrinhas, local do making of..."
                  value={values.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  className={`${inputBase} ${inputState(Boolean(errors.notes))} resize-none`}
                  {...errorProps('notes')}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-whats px-7 py-4 text-base font-medium text-white shadow-[0_16px_30px_-14px_rgba(30,138,82,0.8)] transition hover:-translate-y-0.5 hover:bg-whats-dark"
            >
              <WhatsAppIcon className="size-5" />
              {copy.submitLabel}
            </button>
            <p className="mt-4 text-center text-sm text-muted">Seus dados são usados apenas para responder à sua consulta.</p>
          </form>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- auxiliares */

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 pl-2 text-sm font-medium text-error">
      {message}
    </p>
  )
}

interface FieldProps {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  error?: string
  errorId?: string
  children: ReactNode
}

function Field({ id, label, required, optional, error, errorId, children }: FieldProps) {
  // o id do erro segue o padrão "<id-do-formulário>-<campo>-error"
  const resolvedErrorId = errorId ?? `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium text-ink">
        {label} {required && <span className="text-wine">*</span>}
        {optional && <span className="font-normal text-muted">(opcional)</span>}
      </label>
      {children}
      <ErrorMessage id={resolvedErrorId} message={error} />
    </div>
  )
}
