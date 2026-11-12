import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { EMOCION_TXT, JOURNEY, RECORRIDOS, type PasoJourney } from '../data/usuarios'
import { Movil } from './Movil'
import { PANTALLAS } from './pantallas'
import { Portada } from './tenique-piezas'
import { EMOCIONES, emocion } from './experiencias'
import { PERFILES_DEMO, type PerfilDemo } from './perfiles-demo'

// «La experiencia, paso a paso»: sendero interactivo por perfil. Los pasos salen de JOURNEY (src/data/usuarios.ts).
// Campos opcionales por paso (los añade Usuarios): `pantalla` (id de la app que lo ilustra) y `emocionApp` (portada).
// Escritorio: sendero en zigzag que se dibuja (stroke-dashoffset). Móvil: vertical. Con reduced-motion se ve completo.

type Paso = PasoJourney & { pantalla?: string; emocionApp?: string }

/** Emoción de portada por fase, si el paso no trae `emocionApp`. */
const EMO_POR_FASE: Record<string, string> = {
  'Día a día': 'calma', Roce: 'adrenalina', Descubre: 'asombro', Participa: 'sabor', Comparte: 'celebracion', 'Ve el retorno': 'pertenencia', Orgullo: 'orgullo',
}

/** Recorridos en el orden de RECORRIDOS (usuarios.ts), cada uno con el perfil demo que le corresponde (por clave o, si no, por posición). */
const RUTAS = RECORRIDOS.map((r, i) => ({
  id: r.id,
  perfil: PERFILES_DEMO.find((p) => p.journey.includes(r.id)) ?? PERFILES_DEMO[i] ?? PERFILES_DEMO[0],
  pasos: ((JOURNEY as Record<string, Paso[] | undefined>)[r.id] ?? []) as Paso[],
}))

/** Solo la pantalla que trae el paso: si no la trae, el detalle muestra únicamente la portada. */
const pantallaDe = (paso: Paso) => (paso.pantalla && PANTALLAS.some((x) => x.id === paso.pantalla) ? paso.pantalla : undefined)

