import { PROTOTIPO } from '../config/proyecto'
import { Icon } from '../components/Icon'

export default function Prototipo() {
  const hay = PROTOTIPO.url.trim() !== ''
  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Entregable · prototipo</span>
        <h1>La solución, navegable</h1>
        <p>{hay ? 'Pruébalo aquí mismo o ábrelo en una pestaña nueva para verlo a pantalla completa.' : 'Este hueco está reservado para el prototipo. En cuanto exista, se enlaza desde la configuración.'}</p>
      </header>

      {hay ? (
        <>
          <div className="deck-bar">
            <span className="count">{PROTOTIPO.url}</span>
            <a className="btn primary" href={PROTOTIPO.url} target="_blank" rel="noreferrer">Abrir en pestaña nueva <Icon name="external" /></a>
          </div>
          {PROTOTIPO.embebible ? (
            <div className="frame enter enter-2"><iframe src={PROTOTIPO.url} title="Prototipo" allow="fullscreen; clipboard-write" loading="lazy" /></div>
          ) : (
            <div className="empty"><div><Icon name="box" size={28} /><h3>Este prototipo se abre fuera</h3><p>La herramienta no permite mostrarlo dentro de la página. Usa el botón de arriba.</p></div></div>
          )}
          {PROTOTIPO.notas.length > 0 && (
            <div className="card" style={{ marginTop: 16 }}>
              <div className="col-t">Cómo probarlo</div>
              <ul className="list">{PROTOTIPO.notas.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          )}
        </>
      ) : (
        <div className="empty enter enter-2">
          <div>
            <Icon name="box" size={32} />
            <h3>Prototipo pendiente</h3>
            <p>Pega la URL en <span className="code">PROTOTIPO.url</span> dentro de <span className="code">src/config/proyecto.ts</span>. Sirve un enlace de Figma, otra web desplegada o una ruta de esta misma web.</p>
          </div>
        </div>
      )}
    </div>
  )
}
