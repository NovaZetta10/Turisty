// «A quién le pasa»: personas, recorrido de convivencia y emociones de búsqueda. Dueño: subagente de usuarios.
// El default export es una SECCIÓN (sin .wrap ni cabecera de página): Diagnóstico la importa con
//   import Usuarios from './Usuarios'   →   <Usuarios />
// Datos en src/data/usuarios.ts. Todo es hipótesis hasta que lo validen entrevistas reales.
import { useState } from 'react'
import { EMOCIONES, EMOCION_TXT, FASES, FRASE_PROBLEMA, JOURNEY, PERSONAS, type PasoJourney } from '../data/usuarios'
import { Refs } from '../components/Refs'
import { iniciales } from '../components/Avatar'
import { Icon } from '../components/Icon'
import { Vacio, SoloLocal } from '../components/Vacio'
import '../styles/usuarios.css'

const FILAS: [keyof PasoJourney, string][] = [
  ['hace', 'Qué hace'],
  ['piensa', 'Qué piensa'],
  ['dolor', 'Dolor'],
  ['oportunidad', 'Oportunidad'],
]

/** Etiqueta de estado: hipótesis hasta que entrevistas reales lo confirmen. */
function Estado({ ok }: { ok: boolean }) {
  return ok
    ? <span className="tag ok"><span className="dot" />Validado con entrevistas</span>
    : <span className="tag warn"><span className="dot" />Hipótesis</span>
}

