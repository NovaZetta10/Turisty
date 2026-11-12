// Pestaña «Conexión con Turismo de Tenerife»: cómo se conecta Tenique a quien enciende el fogón.
// Solo maquetación: los datos se importan de src/data (plan, responsabilidades, experiencias, investigación).
// Lo que hace hoy Turismo de Tenerife lleva fuente; lo demás es propuesta del equipo.
import type { MouseEvent, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SECCIONES, rutaDe } from '../config/proyecto'
import { ENCAJE, KPIS, PRUEBA_CONCEPTO } from '../data/viabilidad'
import { ACCIONES, AGENTES, FLUJOS, RACI_TXT, VALIDACION } from '../data/responsabilidades'
import { EXPERIENCIAS } from '../data/experiencias'
import { DATOS_ABIERTOS, FUENTES, RETORNO_COMPROMISO } from '../data/investigacion'
import { Icon } from '../components/Icon'
import { Refs } from '../components/Refs'
import '../styles/conexion.css'

const ID = 'conexion'
const TDT = AGENTES.find((a) => a.id === 'tdt')!
const EMPRESAS = AGENTES.find((a) => a.id === 'empresas')!
const ES_TUYA = EXPERIENCIAS.filter((e) => e.programa === 'Tenerife es tuya')
const DATOS_TDT = DATOS_ABIERTOS.find((d) => d.nombre.startsWith('Turismo de Tenerife'))
const GARANTIA = VALIDACION[0]
const PROPUESTA = <span className="tag warn"><span className="dot" />Propuesta</span>
const EXISTE = <span className="tag ok"><span className="dot" />Ya existe</span>

/** Etiquetas cortas de la matriz: Turismo de Tenerife hace (R, A/R), rinde cuentas (A) o es consultado (C). */
const POR_PAPEL = (['R', 'A', 'C'] as const).map((p) => ({
  papel: p,
  acciones: ACCIONES.filter((a) => {
    const r = a.papeles.tdt
    return p === 'R' ? r === 'R' || r === 'A/R' : r === p
  }),
}))
const TITULO_PAPEL = { R: 'Lo hace', A: 'Rinde cuentas', C: 'Se le consulta' } as const

const FLUJOS_TDT = FLUJOS.filter((f) => f.lineas.some(([a, b]) => a === 'tdt' || b === 'tdt'))
const fuente = (id: number) => FUENTES.find((f) => f.id === id)
const KPI_CLAVE = KPIS.filter((k) => ['Percepción de los residentes', 'Gasto que se queda en el barrio', 'Residentes que participan'].includes(k.nombre))

/** Lo que pidieron en la sesión de feedback, contado por Esther (no son citas literales). */
const PIDIERON: { id: string; pidieron: string; responde: string; donde: string; ruta: string; bloque?: string }[] = [
  {
    id: 'datos',
    pidieron: 'Datos tangibles y medibles para poder proyectar.',
    responde: `Un panel con ${KPIS.length} indicadores del piloto y ${PRUEBA_CONCEPTO.indicadores.length} de la prueba de concepto de 2 semanas. Cada uno dice cómo se mide y de dónde sale. Los valores del panel son simulados; los objetivos, supuestos.`,
    donde: 'Panel de gestión', ruta: '/gestion',
  },
  {
    id: 'retorno',
    pidieron: 'Ver si lo que genera el turismo vuelve a donde se genera: el turismo como pulmón de toda la isla.',
    responde: 'Cada euro de una experiencia entra en la cuenta de su municipio, los vecinos proponen en qué se gasta y se ve en la calle. Una vez al año, el informe del retorno.',
    donde: 'Plan de acción · el fondo del barrio', ruta: 'viabilidad', bloque: 'fondo',
  },
  {
    id: 'orgullo',
    pidieron: 'Orgullo de pertenencia.',
    responde: 'Experiencias reales de aquí, avaladas por el barrio, con emociones como raíces, orgullo y pertenencia. Se mide con la misma pregunta de orgullo antes y después.',
    donde: 'La app Tenique', ruta: 'prototipo',
  },
  {
    id: 'mentalidad',
    pidieron: 'Una mentalidad, no una campaña.',
    responde: 'Tres piedras (vecinos, visitantes y sector) y un fuego que enciende Turismo de Tenerife. Cada pieza de comunicación se une a algo que se puede hacer en el barrio.',
    donde: 'Mapeo de responsabilidades', ruta: 'responsabilidades', bloque: 'piedras',
  },
  {
    id: 'indicadores',
    pidieron: 'Indicadores para saber si funciona.',
    responde: 'Cada hipótesis del piloto tiene un umbral de éxito y otro de parada, fijados de antemano. Si no se cumplen, se ajusta o se para y se cuenta igual.',
    donde: 'Plan de acción · cómo sabremos si funciona', ruta: 'viabilidad', bloque: 'kpis',
  },
  {
    id: 'propias',
    pidieron: 'Ver sus propias experiencias.',
    responde: `Las ${ES_TUYA.length} actividades de «Tenerife es tuya» con fecha futura ya salen en el catálogo de la app, con enlace a su ficha oficial.`,
    donde: 'La app Tenique', ruta: 'prototipo',
  },
]

