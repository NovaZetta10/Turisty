// Pestaña «Más allá del piloto»: ideas y ambiciones fuera del MVP. Dueño: subagente de investigación.
// Datos en src/data/futuro.ts. Aquí solo maquetación.
import { Link } from 'react-router-dom'
import { SECCIONES, rutaDe } from '../config/proyecto'
import { HORIZONTES, IDEAS } from '../data/futuro'
import { Icon } from '../components/Icon'
import { Refs } from '../components/Refs'
import '../styles/futuro.css'

const ID = 'futuro'

export default function Futuro() {
  const s = SECCIONES.find((x) => x.id === ID)
  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Visión · más allá del piloto</span>
        <h1>{s?.titulo}</h1>
        <p>{s?.resumen}</p>
      </header>

      <p className="nota fut-aviso enter enter-2"><Icon name="alert" size={14} /> Son ideas, no compromisos. Ninguna forma parte del piloto ni de su presupuesto. Cada una lleva un caso real que la inspira, con su fuente.</p>

      <ol className="fut-linea enter enter-2" aria-label="Horizontes">
        {HORIZONTES.map((h, n) => (
          <li key={h.id}><a href={`#${rutaDe(ID)}`} onClick={(e) => { e.preventDefault(); document.getElementById(`h-${h.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
            <span className="fut-n">{n + 1}</span><b>{h.titulo}</b><small>{h.cuando}</small>
          </a></li>
        ))}
      </ol>

      {HORIZONTES.map((h) => (
        <section key={h.id} id={`h-${h.id}`} className={`section fut-h fut-${h.id}`}>
          <div className="section-head"><div><span className="kicker">{h.cuando}</span><h2>{h.titulo}</h2><p>{h.texto}</p></div></div>
          <div className="grid g3">
            {IDEAS.filter((i) => i.horizonte === h.id).map((i) => (
              <article key={i.id} className="card fut-idea">
                <span className="fut-ico" aria-hidden="true"><Icon name={i.icono} size={18} /></span>
                <h3>{i.titulo}</h3>
                <p>{i.que}</p>
                <div className="fut-bloque">
                  <div className="kicker">Qué haría falta</div>
                  <ul className="list small">{i.hariaFalta.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <p className="small fut-riesgo"><b>Riesgo:</b> {i.riesgo}</p>
                {i.referente && (
                  <div className="fut-ref">
                    <span className="small muted">Inspira</span>
                    <b>{i.referente.nombre}</b>
                    <span className="small">{i.referente.texto} <Refs ids={i.referente.fuentes} /></span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="section">
        <div className="card fut-cierre">
          <p>Todo empieza por el piloto: si no mejora la convivencia en tres municipios, nada de esto tiene sentido.</p>
          <Link className="btn primary" to={rutaDe('viabilidad')}>Ver el plan de acción <Icon name="arrow" size={14} /></Link>
        </div>
      </section>
    </div>
  )
}
