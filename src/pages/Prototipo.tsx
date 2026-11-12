import { Link } from 'react-router-dom'
import { PROTOTIPO, SITIO_URL } from '../config/proyecto'
import { Icon } from '../components/Icon'
import { Qr, urlBase } from '../components/Qr'
import { Vacio } from '../components/Vacio'
import { Movil } from '../prototipo/Movil'

function Notas() {
  if (PROTOTIPO.notas.length === 0) return null
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div className="col-t">Cómo probarlo</div>
      <ul className="list">{PROTOTIPO.notas.map((n) => <li key={n}>{n}</li>)}</ul>
    </div>
  )
}

/** Prototipo hecho en esta web (src/prototipo): teléfono interactivo + QR para abrirlo en el móvil. */
function Interno() {
  const url = urlBase(SITIO_URL) + PROTOTIPO.url
  return (
    <div className="proto-interno enter enter-2">
      <Movil />
      <aside className="proto-lado">
        <div className="card">
          <div className="col-t">Pruébalo en tu móvil</div>
          <Qr url={url} className="proto-qr" />
          <p className="small muted" style={{ overflowWrap: 'anywhere' }}>{url.replace(/^https?:\/\//, '')}</p>
          <Link className="btn primary" to="/app" style={{ marginTop: 12 }}>Pantalla completa <Icon name="expand" size={14} /></Link>
        </div>
        <Notas />
      </aside>
    </div>
  )
}

function Externo() {
  return (
    <>
      <div className="deck-bar">
        <span className="count" style={{ overflowWrap: 'anywhere' }}>{PROTOTIPO.url}</span>
        <a className="btn primary" href={PROTOTIPO.url} target="_blank" rel="noreferrer">Abrir en pestaña nueva <Icon name="external" /></a>
      </div>
      {PROTOTIPO.embebible ? (
        <div className="frame enter enter-2"><iframe src={PROTOTIPO.url} title="Prototipo" allow="fullscreen; clipboard-write" loading="lazy" /></div>
      ) : (
        <Vacio titulo="Este prototipo se abre fuera">La herramienta no permite mostrarlo dentro de la página. Usa el botón de arriba.</Vacio>
      )}
      <Notas />
    </>
  )
}

export default function Prototipo() {
  const url = PROTOTIPO.url.trim()
  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Entregable · prototipo</span>
        <h1>La solución, navegable</h1>
        <p>{url ? 'Pruébalo aquí mismo o ábrelo a pantalla completa.' : 'Aquí se podrá probar la solución, en el navegador o en el móvil.'}</p>
      </header>

      {url.startsWith('#') ? <Interno /> : url ? <Externo /> : (
        <Vacio
          titulo="Prototipo en preparación"
          interno={<>Para el prototipo hecho en esta web, construye las pantallas en <span className="code">src/prototipo/pantallas.tsx</span> y pon <span className="code">PROTOTIPO.url = '#/app'</span> en <span className="code">src/config/proyecto.ts</span>. Para uno externo (Figma, otra web), pega su URL.</>}
        >
          Aquí se podrá probar la solución en cuanto esté lista.
        </Vacio>
      )}
    </div>
  )
}
