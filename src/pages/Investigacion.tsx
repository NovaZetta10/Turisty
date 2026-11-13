import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  AVISO_SERIES, AVISO_TENERIFE, CAUSAS, CIFRAS_2026, CIFRAS_TENERIFE, DATOS_ABIERTOS, FUENTES, GUION, HALLAZGO_JOVENES, HIPOTESIS, IMPORTA_ARRASTRE, IMPORTA_TURISMO, SONDEO, type ItemSondeo,
  ANTES_DESPUES, MUNICIPIO_EXISTE, MUNICIPIO_NO_EXISTE, PERCEPCION, PRESION, PRESION_TENERIFE, REFERENTES, RESPUESTA_RETO, RETORNO, RETORNO_COMPROMISO, RETORNO_HUECOS,
  SIN_ANTES_DESPUES,
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
      <Compromiso />
    </div>
  )
}

/** Compromiso de publicar el retorno por municipio (propuesta, sin cifras). */
function Compromiso() {
  return (
    <div className="compromiso">
      <div className="kicker"><Icon name="check" size={13} /> Nuestro compromiso</div>
      <p className="compromiso-frase">{RETORNO_COMPROMISO.frase}</p>
      <ol className="list small">{RETORNO_COMPROMISO.pasos.map((x) => <li key={x}>{x}</li>)}</ol>
      <p className="small muted">Es una propuesta: hoy nadie publica estas cifras y no las inventamos. El reto lo señala como carencia.</p>
    </div>
  )
}

