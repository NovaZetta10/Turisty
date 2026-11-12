import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Ico as Icon } from './iconos'
import { useNav } from './nav'
import { IDIOMAS, useIdioma, useT } from './idioma'

// Piezas de interfaz para las pantallas del prototipo. Colores en los tokens --app-* de :root (src/styles.css).
// Más piezas: piezas-flujo.tsx (Ficha, Mapa, Reserva, Confirmacion, Panel) y estados.tsx (carga, vacío, error).

/** Barra superior. Muestra «volver» si hay pantalla anterior. `accion`: hueco a la derecha (p. ej. <SelectorIdioma />). */
/** Barra superior. El selector de idioma (ES/EN) va siempre, en todas las pantallas; `accion` se añade a su izquierda. */
export function BarraApp({ titulo, accion }: { titulo: string; accion?: ReactNode }) {
  const { atras, puedeVolver } = useNav()
  const t = useT()
  return (
    <header className="app-barra">
      <span className="app-barra-lado">{puedeVolver && <button className="app-icono" aria-label={t({ es: 'Volver', en: 'Back' })} onClick={atras}><Icon name="left" size={20} /></button>}</span>
      <h1>{titulo}</h1>
      <span className="app-barra-lado fin">{accion}<SelectorIdioma /></span>
    </header>
  )
}

/** Zona con scroll entre la barra superior y la de pestañas. */
export function Cuerpo({ children }: { children: ReactNode }) {
  return <div className="app-cuerpo">{children}</div>
}

export function TituloApp({ kicker, children }: { kicker?: string; children: ReactNode }) {
  return (
    <div className="app-titulo">
      {kicker && <span>{kicker}</span>}
      <h2>{children}</h2>
    </div>
  )
}

export function BotonApp({ children, ir: destino, onClick, variante = 'principal', desactivado = false }: { children: ReactNode; ir?: string; onClick?: () => void; variante?: 'principal' | 'secundario'; desactivado?: boolean }) {
  const { ir } = useNav()
  return <button className={`app-boton ${variante}`} disabled={desactivado} onClick={() => { onClick?.(); if (destino) ir(destino) }}>{children}</button>
}

/** «Empezar de nuevo»: vuelve a la primera pantalla y borra lo elegido. */
export function BotonReinicio() {
  const { reiniciar } = useNav()
  const t = useT()
  return <button className="app-boton secundario" onClick={reiniciar}><Icon name="restart" size={16} /> {t({ es: 'Empezar de nuevo', en: 'Start again' })}</button>
}

export type ItemLista = { titulo: string; sub?: string; ir?: string; extra?: ReactNode }

export function ListaApp({ items }: { items: ItemLista[] }) {
  const { ir } = useNav()
  return (
    <ul className="app-lista">
      {items.map((it) => (
        <li key={it.titulo}>
          <button disabled={!it.ir} onClick={() => it.ir && ir(it.ir)}>
            <span><b>{it.titulo}</b>{it.sub && <small>{it.sub}</small>}</span>
            {it.extra ?? (it.ir && <Icon name="right" size={18} />)}
          </button>
        </li>
      ))}
    </ul>
  )
}

export function TarjetaApp({ titulo, children, imagen, ir: destino }: { titulo: string; children?: ReactNode; imagen?: string; ir?: string }) {
  const { ir } = useNav()
  const dentro = (
    <>
      {imagen && <img src={imagen} alt="" />}
      <div><b>{titulo}</b>{children && <p>{children}</p>}</div>
    </>
  )
  return destino ? <button className="app-tarjeta" onClick={() => ir(destino)}>{dentro}</button> : <div className="app-tarjeta">{dentro}</div>
}

export function CampoApp({ etiqueta, tipo = 'text', placeholder, valor, onCambio }: { etiqueta: string; tipo?: string; placeholder?: string; valor?: string; onCambio?: (v: string) => void }) {
  return (
    <label className="app-campo">
      <span>{etiqueta}</span>
      <input type={tipo} placeholder={placeholder} value={valor} onChange={onCambio ? (e) => onCambio(e.target.value) : undefined} />
    </label>
  )
}

