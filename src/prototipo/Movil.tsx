import { useCallback, useEffect, useRef, useState } from 'react'
import { DemoCtx, NavCtx } from './nav'
import { IdiomaCtx, type Idioma } from './idioma'
import { DEMO, PANTALLAS } from './pantallas'
import './prototipo.css'
import './kit.css'

type Props = {
  /** Ocupa toda la pantalla en el móvil (ruta #/app); en escritorio sigue enmarcado. */
  completo?: boolean
  /** Teléfono más pequeño (vista «Los 4 perfiles»). */
  compacto?: boolean
  /** Pantalla con la que arranca (y a la que vuelve al reiniciar). Por defecto, la primera de PANTALLAS. */
  pantalla?: string
  /** Datos con los que arranca (perfil, municipio…). */
  datosIniciales?: Record<string, unknown>
  /** Pantallas por las que avanza solo mientras `auto` sea true (2,5 s cada una). Se para al tocar el teléfono. */
  recorrido?: string[]
  auto?: boolean
  /** Etiqueta accesible del teléfono. */
  etiqueta?: string
}

/**
 * El prototipo dentro de un marco de teléfono. Lleva su propio historial, idioma y datos de la demo,
 * así que pueden convivir varios teléfonos independientes en la misma página.
 * Se reinicia solo tras DEMO.reinicioSegundos sin tocarlo, para que cada persona empiece desde el principio.
 */
export function Movil({ completo = false, compacto = false, pantalla, datosIniciales, recorrido, auto: autoProp = false, etiqueta }: Props) {
  const inicio = pantalla ?? PANTALLAS[0]?.id ?? ''
  const datos0 = useRef(datosIniciales ?? {}).current
  const [pila, setPila] = useState<string[]>([inicio])
  const [vuelta, setVuelta] = useState(false)
  const [idioma, setIdioma] = useState<Idioma>(DEMO.idioma)
  const [datos, setDatos] = useState<Record<string, unknown>>(datos0)
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
    setDatos(datos0)
    setVersion((v) => v + 1)
  }, [inicio, datos0])
  const guardar = useCallback((clave: string, valor: unknown) => setDatos((d) => ({ ...d, [clave]: valor })), [])

  // Recorrido automático: avanza cada 2,5 s; cualquier toque lo para.
  const [auto, setAuto] = useState(autoProp)
  useEffect(() => setAuto(autoProp), [autoProp])
  useEffect(() => {
    if (!auto || !recorrido?.length) return
    let i = 0
    setVuelta(false)
    setPila([recorrido[0]])
    const t = window.setInterval(() => { i = (i + 1) % recorrido.length; setVuelta(false); setPila([recorrido[i]]) }, 2500)
    return () => window.clearInterval(t)
  }, [auto, recorrido])

  // Reinicio por inactividad: solo en la demo enmarcada de la web (puesto compartido) y si se ha tocado.
  // A pantalla completa (#/app, el móvil de cada persona por el QR) no se reinicia: leer sin tocar no debe devolverte al inicio.
  const marco = useRef<HTMLDivElement>(null)
  const sucio = pila.length > 1 || actual !== inicio || idioma !== DEMO.idioma || datos !== datos0
  useEffect(() => {
    const el = marco.current
    if (!el || !sucio || !DEMO.reinicioSegundos || auto || completo) return
    let t = 0
    const armar = () => {
      window.clearTimeout(t)
      t = window.setTimeout(() => { reiniciar(); setAviso(true); window.setTimeout(() => setAviso(false), 2200) }, DEMO.reinicioSegundos * 1000)
    }
    const eventos = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const
    eventos.forEach((e) => el.addEventListener(e, armar, { capture: true, passive: true }))
    armar()
    return () => { window.clearTimeout(t); eventos.forEach((e) => el.removeEventListener(e, armar, { capture: true })) }
  }, [sucio, reiniciar, auto, completo])

  const Vista = PANTALLAS.find((x) => x.id === actual)?.render // se monta como componente: cada pantalla tiene sus propios hooks
  return (
    <div
      ref={marco}
      className={`movil ${completo ? 'completo' : ''} ${compacto ? 'compacto' : ''}`}
      lang={idioma}
      aria-label={etiqueta}
      onPointerDownCapture={() => auto && setAuto(false)}
    >
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
