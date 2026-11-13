import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { SLIDES, type Slide } from '../data/presentacion'
import { EQUIPO, EQUIPO_NOMBRE, EVENTO, PROTOTIPO, RETO, SITIO_URL, rutaDe } from '../config/proyecto'
import { Icon } from '../components/Icon'
import { NovaMark } from '../components/NovaMark'
import { Qr, urlBase } from '../components/Qr'
import { tieneRelleno } from '../config/relleno'
import { Fogon } from '../components/Piedra'
import { Movil } from '../prototipo/Movil'
import { anfitrion, buscar, ejemplo, porEmocion } from '../prototipo/experiencias'
import '../styles/presentacion.css'

/** Ilustraciones animadas de las escenas: las crea otro agente en src/components/escenas/Escenas.tsx. Si aún no existe, la diapositiva se queda sin imagen. */
type Ilustracion = React.ComponentType<{ className?: string }>
const MOD_ESCENAS = Object.values(import.meta.glob('../components/escenas/Escenas.tsx', { eager: true }))[0] as Record<string, Ilustracion> | undefined
const ESCENA_COMP: Record<'vecino' | 'visitante' | 'gestion', string> = { vecino: 'EscenaVecino', visitante: 'EscenaVisitante', gestion: 'EscenaGestion' }

