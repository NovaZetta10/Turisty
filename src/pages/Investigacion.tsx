import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AVISO_SERIES, CIFRAS_2026, DATOS_ABIERTOS, DEBATES, ENTIDADES, FORMATO_HACKATHON, FUENTES,
  PENDIENTE_VERIFICAR, REFERENTES, RETOS_TIPO,
} from '../data/investigacion'
import { Refs, Verificado } from '../components/Refs'
import { Icon } from '../components/Icon'
import { MapaIslas } from '../components/MapaIslas'
import { Mercados } from '../components/Mercados'

const INDICE = [
  ['esencial', 'Lo esencial'],
  ['islas', 'Mapa por islas'],
  ['mercados', 'De dónde vienen'],
  ['senales', 'Señales 2026'],
  ['temas', 'Temas y retos'],
  ['referentes', 'Benchmark'],
  ['extra', 'Datos y criterios'],
  ['fuentes', 'Fuentes'],
] as const

// Los cuatro números que hay que llevarse en la cabeza
const ESENCIAL = [
  { v: '18,4 M', l: 'turistas en 2025', d: '+3,5 % · récord', f: [1] },
  { v: '-0,5 %', l: 'extranjeros ene–sep 2026', d: 'mientras España crece +5,2 %', f: [2] },
  { v: '72 %', l: 'repiten destino', d: 'fidelidad alta, poca novedad', f: [41] },
  { v: '≈ 60 %', l: 'vienen de Reino Unido o Alemania', d: 'dependencia de dos mercados', f: [6] },
]

