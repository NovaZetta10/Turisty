import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EQUIPO, EQUIPO_NOMBRE, EVENTO, PREVIEW, RETO, SECCIONES, rutaDe } from '../config/proyecto'
import { Icon } from '../components/Icon'
import { Avatar } from '../components/Avatar'
import { NovaMark } from '../components/NovaMark'
import { Tilt } from '../components/Tilt'
import { SoloLocal } from '../components/Vacio'
import { Refs } from '../components/Refs'
import { FUENTE_TENIQUE } from '../data/investigacion'

function Preview() {
  const [falla, setFalla] = useState(false)
  return (
    <div className="preview">
      {!falla && (
        <video src={PREVIEW.video} poster={PREVIEW.poster || undefined} controls playsInline preload="metadata" onError={() => setFalla(true)}>
          <source src={PREVIEW.video} type="video/mp4" onError={() => setFalla(true)} />
        </video>
      )}
      {falla && (
        <div className="preview-empty">
          <div>
            <div className="preview-play"><Icon name="play" size={22} fill /></div>
            <b>{PREVIEW.titulo}</b>
            <span className="small">Vídeo en preparación.</span>
            <SoloLocal>Guárdalo como <span className="code">public/{PREVIEW.video}</span></SoloLocal>
          </div>
        </div>
      )}
    </div>
  )
}

/** Líneas que unen a los miembros como una constelación (solo en escritorio). */
function Constelacion({ n }: { n: number }) {
  const pts = Array.from({ length: n }, (_, i) => [((i + 0.5) / n) * 100, i % 2 ? 70 : 30])
  return (
    <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="rgba(255,210,122,.35)" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export default function Inicio() {
  const secciones = SECCIONES.filter((s) => s.visible)
  return (
    <div className="wrap">
      <section className="hero">
        <span className="kicker enter">{EVENTO.nombre} · {EVENTO.fecha}</span>
        <h1 className="hero-word enter" aria-label={EQUIPO_NOMBRE}>
          {EQUIPO_NOMBRE.toLowerCase()}
          <span className="burst"><NovaMark size="100%" className="" /></span>
        </h1>
        <p className="definition enter enter-2">
          <b>nova</b> <i>(del latín <i>stella nova</i>, «estrella nueva»)</i>: estrella que, de repente, brilla miles de veces más de lo habitual.
        </p>
        <p className="definition enter enter-3">
          Bajo el cielo de Tenerife venimos a buscarle una luz nueva a lo que ya conocemos: cómo convivimos quienes vivimos aquí y quienes nos visitan.
        </p>
        <div className="hero-actions enter enter-4">
          <Link className="btn primary" to={rutaDe('prototipo')}>Conoce Tenique <Icon name="arrow" /></Link>
          {secciones[0] && <Link className="btn" to={secciones[0].ruta}>{secciones[0].corto}</Link>}
          <Link className="btn" to={rutaDe('presentacion')}>Presentación</Link>
        </div>

        <div className="constellation enter enter-5" id="equipo">
          <div className="section-head"><div><h2>Conoce al equipo</h2><p>Cuatro perfiles distintos, una constelación.</p></div></div>
          <div style={{ position: 'relative' }}>
            <Constelacion n={EQUIPO.length} />
            <div className="grid g4">
              {EQUIPO.map((m) => (
                <Tilt key={m.nombre} className="card member">
                  <Avatar m={m} />
                  <h3>{m.nombre}</h3>
                  <div className="rol">{m.rol || <span className="placeholder">Rol por completar</span>}</div>
                  <div className="estudios">{m.estudios || <span className="placeholder">Estudios por completar</span>}</div>
                  {(m.linkedin || m.github || m.web) && (
                    <div className="links">
                      {m.linkedin && <a className="btn sm" href={m.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={14} />LinkedIn</a>}
                      {m.github && <a className="btn sm" href={`https://github.com/${m.github}`} target="_blank" rel="noreferrer"><Icon name="github" size={14} />GitHub</a>}
                      {m.web && <a className="btn sm" href={m.web} target="_blank" rel="noreferrer"><Icon name="globe" size={14} />Web</a>}
                    </div>
                  )}
                </Tilt>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section split">
        <div className="card reto-card">
          <span className="kicker">El reto{RETO.definido ? ` · ${RETO.empresa}` : ''}</span>
          {RETO.definido ? (
            <>
              <h3>{RETO.titulo}</h3>
              <p style={{ fontSize: 17, color: 'var(--text-2)' }}>{RETO.pregunta}</p>
            </>
          ) : (
            <>
              <h3>Reto por anunciar</h3>
              <p className="muted">La empresa y la pregunta se conocen el día del arranque.</p>
              <SoloLocal>Se cambian en <span className="code">src/config/proyecto.ts</span> y toda la web se actualiza.</SoloLocal>
            </>
          )}
          {RETO.criterios.length > 0 && (
            <div>
              <div className="col-t" style={{ marginTop: 6 }}>Criterios de evaluación</div>
              <ul className="list">{RETO.criterios.map((c) => <li key={c.nombre}>{c.nombre}{c.peso != null && <span className="muted tnum"> · {c.peso} %</span>}</li>)}</ul>
            </div>
          )}
          {RETO.entregablesPedidos.length > 0 && (
            <div>
              <div className="col-t" style={{ marginTop: 6 }}>Entregables pedidos</div>
              <ul className="list">{RETO.entregablesPedidos.map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          )}
        </div>
        <Preview />
      </section>

      <section className="section">
        <Link to={rutaDe('prototipo')} className="card link-card tenique-card">
          <span className="kicker">Nuestra propuesta</span>
          <h2>Tenique</h2>
          <p className="tenique-def">
            <b>tenique</b> <i>(canarismo)</i>: cada una de las tres piedras con que se hace un hogar rústico, que sirven para sustentar un tostador, una olla o cualquier otro recipiente.
            <span className="muted small"> · Academia Canaria de la Lengua</span><Refs ids={[FUENTE_TENIQUE]} />
          </p>
          <p className="tenique-lema">Un fogón no se sostiene con una piedra ni con dos. Tenerife tampoco: vecinos, visitantes e instituciones. <b>Tenerife se cocina entre todos.</b></p>
          <p className="tenique-def">Tenique es un programa estable, no una campaña: experiencias reales que vecinos y visitantes comparten en toda la isla. Funciona con personas (anfitriones y mediadores), con puntos físicos para quien no usa el móvil y con una app para descubrirlas por la emoción que buscas. Cada experiencia deja valor en su barrio, y se ve.</p>
          <span className="tj-go">Ver la propuesta <Icon name="arrow" size={14} /></span>
        </Link>
      </section>
    </div>
  )
}
