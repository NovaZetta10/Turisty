import { useCallback, useEffect, useRef, useState } from 'react'
import { SLIDES, type Slide } from '../data/presentacion'
import { EQUIPO, EQUIPO_NOMBRE, EVENTO } from '../config/proyecto'
import { Icon } from '../components/Icon'
import { Avatar } from '../components/Avatar'

const Marca = () => (
  <span className="s-brand">
    <svg width="1.6em" height="1.6em" viewBox="0 0 24 24"><path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" fill="#f2b33d" /></svg>
    {EQUIPO_NOMBRE}
  </span>
)

const nombreSlide = (s: Slide) => ('kicker' in s ? s.kicker : s.tipo === 'portada' ? 'Portada' : s.tipo === 'equipo' ? 'Equipo' : 'Cierre')

function Contenido({ s }: { s: Slide }) {
  switch (s.tipo) {
    case 'portada':
      return (
        <>
          <div className="slide-glow" />
          <Marca />
          <div style={{ marginTop: 'auto', position: 'relative' }}>
            <div className="s-big">{s.titulo}</div>
            <div className="s-sub">{s.subtitulo}</div>
            {s.nota && <div className="s-note" style={{ marginTop: '2cqw' }}>{s.nota}</div>}
          </div>
        </>
      )
    case 'cierre':
      return (
        <>
          <div className="slide-glow" />
          <Marca />
          <div style={{ margin: 'auto 0', position: 'relative' }}>
            <div className="s-big">{s.titulo}</div>
            <div className="s-sub">{s.subtitulo}</div>
          </div>
        </>
      )
    case 'equipo':
      return (
        <>
          <span className="s-kicker">Equipo</span>
          <h2>{s.titulo}</h2>
          <div className="s-equipo">
            {EQUIPO.map((m) => (
              <div key={m.nombre} className="s-m">
                <Avatar m={m} className="av" />
                <b>{m.nombre}</b>
                <span>{m.rol || m.estudios}</span>
              </div>
            ))}
          </div>
        </>
      )
    case 'texto':
      return (
        <>
          <span className="s-kicker">{s.kicker}</span>
          <h2>{s.titulo}</h2>
          {s.puntos && <ul>{s.puntos.map((p) => <li key={p}>{p}</li>)}</ul>}
          {s.nota && <div className="s-note">{s.nota}</div>}
        </>
      )
    case 'cifras':
      return (
        <>
          <span className="s-kicker">{s.kicker}</span>
          <h2>{s.titulo}</h2>
          <div className="s-cifras">{s.cifras.map((c) => <div key={c.etiqueta} className="s-cifra"><b>{c.valor}</b><span>{c.etiqueta}</span></div>)}</div>
          {s.fuente && <div className="s-note" style={{ marginTop: '2.5cqw' }}>Fuente: {s.fuente}</div>}
        </>
      )
    case 'pasos':
      return (
        <>
          <span className="s-kicker">{s.kicker}</span>
          <h2>{s.titulo}</h2>
          <div className="s-pasos">{s.pasos.map((p, i) => <div key={p.titulo} className="s-paso"><i>0{i + 1}</i><b>{p.titulo}</b><p>{p.texto}</p></div>)}</div>
        </>
      )
  }
}

function SlideView({ s, i, dir }: { s: Slide; i: number; dir?: number }) {
  const dark = s.tipo === 'portada' || s.tipo === 'cierre'
  return (
    <div className={`slide ${dark ? 'dark' : ''} ${dir && dir < 0 ? 'back' : ''}`}>
      <Contenido s={s} />
      {!dark && <div className="s-pie"><span>{EQUIPO_NOMBRE} · {EVENTO.nombre}</span><span className="tnum">{i + 1} / {SLIDES.length}</span></div>}
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

  const pantalla = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else stage.current?.requestFullscreen?.()
  }

  // deslizar en móvil
  const x0 = useRef<number | null>(null)

  return (
    <div className="wrap">
      <header className="page-head enter no-print">
        <span className="kicker">Entregable · pitch</span>
        <h1>Presentación</h1>
        <p>Diapositivas en el navegador. Flechas del teclado para avanzar, <span className="code">F</span> para pantalla completa, y «Exportar PDF» para imprimirlas una por página.</p>
      </header>

      <div className="deck-bar">
        <span className="count">Diapositiva {i + 1} de {SLIDES.length} · {nombreSlide(SLIDES[i])}</span>
        <button className="btn sm" onClick={() => ir(i - 1)} disabled={i === 0} aria-label="Anterior"><Icon name="left" /></button>
        <button className="btn sm" onClick={() => ir(i + 1)} disabled={i === SLIDES.length - 1} aria-label="Siguiente"><Icon name="right" /></button>
        <button className="btn sm" onClick={pantalla}><Icon name="expand" size={14} />Pantalla completa</button>
        <button className="btn sm" onClick={() => window.print()}><Icon name="print" size={14} />Exportar PDF</button>
      </div>

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
            <b>{String(n + 1).padStart(2, '0')}</b>{nombreSlide(s)}
          </button>
        ))}
      </div>

      <div className="print-deck">
        {SLIDES.map((s, n) => <div key={n} className="stage"><SlideView s={s} i={n} /></div>)}
      </div>
    </div>
  )
}
