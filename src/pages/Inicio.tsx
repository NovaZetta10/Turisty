import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EQUIPO, EQUIPO_NOMBRE, EVENTO, ESTADO_TXT, PREVIEW, RETO, SECCIONES } from '../config/proyecto'
import { Icon } from '../components/Icon'
import { Avatar } from '../components/Avatar'

const TAG: Record<string, string> = { listo: 'ok', 'en-curso': 'warn', pendiente: 'off' }

function Preview() {
  const [falla, setFalla] = useState(false)
  return (
    <div className="preview enter enter-2">
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
            <span className="small">Aquí irá el vídeo de preview. Guárdalo como <span className="code" style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}>public/{PREVIEW.video}</span></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Inicio() {
  const secciones = SECCIONES.filter((s) => s.visible)
  return (
    <div className="wrap">
      <section className="hero">
        <div className="enter">
          <span className="kicker">{EVENTO.nombre} · {EVENTO.fecha}</span>
          <h1>Equipo {EQUIPO_NOMBRE}<span className="star">.</span></h1>
          <p className="lead">{RETO.definido ? RETO.contexto : 'Nuestra propuesta para el reto de turismo. Aquí reunimos la investigación, los usuarios, el prototipo y la presentación.'}</p>
          <div className="hero-actions">
            {secciones[0] && <Link className="btn primary" to={secciones[0].ruta}>Empezar por {secciones[0].corto.toLowerCase()} <Icon name="arrow" /></Link>}
            <a className="btn" href="#equipo">Conoce al equipo</a>
          </div>
        </div>
        <Preview />
      </section>

      <section className="section">
        <div className="card reto-card enter enter-3">
          <span className="kicker">El reto {RETO.definido ? `· ${RETO.empresa}` : ''}</span>
          {RETO.definido ? (
            <>
              <h3>{RETO.titulo}</h3>
              <p style={{ fontSize: 17 }}>{RETO.pregunta}</p>
            </>
          ) : (
            <>
              <h3>Reto por anunciar</h3>
              <p className="muted">La empresa y la pregunta se conocen el día del arranque. Cuando lleguen, se cambian en <span className="code">src/config/proyecto.ts</span> y toda la web se actualiza.</p>
            </>
          )}
          {(RETO.criterios.length > 0 || RETO.entregablesPedidos.length > 0) && (
            <div className="grid g2" style={{ marginTop: 16 }}>
              {RETO.criterios.length > 0 && (
                <div>
                  <div className="col-t">Criterios de evaluación</div>
                  <ul className="list">{RETO.criterios.map((c) => <li key={c.nombre}>{c.nombre} <span className="muted tnum">· {c.peso} %</span></li>)}</ul>
                </div>
              )}
              {RETO.entregablesPedidos.length > 0 && (
                <div>
                  <div className="col-t">Entregables pedidos</div>
                  <ul className="list">{RETO.entregablesPedidos.map((e) => <li key={e}>{e}</li>)}</ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>Entregables</h2>
            <p>El estado de cada parte. Se actualiza en la configuración a medida que avanzamos.</p>
          </div>
        </div>
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

      <section className="section" id="equipo" style={{ scrollMarginTop: 80 }}>
        <div className="section-head">
          <div>
            <h2>Conoce al equipo</h2>
            <p>Quiénes somos y qué aporta cada uno a {EQUIPO_NOMBRE}.</p>
          </div>
        </div>
        <div className="grid g4">
          {EQUIPO.map((m) => (
            <article key={m.nombre} className="card member">
              <Avatar m={m} />
              <h3>{m.nombre}</h3>
              <div className="rol">{m.rol || <span className="placeholder">Rol por completar</span>}</div>
              <div className="estudios">{m.estudios || <span className="placeholder">Estudios por completar</span>}</div>
              <div className="links">
                {m.linkedin && <a className="btn sm" href={m.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={14} />LinkedIn</a>}
                {m.github && <a className="btn sm" href={`https://github.com/${m.github}`} target="_blank" rel="noreferrer"><Icon name="github" size={14} />GitHub</a>}
                {m.web && <a className="btn sm" href={m.web} target="_blank" rel="noreferrer"><Icon name="globe" size={14} />Web</a>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
