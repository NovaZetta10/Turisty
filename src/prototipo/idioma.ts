import { createContext, useContext } from 'react'

// Idioma de la demo. En las pantallas: const t = useT(); t({ es: 'Reservar', en: 'Book' })
// Las piezas traducen sus textos fijos (Volver, Reintentar…); el contenido lo traduce cada pantalla.

export type Idioma = 'es' | 'en'
export const IDIOMAS: Idioma[] = ['es', 'en']
export type Texto = string | Record<Idioma, string>

export const IdiomaCtx = createContext<{ idioma: Idioma; setIdioma: (i: Idioma) => void }>({ idioma: 'es', setIdioma: () => {} })
export const useIdioma = () => useContext(IdiomaCtx)

export function useT() {
  const { idioma } = useIdioma()
  return (x: Texto) => (typeof x === 'string' ? x : x[idioma])
}
