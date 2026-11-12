import { useMemo, useState, type ReactNode } from 'react'
import { Barras } from '../components/Grafico'
import { Tabla, type Columna } from '../components/Tabla'
import { Rejilla, Tarjeta } from '../components/Tarjeta'
import { Refs, Verificado } from '../components/Refs'
import {
  CATEGORIA_TXT, COSTES, ENCAJE, ESCENARIOS, FASES, FONDO, KPIS, LEGAL, LIMITES, PILOTO, RIESGOS, SUPUESTOS, SUPUESTOS_FONDO, fondoAnual, importe, totales,
  type Categoria, type Coste, type Hipotesis, type Nivel, type Riesgo,
} from '../data/viabilidad'
import '../styles/viabilidad.css'

// Pestaña «Plan de acción» (id 'viabilidad', ruta /plan). Datos en src/data/viabilidad.ts.
const eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const n0 = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 })
const num = (v: string) => (Number.isFinite(Number(v)) ? Math.max(0, Number(v)) : 0)

function SupuestoTag({ si }: { si: boolean }) {
  return si ? <span className="tag warn"><span className="dot" />Supuesto</span> : <span className="tag ok"><span className="dot" />Precio oficial</span>
}
const NIVEL_TAG: Record<Nivel, string> = { bajo: 'ok', medio: 'warn', alto: 'off' }
function NivelTag({ n }: { n: Nivel }) {
  return <span className={`tag ${NIVEL_TAG[n]} via-nivel-${n}`}>{n}</span>
}