export function ChipsApp({ opciones, activa, onCambio }: { opciones: string[]; activa?: string; onCambio?: (o: string) => void }) {
  const caja = useRef<HTMLDivElement>(null)
  useEffect(() => { // la opción activa siempre a la vista (si la fila se desplaza en horizontal)
    const c = caja.current, b = c?.querySelector<HTMLElement>('.on')
    if (c && b) c.scrollLeft = b.offsetLeft - c.offsetLeft - (c.clientWidth - b.offsetWidth) / 2
  }, [activa])
  return (
    <div className="app-chips" role="group" ref={caja}>
      {opciones.map((o) => <button key={o} className={o === activa ? 'on' : ''} aria-pressed={o === activa} onClick={() => onCambio?.(o)}>{o}</button>)}
    </div>
  )
}

/** Selector de idioma compacto (ES/EN) para el hueco `accion` de la barra superior. */
export function SelectorIdioma() {
  const { idioma, setIdioma } = useIdioma()
  const siguiente = IDIOMAS[(IDIOMAS.indexOf(idioma) + 1) % IDIOMAS.length]
  return (
    <button className="app-idioma" onClick={() => setIdioma(siguiente)} aria-label={idioma === 'es' ? 'Switch to English' : 'Cambiar a español'}>
      {idioma.toUpperCase()}
    </button>
  )
}

export type Perfil = { id: string; titulo: string; sub?: string; icono: string; ir: string }

/** Pantalla inicial con varios perfiles (usuario, empresa, gestor…). Guarda el elegido en useDemo().datos.perfil. */
export function SelectorPerfil({ perfiles, onElegir }: { perfiles: Perfil[]; onElegir?: (id: string) => void }) {
  const { ir } = useNav()
  return (
    <div className="app-perfiles">
      {perfiles.map((p) => (
        <button key={p.id} className="app-perfil" onClick={() => { onElegir?.(p.id); ir(p.ir) }}>
          <span className="app-perfil-ico"><Icon name={p.icono} size={22} /></span>
          <span><b>{p.titulo}</b>{p.sub && <small>{p.sub}</small>}</span>
          <Icon name="right" size={18} />
        </button>
      ))}
    </div>
  )
}

/** Contador +/− (personas, unidades…). */
export function ContadorApp({ etiqueta, valor, min = 1, max = 10, onCambio }: { etiqueta: string; valor: number; min?: number; max?: number; onCambio: (n: number) => void }) {
  return (
    <div className="app-contador">
      <span>{etiqueta}</span>
      <div>
        <button aria-label="−" disabled={valor <= min} onClick={() => onCambio(valor - 1)}>−</button>
        <b className="tnum" aria-live="polite">{valor}</b>
        <button aria-label="+" disabled={valor >= max} onClick={() => onCambio(valor + 1)}>+</button>
      </div>
    </div>
  )
}

/** Pestañas internas de una pantalla (no navegan: cambian lo que se ve). */
export function Segmentos({ opciones, inicial }: { opciones: { id: string; texto: string; contenido: ReactNode }[]; inicial?: string }) {
  const [sel, setSel] = useState(inicial ?? opciones[0]?.id)
  const actual = opciones.find((o) => o.id === sel) ?? opciones[0]
  return (
    <>
      <div className="app-segmentos" role="tablist">
        {opciones.map((o) => <button key={o.id} role="tab" aria-selected={o.id === sel} className={o.id === sel ? 'on' : ''} onClick={() => setSel(o.id)}>{o.texto}</button>)}
      </div>
      <div key={actual?.id} className="app-seg-panel">{actual?.contenido}</div>
    </>
  )
}

export type Pestana = { id: string; texto: string; icono: string }

/** Barra de pestañas inferior. `id` es el de la pantalla a la que lleva. */
export function TabBar({ pestanas }: { pestanas: Pestana[] }) {
  const { actual, ir } = useNav()
  return (
    <nav className="app-tabbar">
      {pestanas.map((p) => (
        <button key={p.id} className={p.id === actual ? 'on' : ''} aria-current={p.id === actual ? 'page' : undefined} onClick={() => ir(p.id, true)}>
          <Icon name={p.icono} size={20} />
          <span>{p.texto}</span>
        </button>
      ))}
    </nav>
  )
}
