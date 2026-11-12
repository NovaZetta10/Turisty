import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROTOTIPO, SITIO_URL, rutaDe } from '../config/proyecto'
import { Refs } from '../components/Refs'
import { FUENTE_TENIQUE } from '../data/investigacion'
import { Icon } from '../components/Icon'
import { Qr, urlBase } from '../components/Qr'
import { Vacio } from '../components/Vacio'
import { Movil } from '../prototipo/Movil'
import { CuatroPerfiles } from '../prototipo/CuatroPerfiles'

function Notas() {
  if (PROTOTIPO.notas.length === 0) return null
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <div className="col-t">Cómo probarlo</div>
      <ul className="list">{PROTOTIPO.notas.map((n) => <li key={n}>{n}</li>)}</ul>
    </div>
  )
}

/** Prototipo hecho en esta web (src/prototipo): «Pruébalo» (teléfono + QR) o «Los 4 perfiles» (cuatro teléfonos a la vez). */
function Interno() {
  const [vista, setVista] = useState<'prueba' | 'perfiles'>('prueba')
  return (
    <>
      <div className="chips proto-vistas" role="tablist" aria-label="Vista del prototipo">
        <button role="tab" aria-selected={vista === 'prueba'} className={`chip ${vista === 'prueba' ? 'on' : ''}`} onClick={() => setVista('prueba')}>Pruébalo</button>
        <button role="tab" aria-selected={vista === 'perfiles'} className={`chip ${vista === 'perfiles' ? 'on' : ''}`} onClick={() => setVista('perfiles')}>Los 4 perfiles</button>
      </div>
      {vista === 'prueba' ? <Prueba /> : <CuatroPerfiles />}
    </>
  )
}

function Prueba() {
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
        <span className="kicker">Nuestra propuesta</span>
        <h1>Tenique: Tenerife se cocina entre todos</h1>
        <p>
          Un tenique es cada una de las tres piedras que sostienen el caldero en el fogón canario<Refs ids={[FUENTE_TENIQUE]} />. Si falta una, no se sostiene.
          Tenique es un programa estable, no una campaña: vecinos y visitantes comparten experiencias reales en toda la isla, y cada una deja algo visible en su barrio.
        </p>
      </header>

      <section className="grid g3 enter enter-2 tq-piezas">
        <div className="card tq-pieza">
          <span className="kicker">Personas</span>
          <h3>Vecinos que reciben</h3>
          <p>Anfitriones, asociaciones, productores y un dinamizador por municipio. El vecino es protagonista: ofrece, avala, participa y vota en qué se gasta el fondo de su barrio.</p>
        </div>
        <div className="card tq-pieza">
          <span className="kicker">Puntos físicos</span>
          <h3>Para quien no usa el móvil</h3>
          <p>Oficinas de turismo, centros ciudadanos y ayuntamientos donde apuntarse, proponer una experiencia o votar en papel.</p>
        </div>
        <div className="card tq-pieza">
          <span className="kicker">App</span>
          <h3>Buscar por emoción</h3>
          <p>«Quiero sentir…»: pertenencia, raíces, sabor, calma… Cada experiencia muestra qué deja en su barrio.</p>
        </div>
      </section>

      <section className="section enter enter-3">
        <div className="section-head"><div><h2>Cada experiencia, sobre tres piedras</h2><p>Solo entra si la sostienen las tres. Si el barrio retira su aval, sale.</p></div></div>
        <div className="grid g3">
          <div className="card tq-piedra"><b>Garantía Turismo de Tenerife</b><span>Cumple las condiciones del destino: seguridad, seguro, accesibilidad y respeto al entorno.</span></div>
          <div className="card tq-piedra"><b>Avalada por el barrio</b><span>La asociación o los vecinos del barrio la avalan, y pueden retirar el aval.</span></div>
          <div className="card tq-piedra"><b>Valorada por quien la vivió</b><span>Solo valoran quienes asistieron, vecinos y visitantes.</span></div>
        </div>
        <p className="tq-mas">
          <Link to={rutaDe('viabilidad')}>Cómo se pone en marcha y quién paga el fondo <Icon name="arrow" size={14} /></Link>
          <Link to={rutaDe('responsabilidades')}>Qué hace cada agente <Icon name="arrow" size={14} /></Link>
        </p>
      </section>

      <section className="section">
        <div className="section-head"><div><h2>Pruébalo</h2><p>{url ? 'Aquí mismo o en tu móvil con el QR.' : 'Aquí se podrá probar en cuanto esté lista.'}</p></div></div>

      {url.startsWith('#') ? <Interno /> : url ? <Externo /> : (
        <Vacio
          titulo="Prototipo en preparación"
          interno={<>Para el prototipo hecho en esta web, construye las pantallas en <span className="code">src/prototipo/pantallas.tsx</span> y pon <span className="code">PROTOTIPO.url = '#/app'</span> en <span className="code">src/config/proyecto.ts</span>. Para uno externo (Figma, otra web), pega su URL.</>}
        >
          Aquí se podrá probar la solución en cuanto esté lista.
        </Vacio>
      )}
      </section>
    </div>
  )
}