/** Navega a una ruta y, si hay bloque, baja hasta él (la web usa HashRouter: no hay anclas en la URL). */
function Va({ ruta, bloque, children, className }: { ruta: string; bloque?: string; children: ReactNode; className?: string }) {
  const nav = useNavigate()
  const destino = ruta.startsWith('/') ? ruta : rutaDe(ruta)
  const ir = (e: MouseEvent) => {
    if (!bloque) return
    e.preventDefault()
    nav(destino)
    window.setTimeout(() => {
      const el = document.getElementById(bloque)
      if (!el) return
      const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' })
    }, 350)
  }
  return <Link className={className} to={destino} onClick={ir}>{children}</Link>
}

export default function Conexion() {
  const s = SECCIONES.find((x) => x.id === ID)
  const g = fuente(86)
  return (
    <div className="wrap cx">
      <header className="page-head enter">
        <span className="kicker">Tenique · Turismo de Tenerife</span>
        <h1>{s?.titulo}</h1>
        <p>{s?.resumen}</p>
      </header>

      <p className="nota enter enter-2"><Icon name="alert" size={14} /> Lo que Turismo de Tenerife hace hoy lleva su fuente. Lo que aquí se le pide o se le devuelve es una propuesta del equipo: no hay compromisos suyos.</p>

      {/* 1 · Esquema */}
      <section className="section" id="esquema" aria-labelledby="cx-esq-t">
        <div className="section-head"><div><span className="kicker">01 · El esquema</span><h2 id="cx-esq-t">Turismo de Tenerife enciende el fogón</h2><p>A la izquierda, lo que ya tiene. A la derecha, lo que Tenique añade encima, sin empezar de cero.</p></div></div>

        <div className="cx-esquema" role="group" aria-label="Esquema: piezas actuales de Turismo de Tenerife, Turismo de Tenerife en el centro y lo que Tenique añade">
          <div className="cx-col cx-izq">
            <h3 className="cx-col-t">Lo que ya tiene</h3>
            <ul>
              <li className="cx-nodo"><b>«Tenerife es tuya»</b><span>Rutas gratuitas para colectivos, desde 2020. <Refs ids={[84]} /></span>{EXISTE}</li>
              <li className="cx-nodo"><b>REGENERATe</b><span>Caso de éxito en el Foro Mundial de Ecoturismo 2025. <Refs ids={[86]} /></span>{EXISTE}</li>
              <li className="cx-nodo"><b>Empresas asociadas</b><span>{EMPRESAS.nombre}.</span>{EXISTE}</li>
              <li className="cx-nodo"><b>Investigación y datos</b><span>{DATOS_TDT?.que} <Refs ids={DATOS_TDT?.fuentes ?? []} /></span>{EXISTE}</li>
              <li className="cx-nodo"><b>{GARANTIA.sello}</b><span>{GARANTIA.que} Primer sello de cada experiencia.</span>{PROPUESTA}</li>
            </ul>
          </div>

          <div className="cx-centro">
            <span className="cx-fuego" aria-hidden="true"><Icon name="llama" size={26} /></span>
            <b>Turismo de Tenerife</b>
            <span>Enciende el fogón: garantiza, coordina y publica.</span>
          </div>

          <div className="cx-col cx-der">
            <h3 className="cx-col-t">Lo que Tenique añade</h3>
            <ul>
              <li className="cx-nodo"><b>Experiencias de los barrios</b><span>Vecinos, asociaciones, comercio y productores, con tres sellos.</span>{PROPUESTA}</li>
              <li className="cx-nodo"><b>Panel de gestión</b><span>Datos e indicadores para proyectar.</span>{PROPUESTA}</li>
              <li className="cx-nodo"><b>Fondo del barrio visible</b><span>Lo que deja el turismo, en la calle y en la app.</span>{PROPUESTA}</li>
              <li className="cx-nodo"><b>Informe del retorno</b><span>Sanidad, educación y limpieza, municipio a municipio.</span>{PROPUESTA}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2 · Qué pone y qué recibe */}
      <section className="section" id="que-pone" aria-labelledby="cx-pone-t">
        <div className="section-head"><div><span className="kicker">02 · Qué pone y qué recibe</span><h2 id="cx-pone-t">Lo que se le pide y lo que recibe</h2><p>Sacado del mapeo de responsabilidades. Es una propuesta que ningún agente ha aceptado todavía.</p></div></div>
        <div className="grid g2">
          <article className="card cx-lista">
            <div className="kicker">Qué pone Turismo de Tenerife</div>
            <ul className="list small">{TDT.aporta.map((x) => <li key={x}>{x}</li>)}</ul>
          </article>
          <article className="card cx-lista">
            <div className="kicker">Qué recibe</div>
            <ul className="list small">{TDT.recibe.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="kicker cx-sub">Qué decide</div>
            <ul className="list small">{TDT.decide.map((x) => <li key={x}>{x}</li>)}</ul>
          </article>
        </div>

        <h3 className="cx-h3">Su papel en cada acción del plan</h3>
        <div className="grid g3 cx-papeles">
          {POR_PAPEL.map((p) => (
            <details key={p.papel} className="card cx-papel" open={p.papel === 'R'}>
              <summary><b>{TITULO_PAPEL[p.papel]}</b><span className="tag">{p.acciones.length} acciones</span></summary>
              <p className="small muted">{p.papel === 'R' ? `${RACI_TXT.R}, o ${RACI_TXT['A/R'].toLowerCase()}.` : RACI_TXT[p.papel] + '.'}</p>
              <ul className="list small">{p.acciones.map((a) => <li key={a.accion}>{a.accion}</li>)}</ul>
            </details>
          ))}
        </div>

        <h3 className="cx-h3">Qué circula entre Turismo de Tenerife y los demás</h3>
        <ul className="cx-flujos">
          {FLUJOS_TDT.map((f) => (
            <li key={f.que} className="card"><b>{f.de} → {f.a}</b><span>{f.que}</span></li>
          ))}
        </ul>
        <p className="small muted"><Va ruta="responsabilidades" bloque="matriz">Ver la matriz completa <Icon name="arrow" size={12} /></Va></p>
      </section>

      {/* 3 · Lo que Tenique le devuelve */}
      <section className="section" id="devuelve" aria-labelledby="cx-dev-t">
        <div className="section-head"><div><span className="kicker">03 · Lo que Tenique le devuelve</span><h2 id="cx-dev-t">Datos, indicadores, sus experiencias y un retorno que se ve</h2></div></div>
        <div className="grid g2">
          <article className="card cx-dev">
            <span className="cx-ico" aria-hidden="true"><Icon name="search" size={18} /></span>
            <h3>Datos</h3>
            <p>El panel de gestión reúne reservas, experiencias con garantía, proyectos pagados y alertas, por municipio. Los valores que se ven hoy son simulados; los títulos y municipios, reales del catálogo.</p>
            <Va className="btn sm" ruta="/gestion">Ver el panel <Icon name="arrow" size={12} /></Va>
          </article>

          <article className="card cx-dev">
            <span className="cx-ico" aria-hidden="true"><Icon name="check" size={18} /></span>
            <h3>Indicadores</h3>
            <p>{KPIS.length} indicadores del piloto, ligados a los criterios del reto. Algunos de los más pedidos:</p>
            <ul className="list small">{KPI_CLAVE.map((k) => <li key={k.nombre}><b>{k.nombre}.</b> {k.objetivo} {k.supuesto && <span className="tag warn"><span className="dot" />Supuesto</span>}</li>)}</ul>
            <Va className="btn sm" ruta="viabilidad" bloque="kpis">Ver los indicadores <Icon name="arrow" size={12} /></Va>
          </article>

          <article className="card cx-dev">
            <span className="cx-ico" aria-hidden="true"><Icon name="star" size={18} /></span>
            <h3>Garantía Turismo de Tenerife</h3>
            <p>{GARANTIA.que} Es el primer sello de cada experiencia; los otros dos son el aval del barrio y la valoración de quien la vivió. {PROPUESTA}</p>
            <Va className="btn sm" ruta="/tenique">Verla en la app <Icon name="arrow" size={12} /></Va>
          </article>

          <article className="card cx-dev">
            <span className="cx-ico" aria-hidden="true"><Icon name="heart" size={18} /></span>
            <h3>Retorno publicado</h3>
            <p>{RETORNO_COMPROMISO.frase} {PROPUESTA}</p>
            <ol className="list small cx-pasos">{RETORNO_COMPROMISO.pasos.map((p) => <li key={p}>{p}</li>)}</ol>
          </article>
        </div>

        <article className="card cx-tuya" id="sus-experiencias">
          <div className="cx-tuya-cab">
            <div>
              <div className="kicker">Sus programas dentro de la app</div>
              <h3>{ES_TUYA.length} experiencias de «Tenerife es tuya»</h3>
              <p className="small">Son las rutas con fecha futura y lugar que constan en la web de Turismo de Tenerife (consultadas el 12-11-2026). Se inscriben colectivos de 15 a 20 personas, con 15 días de antelación. <Refs ids={[84]} /></p>
              {ENCAJE[0] && <p className="small">{ENCAJE[0].comoEncaja}</p>}
              {g && <p className="small">REGENERATe, ya presentado como caso de éxito en 2025. {PROPUESTA} Sumarlo al mismo calendario. <Refs ids={[86]} /></p>}
            </div>
          </div>
          <details className="cx-tuya-lista">
            <summary>Ver las {ES_TUYA.length} experiencias</summary>
            <ul>
              {ES_TUYA.map((e) => <li key={e.id}><a href={e.fuente.url} target="_blank" rel="noopener noreferrer">{typeof e.titulo === "string" ? e.titulo : e.titulo.es}<span className="sr-only"> (se abre en otra pestaña)</span></a><span className="small muted">{e.municipio}</span></li>)}
            </ul>
          </details>
        </article>
      </section>

      {/* 4 · Lo que pidieron */}
      <section className="section" id="pidieron" aria-labelledby="cx-pid-t">
        <div className="section-head"><div><span className="kicker">04 · Lo que se pidió en la sesión de feedback</span><h2 id="cx-pid-t">Qué pidieron y cómo responde Tenique</h2><p>Lo contamos con nuestras palabras: no son citas literales.</p></div></div>
        <div className="grid g3 cx-pid">
          {PIDIERON.map((p) => (
            <article key={p.id} className="card cx-pidieron">
              <div className="kicker">Pidieron</div>
              <h3>{p.pidieron}</h3>
              <div className="kicker">Cómo responde Tenique</div>
              <p>{p.responde}</p>
              <Va className="cx-enlace" ruta={p.ruta} bloque={p.bloque}>{p.donde} <Icon name="arrow" size={12} /></Va>
            </article>
          ))}
        </div>
      </section>

      {/* Cierre */}
      <section className="section">
        <div className="card cx-cierre">
          <p>Tenique no se suma a lo que Turismo de Tenerife ya hace: lo conecta con los barrios y lo hace medible.</p>
          <div className="cx-botones">
            <Link className="btn primary" to="/gestion">Ver el panel de gestión <Icon name="arrow" size={14} /></Link>
            <Link className="btn" to={rutaDe('viabilidad')}>Ver el plan de acción <Icon name="arrow" size={14} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
