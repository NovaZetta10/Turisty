import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  AVISO_SERIES, AVISO_TENERIFE, CAUSAS, CIFRAS_2026, CIFRAS_TENERIFE, DATOS_ABIERTOS, FUENTES, HIPOTESIS,
  MUNICIPIO_EXISTE, MUNICIPIO_NO_EXISTE, PERCEPCION, PRESION, PRESION_TENERIFE, REFERENTES, RESPUESTA_RETO, RETORNO, RETORNO_HUECOS,
  TURISTAS_TF_ENE_SEP, ZONAS, type Municipio, type Percepcion,
} from '../data/investigacion'
import { rutaDe } from '../config/proyecto'
import { Refs, Verificado } from '../components/Refs'
import { Icon } from '../components/Icon'
import { MapaIslas } from '../components/MapaIslas'
import { Contador } from '../components/Contador'
import { Tabla } from '../components/Tabla'
import UsuariosSeccion from './Usuarios'
import '../styles/investigacion.css'

const TABS = [
  ['tenerife', 'Qué pasa en Tenerife'],
  ['presion', 'Dónde aprieta'],
  ['causas', 'Causas'],
  ['personas', 'A quién le pasa'],
  ['retorno', 'Qué deja el turismo'],
  ['benchmark', 'Benchmark'],
  ['canarias', 'Contexto Canarias'],
  ['fuentes', 'Fuentes'],
] as const
type Tab = (typeof TABS)[number][0]

