import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { Ico } from './iconos'
import { useT } from './idioma'

// Estados de carga, vacío y error. Para simular una llamada lenta o que falla en la demo:
//   <Simulado ms={900} fallar={false} vacio={lista.length === 0}>…contenido…</Simulado>

export function CargandoApp({ lineas = 3 }: { lineas?: number }) {
  const t = useT()
  return (
    <div className="app-cargando" role="status" aria-label={t({ es: 'Cargando', en: 'Loading' })}>
      <div className="app-skel bloque" />
      {Array.from({ length: lineas }, (_, i) => <div key={i} className="app-skel" style={{ width: `${90 - i * 15}%` }} />)}
    </div>
  )
}

export function VacioApp({ titulo, texto, icono = 'search', accion }: { titulo?: string; texto?: string; icono?: string; accion?: ReactNode }) {
  const t = useT()
  return (
    <div className="app-estado-vacio">
      <span className="app-estado-ico"><Ico name={icono} size={26} /></span>
      <b>{titulo ?? t({ es: 'Nada por aquí todavía', en: 'Nothing here yet' })}</b>
      {texto && <p>{texto}</p>}
      {accion}
    </div>
  )
}

export function ErrorApp({ titulo, texto, onReintentar }: { titulo?: string; texto?: string; onReintentar?: () => void }) {
  const t = useT()
  return (
    <div className="app-estado-vacio error" role="alert">
      <span className="app-estado-ico"><Ico name="wifi" size={26} /></span>
      <b>{titulo ?? t({ es: 'No se ha podido cargar', en: 'Could not load' })}</b>
      <p>{texto ?? t({ es: 'Comprueba la conexión e inténtalo otra vez.', en: 'Check your connection and try again.' })}</p>
      {onReintentar && <button className="app-boton secundario" onClick={onReintentar}><Ico name="restart" size={16} /> {t({ es: 'Reintentar', en: 'Try again' })}</button>}
    </div>
  )
}

/** Simula una carga de `ms` milisegundos que puede fallar (el reintento sí funciona). */
export function useSimulacion(ms = 900, fallar = false) {
  const [estado, setEstado] = useState<'cargando' | 'listo' | 'error'>('cargando')
  const [intento, setIntento] = useState(0)
  useEffect(() => {
    setEstado('cargando')
    const id = window.setTimeout(() => setEstado(fallar && intento === 0 ? 'error' : 'listo'), ms)
    return () => window.clearTimeout(id)
  }, [ms, fallar, intento])
  const reintentar = useCallback(() => setIntento((n) => n + 1), [])
  return { estado, reintentar }
}

/** Envuelve contenido con carga simulada, error con reintento y estado vacío. */
export function Simulado({ ms = 900, fallar = false, vacio = false, textoVacio, children }: { ms?: number; fallar?: boolean; vacio?: boolean; textoVacio?: string; children: ReactNode }) {
  const { estado, reintentar } = useSimulacion(ms, fallar)
  if (estado === 'cargando') return <CargandoApp />
  if (estado === 'error') return <ErrorApp onReintentar={reintentar} />
  if (vacio) return <VacioApp texto={textoVacio} />
  return <div className="app-aparece">{children}</div>
}
