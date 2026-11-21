import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import BookingModal from '../components/BookingModal'

interface BookingContextValue {
  /** Abre o formulário. Passe o id do pacote para já deixá-lo selecionado. */
  openBooking: (packageId?: string) => void
  isOpen: boolean
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; packageId?: string; key: number }>({ open: false, key: 0 })

  const openBooking = useCallback((packageId?: string) => {
    setState((s) => ({ open: true, packageId, key: s.key + 1 }))
  }, [])
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  const value = useMemo(() => ({ openBooking, isOpen: state.open }), [openBooking, state.open])

  return (
    <BookingContext.Provider value={value}>
      {children}
      {state.open && <BookingModal key={state.key} initialPackageId={state.packageId} onClose={close} />}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking precisa estar dentro de <BookingProvider>')
  return ctx
}