/** Pestañas con un indicador que se desliza hasta la activa. */
function Pestanas({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const caja = useRef<HTMLDivElement>(null)
  const [ind, setInd] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  useLayoutEffect(() => {
    const medir = () => {
      const b = caja.current?.querySelector<HTMLButtonElement>(`[data-tab="${tab}"]`)
      if (!b) return
      setInd({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight })
      b.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
    medir(); window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [tab])
  return (
    <div className="tabs no-print" role="tablist" aria-label="Secciones del diagnóstico" ref={caja}>
      {ind && <span className="tabs-ind" style={{ transform: `translate(${ind.x}px, ${ind.y}px)`, width: ind.w, height: ind.h }} />}
      {TABS.map(([id, t]) => (
        <button key={id} data-tab={id} role="tab" aria-selected={tab === id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{t}</button>
      ))}
    </div>
  )
}

const fmt = (n: number, d = 1) => n.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d })
/** Entero con punto de millar también en cifras de cuatro dígitos (para que la tabla se lea alineada). */
const ent = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const TERRITORIOS = [
  ['tf26', 'Tenerife'],
  ['sur', 'Sur'],
  ['metro', 'Área metropolitana'],
  ['norte', 'Norte'],
] as const
type Territorio = (typeof TERRITORIOS)[number][0]

/** Percepción de los residentes: barra = % de acuerdo; marca = referencia (2024 para Tenerife; Tenerife para cada zona). */
function Percepciones() {
  const [ter, setTer] = useState<Territorio>('tf26')
  const ref = (p: Percepcion) => (ter === 'tf26' ? p.tf24 : p.tf26)
  const refTxt = ter === 'tf26' ? '2024' : 'Tenerife'
  const fila = (p: Percepcion) => {
    const v = p[ter]; const r = ref(p); const d = v - r
    return (
      <li key={p.afirmacion} className={`perc ${p.tipo}`}>
        <span className="perc-t">{p.afirmacion}</span>
        <span className="perc-bar" aria-hidden="true">
          <i style={{ transform: `scaleX(${v / 100})` }} />
          <b style={{ left: `${r}%` }} title={`${refTxt}: ${fmt(r)} %`} />
        </span>
        <span className="perc-v tnum">{fmt(v)} %<small className={Math.abs(d) < 1 ? '' : d > 0 ? 'up' : 'dn'}>{d > 0 ? '+' : ''}{fmt(d)}</small></span>
      </li>
    )
  }
  return (
    <div className="card perc-card">
      <div className="perc-head">
        <div className="chips" role="group" aria-label="Territorio">
          {TERRITORIOS.map(([id, t]) => <button key={id} className={`chip ${ter === id ? 'on' : ''}`} onClick={() => setTer(id)}>{t}</button>)}
        </div>
        <span className="small muted">Barra: % de acuerdo en 2026. Marca y diferencia: frente a {refTxt}.</span>
      </div>
      <div className="grid g2 perc-cols">
        <div><div className="kicker">Lo que aporta</div><ul className="perc-list">{PERCEPCION.filter((p) => p.tipo === 'beneficio').map(fila)}</ul></div>
        <div><div className="kicker">Lo que cuesta</div><ul className="perc-list">{PERCEPCION.filter((p) => p.tipo === 'coste').map(fila)}</ul></div>
      </div>
      <div className="small muted" style={{ marginTop: 10 }}>ISTAC, Encuesta de Hábitos y Confianza Socioeconómica, residentes de 18 años o más <Refs ids={[49, 50]} /></div>
    </div>
  )
}

/** «Qué deja el turismo en tu municipio»: datos reales en lenguaje cercano y lo que hoy no se puede saber. */
function TuMunicipio() {
  const [nom, setNom] = useState(PRESION[0].nombre)
  const m = PRESION.find((x) => x.nombre === nom) ?? PRESION[0]
  const camas = porCien(m)
  const dParo = m.paro - m.paroAnterior
  return (
    <div className="card tu-muni">
      <div className="tu-muni-head">
        <div>
          <div className="kicker">Datos y transparencia</div>
          <h2>Qué deja el turismo en tu municipio</h2>
        </div>
        <label className="small muted">Tu municipio{' '}
          <select className="search tu-muni-sel" value={nom} onChange={(e) => setNom(e.target.value)} aria-label="Elige municipio">
            {PRESION.map((x) => <option key={x.nombre}>{x.nombre}</option>)}
          </select>
        </label>
      </div>
      <div className="grid g4 tu-muni-datos">
        <div className="senal"><b>{fmt(camas, 0)}</b><span>camas turísticas por cada 100 vecinos</span><small>En la isla, {fmt(porCien(PRESION_TENERIFE), 0)} <Refs ids={[55, 56, 57]} /></small></div>
        <div className="senal"><b>{fmt(m.ingresosVV)} M€</b><span>ingresó la vivienda vacacional en 2025</span><small>En la isla, {fmt(PRESION_TENERIFE.ingresosVV, 0)} M€ <Refs ids={[55]} /></small></div>
        <div className="senal"><b>{ent(m.gastoAyto)} €</b><span>gasta el ayuntamiento por vecino al año</span><small>Todo su presupuesto, 2024: no sabemos cuánto viene del turismo <Refs ids={[69]} /></small></div>
        <div className="senal"><b>{ent(m.paro)}</b><span>personas en paro (octubre de 2026)</span><small>{dParo === 0 ? 'Igual' : dParo > 0 ? `${ent(dParo)} más` : `${ent(-dParo)} menos`} que hace un año <Refs ids={[70]} /></small></div>
      </div>
      <div className="grid g2" style={{ marginTop: 20 }}>
        <div>
          <div className="kicker">Lo que se puede saber hoy</div>
          <ul className="list small">{MUNICIPIO_EXISTE.map((d) => <li key={d.dato}>{d.dato} <Refs ids={d.fuentes} /></li>)}</ul>
        </div>
        <div>
          <div className="kicker">Lo que nadie publica por municipio</div>
          <ul className="list small no-existe">{MUNICIPIO_NO_EXISTE.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
      </div>
      <p className="nota"><Icon name="alert" size={14} /> El reto lo señala: no hay cifras desglosadas de lo que el turismo devuelve en sanidad, educación o limpieza. Publicarlas por municipio es parte de la propuesta.</p>
    </div>
  )
}

type FilaPresion = Municipio & { porCien: number } & Record<string, unknown>
const porCien = (m: { poblacion: number; plazasRegladas: number | null; plazasVV: number }) => ((m.plazasRegladas ?? 0) + m.plazasVV) / m.poblacion * 100

export default function Investigacion() {
  const [params, setParams] = useSearchParams()
  const tab = (TABS.find(([id]) => id === params.get('tab'))?.[0] ?? (params.get('f') ? 'fuentes' : 'tenerife')) as Tab
  const setTab = (t: Tab) => setParams({ tab: t }, { replace: true })
  const [cat, setCat] = useState('Todas')
  const [qf, setQf] = useState('')
  const categorias = useMemo(() => ['Todas', ...Array.from(new Set(REFERENTES.map((r) => r.categoria)))], [])
  const refs = REFERENTES.filter((r) => cat === 'Todas' || r.categoria === cat)
  const fuentes = FUENTES.filter((f) => qf === '' || `${f.id} ${f.titulo} ${f.medio} ${f.url}`.toLowerCase().includes(qf.toLowerCase())).sort((a, b) => a.id - b.id)
  const filasPresion: FilaPresion[] = PRESION.map((m) => ({ ...m, porCien: porCien(m) }))
  const mediaIsla = porCien(PRESION_TENERIFE)
  const varEneSep = (TURISTAS_TF_ENE_SEP.y2026 / TURISTAS_TF_ENE_SEP.y2025 - 1) * 100

  // ?f=12 → abre la lista de fuentes, salta a la 12 y la resalta
  const f = params.get('f')
  useEffect(() => {
    if (!f) return
    setQf('')
    setTimeout(() => {
      const el = document.getElementById(`fuente-${f}`)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('hl')
      setTimeout(() => el.classList.remove('hl'), 2200)
    }, 60)
  }, [f])

  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Entregable · diagnóstico</span>
        <h1>Qué pasa de verdad entre vecinos y turistas en Tenerife</h1>
        <p>Datos oficiales de Tenerife y lo que aún hay que preguntar en la calle. Cada dato lleva su fuente <span className="ref" style={{ pointerEvents: 'none' }}>n</span>.</p>
      </header>

      <div className="inv-layout">
        <Pestanas tab={tab} setTab={setTab} />

        <div key={tab} className="tab-panel" role="tabpanel">
          {tab === 'tenerife' && (<>
            <section id="esencial">
              <div className="hero-stats">
                {CIFRAS_TENERIFE.map((e, n) => (
                  <div key={e.etiqueta} className={`hero-stat enter enter-${n + 2}`}>
                    <b><Contador valor={e.valor} /></b>
                    <span>{e.etiqueta}</span>
                    <small>{e.detalle} <Refs ids={e.fuentes} /></small>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <div className="section-head"><div><h2>La respuesta corta</h2><p>Lo que dicen los datos, antes de entrevistar a nadie.</p></div></div>
              <div className="grid g3">
                {RESPUESTA_RETO.map((r, n) => (
                  <div key={r.titulo} className="card resp enter" style={{ animationDelay: `${0.15 + n * 0.06}s` }}>
                    <span className="resp-n">{n + 1}</span>
                    <h3>{r.titulo}</h3>
                    <p>{r.texto} <Refs ids={r.fuentes} /></p>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <div className="section-head"><div><h2>Qué piensan los residentes</h2><p>Elige la zona. En dos años casi todo lo bueno baja y casi todo lo malo sube.</p></div></div>
              <Percepciones />
            </section>

            <section className="section">
              <div className="section-head"><div><h2>Cuatro Tenerifes</h2><p>El malestar no es igual en el sur que en Santa Cruz o en un pueblo del norte.</p></div></div>
              <div className="grid g4 zonas">
                {ZONAS.map((z) => (
                  <div key={z.id} className="card zona">
                    <div className="ref-top"><span className="tag">{z.ejemplos}</span>{z.hipotesis && <span className="tag warn">Hipótesis</span>}</div>
                    <h3>{z.nombre}</h3>
                    <p className="small">{z.resumen}</p>
                    <ul className="list small">{z.datos.map((d) => <li key={d}>{d}</li>)}</ul>
                    <div className="small muted" style={{ marginTop: 'auto' }}><Refs ids={z.fuentes} /></div>
                  </div>
                ))}
              </div>
              <p className="nota"><Icon name="alert" size={14} /> {AVISO_TENERIFE} De enero a septiembre de 2026 llegaron {fmt(TURISTAS_TF_ENE_SEP.y2026 / 1e6, 2)} M de turistas, un {fmt(varEneSep)} % frente a 2025 <Refs ids={[46]} />.</p>
            </section>

            <section className="section">
              <div className="card puente">
                <div>
                  <div className="kicker">De aquí sale la propuesta</div>
                  <p>La gente valora el encuentro con quien viene de fuera (72,9 %) <Refs ids={[49]} />, pero no ve el retorno ni se siente parte. Tenique responde a eso.</p>
                </div>
                <Link className="btn primary" to={rutaDe('prototipo')}>Ver Tenique <Icon name="arrow" size={14} /></Link>
              </div>
            </section>
          </>)}

          {tab === 'presion' && (
            <section id="presion">
              <div className="section-head"><div><h2>Dónde aprieta</h2><p>Plazas turísticas por cada 100 vecinos. En Adeje hay más camas turísticas que vecinos; en Santa Cruz, 3 por cada 100.</p></div></div>
              <Tabla<FilaPresion>
                titulo="Plazas turísticas por cada 100 habitantes · septiembre de 2026"
                fuentes={[55, 56, 57]}
                filas={filasPresion}
                minAncho={620}
                columnas={[
                  { clave: 'nombre', titulo: 'Municipio' },
                  { clave: 'zona', titulo: 'Zona' },
                  { clave: 'poblacion', titulo: 'Habitantes', num: true, render: (m) => ent(m.poblacion) },
                  { clave: 'plazasRegladas', titulo: 'Hoteles y apart.', num: true, render: (m) => (m.plazasRegladas == null ? 's. d.' : ent(m.plazasRegladas)) },
                  { clave: 'plazasVV', titulo: 'Vivienda vac.', num: true, render: (m) => ent(m.plazasVV) },
                  { clave: 'porCien', titulo: 'Por 100 hab.', num: true, render: (m) => <span className="presion-v"><i style={{ transform: `scaleX(${Math.min(m.porCien, 130) / 130})` }} /><b>{fmt(m.porCien)}</b></span> },
                ]}
              />
              <div className="grid g3" style={{ marginTop: 16 }}>
                <div className="senal"><b><Contador valor={fmt(mediaIsla)} /></b><span>plazas por cada 100 vecinos en toda la isla</span><small>{ent(PRESION_TENERIFE.plazasRegladas + PRESION_TENERIFE.plazasVV)} plazas para {ent(PRESION_TENERIFE.poblacion)} habitantes <Refs ids={[55, 56, 57]} /></small></div>
                <div className="senal"><b><Contador valor={ent(PRESION_TENERIFE.viviendasVV)} /></b><span>viviendas vacacionales disponibles</span><small>el 41 % de Canarias; {fmt((PRESION_TENERIFE.viviendasVV / PRESION_TENERIFE.viviendasVVAnterior - 1) * 100)} % en un año <Refs ids={[55]} /></small></div>
                <div className="senal"><b>49 %</b><span>de las plazas inscritas son vivienda vacacional</span><small>130.283 de 266.480 en 2025 <Refs ids={[8]} /></small></div>
              </div>
              <p className="nota"><Icon name="alert" size={14} /> Elaboración propia con datos del ISTAC. «s. d.»: el ISTAC no publica las plazas de hoteles y apartamentos de los municipios con poca oferta. La vivienda vacacional cuenta la oferta disponible en el mes, no las inscritas.</p>
            </section>
          )}

          {tab === 'causas' && (
            <section id="causas">
              <div className="section-head"><div><h2>Causas, con evidencia</h2><p>Más allá de la vivienda y la movilidad. Las tres primeras son las que más pesan en la propuesta.</p></div></div>
              <div className="grid g3">
                {CAUSAS.map((c, n) => (
                  <div key={c.titulo} className={`card causa ${c.principal ? 'principal' : ''}`}>
                    <div className="ref-top">{c.principal ? <span className="tag ok">Causa principal {n + 1}</span> : <span className="tag">Causa</span>}</div>
                    <h3>{c.titulo}</h3>
                    <p className="small">{c.resumen}</p>
                    <ul className="list small">{c.evidencia.map((e) => <li key={e}>{e}</li>)}</ul>
                    <div className="small muted"><Refs ids={c.fuentes} /></div>
                    <div className={`causa-tq ${c.tenique.replace(' ', '-')}`}>
                      <b>Tenique {c.tenique === 'aborda' ? 'lo aborda' : c.tenique === 'en parte' ? 'lo aborda en parte' : 'no lo aborda'}.</b> {c.queHace}
                      {c.quien && <div className="causa-quien"><b>Quién debe resolverlo:</b> {c.quien.texto} <Refs ids={c.quien.fuentes} /></div>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="section-head" style={{ marginTop: 36 }}><div><h2>Hipótesis a validar con entrevistas</h2><p>Sin evidencia todavía. No las damos por hechas. H1–H7 son las mismas del guion de entrevistas.</p></div></div>
              <div className="acordeon">
                {HIPOTESIS.map((h) => (
                  <details key={h.id}>
                    <summary><span>{h.id} · {h.texto}</span><small>{h.aQuien}</small></summary>
                    <p className="small"><b>Por qué lo pensamos:</b> {h.porQue}</p>
                    <p className="quote" style={{ fontSize: 16, marginTop: 8 }}>{h.pregunta}</p>
                    {h.guion && <p className="small muted">Preguntas del guion: {h.guion}{h.id === 'H6' && <> · marca <Refs ids={[75]} /></>}</p>}
                  </details>
                ))}
              </div>
            </section>
          )}

          {tab === 'personas' && <UsuariosSeccion />}

          {tab === 'retorno' && (
            <section id="retorno">
              <TuMunicipio />
              <div className="section-head" style={{ marginTop: 36 }}><div><h2>Qué devuelve el turismo a la isla</h2><p>Lo que está publicado para Tenerife, y lo que falta.</p></div></div>
              <div className="senales">
                {RETORNO.map((d, n) => (
                  <div key={d.etiqueta} className="senal enter" style={{ animationDelay: `${0.1 + n * 0.05}s` }}>
                    <b><Contador valor={d.valor} /></b>
                    <span>{d.etiqueta}</span>
                    <small>{d.detalle} <Refs ids={d.fuentes} /> {!d.verificado && <Verificado ok={false} />}</small>
                  </div>
                ))}
              </div>
              <div className="card" style={{ marginTop: 24 }}>
                <div className="kicker">Lo que no se puede saber hoy</div>
                <ul className="list">{RETORNO_HUECOS.map((h) => <li key={h}>{h}</li>)}</ul>
                <div className="small muted" style={{ marginTop: 8 }}>Comparación con Canarias <Refs ids={[61]} /></div>
              </div>
            </section>
          )}

          {tab === 'benchmark' && (
            <section id="benchmark">
              <div className="section-head"><div><h2>Quién lo ha resuelto antes</h2><p>Convivencia y corresponsabilidad, con resultado medido. Y qué aprendemos para Tenique.</p></div></div>
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
                    {r.leccion && <p className="leccion"><b>Para Tenique:</b> {r.leccion}</p>}
                    <div className="small muted" style={{ marginTop: 'auto', paddingTop: 8 }}><Refs ids={r.fuentes} /></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === 'canarias' && (<>
            <section id="canarias">
              <div className="section-head"><div><h2>Comparación: Canarias en 2026</h2><p>Estas cifras son de todo el archipiélago, no de Tenerife. Sirven solo para comparar.</p></div></div>
              <div className="senales">
                {CIFRAS_2026.map((d) => (
                  <div key={d.etiqueta} className="senal">
                    <b className={d.valor.startsWith('-') ? 'down' : ''}>{d.valor}</b>
                    <span>{d.etiqueta}</span>
                    <small>{d.detalle} <Refs ids={d.fuentes} /> {!d.verificado && <Verificado ok={false} />}</small>
                  </div>
                ))}
              </div>
              <p className="nota"><Icon name="alert" size={14} /> {AVISO_SERIES}</p>
            </section>
            <section className="section">
              <div className="section-head"><div><h2>Comparación: Tenerife frente a las demás islas</h2><p>Perfil del turista por isla, 2025. Sirve para situar a Tenerife, no es parte del diagnóstico.</p></div></div>
              <MapaIslas />
            </section>
          </>)}

          {tab === 'fuentes' && (
            <section id="fuentes">
              <div className="card" style={{ marginBottom: 24 }}>
                <div className="kicker">Datos abiertos que usamos</div>
                <ul className="list">{DATOS_ABIERTOS.map((d) => <li key={d.nombre}><b>{d.nombre}</b>: {d.que} <span className="muted">{d.acceso}</span> <Refs ids={d.fuentes} /></li>)}</ul>
              </div>
              <div className="section-head"><div><h2>Fuentes</h2><p>{FUENTES.length} fuentes numeradas. Pulsa cualquier número de la página para saltar aquí.</p></div></div>
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
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
