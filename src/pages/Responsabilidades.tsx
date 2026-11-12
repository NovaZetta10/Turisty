// Entregable 3 · Mapeo de responsabilidades. Dueño: subagente de usuarios.
// Datos en src/data/responsabilidades.ts. Aquí solo maquetación.
import { useState } from 'react'
import { SECCIONES } from '../config/proyecto'
import { Tabla, type Columna } from '../components/Tabla'
import { Icon } from '../components/Icon'
import { Refs, Verificado } from '../components/Refs'
import { Fogon, Piedra } from '../components/Piedra'
import { ACCIONES, AGENTES, CODIGO_CONVIVENCIA, COMPETENCIAS, CUIDADO_COMPARTIDO, FLUJOS, FLUJO_TXT, PIEDRAS, RACI_TXT, VALIDACION, type Accion, type AgenteId, type Competencia, type Raci } from '../data/responsabilidades'
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
          <p>Un tenique es cada una de las tres piedras que sostienen el caldero. Si falta una, el fogón no se sostiene.</p>
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
          <Fogon size={64} leyenda={false} />
          <b>Experiencias compartidas</b>
          <span className="small muted">y fondo del barrio con uso visible</span>
        </div>
      </div>

      <h3 className="rs-sub">Cada experiencia, también sobre tres piedras</h3>
      <p className="small muted rs-val-intro">Ninguna experiencia entra en Tenique sin estas tres validaciones.</p>
      <ol className="rs-val">
        {VALIDACION.map((v, i) => (
          <li key={v.sello} className="card">
            <span className="rs-val-n tnum">{i + 1}</span>
            <div><b>«{v.sello}»</b><span className="small muted">{v.quien}</span><p>{v.que}</p></div>
          </li>
        ))}
      </ol>

      <h3 className="rs-sub">Qué circula entre ellas</h3>
      <div className="rs-leyenda small muted">
        {Object.entries(FLUJO_TXT).map(([k, t]) => <span key={k}><span className={`rs-punto rs-t-${k}`} aria-hidden="true" />{t}</span>)}
      </div>
      <ul className="rs-flujos">
        {FLUJOS.map((f, i) => (
          <li key={i} className={`rs-t-${f.tipo}`}>
            <span className="rs-de">{f.de}</span>
            <Icon name="arrow" size={14} />
            <span className="rs-a">{f.a}</span>
            <span className="rs-que">{f.que}</span>
          </li>
        ))}
      </ul>
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
          <div><h3>{a.nombre}</h3><span className="small muted">Piedra: {PIEDRAS.find((p) => p.id === a.piedra)?.nombre}</span></div>
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
