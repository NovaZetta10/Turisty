// Entregable 3 · Mapeo de responsabilidades. Dueño: subagente de usuarios.
// Datos en src/data/responsabilidades.ts. Aquí solo maquetación.
import { useState } from 'react'
import { SECCIONES } from '../config/proyecto'
import { Tabla, type Columna } from '../components/Tabla'
import { Icon } from '../components/Icon'
import { Refs, Verificado } from '../components/Refs'
import { Fogon, Piedra } from '../components/Piedra'
import { ACCIONES, AGENTES, CODIGO_CONVIVENCIA, COMPETENCIAS, CUIDADO_COMPARTIDO, FLUJOS, FLUJO_TXT, FUEGO, NODOS, PIEDRAS, POR_DENTRO, RACI_TXT, VALIDACION, type Accion, type AgenteId, type Flujo, type NodoId, type Competencia, type Raci } from '../data/responsabilidades'
import '../styles/responsabilidades.css'

const ID = 'responsabilidades'
const nombreDe = (id: AgenteId) => AGENTES.find((a) => a.id === id)?.nombre ?? id

export default function Responsabilidades() {
  const s = SECCIONES.find((x) => x.id === ID)
  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Entregable · mapeo de responsabilidades</span>
        <h1>Tenerife se cocina entre todos</h1>
        <p>{s?.resumen}</p>
      </header>
      <TresPiedras />
      <PorAgente />
      <Compromiso />
      <PorDentro />
      <Matriz />
      <NoResuelve />
    </div>
  )
}

/** Vista visual: las tres piedras del fogón y lo que circula entre ellas. */
function TresPiedras() {
  return (
    <section id="piedras" className="section">
      <div className="section-head">
        <div>
          <h2>Las tres piedras del fogón</h2>
          <p>Un tenique es cada una de las tres piedras que sostienen el caldero: vecinos, visitantes y sector turístico. Si falta una, el fogón no se sostiene. Turismo de Tenerife enciende el fogón.</p>
        </div>
      </div>
      <div className="rs-fogon">
        {PIEDRAS.map((p, i) => (
          <div key={p.id} className={`card rs-piedra rs-${p.id} enter enter-${i + 2}`}>
            <div className="rs-piedra-top"><Piedra tipo={p.id} size={60} titulo={p.nombre} /><span className="kicker">Piedra {i + 1}</span></div>
            <h3>{p.nombre}</h3>
            <p>{p.texto}</p>
            <div className="chips">{AGENTES.filter((a) => a.piedra === p.id).map((a) => <span key={a.id} className="tag"><Icon name={a.icono} size={12} />{a.nombre}</span>)}</div>
          </div>
        ))}
        <div className="rs-centro enter enter-5">
          <Fogon size={64} leyenda={false} fuego />
          <b>Experiencias compartidas</b>
          <span className="small muted">y fondo del barrio con uso visible</span>
        </div>
      </div>

      <div className="card rs-fuego">
        <div className="rs-fuego-t"><span className="rs-ic"><Icon name="llama" size={18} /></span><div><h3>{FUEGO.nombre}</h3><p className="small muted">{FUEGO.texto}</p></div></div>
        <div className="rs-fuego-lista">
          {AGENTES.filter((a) => a.piedra === 'fuego').map((a) => (
            <div key={a.id}><b><Icon name={a.icono} size={13} /> {a.nombre}</b><span>{a.aporta[0]}</span></div>
          ))}
        </div>
      </div>

      <h3 className="rs-sub">Cada experiencia lleva tres sellos</h3>
      <p className="small muted rs-val-intro">Ninguna experiencia entra en Tenique sin estos tres sellos.</p>
      <ol className="rs-val">
        {VALIDACION.map((v, i) => (
          <li key={v.sello} className="card">
            <span className="rs-val-n tnum">{i + 1}</span>
            <div><b>«{v.sello}»</b><span className="small muted">{v.quien}</span><p>{v.que}</p></div>
          </li>
        ))}
      </ol>

      <Constelacion />
    </section>
  )
}

