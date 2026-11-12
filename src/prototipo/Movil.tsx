import { useCallback, useEffect, useRef, useState } from 'react'
import { DemoCtx, NavCtx } from './nav'
import { IdiomaCtx, type Idioma } from './idioma'
import { DEMO, PANTALLAS } from './pantallas'
import './prototipo.css'
import './kit.css'

/**
 * El prototipo dentro de un marco de teléfono. Lleva su propio historial, idioma y datos de la demo.
 * `completo`: ocupa toda la pantalla en el móvil (ruta #/app); en escritorio sigue enmarcado.
 * Se reinicia solo tras DEMO.reinicioSegundos sin tocarlo, para que cada persona empiece desde el principio.
 */
export function Movil({ completo = false }: { completo?: boolean }) {
  const inicio = PANTALLAS[0]?.id ?? ''
  const [pila, setPila] = useState<string[]>([inicio])
  const [vuelta, setVuelta] = useState(false)
  const [idioma, setIdioma] = useState<Idioma>(DEMO.idioma)
  const [datos, setDatos] = useState<Record<string, unknown>>({})
  const [version, setVersion] = useState(0) // cambia al reiniciar: vuelve a montar las pantallas desde cero
  const [aviso, setAviso] = useState(false)
  const actual = pila[pila.length - 1]

  const ir = useCallback((id: string, raiz = false) => {
    if (!PANTALLAS.some((p) => p.id === id)) return console.warn(`Prototipo: no existe la pantalla «${id}»`)
    setVuelta(false)
    setPila((s) => (raiz ? [id] : s[s.length - 1] === id ? s : [...s, id]))
  }, [])
  const atras = useCallback(() => {
    setVuelta(true)
    setPila((s) => (s.length > 1 ? s.slice(0, -1) : s))
  }, [])
  const reiniciar = useCallback(() => {
    setVuelta(true)
    setPila([inicio])
    setIdioma(DEMO.idioma)
    setDatos({})
    setVersion((v) => v + 1)
  }, [inicio])
  const guardar = useCallback((clave: string, valor: unknown) => setDatos((d) => ({ ...d, [clave]: valor })), [])

  // Reinicio por inactividad: solo si la demo se ha tocado (no está ya en el inicio limpio).
  const marco = useRef<HTMLDivElement>(null)
  const sucio = pila.length > 1 || actual !== inicio || idioma !== DEMO.idioma || Object.keys(datos).length > 0
  useEffect(() => {
    const el = marco.current
    if (!el || !sucio || !DEMO.reinicioSegundos) return
    let t = 0
    const armar = () => {
      window.clearTimeout(t)
      t = window.setTimeout(() => { reiniciar(); setAviso(true); window.setTimeout(() => setAviso(false), 2200) }, DEMO.reinicioSegundos * 1000)
    }
    const eventos = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const
    eventos.forEach((e) => el.addEventListener(e, armar, { capture: true, passive: true }))
    armar()
    return () => { window.clearTimeout(t); eventos.forEach((e) => el.removeEventListener(e, armar, { capture: true })) }
  }, [sucio, reiniciar])

  const Vista = PANTALLAS.find((x) => x.id === actual)?.render // se monta como componente: cada pantalla tiene sus propios hooks
  return (
    <div ref={marco} className={`movil ${completo ? 'completo' : ''}`} lang={idioma}>
      <IdiomaCtx.Provider value={{ idioma, setIdioma }}>
        <DemoCtx.Provider value={{ datos, guardar }}>
          <NavCtx.Provider value={{ actual, ir, atras, puedeVolver: pila.length > 1, reiniciar }}>
            <div key={`${version}-${actual}-${pila.length}`} className={`movil-pantalla ${vuelta ? 'vuelta' : ''}`}>
              {Vista ? <Vista /> : <div className="app-cuerpo"><p className="app-texto">Sin pantallas. Añádelas en src/prototipo/pantallas.tsx.</p></div>}
            </div>
          </NavCtx.Provider>
        </DemoCtx.Provider>
      </IdiomaCtx.Provider>
      {aviso && <div className="app-aviso" role="status">{idioma === 'en' ? 'Demo restarted' : 'Demo reiniciada'}</div>}
    </div>
  )
}

/** ¿Quedan pantallas de ejemplo del kit? (las usa la revisión antes de entregar) */
export const hayEjemplos = () => PANTALLAS.some((p) => p.ejemplo)
