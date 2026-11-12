import { useEffect, useRef, useState } from 'react'
import { useDemo, useNav } from './nav'
import { useIdioma, useT, type Idioma } from './idioma'
import { Ico } from './iconos'
import { BarraApp, BotonApp, BotonReinicio, CampoApp, ChipsApp, Cuerpo, SelectorIdioma, Segmentos } from './piezas'
import { Confirmacion, Reserva, type DatosReserva } from './piezas-flujo'
import { VacioApp } from './estados'
import { EMOCIONES, EXPERIENCIAS, MARCA, POR_VALIDAR, anfitrion, barrio, buscar, donde, ejemplo, emocion, emocionDe, emocionPortada, emocionesProvisionales, iconoDe, porEmocion, type Experiencia } from './experiencias'
import { MUNICIPIOS_CON_DATOS, datosDe } from './datos-barrio'
import { AvisoEjemplo, Avatar, BarraPerfil, SelloTT, ChipsEmo, Corazon, Ej, IrExplorar, PIEDRAS, PiedrasFuego, Portada, TarjetaExp, escalon, estiloEmo, eur, nota } from './tenique-piezas'
import './tenique.css'

// ─────────────────────────────────────────────────────────────────────────────
//  TENIQUE · pieza digital del programa «Tenerife se cocina entre todos»
//  Flujo del jurado: inicio → municipio (vecino) → sentir → lista → experiencia → reserva → confirmacion.
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
const MUNICIPIOS = [...new Set([...EXPERIENCIAS.map((e) => e.municipio), ...MUNICIPIOS_CON_DATOS])].sort((a, b) => a.localeCompare(b, 'es'))
const BRASA = MARCA

/** Fondo de ejemplo de un municipio: lo que aportan sus experiencias (valores de demostración). */
function fondoDe(m: string) {
  return EXPERIENCIAS.filter((e) => e.municipio === m).reduce((s, e) => { const v = ejemplo(e); return s + v.aporte * v.opiniones * 3 }, 0)
}

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
      <p><Ico name="check" size={18} /> {t({ es: `Tu propuesta entra en la próxima votación del fondo de ${enviada}.`, en: `Your proposal goes into the next vote of the ${enviada} fund.` })}</p>
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

/** Acceso físico (tercera piedra del programa): tipos genéricos, sin lugares inventados. */
function SinMovil() {
  const t = useT()
  return <p className="tq-nota">{t({ es: '¿Sin móvil? También en oficinas de turismo, centros ciudadanos y ayuntamientos.', en: 'No phone? Also at tourist offices, community centres and town halls.' })}</p>
}

/* ───────── 1. Inicio: quién eres ───────── */