/** Barras de acuerdo del sondeo. Con `desacuerdo`, la barra se parte en acuerdo / desacuerdo. */
function BarrasSondeo({ items, tipo }: { items: ItemSondeo[]; tipo: 'coste' | 'beneficio' | 'falta' }) {
  return (
    <ul className="perc-list sond-list">
      {items.map((x) => (
        <li key={x.texto} className={`perc sond ${tipo}`}>
          <span className="perc-t">{x.texto}</span>
          <span className="perc-v">{x.acuerdo} %{x.desacuerdo != null && <small>en desacuerdo: {x.desacuerdo} %</small>}</span>
          <span className="perc-bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${x.acuerdo / 100})` }} />
            {x.desacuerdo != null && <i className="sond-no" style={{ transform: `scaleX(${x.desacuerdo / 100})` }} />}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** «Nuestro sondeo (exploratorio)»: encuesta propia, muestra de conveniencia. */
function Sondeo() {
  return (
    <section className="section">
      <div className="section-head"><div><h2>Nuestro sondeo (exploratorio)</h2><p>Lo preguntamos a {SONDEO.n} residentes cercanos al equipo el {SONDEO.fecha}. Porcentaje «de acuerdo» o «muy de acuerdo».</p></div></div>
      <p className="nota sond-aviso"><Icon name="alert" size={14} /> Es una muestra de conveniencia y no es representativa: sobre todo gente joven ({SONDEO.edad}). Sirve para orientar las entrevistas, no para medir la isla. <Refs ids={SONDEO.fuentes} /></p>

      <div className="card sond-mensaje">
        <div className="kicker">Lo que nos dice</div>
        <p>Valoran el encuentro con la gente de fuera (79 %), pero sienten que su cultura y su economía local no ganan: solo el 23 % cree que el turismo mantiene la identidad y el 32 %, que impulsa el consumo de productos locales. Ese es el hueco de Tenique.</p>
      </div>

      <div className="grid g2 sond-cols">
        <div className="card">
          <h3>Lo que valoran</h3>
          <BarrasSondeo items={SONDEO.valoran} tipo="beneficio" />
        </div>
        <div className="card">
          <h3>Lo que echan de menos</h3>
          <BarrasSondeo items={SONDEO.echanDeMenos} tipo="falta" />
          <p className="small muted sond-ley"><i className="sond-key si" /> de acuerdo · <i className="sond-key no" /> en desacuerdo</p>
        </div>
      </div>

      <div className="grid g2 sond-cols">
        <div className="card">
          <h3>Los problemas que ven</h3>
          <BarrasSondeo items={SONDEO.problemas} tipo="coste" />
        </div>
        <div className="card sond-lado">
          <div>
            <h3>Qué cambiarían</h3>
            <p className="small muted">Pregunta abierta, resumida por temas.</p>
            <ul className="list small">{SONDEO.temas.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div>
            <h3>Frente al ISTAC</h3>
            <p className="small">Aquí, el 79 % ve tensiones entre residentes y turistas; en la encuesta oficial, el 53,9 % <Refs ids={[49]} />. No son comparables: nuestra muestra es pequeña y muy joven. Encaja con la hipótesis H10, que dice que los jóvenes son los más críticos.</p>
          </div>
          <div>
            <h3>Línea base</h3>
            <p className="small">Repetiremos las mismas preguntas a quien participe en la prueba de concepto de dos semanas, antes y después, para ver si algo cambia.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

type FilaPresion = Municipio & { porCien: number } & Record<string, unknown>
const porCien = (m: { poblacion: number; plazasRegladas: number | null; plazasVV: number }) => ((m.plazasRegladas ?? 0) + m.plazasVV) / m.poblacion * 100

const FILTROS_CAUSA = [['todas', 'Todas'], ['principales', 'Principales'], ['otras', 'Otras causas']] as const
type FiltroCausa = (typeof FILTROS_CAUSA)[number][0]
const GRUPOS_CAUSA = [
  { id: 'principales', titulo: 'Esto es lo que pasa', texto: 'Las causas que más pesan. Tenique no las resuelve: son de otras instituciones, y decimos cuáles.' },
  { id: 'otras', titulo: 'Esto es lo que atacamos', texto: 'Otras causas con evidencia. Aquí una plataforma de encuentro sí puede mover algo: que el retorno se vea, que el beneficio llegue a más gente y que el encuentro sea real.' },
] as const

function Causas() {
  const [filtro, setFiltro] = useState<FiltroCausa>('todas')
  const cuenta = (f: FiltroCausa) => (f === 'todas' ? CAUSAS.length : CAUSAS.filter((c) => (f === 'principales') === !!c.principal).length)
  return (
    <section id="causas">
      <div className="section-head"><div><h2>Causas, con evidencia</h2><p>Primero, lo que pasa: el malestar va ligado sobre todo a la vivienda y la movilidad, como dice el reto. Tenique no las resuelve. Después, las causas que sí atacamos y por qué.</p></div></div>
      <div className="chips causa-filtro" role="group" aria-label="Filtrar causas">
        {FILTROS_CAUSA.map(([id, txt]) => (
          <button key={id} type="button" className={`chip ${filtro === id ? 'on' : ''}`} aria-pressed={filtro === id} onClick={() => setFiltro(id)}>
            {txt} <span className="causa-n">{cuenta(id)}</span>
          </button>
        ))}
      </div>
      {GRUPOS_CAUSA.filter((g) => filtro === 'todas' || filtro === g.id).map((g) => (
        <div key={g.id} className="causa-grupo">
          <div className="causa-grupo-head"><h3>{g.titulo}</h3><p className="small muted">{g.texto}</p></div>
          <div className="grid g3">
            {CAUSAS.map((c, n) => ({ c, n })).filter(({ c }) => !!c.principal === (g.id === 'principales')).map(({ c, n }) => (
              <div key={c.titulo} className={`card causa ${c.principal ? 'principal' : ''}`}>
                <div className="ref-top">{c.principal ? <span className="tag warn">Causa principal {n + 1}</span> : <span className="tag">{c.tema ?? 'Otra causa'}</span>}</div>
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
        </div>
      ))}

      <div className="card hallazgo">
        <div className="ref-top"><span className="tag">Jóvenes</span><span className="tag warn">Hallazgo de nuestra búsqueda</span></div>
        <h3>{HALLAZGO_JOVENES.titulo}</h3>
        <p className="small">{HALLAZGO_JOVENES.texto}</p>
        <div className="kicker">Lo que más falta</div>
        <ul className="list small">{HALLAZGO_JOVENES.falta.map((x) => <li key={x}>{x}</li>)}</ul>
        <p className="leccion"><b>Para Tenique:</b> {HALLAZGO_JOVENES.tenique}</p>
        <div className="small muted">No es una estadística oficial: es lo que encontró el equipo el 12-11-2026 en estas páginas: <Refs ids={HALLAZGO_JOVENES.fuentes} /></div>
      </div>

      <div className="section-head" style={{ marginTop: 36 }}><div><h2>Hipótesis del diagnóstico</h2><p>Sin evidencia todavía. No las damos por hechas. H1–H7 son las mismas del guion de entrevistas. H11 (depuradoras) es técnica: no entra en el guion de vecinos y se contrasta con el Consejo Insular de Aguas y los ayuntamientos. No son las hipótesis del piloto, que están en el plan de acción.</p><p className="small muted guion-leyenda">V2 = pregunta 2 del guion para vecinos; T = turistas. Las hipótesis se contrastan en las entrevistas y la encuesta. Toca un código para ver la pregunta.</p></div></div>
      <div className="acordeon">
        {HIPOTESIS.map((h) => (
          <details key={h.id}>
            <summary><span>{h.id} · {h.texto}</span><small>{h.aQuien}</small></summary>
            <p className="small"><b>Por qué lo pensamos:</b> {h.porQue}</p>
            <p className="quote" style={{ fontSize: 16, marginTop: 8 }}>{h.pregunta}</p>
            {h.guion && <Guion codigos={h.guion} extra={h.id === 'H6' ? <> · marca <Refs ids={[75]} /></> : null} />}
          </details>
        ))}
      </div>
    </section>
  )
}

/** Códigos del guion (V2, T5…): cada uno abre el texto de su pregunta al pasar el ratón o al tocarlo. */
function Guion({ codigos, extra }: { codigos: string; extra?: ReactNode }) {
  const [abierto, setAbierto] = useState<string | null>(null)
  const lista = codigos.split(',').map((x) => x.trim())
  return (
    <div className="small muted guion">
      <span>Preguntas del guion: </span>
      {lista.map((cod) => (
        <button key={cod} type="button" className="guion-cod" title={GUION[cod]} aria-expanded={abierto === cod}
          onClick={() => setAbierto(abierto === cod ? null : cod)}>{cod}</button>
      ))}
      {extra}
      {abierto && GUION[abierto] && <p className="guion-txt"><b>{abierto}</b> · {GUION[abierto]}</p>}
    </div>
  )
}

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

            <Sondeo />

            <section className="section">
              <div className="section-head"><div><h2>Cuatro Tenerifes</h2><p>El malestar no es igual en el sur que en Santa Cruz o en un pueblo del norte.</p></div></div>
              <div className="grid g4 zonas">
                {ZONAS.map((z) => (
                  <div key={z.id} className="card zona">
                    <div className="ref-top"><span className="tag">{z.ejemplos}</span></div>
                    <h3>{z.nombre}</h3>
                    <p className="small">{z.resumen}</p>
                    <ul className="list small">{z.datos.map((d) => <li key={d}>{d}</li>)}</ul>
                    <div className="small muted zona-pie">{z.hipotesis && <span className="tag warn">Hipótesis</span>}<Refs ids={z.fuentes} /></div>
                  </div>
                ))}
              </div>
              <p className="nota"><Icon name="alert" size={14} /> {AVISO_TENERIFE} De enero a septiembre de 2026 llegaron {fmt(TURISTAS_TF_ENE_SEP.y2026 / 1e6, 2)} M de turistas, un {fmt(varEneSep)} % frente a 2025 <Refs ids={[46]} />.</p>
            </section>

            <section className="section">
              <div className="section-head"><div><h2>Por qué importa el turismo</h2><p>En 2020 el turismo se paró y la isla lo notó en el paro y en las empresas. La solución no es menos turismo, sino un turismo mejor.</p></div></div>
              <div className="grid g2 imp-grid">
                {IMPORTA_TURISMO.map((d) => (
                  <article key={d.etiqueta} className="card imp">
                    <div className="ref-top"><span className="tag">{d.ambito}</span></div>
                    <h3>{d.etiqueta}</h3>
                    <ol className="imp-serie" aria-label={`${d.etiqueta}: 2019, 2020 y ${d.cuandoHoy}`}>
                      <li><small>2019</small><b>{d.antes}</b></li>
                      <li className="imp-covid"><small>2020 · COVID</small><b>{d.covid}</b></li>
                      <li className="imp-hoy"><small>{d.cuandoHoy}</small><b>{d.hoy}</b></li>
                    </ol>
                    <p className="small">{d.nota} <Refs ids={d.fuentes} /></p>
                  </article>
                ))}
              </div>
              <div className="card imp-mariposa">
                <div className="kicker">Efecto mariposa</div>
                <p>{IMPORTA_ARRASTRE.texto} <Refs ids={IMPORTA_ARRASTRE.fuentes} /></p>
                <p className="imp-idea">El turismo debería ser un pulmón para el desarrollo de toda la isla: lo que genera tiene que llegar a todas las áreas, también a los barrios que hoy no lo notan. Eso es lo que busca Tenique.</p>
              </div>
              <p className="nota"><Icon name="alert" size={14} /> Canarias solo como comparación: el empleo y el PIB turístico no se publican por isla. Las cifras de 2025 de Exceltur son un avance.</p>
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

          {tab === 'causas' && <Causas />}

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
              <div className="section-head"><div><h2>Antes y después</h2><p>Iniciativas parecidas con una cifra de antes y otra de después, comprobadas en su fuente.</p></div></div>
              <div className="grid g2 ad-grid">
                {ANTES_DESPUES.map((c) => (
                  <article key={c.caso} className={`card ad ${c.aviso ? 'aviso' : ''}`}>
                    <div className="ref-top"><span className="tag">{c.lugar}</span>{c.aviso && <span className="tag warn">Aviso</span>}</div>
                    <h3>{c.caso}</h3>
                    <p className="small">{c.que}</p>
                    <div className="ad-cifras">
                      <div className="ad-antes"><small>Antes</small><b>{c.antes.valor}</b><span>{c.antes.texto}</span></div>
                      <span className="ad-flecha" aria-hidden="true"><Icon name="right" size={18} /></span>
                      <div className="ad-despues"><small>Después</small><b>{c.despues.valor}</b><span>{c.despues.texto}</span></div>
                    </div>
                    {c.extra && <p className="small">{c.extra}</p>}
                    <p className="leccion"><b>Para Tenique:</b> {c.leccion}</p>
                    <div className="small muted" style={{ marginTop: 'auto' }}><Refs ids={c.fuentes} /></div>
                  </article>
                ))}
              </div>
              <div className="card ad-sin">
                <div className="kicker">Sin antes y después fiable</div>
                <ul className="list small">{SIN_ANTES_DESPUES.map((x) => <li key={x.caso}><b>{x.caso}:</b> {x.motivo}</li>)}</ul>
              </div>

              <div className="section-head" style={{ marginTop: 36 }}><div><h2>Quién lo ha resuelto antes</h2><p>Convivencia y corresponsabilidad, con resultado medido. Y qué aprendemos para Tenique.</p></div></div>
              <div className="chips" style={{ marginBottom: 14 }}>
                {categorias.map((c) => <button key={c} type="button" className={`chip ${cat === c ? 'on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
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
              <p className="nota"><Icon name="alert" size={14} /> Este perfil (Promotur) cuenta solo turistas de 16 años o más: 6,44 M en Tenerife en 2025 <Refs ids={[41]} />. El total de la isla, con menores, es 7,56 M según el balance de Turismo de Tenerife <Refs ids={[8]} />, que es la cifra que usamos en el diagnóstico.</p>
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
                      {x.url ? <a className="url" href={x.url} target="_blank" rel="noreferrer">{x.url}</a> : <span className="url">Sin enlace público: solo se publican porcentajes agregados.</span>}
                    </div>
                    {!x.url ? <span className="tag">Propia</span> : x.abierta ? <span className="tag ok"><Icon name="check" size={12} />Abierta</span> : <span className="tag warn">No se pudo abrir</span>}
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
