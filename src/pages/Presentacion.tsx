import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { SLIDES, type Slide } from '../data/presentacion'
import { DESTACADOS, EQUIPO, EQUIPO_NOMBRE, EVENTO, PROTOTIPO, RETO, SECCIONES, SITIO_URL, rutaDe } from '../config/proyecto'
import { Icon } from '../components/Icon'
import { NovaMark } from '../components/NovaMark'
import { Qr, urlBase } from '../components/Qr'
import { tieneRelleno } from '../config/relleno'

const A = ({ i, children, className = '', style }: { i: number; children: React.ReactNode; className?: string; style?: CSSProperties }) => (
  <div className={`a ${className}`} style={{ ...style, ['--i' as string]: i }}>{children}</div>
)

const nombreSlide = (s: Slide) => (s.tipo === 'portada' ? 'Portada' : s.tipo === 'pregunta' ? 'Pregunta' : s.kicker)

function urlDemo() {
  const base = urlBase(SITIO_URL)
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
          <A i={0}><div className="s-mega">{s.antes} <em>{s.destacado}</em>{s.despues ? ` ${s.despues}` : ''}</div></A>
          <div className="s-answer a"><NovaMark size="1em" className="" />{s.remate}</div>
        </div>
      )
    case 'accion': {
      const url = s.destino === 'prototipo' ? urlDemo() : urlBase(SITIO_URL)
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
            <A i={7} className="s-team"><b>Equipo {EQUIPO_NOMBRE}</b> · {EQUIPO.map((m) => m.nombre.split(' ')[0]).join(' · ')}</A>
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

function SlideView({ s, i, dir }: { s: Slide; i: number; dir?: number }) {
  const sinPie = s.tipo === 'portada' || s.tipo === 'pregunta'
  return (
    <div className={`slide ${dir && dir < 0 ? 'back' : ''}`}>
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
        <p>Pitch de 5 minutos: portada del reto, pregunta-gancho, la demo en el móvil del jurado, problema, solución y qué revisar. Flechas para avanzar, <span className="code">F</span> pantalla completa.</p>
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
