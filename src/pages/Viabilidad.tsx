import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Barras } from '../components/Grafico'
import { Tabla, type Columna } from '../components/Tabla'
import { Cifra, Rejilla, Tarjeta } from '../components/Tarjeta'
import { Refs, Verificado } from '../components/Refs'
import { AGENTES, type AgenteId } from '../data/responsabilidades'
import {
  CALENDARIO, CARRILES, type ItemCalendario, DAFO,
  CATEGORIA_TXT, COSTES, MEDIOAMBIENTE, PRUEBA_CONCEPTO, SENTIDO_FONDO, ESCENARIOS, FASES, FONDO, KPIS, LEGAL, LIMITES, OPCIONES, RESIDENTE, PILOTO, RIESGOS, SUPUESTOS, SUPUESTOS_FONDO, fondoAnual, importe, totales,
  type Categoria, type Coste, type IndicadorPrueba, type Pagador, type Hipotesis, type Nivel, type Riesgo,
} from '../data/viabilidad'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { rutaDe } from '../config/proyecto'
import '../styles/viabilidad.css'

// Pestaña «Plan de acción» (id 'viabilidad', ruta /plan). Datos en src/data/viabilidad.ts.
const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const n0 = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 })
const num = (v: string) => (Number.isFinite(Number(v)) ? Math.max(0, Number(v)) : 0)

function SupuestoTag({ si }: { si: boolean }) {
  return si ? <span className="tag warn"><span className="dot" />Supuesto</span> : <span className="tag ok"><span className="dot" />Precio oficial</span>
}
// Niveles: bajo = verde, medio = ámbar, alto = rojo. Siempre con el texto visible.
const NIVEL_TXT: Record<Nivel, string> = { bajo: 'Bajo', medio: 'Medio', alto: 'Alto' }
function NivelTag({ n }: { n: Nivel }) {
  return <span className={`tag via-nivel-${n}`}><span className="dot" />{NIVEL_TXT[n]}</span>
}

function Bloque({ id, n, titulo, texto, children }: { id: string; n: number; titulo: string; texto: string; children: ReactNode }) {
  return (
    <section className="section" id={id}>
      <div className="section-head"><div><span className="kicker">{String(n).padStart(2, '0')}</span><h2>{titulo}</h2><p>{texto}</p></div></div>
      {children}
    </section>
  )
}

// ─── 1 · hoja de ruta ────────────────────────────────────────────────────────
function HojaDeRuta() {
  return (
    <ol className="via-ruta">
      {FASES.map((f, i) => (
        <li key={f.id} className="via-fase card">
          <div className="via-fase-top">
            <span className="via-fase-n tnum">{i + 1}</span>
            <span className="kicker">{f.cuando}</span>
          </div>
          <h3>{f.titulo}</h3>
          <p className="via-fase-obj">{f.objetivo}</p>
          <p className="small muted">{f.alcance}</p>
          <ul className="via-hitos">
            {f.hitos.map((h) => (
              <li key={h.que}><span>{h.que}<Refs ids={h.fuentes ?? []} /></span><small>{h.lidera}</small></li>
            ))}
          </ul>
          {f.decision && <p className="via-decision small">{f.decision}</p>}
        </li>
      ))}
    </ol>
  )
}

// ─── calendario interactivo ──────────────────────────────────────────────────
// Escala: los meses 0–24 ocupan el 74 % del ancho; del 24 al 60, el resto (comprimida).
const CORTE = 24
const PARTE = 74
const pos = (m: number) => (m <= CORTE ? (m / CORTE) * PARTE : PARTE + ((m - CORTE) / (60 - CORTE)) * (100 - PARTE))
const MARCAS = [0, 3, 6, 9, 12, 18, 24, 36, 48, 60]
const cuando = (it: ItemCalendario) => (it.hasta === undefined ? `Mes ${it.desde}` : `Meses ${it.desde}–${it.hasta}`)

// Carril «Comunicación»: hitos del pitch si existe src/data/comunicacion.ts con HITOS_CALENDARIO.
type HitoCom = { desde?: number; mes?: number; hasta?: number; titulo: string; que?: string; lidera?: string; agentes?: AgenteId[] }
const MOD_COM = import.meta.glob<{ HITOS_CALENDARIO?: HitoCom[] }>('../data/comunicacion.ts', { eager: true })
const COMUNICACION: ItemCalendario[] = Object.values(MOD_COM).flatMap((m) => m.HITOS_CALENDARIO ?? []).map((h, i) => ({
  id: `com-${i}`, carril: 'comunicacion', desde: h.desde ?? h.mes ?? 0, hasta: h.hasta, titulo: h.titulo,
  que: h.que ?? '', lidera: h.lidera ?? 'Turismo de Tenerife', agentes: h.agentes ?? ['tdt'],
}))
const ITEMS = [...CALENDARIO, ...COMUNICACION]

/** Reparte las barras de un carril en filas para que no se solapen. */
function filasDeBarras(barras: ItemCalendario[]) {
  const filas: ItemCalendario[][] = []
  for (const b of [...barras].sort((a, c) => a.desde - c.desde)) {
    const f = filas.find((x) => (x[x.length - 1].hasta ?? 0) <= b.desde)
    if (f) f.push(b)
    else filas.push([b])
  }
  return filas
}

/** Hitos del mismo mes (o a menos de un mes) van en filas distintas para que no se tapen. */
function filasDeHitos(hitos: ItemCalendario[]) {
  const filas: ItemCalendario[][] = []
  for (const h of [...hitos].sort((a, c) => a.desde - c.desde)) {
    const f = filas.find((x) => h.desde - x[x.length - 1].desde >= 1)
    if (f) f.push(h)
    else filas.push([h])
  }
  return filas
}

