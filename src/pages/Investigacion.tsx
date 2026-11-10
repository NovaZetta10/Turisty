import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AVISO_SERIES, CIFRAS_2025, CIFRAS_2026, DATOS_ABIERTOS, DEBATES, ENTIDADES, FORMATO_HACKATHON, FUENTES,
  PENDIENTE_VERIFICAR, REFERENTES, RETOS_TIPO, type Dato, type Tema,
} from '../data/investigacion'
import { Refs, Verificado } from '../components/Refs'
import { Icon } from '../components/Icon'

const INDICE = [
  ['cifras', 'Cifras clave'],
  ['debates', 'Debates abiertos'],
  ['retos', 'Retos probables'],
  ['entidades', 'Quién innova aquí'],
  ['referentes', 'Benchmark'],
  ['datos', 'Datos abiertos'],
  ['formato', 'Qué valoran'],
  ['verificar', 'Por verificar'],
  ['fuentes', `Fuentes (${FUENTES.length})`],
] as const

function Cifras({ datos }: { datos: Dato[] }) {
  return (
    <div className="grid g3">
      {datos.map((d) => (
        <div key={d.etiqueta} className="card stat">
          <div className="l">{d.etiqueta}</div>
          <div className="v">{d.valor}</div>
          {d.detalle && <div className="d">{d.detalle}</div>}
          <div className="foot"><Verificado ok={d.verificado} /><span><Refs ids={d.fuentes} /></span></div>
        </div>
      ))}
    </div>
  )
}

