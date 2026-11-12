import { useState, type CSSProperties, type ReactNode } from 'react'
import { useDemo, useNav } from './nav'
import { useIdioma, useT } from './idioma'
import { Ico } from './iconos'
import { TabBar, type Pestana } from './piezas'
import { EMOCIONES, anfitrion, donde, ejemplo, emocion, emocionPortada, iconoDe, iniciales, type Emocion, type Experiencia } from './experiencias'

// Piezas visuales propias de Tenique: portadas ilustradas por emoción, tarjeta de experiencia, las tres piedras
// con la llama, aviso único de «valores de ejemplo» y barra inferior por perfil.
// Nada de fotos con derechos: las portadas son degradado + textura canaria en CSS (picón, calado, ondas) + icono.

/* ───────── formato ───────── */

/** Números: de-DE para español porque separa los miles también con 4 cifras (1.958 €). */
export const fmt = (idioma: string) => (idioma === 'es' ? 'de-DE' : 'en-GB')
export const eur = (n: number, idioma: string) => n.toLocaleString(fmt(idioma), { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €'
export const nota = (n: number, idioma: string) => n.toLocaleString(fmt(idioma), { minimumFractionDigits: 1, maximumFractionDigits: 1 })

/** Variable CSS --i para escalonar la entrada de listas. */
export const escalon = (i: number) => ({ '--i': i } as CSSProperties)

/* ───────── marcas de «ejemplo» ───────── */

/** Marca pequeña de valor de demostración (úsala poco: mejor un AvisoEjemplo por pantalla). */
export function Ej() {
  const t = useT()
  return <span className="tq-ej">{t({ es: 'ejemplo', en: 'example' })}</span>
}

/** Un único aviso por pantalla: las experiencias son reales; precios, valoraciones e importes, de ejemplo. */
export function AvisoEjemplo({ texto }: { texto?: string }) {
  const t = useT()
  return (
    <p className="tq-aviso-ej">
      <span className="tq-ej">{t({ es: 'Valores de ejemplo', en: 'Example values' })}</span>
      {texto ?? t({ es: 'Experiencias reales. Precios, valoraciones e importes del fondo: simulación.', en: 'Real experiences. Prices, ratings and fund amounts: simulated.' })}
    </p>
  )
}

/* ───────── portadas ───────── */

export const estiloEmo = (e: Emocion) => ({ '--c1': e.color[0], '--c2': e.color[1] } as CSSProperties)

/** Portada ilustrada: degradado de la emoción, textura canaria e icono grande. */
export function Portada({ emo, icono, grande = false, className = '', children }: { emo: Emocion; icono?: string; grande?: boolean; className?: string; children?: ReactNode }) {
  return (
    <div className={`tq-portada tx-${emo.textura} ${grande ? 'grande' : ''} ${className}`} style={estiloEmo(emo)}>
      <span className="tq-portada-ico" aria-hidden="true"><Ico name={icono ?? emo.icono} size={grande ? 64 : 44} /></span>
      {children}
    </div>
  )
}

export function Avatar({ texto, emo }: { texto: string; emo?: Emocion }) {
  return <span className="tq-avatar" style={emo ? estiloEmo(emo) : undefined} aria-hidden="true">{iniciales(texto)}</span>
}

export function ChipsEmo({ ids }: { ids: string[] }) {
  const t = useT()
  return (
    <span className="tq-chips-emo">
      {ids.map((id) => emocion(id)).filter((e): e is Emocion => !!e).map((e) => <span key={e.id} style={estiloEmo(e)}>{t(e)}</span>)}
    </span>
  )
}

/* ───────── las tres piedras ───────── */

export const PIEDRAS = [
  { id: 'garantia', icono: 'sello', titulo: { es: 'Garantía Turismo de Tenerife', en: 'Tenerife Tourism guarantee' }, sub: { es: 'Cumple las condiciones del destino: legalidad, seguro de responsabilidad civil, accesibilidad y respeto al entorno. Antes de publicar.', en: 'Meets the destination’s conditions: legal compliance, public liability insurance, accessibility and respect for the environment. Before publishing.' } },
  { id: 'aval', icono: 'users', titulo: { es: 'Avalada por el barrio', en: 'Backed by the neighbourhood' }, sub: { es: 'Los vecinos o su asociación la avalan y lo renuevan. Si retiran el aval, sale.', en: 'Neighbours or their association back it and renew it. If they withdraw, it goes.' } },
  { id: 'valorada', icono: 'star', titulo: { es: 'Valorada por quien la vivió', en: 'Rated by those who lived it' }, sub: { es: 'Puntúan todas las personas que asistieron, vecinos y visitantes.', en: 'Everyone who attended rates it, locals and visitors.' } },
]

/** Símbolo de Turismo de Tenerife (logotipo oficial, con su permiso) para la insignia de la garantía. */
export function SelloTT() {
  return <span className="tq-sello-tt"><img src={import.meta.env.BASE_URL + 'img/marca/simbolo-color.png'} alt="Turismo de Tenerife" /></span>
}

/** Insignia compacta para tarjetas: «3 piedras ✓». */
export function Piedras3() {
  const t = useT()
  return (
    <span className="tq-3p" title={PIEDRAS.map((p) => t(p.titulo)).join(' · ')}>
      <span className="tq-3p-dots" aria-hidden="true"><i /><i /><i /></span>
      {t({ es: '3 piedras', en: '3 stones' })}
      <Ico name="check" size={13} />
    </span>
  )
}

const Llama = () => (
  <svg viewBox="0 0 24 32" width="30" height="40" aria-hidden="true">
    <path className="tq-llama-f1" d="M12 1c2 5 8 8.5 8 16a8 8 0 0 1-16 0c0-4 2-6.5 4-8.5 0 3.5 1.5 5.5 3.5 5.5C11.5 9.5 10 6 12 1z" />
    <path className="tq-llama-f2" d="M12 13c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 1.5.8 2.5 2 2.5 0-2.5-1-3.8 0-6.5z" />
  </svg>
)

/** Las tres piedras como momento visual: se colocan una a una y prenden la llama. */
export function PiedrasFuego({ e }: { e: Experiencia }) {
  const t = useT()
  const { idioma } = useIdioma()
  const v = ejemplo(e)
  return (
    <section className="tq-fuego" aria-label={t({ es: 'Las tres piedras', en: 'The three stones' })}>
      <div className="tq-fuego-esc" aria-hidden="true">
        <span className="tq-llama"><Llama /></span>
        {[0, 1, 2].map((i) => <i key={i} className={`tq-pi p${i}`} style={escalon(i)} />)}
      </div>
      <div className="tq-fuego-txt">
        <span className="tq-fuego-t">{t({ es: 'Se sostiene sobre tres piedras', en: 'It stands on three stones' })}</span>
        {PIEDRAS.map((p, i) => (
          <div key={p.id} className="tq-fuego-fila" style={escalon(i)}>
            {p.id === 'garantia' ? <SelloTT /> : <Ico name={p.icono} size={15} />}
            <span><b>{t(p.titulo)}</b>{p.id === 'valorada' && <small className="tnum"> · ★ {nota(v.valoracion, idioma)} ({v.opiniones})</small>}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ───────── guardar con corazón ───────── */

export function Corazon({ id }: { id: string }) {
  const t = useT()
  const { datos, guardar } = useDemo()
  const lista = (datos.guardados as string[] | undefined) ?? []
  const on = lista.includes(id)
  const [late, setLate] = useState(0)
  return (
    <button
      key={late}
      className={`tq-corazon ${on ? 'on' : ''} ${late ? 'late' : ''}`}
      aria-pressed={on}
      aria-label={on ? t({ es: 'Quitar de guardadas', en: 'Remove from saved' }) : t({ es: 'Guardar', en: 'Save' })}
      onClick={(ev) => { ev.stopPropagation(); guardar('guardados', on ? lista.filter((x) => x !== id) : [...lista, id]); setLate((n) => n + 1) }}
    >
      <Ico name="heart" size={18} fill={on} />
    </button>
  )
}

/* ───────── tarjeta de experiencia ───────── */

export function TarjetaExp({ e, i = 0, onAbrir, evitar }: { e: Experiencia; i?: number; onAbrir: () => void; evitar?: unknown }) {
  const t = useT()
  const { idioma } = useIdioma()
  const emo = emocionPortada(e, evitar)
  const v = ejemplo(e)
  const quien = anfitrion(e)
  return (
    <article className="tq-card" style={escalon(i)}>
      <button className="tq-card-btn" onClick={onAbrir}>
        <Portada emo={emo} icono={iconoDe(e)}>
          {e.mixta && <span className="tq-pildora">{t({ es: 'Vecinos y visitantes juntos', en: 'Locals and visitors together' })}</span>}
          {e.fiesta && <span className="tq-pildora abajo">{t({ es: 'Gratis · con un vecino', en: 'Free · with a local' })}</span>}
        </Portada>
        <span className="tq-card-cuerpo">
          <b className="tq-card-t">{t(e.titulo)}</b>
          {quien && <span className="tq-ofrece"><Avatar texto={quien} emo={emo} /><span>{t({ es: 'Lo ofrece', en: 'Hosted by' })}: <b>{quien}</b></span></span>}
          <span className="tq-card-meta"><Ico name="pin" size={13} />{donde(e)}{e.cuando && idioma === 'es' && <> · {e.cuando}</>}</span>
          <ChipsEmo ids={e.emociones} />
          <span className="tq-card-pie">
            <Piedras3 />
            <span className="tq-nota-num tnum"><i aria-hidden="true">★</i> {nota(v.valoracion, idioma)}</span>
          </span>
        </span>
      </button>
      <Corazon id={e.id} />
    </article>
  )
}

/* ───────── barra inferior por perfil ───────── */

const PESTANAS: Record<string, { id: string; es: string; en: string; icono: string }[]> = {
  vecino: [
    { id: 'sentir', es: 'Explorar', en: 'Explore', icono: 'search' },
    { id: 'planes', es: 'Mis planes', en: 'My plans', icono: 'calendar' },
    { id: 'barrio', es: 'Mi barrio', en: 'My area', icono: 'home' },
    { id: 'inicio', es: 'Perfil', en: 'Profile', icono: 'user' },
  ],
  turista: [
    { id: 'sentir', es: 'Explorar', en: 'Explore', icono: 'search' },
    { id: 'planes', es: 'Mis planes', en: 'My plans', icono: 'calendar' },
    { id: 'estancia', es: 'Tu estancia', en: 'Your stay', icono: 'euro' },
    { id: 'inicio', es: 'Perfil', en: 'Profile', icono: 'user' },
  ],
  anfitrion: [
    { id: 'anfitrion', es: 'Mi panel', en: 'My panel', icono: 'chart' },
    { id: 'barrio', es: 'Mi barrio', en: 'My area', icono: 'home' },
    { id: 'inicio', es: 'Perfil', en: 'Profile', icono: 'user' },
  ],
  turismo: [
    { id: 'turismo', es: 'Panel', en: 'Panel', icono: 'chart' },
    { id: 'barrio', es: 'Municipios', en: 'Towns', icono: 'map' },
    { id: 'inicio', es: 'Perfil', en: 'Profile', icono: 'user' },
  ],
}

export function BarraPerfil() {
  const t = useT()
  const { datos } = useDemo()
  const p = PESTANAS[String(datos.perfil)] ?? PESTANAS.turista
  const pestanas: Pestana[] = p.map((x) => ({ id: x.id, texto: t(x), icono: x.icono }))
  return <TabBar pestanas={pestanas} />
}

/** Botón «volver a explorar» para estados vacíos. */
export function IrExplorar() {
  const t = useT()
  const { ir } = useNav()
  return <button className="app-boton principal" onClick={() => ir('sentir', true)}>{t({ es: 'Explorar experiencias', en: 'Explore experiences' })}</button>
}

export { EMOCIONES }