function Bloque({ id, n, titulo, texto, children }: { id: string; n: number; titulo: string; texto: string; children: ReactNode }) {
  return (
    <section className="section" id={id}>
      <div className="section-head"><div><span className="kicker">0{n}</span><h2>{titulo}</h2><p>{texto}</p></div></div>
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

  const columnas: Columna<Coste>[] = [
    { clave: 'partida', titulo: 'Partida', render: (c) => <><b className="via-partida">{c.partida}</b>{c.nota && <span className="small muted">{c.nota}</span>}</> },
    { clave: 'categoria', titulo: 'Tipo', render: (c) => <span className="small">{CATEGORIA_TXT[c.categoria]} · {c.tipo === 'mensual' ? 'mensual' : 'una vez'}</span> },
    { clave: 'cantidad', titulo: 'Cantidad', num: true, render: (c) => <input className="via-input" type="number" min={0} step="any" inputMode="decimal" value={c.cantidad} aria-label={`Cantidad de ${c.partida} (${c.unidad})`} onChange={(e) => cambia(c.id, 'cantidad', e.target.value)} /> },
    { clave: 'unidad', titulo: 'Unidad', render: (c) => <span className="small muted">{c.unidad}</span> },
    { clave: 'precio', titulo: 'Precio (€)', num: true, render: (c) => <input className="via-input" type="number" min={0} step="any" inputMode="decimal" value={c.precio} aria-label={`Precio por ${c.unidad} de ${c.partida}`} onChange={(e) => cambia(c.id, 'precio', e.target.value)} /> },
    { clave: 'id', titulo: 'Importe', num: true, render: (c) => <b className="tnum">{eur.format(importe(c))}</b> },
    { clave: 'supuesto', titulo: 'Base', render: (c) => <span className="via-base"><SupuestoTag si={c.supuesto} /><Refs ids={c.fuentes} /></span> },
  ]

  return (
    <>
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

      <div className="via-totales" aria-live="polite">
        <div className="hero-stat"><small>Implantación (una vez)</small><b className="tnum">{eur.format(t.implantacion)}</b></div>
        <div className="hero-stat"><small>Coste mensual</small><b className="tnum">{eur.format(t.mensual)}</b></div>
        <div className="hero-stat"><small>Total con {meses} {meses === 1 ? 'mes' : 'meses'}{t.colchon > 0 ? ' y margen' : ''}</small><b className="tnum">{eur.format(t.piloto)}</b></div>
      </div>

      <div className="via-costes">
        <Tabla<Coste> titulo="Partidas" columnas={columnas} filas={costes} minAncho={820} nota="Precios sin IVA ni IGIC. Los servicios en dólares se pasan a euros 1 a 1 (supuesto). Lo marcado «Supuesto» no tiene fuente y no se presenta como dato." />
        {porCategoria.length > 0 && <Barras titulo={`Coste por tipo (${meses} ${meses === 1 ? 'mes' : 'meses'}, sin margen)`} datos={porCategoria} />}
      </div>
    </>
  )
}

// ─── 3 · piloto ──────────────────────────────────────────────────────────────
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

export default function Viabilidad() {
  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Entregable · plan de acción</span>
        <h1>Plan de acción</h1>
        <p>Cómo se pone en marcha Tenique en Tenerife: de un piloto en tres municipios a toda la isla en tres años, con un fondo para cada barrio. Los números son supuestos de trabajo salvo los marcados como precio oficial.</p>
      </header>

      <Bloque id="ruta" n={1} titulo="Hoja de ruta" texto="Cinco fases. Cada una con sus hitos y quién los lidera. Al cerrar el piloto se decide si seguir.">
        <HojaDeRuta />
      </Bloque>

      <Bloque id="fondo" n={2} titulo="El fondo del barrio" texto="Lo pagan sobre todo quienes viven del turismo: empresas turísticas, vivienda vacacional y cada reserva. El Cabildo suma, no sostiene. Los vecinos deciden en qué se gasta y se ve en la calle.">
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
        <SimuladorFondo />
        <div style={{ marginTop: 16 }}>
          <Tabla titulo="Pendiente de revisión legal antes de mover dinero" columnas={COL_LEGAL} filas={LEGAL} minAncho={680} />
        </div>
      </Bloque>

      <Bloque id="piloto" n={3} titulo="Piloto" texto="Dónde, cuánto tiempo, con quién y qué tiene que pasar para seguir. Los umbrales son supuestos que se fijan con Turismo de Tenerife.">
        <Rejilla cols={3}>
          <Tarjeta kicker="Dónde" titulo="3 municipios"><p>{PILOTO.donde}</p></Tarjeta>
          <Tarjeta kicker="Cuánto tiempo" titulo="6 meses"><p>{PILOTO.duracion}</p></Tarjeta>
          <Tarjeta kicker="Con quién" titulo="Todos los que sostienen el fogón"><p>{PILOTO.conQuien}</p></Tarjeta>
        </Rejilla>
        <div style={{ marginTop: 16 }}>
          <Tabla<Hipotesis> titulo="Hipótesis y umbrales" columnas={COL_HIPOTESIS} filas={PILOTO.hipotesis} minAncho={720} />
        </div>
      </Bloque>

      <Bloque id="kpis" n={4} titulo="Cómo sabremos si funciona" texto="Cinco indicadores, cada uno ligado a un criterio del reto. Los objetivos son supuestos.">
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

      <Bloque id="costes" n={5} titulo="Costes" texto="Implantación (una vez) y coste mensual del piloto. Cambia los supuestos y mira cómo se mueve el total.">
        <Simulador />
      </Bloque>

      <Bloque id="encaje" n={6} titulo="Encaje con lo que ya existe" texto="Tenique no empieza de cero: se apoya en programas que ya funcionan en Tenerife.">
        <Rejilla cols={ENCAJE.length > 1 ? 2 : 1 as 2}>
          {ENCAJE.map((e) => (
            <Tarjeta key={e.programa} kicker={e.quien} titulo={e.programa} fuentes={e.fuentes}>
              <p>{e.queEs}</p>
              <p style={{ marginTop: 8 }}><span className="tag warn"><span className="dot" />Propuesta</span> {e.comoEncaja}</p>
            </Tarjeta>
          ))}
        </Rejilla>
      </Bloque>

      <Bloque id="riesgos" n={7} titulo="Riesgos" texto="Legales, de adopción, operativos, medioambientales y económicos, con su mitigación. Y los límites de lo que Tenique puede hacer.">
        <Tabla<Riesgo> columnas={COL_RIESGOS} filas={RIESGOS} minAncho={760} />
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
