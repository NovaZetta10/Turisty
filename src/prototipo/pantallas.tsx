import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useDemo, useNav } from './nav'
import { useIdioma, useT, type Idioma } from './idioma'
import { Ico } from './iconos'
import { BarraApp, BotonApp, BotonReinicio, CampoApp, ChipsApp, Cuerpo, Segmentos } from './piezas'
import { Confirmacion, Reserva, type DatosReserva } from './piezas-flujo'
import { VacioApp } from './estados'
import { EMOCIONES, EXPERIENCIAS, MARCA, POR_VALIDAR, anfitrion, barrio, buscar, donde, ejemplo, emocion, emocionDe, emocionPortada, emocionesProvisionales, esTenerifeEsTuya, iconoDe, porEmocion, sinMunicipio, type Experiencia } from './experiencias'
import { MUNICIPIOS_CON_DATOS, datosDe } from './datos-barrio'
import { MapaCalor, distanciaKm } from './mapa-tenerife'
import { CODIGO_CONVIVENCIA, CUIDADO_COMPARTIDO } from '../data/responsabilidades'
import { ESCENARIOS, KPIS, SUPUESTOS_FONDO, fondoAnual } from '../data/viabilidad'
import { AvisoEjemplo, Avatar, BarraPerfil, SelloTT, ChipsEmo, Corazon, Ej, IrExplorar, PIEDRAS, PiedrasFuego, Portada, TarjetaExp, Cuenta, SelloPrograma, escalon, estiloEmo, eur, nota } from './tenique-piezas'
import './tenique.css'

// ─────────────────────────────────────────────────────────────────────────────
//  TENIQUE · pieza digital del programa «Tenerife se cocina entre todos»
//  Flujo del jurado: inicio → sentir (el vecino arranca en Puerto de la Cruz; «Cambiar» abre municipio) → lista → experiencia → reserva → confirmacion.
//  Por perfil: vecino (Explorar · Mis planes · Mi barrio), visitante (Explorar · Mis planes · Tu estancia),
//  anfitrión (alta, avales, valoraciones) y Turismo de Tenerife (panel, garantía, fondo por municipio).
//  Experiencias: SOLO reales (src/data/experiencias.ts). Las «Por verificar» van a la cola de garantía.
//  Precios, valoraciones e importes del fondo: valores de demostración, con un aviso «Valores de ejemplo» por pantalla.
// ─────────────────────────────────────────────────────────────────────────────

/** Ajustes de la demo. */
export const DEMO = {
  /** Idioma con el que arranca (y al que vuelve al reiniciar). */
  idioma: 'es' as Idioma,
  /** Segundos sin tocar la demo antes de volver al inicio. 0 = nunca. */
  reinicioSegundos: 60,
}

/** Cada pantalla es un componente (puede usar hooks: useT, useNav, useDemo, useState…). */
export type Pantalla = { id: string; ejemplo?: boolean; render: () => JSX.Element }

// Perfiles: datos.perfil = 'vecino' | 'turista' | 'anfitrion' | 'turismo'. datos.municipio = municipio del vecino.

/** Municipios de las experiencias y los que tienen datos públicos. */
const MUNICIPIOS = [...new Set([...EXPERIENCIAS.map((e) => e.municipio), ...MUNICIPIOS_CON_DATOS])].filter((m) => !sinMunicipio(m)).sort((a, b) => a.localeCompare(b, 'es'))
/** Municipio con el que arranca el vecino (editable). Tiene datos públicos verificados. */
const MUNICIPIO_POR_DEFECTO = MUNICIPIOS.includes('Puerto de la Cruz') ? 'Puerto de la Cruz' : MUNICIPIOS[0]
const BRASA = MARCA

/** Fondo de ejemplo de un municipio: lo que aportan sus experiencias (valores de demostración). */
function fondoDe(m: string) {
  return EXPERIENCIAS.filter((e) => e.municipio === m).reduce((s, e) => { const v = ejemplo(e); return s + v.aporte * v.opiniones * 3 }, 0)
}

// De dónde sale el fondo: el reparto del escenario «Año 3 (toda la isla)» del plan (src/data/viabilidad.ts, supuestos).
// Sin cifras nuevas: solo las proporciones de fondoAnual() con ese escenario y las etiquetas de SUPUESTOS_FONDO.
const ESCENARIO_FONDO = ESCENARIOS.find((x) => x.id === 'isla') ?? ESCENARIOS[0]
const CALCULO_FONDO = ESCENARIO_FONDO ? fondoAnual(ESCENARIO_FONDO.valores) : undefined
const grupoFondo = (id: string, defecto: string) => SUPUESTOS_FONDO.find((x) => x.id === id)?.grupo ?? defecto
const REPARTO_FONDO: { id: string; es: string; en: string; parte: number }[] = CALCULO_FONDO && CALCULO_FONDO.total > 0 ? [
  { id: 'empresas', es: grupoFondo('empresas', 'Empresas turísticas'), en: 'Tourism businesses', parte: CALCULO_FONDO.empresas / CALCULO_FONDO.total },
  { id: 'viviendas', es: grupoFondo('viviendas', 'Vivienda vacacional'), en: 'Holiday rentals', parte: CALCULO_FONDO.viviendas / CALCULO_FONDO.total },
  { id: 'reservas', es: grupoFondo('reservas', 'Reservas'), en: 'Bookings', parte: CALCULO_FONDO.reservas / CALCULO_FONDO.total },
  { id: 'cabildo', es: 'Cabildo', en: 'Cabildo', parte: CALCULO_FONDO.cabildo / CALCULO_FONDO.total },
].sort((a, b) => b.parte - a.parte) : []
const PARTE_RESERVAS = REPARTO_FONDO.find((x) => x.id === 'reservas')?.parte || 1
/** Fondo total de ejemplo de un municipio: lo de sus reservas es solo una parte (PARTE_RESERVAS) del total. */
const fondoTotalDe = (m: string) => fondoDe(m) / PARTE_RESERVAS

/** Rótulo de alcance: la demo enseña toda la isla, pero el piloto empieza en 3 municipios. */
function RotuloAlcance() {
  const t = useT()
  return <p className="tq-alcance"><Ico name="map" size={13} />{t({ es: 'Así se verá con toda la isla (año 3). El piloto empieza en 3 municipios.', en: 'This is how it will look across the whole island (year 3). The pilot starts in 3 towns.' })}</p>
}

/** Primero las que se alcanzan sin coche propio (sin dato, no se marcan ni suben). Orden estable. */
const sinCocheAntes = (l: Experiencia[]) => l.map((e, i) => ({ e, i })).sort((a, b) => Number(b.e.sinCoche === true) - Number(a.e.sinCoche === true) || a.i - b.i).map((x) => x.e)

type Plan = { id: string; codigo: string; fecha: string; franja: string; personas: number; modo?: string }

function SinExperiencias() {
  const t = useT()
  return (
    <VacioApp
      icono="fogon"
      titulo={t({ es: 'Experiencias reales en preparación', en: 'Real experiences coming soon' })}
      texto={t({ es: 'Estamos reuniendo experiencias reales de toda la isla, cada una con su fuente.', en: 'We are gathering real experiences from across the island, each with its source.' })}
    />
  )
}

/** «Proponer un proyecto»: hoja con texto (280 caracteres), municipio prerrellenado y envío simulado. */
function Propuesta({ municipio }: { municipio: string }) {
  const t = useT()
  const [abierta, setAbierta] = useState(false)
  const [texto, setTexto] = useState('')
  const [lugar, setLugar] = useState(municipio)
  const [enviada, setEnviada] = useState<string | null>(null)
  const campo = useRef<HTMLTextAreaElement>(null)
  useEffect(() => setLugar(municipio), [municipio])
  useEffect(() => { if (abierta) campo.current?.focus() }, [abierta])
  const MAX = 280
  if (enviada) return (
    <div className="tq-aporte col app-aparece" role="status">
      <p><Ico name="check" size={18} /> {t({ es: `Tu propuesta queda registrada para el fondo de ${enviada}. El ayuntamiento comprueba que se puede hacer.`, en: `Your proposal is registered for the ${enviada} fund. The town council checks it can be done.` })}</p>
      <small><span className="tq-ej">{t({ es: 'ejemplo', en: 'example' })}</span> {t({ es: 'En la demo no se envía.', en: 'Nothing is sent in the demo.' })}</small>
      <button className="tq-enlace" onClick={() => { setEnviada(null); setTexto(''); setAbierta(true) }}>{t({ es: 'Proponer otra', en: 'Propose another' })}</button>
    </div>
  )
  if (!abierta) return <BotonApp variante="secundario" onClick={() => setAbierta(true)}>{t({ es: 'Proponer un proyecto para el barrio', en: 'Propose a project for the area' })}</BotonApp>
  return (
    <form className="tq-hoja tq-propuesta" onSubmit={(ev) => { ev.preventDefault(); if (texto.trim()) setEnviada(lugar) }}>
      <label className="app-campo">
        <span>{t({ es: '¿Qué propones para tu barrio?', en: 'What do you propose for your area?' })}</span>
        <textarea ref={campo} rows={4} maxLength={MAX} value={texto} placeholder={t({ es: 'p. ej. arreglar la plaza o actividades con mayores', en: 'e.g. fix the square or activities with older neighbours' })} onChange={(ev) => setTexto(ev.target.value)} />
        <small className="tq-contador tnum" aria-live="polite">{texto.length}/{MAX}</small>
      </label>
      <label className="app-campo">
        <span>{t({ es: 'Municipio', en: 'Town' })}</span>
        <select value={lugar} onChange={(ev) => setLugar(ev.target.value)}>{MUNICIPIOS.map((x) => <option key={x} value={x}>{x}</option>)}</select>
      </label>
      <div className="tq-hoja-botones">
        <button type="button" className="app-boton secundario" onClick={() => setAbierta(false)}>{t({ es: 'Cancelar', en: 'Cancel' })}</button>
        <button type="submit" className="app-boton principal" disabled={!texto.trim()}>{t({ es: 'Enviar propuesta', en: 'Send proposal' })}</button>
      </div>
    </form>
  )
}

/** Acceso físico (puntos del programa): tipos genéricos, sin lugares inventados. */
function SinMovil() {
  const t = useT()
  return <p className="tq-nota">{t({ es: '¿Sin móvil? También en oficinas de turismo, centros ciudadanos y ayuntamientos.', en: 'No phone? Also at tourist offices, community centres and town halls.' })}</p>
}

