import { useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { PROTOTIPO, SITIO_URL, rutaDe } from '../config/proyecto'
import { Refs } from '../components/Refs'
import { FUENTE_TENIQUE } from '../data/investigacion'
import { Icon } from '../components/Icon'
import { Qr, urlBase } from '../components/Qr'
import { Vacio } from '../components/Vacio'
import { Movil } from '../prototipo/Movil'
import { CuatroPerfiles } from '../prototipo/CuatroPerfiles'
import { Sendero } from '../prototipo/Sendero'

// Pestaña Tenique: la iniciativa (no solo la app). Orden: cabecera · demo · cuatro piezas · sendero · comunicación · tres piedras.

/** Sección de comunicación (la hace Pitch en src/secciones/Comunicacion.tsx). Si aún no existe, se muestra un hueco. */
const Comunicacion = (Object.values(import.meta.glob<{ default: ComponentType }>('../secciones/Comunicacion.tsx', { eager: true }))[0]?.default) ?? null

const irA = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })

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

const PIEZAS = [
  { id: 'demo', kicker: 'Web y app', titulo: 'Buscar por emoción', texto: '«Quiero sentir…»: experiencias reales, con la triple validación y lo que cada una deja en su barrio.', icono: 'phone', enlace: 'Probar la app' },
  { id: 'comunicacion', kicker: 'Personas y puntos físicos', titulo: 'Para quien no usa el móvil', texto: 'Anfitriones, asociaciones y un dinamizador por municipio. Oficinas de turismo, centros ciudadanos y ayuntamientos para apuntarse, proponer o votar en papel.', icono: 'user', enlace: 'Ver las alternativas' },
  { id: 'comunicacion', kicker: 'Comunicación', titulo: 'Contarlo cerca', texto: 'Lo cuentan vecinos y asociaciones, no solo una campaña: carteles en el barrio, reuniones y boca a boca.', icono: 'globe', enlace: 'Ver el plan' },
  { id: 'fondo', kicker: 'Fondo del barrio', titulo: 'Lo que se ve en el barrio', texto: 'Cada experiencia aporta a una cuenta del Cabildo por municipio. El barrio decide en qué se gasta y se publica.', icono: 'heart', enlace: 'Cómo se financia' },
]

export default function Prototipo() {
  const url = PROTOTIPO.url.trim()
  return (
    <div className="wrap">
      <header className="page-head enter tq-cabecera">
        <span className="kicker">Nuestra propuesta</span>
        <h1>Tenique, una iniciativa para que Tenerife se cocine entre todos</h1>
        <p>
          Un tenique es cada una de las tres piedras que sostienen el caldero en el fogón canario<Refs ids={[FUENTE_TENIQUE]} />. Si falta una, no se sostiene.
          Vecinos y visitantes comparten experiencias reales en toda la isla, y cada una deja algo visible en su barrio.
        </p>
      </header>

      <section id="demo" className="section tq-demo">
        <div className="section-head tq-demo-head"><div><h2>Pruébalo</h2><p>{url ? 'Aquí mismo o en tu móvil con el QR. O mira cómo lo ve cada perfil.' : 'Aquí se podrá probar en cuanto esté lista.'}</p></div></div>
        {url.startsWith('#') ? <Interno /> : url ? <Externo /> : (
          <Vacio
            titulo="Prototipo en preparación"
            interno={<>Para el prototipo hecho en esta web, construye las pantallas en <span className="code">src/prototipo/pantallas.tsx</span> y pon <span className="code">PROTOTIPO.url = '#/app'</span> en <span className="code">src/config/proyecto.ts</span>. Para uno externo (Figma, otra web), pega su URL.</>}
          >
            Aquí se podrá probar la solución en cuanto esté lista.
          </Vacio>
        )}
      </section>

      <section className="section">
        <div className="section-head"><div><h2>La iniciativa, en cuatro piezas</h2><p>Tenique no es solo una app: es un programa estable con personas, puntos físicos, comunicación y un fondo para el barrio.</p></div></div>
        <div className="grid g4 tq-piezas">
          {PIEZAS.map((p, i) => (
            <div key={p.kicker} className="card tq-pieza">
              <span className="tq-pieza-ico"><Icon name={p.icono} size={20} /></span>
              <span className="kicker">{p.kicker}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
              {p.id === 'fondo'
                ? <Link className="tq-pieza-link" to={rutaDe('viabilidad')}>{p.enlace} <Icon name="arrow" size={14} /></Link>
                : <button className="tq-pieza-link" onClick={() => irA(i === 0 ? 'demo' : 'comunicacion')}>{p.enlace} <Icon name="arrow" size={14} /></button>}
            </div>
          ))}
        </div>
      </section>

      <section id="sendero" className="section">
        <div className="section-head"><div><h2>La experiencia, paso a paso</h2><p>El recorrido de cada perfil, de la vida diaria al orgullo compartido. Toca un paso para ver la pantalla de la app que lo acompaña.</p></div></div>
        <Sendero />
      </section>

      <section id="comunicacion" className="section">
        <div className="section-head"><div><h2>Comunicación y alternativas sin conexión</h2><p>Cómo llega Tenique a quien no está en redes ni usa apps.</p></div></div>
        {Comunicacion ? <Comunicacion /> : <Vacio titulo="Plan de comunicación en preparación">Aquí irán el plan de comunicación y los puntos físicos de Tenique.</Vacio>}
      </section>

      <section id="piedras" className="section">
        <div className="section-head"><div><h2>Cada experiencia, sobre tres piedras</h2><p>Solo entra si la sostienen las tres. Si el barrio retira su aval, sale.</p></div></div>
        <div className="grid g3">
          <div className="card tq-piedra"><b>Garantía Turismo de Tenerife</b><span>Cumple las condiciones del destino: legalidad, seguro de responsabilidad civil, accesibilidad y respeto al entorno.</span></div>
          <div className="card tq-piedra"><b>Avalada por el barrio</b><span>La asociación o los vecinos del barrio la avalan, y pueden retirar el aval.</span></div>
          <div className="card tq-piedra"><b>Valorada por quien la vivió</b><span>Puntúan todas las personas que asistieron, vecinos y visitantes.</span></div>
        </div>
        <p className="tq-mas">
          <Link to={rutaDe('viabilidad')}>Cómo se pone en marcha y quién paga el fondo <Icon name="arrow" size={14} /></Link>
          <Link to={rutaDe('responsabilidades')}>Qué hace cada agente <Icon name="arrow" size={14} /></Link>
        </p>
      </section>
    </div>
  )
}
