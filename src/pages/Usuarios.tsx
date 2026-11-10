import { useState } from 'react'
import { EMOCION_TXT, FASES, JOURNEY, PERSONAS, type PasoJourney } from '../data/usuarios'
import { Verificado } from '../components/Refs'
import { iniciales } from '../components/Avatar'

const FILAS: [keyof PasoJourney, string][] = [
  ['hace', 'Qué hace'],
  ['piensa', 'Qué piensa'],
  ['dolor', 'Dolor'],
  ['oportunidad', 'Oportunidad'],
]

function Curva({ pasos }: { pasos: PasoJourney[] }) {
  const n = pasos.length
  const y = (e: number) => 40 - e * 12.5 // % desde arriba; -2..2 → 65..15 (deja sitio a la etiqueta)
  const pts = pasos.map((p, i) => `${((i + 0.5) / n) * 100},${y(p.emocion)}`).join(' ')
  return (
    <div className="emo" style={{ gridColumn: `2 / span ${n}` }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" x2="100" y1="40" y2="40" stroke="var(--line-2)" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
        <polyline points={pts} fill="none" stroke="var(--ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
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
  const [id, setId] = useState(PERSONAS[0]?.id)
  const p = PERSONAS.find((x) => x.id === id) ?? PERSONAS[0]
  const conJourney = Object.keys(JOURNEY)
  const [jid, setJid] = useState(conJourney[0])
  const pasos = JOURNEY[jid] ?? []
  const pj = PERSONAS.find((x) => x.id === jid)

  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Entregable · análisis de usuario</span>
        <h1>Para quién lo hacemos</h1>
        <p>Buyer personas y user journey. Son plantillas de turismo en Canarias para arrancar: cuando sepamos el reto, se ajustan y se marcan como validadas al contrastarlas con usuarios reales.</p>
      </header>

      <section>
        <div className="section-head"><div><h2>Buyer personas</h2><p>Elige una para ver el detalle.</p></div></div>
        <div className="grid g4" role="tablist">
          {PERSONAS.map((x) => (
            <button key={x.id} role="tab" aria-selected={x.id === p.id} className={`card link-card persona-tab ${x.id === p.id ? 'on' : ''}`} onClick={() => setId(x.id)}>
              <span className="pt-av">{iniciales(x.nombre)}</span>
              <span><b>{x.nombre}</b><span className="small muted">{x.edad} · {x.origen}</span></span>
            </button>
          ))}
        </div>

        <div key={p.id} className="card persona enter" style={{ marginTop: 16, padding: 24 }}>
          <div className="persona-id">
            <div className="big">{iniciales(p.nombre)}</div>
            <h3>{p.nombre}</h3>
            <div className="small muted">{p.edad} años · {p.origen}</div>
            <div style={{ marginTop: 6 }}><Verificado ok={p.validado} /></div>
            <div className="col-t" style={{ marginTop: 14 }}>Canales</div>
            <div className="chips">{p.canales.map((c) => <span key={c} className="tag">{c}</span>)}</div>
          </div>
          <div>
            <p className="quote">{p.frase}</p>
            <p style={{ color: 'var(--ink-2)' }}>{p.perfil} {p.contexto}</p>
            <p className="small muted" style={{ marginTop: 6 }}><b style={{ color: 'var(--ink)' }}>Digital:</b> {p.digital}</p>
            <div className="cols3" style={{ marginTop: 18 }}>
              <div><div className="col-t">Necesita</div><ul className="list">{p.necesidades.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><div className="col-t">Le frena</div><ul className="list">{p.frenos.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><div className="col-t">Le mueve</div><ul className="list">{p.motivaciones.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div><h2>User journey{pj ? ` · ${pj.nombre}` : ''}</h2><p>Antes, durante y después del viaje. Desplaza en horizontal en el móvil.</p></div>
          {conJourney.length > 1 && (
            <div className="chips">{conJourney.map((k) => <button key={k} className={`chip ${k === jid ? 'on' : ''}`} onClick={() => setJid(k)}>{PERSONAS.find((x) => x.id === k)?.nombre ?? k}</button>)}</div>
          )}
        </div>
        {pasos.length === 0 ? (
          <div className="empty"><div><h3>Sin journey todavía</h3><p>Añádelo en <span className="code">src/data/usuarios.ts</span>, dentro de JOURNEY.</p></div></div>
        ) : (
          <div className="journey">
            <div className="journey-grid" style={{ gridTemplateColumns: `140px repeat(${pasos.length}, minmax(170px, 1fr))` }}>
              <div className="rowh">Fase</div>
              {pasos.map((s, i) => <div key={i} className="colh"><span className="muted tnum small">{FASES.indexOf(s.fase) + 1}</span> {s.fase}</div>)}
              <div className="rowh">Emoción</div>
              <Curva pasos={pasos} />
              {FILAS.map(([k, t]) => (
                <Fila key={k} titulo={t} clase={k === 'oportunidad' ? 'opp' : ''} valores={pasos.map((s) => String(s[k]))} />
              ))}
              <div className="rowh">Canales</div>
              {pasos.map((s, i) => <div key={i}><div className="chips">{s.canales.map((c) => <span key={c} className="tag">{c}</span>)}</div></div>)}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function Fila({ titulo, valores, clase }: { titulo: string; valores: string[]; clase: string }) {
  return (
    <>
      <div className="rowh">{titulo}</div>
      {valores.map((v, i) => <div key={i} className={clase}>{v}</div>)}
    </>
  )
}
