import { Icon } from '../components/Icon'
import { Refs } from '../components/Refs'
import { CAMPANA, CANALES, HITOS, INDICADORES, PRINCIPIO, PUBLICOS, SIN_CONEXION } from '../data/comunicacion'
import '../styles/comunicacion.css'

/** Plan de comunicación de Tenique y alternativas sin conexión. Sección sin .wrap: la coloca la pestaña Tenique. */
export default function Comunicacion() {
  return (
    <section className="cm" aria-labelledby="cm-titulo">
      <div className="section-head">
        <div>
          <span className="kicker">Plan de comunicación</span>
          <h2 id="cm-titulo">{PRINCIPIO.titulo}</h2>
          <p>{PRINCIPIO.texto}</p>
        </div>
      </div>

      <h3 className="cm-sub">Un mensaje para cada público</h3>
      <div className="cm-publicos">
        {PUBLICOS.map((p) => (
          <article key={p.id} className="card cm-publico">
            <span className="kicker"><Icon name={p.icono} size={14} />{p.nombre}</span>
            <p className="cm-frase">«{p.frase}»</p>
            <p className="small"><b>Tono.</b> {p.tono}</p>
            <p className="small muted"><b>Dónde.</b> {p.canales}</p>
          </article>
        ))}
      </div>

      <h3 className="cm-sub">Canales</h3>
      <ul className="cm-canales">
        {CANALES.map((c) => (
          <li key={c.id} className="cm-canal">
            <span className="cm-ico"><Icon name={c.icono} size={18} /></span>
            <div>
              <b>{c.nombre}</b>
              <p>{c.que}</p>
              <span className="cm-quien">{c.quien}</span>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="cm-sub">Momentos que se cuentan</h3>
      <ol className="cm-hitos">
        {HITOS.map((h, n) => (
          <li key={n} className={`cm-hito cm-t-${h.tipo}`}>
            <span className="cm-mes">Mes {h.mes}</span>
            <b>{h.nombre}</b>
            <p>{h.que}</p>
          </li>
        ))}
      </ol>

      <div className="card cm-campana">
        <span className="kicker">Campaña de lanzamiento · da a conocer acciones reales, no es la solución</span>
        <p className="cm-lema">{CAMPANA.lema}</p>
        <p>{CAMPANA.concepto}</p>
        <p className="small muted">{CAMPANA.marca} <Refs ids={CAMPANA.marcaFuentes} /></p>
        <div className="cm-piezas">
          {CAMPANA.piezas.map((p) => (
            <div key={p.titulo} className="cm-pieza">
              <span className="cm-ico"><Icon name={p.icono} size={18} /></span>
              <b>{p.titulo}</b>
              <p>{p.texto}</p>
              <span className="cm-quien">{p.cuando}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="cm-offline">
        <div className="cm-offline-head">
          <span className="kicker">Sin conexión</span>
          <h3>Para quien no está en redes ni usa el móvil</h3>
          <p>Todo lo que se hace en la app se puede hacer sin ella: enterarse, reservar, ser anfitrión y votar el fondo.</p>
        </div>
        <div className="cm-offline-grid">
          {SIN_CONEXION.map((s) => (
            <article key={s.id} className="cm-off">
              <span className="cm-ico"><Icon name={s.icono} size={18} /></span>
              <b>{s.nombre}{s.propuesta && <span className="tag warn cm-tag">Propuesta</span>}</b>
              <p>{s.que}</p>
              <dl>
                <dt>Llega a</dt><dd>{s.aQuien}</dd>
                <dt>Lo gestiona</dt><dd>{s.quien}</dd>
              </dl>
            </article>
          ))}
        </div>
      </div>

      <h3 className="cm-sub">Cómo sabremos si funciona</h3>
      <div className="cm-indicadores">
        {INDICADORES.map((k) => (
          <div key={k.nombre} className="card cm-ind">
            <b>{k.nombre}</b>
            <p className="small">{k.comoSeMide}</p>
            <p className="small muted"><b>Objetivo{k.supuesto ? ' (supuesto)' : ''}.</b> {k.objetivo}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