function Inicio() {
  const t = useT()
  const { ir } = useNav()
  const { guardar } = useDemo()
  const elegir = (perfil: string, destino: string) => { guardar('perfil', perfil); ir(destino) }
  return (
    <>
      <BarraApp titulo="" accion={<SelectorIdioma />} />
      <Cuerpo>
        <Portada emo={BRASA} icono="fogon" className="tq-hero tq-inicio-hero">
          <span className="tq-hero-txt">
            <b className="tq-marca-t">Tenique</b>
            <span>{t({ es: 'Tenerife se cocina entre todos', en: 'Tenerife is cooked up together' })}</span>
            <small>{t({ es: 'Experiencias reales entre vecinos y visitantes, en toda la isla.', en: 'Real experiences shared by locals and visitors, all over the island.' })}</small>
          </span>
        </Portada>
        <h3 className="app-subt">{t({ es: '¿Quién eres?', en: 'Who are you?' })}</h3>
        <div className="tq-stagger tq-perfiles">
          <button className="tq-perfil dest" style={escalon(0)} onClick={() => elegir('vecino', 'municipio')}>
            <span className="tq-perfil-ico"><Ico name="home" size={24} /></span>
            <span><b>{t({ es: 'Vivo en Tenerife', en: 'I live in Tenerife' })}</b><small>{t({ es: 'Vive tu isla y decide en tu barrio', en: 'Live your island, have a say in your area' })}</small></span>
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
  const { ir } = useNav()
  const { guardar } = useDemo()
  return (
    <>
      <BarraApp titulo="" accion={<SelectorIdioma />} />
      <Cuerpo>
        <div className="tq-cab">
          <span className="tq-kicker">{t({ es: 'Vivo en Tenerife', en: 'I live in Tenerife' })}</span>
          <h2 className="tq-h1">{t({ es: '¿En qué municipio vives?', en: 'Which town do you live in?' })}</h2>
          <p className="app-texto">{t({ es: 'Verás lo que pasa en tu barrio y qué deja allí el turismo.', en: 'You will see what happens in your area and what tourism leaves there.' })}</p>
        </div>
        <div className="tq-municipios tq-stagger">
          {MUNICIPIOS.map((m, i) => (
            <button key={m} style={escalon(i)} onClick={() => { guardar('municipio', m); ir('sentir') }}>
              <Ico name="pin" size={15} />{m}
            </button>
          ))}
        </div>
      </Cuerpo>
    </>
  )
}

/* ───────── 2. Quiero sentir… ───────── */

function Sentir() {
  const t = useT()
  const { ir } = useNav()
  const { datos, guardar } = useDemo()
  const vecino = datos.perfil === 'vecino'
  const m = datos.municipio as string | undefined
  return (
    <>
      <BarraApp titulo="Tenique" accion={<SelectorIdioma />} />
      <Cuerpo>
        <div className="tq-cab">
          <span className="tq-kicker">{vecino && m ? t({ es: `Vives en ${m}`, en: `You live in ${m}` }) : t({ es: 'Te damos la bienvenida a Tenerife', en: 'Welcome to Tenerife' })}</span>
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
                {e.frase && <small>{t({ es: e.frase, en: `${n} experience${n === 1 ? '' : 's'}` })}</small>}
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
  const lista = porEmocion(emo?.id)
  const abrir = (e: Experiencia) => { guardar('experiencia', e.id); ir('experiencia') }
  return (
    <>
      <BarraApp titulo={emo ? t(emo) : t({ es: 'Experiencias', en: 'Experiences' })} accion={<SelectorIdioma />} />
      <Cuerpo>
        {emo && (
          <Portada emo={emo} className="tq-hero tq-lista-hero">
            <span className="tq-hero-txt">
              <b className="tq-h1 claro">{t(emo)}</b>
              <span>{t({ es: `${lista.length} experiencias reales en la isla`, en: `${lista.length} real experiences on the island` })}</span>
            </span>
          </Portada>
        )}
        {EXPERIENCIAS.length === 0 ? <SinExperiencias /> : lista.length === 0 ? (
          <VacioApp
            titulo={t({ es: 'Aún no hay experiencias para esta emoción', en: 'No experiences for this feeling yet' })}
            accion={<BotonApp variante="secundario" onClick={() => guardar('emocion', undefined)}>{t({ es: 'Ver todas', en: 'See all' })}</BotonApp>}
          />
        ) : (
          <>
            <div className="tq-stagger tq-lista">{lista.map((e, i) => <TarjetaExp key={e.id} e={e} i={i} evitar={emo?.id} onAbrir={() => abrir(e)} />)}</div>
            <AvisoEjemplo />
          </>
        )}
      </Cuerpo>
      <BarraPerfil />
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
      <button className="tq-enlace" onClick={() => { guardar('municipio', e.municipio); ir('barrio') }}>{t({ es: `Todo lo que deja el turismo en ${e.municipio}`, en: `Everything tourism leaves in ${e.municipio}` })} <Ico name="right" size={14} /></button>
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
      <BarraApp titulo={e.municipio} accion={<Corazon id={e.id} />} />
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
            {e.cuando && <li><Ico name="clock" size={15} />{e.cuando}</li>}
            {e.precioFuente && <li><Ico name="ticket" size={15} />{e.precioFuente}</li>}
            {e.idiomas?.length ? <li><Ico name="globe" size={15} />{e.idiomas.join(' · ')}</li> : null}
          </ul>
          <ChipsEmo ids={e.emociones} />
        </div>
        <PiedrasFuego e={e} />
        <p className="app-texto">
          {t(e.descripcion)}
          {idioma === 'en' && typeof e.descripcion === 'string' && <small className="tq-en"> (in Spanish)</small>}
        </p>
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

function PantallaReserva() {
  const t = useT()
  const { datos } = useDemo()
  const e = buscar(datos.experiencia)
  if (!e) return <><BarraApp titulo="" /><Cuerpo><SinExperiencias /></Cuerpo></>
  const v = ejemplo(e)
  const sinPago = v.gratis || datos.modo === 'tiempo'
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
        />
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
                <small className="tnum">{t({ es: `Próximo proyecto votado por el barrio: ${eur(Math.round(fondo + aporte), idioma)} de ${eur(meta, idioma)}`, en: `Next project voted by the area: ${eur(Math.round(fondo + aporte), idioma)} of ${eur(meta, idioma)}` })}</small>
                <small>{t({ es: 'Lo guarda el Cabildo en la cuenta del municipio y el barrio decide en qué se usa.', en: 'The Cabildo holds it in the town’s account and the neighbourhood decides how it is spent.' })}</small>
              </div>
            ))}
            <p className="tq-nota">{t({ es: 'Después la valoran todas las personas que asistieron, vecinos y visitantes.', en: 'Afterwards everyone who attended rates it, locals and visitors.' })}</p>
          </Confirmacion>
        </div>
        <AvisoEjemplo />
        {e && <BotonApp onClick={() => guardar('municipio', e.municipio)} ir="barrio">{t({ es: 'Qué deja el turismo en', en: 'What tourism leaves in' })} {e.municipio}</BotonApp>}
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
      <BarraApp titulo={t({ es: 'Mis planes', en: 'My plans' })} accion={<SelectorIdioma />} />
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
      <BarraApp titulo={t({ es: 'Tu estancia', en: 'Your stay' })} accion={<SelectorIdioma />} />
      <Cuerpo>
        <Portada emo={BRASA} icono="euro" className="tq-hero">
          <span className="tq-hero-txt">
            <span>{t({ es: 'Qué dejas en la isla', en: 'What you leave on the island' })}</span>
            <b className="tq-h1 claro tnum">{eur(total, idioma)}</b>
            <small>{t({ es: `en ${porMunicipio.size} municipio${porMunicipio.size === 1 ? '' : 's'}`, en: `in ${porMunicipio.size} town${porMunicipio.size === 1 ? '' : 's'}` })}</small>
          </span>
        </Portada>
        {planes.length === 0 ? (
          <VacioApp icono="euro" titulo={t({ es: 'Aún no has dejado nada', en: 'Nothing left yet' })} texto={t({ es: 'Cada experiencia aporta al fondo del municipio donde se vive. Lo decide el barrio.', en: 'Each experience gives to the fund of the town where it happens. The neighbourhood decides.' })} accion={<IrExplorar />} />
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
  const m = (MUNICIPIOS.includes(datos.municipio as string) ? datos.municipio : MUNICIPIOS[0]) as string | undefined
  if (!m) return <><BarraApp titulo="" /><Cuerpo><SinExperiencias /></Cuerpo></>
  const fondo = Math.round(fondoDe(m))
  const n = EXPERIENCIAS.filter((e) => e.municipio === m).length
  const vecino = datos.perfil === 'vecino'
  return (
    <>
      <BarraApp titulo={vecino ? t({ es: 'Mi barrio', en: 'My area' }) : t({ es: 'Municipios', en: 'Towns' })} accion={<SelectorIdioma />} />
      <Cuerpo>
        <Portada emo={BRASA} icono="home" className="tq-hero">
          <span className="tq-hero-txt">
            <span>{t({ es: 'Qué deja el turismo en', en: 'What tourism leaves in' })}</span>
            <b className="tq-h1 claro">{m}</b>
          </span>
        </Portada>
        <ChipsApp opciones={MUNICIPIOS} activa={m} onCambio={(x) => guardar('municipio', x)} />

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
              <div className="app-kpi"><b className="tnum">{eur(fondo, idioma)}</b><span>{t({ es: 'Aportado por las reservas', en: 'Given by bookings' })}</span></div>
              <div className="app-kpi"><b className="tnum">{n}</b><span>{t({ es: 'Experiencias reales aquí', en: 'Real experiences here' })}</span></div>
            </div>
            <ul className="tq-reparto">
              <li><span><b>{t({ es: 'Arreglo de un espacio vecinal', en: 'Fixing a community space' })}</b><b className="tnum">{eur(Math.round(fondo * 0.6), idioma)}</b></span><i style={{ transform: 'scaleX(.6)' }} /><small>{t({ es: 'Votado por el barrio', en: 'Voted by the neighbourhood' })}</small></li>
              <li><span><b>{t({ es: 'Actividades con mayores del barrio', en: 'Activities with older neighbours' })}</b><b className="tnum">{eur(Math.round(fondo * 0.4), idioma)}</b></span><i style={{ transform: 'scaleX(.4)' }} /><small>{t({ es: 'Votado por el barrio', en: 'Voted by the neighbourhood' })}</small></li>
            </ul>
          </>
        )}
        <Propuesta municipio={m} />
        <SinMovil />
      </Cuerpo>
      <BarraPerfil />
    </>
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

/** Cola de una piedra: Turismo de Tenerife da la garantía (0); el barrio, el aval (1). En tarjetas, con motivo opcional. */
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
                <span className="tq-cola-txt"><b>{t(e.titulo)}</b><small>{e.municipio}{anfitrion(e) ? ` · ${anfitrion(e)}` : ''}</small></span>
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
  const filas = [
    { estrellas: 5, quien: { es: 'Asistió · residente', en: 'Attended · resident' } },
    { estrellas: 4, quien: { es: 'Asistió · visitante', en: 'Attended · visitor' } },
    { estrellas: 5, quien: { es: 'Asistió · visitante', en: 'Attended · visitor' } },
    { estrellas: 3, quien: { es: 'Asistió · residente', en: 'Attended · resident' } },
  ]
  return (
    <>
      <div className="app-kpis">
        <div className="app-kpi"><b className="tnum">4,6</b><span>{t({ es: 'Media de quienes asistieron', en: 'Attendees average' })}</span></div>
        <div className="app-kpi"><b className="tnum">38</b><span>{t({ es: 'Valoraciones', en: 'Ratings' })}</span></div>
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
      <BarraApp titulo={t({ es: 'Anfitriones y barrio', en: 'Hosts and area' })} accion={<SelectorIdioma />} />
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
    const v = ejemplo(e), g = grupos.get(barrio(e)) ?? { n: 0, total: 0 }
    grupos.set(barrio(e), { n: g.n + 1, total: g.total + v.aporte * v.opiniones * 3 })
  }
  const filas = [...grupos].sort((a, b) => b[1].total - a[1].total)
  const max = Math.max(1, ...filas.map(([, g]) => g.total))
  return (
    <>
      <p className="tq-nota">{t({ es: 'El fondo lo gestiona el Cabildo, con una cuenta por municipio. Turismo de Tenerife lo publica. Municipios reales; importes de ejemplo.', en: 'The Cabildo manages the fund, one account per town. Turismo de Tenerife publishes it. Real towns; example amounts.' })}</p>
      <ul className="tq-reparto tq-stagger">
        {filas.map(([m, g], i) => (
          <li key={m} style={escalon(i)}>
            <button onClick={() => { guardar('municipio', m); ir('barrio') }}>
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

function Turismo() {
  const t = useT()
  const { idioma } = useIdioma()
  const total = EXPERIENCIAS.reduce((s, e) => { const v = ejemplo(e); return s + v.aporte * v.opiniones * 3 }, 0)
  const municipios = new Set(EXPERIENCIAS.map((e) => e.municipio)).size
  return (
    <>
      <BarraApp titulo="Turismo de Tenerife" accion={<SelectorIdioma />} />
      <Cuerpo>
        <div className="tq-cab">
          <img className="tq-logo-tt" src={import.meta.env.BASE_URL + 'img/marca/turismo-tenerife-color.png'} alt="Turismo de Tenerife" />
          <span className="tq-kicker">{t({ es: 'Da la garantía y coordina el programa Tenique', en: 'Grants the guarantee, runs the Tenique programme' })}</span>
          <h2 className="tq-h1">{t({ es: 'Panel del programa', en: 'Programme panel' })}</h2>
        </div>
        <div className="tq-kpis4 tq-stagger">
          <div className="app-kpi" style={escalon(0)}><b className="tnum">{EXPERIENCIAS.length}</b><span>{t({ es: 'Publicadas (reales)', en: 'Live (real)' })}</span></div>
          <div className="app-kpi" style={escalon(1)}><b className="tnum">{POR_VALIDAR.length}</b><span>{t({ es: 'Por verificar', en: 'To verify' })}</span></div>
          <div className="app-kpi" style={escalon(2)}><b className="tnum">{municipios}</b><span>{t({ es: 'Municipios', en: 'Towns' })}</span></div>
          <div className="app-kpi" style={escalon(3)}><b className="tnum">{eur(Math.round(total), idioma)}</b><span>{t({ es: 'Fondo publicado', en: 'Fund published' })} <Ej /></span></div>
        </div>
        <Segmentos opciones={[
          { id: 'validar', texto: t({ es: `Garantía (${POR_VALIDAR.length})`, en: `Guarantee (${POR_VALIDAR.length})` }), contenido: <ColaPiedra piedra={0} /> },
          { id: 'fondo', texto: t({ es: 'Fondo por municipio', en: 'Fund by town' }), contenido: <Fondo /> },
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