/** Ficha de cada agente: qué aporta, qué recibe, qué decide, con quién se coordina. */
function PorAgente() {
  const [id, setId] = useState<AgenteId>(AGENTES[0].id)
  const a = AGENTES.find((x) => x.id === id) ?? AGENTES[0]
  return (
    <section id="agentes" className="section">
      <div className="section-head"><div><h2>El papel de cada entidad</h2><p>Elige una para ver qué pone, qué recibe y qué decide.</p></div></div>
      <div className="chips" role="tablist">
        {AGENTES.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === a.id} className={`chip ${x.id === a.id ? 'on' : ''}`} onClick={() => setId(x.id)}>{x.nombre}</button>
        ))}
      </div>
      <div key={a.id} className="card rs-agente enter" style={{ marginTop: 16 }}>
        <div className="rs-agente-t">
          <span className="rs-ic"><Icon name={a.icono} size={18} /></span>
          <div><h3>{a.nombre}</h3><span className="small muted">{a.piedra === 'fuego' ? (a.id === 'tdt' ? 'Enciende el fogón' : 'Mantiene el fuego') : `Piedra: ${PIEDRAS.find((p) => p.id === a.piedra)?.nombre}`}</span></div>
        </div>
        <div className="rs-cols">
          <div><div className="col-t">Aporta</div><ul className="list">{a.aporta.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><div className="col-t">Recibe</div><ul className="list">{a.recibe.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><div className="col-t">Decide</div><ul className="list">{a.decide.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div>
            <div className="col-t">Se coordina con</div>
            <div className="chips" style={{ marginTop: 8 }}>
              {a.coordina.map((c) => <button key={c} className="tag rs-link" onClick={() => setId(c)}>{nombreDe(c)}</button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Celda({ v }: { v?: Raci }) {
  if (!v) return <span className="rs-vacio" aria-label="Sin papel">·</span>
  return <span className={`rs-raci rs-${v.replace('/', '')}`} title={RACI_TXT[v]}>{v}</span>
}

/** Matriz agente × acción (tipo RACI). */
function Matriz() {
  type Fila = Accion & Record<string, unknown>
  const columnas: Columna<Fila>[] = [
    { clave: 'accion', titulo: 'Acción · desde', render: (f) => <><span>{f.accion}</span><span className="rs-desde">{f.desde}</span></> },
    ...AGENTES.map((a): Columna<Fila> => ({ clave: a.id, titulo: a.corto, render: (f) => <Celda v={f.papeles[a.id]} /> })),
  ]
  return (
    <section id="matriz" className="section">
      <div className="section-head"><div><h2>Quién hace qué</h2><p>Matriz de responsabilidades. En cada acción, una sola entidad rinde cuentas. Desplaza en horizontal en el móvil.</p></div></div>
      <div className="rs-leyenda small muted">
        {(['R', 'A', 'A/R', 'C', 'I'] as Raci[]).map((r) => <span key={r}><Celda v={r} /> {RACI_TXT[r]}</span>)}
      </div>
      <div className="rs-matriz">
        <Tabla<Fila> columnas={columnas} filas={ACCIONES as Fila[]} minAncho={980} />
      </div>
    </section>
  )
}

/** Causas que Tenique no resuelve y quién tiene la competencia. Tiene que coincidir con el Diagnóstico. */
function NoResuelve() {
  if (COMPETENCIAS.length === 0) return null
  type Fila = Competencia & Record<string, unknown>
  const columnas: Columna<Fila>[] = [
    { clave: 'tema', titulo: 'Causa', render: (f) => <><b>{f.tema}</b>{!f.verificado && <span className="rs-pv"><Verificado ok={false} /></span>}</> },
    { clave: 'quien', titulo: 'Quién tiene la competencia', render: (f) => <><b className="rs-quien">{f.quien}</b><span className="rs-que-c">{f.que}<Refs ids={f.fuentes} /></span></> },
    { clave: 'tenique', titulo: 'Qué hace Tenique' },
  ]
  return (
    <section id="no-resuelve" className="section">
      <div className="section-head">
        <div>
          <h2>Lo que Tenique no resuelve</h2>
          <p>El malestar va ligado sobre todo a la vivienda y la movilidad, y también pesan problemas como los vertidos. Tenique no los arregla: estas son las administraciones que deciden sobre ellos.</p>
        </div>
      </div>
      <div className="rs-comp">
        <Tabla<Fila> columnas={columnas} filas={COMPETENCIAS as Fila[]} minAncho={760} nota="Competencias según la normativa citada." />
      </div>
    </section>
  )
}

/** Compromisos del visitante: código de convivencia del barrio y cuidado compartido. */
function Compromiso() {
  return (
    <section id="compromiso" className="section">
      <div className="section-head">
        <div>
          <h2>El compromiso del visitante</h2>
          <p>Quien visita no solo paga y valora. Antes de reservar acepta el código de convivencia del barrio, que cada asociación vecinal adapta a su zona. Es una propuesta: la validamos con vecinos.</p>
        </div>
      </div>
      <ol className="rs-codigo">
        {CODIGO_CONVIVENCIA.map((c, i) => (
          <li key={c.id} className="card"><span className="rs-val-n tnum">{i + 1}</span><p>{c.es}</p></li>
        ))}
      </ol>
      <div className="card rs-cuidado">
        <Icon name="heart" size={18} />
        <p><b>Cuidado compartido.</b> {CUIDADO_COMPARTIDO.es}</p>
      </div>
    </section>
  )
}

type TipoFlujo = Flujo['tipo']

/** Curva entre dos nodos, desplazada hacia un lado si el mismo par ya tiene otras líneas. */
function curva(a: { x: number; y: number }, b: { x: number; y: number }, desvio: number) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2
  const dx = b.x - a.x, dy = b.y - a.y
  const l = Math.hypot(dx, dy) || 1
  const cx = mx - (dy / l) * desvio, cy = my + (dx / l) * desvio
  // punto medio real de la curva cuadrática (para la etiqueta)
  return { d: `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`, lx: (a.x + 2 * cx + b.x) / 4, ly: (a.y + 2 * cy + b.y) / 4 }
}

/** «Qué circula entre ellas» como constelación: nodos = entidades, líneas de color = flujos. La lista de abajo es la alternativa de texto. */
function Constelacion() {
  const [fijo, setFijo] = useState<TipoFlujo | null>(null)
  const [encima, setEncima] = useState<TipoFlujo | null>(null)
  const activo = encima ?? fijo
  const nodo = (id: NodoId) => NODOS.find((n) => n.id === id)!
  const usados = new Map<string, number>()
  const lineas = FLUJOS.flatMap((f, i) => f.lineas.map(([de, a], j) => {
    const clave = [de, a].sort().join('|')
    const k = usados.get(clave) ?? 0
    usados.set(clave, k + 1)
    const desvio = k === 0 ? 14 : (k % 2 ? -1 : 1) * (14 + 26 * Math.ceil(k / 2))
    return { key: `${i}-${j}`, f, de, a, ...curva(nodo(de), nodo(a), desvio) }
  }))
  const enJuego = new Set(activo ? lineas.filter((l) => l.f.tipo === activo).flatMap((l) => [l.de, l.a]) : [])
  return (
    <div className={`rs-const ${activo ? 'hay-activo' : ''}`} onMouseLeave={() => setEncima(null)}>
      <h3 className="rs-sub">Qué circula entre ellas</h3>
      <div className="rs-tipos" role="group" aria-label="Resaltar un tipo de flujo">
        {(Object.keys(FLUJO_TXT) as TipoFlujo[]).map((t) => (
          <button key={t} type="button" className={`rs-tipo rs-t-${t} ${activo === t ? 'on' : ''}`} aria-pressed={fijo === t}
            onMouseEnter={() => setEncima(t)} onFocus={() => setEncima(t)} onBlur={() => setEncima(null)} onClick={() => setFijo((x) => (x === t ? null : t))}>
            <span className="rs-punto" aria-hidden="true" />{FLUJO_TXT[t]}
          </button>
        ))}
      </div>
      <div className="rs-const-marco">
        <svg className="rs-const-svg" viewBox="0 0 800 470" role="img" aria-labelledby="rs-const-t rs-const-d">
          <title id="rs-const-t">Constelación de flujos entre entidades</title>
          <desc id="rs-const-d">Cada entidad es una estrella; cada línea de color es dinero, experiencia, decisión o información que pasa entre ellas. La lista de debajo lo cuenta en texto.</desc>
          <defs>
            {(Object.keys(FLUJO_TXT) as TipoFlujo[]).map((t) => (
              <marker key={t} id={`rs-flecha-${t}`} className={`rs-t-${t}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,1 L10,5 L0,9 z" className="rs-flecha" />
              </marker>
            ))}
          </defs>
          <g className="rs-lineas">
            {lineas.map((l) => (
              <path key={l.key} d={l.d} className={`rs-linea rs-t-${l.f.tipo} ${activo && activo !== l.f.tipo ? 'apagada' : ''}`} markerEnd={`url(#rs-flecha-${l.f.tipo})`} />
            ))}
          </g>
          <g className="rs-nodos">
            {NODOS.map((n) => (
              <g key={n.id} className={`rs-nodo rs-g-${n.grupo} ${activo && !enJuego.has(n.id) ? 'apagado' : ''}`} transform={`translate(${n.x} ${n.y})`}>
                <circle r={n.grupo === 'fondo' ? 15 : 9} />
                <text y={n.grupo === 'fondo' ? 33 : n.y < 100 ? -16 : 26} textAnchor="middle">{n.nombre}</text>
              </g>
            ))}
          </g>
          <g className="rs-etiquetas" aria-hidden="true">
            {activo && lineas.filter((l) => l.f.tipo === activo).map((l) => (
              <text key={l.key} x={l.lx} y={l.ly} textAnchor="middle" className={`rs-etq rs-t-${l.f.tipo}`}>{l.f.corto}</text>
            ))}
          </g>
        </svg>
      </div>
      <p className="small muted rs-const-pista">Pasa el cursor o toca un tipo para ver solo esas líneas. En el móvil, desliza el dibujo.</p>
      <ul className="rs-flujos">
        {FLUJOS.map((f, i) => (
          <li key={i} className={`rs-t-${f.tipo} ${activo && activo !== f.tipo ? 'apagada' : ''}`}>
            <span className="rs-de">{f.de}</span>
            <Icon name="arrow" size={14} />
            <span className="rs-a">{f.a}</span>
            <span className="rs-que">{f.que}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** «Cómo funciona por dentro»: preguntas operativas → respuesta corta → quién se encarga. Ancla #por-dentro (la usa el pitch). */
function PorDentro() {
  return (
    <section id="por-dentro" className="section">
      <div className="section-head">
        <div>
          <h2>Cómo funciona por dentro</h2>
          <p>Las preguntas que nos hicimos al bajar la idea a tierra. Es una propuesta: lo que aún no está decidido se cierra en la prueba de concepto.</p>
        </div>
        <span className="tag warn"><span className="dot" />Propuesta</span>
      </div>
      <div className="grid g2 rs-dentro">
        {POR_DENTRO.map((p) => (
          <article key={p.id} className="card rs-preg">
            <h3>{p.pregunta}</h3>
            <ul className="list">{p.respuesta.map((r) => <li key={r}>{r}</li>)}</ul>
            <p className="rs-pend small">{p.pendiente}</p>
            <div className="rs-quien">
              <span className="col-t">Se encarga</span>
              <div className="chips">{p.quien.map((id) => <span key={id} className="tag">{nombreDe(id)}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
