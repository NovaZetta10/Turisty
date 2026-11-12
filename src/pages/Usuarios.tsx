// «A quién le pasa»: personas, recorrido de convivencia y emociones de búsqueda. Dueño: subagente de usuarios.
// El default export es una SECCIÓN (sin .wrap ni cabecera de página): Diagnóstico la importa con
//   import Usuarios from './Usuarios'   →   <Usuarios />
// Datos en src/data/usuarios.ts. Todo es hipótesis hasta que lo validen entrevistas reales.
import { useState } from 'react'
import { EMOCIONES, EMOCION_TXT, ENCUESTA, ENTREVISTAS, FASES, FRASE_PROBLEMA, JOURNEY, PERSONAS, estadoHipotesis, type PasoJourney } from '../data/usuarios'
import { HIPOTESIS } from '../data/investigacion'
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
      <Contrastado />
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

/** Resultado de entrevistas y encuesta reales. Solo aparece cuando hay datos en ENTREVISTAS o en ENCUESTA. */
const TAG = { confirmada: 'ok', 'caída': 'off', 'sin datos': 'warn' } as const
const mayus = (s: string) => s[0].toUpperCase() + s.slice(1)
const num = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`

function Contrastado() {
  if (ENTREVISTAS.length === 0 && !ENCUESTA) return null
  return (
    <section id="contrastado" className="section">
      <div className="section-head">
        <div>
          <h2>Lo que hemos contrastado</h2>
          <p>Con personas reales, durante el evento. Son muestras pequeñas y de conveniencia: indican, no demuestran. Por eso damos cuentas («N de M»), no porcentajes.</p>
        </div>
      </div>
      <ResultadoEntrevistas />
      <ResultadoEncuesta />
    </section>
  )
}

function ResultadoEntrevistas() {
  if (ENTREVISTAS.length === 0) return null
  const vecinos = ENTREVISTAS.filter((e) => e.tipo === 'vecino').length
  const turistas = ENTREVISTAS.length - vecinos
  const hip = HIPOTESIS.map((h) => ({ ...h, r: estadoHipotesis(h.id) })).filter((h) => h.r.n > 0)
  const cuenta = new Map<string, number>()
  ENTREVISTAS.forEach((e) => e.emociones.forEach((id) => cuenta.set(id, (cuenta.get(id) ?? 0) + 1)))
  const emos = [...cuenta.entries()].sort((a, b) => b[1] - a[1])
  const citas = ENTREVISTAS.filter((e) => e.cita)
  return (
    <>
      <h3 className="us-sub">Entrevistas: {num(ENTREVISTAS.length, 'persona', 'personas')} ({num(vecinos, 'vecino', 'vecinos')} y {num(turistas, 'turista', 'turistas')}), 5 minutos cada una</h3>
      {hip.length > 0 && (
        <div className="card us-hip">
          {hip.map((h) => (
            <div key={h.id} className="us-hip-fila">
              <span className="us-hip-id tnum">{h.id}</span>
              <span className="us-hip-t">{h.texto}</span>
              <span className="small muted tnum">{h.r.a} a favor · {h.r.c} en contra · de {h.r.n}</span>
              <span className={`tag ${TAG[h.r.estado]}`}><span className="dot" />{mayus(h.r.estado)}</span>
            </div>
          ))}
        </div>
      )}
      {emos.length > 0 && (
        <>
          <h4 className="us-sub4">Emociones que más eligieron</h4>
          <div className="chips">{emos.map(([id, n]) => <span key={id} className="tag">{EMOCIONES.find((e) => e.id === id)?.nombre ?? id} · {n}</span>)}</div>
        </>
      )}
      {citas.length > 0 && (
        <>
          <h4 className="us-sub4">Lo que nos dijeron</h4>
          <div className="grid g2">{citas.map((e) => <blockquote key={e.codigo} className="card us-cita"><p>«{e.cita}»</p><span className="small muted">{e.codigo} · {e.tipo}, zona {e.zona}</span></blockquote>)}</div>
        </>
      )}
    </>
  )
}

function ResultadoEncuesta() {
  const E = ENCUESTA
  if (!E) return null
  const partes = [E.vecinos != null && num(E.vecinos, 'vecino', 'vecinos'), E.turistas != null && num(E.turistas, 'turista', 'turistas')].filter(Boolean).join(' y ')
  const hip = HIPOTESIS.filter((h) => E.hipotesis[h.id]).map((h) => ({ ...h, v: E.hipotesis[h.id]! }))
  return (
    <>
      <h3 className="us-sub">Encuesta a {num(E.respuestas, 'persona', 'personas')} el {E.fecha}{partes ? ` (${partes})` : ''}</h3>
      <p className="small muted">Formulario anónimo, distinto de las entrevistas. Cada dato dice a cuántas personas se refiere.</p>
      {E.resultados.length > 0 && (
        <div className="card us-hip" style={{ marginTop: 10 }}>
          {E.resultados.map((r, i) => (
            <div key={i} className="us-enc-fila">
              <span className="us-hip-t">{r.pregunta}: <b>{r.respuesta}</b>{r.grupo && <span className="muted"> · {r.grupo}</span>}</span>
              <span className="tnum us-enc-n">{r.n} de {r.de}</span>
            </div>
          ))}
        </div>
      )}
      {hip.length > 0 && (
        <div className="card us-hip" style={{ marginTop: 12 }}>
          {hip.map((h) => (
            <div key={h.id} className="us-hip-fila">
              <span className="us-hip-id tnum">{h.id}</span>
              <span className="us-hip-t">{h.texto}</span>
              <span className="small muted">{h.v.apoyo}</span>
              <span className={`tag ${TAG[h.v.estado]}`}><span className="dot" />{mayus(h.v.estado)}</span>
            </div>
          ))}
        </div>
      )}
      {E.citas.length > 0 && (
        <>
          <h4 className="us-sub4">Respuestas abiertas</h4>
          <div className="grid g2">{E.citas.map((c, i) => <blockquote key={i} className="card us-cita"><p>«{c.texto}»</p><span className="small muted">Encuesta · {c.perfil}</span></blockquote>)}</div>
        </>
      )}
    </>
  )
}
