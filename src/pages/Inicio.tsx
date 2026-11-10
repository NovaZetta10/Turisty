import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EQUIPO, EQUIPO_NOMBRE, EVENTO, ESTADO_TXT, PREVIEW, RETO, SECCIONES } from '../config/proyecto'
import { Icon } from '../components/Icon'
import { Avatar } from '../components/Avatar'
import { NovaMark } from '../components/NovaMark'

const TAG: Record<string, string> = { listo: 'ok', 'en-curso': 'warn', pendiente: 'off' }

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
            <span className="small">Hueco para el vídeo: guárdalo como <span className="code">public/{PREVIEW.video}</span></span>
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
          Canarias tiene uno de los cielos más limpios del planeta. Nosotros venimos a buscarle una luz nueva a lo que ya conocemos.
        </p>
        <div className="hero-actions enter enter-4">
          {secciones[0] && <Link className="btn primary" to={secciones[0].ruta}>Ver {secciones[0].corto.toLowerCase()} <Icon name="arrow" /></Link>}
          <Link className="btn" to="/presentacion">Presentación</Link>
        </div>

        <div className="constellation enter enter-5" id="equipo">
          <div className="section-head"><div><h2>Conoce al equipo</h2><p>Cuatro perfiles distintos, una constelación.</p></div></div>
          <div style={{ position: 'relative' }}>
            <Constelacion n={EQUIPO.length} />
            <div className="grid g4">
              {EQUIPO.map((m) => (
                <article key={m.nombre} className="card member">
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
                </article>
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
              <p className="muted">La empresa y la pregunta se conocen el día del arranque. Se cambian en <span className="code">src/config/proyecto.ts</span> y toda la web se actualiza.</p>
            </>
          )}
          {RETO.criterios.length > 0 && (
            <div>
              <div className="col-t" style={{ marginTop: 6 }}>Criterios de evaluación</div>
              <ul className="list">{RETO.criterios.map((c) => <li key={c.nombre}>{c.nombre} <span className="muted tnum">· {c.peso} %</span></li>)}</ul>
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
        <div className="section-head"><div><h2>Entregables</h2><p>El estado de cada parte.</p></div></div>
        <div className="grid g4">
          {secciones.map((s, i) => (
            <Link key={s.id} to={s.ruta} className="card link-card sec-card">
              <div className="top">
                <span className="num">0{i + 1}</span>
                <span className={`tag ${TAG[s.estado]}`}><span className="dot" />{ESTADO_TXT[s.estado]}</span>
              </div>
              <h3>{s.titulo}</h3>
              <p>{s.resumen}</p>
              <span className="go">Abrir <Icon name="arrow" size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