function Curva({ pasos }: { pasos: PasoJourney[] }) {
  const n = pasos.length
  const y = (e: number) => 40 - e * 12.5 // % desde arriba; -2..2 → 65..15 (deja sitio a la etiqueta)
  const pts = pasos.map((p, i) => `${((i + 0.5) / n) * 100},${y(p.emocion)}`).join(' ')
  return (
    <div className="emo" style={{ gridColumn: `2 / span ${n}` }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" x2="100" y1="40" y2="40" stroke="var(--line-2)" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
        <polyline points={pts} fill="none" stroke="var(--text)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
      {pasos.map((p, i) => (
        <span key={i} className={`emo-dot e${p.emocion}`} style={{ left: `${((i + 0.5) / n) * 100}%`, top: `${y(p.emocion)}%` }} title={EMOCION_TXT[p.emocion]}>
          <i>{EMOCION_TXT[p.emocion]}</i>
        </span>
      ))}
    </div>
  )
}

export default function Usuarios() {
  if (PERSONAS.length === 0) {
    return (
      <section id="usuarios" className="section">
        <div className="section-head"><div><h2>A quién le pasa</h2></div></div>
        <Vacio titulo="En preparación" icono={null} interno={<>Rellena PERSONAS en <span className="code">src/data/usuarios.ts</span>.</>}>
          Las personas y su recorrido se publican aquí en cuanto estén listas.
        </Vacio>
      </section>
    )
  }
  return (
    <>
      <Personas />
      <Recorrido />
      <Emociones />
    </>
  )
}

function Personas() {
  const [id, setId] = useState(PERSONAS[0].id)
  const p = PERSONAS.find((x) => x.id === id) ?? PERSONAS[0]
  return (
    <section id="usuarios" className="section">
      <div className="section-head">
        <div>
          <h2>A quién le pasa</h2>
          <p>Dos personas tipo, construidas como hipótesis. Las contrastamos con entrevistas a vecinos y visitantes durante el evento.</p>
        </div>
      </div>

      <p className="quote us-problema">{FRASE_PROBLEMA}</p>

      <div className="grid g2 us-tabs" role="tablist">
        {PERSONAS.map((x, i) => (
          <button key={x.id} role="tab" aria-selected={x.id === p.id} className={`card link-card persona-tab ${x.id === p.id ? 'on' : ''}`} onClick={() => setId(x.id)}>
            <span className="pt-av">{iniciales(x.nombre)}</span>
            <span><b>{x.nombre}</b><span className="small muted">{i === 0 ? 'Principal' : 'Secundaria'} · {x.edad}</span></span>
          </button>
        ))}
      </div>

      <div key={p.id} className="card persona enter" style={{ marginTop: 16, padding: 24 }}>
        <div className="persona-id">
          <div className="big">{iniciales(p.nombre)}</div>
          <h3>{p.nombre}</h3>
          <div className="small muted">{p.edad} · {p.origen}</div>
          <div style={{ marginTop: 6 }}><Estado ok={p.validado} /></div>
          <div className="col-t" style={{ marginTop: 14 }}>Cómo le llega la información</div>
          <div className="chips">{p.canales.map((c) => <span key={c} className="tag">{c}</span>)}</div>
        </div>
        <div>
          <p className="quote">{p.frase}</p>
          <p style={{ color: 'var(--text-2)' }}>{p.perfil}<Refs ids={p.fuentes ?? []} /> {p.contexto}</p>
          <p className="small muted" style={{ marginTop: 6 }}><b style={{ color: 'var(--text)' }}>Digital:</b> {p.digital}</p>
          <div className="cols3" style={{ marginTop: 18 }}>
            <div><div className="col-t">Necesita</div><ul className="list">{p.necesidades.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div><div className="col-t">Le frena</div><ul className="list">{p.frenos.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div><div className="col-t">Le mueve</div><ul className="list">{p.motivaciones.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
        </div>
      </div>
      <p className="small muted" style={{ marginTop: 10 }}>
        Los nombres son arquetipos, no personas reales. Las frases marcadas como hipótesis son nuestras; las citas reales llevarán el código de su entrevista.
        <SoloLocal> Guion de entrevista: docs/usuarios-guion-tenique.md.</SoloLocal>
      </p>
    </section>
  )
}

function Recorrido() {
  const claves = Object.keys(JOURNEY)
  const [jid, setJid] = useState(claves[0])
  const pasos = JOURNEY[jid] ?? []
  const pj = PERSONAS.find((x) => x.id === jid)
  return (
    <section id="recorrido" className="section">
      <div className="section-head">
        <div>
          <h2>Su recorrido de convivencia</h2>
          <p>Del roce diario al orgullo compartido. Las columnas marcadas son donde actúa Tenique. Desplaza en horizontal en el móvil.</p>
        </div>
        {claves.length > 1 && (
          <div className="chips">{claves.map((k) => <button key={k} className={`chip ${k === jid ? 'on' : ''}`} onClick={() => setJid(k)}>{PERSONAS.find((x) => x.id === k)?.nombre ?? k}</button>)}</div>
        )}
      </div>
      {pasos.length === 0 ? (
        <Vacio titulo="Recorrido en preparación" icono={null} interno={<>Añádelo en <span className="code">src/data/usuarios.ts</span>, dentro de JOURNEY.</>}>El recorrido de esta persona se publicará cuando lo tengamos contrastado.</Vacio>
      ) : (
        <>
          <div className="us-leyenda small muted">
            <Estado ok={!!pj?.validado} />
            <span><span className="us-marca" aria-hidden="true" /> Actúa Tenique</span>
            <span>Emoción estimada, por validar</span>
          </div>
          <div className="journey">
            <div className="journey-grid" style={{ gridTemplateColumns: `140px repeat(${pasos.length}, minmax(160px, 1fr))` }}>
              <div className="rowh">Fase</div>
              {pasos.map((s, i) => (
                <div key={i} className={`colh ${s.tenique ? 'us-ten' : ''}`}>
                  <span className="muted tnum small">{FASES.indexOf(s.fase) + 1}</span> {s.fase}
                  {s.tenique && <span className="us-chip">Tenique</span>}
                </div>
              ))}
              <div className="rowh">Emoción</div>
              <Curva pasos={pasos} />
              {FILAS.map(([k, t]) => (
                <Fila key={k} titulo={t} clase={k === 'oportunidad' ? 'opp' : ''} pasos={pasos} valores={pasos.map((s) => String(s[k]))} />
              ))}
              <div className="rowh">Canales</div>
              {pasos.map((s, i) => <div key={i} className={s.tenique ? 'us-ten' : ''}><div className="chips">{s.canales.map((c) => <span key={c} className="tag">{c}</span>)}</div></div>)}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

function Fila({ titulo, valores, clase, pasos }: { titulo: string; valores: string[]; clase: string; pasos: PasoJourney[] }) {
  return (
    <>
      <div className="rowh">{titulo}</div>
      {valores.map((v, i) => <div key={i} className={`${clase} ${pasos[i].tenique ? 'us-ten' : ''}`}>{v}</div>)}
    </>
  )
}

function Emociones() {
  if (EMOCIONES.length === 0) return null
  return (
    <section id="emociones" className="section">
      <div className="section-head">
        <div>
          <h2>«Quiero sentir…»</h2>
          <p>Las emociones con las que se buscarán experiencias en Tenique. Es nuestra propuesta: la estamos probando en las entrevistas.</p>
        </div>
      </div>
      <div className="grid g4 us-emociones">
        {EMOCIONES.map((e, i) => (
          <div key={e.id} className={`card us-emo enter enter-${Math.min(i + 1, 4)}`}>
            <div className="us-emo-top">
              <span className="us-emo-ic"><Icon name={e.icono} size={16} /></span>
              {!e.validada && <span className="tag warn">Por validar</span>}
            </div>
            <h3>{e.nombre} <span className="muted us-en" lang="en">{e.en}</span></h3>
            <p>{e.porque}</p>
            <div className="us-ej"><span className="col-t">Tipo de experiencia</span>{e.ejemplo}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
