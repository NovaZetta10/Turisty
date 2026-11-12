import { useState } from 'react'
import { useDemo, useNav } from './nav'
import { useIdioma, useT, type Idioma } from './idioma'
import { Ico } from './iconos'
import { BarraApp, BotonApp, BotonReinicio, CampoApp, ChipsApp, Cuerpo, ListaApp, SelectorIdioma, SelectorPerfil, Segmentos, TituloApp } from './piezas'
import { Confirmacion, Ficha, Panel, Reserva, type DatosReserva } from './piezas-flujo'
import { VacioApp } from './estados'
import { EMOCIONES, EXPERIENCIAS, POR_VALIDAR, barrio, buscar, donde, ejemplo, emocionesProvisionales, porEmocion, type Experiencia } from './experiencias'
import { MUNICIPIOS_CON_DATOS, datosDe } from './datos-barrio'
import './tenique.css'

// ─────────────────────────────────────────────────────────────────────────────
//  TENIQUE · pieza digital del programa «Tenerife se cocina entre todos»
//  Flujo feliz (jurado, < 30 s): inicio → sentir → lista → experiencia → reserva → confirmacion.
//  Gestión: anfitrion (alta y valoraciones) y turismo (validar y fondo local).
//  Experiencias: SOLO reales, de src/data/experiencias.ts (ver experiencias.ts).
//  Las «Por verificar» no salen al visitante: van a la cola de validación de Turismo de Tenerife.
//  Plaza Tenique, valoración y aporte al fondo: valores de demostración, siempre con la marca «ejemplo».
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

// Perfiles: datos.perfil = 'turista' | 'vecino' | 'anfitrion' | 'turismo'.

/* ───────── piezas propias de Tenique ───────── */

/** Marca de valor de demostración. */
function Ej() {
  const t = useT()
  return <span className="tq-ej">{t({ es: 'ejemplo', en: 'example' })}</span>
}

/** Las tres piedras de la validación (como las del tenique). */
const PIEDRAS = [
  { id: 'garantia', icono: 'sello', titulo: { es: 'Garantía Turismo de Tenerife', en: 'Tenerife Tourism guarantee' }, sub: { es: 'Seguridad, legalidad, seguro y accesibilidad. Antes de publicar.', en: 'Safety, legality, insurance and accessibility. Before publishing.' } },
  { id: 'aval', icono: 'users', titulo: { es: 'Avalada por el barrio', en: 'Backed by the neighbourhood' }, sub: { es: 'Los vecinos o su asociación la avalan y lo renuevan. Si retiran el aval, sale.', en: 'Neighbours or their association back it and renew it. If they withdraw, it goes.' } },
  { id: 'valorada', icono: 'star', titulo: { es: 'Valorada por quien la vivió', en: 'Rated by those who lived it' }, sub: { es: 'Solo puntúa quien reservó y asistió.', en: 'Only people who booked and attended can rate.' } },
]

/** Versión compacta para las tarjetas de la lista. */
function Sello() {
  const t = useT()
  return (
    <span className="tq-sello" title={PIEDRAS.map((p) => t(p.titulo)).join(' · ')}>
      {PIEDRAS.map((p) => <Ico key={p.id} name={p.icono} size={14} />)}
      {t({ es: 'Triple validación', en: 'Triple check' })}
    </span>
  )
}

/** Las tres insignias en la ficha. */
function TresPiedras({ e }: { e: Experiencia }) {
  const t = useT()
  return (
    <div className="tq-piedras">
      <span className="tq-piedras-t">{t({ es: 'Las tres piedras', en: 'The three stones' })} <Ej /></span>
      {PIEDRAS.map((p) => (
        <div key={p.id} className="tq-piedra">
          <span className="tq-piedra-ico"><Ico name={p.icono} size={16} /></span>
          <span><b>{t(p.titulo)}</b><small>{p.id === 'valorada' ? <Valoracion e={e} /> : t(p.sub)}</small></span>
          <Ico name="check" size={16} />
        </div>
      ))}
    </div>
  )
}