export default function Investigacion() {
  const [params] = useSearchParams()
  const [cat, setCat] = useState('Todas')
  const [verFuentes, setVerFuentes] = useState(false)
  const [qf, setQf] = useState('')
  const categorias = useMemo(() => ['Todas', ...Array.from(new Set(REFERENTES.map((r) => r.categoria)))], [])
  const refs = REFERENTES.filter((r) => cat === 'Todas' || r.categoria === cat)
  const fuentes = FUENTES.filter((f) => qf === '' || `${f.id} ${f.titulo} ${f.medio} ${f.url}`.toLowerCase().includes(qf.toLowerCase())).sort((a, b) => a.id - b.id)

  // ?f=12 → abre la lista de fuentes, salta a la 12 y la resalta
  const f = params.get('f')
  useEffect(() => {
    if (!f) return
    setQf(''); setVerFuentes(true)
    setTimeout(() => {
      const el = document.getElementById(`fuente-${f}`)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('hl')
      setTimeout(() => el.classList.remove('hl'), 2200)
    }, 60)
  }, [f])

  const ir = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Investigación previa · antes de conocer el reto</span>
        <h1>El turismo en Canarias, de un vistazo</h1>
        <p>Primero los números, luego el mapa, y el detalle solo si hace falta. Cada dato lleva su fuente <span className="ref" style={{ pointerEvents: 'none' }}>n</span>.</p>
      </header>

      <div className="inv-layout">
        <nav className="toc no-print" aria-label="Índice">
          {INDICE.map(([id, t]) => <a key={id} href={`#${id}`} onClick={ir(id)}>{t}</a>)}
        </nav>

        <div>
          <section id="esencial">
            <div className="hero-stats">
              {ESENCIAL.map((e, n) => (
                <div key={e.l} className={`hero-stat enter enter-${n + 2}`}>
                  <b>{e.v}</b>
                  <span>{e.l}</span>
                  <small>{e.d} <Refs ids={e.f} /></small>
                </div>
              ))}
            </div>
            <p className="nota"><Icon name="alert" size={14} /> {AVISO_SERIES}</p>
          </section>

          <section id="islas" className="section">
            <div className="section-head"><div><h2>Canarias por islas</h2><p>Pasa el ratón (o toca) una isla. Cambia el indicador para ver otro mapa de calor.</p></div></div>
            <MapaIslas />
          </section>

          <section id="mercados" className="section">
            <div className="section-head"><div><h2>¿De dónde vienen?</h2><p>Lanzarote vive del británico; La Palma, del alemán y del peninsular.</p></div></div>
            <Mercados />
          </section>

          <section id="senales" className="section">
            <div className="section-head"><div><h2>Señales de 2026</h2><p>Lo que ha cambiado este año.</p></div></div>
            <div className="senales">
              {CIFRAS_2026.map((d) => (
                <div key={d.etiqueta} className="senal">
                  <b className={d.valor.startsWith('-') ? 'down' : ''}>{d.valor}</b>
                  <span>{d.etiqueta}</span>
                  <small>{d.detalle} <Refs ids={d.fuentes} /> {!d.verificado && <Verificado ok={false} />}</small>
                </div>
              ))}
            </div>
          </section>

          <section id="temas" className="section">
            <div className="section-head"><div><h2>Temas y retos probables</h2><p>Abre solo lo que te interese.</p></div></div>
            <div className="acordeon">
              {DEBATES.map((t) => (
                <details key={t.titulo}>
                  <summary><span>{t.titulo}</span><small>{t.resumen}</small></summary>
                  <ul className="list">{t.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
                  <div className="small muted" style={{ marginTop: 10 }}>Fuentes <Refs ids={t.fuentes} /></div>
                </details>
              ))}
            </div>
            <h3 className="kicker" style={{ margin: '28px 0 12px' }}>{RETOS_TIPO.length} retos que podría plantear una empresa</h3>
            <div className="retos">
              {RETOS_TIPO.map((r) => (
                <details key={r.titulo} className="reto">
                  <summary>{r.titulo}</summary>
                  <p>{r.dolor}</p>
                  <p className="dato">{r.dato} <Refs ids={r.fuentes} /></p>
                </details>
              ))}
            </div>
            <h3 className="kicker" style={{ margin: '28px 0 12px' }}>Quién innova aquí</h3>
            <div className="entidades">
              {ENTIDADES.map((e) => (
                <div key={e.nombre} className="entidad" tabIndex={0}>
                  <b>{e.nombre}</b>
                  <span>{e.retoProbable}</span>
                  <div className="entidad-mas">{e.que} <Refs ids={e.fuentes} /></div>
                </div>
              ))}
            </div>
          </section>

          <section id="referentes" className="section">
            <div className="section-head"><div><h2>Benchmark</h2><p>Quién resolvió algo parecido, y con qué resultado.</p></div></div>
            <div className="chips" style={{ marginBottom: 14 }}>
              {categorias.map((c) => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
            </div>
            <div className="grid g3">
              {refs.map((r) => (
                <div key={r.nombre} className="card ref-card">
                  <div className="ref-top"><span className="tag">{r.categoria}</span>{!r.verificado && <Verificado ok={false} />}</div>
                  <h3>{r.nombre}</h3>
                  <div className="small muted">{r.lugar}</div>
                  <p>{r.que}</p>
                  {r.resultado && <div className="resultado">{r.resultado}</div>}
                  <div className="small muted" style={{ marginTop: 'auto', paddingTop: 8 }}><Refs ids={r.fuentes} /></div>
                </div>
              ))}
            </div>
          </section>

          <section id="extra" className="section">
            <div className="grid g3">
              <div className="card">
                <div className="kicker">Datos abiertos</div>
                <ul className="list">{DATOS_ABIERTOS.map((d) => <li key={d.nombre}><b>{d.nombre}</b>: {d.que} <Refs ids={d.fuentes} /></li>)}</ul>
              </div>
              <div className="card">
                <div className="kicker">{FORMATO_HACKATHON.titulo}</div>
                <ul className="list">{FORMATO_HACKATHON.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
                <div className="small muted" style={{ marginTop: 8 }}><Refs ids={FORMATO_HACKATHON.fuentes} /></div>
              </div>
              <div className="card">
                <div className="kicker">Por verificar</div>
                <ul className="list">{PENDIENTE_VERIFICAR.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          </section>

          <section id="fuentes" className="section">
            <div className="section-head">
              <div><h2>Fuentes</h2><p>{FUENTES.length} fuentes numeradas. Pulsa cualquier número de la página para saltar aquí.</p></div>
              <button className="btn sm" onClick={() => setVerFuentes(!verFuentes)}>{verFuentes ? 'Ocultar' : 'Ver las fuentes'}</button>
            </div>
            {verFuentes && (
              <>
                <input className="search" style={{ marginBottom: 12 }} placeholder="Buscar fuente…" value={qf} onChange={(e) => setQf(e.target.value)} aria-label="Buscar fuente" />
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
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