export function Sendero() {
  const [rutaId, setRutaId] = useState(RUTAS[0]?.id ?? '')
  const ruta = RUTAS.find((r) => r.id === rutaId) ?? RUTAS[0]
  const perfil = ruta?.perfil ?? PERFILES_DEMO[0]
  const pasos = ruta?.pasos ?? []
  const perfilId = rutaId
  const [sel, setSel] = useState(0)
  const [dibujado, setDibujado] = useState(false)
  const caja = useRef<HTMLDivElement>(null)

  // Al cambiar de perfil, se selecciona el primer paso en el que actúa Tenique y el sendero se vuelve a dibujar.
  useEffect(() => {
    setSel(Math.max(0, pasos.findIndex((x) => x.tenique)))
    setDibujado(false)
    const id = window.requestAnimationFrame(() => setDibujado(enVista.current))
    return () => window.cancelAnimationFrame(id)
  }, [perfilId]) // eslint-disable-line react-hooks/exhaustive-deps

  const enVista = useRef(false)
  useEffect(() => {
    const el = caja.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { enVista.current = true; setDibujado(true) } }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const n = pasos.length
  const paso = pasos[sel]
  const xs = pasos.map((_, i) => i * 100 + 50)
  const ys = pasos.map((_, i) => (i % 2 ? 70 : 30))
  const d = xs.map((x, i) => (i === 0 ? `M ${x} ${ys[i]}` : `C ${xs[i - 1] + 50} ${ys[i - 1]} ${x - 50} ${ys[i]} ${x} ${ys[i]}`)).join(' ')
  const paso_ms = n ? Math.min(120, Math.round(800 / n)) : 0

  return (
    <div className="sendero-bloque">
      <div className="chips sendero-chips" role="tablist" aria-label="Perfil del recorrido">
        {RUTAS.map((r) => (
          <button key={r.id} role="tab" aria-selected={r.id === rutaId} className={`chip ${r.id === rutaId ? 'on' : ''}`} onClick={() => setRutaId(r.id)}>{r.perfil.nombre}</button>
        ))}
      </div>

      {n === 0 ? (
        <div className="empty sendero-vacio"><div><h3>Recorrido en preparación</h3><p>El equipo de usuarios está escribiendo los pasos de este perfil.</p></div></div>
      ) : (
        <>
          <div ref={caja} className={`sendero ${dibujado ? 'dibujado' : ''}`} style={{ '--n': n, '--paso': `${paso_ms}ms` } as CSSProperties}>
            <svg className="sendero-h" viewBox={`0 0 ${n * 100} 100`} preserveAspectRatio="none" aria-hidden="true">
              <path d={d} className="sendero-base" vectorEffect="non-scaling-stroke" />
              <path d={d} className="sendero-traza" pathLength={1} vectorEffect="non-scaling-stroke" />
            </svg>
            <svg className="sendero-v" viewBox="0 0 10 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 5 0 L 5 100" className="sendero-base" vectorEffect="non-scaling-stroke" />
              <path d="M 5 0 L 5 100" className="sendero-traza" pathLength={1} vectorEffect="non-scaling-stroke" />
            </svg>
            <ol className="sendero-hitos">
              {pasos.map((p, i) => (
                <li key={p.fase + i} className={i % 2 ? 'abajo' : 'arriba'} style={{ '--i': i } as CSSProperties}>
                  <button className={`hito ${i === sel ? 'on' : ''} ${p.tenique ? 'tq' : ''}`} aria-pressed={i === sel} onClick={() => setSel(i)}>
                    <span className="hito-num">{i + 1}</span>
                    <span className="hito-txt">
                      <b>{p.fase}</b>
                      <small className="hito-hace">{p.hace}</small>
                      <span className="hito-tags">
                        {p.emocion != null && <span className={`hito-emo e${p.emocion}`}>{EMOCION_TXT[p.emocion]}</span>}
                        {p.tenique && <span className="hito-tq">Tenique</span>}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {paso && <Detalle key={perfilId + sel} perfil={perfil} paso={paso} i={sel} />}
        </>
      )}
    </div>
  )
}

function Detalle({ perfil, paso, i }: { perfil: PerfilDemo; paso: Paso; i: number }) {
  const pantalla = pantallaDe(paso)
  const emo = emocion(paso.emocionApp ?? EMO_POR_FASE[paso.fase]) ?? EMOCIONES[0]
  return (
    <article className="card sendero-detalle">
      <div className="sendero-imagen">
        {pantalla ? (
          <div className="proto-4-escala sendero-tel">
            <Movil compacto pantalla={pantalla} datosIniciales={perfil.datos} etiqueta={`Tenique · ${perfil.nombre} · ${paso.fase}`} />
          </div>
        ) : (
          <Portada emo={emo} className="sendero-portada"><span className="sendero-portada-t">{paso.fase}</span></Portada>
        )}
      </div>
      <div className="sendero-info">
        {pantalla && <Portada emo={emo} className="sendero-cinta"><span className="sendero-portada-t">{i + 1}. {paso.fase}</span></Portada>}
        {!pantalla && <span className="kicker">Paso {i + 1}{paso.tenique ? '' : ' · antes de Tenique'}</span>}
        <dl className="sendero-dl">
          <div><dt>Qué hace</dt><dd>{paso.hace}</dd></div>
          <div><dt>Qué siente</dt><dd>{paso.piensa} {paso.emocion != null && <span className={`hito-emo e${paso.emocion}`}>{EMOCION_TXT[paso.emocion]}</span>}</dd></div>
          <div><dt>Qué le frena</dt><dd>{paso.dolor}</dd></div>
          <div><dt>{paso.tenique ? 'Dónde actúa Tenique' : 'Oportunidad'}</dt><dd>{paso.oportunidad}</dd></div>
          {paso.canales.length > 0 && <div><dt>Dónde ocurre</dt><dd className="chips">{paso.canales.map((c) => <span key={c} className="tag">{c}</span>)}</dd></div>}
        </dl>
        <p className="small muted">{paso.emocion != null && 'Emociones estimadas: hipótesis hasta las entrevistas. '}{pantalla && 'La pantalla es la app real: tócala para probarla.'}</p>
      </div>
    </article>
  )
}
