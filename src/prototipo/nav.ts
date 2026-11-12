import { createContext, useContext } from 'react'

/** Navegación entre pantallas del prototipo. Dentro de una pantalla: const { ir, atras, reiniciar } = useNav() */
export type Nav = {
  actual: string
  /** `raiz`: empieza historial nuevo (pestañas inferiores). */
  ir: (id: string, raiz?: boolean) => void
  atras: () => void
  puedeVolver: boolean
  /** Vuelve a la primera pantalla y borra todo lo elegido (idioma, perfil, reserva…). */
  reiniciar: () => void
}

export const NavCtx = createContext<Nav>({ actual: '', ir: () => {}, atras: () => {}, puedeVolver: false, reiniciar: () => {} })
export const useNav = () => useContext(NavCtx)

/**
 * Lo que el usuario va eligiendo durante la demo (perfil, reserva…), compartido entre pantallas.
 * Se borra al reiniciar. Uso: const { datos, guardar } = useDemo(); guardar('perfil', 'visitante')
 */
export type Demo = { datos: Record<string, unknown>; guardar: (clave: string, valor: unknown) => void }
export const DemoCtx = createContext<Demo>({ datos: {}, guardar: () => {} })
export const useDemo = () => useContext(DemoCtx)