function TemaCard({ t }: { t: Tema }) {
  return (
    <div className="card">
      <h3 style={{ fontSize: 17 }}>{t.titulo}</h3>
      <p className="muted small" style={{ marginTop: 6 }}>{t.resumen}</p>
      <ul className="list">{t.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
      <div style={{ marginTop: 12 }} className="small muted">Fuentes <Refs ids={t.fuentes} /></div>
    </div>
  )
}

export default function Investigacion() {
  const [params] = useSearchParams()
  const [cat, setCat] = useState('Todas')
  const [q, setQ] = useState('')
  const [qf, setQf] = useState('')
  const categorias = useMemo(() => ['Todas', ...Array.from(new Set(REFERENTES.map((r) => r.categoria)))], [])
  const refs = REFERENTES.filter((r) => (cat === 'Todas' || r.categoria === cat) && (q === '' || `${r.nombre} ${r.lugar} ${r.que} ${r.resultado ?? ''}`.toLowerCase().includes(q.toLowerCase())))
  const fuentes = FUENTES.filter((f) => qf === '' || `${f.id} ${f.titulo} ${f.medio} ${f.url}`.toLowerCase().includes(qf.toLowerCase()))

  // ?f=12 → salta a la fuente 12 y la resalta
  const f = params.get('f')
  useEffect(() => {
    if (!f) return
    setQf('')
    requestAnimationFrame(() => {
      const el = document.getElementById(`fuente-${f}`)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('hl')
      setTimeout(() => el.classList.remove('hl'), 2200)
    })
  }, [f])

  const ir = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Investigación previa · antes de conocer el reto</span>
        <h1>El turismo en Canarias, con fuentes</h1>
        <p>Lo que sabemos antes del jueves: cifras, debates, retos probables y referentes. Cada dato lleva su número de fuente <span className="ref" style={{ pointerEvents: 'none' }}>n</span>; pulsa para ver de dónde sale. Lo marcado «Por verificar» no debe ir a la presentación sin contrastarlo.</p>
      </header>

      <div className="inv-layout">
        <nav className="toc no-print" aria-label="Índice">
          {INDICE.map(([id, t]) => <a key={id} href={`#${id}`} onClick={ir(id)}>{t}</a>)}
        </nav>

        <div>
          <section id="cifras">
            <div className="section-head"><div><h2>Cifras clave</h2><p>2025 cerrado y lo que llevamos de 2026.</p></div></div>
            <div className="callout" style={{ marginBottom: 16 }}><Icon name="alert" size={18} /><span>{AVISO_SERIES}</span></div>
            <h3 className="kicker" style={{ margin: '0 0 10px' }}>2025</h3>
            <Cifras datos={CIFRAS_2025} />
            <h3 className="kicker" style={{ margin: '24px 0 10px' }}>2026</h3>
            <Cifras datos={CIFRAS_2026} />
          </section>

          <section id="debates" className="section">
            <div className="section-head"><div><h2>Debates abiertos</h2><p>Los temas que están en la conversación pública y que un reto puede tocar.</p></div></div>
            <div className="grid g2">{DEBATES.map((t) => <TemaCard key={t.titulo} t={t} />)}</div>
          </section>

          <section id="retos" className="section">
            <div className="section-head"><div><h2>Retos probables</h2><p>Lo que una empresa turística canaria podría plantear, con el dolor y el dato que lo respalda.</p></div></div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Reto</th><th>Dolor</th><th>Dato</th></tr></thead>
                <tbody>
                  {RETOS_TIPO.map((r) => (
                    <tr key={r.titulo}><td style={{ fontWeight: 600, minWidth: 180 }}>{r.titulo}</td><td style={{ minWidth: 220 }}>{r.dolor}</td><td style={{ minWidth: 200 }}>{r.dato} <Refs ids={r.fuentes} /></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="entidades" className="section">
            <div className="section-head"><div><h2>Quién innova aquí</h2><p>Empresas e instituciones que podrían proponer el reto, y qué les preocupa.</p></div></div>
            <div className="grid g2">
              {ENTIDADES.map((e) => (
                <div key={e.nombre} className="card">
                  <h3 style={{ fontSize: 16 }}>{e.nombre}</h3>
                  <p className="small" style={{ marginTop: 6, color: 'var(--ink-2)' }}>{e.que}</p>
                  <p className="small muted" style={{ marginTop: 8 }}><b style={{ color: 'var(--ink)' }}>Reto probable:</b> {e.retoProbable} <Refs ids={e.fuentes} /></p>
                </div>
              ))}
            </div>
          </section>

          <section id="referentes" className="section">
            <div className="section-head">
              <div><h2>Benchmark: referentes</h2><p>Destinos y empresas que ya resolvieron algo parecido. Filtra por categoría o busca.</p></div>
              <input className="search" placeholder="Buscar referente…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar referente" />
            </div>
            <div className="chips" style={{ marginBottom: 14 }}>
              {categorias.map((c) => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
            </div>
            <div className="grid g3">
              {refs.map((r) => (
                <div key={r.nombre} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                    <span className="tag">{r.categoria}</span>
                    {!r.verificado && <Verificado ok={false} />}
                  </div>
                  <h3 style={{ fontSize: 16, marginTop: 4 }}>{r.nombre}</h3>
                  <div className="small muted">{r.lugar}</div>
                  <p className="small" style={{ color: 'var(--ink-2)' }}>{r.que}</p>
                  {r.resultado && <p className="small"><b>Resultado:</b> {r.resultado}</p>}
                  <div className="small muted" style={{ marginTop: 'auto', paddingTop: 6 }}>Fuentes <Refs ids={r.fuentes} /></div>
                </div>
              ))}
              {refs.length === 0 && <p className="muted">Ningún referente coincide con la búsqueda.</p>}
            </div>
          </section>

          <section id="datos" className="section">
            <div className="section-head"><div><h2>Datos abiertos para el prototipo</h2><p>De dónde sacar datos reales durante el reto.</p></div></div>
            <div className="grid g3">
              {DATOS_ABIERTOS.map((d) => (
                <div key={d.nombre} className="card">
                  <h3 style={{ fontSize: 16 }}>{d.nombre}</h3>
                  <p className="small" style={{ marginTop: 6, color: 'var(--ink-2)' }}>{d.que}</p>
                  <p className="small muted" style={{ marginTop: 8, wordBreak: 'break-word' }}>{d.acceso} <Refs ids={d.fuentes} /></p>
                </div>
              ))}
            </div>
          </section>

          <section id="formato" className="section">
            <div className="section-head"><div><h2>{FORMATO_HACKATHON.titulo}</h2></div></div>
            <TemaCard t={FORMATO_HACKATHON} />
          </section>

          <section id="verificar" className="section">
            <div className="section-head"><div><h2>Por verificar</h2><p>Lo que hay que contrastar antes de usarlo en la presentación.</p></div></div>
            <div className="card">
              <ul className="list" style={{ marginTop: 0 }}>{PENDIENTE_VERIFICAR.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </section>

          <section id="fuentes" className="section">
            <div className="section-head">
              <div><h2>Fuentes</h2><p>Numeradas como aparecen en la página. Las marcadas «No se pudo abrir» se citan por referencia y conviene revisarlas.</p></div>
              <input className="search" placeholder="Buscar fuente…" value={qf} onChange={(e) => setQf(e.target.value)} aria-label="Buscar fuente" />
            </div>
            <div className="card" style={{ padding: 0 }}>
              {fuentes.map((x) => (
                <div key={x.id} id={`fuente-${x.id}`} className="fuente">
                  <span className="n">[{x.id}]</span>
                  <div style={{ minWidth: 0 }}>
                    <div className="t">{x.titulo}</div>
                    <div className="m">{x.medio}{x.fecha ? ` · ${x.fecha}` : ''}</div>
                    <a className="url" href={x.url} target="_blank" rel="noreferrer">{x.url}</a>
                  </div>
                  {x.abierta ? <span className="tag ok"><Icon name="check" size={12} />Abierta</span> : <span className="tag warn">No se pudo abrir</span>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
