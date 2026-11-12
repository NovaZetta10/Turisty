import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { SLIDES, type Slide } from '../data/presentacion'
import { DESTACADOS, EQUIPO, EQUIPO_NOMBRE, EVENTO, PROTOTIPO, RETO, SECCIONES, SITIO_URL, rutaDe } from '../config/proyecto'
import { Icon } from '../components/Icon'
import { NovaMark } from '../components/NovaMark'
import { Qr, urlBase } from '../components/Qr'
import { tieneRelleno } from '../config/relleno'
import '../styles/presentacion.css'

const A = ({ i, children, className = '', style }: { i: number; children: React.ReactNode; className?: string; style?: CSSProperties }) => (
  <div className={`a ${className}`} style={{ ...style, ['--i' as string]: i }}>{children}</div>
)

const nombreSlide = (s: Slide) =>
  s.tipo === 'portada' ? 'Portada' : s.tipo === 'pregunta' ? 'Pregunta' : s.tipo === 'revelacion' ? s.nombre : s.tipo === 'final' ? s.titulo : s.kicker

/** Desde la revelación del nombre, el QR a la demo se queda en una esquina (salvo en la llamada final, que lleva el QR a la web). */
const INICIO_QR_ESQUINA = SLIDES.findIndex((s) => s.tipo === 'revelacion')
const conQrEsquina = (s: Slide, i: number) => INICIO_QR_ESQUINA >= 0 && i >= INICIO_QR_ESQUINA && s.tipo !== 'cta'

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
            <span><b>Fecha</b>{EVENTO.fecha}</span>
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
          <div className="s-answer a"><NovaMark size="1em" className="" />{s.remate}</div>
        </div>
      )
    case 'accion': {
      const url = s.destino === 'web' ? urlBase(SITIO_URL) : urlDemo(s.destino)
      return (
        <div className="s-action">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <A i={0} className="s-badge"><span>●</span> Punto de acción</A>
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
          <A i={0}><span className="s-reveal-antes">{s.antes}</span></A>
          <A i={1}><div className="s-reveal-nombre">{s.nombre}</div></A>
          <A i={2} className="s-reveal-piedras" ><span /><span /><span /></A>
          <A i={3}><p className="s-reveal-def">{s.definicion}</p></A>
          <A i={4}><p className="s-fuente">{s.fuente}</p></A>
        </div>
      )
    case 'pareja':
      return (
        <div className="s-pareja">
          <A i={0}><span className="s-kicker">{s.kicker}</span></A>
          <div className="s-pareja-cols">
            <A i={1} className="s-pareja-prob">
              <span className="s-pareja-et">El problema</span>
              <b className="s-pareja-tit">{s.problema.titulo}</b>
              <span className="s-pareja-valor">{s.problema.valor}</span>
              <span className="s-pareja-etq">{s.problema.etiqueta}</span>
            </A>
            <A i={2} className="s-pareja-flecha"><Icon name="arrow" size={28} /></A>
            <A i={3} className="s-pareja-sol">
              <span className="s-pareja-et">Con Tenique</span>
              <b className="s-pareja-tit">{s.solucion.titulo}</b>
              <ul>{s.solucion.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
            </A>
          </div>
          <A i={4}><p className="s-fuente">{s.fuente}</p></A>
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
            <A i={6}><div className="s-fogon-lema">{s.lema}</div></A>
          </div>
          <A i={5} className="s-fogon-dibujo"><FogonDibujo nombres={s.piedras.map((p) => p.nombre)} /></A>
        </div>
      )
    case 'final':
      return (
        <div className="s-final">
          <A i={0}><div className="s-mega">{s.titulo}</div></A>
          <A i={1}><div className="s-final-sub">{s.subtitulo}</div></A>
          <A i={2} className="s-final-equipo">
            <b>Equipo {EQUIPO_NOMBRE}</b>
            <span>{EQUIPO.map((m) => m.nombre.split(' ').slice(0, 1).join(' ')).join(' · ')}</span>
          </A>
        </div>
      )
    case 'cta': {
      const base = urlBase(SITIO_URL)
      const picks = DESTACADOS.map((d) => ({ ...d, s: SECCIONES.find((x) => x.id === d.id) })).filter((d) => d.s)
      return (
        <div className="s-action" style={{ alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <A i={0} className="s-badge"><span>●</span> Punto de acción</A>
            <A i={1}><span className="s-kicker">{s.kicker}</span></A>
            <A i={2}><div className="s-title" style={{ fontSize: '3.4cqw' }}>{s.titulo}</div></A>
            <div className="s-picks">
              {picks.map((p, n) => (
                <A key={p.id} i={3 + n} className="s-pick"><i>{n + 1}</i><div><b>{p.s!.titulo}</b>{!tieneRelleno(p.motivo) && <span>{p.motivo}</span>}</div></A>
              ))}
            </div>
          </div>
          <A i={6} style={{ alignSelf: 'center' }}>
            <Qr url={base} />
            <div className="s-qr-cap">{s.texto}</div>
          </A>
        </div>
      )
    }
  }
}

/** Caldero sobre tres piedras con el fuego encendido. Solo SVG y tokens de marca. */
function FogonDibujo({ nombres }: { nombres: string[] }) {
  return (
    <svg viewBox="0 0 320 260" role="img" aria-label={`Caldero sobre tres piedras: ${nombres.join(', ')}`}>
      <defs>
        <radialGradient id="s-fuego" cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".35" stopColor="var(--nova-hot)" />
          <stop offset=".7" stopColor="var(--accent-fill)" />
          <stop offset="1" stopColor="var(--accent-fill)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="196" rx="70" ry="44" fill="url(#s-fuego)" className="s-fogon-llama" />
      <path d="M78 92h164l-14 72c-4 20-24 32-68 32s-64-12-68-32z" fill="var(--night-2)" stroke="var(--text-2)" strokeWidth="3" />
      <path d="M70 92h180" stroke="var(--text-2)" strokeWidth="6" strokeLinecap="round" />
      <path d="M128 70c0-14 10-18 6-30M160 66c0-14 10-18 6-30M192 70c0-14 10-18 6-30" stroke="var(--muted)" strokeWidth="3" fill="none" strokeLinecap="round" className="s-fogon-vapor" />
      <g fill="var(--line-2)" stroke="var(--text-2)" strokeWidth="2">
        <ellipse cx="66" cy="214" rx="42" ry="26" />
        <ellipse cx="254" cy="214" rx="42" ry="26" />
        <ellipse cx="160" cy="232" rx="42" ry="22" />
      </g>
      <g fontFamily="var(--font)" fontSize="13" fontWeight="600" fill="var(--text)" textAnchor="middle">
        <text x="66" y="219">{nombres[0]}</text>
        <text x="254" y="219">{nombres[2]}</text>
        <text x="160" y="237">{nombres[1]}</text>
      </g>
    </svg>
  )
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
    <div className={`slide ${dir && dir < 0 ? 'back' : ''}`}>
      {conQrEsquina(s, i) && <QrEsquina />}
      {(s.tipo === 'portada' || s.tipo === 'cta' || s.tipo === 'final') && (
        <img className="s-logo" src={import.meta.env.BASE_URL + 'img/marca/turismo-tenerife-blanco.png'} alt="Turismo de Tenerife" />
      )}
      <Contenido s={s} />
      {!sinPie && (
        <div className="s-foot">
          <span className="wordmark"><NovaMark size="1.1em" className="" />{EQUIPO_NOMBRE.toLowerCase()}</span>
          <span className="tnum">{String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</span>
        </div>
      )}
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
        <p>Pitch de 5 minutos: pregunta-gancho, la demo en el móvil del jurado, Tenique, cuatro problemas con su solución, las tres piedras y qué revisar. Flechas para avanzar, <span className="code">F</span> pantalla completa.</p>
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