/* ───────── 1. Inicio: quién eres ───────── */

function Inicio() {
  const t = useT()
  const { ir } = useNav()
  const { datos, guardar } = useDemo()
  // Elegir perfil lleva directo a su primera pantalla útil, como raíz del historial y sin borrar lo ya hecho (planes, guardados).
  // El vecino arranca con un municipio por defecto, que cambia desde «Explorar» o «Mi barrio»: nunca un formulario vacío.
  const elegir = (perfil: string, destino: string) => {
    guardar('perfil', perfil)
    if (perfil === 'vecino' && !MUNICIPIOS.includes(datos.municipio as string)) guardar('municipio', MUNICIPIO_POR_DEFECTO)
    ir(destino, true)
  }
  return (
    <>
      <BarraApp titulo="" />
      <Cuerpo>
        <Portada emo={BRASA} icono="fogon" className="tq-hero tq-inicio-hero">
          <span className="tq-hero-txt">
            <b className="tq-marca-t">Tenique</b>
            <span>{t({ es: 'Tenerife se cocina entre todos', en: 'Tenerife is cooked up together' })}</span>
            <small>{t({ es: 'Experiencias reales entre vecinos y visitantes, en toda la isla.', en: 'Real experiences shared by locals and visitors, all over the island.' })}</small>
          </span>
        </Portada>
        <RotuloAlcance />
        <h3 className="app-subt">{t({ es: '¿Quién eres?', en: 'Who are you?' })}</h3>
        <div className="tq-stagger tq-perfiles">
          <button className="tq-perfil dest" style={escalon(0)} onClick={() => elegir('vecino', 'sentir')}>
            <span className="tq-perfil-ico"><Ico name="home" size={24} /></span>
            <span><b>{t({ es: 'Vivo en Tenerife', en: 'I live in Tenerife' })}</b><small>{t({ es: 'Vive tu isla y propón en tu barrio', en: 'Live your island, have a say in your area' })}</small></span>
            <Ico name="right" size={18} />
          </button>
          <button className="tq-perfil" style={escalon(1)} onClick={() => elegir('turista', 'sentir')}>
            <span className="tq-perfil-ico"><Ico name="globe" size={22} /></span>
            <span><b>{t({ es: 'Estoy de visita', en: "I'm visiting" })}</b><small>{t({ es: 'Experiencias con gente de aquí', en: 'Experiences with local people' })}</small></span>
            <Ico name="right" size={18} />
          </button>
        </div>
        <h3 className="app-subt">{t({ es: 'Gestionar', en: 'Manage' })}</h3>
        <div className="tq-stagger tq-gestion">
          <button className="tq-perfil mini" style={escalon(2)} onClick={() => elegir('anfitrion', 'anfitrion')}>
            <span className="tq-perfil-ico"><Ico name="users" size={20} /></span>
            <b>{t({ es: 'Anfitrión o asociación', en: 'Host or association' })}</b>
            <small>{t({ es: 'Ofrece y avala', en: 'Offer and back' })}</small>
          </button>
          <button className="tq-perfil mini" style={escalon(3)} onClick={() => elegir('turismo', 'turismo')}>
            <span className="tq-perfil-ico"><Ico name="sello" size={20} /></span>
            <b>Turismo de Tenerife</b>
            <small>{t({ es: 'Garantía y programa', en: 'Guarantee and programme' })}</small>
          </button>
        </div>
        <SinMovil />
      </Cuerpo>
    </>
  )
}

/* ───────── 1b. Vecino: dónde vives ───────── */

function Municipio() {
  const t = useT()
  const { ir, atras, puedeVolver } = useNav()
  const { datos, guardar } = useDemo()
  const vecino = datos.perfil === 'vecino'
  const actual = (vecino ? datos.municipio : datos.zona) as string | undefined
  // Se llega desde «Cambiar» (Explorar o la lista): al elegir, vuelve atrás sin perder lo demás.
  // El vecino cambia su municipio (y deja de mirar otra zona); el visitante elige la zona por la que se mueve.
  const elegir = (m: string) => {
    if (vecino) { guardar('municipio', m); guardar('zona', undefined) } else guardar('zona', m)
    if (puedeVolver) atras(); else ir('sentir', true)
  }
  return (
    <>
      <BarraApp titulo="" />
      <Cuerpo>
        <div className="tq-cab">
          <span className="tq-kicker">{vecino ? t({ es: 'Vivo en Tenerife', en: 'I live in Tenerife' }) : t({ es: 'Estoy de visita', en: "I'm visiting" })}</span>
          <h2 className="tq-h1">{vecino ? t({ es: '¿En qué municipio vives?', en: 'Which town do you live in?' }) : t({ es: '¿Por qué zona te mueves?', en: 'Which area are you in?' })}</h2>
          <p className="app-texto">{vecino ? t({ es: 'Verás lo que pasa en tu barrio y qué deja allí el turismo.', en: 'You will see what happens in your area and what tourism leaves there.' }) : t({ es: 'Te enseñamos primero lo que tienes cerca, y después el resto de la isla.', en: 'We show you what is nearby first, then the rest of the island.' })}</p>
        </div>
        <div className="tq-municipios tq-stagger">
          {!vecino && (
            <button style={escalon(0)} aria-pressed={!actual || actual === '*'} className={!actual || actual === '*' ? 'on' : ''} onClick={() => elegir('*')}>
              <Ico name={!actual || actual === '*' ? 'check' : 'globe'} size={15} />{t({ es: 'Toda la isla', en: 'Whole island' })}
            </button>
          )}
          {MUNICIPIOS.map((m, i) => (
            <button key={m} style={escalon(i + 1)} aria-pressed={m === actual} className={m === actual ? 'on' : ''} onClick={() => elegir(m)}>
              <Ico name={m === actual ? 'check' : 'pin'} size={15} />{m}
            </button>
          ))}
        </div>
      </Cuerpo>
    </>
  )
}

/** Zona activa para filtrar: la elegida (mapa o selector) o, si es vecino, su municipio. «*» = toda la isla. */
function zonaDe(datos: Record<string, unknown>): string | undefined {
  const z = datos.zona as string | undefined
  if (z === '*') return undefined
  return z ?? (datos.perfil === 'vecino' ? (datos.municipio as string | undefined) : undefined)
}

/** «📍 Tacoronte · Cambiar»: siempre visible en Explorar y en la lista; abre el selector sin perder lo demás. */
function ChipZona() {
  const t = useT()
  const { ir } = useNav()
  const { datos } = useDemo()
  const vecino = datos.perfil === 'vecino'
  const z = zonaDe(datos)
  const texto = vecino && z === datos.municipio
    ? t({ es: `Vives en ${z}`, en: `You live in ${z}` })
    : z ?? t({ es: 'Toda la isla', en: 'Whole island' })
  return (
    <button className="tq-kicker tq-cambiar" onClick={() => ir('municipio')}>
      <Ico name="pin" size={13} />{texto} · <u>{z || vecino ? t({ es: 'Cambiar', en: 'Change' }) : t({ es: 'Elegir zona', en: 'Choose area' })}</u>
    </button>
  )
}

/* ───────── 2. Quiero sentir… ───────── */

function Sentir() {
  const t = useT()
  const { ir } = useNav()
  const { datos, guardar } = useDemo()
  const vecino = datos.perfil === 'vecino'
  return (
    <>
      <BarraApp titulo="Tenique" />
      <Cuerpo>
        <div className="tq-cab">
          {vecino || datos.perfil === 'turista' || !datos.perfil ? <ChipZona /> : <span className="tq-kicker">{t({ es: 'Te damos la bienvenida a Tenerife', en: 'Welcome to Tenerife' })}</span>}
          <h2 className="tq-h1">{vecino ? t({ es: '¿Qué quieres sentir hoy?', en: 'What do you want to feel today?' }) : t({ es: 'Quiero sentir…', en: 'I want to feel…' })}</h2>
        </div>
        <div className="tq-emos tq-stagger">
          {EMOCIONES.map((e, i) => {
            const n = porEmocion(e.id).length
            return (
              <button key={e.id} className={`tq-emo-tile tx-${e.textura}`} style={{ ...estiloEmo(e), ...escalon(i) }} onClick={() => { guardar('emocion', e.id); ir('lista') }}>
                <span className="tq-emo-ico"><Ico name={e.icono} size={i === 0 ? 30 : 24} /></span>
                {n > 0 && <span className="tq-emo-n tnum">{n}</span>}
                <b>{t(e)}</b>
                {e.frase && <small>{t({ es: e.frase, en: e.fraseEn ?? `${n} experience${n === 1 ? '' : 's'}` })}</small>}
              </button>
            )
          })}
        </div>
        {emocionesProvisionales && <p className="tq-nota">{t({ es: 'Emociones propuestas, por validar con vecinos y visitantes.', en: 'Proposed feelings, to be validated with locals and visitors.' })}</p>}
      </Cuerpo>
      <BarraPerfil />
    </>
  )
}

/* ───────── 3. Lista de experiencias ───────── */