/** Pantalla real del prototipo (solo lectura) en un móvil: es el plan B de los vídeos si todavía no existen. */
const PANTALLA_MOVIL: Record<'vecino' | 'visitante', { pantalla: string; datos: Record<string, unknown> }> = {
  vecino: { pantalla: 'barrio', datos: { perfil: 'vecino', municipio: 'Puerto de la Cruz' } },
  visitante: { pantalla: 'experiencia', datos: { perfil: 'turista', emocion: 'orgullo', experiencia: porEmocion('orgullo')[0]?.id } },
}
function MovilDiapo({ tipo }: { tipo: 'vecino' | 'visitante' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [esc, setEsc] = useState(0.5)
  useEffect(() => {
    const sl = ref.current?.closest('.slide') as HTMLElement | null
    if (!sl) return
    const medir = () => setEsc((sl.clientWidth / 1280) * 0.46)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(sl)
    return () => ro.disconnect()
  }, [])
  const m = PANTALLA_MOVIL[tipo]
  return (
    <div ref={ref} className="s-movil" style={{ ['--s' as string]: esc }}>
      <div className="proto-4-escala"><Movil compacto pantalla={m.pantalla} datosIniciales={m.datos} etiqueta="Tenique" /></div>
    </div>
  )
}

/**
 * Vídeo de la demo (public/video/demo-*.webm|mp4, póster public/img/pitch/demo-*.png), sin sonido y en bucle.
 * Si el vídeo no carga, se ve el prototipo en vivo (vecino, visitante) o la captura del panel (gestión).
 */
function VideoDemo({ tipo }: { tipo: 'vecino' | 'visitante' | 'gestion' }) {
  const [fallo, setFallo] = useState(false)
  const base = import.meta.env.BASE_URL
  const nombre = 'demo-' + tipo
  if (fallo) return tipo === 'gestion' ? <img className="s-demo-img" src={base + 'img/pitch/gestion.png'} alt="" /> : <MovilDiapo tipo={tipo} />
  const video = (
    <video className="s-demo-video" muted loop autoPlay playsInline preload="auto" poster={base + 'img/pitch/' + nombre + '.png'} aria-hidden="true">
      <source src={base + 'video/' + nombre + '.webm'} type="video/webm" />
      <source src={base + 'video/' + nombre + '.mp4'} type="video/mp4" onError={() => setFallo(true)} />
    </video>
  )
  return tipo === 'gestion' ? <div className="s-demo-horiz">{video}</div> : <div className="s-tel">{video}</div>
}

const A = ({ i, children, className = '', style }: { i: number; children: React.ReactNode; className?: string; style?: CSSProperties }) => (
  <div className={`a ${className}`} style={{ ...style, ['--i' as string]: i }}>{children}</div>
)

const nombreSlide = (s: Slide) =>
  s.tipo === 'portada' ? 'Portada' : s.tipo === 'pregunta' ? 'Pregunta' : s.tipo === 'revelacion' ? s.nombre : s.tipo === 'final' ? s.titulo : s.kicker

/** Desde la diapositiva de acción (la tercera), el QR a la demo se queda en una esquina de las siguientes (salvo en la llamada final, que lleva el QR a la web). */
const INICIO_QR_ESQUINA = SLIDES.findIndex((s) => s.tipo === 'accion')
const conQrEsquina = (s: Slide, i: number) => INICIO_QR_ESQUINA >= 0 && i > INICIO_QR_ESQUINA && s.tipo !== 'cta'

function urlDemo(destino: 'app' | 'prototipo' = 'prototipo') {
  const base = urlBase(SITIO_URL)
  if (destino === 'app') return base + '#/app' // portada de perfiles del prototipo
  if (PROTOTIPO.url.startsWith('http')) return PROTOTIPO.url
  if (PROTOTIPO.url.startsWith('#')) return base + PROTOTIPO.url // prototipo dentro de la web (#/app)
  return base + '#' + rutaDe('prototipo') // pestaña del prototipo, siga la ruta que siga
}

function Contenido({ s }: { s: Slide }) {
  switch (s.tipo) {
    case 'portada':
      return (
        <div className="s-cover" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="s-burst a"><NovaMark size="100%" className="" /></div>
          <A i={0}><span className="s-kicker">{RETO.definido ? RETO.empresa : '[Empresa]'}</span></A>
          <A i={1}><div className="s-mega" style={{ marginTop: '1.6cqw' }}>{RETO.definido ? RETO.titulo : '[Nombre del reto]'}</div></A>
          <A i={2} className="meta">
            <span><b>Equipo</b>{EQUIPO_NOMBRE}</span>
            <span><b>Presentan</b>{EQUIPO.map((m) => m.nombre.split(' ')[0]).join(' · ')}</span>
            <span><b>Evento</b>{EVENTO.nombre}</span>
          </A>
        </div>
      )
    case 'pregunta':
      return (
        <div className="s-question" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <A i={0}>
            {/* Las preguntas largas (patrón «¿Cómo podemos…?») bajan de tamaño para caber; tras una coma no va espacio delante */}
            <div className={`s-mega ${(s.antes + s.destacado + (s.despues ?? '')).length > 110 ? 's-mega-largo' : ''}`}>
              {s.antes} <em>{s.destacado}</em>{s.despues ? (/^[,.;:?]/.test(s.despues) ? s.despues : ` ${s.despues}`) : ''}
            </div>
          </A>
          {s.remate && <div className="s-answer a"><NovaMark size="1em" className="" />{s.remate}</div>}
        </div>
      )
    case 'accion': {
      const url = s.destino === 'web' ? urlBase(SITIO_URL) : urlDemo(s.destino)
      return (
        <div className="s-action">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <A i={1}><span className="s-kicker">{s.kicker}</span></A>
            <A i={2}><div className="s-title">{s.titulo}</div></A>
            <A i={3}><p className="s-lead">{s.texto}</p></A>
          </div>
          <A i={4}>
            <Qr url={url} />
            <div className="s-qr-cap">{url.replace(/^https?:\/\//, '')}</div>
          </A>
        </div>
      )
    }
    case 'columnas':
      return (
        <>
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title">{s.titulo}</div></A>
          {s.lead && <A i={2}><p className="s-lead">{s.lead}</p></A>}
          <div className="s-cols">
            {s.columnas.map((c, n) => <A key={n} i={3 + n} className="s-col"><i>0{n + 1}</i><b>{c.titulo}</b><p>{c.texto}</p></A>)}
          </div>
          {s.fuente && <A i={6}><p className="s-lead" style={{ fontSize: '1.3cqw', color: 'var(--muted)', maxWidth: '100%' }}>{s.fuente}</p></A>}
        </>
      )
    case 'frase':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-mega" style={{ fontSize: '5.6cqw', marginTop: '1.6cqw', maxWidth: '90%' }}>{s.titulo}</div></A>
          {s.lead && <A i={2}><p className="s-lead">{s.lead}</p></A>}
        </div>
      )
    case 'pasos':
      return (
        <>
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title">{s.titulo}</div></A>
          <div className="s-flow">
            {s.pasos.map((p, n) => <A key={n} i={2 + n} className="s-step"><i>{n + 1}</i><b>{p.titulo}</b><p>{p.texto}</p></A>)}
          </div>
        </>
      )
    case 'cifras':
      return (
        <>
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title">{s.titulo}</div></A>
          <div className="s-cols">
            {s.cifras.map((c, n) => <A key={n} i={2 + n} className="s-col s-cifra"><b>{c.valor}</b><span>{c.etiqueta}</span></A>)}
          </div>
          {s.fuente && <A i={6}><p className="s-lead" style={{ fontSize: '1.3cqw', color: 'var(--muted)', maxWidth: '100%' }}>{s.fuente}</p></A>}
        </>
      )
    case 'revelacion':
      return (
        <div className="s-reveal">
          <div className="s-reveal-txt">
            <A i={0}><span className="s-reveal-antes">{s.antes}</span></A>
            <A i={1} className="s-pop"><div className="s-reveal-nombre">{s.nombre}</div></A>
            <A i={3}><p className="s-reveal-def">{s.definicion}</p></A>
            <A i={4}><p className="s-fuente">{s.fuente}</p></A>
          </div>
          <A i={2} className="s-fogon-comun"><Fogon leyenda /></A>
          <div className="s-reveal-piedras">
            <A i={5}><div className="s-reveal-union">{s.union}</div></A>
            <div className="s-reveal-lista">
              {s.piedras.map((p, n) => <A key={p.nombre} i={6 + n} className="s-reveal-p"><i>{n + 1}</i><b>{p.nombre}</b><span>{p.texto}</span></A>)}
            </div>
            <A i={9}><p className="s-reveal-fuego"><Icon name="llama" size={18} fill />{s.fuego}</p></A>
          </div>
        </div>
      )
    case 'sendero':
      return (
        <div className="s-sendero">
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title s-sendero-tit">{s.titulo}</div></A>
          <div className="s-sendero-via">
            <svg className="s-sendero-svg" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 50 15 C 100 15 100 42 150 42 C 200 42 200 15 250 15" className="s-sendero-base" vectorEffect="non-scaling-stroke" />
              <path d="M 50 15 C 100 15 100 42 150 42 C 200 42 200 15 250 15" className="s-sendero-traza" pathLength={1} vectorEffect="non-scaling-stroke" />
            </svg>
            <ol className="s-sendero-hitos">
              {s.paradas.map((p, n) => (
                <li key={p.quien} className={n % 2 ? 'abajo' : 'arriba'} style={{ ['--i' as string]: n }}>
                  <span className="s-hito-num">{n + 1}</span>
                  <div className="s-hito-txt">
                    <b>{p.quien}</b>
                    <span className="s-hito-fric">{p.friccion}</span>
                    <span className="s-boton-app" aria-label={`Botón de la app: ${p.boton}`}><span>{p.boton}</span><Icon name="right" size={16} /></span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )
    case 'escena': {
      const Ilu = MOD_ESCENAS?.[ESCENA_COMP[s.imagen]]
      return (
        <div className="s-escena">
          <div className="s-escena-ilu" aria-hidden="true">{Ilu ? <Ilu className="s-escena-svg" /> : null}</div>
          <div className="s-escena-txt">
            <A i={0}><span className="s-kicker">{s.kicker}</span></A>
            <blockquote className="s-voz">{('«' + s.voz + '»').split(' ').map((w, n) => <span key={n} className="s-pal" style={{ ['--w' as string]: n }}>{w}{' '}</span>)}</blockquote>
            {s.pie && <A i={3}><p className="s-fuente">{s.pie}</p></A>}
          </div>
        </div>
      )
    }
    case 'solucion':
      return (
        <div className="s-solucion con-imgs">
          <div className="s-imgs" aria-hidden="true"><VideoDemo tipo={s.video} /></div>
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title s-solucion-tit">{s.titulo}</div></A>
          <A i={2}><p className="s-solucion-intro">{s.intro}</p></A>
          <ul className="s-solucion-lista">
            {s.puntos.map((p, n) => <A key={p} i={3 + n} className="s-solucion-p"><Icon name="check" size={20} /><span>{p}</span></A>)}
          </ul>
          
        </div>
      )
    case 'sellos': {
      const e = buscar(s.experienciaId)
      const v = e ? ejemplo(e) : undefined
      const ejemplos = [
        e ? `Ejemplo: el barrio de ${e.municipio}.` : '',
        e ? `Organiza: ${anfitrion(e)}. Turismo de Tenerife lo revisa antes de publicar.` : '',
        v ? `Valoración de ejemplo: ★ ${v.valoracion.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} (${v.opiniones} opiniones)` : '',
      ]
      const iconos = ['vecinos', 'institucion', 'star']
      return (
        <div className="s-sellos-slide">
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title s-sellos-tit">{s.titulo}</div></A>
          {e && <A i={2}><div className="s-sellos-exp"><b>{typeof e.titulo === 'string' ? e.titulo : e.titulo.es}</b><span>{e.municipio}</span></div></A>}
          <div className="s-sellos-fila">
            {s.sellos.map((x, n) => (
              <div key={x.nombre} className="s-sello-g" style={{ ['--k' as string]: n }}>
                <span className="s-sello-estampa"><Icon name={iconos[n]} size={30} /><i>{n + 1}</i></span>
                <b>{x.nombre}</b>
                <p>{x.texto}</p>
                <small>{ejemplos[n]}</small>
              </div>
            ))}
          </div>
          {s.nota && <A i={8}><p className="s-fuente">{s.nota}</p></A>}
        </div>
      )
    }
    case 'gestion': {
      return (
        <div className="s-gestion">
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title s-gestion-tit">{s.titulo}</div></A>
          <div className="s-gestion-cuerpo">
            <A i={2} className="s-gestion-demo">
              <VideoDemo tipo="gestion" />
                          </A>
            <div className="s-burbujas">
              {s.burbujas.map((b, n) => <div key={b} className="s-burbuja" style={{ ['--k' as string]: n }}><i>{n + 1}</i><span>{b}</span></div>)}
            </div>
          </div>
        </div>
      )
    }
    case 'datos':
      return (
        <div className="s-datos">
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title s-datos-tit">{s.titulo}</div></A>
          <div className="s-datos-flujo">
            <A i={2} className="s-datos-col"><b>Los datos</b><ul>{s.datos.map((d) => <li key={d}>{d}</li>)}</ul></A>
            <A i={3} className="s-datos-flecha"><Icon name="arrow" size={32} /></A>
            <A i={4} className="s-datos-col s-datos-prop"><b>La propuesta</b><span>{s.propuesta}</span></A>
            <A i={5} className="s-datos-flecha"><Icon name="arrow" size={32} /></A>
            <A i={6} className="s-datos-col"><b>Las entidades</b><ul>{s.entidades.map((d) => <li key={d}>{d}</li>)}</ul></A>
          </div>
          <A i={8}><p className="s-datos-frase">{s.frase}</p></A>
        </div>
      )
    case 'fogon':
      return (
        <div className="s-fogon">
          <div className="s-fogon-txt">
            <A i={0}><span className="s-kicker">{s.kicker}</span></A>
            <A i={1}><div className="s-title">{s.titulo}</div></A>
            <div className="s-fogon-piedras">
              {s.piedras.map((p, n) => <A key={p.nombre} i={2 + n} className="s-fogon-p"><b>{p.nombre}</b><span>{p.texto}</span></A>)}
            </div>
            {s.mensaje && <A i={6}><div className="s-fogon-lema">{s.mensaje}</div></A>}
          </div>
          <A i={5} className="s-fogon-comun"><Fogon leyenda /></A>
        </div>
      )
    case 'final':
      return (
        <div className="s-final">
          <A i={0} className="s-pop"><div className="s-mega">{s.titulo}</div></A>
          {s.frase && <A i={1}><p className="s-final-frase">{s.frase}</p></A>}
          <A i={2} className="s-final-equipo">
            <span>{EQUIPO.map((m) => m.nombre.split(' ').slice(0, 1).join(' ')).join(' · ')}</span>
          </A>
          <A i={3}><div className="s-final-sub">{s.subtitulo}</div></A>
        </div>
      )
    case 'cta': {
      const base = urlBase(SITIO_URL)
      const rutas: Record<string, string> = { plan: '#/plan', futuro: '#/futuro', gestion: '#/gestion' }
      return (
        <div className="s-cta">
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <A i={1}><div className="s-title s-cta-tit">{s.titulo}</div></A>
          <div className="s-cta-grid">
            {s.pedidos.map((p, n) => {
              const url = base + rutas[p.destino]
              return (
                <A key={p.titulo} i={2 + n} className="s-cta-it">
                  <i>{n + 1}</i>
                  <b>{p.titulo}</b>
                  <span>{p.texto}</span>
                  <Qr url={url} className="s-qr-cta" />
                  <small>{url.replace(/^https?:\/\//, '')}</small>
                </A>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

/** QR pequeño a la demo, fijo en la esquina superior derecha. */
function QrEsquina() {
  const url = urlDemo('app')
  return (
    <div className="s-qr-esquina" aria-label="Demo de Tenique">
      <Qr url={url} className="s-qr-mini" />
      <span>Demo</span>
    </div>
  )
}

function SlideView({ s, i, dir }: { s: Slide; i: number; dir?: number }) {
  const sinPie = s.tipo === 'portada' || s.tipo === 'pregunta' || s.tipo === 'final'
  return (
    <div className={`slide ${dir && dir < 0 ? 'back' : ''} ${s.tipo === 'escena' || s.tipo === 'sendero' || s.tipo === 'fogon' ? 'problema' : ''}`}>
      {conQrEsquina(s, i) && <QrEsquina />}
      {(s.tipo === 'portada' || s.tipo === 'final') && (
        <img className="s-logo" src={import.meta.env.BASE_URL + 'img/marca/turismo-tenerife-blanco.png'} alt="Turismo de Tenerife" />
      )}
      <Contenido s={s} />
      {!sinPie && (
        <div className="s-foot">
          <span className="wordmark"><NovaMark size="1.1em" className="" />{EQUIPO_NOMBRE.toLowerCase()}</span>
          <span className="s-foot-tdt"><span>Reto de</span><img src={import.meta.env.BASE_URL + 'img/marca/turismo-tenerife-blanco.png'} alt="Turismo de Tenerife" /></span>
        </div>
      )}
      {/* Número de diapositiva y barra de progreso: en todas, también a pantalla completa y en el PDF */}
      <span className="s-num tnum" aria-label={`Diapositiva ${i + 1} de ${SLIDES.length}`}>{i + 1} / {SLIDES.length}</span>
      <div className="s-progreso" aria-hidden="true">
        <i style={{ ['--de' as string]: Math.max(0, Math.min(1, (i + 1 - (dir ?? 1)) / SLIDES.length)), ['--a' as string]: (i + 1) / SLIDES.length }} />
      </div>
    </div>
  )
}

export default function Presentacion() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const stage = useRef<HTMLDivElement>(null)
  const ir = useCallback((n: number) => {
    setI((cur) => {
      const nx = Math.max(0, Math.min(SLIDES.length - 1, n))
      setDir(nx >= cur ? 1 : -1)
      return nx
    })
  }, [])
  const pantalla = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else stage.current?.requestFullscreen?.()
  }

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); setI((c) => { setDir(1); return Math.min(SLIDES.length - 1, c + 1) }) }
      if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); setI((c) => { setDir(-1); return Math.max(0, c - 1) }) }
      if (e.key === 'Home') ir(0)
      if (e.key === 'End') ir(SLIDES.length - 1)
      if (e.key.toLowerCase() === 'f') pantalla()
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [ir])

  const x0 = useRef<number | null>(null)

  // La portada sale de RETO: sin reto definido muestra [Empresa] y [Nombre del reto].
  const conRelleno = SLIDES.map((sl, n) => (tieneRelleno(sl) || (sl.tipo === 'portada' && !RETO.definido) ? n + 1 : 0)).filter(Boolean)
  // Sin SITIO_URL, los QR usan la dirección actual: si es local, el móvil del jurado no puede abrirlos.
  const qrLocal = !SITIO_URL && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)
  return (
    <div className="wrap">
      <header className="page-head enter no-print">
        <span className="kicker">Entregable · pitch</span>
        <h1>Presentación</h1>
        <p>Pitch de 5 minutos: pregunta osada, la demo en el móvil del jurado, el sendero, Tenique y sus tres piedras, tres escenas con su solución y qué revisar. Flechas para avanzar, <span className="code">F</span> pantalla completa.</p>
      </header>

      <div className="deck-bar">
        <span className="count">{String(i + 1).padStart(2, '0')} / {SLIDES.length} · {nombreSlide(SLIDES[i])}</span>
        <button className="btn sm" onClick={() => ir(i - 1)} disabled={i === 0} aria-label="Anterior"><Icon name="left" /></button>
        <button className="btn sm" onClick={() => ir(i + 1)} disabled={i === SLIDES.length - 1} aria-label="Siguiente"><Icon name="right" /></button>
        <button className="btn sm" onClick={pantalla}><Icon name="expand" size={14} />Pantalla completa</button>
        <button className="btn sm" onClick={() => window.print()}><Icon name="print" size={14} />Exportar PDF</button>
      </div>
      {qrLocal && (
        <p className="callout no-print" style={{ marginBottom: 14 }}>
          <Icon name="alert" /> Los QR apuntan a esta dirección local y no abrirán en otro móvil. Presenta desde la web publicada o pide al coordinador que rellene SITIO_URL.
        </p>
      )}
      {conRelleno.length > 0 && (
        <p className="callout no-print" style={{ marginBottom: 14 }}>
          <Icon name="alert" /> Texto de relleno [entre corchetes] en {conRelleno.length === 1 ? 'la diapositiva' : 'las diapositivas'} {conRelleno.join(', ')}. No se presenta así.
        </p>
      )}

      <div
        className="stage screen-only"
        ref={stage}
        onClick={(e) => { if (document.fullscreenElement) ir(e.clientX > window.innerWidth / 2 ? i + 1 : i - 1) }}
        onTouchStart={(e) => { x0.current = e.touches[0].clientX }}
        onTouchEnd={(e) => { if (x0.current == null) return; const dx = e.changedTouches[0].clientX - x0.current; if (Math.abs(dx) > 40) ir(dx < 0 ? i + 1 : i - 1); x0.current = null }}
      >
        <SlideView key={i} s={SLIDES[i]} i={i} dir={dir} />
        <div className="progress" style={{ transform: `scaleX(${(i + 1) / SLIDES.length})` }} />
      </div>

      <div className="thumbs no-print">
        {SLIDES.map((s, n) => (
          <button key={n} className={`thumb ${n === i ? 'on' : ''}`} onClick={() => ir(n)}>
            <b>{String(n + 1).padStart(2, '0')}{(s.tipo === 'accion' || s.tipo === 'cta') ? ' · acción' : ''}</b>{nombreSlide(s)}
          </button>
        ))}
      </div>

      <div className="print-deck">
        {SLIDES.map((s, n) => (
          // sin salto tras la última: evita una página en blanco al final del PDF
          <div key={n} className="stage" style={n === SLIDES.length - 1 ? { breakAfter: 'auto' } : undefined}><SlideView s={s} i={n} /></div>
        ))}
      </div>
    </div>
  )
}