type Pop = { it: ItemCalendario; left: number; top: number; ancho: number; origen: number }

function Calendario() {
  const [sel, setSel] = useState('piloto')
  const raiz = useRef<HTMLDivElement>(null)
  const [pop, setPop] = useState<Pop | null>(null)
  // Al pasar el ratón o llegar con el teclado a un rombo, se abre su resumen junto a él. En táctil, el toque abre el panel.
  const abrir = (btn: HTMLElement, it: ItemCalendario) => {
    const r = raiz.current?.getBoundingClientRect()
    if (!r) return
    const b = btn.getBoundingClientRect()
    const cx = b.left + b.width / 2 - r.left
    const ancho = Math.min(280, r.width - 16)
    const left = Math.max(8, Math.min(cx - ancho / 2, r.width - ancho - 8))
    setPop({ it, left, top: b.top - r.top, ancho, origen: cx - left })
  }
  const cerrar = () => setPop(null)
  const [agente, setAgente] = useState<AgenteId | ''>('')
  const actual = ITEMS.find((i) => i.id === sel)
  const suyo = (it: ItemCalendario) => !agente || it.agentes.includes(agente)
  const nombreAgente = AGENTES.find((a) => a.id === agente)?.corto
  const cuantos = ITEMS.filter(suyo).length

  // Flechas: mueven el foco entre barras e hitos, en el orden de lectura.
  const teclas = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const botones = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[data-gantt]')]
    const i = botones.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    const destino = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: botones.length - 1 }[e.key]
    if (destino === undefined) return
    e.preventDefault()
    botones[Math.max(0, Math.min(botones.length - 1, destino))].focus()
  }

  let orden = 0
  return (
    <div className="via-cal" ref={raiz}>
      <div className="via-cal-filtro" role="group" aria-label="Ver lo que hace cada agente">
        <span className="small muted">Ver por agente:</span>
        <button className={`via-chip ${agente === '' ? 'on' : ''}`} aria-pressed={agente === ''} onClick={() => setAgente('')}>Todos</button>
        {AGENTES.map((a) => (
          <button key={a.id} className={`via-chip ${agente === a.id ? 'on' : ''}`} aria-pressed={agente === a.id} onClick={() => setAgente(a.id)}>{a.corto}</button>
        ))}
      </div>
      <p className="small muted via-cal-cuenta" aria-live="polite">
        {agente ? <><b>{nombreAgente}</b> participa en {cuantos} de {ITEMS.length} acciones. El resto se ve atenuado y marcado.</> : <>Toca una barra o un hito para ver qué es, quién lo lidera y cuándo se decide seguir. Con el teclado: tabulador o flechas.</>}
      </p>

      <div className="via-cal-marco" onScroll={cerrar}>
        <div className="via-cal-in" onKeyDown={teclas}>
          {/* eje */}
          <div className="via-cal-fila via-cal-eje" aria-hidden="true">
            <div className="via-cal-nombre" />
            <div className="via-cal-pista">
              <span className="via-cal-ano" style={{ left: '0%', width: `${pos(12)}%` }}>Año 1</span>
              <span className="via-cal-ano" style={{ left: `${pos(12)}%`, width: `${pos(24) - pos(12)}%` }}>Año 2</span>
              <span className="via-cal-ano via-cal-comp" style={{ left: `${pos(24)}%`, width: `${100 - pos(24)}%` }}>Años 3 a 5 · escala comprimida</span>
              {MARCAS.map((m) => <span key={m} className={`via-cal-marca tnum ${m === 0 ? 'ini' : m === 60 ? 'fin' : ''}`} style={{ left: `${pos(m)}%` }}>{m === 0 ? 'Hoy · mes 0' : m}</span>)}
            </div>
          </div>

          {CARRILES.map((c) => {
            const items = ITEMS.filter((i) => i.carril === c.id)
            const filas = filasDeBarras(items.filter((i) => i.hasta !== undefined))
            const filasHitos = filasDeHitos(items.filter((i) => i.hasta === undefined))
            return (
              <div key={c.id} className="via-cal-fila" role="group" aria-label={`Carril ${c.nombre}`}>
                <div className="via-cal-nombre">{c.nombre}</div>
                <div className="via-cal-pista">
                  <span className="via-cal-guia via-cal-hoy" style={{ left: '0%' }} aria-hidden="true" />
                  <span className="via-cal-guia via-cal-m9" style={{ left: `${pos(9)}%` }} aria-hidden="true" />
                  <span className="via-cal-guia via-cal-corte" style={{ left: `${pos(CORTE)}%` }} aria-hidden="true" />
                  {items.length === 0 && <span className="via-cal-vacio small muted">Pendiente: hitos de comunicación del pitch</span>}
                  {filas.map((fila, fi) => (
                    <div key={fi} className="via-cal-sub">
                      {fila.map((it) => {
                        const n = orden++
                        return (
                          <button
                            key={it.id} data-gantt type="button"
                            className={`via-g-barra ${sel === it.id ? 'sel' : ''} ${suyo(it) ? '' : 'off'}`}
                            style={{ left: `${pos(it.desde)}%`, width: `${pos(it.hasta!) - pos(it.desde)}%`, ['--i' as string]: Math.min(n, 12) }}
                            aria-pressed={sel === it.id}
                            aria-label={`${it.titulo}. ${cuando(it)}. Lidera: ${it.lidera}.${suyo(it) ? '' : ` No participa ${nombreAgente}.`}`}
                            title={`${it.titulo} · ${cuando(it)}`}
                            onClick={() => setSel(it.id)}
                          >
                            <span>{it.corto ?? it.titulo}</span>
                          </button>
                        )
                      })}
                    </div>
                  ))}
                  {filasHitos.map((hitos, hi) => (
                    <div key={`h${hi}`} className="via-cal-sub via-cal-hitos">
                      {hitos.map((it) => {
                        const n = orden++
                        return (
                          <button
                            key={it.id} data-gantt type="button"
                            className={`via-g-hito ${it.decision ? 'decision' : ''} ${sel === it.id ? 'sel' : ''} ${suyo(it) ? '' : 'off'}`}
                            style={{ left: `${pos(it.desde)}%`, ['--i' as string]: Math.min(n, 12) }}
                            aria-pressed={sel === it.id}
                            aria-label={`${it.decision ? 'Decisión' : 'Hito'}: ${it.titulo}. ${cuando(it)}. Lidera: ${it.lidera}.${suyo(it) ? '' : ` No participa ${nombreAgente}.`}`}
                            aria-describedby={pop?.it.id === it.id ? 'via-pop' : undefined}
                            onPointerEnter={(e) => { if (e.pointerType === 'mouse') abrir(e.currentTarget, it) }}
                            onPointerLeave={(e) => { if (e.pointerType === 'mouse') cerrar() }}
                            onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) abrir(e.currentTarget, it) }}
                            onBlur={cerrar}
                            onClick={() => setSel(it.id)}
                          ><span aria-hidden="true" /></button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="via-cal-leyenda small muted" aria-hidden="true">
        <span><i className="via-ley-barra" /> Fase o trabajo continuo</span>
        <span><i className="via-ley-hito" /> Hito</span>
        <span><i className="via-ley-decision" /> Decisión de seguir o cambiar</span>
        <span><i className="via-ley-m9" /> Mes 9: seguir o parar</span>
        <span>Los meses de cada hito son supuestos de planificación.</span>
      </div>

      {actual && (
        <div className="card via-cal-panel" aria-live="polite">
          <div className="via-cal-panel-top">
            <span className="kicker">{CARRILES.find((c) => c.id === actual.carril)?.nombre} · {cuando(actual)}</span>
            {actual.decision && <span className="tag warn"><span className="dot" />Decisión</span>}
            {!suyo(actual) && <span className="tag off"><span className="dot" />Sin {nombreAgente}</span>}
          </div>
          <h3>{actual.titulo}<Refs ids={actual.fuentes ?? []} /></h3>
          <p>{actual.que}</p>
          <dl className="via-cal-dl">
            <div><dt>Lidera</dt><dd>{actual.lidera}</dd></div>
            {actual.conQuien && <div><dt>Con quién</dt><dd>{actual.conQuien}</dd></div>}
            <div><dt>Participan</dt><dd className="via-cal-chips">{actual.agentes.map((a) => <span key={a} className="tag">{AGENTES.find((x) => x.id === a)?.corto ?? a}</span>)}</dd></div>
            {actual.umbral && <div><dt>Seguir o parar</dt><dd>{actual.umbral}</dd></div>}
          </dl>
        </div>
      )}
      {pop && (
        <div
          key={pop.it.id} id="via-pop" role="tooltip" className="via-pop"
          style={{ left: pop.left, top: pop.top, width: pop.ancho, transformOrigin: `${pop.origen}px 100%`, ['--flecha' as string]: `${pop.origen}px` }}
        >
          <span className="kicker">{CARRILES.find((c) => c.id === pop.it.carril)?.nombre ?? 'Comunicación'} · {cuando(pop.it)}</span>
          <b>{pop.it.titulo}</b>
          {pop.it.que && <p>{pop.it.que}</p>}
          <small>Lidera: {pop.it.lidera}</small>
        </div>
      )}
    </div>
  )
}

// ─── 2 · fondo del barrio ────────────────────────────────────────────────────
function SimuladorFondo() {
  const [esc, setEsc] = useState(ESCENARIOS[0].id)
  const [v, setV] = useState<Record<string, number>>({ ...ESCENARIOS[0].valores })
  const r = useMemo(() => fondoAnual(v), [v])
  const elegir = (id: string) => {
    const e = ESCENARIOS.find((x) => x.id === id)
    if (e) { setEsc(id); setV({ ...e.valores }) }
  }
  const datos = [
    { etiqueta: 'Empresas turísticas', valor: r.empresas },
    { etiqueta: 'Vivienda vacacional', valor: r.viviendas },
    { etiqueta: 'Reservas y donaciones', valor: r.reservas },
    { etiqueta: 'Cabildo', valor: r.cabildo },
  ].map((d) => ({ ...d, texto: eur.format(d.valor) }))

  return (
    <div className="via-fondo-sim">
      <div className="via-sup card">
        <div className="via-sup-head">
          <div>
            <div className="col-t">Simulador del fondo · un año</div>
            <p className="small muted">Todos los valores son supuestos para discutir, no previsiones. Mueve los controles.</p>
          </div>
          <div className="via-escenarios" role="group" aria-label="Escenario de partida">
            {ESCENARIOS.map((e) => (
              <button key={e.id} className={`btn sm ${esc === e.id ? 'primary' : ''}`} aria-pressed={esc === e.id} onClick={() => elegir(e.id)}>{e.nombre}</button>
            ))}
          </div>
        </div>
        {[...new Set(SUPUESTOS_FONDO.map((s) => s.grupo))].map((g) => (
          <fieldset key={g} className="via-grupo">
            <legend className="small muted">{g}</legend>
            <div className="via-sup-grid">
              {SUPUESTOS_FONDO.filter((s) => s.grupo === g).map((s) => (
                <label key={s.id} className="via-rango">
                  <span>{s.etiqueta} <b className="tnum">{n0.format(v[s.id])} {s.unidad}</b></span>
                  <input type="range" min={s.min} max={s.max} step={s.paso} value={v[s.id]} onChange={(e) => { setEsc(''); setV((x) => ({ ...x, [s.id]: Number(e.target.value) })) }} />
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <p className="small muted" style={{ marginTop: 12 }}>En el piloto los vecinos no cobran: las reservas de pago son de asociaciones, entidades, comercio y productores locales y empresas, y las experiencias de vecinos son gratis o con donación. El comercio y los productores locales no pagan cuota: su reserva aporta el mismo porcentaje que cualquier otra.</p>
      </div>

      <div className="via-totales" aria-live="polite">
        <div className="hero-stat"><small>Fondo del barrio al año</small><b className="tnum">{eur.format(r.total)}</b></div>
        <div className="hero-stat"><small>Ingreso de los anfitriones de pago al año (asociaciones, comercio, productores y empresas)</small><b className="tnum">{eur.format(r.anfitriones)}</b></div>
        <div className="hero-stat"><small>Parte que pone la administración</small><b className={`tnum ${r.pctPublico > 50 ? 'via-alerta' : ''}`}>{n0.format(r.pctPublico)} %</b></div>
      </div>
      {r.pctPublico > 50 && <p className="via-stop small" style={{ marginBottom: 12 }}>Así el fondo depende sobre todo del Cabildo. El modelo pide que la mayor parte sea privada.</p>}
      <Barras titulo="De dónde sale el fondo (un año)" datos={datos} />
    </div>
  )
}

const COL_LEGAL: Columna<(typeof LEGAL)[number]>[] = [
  { clave: 'tema', titulo: 'Tema', render: (l) => <b className="via-partida">{l.tema}</b> },
  { clave: 'pregunta', titulo: 'Qué hay que resolver' },
  { clave: 'quien', titulo: 'Quién lo revisa' },
]

// ─── 5 · costes y simulador ─────────────────────────────────────────────────
function Simulador() {
  const inicial = () => COSTES.map((c) => ({ ...c }))
  const [costes, setCostes] = useState<Coste[]>(inicial)
  const [sup, setSup] = useState(() => Object.fromEntries(SUPUESTOS.map((s) => [s.id, s.valor])) as Record<string, number>)
  const meses = sup.meses ?? 1
  const t = useMemo(() => totales(costes, meses, sup.colchon ?? 0), [costes, meses, sup.colchon])
  const cambia = (id: string, campo: 'cantidad' | 'precio', v: string) => setCostes((cs) => cs.map((c) => (c.id === id ? { ...c, [campo]: num(v) } : c)))
  const restablecer = () => { setCostes(inicial()); setSup(Object.fromEntries(SUPUESTOS.map((s) => [s.id, s.valor]))) }

  const porCategoria = (Object.keys(CATEGORIA_TXT) as Categoria[])
    .map((k) => ({ etiqueta: CATEGORIA_TXT[k], valor: costes.filter((c) => c.categoria === k).reduce((a, c) => a + importe(c) * (c.tipo === 'mensual' ? meses : 1), 0) }))
    .filter((p) => p.valor > 0)
    .sort((a, b) => b.valor - a.valor)
    .map((p) => ({ ...p, texto: eur.format(p.valor) }))

  const PAGADORES: Pagador[] = ['Cabildo', 'Turismo de Tenerife', 'Ayuntamientos']
  const porPagador = PAGADORES
    .map((k) => ({ etiqueta: k, valor: costes.filter((c) => c.paga === k).reduce((a, c) => a + importe(c) * (c.tipo === 'mensual' ? meses : 1), 0) }))
    .filter((p) => p.valor > 0)
    .sort((a, b) => b.valor - a.valor)
    .map((p) => ({ ...p, texto: eur.format(p.valor) }))

  const columnas: Columna<Coste>[] = [
    { clave: 'partida', titulo: 'Partida', render: (c) => <><b className="via-partida">{c.partida}</b>{c.nota && <span className="small muted">{c.nota}</span>}</> },
    { clave: 'categoria', titulo: 'Tipo', render: (c) => <span className="small">{CATEGORIA_TXT[c.categoria]} · {c.tipo === 'mensual' ? 'mensual' : 'una vez'}</span> },
    { clave: 'paga', titulo: 'Paga', render: (c) => <span className="small">{c.paga}</span> },
    { clave: 'cantidad', titulo: 'Cantidad', num: true, render: (c) => <input className="via-input" type="number" min={0} step="any" inputMode="decimal" value={c.cantidad} aria-label={`Cantidad de ${c.partida} (${c.unidad})`} onChange={(e) => cambia(c.id, 'cantidad', e.target.value)} /> },
    { clave: 'unidad', titulo: 'Unidad', render: (c) => <span className="small muted">{c.unidad}</span> },
    { clave: 'precio', titulo: 'Precio (€)', num: true, render: (c) => <input className="via-input" type="number" min={0} step="any" inputMode="decimal" value={c.precio} aria-label={`Precio por ${c.unidad} de ${c.partida}`} onChange={(e) => cambia(c.id, 'precio', e.target.value)} /> },
    { clave: 'id', titulo: 'Importe', num: true, render: (c) => <b className="tnum">{eur.format(importe(c))}</b> },
    { clave: 'supuesto', titulo: 'Base', render: (c) => <span className="via-base"><SupuestoTag si={c.supuesto} /><Refs ids={c.fuentes} /></span> },
  ]

  const supuestos = (
      <div className="via-sup card">
        <div className="via-sup-head">
          <div><div className="col-t">Supuestos del simulador</div><p className="small muted">Para el piloto de 3 municipios. Cambia cantidades y precios en la tabla.</p></div>
          <button className="btn sm" onClick={restablecer}>Restablecer</button>
        </div>
        <div className="via-sup-grid">
          {SUPUESTOS.map((s) => (
            <label key={s.id} className="via-rango">
              <span>{s.etiqueta} <b className="tnum">{sup[s.id]} {s.unidad}</b></span>
              <input type="range" min={s.min} max={s.max} step={s.paso} value={sup[s.id]} onChange={(e) => setSup((x) => ({ ...x, [s.id]: Number(e.target.value) }))} />
            </label>
          ))}
        </div>
      </div>
  )

  return (
    <>
      <div className="via-totales" aria-live="polite">
        <div className="hero-stat"><small>Implantación (una vez)</small><b className="tnum">{eur.format(t.implantacion)}</b></div>
        <div className="hero-stat"><small>Coste mensual</small><b className="tnum">{eur.format(t.mensual)}</b></div>
        <div className="hero-stat"><small>Total con {meses} {meses === 1 ? 'mes' : 'meses'}{t.colchon > 0 ? ' y margen' : ''}</small><b className="tnum">{eur.format(t.piloto)}</b></div>
      </div>

      <div className="via-costes">
        <div className="via-dos">
          {porPagador.length > 0 && <Barras titulo={`Quién paga (${meses} ${meses === 1 ? 'mes' : 'meses'}, sin margen)`} datos={porPagador} />}
          {porCategoria.length > 0 && <Barras titulo={`Coste por tipo (${meses} ${meses === 1 ? 'mes' : 'meses'}, sin margen)`} datos={porCategoria} />}
        </div>
        <details className="via-lista">
          <summary>Ver y cambiar los supuestos y las {costes.length} partidas</summary>
          {supuestos}
          <Tabla<Coste> titulo="Partidas" columnas={columnas} filas={costes} minAncho={900} nota="Precios sin IVA ni IGIC. Los servicios en dólares se pasan a euros 1 a 1 (supuesto). Lo marcado «Supuesto» no tiene fuente y no se presenta como dato." />
        </details>
      </div>
    </>
  )
}

// ─── 3 · piloto ──────────────────────────────────────────────────────────────
const COL_PRUEBA: Columna<IndicadorPrueba>[] = [
  { clave: 'indicador', titulo: 'Indicador' },
  { clave: 'base', titulo: 'Línea base (hoy)', render: (i) => <span className="muted">{i.base}</span> },
  { clave: 'objetivo', titulo: 'Objetivo a 2 semanas', render: (i) => <><span className="via-ok">{i.objetivo}</span>{i.supuesto && <> <SupuestoTag si /></>}</> },
  { clave: 'comoSeMide', titulo: 'Cómo se mide' },
]

const COL_HIPOTESIS: Columna<Hipotesis>[] = [
  { clave: 'hipotesis', titulo: 'Hipótesis' },
  { clave: 'metrica', titulo: 'Cómo la medimos' },
  { clave: 'exito', titulo: 'Seguimos si…', render: (h) => <span className="via-ok">{h.exito}</span> },
  { clave: 'parada', titulo: 'Paramos o cambiamos si…', render: (h) => <span className="via-stop">{h.parada}</span> },
]

// ─── 6 · riesgos ─────────────────────────────────────────────────────────────
const COL_RIESGOS: Columna<Riesgo>[] = [
  { clave: 'riesgo', titulo: 'Riesgo', render: (r) => <>{r.riesgo}{r.porVerificar && <> <Verificado ok={false} /></>}</> },
  { clave: 'tipo', titulo: 'Tipo', render: (r) => <span className="tag">{r.tipo}</span> },
  { clave: 'probabilidad', titulo: 'Probabilidad', render: (r) => <NivelTag n={r.probabilidad} /> },
  { clave: 'impacto', titulo: 'Impacto', render: (r) => <NivelTag n={r.impacto} /> },
  { clave: 'mitigacion', titulo: 'Cómo lo mitigamos' },
]

/** Cuatro cifras de arranque, calculadas con los mismos supuestos que los simuladores. */
function Resumen() {
  const fondo = fondoAnual(ESCENARIOS[0].valores)
  const piloto = totales(COSTES, SUPUESTOS.find((s) => s.id === 'meses')?.valor ?? 6, SUPUESTOS.find((s) => s.id === 'colchon')?.valor ?? 0)
  return (
    <Rejilla cols={4}>
      <Cifra valor="60 meses" etiqueta="Hoja de ruta" detalle="De 3 municipios a toda la isla en el año 3" />
      <Cifra valor="2 semanas" etiqueta="Prueba de concepto" detalle="Primeros resultados medibles antes del piloto; decisión del piloto en el mes 9" />
      <Cifra valor={eur.format(fondo.total)} etiqueta="Fondo del barrio al año" detalle={`Piloto · ${n0.format(100 - fondo.pctPublico)} % privado · supuesto`} />
      <Cifra valor={eur.format(piloto.piloto)} etiqueta="Coste del piloto" detalle="6 meses con margen · supuesto" />
    </Rejilla>
  )
}

/** Recorrido del euro en zigzag, como el sendero del prototipo. En móvil, vertical. Se dibuja al entrar en pantalla. */
function SenderoEuro() {
  const pasos = SENTIDO_FONDO.pasos
  const n = pasos.length
  const caja = useRef<HTMLDivElement>(null)
  const [visto, setVisto] = useState(false)
  useEffect(() => {
    const el = caja.current
    if (!el || typeof IntersectionObserver === 'undefined') { setVisto(true); return }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisto(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const xs = pasos.map((_, i) => i * 100 + 50)
  const ys = pasos.map((_, i) => (i % 2 ? 70 : 30))
  const d = xs.map((x, i) => (i === 0 ? `M ${x} ${ys[i]}` : `C ${xs[i - 1] + 50} ${ys[i - 1]} ${x - 50} ${ys[i]} ${x} ${ys[i]}`)).join(' ')
  return (
    <div ref={caja} className={`via-euro ${visto ? 'visto' : ''}`} style={{ '--n': n } as CSSProperties}>
      <svg className="via-euro-h" viewBox={`0 0 ${n * 100} 100`} preserveAspectRatio="none" aria-hidden="true">
        <path d={d} className="via-euro-base" vectorEffect="non-scaling-stroke" />
        <path d={d} className="via-euro-traza" pathLength={1} vectorEffect="non-scaling-stroke" />
      </svg>
      <ol className="via-euro-pasos" aria-label="Recorrido de cada euro">
        {pasos.map((x, i) => (
          <li key={x.titulo} className={i % 2 ? 'abajo' : 'arriba'} style={{ '--i': i } as CSSProperties}>
            <span className="via-euro-num" aria-hidden="true">{i + 1}</span>
            <span className="via-euro-txt"><b>{x.titulo}</b><small>{x.texto}</small></span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Lleva a un nodo del árbol (o a un bloque) sin tocar la ruta: la web usa HashRouter. */
function irA(id: string) {
  const el = document.getElementById(['arbol', 'medioambiente'].includes(id) ? id : `h-${id}`)
  if (!el) return
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' })
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  el.classList.remove('via-destacado')
  void el.offsetWidth
  el.classList.add('via-destacado')
  window.setTimeout(() => el.classList.remove('via-destacado'), 1800)
}

/** Árbol de decisiones del piloto: cada hipótesis con tres ramas. Umbrales: supuestos. Ajustes y contingencias: propuestas. */
function Arbol() {
  return (
    <div className="via-arbol" id="arbol">
      <div className="via-arbol-ley small">
        <span className="via-rama-t ok">Se cumple → seguimos</span>
        <span className="via-rama-t medio">A medias → ajustamos</span>
        <span className="via-rama-t no">No se cumple → plan de contingencia</span>
        <span className="muted">Los umbrales son supuestos; los ajustes y los planes de contingencia, propuestas.</span>
      </div>
      {PILOTO.hipotesis.map((h, i) => (
        <article key={h.id} id={`h-${h.id}`} className="via-nodo-grupo" aria-labelledby={`hn-${h.id}`}>
          <div className="via-nodo">
            <span className="kicker">Hipótesis {i + 1}</span>
            <h3 id={`hn-${h.id}`}>{h.hipotesis}</h3>
            <p className="small muted">{h.metrica}</p>
          </div>
          <ul className="via-ramas">
            <li className="via-rama ok">
              <span className="via-rama-t ok">Se cumple → seguimos</span>
              <p>{h.exito}</p>
            </li>
            <li className="via-rama medio">
              <span className="via-rama-t medio">A medias → ajustamos</span>
              <p className="small muted">Entre los dos umbrales</p>
              <p>{h.ajuste}</p>
            </li>
            <li className="via-rama no">
              <span className="via-rama-t no">No se cumple → plan de contingencia</span>
              <p className="small muted">{h.parada}</p>
              <p>{h.contingencia} <span className="tag warn"><span className="dot" />Propuesta</span></p>
            </li>
          </ul>
        </article>
      ))}
    </div>
  )
}

/** Gravedad de una casilla: probabilidad × impacto (1–3 cada uno). */
const PESO: Record<Nivel, number> = { bajo: 1, medio: 2, alto: 3 }
const gravedad = (p: Nivel, i: Nivel): Nivel => { const g = PESO[p] * PESO[i]; return g >= 6 ? 'alto' : g >= 3 ? 'medio' : 'bajo' }
const riesgosDe = (p: Nivel, i: Nivel) => RIESGOS.filter((r) => r.probabilidad === p && r.impacto === i)

/** Riesgos en una matriz probabilidad × impacto: cuántos hay en cada casilla. Al tocarla, se listan. */
function MatrizRiesgos() {
  const niveles: Nivel[] = ['alto', 'medio', 'bajo']
  const [sel, setSel] = useState<{ p: Nivel; i: Nivel }>({ p: 'alto', i: 'alto' })
  const lista = riesgosDe(sel.p, sel.i)
  return (
    <div className="via-matriz-bloque">
      <div className="via-matriz-ley">
        <p className="small"><b>Cada número es cuántos riesgos tienen esa probabilidad y ese impacto.</b> Toca una casilla para verlos.</p>
        <div className="via-ley-niveles small" aria-label="Gravedad">
          <span className="muted">Gravedad:</span>
          {(['bajo', 'medio', 'alto'] as Nivel[]).map((n) => <NivelTag key={n} n={n} />)}
        </div>
      </div>
      <div className="via-matriz-cols">
        <div className="via-matriz" role="table" aria-label="Número de riesgos por probabilidad e impacto">
          <div role="row" className="via-matriz-fila">
            <span role="columnheader" className="small muted">Probabilidad ↓ · impacto →</span>
            {[...niveles].reverse().map((i) => <span key={i} role="columnheader" className="small muted">Impacto {i}</span>)}
          </div>
          {niveles.map((p) => (
            <div key={p} role="row" className="via-matriz-fila">
              <span role="rowheader" className="small muted">Probabilidad {p}</span>
              {[...niveles].reverse().map((i) => {
                const n = riesgosDe(p, i).length
                const g = gravedad(p, i)
                const etiqueta = `${n} ${n === 1 ? 'riesgo' : 'riesgos'} · probabilidad ${p} · impacto ${i} · gravedad ${g}`
                const activa = sel.p === p && sel.i === i
                return (
                  <span key={i} role="cell">
                    <button
                      type="button"
                      className={`via-matriz-celda via-g-${g} ${n ? 'con' : ''} ${activa ? 'sel' : ''}`}
                      aria-label={etiqueta}
                      title={etiqueta}
                      aria-pressed={activa}
                      disabled={!n}
                      onClick={() => setSel({ p, i })}
                    >
                      <b className="tnum">{n || '–'}</b>
                      <small>{NIVEL_TXT[g]}</small>
                    </button>
                  </span>
                )
              })}
            </div>
          ))}
        </div>
        <div className="card via-matriz-lista" aria-live="polite">
          <div className="col-t">Probabilidad {sel.p} · impacto {sel.i} <NivelTag n={gravedad(sel.p, sel.i)} /></div>
          {lista.length ? (
            <ul className="list">{lista.map((r) => <li key={r.riesgo}>{r.riesgo}{r.porVerificar && <> <Verificado ok={false} /></>}</li>)}</ul>
          ) : <p className="small muted">Ningún riesgo en esta casilla.</p>}
        </div>
      </div>
    </div>
  )
}

const DAFO_ICONO: Record<string, string> = {
  debilidades: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12h8',
  amenazas: 'M12 8v5M12 16.5v.5M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  fortalezas: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM8.5 12l2.5 2.5 4.5-5',
  oportunidades: 'M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z',
}

/** DAFO en cuadrícula 2×2: arriba lo que juega en contra, abajo lo que juega a favor. */
function Dafo() {
  return (
    <div className="via-dafo">
      {DAFO.map((c) => (
        <section key={c.id} className={`via-dafo-c via-dafo-${c.id}`} aria-labelledby={`dafo-${c.id}`}>
          <header>
            <span className="via-dafo-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={DAFO_ICONO[c.id]} /></svg>
            </span>
            <div><h3 id={`dafo-${c.id}`}>{c.titulo}</h3><small>{c.lado}</small></div>
          </header>
          <ul>
            {c.puntos.map((pt) => (
              <li key={pt.texto}>
                {pt.texto}
                {pt.fuentes && <Refs ids={pt.fuentes} />}
                {pt.supuesto && <> <span className="tag warn"><span className="dot" />Supuesto</span></>}
                {pt.porVerificar && <> <Verificado ok={false} /></>}
                {pt.contingencia && (
                  <button type="button" className="via-dafo-ir" onClick={() => irA(pt.contingencia!)}>
                    {pt.enlace ?? 'Ver plan de contingencia'} <span aria-hidden="true">→</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default function Viabilidad() {
  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Entregable · plan de acción</span>
        <h1>Plan de acción</h1>
        <p>Cómo se pone en marcha Tenique en Tenerife: de un piloto en tres municipios a toda la isla en tres años, con un fondo para cada barrio. Los números son supuestos de trabajo salvo los marcados como precio oficial.</p>
      </header>

      <Resumen />

      <Bloque id="dafo" n={1} titulo="Punto de partida: DAFO" texto="Debilidades, amenazas, fortalezas y oportunidades de Tenique. Cada debilidad y amenaza lleva a su plan de contingencia.">
        <Dafo />
      </Bloque>

      <Bloque id="ruta" n={2} titulo="Hoja de ruta" texto="Cinco años en un calendario. Toca cualquier barra o hito para ver quién lo lidera y cuándo se decide seguir.">
        <Calendario />
        <details className="via-lista">
          <summary>Ver las fases en lista</summary>
          <HojaDeRuta />
        </details>
      </Bloque>

      <Bloque id="fondo" n={3} titulo="El fondo del barrio" texto="Lo pagan sobre todo quienes viven del turismo: empresas turísticas, vivienda vacacional y cada reserva. El Cabildo suma, no sostiene. Los vecinos proponen en qué se gasta y se ve en la calle.">
        <div className="card via-sentido">
          <span className="kicker">Lo que pide Turismo de Tenerife</span>
          <h3>{SENTIDO_FONDO.titulo}</h3>
          <p>{SENTIDO_FONDO.texto}</p>
          <SenderoEuro />
        </div>
        <ol className="via-flujo">
          {FONDO.map((p, i) => (
            <li key={p.titulo} className="card">
              <span className="kicker">Paso {i + 1}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
              <p className="small muted">{p.quien}</p>
            </li>
          ))}
        </ol>
        <div className="card via-residente">
          <div className="col-t">Qué pone el residente</div>
          <p className="small muted">El vecino no solo recibe: también aporta, cada uno como puede.</p>
          <ul className="via-hitos">
            {RESIDENTE.map((r) => <li key={r.que}><span>{r.que}</span><small>{r.texto}</small></li>)}
          </ul>
        </div>
        <SimuladorFondo />
        <div style={{ marginTop: 16 }}>
          <Tabla titulo="Pendiente de revisión legal antes de mover dinero" columnas={COL_LEGAL} filas={LEGAL} minAncho={680} />
        </div>
      </Bloque>

      <Bloque id="prueba" n={4} titulo="Prueba de concepto en 2 semanas" texto={`${PRUEBA_CONCEPTO.lema} ${PRUEBA_CONCEPTO.cuando}`}>
        <Tabla<IndicadorPrueba> titulo="Qué medimos en 2 semanas" columnas={COL_PRUEBA} filas={PRUEBA_CONCEPTO.indicadores} minAncho={720} nota="Línea base 0 solo donde Tenique aún no existe; lo demás se mide el día 1, sin inventar. Los objetivos son supuestos." />
        <p className="small" style={{ marginTop: 10 }}><b>Dónde.</b> {PRUEBA_CONCEPTO.donde} <b>Después.</b> {PRUEBA_CONCEPTO.despues}</p>
      </Bloque>

      <Bloque id="piloto" n={5} titulo="Piloto" texto="Escala la prueba de concepto a 6 meses. Dónde, cuánto tiempo, con quién y qué tiene que pasar para seguir. Los umbrales son supuestos que se fijan con Turismo de Tenerife y el Cabildo.">
        <Rejilla cols={4}>
          <Cifra valor="3" etiqueta="Municipios" detalle="Uno turístico, uno rural y uno metropolitano" />
          <Cifra valor="6 meses" etiqueta="Duración" detalle="Meses 4–9, tras 3 de preparación" />
          <Cifra valor="30–50" etiqueta="Anfitriones" detalle="Vecinos, asociaciones, comercio y empresas" />
          <Cifra valor={String(PILOTO.hipotesis.length)} etiqueta="Hipótesis" detalle="Cada una con umbral para seguir o parar" />
        </Rejilla>
        <details className="via-lista">
          <summary>Ver dónde, cuándo y con quién</summary>
          <dl className="via-cal-dl">
            <div><dt>Dónde</dt><dd>{PILOTO.donde}</dd></div>
            <div><dt>Cuánto tiempo</dt><dd>{PILOTO.duracion}</dd></div>
            <div><dt>Con quién</dt><dd>{PILOTO.conQuien}</dd></div>
          </dl>
        </details>
        <Arbol />
        <details className="via-lista">
          <summary>Ver la tabla de hipótesis y umbrales</summary>
          <Tabla<Hipotesis> titulo="Hipótesis y umbrales" columnas={COL_HIPOTESIS} filas={PILOTO.hipotesis} minAncho={720} />
        </details>
      </Bloque>

      <Bloque id="kpis" n={6} titulo="Cómo sabremos si funciona" texto={`${KPIS.length} indicadores, cada uno ligado a un criterio del reto. Los objetivos son supuestos.`}>
        <Rejilla cols={3}>
          {KPIS.map((k) => (
            <Tarjeta key={k.nombre} kicker={k.criterio} titulo={k.nombre}>
              <p>{k.comoSeMide}</p>
              <p className="small muted" style={{ marginTop: 6 }}>Dato: {k.fuenteDatos}</p>
              {k.objetivo && <p className="small" style={{ marginTop: 6 }}><span className="tag warn"><span className="dot" />Objetivo supuesto</span> {k.objetivo}</p>}
            </Tarjeta>
          ))}
        </Rejilla>
      </Bloque>

      <Bloque id="medioambiente" n={7} titulo="Viabilidad medioambiental" texto="Cuidar el entorno en todos los ámbitos: en la ciudad y en la naturaleza. Son medidas propuestas; los cupos concretos se fijan con cada barrio.">
        <Rejilla cols={4}>
          {MEDIOAMBIENTE.map((m) => (
            <Tarjeta key={m.tema} kicker="Propuesta" titulo={m.tema}>
              <p>{m.que}</p>
              <p className="small muted" style={{ marginTop: 6 }}>{m.quien}</p>
            </Tarjeta>
          ))}
        </Rejilla>
      </Bloque>

      <Bloque id="costes" n={8} titulo="Costes" texto="Implantación (una vez) y coste mensual del piloto. Cambia los supuestos y mira cómo se mueve el total.">
        <Simulador />
      </Bloque>

      <Bloque id="encaje" n={9} titulo="Conexión con Turismo de Tenerife" texto="Tenique no empieza de cero: se apoya en lo que Turismo de Tenerife y el Cabildo ya hacen.">
        <div className="card via-conexion">
          <p>Cómo encaja Tenique con la marca, los programas y los datos que ya existen tiene su propia sección.</p>
          <Link className="btn" to={rutaDe('conexion')}>Ver la conexión con Turismo de Tenerife <Icon name="arrow" size={14} /></Link>
        </div>
      </Bloque>

      <Bloque id="opciones" n={10} titulo="Opciones estudiadas" texto="Ideas que hemos analizado y que no entran en el plan base, con nuestra recomendación.">
        {OPCIONES.map((o) => (
          <div key={o.titulo} className="card via-opcion">
            <div className="via-opcion-head">
              <div><span className="kicker">Opción estudiada</span><h3>{o.titulo}</h3></div>
              <span className="tag warn"><span className="dot" />Recomendación: {o.recomendacion}</span>
            </div>
            <p>{o.queEs}</p>
            <details className="via-lista">
              <summary>Ver a favor, en contra y por qué lo recomendamos así</summary>
              <div className="via-opcion">
                <p className="small muted">{o.origen}</p>
                <div className="via-dos">
                  <div><div className="col-t via-ok">A favor</div><ul className="list">{o.pros.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  <div><div className="col-t via-stop">En contra</div><ul className="list">{o.contras.map((x) => <li key={x}>{x}</li>)}</ul></div>
                </div>
                <p><b>Nuestra recomendación.</b> {o.porque}</p>
                <p className="small"><Verificado ok={false} /> Riesgo legal: {o.riesgoLegal}</p>
              </div>
            </details>
          </div>
        ))}
      </Bloque>

      <Bloque id="riesgos" n={11} titulo="Riesgos" texto="Legales, de adopción, operativos, medioambientales y económicos, con su mitigación. Y los límites de lo que Tenique puede hacer.">
        <MatrizRiesgos />
        <details className="via-lista" open>
          <summary>Ver los {RIESGOS.length} riesgos con su mitigación</summary>
          <Tabla<Riesgo> columnas={COL_RIESGOS} filas={RIESGOS} minAncho={760} />
        </details>
        <div className="card via-limites">
          <div className="col-t">Lo que Tenique no resuelve</div>
          <p className="small muted">Tenique mejora la convivencia, pero no arregla las causas principales del malestar. Cada una corresponde a otras administraciones; el detalle está en el diagnóstico.</p>
          <ul className="via-hitos">
            {LIMITES.map((l) => (
              <li key={l.tema}>
                <span>{l.tema}{!l.verificado && <> <Verificado ok={false} /></>}</span>
                <small>{l.partes.map((p, i) => <span key={p.quien}>{i > 0 && ' · '}{p.quien}<Refs ids={p.fuentes} /></span>)}</small>
              </li>
            ))}
          </ul>
        </div>
      </Bloque>
    </div>
  )
}