function Lista() {
  const t = useT()
  const { ir } = useNav()
  const { datos, guardar } = useDemo()
  const emo = emocion(datos.emocion)
  const jovenes = datos.jovenes === true
  const tet = datos.tet === true
  const verMapa = datos.mapa !== false
  const zona = zonaDe(datos)
  const deEmocion = porEmocion(emo?.id)
  const base = deEmocion.filter((e) => (!jovenes || e.paraJovenes === true) && (!tet || esTenerifeEsTuya(e)))
  const hayTet = EXPERIENCIAS.some(esTenerifeEsTuya)
  // Filtro por ubicación: primero lo de tu zona; debajo, el resto ordenado por cercanía. Nunca una lista vacía sin salida.
  // Dentro de cada bloque, primero las que se alcanzan sin coche propio.
  const cerca = sinCocheAntes(zona ? base.filter((e) => e.municipio === zona) : base)
  const resto = zona ? base.filter((e) => e.municipio !== zona).map((e, i) => ({ e, i, d: distanciaKm(zona, e.municipio) })).sort((x, y) => Number(y.e.sinCoche === true) - Number(x.e.sinCoche === true) || x.d - y.d || x.i - y.i).map((x) => x.e) : []
  const cuentas = base.reduce<Record<string, number>>((c, e) => ({ ...c, [e.municipio]: (c[e.municipio] ?? 0) + 1 }), {})
  const abrir = (e: Experiencia) => { guardar('experiencia', e.id); ir('experiencia') }
  const tarjetas = (l: Experiencia[], desde = 0) => <div className="tq-stagger tq-lista">{l.map((e, i) => <TarjetaExp key={e.id} e={e} i={i + desde} evitar={emo?.id} onAbrir={() => abrir(e)} />)}</div>
  return (
    <>
      <BarraApp titulo={emo ? t(emo) : t({ es: 'Experiencias', en: 'Experiences' })} />
      <Cuerpo>
        {emo && (
          <Portada emo={emo} className="tq-hero tq-lista-hero">
            <span className="tq-hero-txt">
              <b className="tq-h1 claro">{t(emo)}</b>
              <span>{t({ es: `${deEmocion.length} experiencias reales en la isla`, en: `${deEmocion.length} real experiences on the island` })}</span>
            </span>
          </Portada>
        )}
        {EXPERIENCIAS.length === 0 ? <SinExperiencias /> : deEmocion.length === 0 ? (
          <VacioApp
            titulo={t({ es: 'Aún no hay experiencias para esta emoción', en: 'No experiences for this feeling yet' })}
            accion={<BotonApp variante="secundario" onClick={() => guardar('emocion', undefined)}>{t({ es: 'Ver todas', en: 'See all' })}</BotonApp>}
          />
        ) : (
          <>
            <div className="tq-filtros">
              <ChipZona />
              <div className="tq-filtros-fila">
                <button className={`tq-filtro ${jovenes ? 'on' : ''}`} aria-pressed={jovenes} onClick={() => guardar('jovenes', !jovenes)}>
                  <Ico name={jovenes ? 'check' : 'users'} size={14} />{t({ es: 'Para jóvenes', en: 'For young people' })}
                </button>
                {hayTet && (
                  <button className={`tq-filtro ${tet ? 'on' : ''}`} aria-pressed={tet} onClick={() => guardar('tet', !tet)}>
                    <Ico name={tet ? 'check' : 'sello'} size={14} />Tenerife es tuya
                  </button>
                )}
                <button className={`tq-filtro ${verMapa ? 'on' : ''}`} aria-expanded={verMapa} onClick={() => guardar('mapa', !verMapa)}>
                  <Ico name="map" size={14} />{t({ es: 'Mapa', en: 'Map' })}
                </button>
              </div>
              <RotuloAlcance />
            </div>
            {base.length === 0 && tet && !jovenes ? (
              <VacioApp
                icono="sello"
                titulo={t({ es: 'Ninguna experiencia de «Tenerife es tuya» para esta emoción', en: 'No “Tenerife es tuya” experiences for this feeling' })}
                texto={t({ es: 'Prueba con otra emoción o quita el filtro.', en: 'Try another feeling or remove the filter.' })}
                accion={<BotonApp variante="secundario" onClick={() => guardar('tet', false)}>{t({ es: 'Quitar el filtro', en: 'Remove the filter' })}</BotonApp>}
              />
            ) : base.length === 0 ? (
              <SinJovenes municipio={zona ?? MUNICIPIO_POR_DEFECTO} onAbrir={abrir} onQuitar={() => guardar('jovenes', false)} />
            ) : (
              <>
                {verMapa && <MapaCalor cuentas={cuentas} activo={zona} onElegir={(m) => guardar('zona', m ?? '*')} />}
                {zona && cerca.length > 0 && <h3 className="app-subt tq-zona-t">{t({ es: `En ${zona}`, en: `In ${zona}` })} · {cerca.length}</h3>}
                {zona && cerca.length === 0 && <p className="tq-nota">{t({ es: `Aún no hay experiencias así en ${zona}.`, en: `No experiences like this in ${zona} yet.` })}</p>}
                {cerca.length > 0 && tarjetas(cerca)}
                {resto.length > 0 && (
                  <>
                    <h3 className="app-subt tq-zona-t">{t({ es: 'Experiencias que no están en tu zona pero pueden interesarte', en: 'Experiences outside your area that you might like' })}</h3>
                    <p className="tq-nota">{t({ es: 'Ordenadas de más cerca a más lejos.', en: 'Sorted from nearest to furthest.' })}</p>
                    {tarjetas(resto, cerca.length)}
                  </>
                )}
                <AvisoEjemplo />
              </>
            )}
          </>
        )}
      </Cuerpo>
      <BarraPerfil />
    </>
  )
}

/** Las que se quedan cerca del criterio «para jóvenes», según Experiencias. Solo se muestran si existen en el catálogo. */
const CERCA_JOVENES = ['meet-and-talk-cij-santa-cruz', 'distrito-joven-sendero-nocturno-santa-cruz']