/** Formato de números: de-DE para español porque separa los miles también con 4 cifras (1.958 €). */
const fmt = (idioma: string) => (idioma === 'es' ? 'de-DE' : 'en-GB')
const eur = (n: number, idioma: string) => n.toLocaleString(fmt(idioma), { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €'

function Valoracion({ e }: { e: Experiencia }) {
  const t = useT()
  const { idioma } = useIdioma()
  const v = ejemplo(e)
  return (
    <span className="tq-valora">
      <Ico name="star" size={14} />
      <b className="tnum">{v.valoracion.toLocaleString(fmt(idioma), { minimumFractionDigits: 1 })}</b>
      {t({ es: `· ${v.opiniones} asistentes`, en: `· ${v.opiniones} attendees` })} <Ej />
    </span>
  )
}

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

/* ───────── 1. Inicio: perfiles ───────── */

function Inicio() {
  const t = useT()
  const { guardar } = useDemo()
  const elegir = (id: string) => guardar('perfil', id)
  return (
    <>
      <BarraApp titulo="" accion={<SelectorIdioma />} />
      <Cuerpo>
        <div className="tq-marca">
          <span className="tq-logo"><Ico name="fogon" size={30} /></span>
          <h2>Tenique</h2>
          <p>{t({ es: 'Tenerife se cocina entre todos', en: 'Tenerife is cooked up together' })}</p>
        </div>
        <h3 className="app-subt">{t({ es: 'Vivir la isla', en: 'Live the island' })}</h3>
        <SelectorPerfil onElegir={elegir} perfiles={[
          { id: 'turista', titulo: t({ es: 'Estoy de visita', en: "I'm visiting" }), sub: t({ es: 'Experiencias con gente de aquí', en: 'Experiences with local people' }), icono: 'globe', ir: 'sentir' },
          { id: 'vecino', titulo: t({ es: 'Vivo en Tenerife', en: 'I live in Tenerife' }), sub: t({ es: 'Precio de residente y voz en tu barrio', en: 'Resident price and a say in your area' }), icono: 'home', ir: 'sentir' },
        ]} />
        <h3 className="app-subt">{t({ es: 'Gestionar', en: 'Manage' })}</h3>
        <SelectorPerfil onElegir={elegir} perfiles={[
          { id: 'anfitrion', titulo: t({ es: 'Anfitrión o asociación', en: 'Host or association' }), sub: t({ es: 'Ofrece y avala experiencias', en: 'Offer and back experiences' }), icono: 'users', ir: 'anfitrion' },
          { id: 'turismo', titulo: 'Turismo de Tenerife', sub: t({ es: 'Da la garantía y sigue el fondo', en: 'Grants the guarantee, tracks the fund' }), icono: 'sello', ir: 'turismo' },
        ]} />
        <SinMovil />
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
  return (
    <>
      <BarraApp titulo="Tenique" accion={<SelectorIdioma />} />
      <Cuerpo>
        <TituloApp kicker={vecino ? t({ es: 'Hola, vecindad', en: 'Hi, neighbour' }) : t({ es: 'Te damos la bienvenida', en: 'Welcome to Tenerife' })}>
          {t({ es: 'Quiero sentir…', en: 'I want to feel…' })}
        </TituloApp>
        <div className="tq-emociones">
          {EMOCIONES.map((e) => {
            const n = porEmocion(e.id).length
            return (
              <button key={e.id} className="tq-emo" onClick={() => { guardar('emocion', e.id); ir('lista') }}>
                <Ico name={e.icono} size={22} />
                <b>{t(e)}</b>
                {n > 0 && <small className="tnum">{n}</small>}
              </button>
            )
          })}
        </div>
        {vecino && (
          <button className="tq-exp tq-barrio" onClick={() => ir('barrio')}>
            <span className="tq-sello"><Ico name="euro" size={14} />{t({ es: 'Datos y transparencia', en: 'Data and transparency' })}</span>
            <b>{t({ es: 'Qué deja el turismo en tu barrio', en: 'What tourism leaves in your area' })}</b>
          </button>
        )}
        {emocionesProvisionales && <p className="tq-nota">{t({ es: 'Emociones propuestas, por validar con vecinos y visitantes.', en: 'Proposed feelings, to be validated with locals and visitors.' })}</p>}
      </Cuerpo>
    </>
  )
}

/* ───────── 3. Lista de experiencias ───────── */

function Lista() {
  const t = useT()
  const { ir } = useNav()
  const { datos, guardar } = useDemo()
  const emo = EMOCIONES.find((e) => e.id === datos.emocion)
  const lista = porEmocion(emo?.id)
  return (
    <>
      <BarraApp titulo={emo ? t(emo) : t({ es: 'Experiencias', en: 'Experiences' })} accion={<SelectorIdioma />} />
      <Cuerpo>
        {EXPERIENCIAS.length === 0 ? <SinExperiencias /> : lista.length === 0 ? (
          <VacioApp
            titulo={t({ es: 'Aún no hay experiencias para esta emoción', en: 'No experiences for this feeling yet' })}
            accion={<BotonApp variante="secundario" onClick={() => guardar('emocion', undefined)}>{t({ es: 'Ver todas', en: 'See all' })}</BotonApp>}
          />
        ) : (
          <>
            <p className="app-texto">{t({ es: `${lista.length} experiencias reales de la isla.`, en: `${lista.length} real experiences on the island.` })}</p>
            {lista.map((e) => (
              <button key={e.id} className="tq-exp" onClick={() => { guardar('experiencia', e.id); ir('experiencia') }}>
                <Sello />
                <b>{t(e.titulo)}</b>
                <small><Ico name="pin" size={13} /> {donde(e)}</small>
                <Valoracion e={e} />
              </button>
            ))}
            <p className="tq-nota">{t({ es: 'Triple validación, valoraciones y plazas: simulación del programa.', en: 'Triple check, ratings and places: programme simulation.' })}</p>
          </>
        )}
      </Cuerpo>
    </>
  )
}

/* ───────── 4. Experiencia ───────── */

function DetalleExperiencia() {
  const t = useT()
  const { idioma } = useIdioma()
  const { datos } = useDemo()
  const e = buscar(datos.experiencia)
  if (!e) return <><BarraApp titulo="" /><Cuerpo><SinExperiencias /></Cuerpo></>
  const v = ejemplo(e)
  const vecino = datos.perfil === 'vecino'
  return (
    <>
      <BarraApp titulo={e.municipio} accion={<SelectorIdioma />} />
      <Cuerpo>
        <Ficha
          icono="fogon"
          titulo={t(e.titulo)}
          etiqueta={e.mixta ? t({ es: 'Vecinos y visitantes juntos', en: 'Locals and visitors together' }) : undefined}
          meta={[
            { icono: 'pin', texto: donde(e) },
            ...(e.cuando ? [{ icono: 'clock', texto: e.cuando }] : []),
            ...(e.organizador ? [{ icono: 'users', texto: e.organizador }] : []),
            ...(e.precioFuente ? [{ icono: 'ticket', texto: e.precioFuente }] : []),
            ...(e.idiomas?.length ? [{ icono: 'globe', texto: e.idiomas.join(' · ') }] : []),
          ]}
        >
          {t(e.descripcion)}
          {idioma === 'en' && typeof e.descripcion === 'string' && <small className="tq-en"> (in Spanish)</small>}
        </Ficha>
        <TresPiedras e={e} />
        <div className="tq-aporte">
          <Ico name="euro" size={20} />
          <p>
            {v.gratis ? t({ es: 'Es gratis. Puedes aportar', en: "It's free. You can give" }) : t({ es: 'Cada plaza aporta', en: 'Each place gives' })}{' '}
            <b className="tnum">{eur(v.aporte, idioma)}</b> {t({ es: 'al fondo de', en: 'to the fund of' })} <b>{barrio(e)}</b> <Ej />
          </p>
        </div>
        {!v.gratis && (
          <div className="tq-precio">
            <span>{t({ es: 'Plaza Tenique', en: 'Tenique place' })}{vecino && e.mixta ? t({ es: ' · residente', en: ' · resident' }) : ''} <Ej /></span>
            <b className="tnum">{eur(vecino ? v.precioResidente : v.precio, idioma)}</b>
          </div>
        )}
        <BotonApp ir="reserva">{v.gratis ? t({ es: 'Apuntarme', en: 'Sign me up' }) : t({ es: 'Reservar', en: 'Book' })}</BotonApp>
        {e.fuente && <a className="tq-fuente" href={e.fuente.url} target="_blank" rel="noreferrer">{t({ es: 'Fuente', en: 'Source' })}: {e.fuente.titulo} <Ico name="external" size={12} /></a>}
      </Cuerpo>
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
  return (
    <>
      <BarraApp titulo={t({ es: 'Reserva', en: 'Booking' })} />
      <Cuerpo>
        <TituloApp kicker={t(e.titulo)}>{t({ es: '¿Cuándo vienes?', en: 'When are you coming?' })}</TituloApp>
        <Reserva franjas={['10:00', '12:00', '17:00']} destino="confirmacion" precio={v.gratis ? undefined : datos.perfil === 'vecino' ? v.precioResidente : v.precio} />
        <p className="tq-nota">{t({ es: 'Fechas, horas y precios de ejemplo; los reales están en la ficha. Pago simulado.', en: 'Example dates, times and prices; real ones are on the detail page. Simulated payment.' })}</p>
      </Cuerpo>
    </>
  )
}

/* ───────── 6. Confirmación con aporte al fondo ───────── */

function PantallaConfirmacion() {
  const t = useT()
  const { idioma } = useIdioma()
  const { datos, guardar } = useDemo()
  const e = buscar(datos.experiencia)
  const r = datos.reserva as DatosReserva | undefined
  const v = e ? ejemplo(e) : undefined
  return (
    <>
      <BarraApp titulo="" />
      <Cuerpo>
        <Confirmacion titulo={t({ es: '¡Nos vemos allí!', en: 'See you there!' })}>
          {e && r && v && (
            <div className="tq-aporte grande">
              <Ico name="fogon" size={24} />
              <p>
                {v.gratis ? t({ es: 'Tu aporte voluntario:', en: 'Your voluntary gift:' }) : t({ es: 'Tu reserva aporta', en: 'Your booking gives' })}{' '}
                <b className="tnum">{eur(v.aporte * r.personas, idioma)}</b> {t({ es: 'al fondo de', en: 'to the fund of' })} <b>{barrio(e)}</b> <Ej /><br />
                <small>{t({ es: 'El barrio decide en qué se usa. Lo verás aquí, proyecto a proyecto.', en: 'The neighbourhood decides how it is spent. You will see it here, project by project.' })}</small>
              </p>
            </div>
          )}
          <p className="tq-nota">{t({ es: 'Después podrás valorar la experiencia. Los vecinos también la puntúan.', en: 'Afterwards you can rate it. Locals rate it too.' })}</p>
        </Confirmacion>
        {e && <BotonApp onClick={() => guardar('municipio', e.municipio)} ir="barrio">{t({ es: 'Qué deja el turismo en', en: 'What tourism leaves in' })} {e.municipio}</BotonApp>}
        <BotonReinicio />
      </Cuerpo>
    </>
  )
}

/* ───────── Qué deja el turismo en tu barrio (datos y transparencia) ───────── */

/** Municipios de las experiencias y los que tienen datos de presión turística (investigacion.ts). */
const MUNICIPIOS = [...new Set([...EXPERIENCIAS.map((e) => e.municipio), ...MUNICIPIOS_CON_DATOS])].sort((a, b) => a.localeCompare(b, 'es'))

/** Fondo de ejemplo de un municipio: lo que aportan sus experiencias (valores de demostración). */
function fondoDe(m: string) {
  return EXPERIENCIAS.filter((e) => e.municipio === m).reduce((s, e) => { const v = ejemplo(e); return s + v.aporte * v.opiniones * 3 }, 0)
}

function Barrio() {
  const t = useT()
  const { idioma } = useIdioma()
  const { datos, guardar } = useDemo()
  const [propuesta, setPropuesta] = useState(false)
  const m = (MUNICIPIOS.includes(datos.municipio as string) ? datos.municipio : MUNICIPIOS[0]) as string | undefined
  if (!m) return <><BarraApp titulo="" /><Cuerpo><SinExperiencias /></Cuerpo></>
  const fondo = Math.round(fondoDe(m))
  const n = EXPERIENCIAS.filter((e) => e.municipio === m).length
  return (
    <>
      <BarraApp titulo={t({ es: 'Tu barrio', en: 'Your area' })} accion={<SelectorIdioma />} />
      <Cuerpo>
        <TituloApp kicker={m}>{t({ es: 'Qué deja el turismo aquí', en: 'What tourism leaves here' })}</TituloApp>
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

        <h3 className="app-subt">{t({ es: 'Fondo Tenique', en: 'Tenique fund' })} <Ej /></h3>
        {n === 0 ? <p className="tq-nota">{t({ es: 'Aún no hay experiencias Tenique en este municipio.', en: 'No Tenique experiences in this town yet.' })}</p> : <>
        <div className="app-kpis">
          <div className="app-kpi"><b className="tnum">{eur(fondo, idioma)}</b><span>{t({ es: 'Aportado por las reservas', en: 'Given by bookings' })}</span></div>
          <div className="app-kpi"><b className="tnum">{n}</b><span>{t({ es: 'Experiencias reales aquí', en: 'Real experiences here' })}</span></div>
        </div>
        <ListaApp items={[
          { titulo: t({ es: 'Arreglo de un espacio vecinal', en: 'Fixing a community space' }), sub: t({ es: 'Votado por el barrio · ejemplo', en: 'Voted by the neighbourhood · example' }), extra: <b className="tnum">{eur(Math.round(fondo * 0.6), idioma)}</b> },
          { titulo: t({ es: 'Actividades con mayores del barrio', en: 'Activities with older neighbours' }), sub: t({ es: 'Votado por el barrio · ejemplo', en: 'Voted by the neighbourhood · example' }), extra: <b className="tnum">{eur(Math.round(fondo * 0.4), idioma)}</b> },
        ]} />
        </>}
        {propuesta
          ? <p className="tq-aporte app-aparece"><Ico name="check" size={18} /> {t({ es: 'Propuesta recibida. Se vota en la asamblea del barrio o en el centro ciudadano.', en: 'Proposal received. It is voted at the neighbourhood assembly or the community centre.' })}</p>
          : <BotonApp variante="secundario" onClick={() => setPropuesta(true)}>{t({ es: 'Proponer un proyecto para el barrio', en: 'Propose a project for the area' })}</BotonApp>}
        <SinMovil />
      </Cuerpo>
    </>
  )
}

/** Acceso físico (tercera piedra): tipos genéricos, sin lugares inventados. */
function SinMovil() {
  const t = useT()
  return <p className="tq-nota">{t({ es: '¿Sin móvil? También en oficinas de turismo, centros ciudadanos y ayuntamientos.', en: 'No phone? Also at tourist offices, community centres and town halls.' })}</p>
}

/* ───────── Gestión · anfitrión o entidad ───────── */

function NuevaExperiencia() {
  const t = useT()
  const [titulo, setTitulo] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [emos, setEmos] = useState<string[]>([])
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
  const lista = titulo.trim() && municipio.trim() && emos.length > 0
  return (
    <div className="tq-form">
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
        <span>{t({ es: 'Experiencia mixta: plazas para residentes con precio de residente', en: 'Mixed experience: places for residents at resident price' })}</span>
      </label>
      <BotonApp desactivado={!lista} onClick={() => setEnviada(true)}>{t({ es: 'Enviar a validación', en: 'Send for approval' })}</BotonApp>
    </div>
  )
}

function Anfitrion() {
  const t = useT()
  return (
    <>
      <BarraApp titulo={t({ es: 'Anfitriones y barrio', en: 'Hosts and area' })} accion={<SelectorIdioma />} />
      <Cuerpo>
        <Segmentos opciones={[
          { id: 'alta', texto: t({ es: 'Nueva', en: 'New' }), contenido: <NuevaExperiencia /> },
          { id: 'aval', texto: t({ es: 'Avalar', en: 'Back' }), contenido: <ColaPiedra piedra={1} /> },
          {
            id: 'valoraciones', texto: t({ es: 'Valoraciones', en: 'Ratings' }), contenido: (
              <>
                <p className="tq-nota">{t({ es: 'Solo puntúa quien reservó y asistió. Valores de ejemplo.', en: 'Only people who booked and attended rate. Example values.' })}</p>
                <Panel
                  indicadores={[
                    { valor: '4,6', etiqueta: t({ es: 'Media de asistentes', en: 'Attendees average' }) },
                    { valor: '38', etiqueta: t({ es: 'Valoraciones', en: 'Ratings' }) },
                  ]}
                  tituloLista={t({ es: 'Últimas valoraciones', en: 'Latest ratings' })}
                  filas={[
                    { titulo: '★★★★★', sub: t({ es: 'Asistió · residente', en: 'Attended · resident' }), estado: 'ok' },
                    { titulo: '★★★★☆', sub: t({ es: 'Asistió · visitante', en: 'Attended · visitor' }), estado: 'ok' },
                    { titulo: '★★★☆☆', sub: t({ es: 'Asistió · visitante', en: 'Attended · visitor' }), estado: 'aviso' },
                  ]}
                />
              </>
            ),
          },
        ]} />
        <BotonReinicio />
      </Cuerpo>
    </>
  )
}

/* ───────── Gestión · Turismo de Tenerife ───────── */

/** Cola de una piedra de validación: Turismo de Tenerife da la garantía (1); el barrio, el aval (2). */
function ColaPiedra({ piedra }: { piedra: 0 | 1 }) {
  const t = useT()
  const [hechas, setHechas] = useState<Record<string, 'ok' | 'no'>>({})
  const p = PIEDRAS[piedra]
  if (POR_VALIDAR.length === 0) return <VacioApp icono={p.icono} titulo={t({ es: 'Nada pendiente', en: 'Nothing pending' })} />
  const si = piedra === 0 ? { es: 'Garantía dada', en: 'Guaranteed' } : { es: 'Avalada', en: 'Backed' }
  const no = piedra === 0 ? { es: 'Cambios pedidos', en: 'Changes requested' } : { es: 'Sin aval', en: 'Not backed' }
  return (
    <>
      <div className="tq-piedra"><span className="tq-piedra-ico"><Ico name={p.icono} size={16} /></span><span><b>{piedra + 1}. {t(p.titulo)}</b><small>{t(p.sub)}</small></span></div>
      <p className="tq-nota">{t({ es: 'Experiencias reales aún sin confirmar. La decisión es simulada.', en: 'Real experiences not yet confirmed. The decision is simulated.' })}</p>
      <ul className="app-lista">
        {POR_VALIDAR.map((e) => (
          <li key={e.id} className="tq-validar">
            <span><b>{t(e.titulo)}</b><small>{e.municipio}</small></span>
            {hechas[e.id] ? (
              <span className={`app-estado ${hechas[e.id] === 'ok' ? 'ok' : 'aviso'}`}>{t(hechas[e.id] === 'ok' ? si : no)}</span>
            ) : (
              <span className="tq-acciones">
                <button aria-label={t(no)} onClick={() => setHechas({ ...hechas, [e.id]: 'no' })}><Ico name="x" size={16} /></button>
                <button className="si" aria-label={t(si)} onClick={() => setHechas({ ...hechas, [e.id]: 'ok' })}><Ico name="check" size={16} /></button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

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
  const total = filas.reduce((s, [, g]) => s + g.total, 0)
  return (
    <>
      <p className="tq-nota">{t({ es: 'Municipios reales de las experiencias; importes de ejemplo.', en: 'Real towns of the experiences; example amounts.' })}</p>
      <div className="app-kpis">
        <div className="app-kpi"><b className="tnum">{eur(Math.round(total), idioma)}</b><span>{t({ es: 'Fondo acumulado', en: 'Fund raised' })} <Ej /></span></div>
        <div className="app-kpi"><b className="tnum">{filas.length}</b><span>{t({ es: 'Municipios con experiencias', en: 'Towns with experiences' })}</span></div>
      </div>
      <ul className="app-lista">
        {filas.map(([m, g]) => (
          <li key={m}>
            <button onClick={() => { guardar('municipio', m); ir('barrio') }}>
              <span><b>{m}</b><small>{t({ es: `${g.n} experiencia${g.n > 1 ? 's' : ''}`, en: `${g.n} experience${g.n > 1 ? 's' : ''}` })}</small></span>
              <b className="tnum">{eur(Math.round(g.total), idioma)}</b>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

function Turismo() {
  const t = useT()
  return (
    <>
      <BarraApp titulo="Turismo de Tenerife" accion={<SelectorIdioma />} />
      <Cuerpo>
        <Segmentos opciones={[
          { id: 'validar', texto: t({ es: `Garantía (${POR_VALIDAR.length})`, en: `Guarantee (${POR_VALIDAR.length})` }), contenido: <ColaPiedra piedra={0} /> },
          { id: 'fondo', texto: t({ es: 'Fondo local', en: 'Local fund' }), contenido: <Fondo /> },
        ]} />
        <BotonReinicio />
      </Cuerpo>
    </>
  )
}

export const PANTALLAS: Pantalla[] = [
  { id: 'inicio', render: Inicio },
  { id: 'sentir', render: Sentir },
  { id: 'lista', render: Lista },
  { id: 'experiencia', render: DetalleExperiencia },
  { id: 'reserva', render: PantallaReserva },
  { id: 'confirmacion', render: PantallaConfirmacion },
  { id: 'anfitrion', render: Anfitrion },
  { id: 'turismo', render: Turismo },
  { id: 'barrio', render: Barrio },
]