/** Estado vacío honesto del filtro «Para jóvenes»: hoy ninguna experiencia cumple el criterio. */
function SinJovenes({ municipio, onAbrir, onQuitar }: { municipio: string; onAbrir: (e: Experiencia) => void; onQuitar: () => void }) {
  const t = useT()
  const { idioma } = useIdioma()
  const cerca = CERCA_JOVENES.map((id) => buscar(id)).filter((e): e is Experiencia => !!e && e.verificado)
  return (
    <>
      <div className="tq-sin-jovenes">
        <span className="tq-perfil-ico"><Ico name="users" size={20} /></span>
        <h3>{t({ es: 'Aún no hay experiencias pensadas para jóvenes de aquí y de fuera', en: 'There are no experiences designed for young locals and visitors yet' })}</h3>
        <p className="app-texto">{t({ es: 'Es un hueco que queremos cubrir: ¿organizas una?', en: 'It is a gap we want to fill: will you organise one?' })}</p>
        <Propuesta municipio={municipio} />
        <button className="tq-enlace" onClick={onQuitar}>{t({ es: 'Quitar el filtro', en: 'Remove the filter' })}</button>
      </div>
      {cerca.length > 0 && (
        <>
          <h3 className="app-subt tq-zona-t">{t({ es: 'Se acercan', en: 'Close to it' })}</h3>
          <div className="tq-lista">
            {cerca.map((e, i) => (
              <div key={e.id} className="tq-cerca">
                <TarjetaExp e={e} i={i} onAbrir={() => onAbrir(e)} />
                {e.motivoJovenes && <p className="tq-jovenes"><Ico name="users" size={14} /><span>{idioma === 'es' ? e.motivoJovenes : 'Meets part of the youth criteria (details in Spanish).'}</span></p>}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

/* ───────── 4. Experiencia ───────── */

function QueDejaAqui({ e }: { e: Experiencia }) {
  const t = useT()
  const { idioma } = useIdioma()
  const { ir } = useNav()
  const { guardar } = useDemo()
  const v = ejemplo(e)
  const dato = datosDe(e.municipio, idioma).find((d) => (d.valor || d.frase) && d.fuentes.length)
  return (
    <section className="tq-deja">
      <span className="tq-fuego-t">{t({ es: 'Qué deja aquí', en: 'What it leaves here' })}</span>
      <p><Ico name="euro" size={16} /> {e.fiesta || v.gratis ? t({ es: 'Donación voluntaria de', en: 'Voluntary gift of' }) : t({ es: 'Cada plaza aporta', en: 'Each place gives' })} <b className="tnum">{eur(v.aporte, idioma)}</b> {t({ es: 'al fondo de', en: 'to the fund of' })} <b>{barrio(e)}</b></p>
      {dato && (
        <p className="tq-deja-dato">
          <Ico name="chart" size={16} /> <span>{t(dato.etiqueta)}: <b>{dato.valor ?? dato.frase}</b> <small>({dato.fuentes[0].medio})</small></span>
        </p>
      )}
      {!sinMunicipio(e.municipio) && <button className="tq-enlace" onClick={() => { guardar('verBarrio', e.municipio); ir('barrio') }}>{t({ es: `Todo lo que deja el turismo en ${e.municipio}`, en: `Everything tourism leaves in ${e.municipio}` })} <Ico name="right" size={14} /></button>}
    </section>
  )
}

/** «Cómo llegar»: guagua, a pie o coche compartido, quedando en una parada. Sin líneas ni horarios inventados. */
function ComoLlegar({ e }: { e: Experiencia }) {
  const t = useT()
  const { idioma } = useIdioma()
  return (
    <section className="tq-llegar">
      <span className="tq-fuego-t">{t({ es: 'Cómo llegar', en: 'Getting there' })}</span>
      <ul className="tq-llegar-modos">
        <li><Ico name="bus" size={16} />{t({ es: 'En guagua', en: 'By bus' })}</li>
        <li><Ico name="walk" size={16} />{t({ es: 'A pie', en: 'On foot' })}</li>
        <li><Ico name="users" size={16} />{t({ es: 'Coche compartido', en: 'Car sharing' })}</li>
      </ul>
      <p className="app-texto">
        {e.comoLlegar && idioma === 'es' ? e.comoLlegar : t({ es: 'Parada más cercana: la indica el anfitrión al reservar. Quedáis allí y seguís juntos.', en: 'Nearest stop: the host tells you when you book. You meet there and go on together.' })}
      </p>
      {e.sinCoche === true && <p className="tq-sin-coche"><Ico name="check" size={14} />{t({ es: 'Se llega sin coche propio', en: 'Reachable without your own car' })}</p>}
    </section>
  )
}

function DetalleExperiencia() {
  const t = useT()
  const { idioma } = useIdioma()
  const { ir } = useNav()
  const { datos, guardar } = useDemo()
  const e = buscar(datos.experiencia)
  if (!e) return <><BarraApp titulo="" /><Cuerpo><SinExperiencias /></Cuerpo></>
  const v = ejemplo(e)
  const emo = emocionPortada(e, datos.emocion)
  const vecino = datos.perfil === 'vecino'
  const quien = anfitrion(e)
  const reservar = (modo: string) => { guardar('modo', modo); ir('reserva') }
  return (
    <>
      <BarraApp titulo={barrio(e)} accion={<Corazon id={e.id} />} />
      <Cuerpo>
        <Portada emo={emo} icono={iconoDe(e)} grande className="tq-sangre">
          {e.mixta && <span className="tq-pildora">{t({ es: 'Vecinos y visitantes juntos', en: 'Locals and visitors together' })}</span>}
        </Portada>
        <div className="tq-ficha-cab">
          <h2 className="tq-h1">{t(e.titulo)}</h2>
          {quien && (
            <div className="tq-anfitrion">
              <Avatar texto={quien} emo={emo} />
              <span><small>{t({ es: 'Lo ofrece', en: 'Hosted by' })}</small><b>{quien}</b></span>
            </div>
          )}
          <ul className="app-meta tq-meta">
            <li><Ico name="pin" size={15} />{donde(e)}</li>
            {e.cuando && idioma === 'es' && <li><Ico name="clock" size={15} />{e.cuando}</li>}
            {e.precioFuente && idioma === 'es' && <li><Ico name="ticket" size={15} />{e.precioFuente}</li>}
            {e.idiomas?.length ? <li><Ico name="globe" size={15} />{e.idiomas.join(' · ')}</li> : null}
          </ul>
          <ChipsEmo ids={e.emociones} />
          <SelloPrograma e={e} />
          {esTenerifeEsTuya(e) && (
            <p className="tq-programa-nota">{t({ es: 'Hoy es solo para colectivos (asociaciones, mayores, alumnado…) en grupos de 15–20. Con Tenique, se abriría a vecinos y visitantes juntos.', en: 'Today it is only for groups (associations, older people, students…) of 15–20. With Tenique, it would open to locals and visitors together.' })}</p>
          )}
          {e.paraJovenes && (
            <p className="tq-jovenes"><Ico name="users" size={14} /><span><b>{t({ es: 'Para jóvenes', en: 'For young people' })}</b>{idioma === 'es' && e.motivoJovenes ? ` · ${e.motivoJovenes}` : t({ es: '', en: ' · Meets the youth criteria (details in Spanish).' })}</span></p>
          )}
        </div>
        <PiedrasFuego e={e} />
        <p className="app-texto">
          {idioma === 'en' && typeof e.descripcion === 'string'
            ? <span className="tq-en">The source publishes the description, dates and prices in Spanish (link below).</span>
            : t(e.descripcion)}
        </p>
        <ComoLlegar e={e} />
        <QueDejaAqui e={e} />
        {e.fuente && <a className="tq-fuente" href={e.fuente.url} target="_blank" rel="noreferrer">{t({ es: 'Fuente', en: 'Source' })}: {e.fuente.titulo} <Ico name="external" size={12} /></a>}
        <AvisoEjemplo />
      </Cuerpo>
      <div className="tq-barra-fija">
        <span className="tq-barra-precio">
          {e.fiesta ? <><small>{t({ es: 'Vívela con un vecino', en: 'Live it with a local' })}</small><b>{t({ es: 'Gratis', en: 'Free' })}</b></>
            : v.gratis ? <><small>{t({ es: 'Entrada', en: 'Entry' })}</small><b>{t({ es: 'Gratis', en: 'Free' })}</b></>
            : <><small>{vecino ? t({ es: 'Precio de residente', en: 'Resident price' }) : t({ es: 'Por persona', en: 'Per person' })}</small><b className="tnum">{eur(vecino ? v.precioResidente : v.precio, idioma)}</b></>}
          {vecino && !v.gratis && <button className="tq-enlace" onClick={() => reservar('tiempo')}>{t({ es: 'o aporta tu tiempo', en: 'or give your time' })}</button>}
        </span>
        <button className="app-boton principal" onClick={() => reservar('pago')}>{v.gratis ? t({ es: 'Apuntarme', en: 'Sign me up' }) : t({ es: 'Reservar', en: 'Book' })}</button>
      </div>
    </>
  )
}

/* ───────── 5. Reserva ───────── */

/** Código de convivencia del barrio: el visitante se compromete antes de reservar. Texto de src/data/responsabilidades.ts. */
function Compromiso({ marcado, onCambio }: { marcado: boolean; onCambio: (v: boolean) => void }) {
  const t = useT()
  return (
    <section className="tq-compromiso" aria-labelledby="tq-compromiso-t">
      <span id="tq-compromiso-t" className="tq-fuego-t">{t({ es: 'Código de convivencia del barrio', en: 'Neighbourhood code of conduct' })}</span>
      <ul>{CODIGO_CONVIVENCIA.map((c) => <li key={c.id}><Ico name="check" size={14} />{t(c)}</li>)}</ul>
      <p className="tq-nota">{t({ es: 'Base común: cada barrio la adapta.', en: 'Common base: each neighbourhood adapts it.' })}</p>
      <p className="tq-compromiso-cuidado"><Ico name="leaf" size={15} />{t(CUIDADO_COMPARTIDO)}</p>
      <label className="tq-compromiso-check">
        <input type="checkbox" checked={marcado} onChange={(ev) => onCambio(ev.target.checked)} />
        <span>{t({ es: 'Me comprometo', en: 'I commit' })}</span>
      </label>
    </section>
  )
}

function PantallaReserva() {
  const t = useT()
  const { datos } = useDemo()
  const [compromiso, setCompromiso] = useState(false)
  const e = buscar(datos.experiencia)
  if (!e) return <><BarraApp titulo="" /><Cuerpo><SinExperiencias /></Cuerpo></>
  const v = ejemplo(e)
  const sinPago = v.gratis || datos.modo === 'tiempo'
  const visitante = datos.perfil !== 'vecino'
  return (
    <>
      <BarraApp titulo={v.gratis ? t({ es: 'Apuntarme', en: 'Sign up' }) : t({ es: 'Reserva', en: 'Booking' })} />
      <Cuerpo>
        <div className="tq-cab">
          <span className="tq-kicker">{t(e.titulo)}</span>
          <h2 className="tq-h1">{t({ es: '¿Cuándo vienes?', en: 'When are you coming?' })}</h2>
          {datos.modo === 'tiempo' && !v.gratis && <p className="app-texto">{t({ es: 'Sin pagar: aportas 2 horas de tu tiempo al barrio.', en: 'No payment: you give 2 hours of your time to the area.' })}</p>}
        </div>
        <Reserva
          franjas={['10:00', '12:00', '17:00']}
          destino="confirmacion"
          precio={sinPago ? undefined : datos.perfil === 'vecino' ? v.precioResidente : v.precio}
          textoBoton={sinPago ? t({ es: 'Apuntarme', en: 'Sign me up' }) : undefined}
          bloqueo={visitante && !compromiso ? t({ es: 'Marca «Me comprometo»', en: 'Tick “I commit”' }) : undefined}
        >
          {visitante && <Compromiso marcado={compromiso} onCambio={setCompromiso} />}
        </Reserva>
        <AvisoEjemplo texto={t({ es: 'Fechas, horas y precios de ejemplo; los reales están en la ficha. Pago simulado.', en: 'Example dates, times and prices; real ones are on the detail page. Simulated payment.' })} />
      </Cuerpo>
    </>
  )
}

/* ───────── 6. Confirmación ───────── */

function PantallaConfirmacion() {
  const t = useT()
  const { idioma } = useIdioma()
  const { ir } = useNav()
  const { datos, guardar } = useDemo()
  const e = buscar(datos.experiencia)
  const r = datos.reserva as DatosReserva | undefined
  const v = e ? ejemplo(e) : undefined
  const tiempo = datos.modo === 'tiempo' && !v?.gratis

  // La reserva pasa a «Mis planes».
  useEffect(() => {
    if (!e || !r) return
    const planes = (datos.planes as Plan[] | undefined) ?? []
    if (!planes.some((p) => p.codigo === r.codigo)) guardar('planes', [...planes, { id: e.id, codigo: r.codigo, fecha: r.fecha, franja: r.franja, personas: r.personas, modo: tiempo ? 'tiempo' : 'pago' }])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const aporte = v && r ? v.aporte * r.personas : 0
  const fondo = e ? fondoDe(e.municipio) : 0
  const meta = Math.max(500, Math.ceil((fondo + aporte) / 250) * 250 + 250)
  return (
    <>
      <BarraApp titulo="" />
      <Cuerpo>
        <div className="tq-confirma">
          <span className="tq-celebra" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ '--a': `${i * 36}deg`, '--d': `${(i % 3) * 30}ms` } as CSSProperties} />)}</span>
          <Confirmacion titulo={t({ es: '¡Apuntado!', en: "You're in!" })}>
            {e && r && v && (tiempo ? (
              <div className="tq-aporte grande">
                <Ico name="users" size={22} />
                <p>{t({ es: 'Aportas', en: 'You give' })} <b>{t({ es: '2 horas de tu tiempo', en: '2 hours of your time' })}</b> {t({ es: 'a', en: 'to' })} <b>{barrio(e)}</b><br /><small>{t({ es: 'Como voluntario o haciendo de anfitrión. Te escribimos para elegir cuándo.', en: 'Volunteering or hosting. We will get in touch to choose when.' })}</small></p>
              </div>
            ) : (
              <div className="tq-aporte grande col">
                <p>
                  {e.fiesta ? t({ es: 'Te acompañará un vecino. Tu donación voluntaria:', en: 'A local will go with you. Your voluntary gift:' }) : t({ es: 'Tu reserva aporta', en: 'Your booking gives' })}{' '}
                  <b className="tnum">{eur(aporte, idioma)}</b> {t({ es: 'al fondo de', en: 'to the fund of' })} <b>{barrio(e)}</b>
                </p>
                <div className="tq-barra-fondo" aria-hidden="true">
                  <i style={{ transform: `scaleX(${Math.min(1, fondo / meta)})` }} />
                  <i className="tu" style={{ transform: `scaleX(${Math.min(1, (fondo + aporte) / meta)})` }} />
                </div>
                <small className="tnum">{t({ es: `Próximo proyecto propuesto por el barrio: ${eur(Math.round(fondo + aporte), idioma)} de ${eur(meta, idioma)}`, en: `Next project proposed by the area: ${eur(Math.round(fondo + aporte), idioma)} of ${eur(meta, idioma)}` })}</small>
                <small>{t({ es: 'Lo guarda el Cabildo en la cuenta del municipio y el barrio propone en qué se usa.', en: 'The Cabildo holds it in the town’s account and the neighbourhood proposes how it is spent.' })}</small>
              </div>
            ))}
            <p className="tq-nota">{t({ es: 'Después la valoran todas las personas que asistieron, vecinos y visitantes.', en: 'Afterwards everyone who attended rates it, locals and visitors.' })}</p>
          </Confirmacion>
        </div>
        <AvisoEjemplo />
        {e && !sinMunicipio(e.municipio) && <BotonApp onClick={() => guardar('verBarrio', e.municipio)} ir="barrio">{t({ es: 'Qué deja el turismo en', en: 'What tourism leaves in' })} {e.municipio}</BotonApp>}
        <button className="app-boton secundario" onClick={() => ir('planes', true)}>{t({ es: 'Ver mis planes', en: 'See my plans' })}</button>
        <BotonReinicio />
      </Cuerpo>
    </>
  )
}

/* ───────── Mis planes ───────── */

function Planes() {
  const t = useT()
  const { ir } = useNav()
  const { datos, guardar } = useDemo()
  const planes = (datos.planes as Plan[] | undefined) ?? []
  const guardadas = ((datos.guardados as string[] | undefined) ?? []).map(buscar).filter((e): e is Experiencia => !!e)
  const abrir = (e: Experiencia) => { guardar('experiencia', e.id); ir('experiencia') }
  return (
    <>
      <BarraApp titulo={t({ es: 'Mis planes', en: 'My plans' })} />
      <Cuerpo>
        {planes.length === 0 && guardadas.length === 0 ? (
          <VacioApp icono="calendar" titulo={t({ es: 'Aún no tienes planes', en: 'No plans yet' })} texto={t({ es: 'Apúntate a una experiencia o guárdala con el corazón.', en: 'Sign up for an experience or save it with the heart.' })} accion={<IrExplorar />} />
        ) : (
          <>
            {planes.length > 0 && <h3 className="app-subt">{t({ es: 'Apuntado', en: 'Signed up' })}</h3>}
            <div className="tq-stagger tq-lista">
              {planes.map((p, i) => {
                const e = buscar(p.id)
                if (!e) return null
                const emo = emocionDe(e)
                return (
                  <button key={p.codigo} className="tq-plan" style={{ ...estiloEmo(emo), ...escalon(i) }} onClick={() => abrir(e)}>
                    <span className={`tq-plan-color tx-${emo.textura}`}><Ico name={emo.icono} size={22} /></span>
                    <span>
                      <b>{t(e.titulo)}</b>
                      <small className="tnum">{new Date(p.fecha + 'T12:00').toLocaleDateString(idiomaFecha(t), { weekday: 'short', day: 'numeric', month: 'short' })} · {p.franja} · {p.personas} {t({ es: 'pers.', en: 'ppl' })}</small>
                      <small>{p.modo === 'tiempo' ? t({ es: 'Aportas tu tiempo', en: 'Giving your time' }) : p.codigo}</small>
                    </span>
                  </button>
                )
              })}
            </div>
            {planes[0] && buscar(planes[0].id) && <ValorarPlan e={buscar(planes[0].id)!} />}
            {guardadas.length > 0 && <h3 className="app-subt">{t({ es: 'Guardadas', en: 'Saved' })}</h3>}
            <div className="tq-stagger tq-lista">{guardadas.map((e, i) => <TarjetaExp key={e.id} e={e} i={i} onAbrir={() => abrir(e)} />)}</div>
          </>
        )}
      </Cuerpo>
      <BarraPerfil />
    </>
  )
}
const idiomaFecha = (t: ReturnType<typeof useT>) => t({ es: 'es-ES', en: 'en-GB' })

/** Valoración después de vivirla: estrellas y «¿Llegaste sin coche propio?» (alimenta el KPI «Reservas que llegan sin coche propio»). Simulada. */
function ValorarPlan({ e }: { e: Experiencia }) {
  const t = useT()
  const [estrellas, setEstrellas] = useState(0)
  const [sinCoche, setSinCoche] = useState<boolean>()
  const [enviada, setEnviada] = useState(false)
  if (enviada) return (
    <div className="tq-aporte col app-aparece" role="status">
      <p><Ico name="check" size={18} /> {t({ es: 'Gracias. Tu valoración cuenta para el sello «Valorada por quien la vivió».', en: 'Thank you. Your rating counts towards the “Rated by those who lived it” seal.' })}</p>
      <small><Ej /> {t({ es: 'En la demo no se envía.', en: 'Not sent in the demo.' })}</small>
    </div>
  )
  return (
    <section className="tq-valorar" aria-labelledby="tq-valorar-t">
      <span id="tq-valorar-t" className="tq-fuego-t">{t({ es: 'Cuando la hayas vivido, valórala', en: 'Once you have lived it, rate it' })}</span>
      <b className="tq-valorar-exp">{t(e.titulo)}</b>
      <div className="tq-valorar-estrellas" role="radiogroup" aria-label={t({ es: 'Puntuación', en: 'Rating' })}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} role="radio" aria-checked={estrellas === n} aria-label={`${n}/5`} className={n <= estrellas ? 'on' : ''} onClick={() => setEstrellas(n)}>★</button>
        ))}
      </div>
      <fieldset className="tq-valorar-coche">
        <legend>{t({ es: '¿Llegaste sin coche propio?', en: 'Did you get there without your own car?' })}</legend>
        <button aria-pressed={sinCoche === true} className={`tq-filtro ${sinCoche === true ? 'on' : ''}`} onClick={() => setSinCoche(true)}>{t({ es: 'Sí: guagua, a pie o compartido', en: 'Yes: bus, on foot or shared' })}</button>
        <button aria-pressed={sinCoche === false} className={`tq-filtro ${sinCoche === false ? 'on' : ''}`} onClick={() => setSinCoche(false)}>{t({ es: 'No, en mi coche', en: 'No, in my car' })}</button>
      </fieldset>
      <button className="app-boton principal" disabled={estrellas === 0 || sinCoche === undefined} onClick={() => setEnviada(true)}>{t({ es: 'Enviar valoración', en: 'Send rating' })}</button>
    </section>
  )
}

/* ───────── Visitante: tu estancia ───────── */

function Estancia() {
  const t = useT()
  const { idioma } = useIdioma()
  const { datos } = useDemo()
  const planes = ((datos.planes as Plan[] | undefined) ?? []).filter((p) => buscar(p.id))
  const porMunicipio = new Map<string, number>()
  for (const p of planes) { const e = buscar(p.id)!; porMunicipio.set(e.municipio, (porMunicipio.get(e.municipio) ?? 0) + ejemplo(e).aporte * p.personas) }
  const total = [...porMunicipio.values()].reduce((a, b) => a + b, 0)
  const max = Math.max(1, ...porMunicipio.values())
  return (
    <>
      <BarraApp titulo={t({ es: 'Tu estancia', en: 'Your stay' })} />
      <Cuerpo>
        <Portada emo={BRASA} icono="euro" className="tq-hero">
          <span className="tq-hero-txt">
            <span>{t({ es: 'Qué dejas en la isla', en: 'What you leave on the island' })}</span>
            <b className="tq-h1 claro tnum">{eur(total, idioma)}</b>
            <small>{t({ es: `en ${porMunicipio.size} municipio${porMunicipio.size === 1 ? '' : 's'}`, en: `in ${porMunicipio.size} town${porMunicipio.size === 1 ? '' : 's'}` })}</small>
          </span>
        </Portada>
        {planes.length === 0 ? (
          <VacioApp icono="euro" titulo={t({ es: 'Aún no has dejado nada', en: 'Nothing left yet' })} texto={t({ es: 'Cada experiencia aporta al fondo del municipio donde se vive. El barrio propone en qué se usa.', en: 'Each experience gives to the fund of the town where it happens. The neighbourhood proposes how it is spent.' })} accion={<IrExplorar />} />
        ) : (
          <ul className="tq-reparto tq-stagger">
            {[...porMunicipio].map(([m, x], i) => (
              <li key={m} style={escalon(i)}>
                <span><b>{m}</b><b className="tnum">{eur(x, idioma)}</b></span>
                <i style={{ transform: `scaleX(${x / max})` }} />
              </li>
            ))}
          </ul>
        )}
        <p className="app-texto">{t({ es: 'Lo que dejas va a la cuenta del Cabildo de cada municipio, no a una plataforma. Lo publica Turismo de Tenerife.', en: 'What you leave goes to each town’s Cabildo account, not to a platform. Turismo de Tenerife publishes it.' })}</p>
        <AvisoEjemplo />
      </Cuerpo>
      <BarraPerfil />
    </>
  )
}

/* ───────── Mi barrio: qué deja el turismo aquí ───────── */

function Barrio() {
  const t = useT()
  const { idioma } = useIdioma()
  const { datos, guardar } = useDemo()
  // `verBarrio`: municipio que se está mirando (desde una ficha, el fondo o los chips). No cambia dónde vive el vecino
  // y se olvida al salir, así que «Mi barrio» vuelve siempre a su municipio.
  const ver = datos.verBarrio as string | undefined
  useEffect(() => () => guardar('verBarrio', undefined), [guardar])
  const m = (MUNICIPIOS.includes(ver as string) ? ver : MUNICIPIOS.includes(datos.municipio as string) ? datos.municipio : MUNICIPIO_POR_DEFECTO) as string | undefined
  if (!m) return <><BarraApp titulo="" /><Cuerpo><SinExperiencias /></Cuerpo></>
  const fondo = Math.round(fondoTotalDe(m))
  const n = EXPERIENCIAS.filter((e) => e.municipio === m).length
  const vecino = datos.perfil === 'vecino'
  return (
    <>
      <BarraApp titulo={vecino ? t({ es: 'Mi barrio', en: 'My area' }) : t({ es: 'Municipios', en: 'Towns' })} />
      <Cuerpo>
        <Portada emo={BRASA} icono="home" className="tq-hero">
          <span className="tq-hero-txt">
            <span>{t({ es: 'Qué deja el turismo en', en: 'What tourism leaves in' })}</span>
            <b className="tq-h1 claro">{m}</b>
          </span>
        </Portada>
        <ChipsApp opciones={MUNICIPIOS} activa={m} onCambio={(x) => guardar('verBarrio', x)} />

        <h3 className="app-subt">{t({ es: 'Datos públicos', en: 'Public data' })}</h3>
        <ul className="app-lista tq-datos">
          {datosDe(m, idioma).map((d) => {
            const real = (d.valor || d.frase) && d.fuentes.length > 0
            return (
              <li key={d.id}>
                <span>
                  <b>{t(d.etiqueta)}</b>
                  {real && d.frase && <span className="tq-frase">{d.frase}</span>}
                  {d.nota && <small className="tq-dato-nota">{t(d.nota)}</small>}
                  {real ? (
                    <small>{t({ es: 'Fuente', en: 'Source' })}: {d.fuentes[0].medio}{' '}
                      {d.fuentes.map((f, i) => <a key={i} href={f.url} target="_blank" rel="noreferrer" title={f.titulo}>{f.id != null ? `[${f.id}]` : `· ${f.titulo}`}</a>)}
                    </small>
                  ) : d.noSePublica ? <small className="tq-no-publica">{t({ es: 'Hoy este dato no se publica.', en: 'This figure is not published today.' })}</small>
                    : <small>{t({ es: 'Pendiente de fuente.', en: 'Source pending.' })}</small>}
                </span>
                {real && d.valor ? <b className="tnum">{d.valor}</b> : !real && <span className="tq-falta">—</span>}
              </li>
            )
          })}
        </ul>

        <h3 className="app-subt">{t({ es: 'Fondo Tenique · cuenta del Cabildo', en: 'Tenique fund · Cabildo account' })} <Ej /></h3>
        {n === 0 ? <p className="tq-nota">{t({ es: 'Aún no hay experiencias Tenique en este municipio.', en: 'No Tenique experiences in this town yet.' })}</p> : (
          <>
            <div className="app-kpis">
              <div className="app-kpi"><b className="tnum"><Cuenta valor={fondo} formato={(x) => eur(Math.round(x), idioma)} /></b><span>{t({ es: 'Fondo del barrio', en: 'Neighbourhood fund' })}</span></div>
              <div className="app-kpi"><b className="tnum"><Cuenta valor={n} /></b><span>{t({ es: 'Experiencias reales aquí', en: 'Real experiences here' })}</span></div>
            </div>
            {REPARTO_FONDO.length > 0 && (
              <>
                <span className="tq-fuego-t tq-reparto-t">{t({ es: 'De dónde sale', en: 'Where it comes from' })}</span>
                <ul className="tq-reparto">
                  {REPARTO_FONDO.map((r) => (
                    <li key={r.id}>
                      <span><b>{t(r)}</b><b className="tnum">{eur(Math.round(fondo * r.parte), idioma)} · {Math.round(r.parte * 100)} %</b></span>
                      <i style={{ transform: `scaleX(${r.parte})` }} />
                    </li>
                  ))}
                </ul>
                <p className="tq-nota tq-izq">{t({ es: `Sobre todo de quien vive del turismo. Reparto del escenario «${ESCENARIO_FONDO?.nombre ?? ''}» del plan de viabilidad: es un supuesto, no un dato.`, en: 'Mostly from those who make a living from tourism. Split from the viability plan’s “year 3 (whole island)” scenario: an assumption, not data.' })}</p>
              </>
            )}
            <span className="tq-fuego-t tq-reparto-t">{t({ es: 'En qué se gasta', en: 'What it is spent on' })}</span>
            <ul className="tq-reparto">
              <li><span><b>{t({ es: 'Arreglo de un espacio vecinal', en: 'Fixing a community space' })}</b><b className="tnum">{eur(Math.round(fondo * 0.6), idioma)}</b></span><i style={{ transform: 'scaleX(.6)' }} /><small>{t({ es: 'Propuesto por el barrio', en: 'Proposed by the neighbourhood' })}</small></li>
              <li><span><b>{t({ es: 'Actividades con mayores del barrio', en: 'Activities with older neighbours' })}</b><b className="tnum">{eur(Math.round(fondo * 0.4), idioma)}</b></span><i style={{ transform: 'scaleX(.4)' }} /><small>{t({ es: 'Propuesto por el barrio', en: 'Proposed by the neighbourhood' })}</small></li>
            </ul>
          </>
        )}
        <PulsoBarrio municipio={m} vecino={vecino} />
        <Propuesta municipio={m} />
        <SinMovil />
      </Cuerpo>
      <BarraPerfil />
    </>
  )
}

/** Indicador al que alimenta el pulso (KPIS de viabilidad.ts). */
const KPI_PERCEPCION = KPIS.find((k) => k.nombre.startsWith('Percepción'))?.nombre ?? 'Percepción de los residentes'
const ESCALA = [
  { es: 'Muy mal', en: 'Very bad' }, { es: 'Mal', en: 'Bad' }, { es: 'Normal', en: 'OK' }, { es: 'Bien', en: 'Good' }, { es: 'Muy bien', en: 'Very good' },
]
/** Reparto de ejemplo, estable por municipio (no es un dato). */
function pulsoEjemplo(m: string) {
  let h = 0
  for (const c of m) h = (h * 31 + c.charCodeAt(0)) >>> 0
  const w = [1 + (h % 3), 2 + ((h >>> 3) % 4), 4 + ((h >>> 6) % 4), 4 + ((h >>> 9) % 5), 2 + ((h >>> 12) % 4)]
  const s = w.reduce((a, b) => a + b, 0)
  return w.map((x) => x / s)
}

/** «¿Cómo notas el turismo en tu barrio este mes?»: escala corta y comentario opcional. Simulado; resultados de ejemplo. */
function PulsoBarrio({ municipio, vecino }: { municipio: string; vecino: boolean }) {
  const t = useT()
  const [nota, setNota] = useState<number>()
  const [comentario, setComentario] = useState('')
  const [enviado, setEnviado] = useState(false)
  const MAX = 200
  const reparto = pulsoEjemplo(municipio)
  const pregunta = vecino
    ? t({ es: '¿Cómo notas el turismo en tu barrio este mes?', en: 'How do you feel about tourism in your area this month?' })
    : t({ es: `¿Cómo te has sentido recibido en ${municipio}?`, en: `How welcome did you feel in ${municipio}?` })
  return (
    <section className="tq-pulso" aria-labelledby="tq-pulso-t">
      <span id="tq-pulso-t" className="tq-fuego-t">{t({ es: 'Tu opinión cuenta', en: 'Your opinion counts' })}</span>
      {!enviado ? (
        <>
          <b className="tq-pulso-p">{pregunta}</b>
          <div className="tq-pulso-escala" role="radiogroup" aria-label={pregunta}>
            {ESCALA.map((x, i) => (
              <button key={i} role="radio" aria-checked={nota === i} className={nota === i ? 'on' : ''} onClick={() => setNota(i)}>
                <span className="tq-pulso-n tnum">{i + 1}</span><small>{t(x)}</small>
              </button>
            ))}
          </div>
          <label className="app-campo">
            <span>{t({ es: 'Comentario (opcional)', en: 'Comment (optional)' })}</span>
            <textarea rows={2} maxLength={MAX} value={comentario} onChange={(ev) => setComentario(ev.target.value)} placeholder={vecino ? t({ es: 'p. ej. hay más ruido de noche en la plaza', en: 'e.g. more noise at night in the square' }) : t({ es: 'p. ej. me ayudaron a encontrar la parada', en: 'e.g. they helped me find the stop' })} />
            <small className="tq-contador tnum">{comentario.length}/{MAX}</small>
          </label>
          <button className="app-boton principal" disabled={nota === undefined} onClick={() => setEnviado(true)}>{t({ es: 'Enviar mi opinión', en: 'Send my opinion' })}</button>
        </>
      ) : (
        <div className="app-aparece">
          <p className="tq-pulso-ok"><Ico name="check" size={18} /> {t({ es: `Gracias. Alimenta el indicador «${KPI_PERCEPCION}» de ${municipio}.`, en: `Thank you. It feeds the residents’ perception indicator for ${municipio}.` })}</p>
          <span className="tq-fuego-t">{t({ es: 'Lo que dicen este mes', en: 'What people say this month' })} <Ej /></span>
          <ul className="tq-pulso-res">
            {ESCALA.map((x, i) => (
              <li key={i} className={nota === i ? 'tuya' : ''}>
                <span>{t(x)}</span>
                <i aria-hidden="true"><b style={{ transform: `scaleX(${reparto[i]})`, animationDelay: `${i * 40}ms` }} /></i>
                <span className="tnum">{Math.round(reparto[i] * 100)} %</span>
              </li>
            ))}
          </ul>
          <small className="tq-nota tq-izq">{t({ es: 'En la demo no se envía. Porcentajes de ejemplo.', en: 'Not sent in the demo. Example percentages.' })}</small>
        </div>
      )}
    </section>
  )
}

/* ───────── Gestión · anfitrión o asociación ───────── */

function NuevaExperiencia() {
  const t = useT()
  // Prerrellenado con un EJEMPLO (no es una experiencia real): así se ve cómo queda el alta.
  const [titulo, setTitulo] = useState(t({ es: 'Paseo por el barrio con su asociación de vecinos', en: 'Neighbourhood walk with the residents’ association' }))
  const [municipio, setMunicipio] = useState('Tacoronte')
  const [emos, setEmos] = useState<string[]>(['pertenencia', 'raices'])
  const [mixta, setMixta] = useState(true)
  const [enviada, setEnviada] = useState(false)
  if (enviada) return (
    <div className="tq-enviada app-aparece">
      <span className="app-ok"><Ico name="check" size={24} /></span>
      <b>{t({ es: 'Enviada a Turismo de Tenerife', en: 'Sent to Turismo de Tenerife' })}</b>
      <p className="app-texto">{t({ es: 'Se publica cuando tenga la garantía de Turismo de Tenerife y el aval del barrio.', en: 'It goes live once it has the Tenerife Tourism guarantee and the neighbourhood’s backing.' })}</p>
      <span className="app-estado pendiente">{t({ es: 'Pendiente: garantía y aval', en: 'Pending: guarantee and backing' })}</span>
    </div>
  )
  const emo = emocion(emos[0]) ?? BRASA
  const lista = titulo.trim() && municipio.trim() && emos.length > 0
  return (
    <div className="tq-form">
      <div className="tq-previa">
        <Portada emo={emo}><span className="tq-pildora">{t({ es: 'Vista previa · ejemplo', en: 'Preview · example' })}</span></Portada>
        <b>{titulo || '—'}</b>
        <small><Ico name="pin" size={12} /> {municipio || '—'}</small>
      </div>
      <CampoApp etiqueta={t({ es: 'Nombre de la experiencia', en: 'Experience name' })} valor={titulo} onCambio={setTitulo} />
      <CampoApp etiqueta={t({ es: 'Municipio o barrio', en: 'Town or area' })} valor={municipio} onCambio={setMunicipio} />
      <div className="app-campo">
        <span>{t({ es: 'Qué se siente', en: 'How it feels' })}</span>
        <div className="app-chips tq-multi" role="group">
          {EMOCIONES.map((e) => {
            const on = emos.includes(e.id)
            return <button key={e.id} className={on ? 'on' : ''} aria-pressed={on} onClick={() => setEmos(on ? emos.filter((x) => x !== e.id) : [...emos, e.id])}>{t(e)}</button>
          })}
        </div>
      </div>
      <label className="tq-check">
        <input type="checkbox" checked={mixta} onChange={(e) => setMixta(e.target.checked)} />
        <span>{t({ es: 'Experiencia mixta: plazas para residentes con precio simbólico o a cambio de tiempo', en: 'Mixed experience: resident places at a symbolic price or in exchange for time' })}</span>
      </label>
      <BotonApp desactivado={!lista} onClick={() => setEnviada(true)}>{t({ es: 'Enviar a validación', en: 'Send for approval' })}</BotonApp>
    </div>
  )
}

/** Decisiones de garantía (Turismo de Tenerife) y aval (barrio), con motivo opcional. Las ve el anfitrión en «Estado». */
type Decision = { estado: 'ok' | 'no'; motivo?: string }
type Decisiones = Record<string, { garantia?: Decision; aval?: Decision }>
const CLAVE = ['garantia', 'aval'] as const

/** Cola de un sello: Turismo de Tenerife da la garantía (0); el barrio, el aval (1). En tarjetas, con motivo opcional. */
function ColaPiedra({ piedra }: { piedra: 0 | 1 }) {
  const t = useT()
  const { datos, guardar } = useDemo()
  const decisiones = (datos.decisiones as Decisiones | undefined) ?? {}
  const [abierta, setAbierta] = useState<{ id: string; estado: 'ok' | 'no' } | null>(null)
  const [motivo, setMotivo] = useState('')
  const campo = useRef<HTMLTextAreaElement>(null)
  useEffect(() => { if (abierta) campo.current?.focus() }, [abierta])
  const p = PIEDRAS[piedra]
  const clave = CLAVE[piedra]
  if (POR_VALIDAR.length === 0) return <VacioApp icono={p.icono} titulo={t({ es: 'Nada pendiente', en: 'Nothing pending' })} />
  const si = piedra === 0 ? { es: 'Garantía dada', en: 'Guaranteed' } : { es: 'Avalada', en: 'Backed' }
  const no = piedra === 0 ? { es: 'Garantía denegada', en: 'Guarantee refused' } : { es: 'Aval retirado', en: 'Backing withdrawn' }
  const pregunta = piedra === 0
    ? { es: 'Motivo (opcional)', en: 'Reason (optional)' }
    : abierta?.estado === 'no' ? { es: '¿Por qué retiráis el aval? (opcional)', en: 'Why are you withdrawing your backing? (optional)' } : { es: 'Comentario para el anfitrión (opcional)', en: 'Note for the host (optional)' }
  const ejemploMotivo = piedra === 0
    ? { es: 'p. ej. falta el seguro de responsabilidad civil', en: 'e.g. public liability insurance is missing' }
    : { es: 'p. ej. no se ha contado con la asociación del barrio', en: 'e.g. the residents’ association was not consulted' }
  const confirmar = () => {
    if (!abierta) return
    const previa = decisiones[abierta.id] ?? {}
    guardar('decisiones', { ...decisiones, [abierta.id]: { ...previa, [clave]: { estado: abierta.estado, motivo: motivo.trim() || undefined } } })
    setAbierta(null)
    setMotivo('')
  }
  return (
    <>
      <div className="tq-cola-cab">
        {piedra === 0 ? <SelloTT /> : <span className="tq-perfil-ico"><Ico name={p.icono} size={18} /></span>}
        <span><b>{piedra + 1}. {t(p.titulo)}</b><small>{t(p.sub)}</small></span>
      </div>
      <p className="tq-nota">{t({ es: 'Experiencias reales aún sin confirmar. La decisión es simulada.', en: 'Real experiences not yet confirmed. The decision is simulated.' })}</p>
      <div className="tq-stagger tq-lista">
        {POR_VALIDAR.map((e, i) => {
          const emo = emocionDe(e)
          const d = decisiones[e.id]?.[clave]
          const aqui = abierta?.id === e.id
          return (
            <div key={e.id} className="tq-cola-item" style={escalon(i)}>
              <div className="tq-cola" style={estiloEmo(emo)}>
                <span className={`tq-plan-color tx-${emo.textura}`}><Ico name={emo.icono} size={20} /></span>
                <span className="tq-cola-txt"><b>{t(e.titulo)}</b><small>{barrio(e)}{anfitrion(e) ? ` · ${anfitrion(e)}` : ''}</small></span>
                {d ? (
                  <span className={`app-estado ${d.estado === 'ok' ? 'ok' : 'aviso'}`}>{t(d.estado === 'ok' ? si : no)}</span>
                ) : (
                  <span className="tq-acciones">
                    <button aria-label={t(no)} aria-pressed={aqui && abierta?.estado === 'no'} onClick={() => { setAbierta({ id: e.id, estado: 'no' }); setMotivo('') }}><Ico name="x" size={16} /></button>
                    <button className="si" aria-label={t(si)} aria-pressed={aqui && abierta?.estado === 'ok'} onClick={() => { setAbierta({ id: e.id, estado: 'ok' }); setMotivo('') }}><Ico name="check" size={16} /></button>
                  </span>
                )}
              </div>
              {d?.motivo && <p className="tq-motivo"><b>{t({ es: 'Motivo', en: 'Reason' })}:</b> {d.motivo}</p>}
              {aqui && abierta && (
                <div className="tq-hoja">
                  <label className="app-campo">
                    <span>{t(pregunta)}</span>
                    <textarea ref={campo} rows={2} maxLength={200} value={motivo} placeholder={t(ejemploMotivo)} onChange={(ev) => setMotivo(ev.target.value)} />
                  </label>
                  <div className="tq-hoja-botones">
                    <button className="app-boton secundario" onClick={() => setAbierta(null)}>{t({ es: 'Cancelar', en: 'Cancel' })}</button>
                    <button className="app-boton principal" onClick={confirmar}>{t(abierta.estado === 'ok' ? si : no)}</button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

/** Panel del anfitrión: estado de garantía y aval de sus experiencias, con el motivo si lo hay. */
function EstadoMias() {
  const t = useT()
  const { datos } = useDemo()
  const decisiones = (datos.decisiones as Decisiones | undefined) ?? {}
  const estado = (d: Decision | undefined, si: { es: string; en: string }, no: { es: string; en: string }) =>
    !d ? <span className="app-estado pendiente">{t({ es: 'Pendiente', en: 'Pending' })}</span> : <span className={`app-estado ${d.estado === 'ok' ? 'ok' : 'aviso'}`}>{t(d.estado === 'ok' ? si : no)}</span>
  return (
    <>
      <p className="tq-nota">{t({ es: 'Experiencias reales en revisión. Lo que decidan Turismo de Tenerife y el barrio aparece aquí.', en: 'Real experiences under review. What Turismo de Tenerife and the area decide shows up here.' })}</p>
      <div className="tq-stagger tq-lista">
        {POR_VALIDAR.slice(0, 4).map((e, i) => {
          const d = decisiones[e.id] ?? {}
          return (
            <div key={e.id} className="tq-estado-exp" style={escalon(i)}>
              <b>{t(e.titulo)}</b>
              <div className="tq-estado-fila"><SelloTT /><span>{t({ es: 'Garantía', en: 'Guarantee' })}</span>{estado(d.garantia, { es: 'Dada', en: 'Granted' }, { es: 'Denegada', en: 'Refused' })}</div>
              {d.garantia?.motivo && <p className="tq-motivo">{d.garantia.motivo}</p>}
              <div className="tq-estado-fila"><span className="tq-sello-tt"><Ico name="users" size={13} /></span><span>{t({ es: 'Aval del barrio', en: 'Area backing' })}</span>{estado(d.aval, { es: 'Avalada', en: 'Backed' }, { es: 'Retirado', en: 'Withdrawn' })}</div>
              {d.aval?.motivo && <p className="tq-motivo">{d.aval.motivo}</p>}
            </div>
          )
        })}
      </div>
    </>
  )
}

function Valoraciones() {
  const t = useT()
  const { idioma } = useIdioma()
  const filas = [
    { estrellas: 5, quien: { es: 'Asistió · residente', en: 'Attended · resident' } },
    { estrellas: 4, quien: { es: 'Asistió · visitante', en: 'Attended · visitor' } },
    { estrellas: 5, quien: { es: 'Asistió · visitante', en: 'Attended · visitor' } },
    { estrellas: 3, quien: { es: 'Asistió · residente', en: 'Attended · resident' } },
  ]
  return (
    <>
      <div className="app-kpis">
        <div className="app-kpi"><b className="tnum"><Cuenta valor={4.6} formato={(x) => nota(x, idioma)} /></b><span>{t({ es: 'Media de quienes asistieron', en: 'Attendees average' })}</span></div>
        <div className="app-kpi"><b className="tnum"><Cuenta valor={38} /></b><span>{t({ es: 'Valoraciones', en: 'Ratings' })}</span></div>
        <div className="app-kpi"><b className="tnum"><Cuenta valor={24} /></b><span>{t({ es: 'Llegaron sin coche propio', en: 'Came without their own car' })}</span></div>
      </div>
      <div className="tq-stagger tq-valoraciones">
        {filas.map((f, i) => (
          <div key={i} className="tq-valoracion" style={escalon(i)}>
            <span className="tq-estrellas" aria-label={`${f.estrellas}/5`}>{'★'.repeat(f.estrellas)}<i>{'★'.repeat(5 - f.estrellas)}</i></span>
            <small>{t(f.quien)}</small>
          </div>
        ))}
      </div>
      <AvisoEjemplo texto={t({ es: 'Puntúan todas las personas que asistieron, vecinos y visitantes. Valoraciones simuladas.', en: 'Everyone who attended rates, locals and visitors. Simulated ratings.' })} />
    </>
  )
}

function Anfitrion() {
  const t = useT()
  return (
    <>
      <BarraApp titulo={t({ es: 'Anfitriones y barrio', en: 'Hosts and area' })} />
      <Cuerpo>
        <div className="tq-cab">
          <span className="tq-kicker">{t({ es: 'Anfitrión o asociación', en: 'Host or association' })}</span>
          <h2 className="tq-h1">{t({ es: 'Tu barrio recibe', en: 'Your area welcomes' })}</h2>
        </div>
        <Segmentos opciones={[
          { id: 'estado', texto: t({ es: 'Estado', en: 'Status' }), contenido: <EstadoMias /> },
          { id: 'alta', texto: t({ es: 'Nueva', en: 'New' }), contenido: <NuevaExperiencia /> },
          { id: 'aval', texto: t({ es: 'Avalar', en: 'Back' }), contenido: <ColaPiedra piedra={1} /> },
          { id: 'valoraciones', texto: t({ es: 'Opiniones', en: 'Ratings' }), contenido: <Valoraciones /> },
        ]} />
      </Cuerpo>
      <BarraPerfil />
    </>
  )
}

/* ───────── Gestión · Turismo de Tenerife ───────── */

function Fondo() {
  const t = useT()
  const { idioma } = useIdioma()
  const { ir } = useNav()
  const { guardar } = useDemo()
  if (EXPERIENCIAS.length === 0) return <SinExperiencias />
  const grupos = new Map<string, { n: number; total: number }>()
  for (const e of EXPERIENCIAS) {
    if (sinMunicipio(e.municipio)) continue
    const v = ejemplo(e), g = grupos.get(barrio(e)) ?? { n: 0, total: 0 }
    grupos.set(barrio(e), { n: g.n + 1, total: g.total + (v.aporte * v.opiniones * 3) / PARTE_RESERVAS })
  }
  const filas = [...grupos].sort((a, b) => b[1].total - a[1].total)
  const max = Math.max(1, ...filas.map(([, g]) => g.total))
  return (
    <>
      <p className="tq-nota">{t({ es: 'El fondo lo gestiona el Cabildo, con una cuenta por municipio. Lo pagan sobre todo empresas turísticas y vivienda vacacional; las reservas y el Cabildo suman. Turismo de Tenerife lo publica. Municipios reales; importes de ejemplo.', en: 'The Cabildo manages the fund, one account per town. Mostly paid by tourism businesses and holiday rentals; bookings and the Cabildo add to it. Turismo de Tenerife publishes it. Real towns; example amounts.' })}</p>
      <ul className="tq-reparto tq-stagger">
        {filas.map(([m, g], i) => (
          <li key={m} style={escalon(i)}>
            <button onClick={() => { guardar('verBarrio', m); ir('barrio') }}>
              <span><b>{m}</b><b className="tnum">{eur(Math.round(g.total), idioma)}</b></span>
              <i style={{ transform: `scaleX(${g.total / max})` }} />
              <small>{t({ es: `${g.n} experiencia${g.n > 1 ? 's' : ''}`, en: `${g.n} experience${g.n > 1 ? 's' : ''}` })}</small>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

/** Mapa del panel de Turismo de Tenerife: experiencias publicadas por municipio. Mide oferta, nunca flujo de turistas. */
function MapaPrograma() {
  const t = useT()
  const { ir } = useNav()
  const { guardar } = useDemo()
  const [activo, setActivo] = useState<string>()
  const cuentas = EXPERIENCIAS.reduce<Record<string, number>>((c, e) => ({ ...c, [e.municipio]: (c[e.municipio] ?? 0) + 1 }), {})
  const n = activo ? cuentas[activo] ?? 0 : 0
  return (
    <>
      <h3 className="app-subt">{t({ es: 'Experiencias por municipio', en: 'Experiences by town' })}</h3>
      <MapaCalor cuentas={cuentas} activo={activo} onElegir={setActivo} />
      {activo && (
        <div className="tq-aporte col app-aparece">
          <p><b>{activo}</b>: {t({ es: `${n} experiencia${n === 1 ? '' : 's'} publicada${n === 1 ? '' : 's'}`, en: `${n} live experience${n === 1 ? '' : 's'}` })}</p>
          <button className="tq-enlace" onClick={() => { guardar('verBarrio', activo); ir('barrio') }}>{t({ es: `Qué deja el turismo en ${activo}`, en: `What tourism leaves in ${activo}` })} <Ico name="right" size={14} /></button>
        </div>
      )}
      <p className="tq-nota tq-izq">{t({ es: 'Cuenta experiencias verificadas del catálogo, no turistas: el número de turistas por municipio no se publica.', en: 'It counts verified experiences in the catalogue, not tourists: tourist numbers by town are not published.' })}</p>
    </>
  )
}

/** Opiniones del programa: qué funciona y qué revisar, según la valoración de quienes asistieron. Valores de ejemplo. */
function OpinionesPrograma() {
  const t = useT()
  const { idioma } = useIdioma()
  const { ir } = useNav()
  const { guardar } = useDemo()
  const conNota = EXPERIENCIAS.map((e) => ({ e, v: ejemplo(e) })).sort((a, b) => b.v.valoracion - a.v.valoracion || b.v.opiniones - a.v.opiniones)
  const bien = conNota.slice(0, 3)
  const revisar = conNota.slice(-3).reverse()
  const abrir = (e: Experiencia) => { guardar('experiencia', e.id); ir('experiencia') }
  const fila = ({ e, v }: { e: Experiencia; v: ReturnType<typeof ejemplo> }) => (
    <li key={e.id}>
      <button onClick={() => abrir(e)}>
        <span><b>{t(e.titulo)}</b><b className="tnum">★ {nota(v.valoracion, idioma)}</b></span>
        <small>{barrio(e)} · {t({ es: `${v.opiniones} opiniones`, en: `${v.opiniones} ratings` })}</small>
      </button>
    </li>
  )
  if (conNota.length === 0) return <SinExperiencias />
  return (
    <>
      <h3 className="app-subt">{t({ es: 'Qué funciona', en: 'What works' })} <Ej /></h3>
      <ul className="tq-reparto tq-opiniones">{bien.map(fila)}</ul>
      <h3 className="app-subt">{t({ es: 'Qué revisar', en: 'What to review' })} <Ej /></h3>
      <ul className="tq-reparto tq-opiniones">{revisar.map(fila)}</ul>
      <AvisoEjemplo texto={t({ es: 'Puntúan todas las personas que asistieron, vecinos y visitantes. Valoraciones simuladas: con datos reales, aquí se ve qué experiencias sostener y cuáles mejorar con su anfitrión.', en: 'Everyone who attended rates, locals and visitors. Simulated ratings: with real data, this shows which experiences to keep and which to improve with their host.' })} />
    </>
  )
}

function Turismo() {
  const t = useT()
  const { idioma } = useIdioma()
  const total = EXPERIENCIAS.reduce((s, e) => { const v = ejemplo(e); return s + v.aporte * v.opiniones * 3 }, 0) / PARTE_RESERVAS
  const municipios = new Set(EXPERIENCIAS.map((e) => e.municipio).filter((m) => !sinMunicipio(m))).size
  return (
    <>
      <BarraApp titulo="Turismo de Tenerife" />
      <Cuerpo>
        <div className="tq-cab">
          <img className="tq-logo-tt" src={import.meta.env.BASE_URL + 'img/marca/turismo-tenerife-color.png'} alt="Turismo de Tenerife" />
          <span className="tq-kicker">{t({ es: 'Da la garantía y coordina el programa Tenique', en: 'Grants the guarantee, runs the Tenique programme' })}</span>
          <h2 className="tq-h1">{t({ es: 'Panel del programa', en: 'Programme panel' })}</h2>
        </div>
        <a className="app-boton principal tq-gestion-link" href="#/gestion"><Ico name="chart" size={18} />{t({ es: 'Abrir el panel de gestión (pantalla horizontal)', en: 'Open the management panel (landscape)' })}</a>
        <div className="tq-kpis4 tq-stagger">
          <div className="app-kpi" style={escalon(0)}><b className="tnum"><Cuenta valor={EXPERIENCIAS.length} /></b><span>{t({ es: 'Publicadas (reales)', en: 'Live (real)' })}</span></div>
          <div className="app-kpi" style={escalon(1)}><b className="tnum"><Cuenta valor={POR_VALIDAR.length} /></b><span>{t({ es: 'Por verificar', en: 'To verify' })}</span></div>
          <div className="app-kpi" style={escalon(2)}><b className="tnum"><Cuenta valor={municipios} /></b><span>{t({ es: 'Municipios', en: 'Towns' })}</span></div>
          <div className="app-kpi" style={escalon(3)}><b className="tnum"><Cuenta valor={Math.round(total)} formato={(x) => eur(Math.round(x), idioma)} /></b><span>{t({ es: 'Fondo publicado', en: 'Fund published' })} <Ej /></span></div>
        </div>
        <Segmentos opciones={[
          { id: 'validar', texto: t({ es: `Garantía (${POR_VALIDAR.length})`, en: `Guarantee (${POR_VALIDAR.length})` }), contenido: <ColaPiedra piedra={0} /> },
          { id: 'mapa', texto: t({ es: 'Mapa', en: 'Map' }), contenido: <MapaPrograma /> },
          { id: 'fondo', texto: t({ es: 'Fondo', en: 'Fund' }), contenido: <Fondo /> },
          { id: 'opiniones', texto: t({ es: 'Opiniones', en: 'Ratings' }), contenido: <OpinionesPrograma /> },
        ]} />
      </Cuerpo>
      <BarraPerfil />
    </>
  )
}

export const PANTALLAS: Pantalla[] = [
  { id: 'inicio', render: Inicio },
  { id: 'municipio', render: Municipio },
  { id: 'sentir', render: Sentir },
  { id: 'lista', render: Lista },
  { id: 'experiencia', render: DetalleExperiencia },
  { id: 'reserva', render: PantallaReserva },
  { id: 'confirmacion', render: PantallaConfirmacion },
  { id: 'planes', render: Planes },
  { id: 'estancia', render: Estancia },
  { id: 'barrio', render: Barrio },
  { id: 'anfitrion', render: Anfitrion },
  { id: 'turismo', render: Turismo },
]
