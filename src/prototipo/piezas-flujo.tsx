import { useMemo, useState, type ReactNode } from 'react'
import { Qr } from '../components/Qr'
import { ISLAS_PATH, MAPA_VIEWBOX } from '../data/mapa-canarias'
import { Ico } from './iconos'
import { useDemo, useNav } from './nav'
import { useT } from './idioma'
import { ChipsApp, ContadorApp } from './piezas'

// Piezas de flujo típicas de turismo: ficha → mapa → reserva → confirmación con QR, y panel de gestión.

/* ───────── Ficha ───────── */

/** Ficha de un sitio, servicio o actividad. Sin imagen, muestra un bloque de color con icono (nada de fotos de stock). */
export function Ficha({ titulo, etiqueta, imagen, icono = 'pin', meta = [], children, pie }: {
  titulo: string
  etiqueta?: string
  imagen?: string
  icono?: string
  meta?: { icono: string; texto: string }[]
  children?: ReactNode
  pie?: ReactNode
}) {
  return (
    <article className="app-ficha">
      <div className="app-ficha-img">{imagen ? <img src={imagen} alt="" /> : <Ico name={icono} size={34} />}</div>
      <div className="app-ficha-txt">
        {etiqueta && <span className="app-etiqueta">{etiqueta}</span>}
        <h2>{titulo}</h2>
        {meta.length > 0 && <ul className="app-meta">{meta.map((m) => <li key={m.texto}><Ico name={m.icono} size={15} />{m.texto}</li>)}</ul>}
        {children && <div className="app-texto">{children}</div>}
        {pie}
      </div>
    </article>
  )
}

/* ───────── Mapa ───────── */

const [, , VB_W, VB_H] = MAPA_VIEWBOX.split(' ').map(Number)

/** Centro aproximado de una isla (id de ISLAS_PATH: 'tenerife', 'gran-canaria', 'la-palma'…), en coordenadas del mapa. */
function centroIsla(id: string): [number, number] {
  const n = (ISLAS_PATH[id] ?? '').match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []
  if (n.length < 2) return [VB_W / 2, VB_H / 2]
  const xs = n.filter((_, i) => i % 2 === 0), ys = n.filter((_, i) => i % 2 === 1)
  return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2]
}

export type PuntoMapa = {
  id: string
  texto: string
  /** Coloca el punto en el centro de una isla… */
  isla?: string
  /** …o en coordenadas exactas del mapa (0–870 × 0–420). dx/dy desplazan desde el centro de la isla. */
  x?: number
  y?: number
  dx?: number
  dy?: number
  /** Pantalla a la que lleva al tocar la etiqueta. */
  ir?: string
}

/** Mapa de Canarias sin conexión (siluetas de Natural Earth) con puntos tocables. */
export function Mapa({ puntos, islasActivas }: { puntos: PuntoMapa[]; islasActivas?: string[] }) {
  const { ir } = useNav()
  const [sel, setSel] = useState<string | null>(null)
  const pos = useMemo(() => puntos.map((p) => {
    const [cx, cy] = p.isla ? centroIsla(p.isla) : [p.x ?? VB_W / 2, p.y ?? VB_H / 2]
    return { ...p, px: ((cx + (p.dx ?? 0)) / VB_W) * 100, py: ((cy + (p.dy ?? 0)) / VB_H) * 100 }
  }), [puntos])
  const elegido = pos.find((p) => p.id === sel)
  return (
    <div className="app-mapa">
      <div className="app-mapa-lienzo">
      <svg viewBox={MAPA_VIEWBOX} aria-hidden="true">
        {Object.entries(ISLAS_PATH).map(([id, d]) => <path key={id} d={d} className={!islasActivas || islasActivas.includes(id) ? 'on' : ''} />)}
      </svg>
      {pos.map((p, i) => (
        <button key={p.id} className={`app-pin ${p.id === sel ? 'sel' : ''}`} style={{ left: `${p.px}%`, top: `${p.py}%`, animationDelay: `${i * 50}ms` }} aria-label={p.texto} onClick={() => setSel(p.id === sel ? null : p.id)}>
          <Ico name="pin" size={22} />
        </button>
      ))}
      </div>
      {elegido && (
        <button className="app-pin-info" disabled={!elegido.ir} onClick={() => elegido.ir && ir(elegido.ir)}>
          <b>{elegido.texto}</b>{elegido.ir && <Ico name="right" size={16} />}
        </button>
      )}
    </div>
  )
}

/* ───────── Reserva ───────── */

export type DatosReserva = { fecha: string; personas: number; franja: string; codigo: string; total?: number }

/**
 * Formulario de reserva: fecha, personas y franja. Guarda la reserva en useDemo().datos[clave] y va a `destino`.
 * `precio` (por persona) solo si es un dato real con fuente o un ejemplo marcado como tal.
 */
export function Reserva({ franjas, destino, precio, maxPersonas = 8, clave = 'reserva' }: { franjas: string[]; destino: string; precio?: number; maxPersonas?: number; clave?: string }) {
  const t = useT()
  const { ir } = useNav()
  const { guardar } = useDemo()
  const hoy = new Date().toISOString().slice(0, 10)
  const [fecha, setFecha] = useState(hoy)
  const [personas, setPersonas] = useState(2)
  const [franja, setFranja] = useState<string>()
  const total = precio != null ? precio * personas : undefined
  const reservar = () => {
    if (!franja) return
    const codigo = `TQ-${fecha.replace(/-/g, '').slice(2)}-${String(Math.floor(Math.random() * 9000) + 1000)}`
    guardar(clave, { fecha, personas, franja, codigo, total } satisfies DatosReserva)
    ir(destino)
  }
  return (
    <div className="app-reserva">
      <label className="app-campo">
        <span>{t({ es: 'Fecha', en: 'Date' })}</span>
        <input type="date" value={fecha} min={hoy} onChange={(e) => setFecha(e.target.value || hoy)} />
      </label>
      <ContadorApp etiqueta={t({ es: 'Personas', en: 'People' })} valor={personas} max={maxPersonas} onCambio={setPersonas} />
      <div className="app-campo"><span>{t({ es: 'Hora', en: 'Time' })}</span><ChipsApp opciones={franjas} activa={franja} onCambio={setFranja} /></div>
      {total != null && <div className="app-total"><span>{t({ es: 'Total', en: 'Total' })}</span><b className="tnum">{total.toLocaleString(t({ es: 'es-ES', en: 'en-GB' }))} €</b></div>}
      <button className="app-boton principal" disabled={!franja} onClick={reservar}>
        {franja ? t({ es: 'Reservar', en: 'Book' }) : t({ es: 'Elige una hora', en: 'Choose a time' })}
      </button>
    </div>
  )
}

/* ───────── Confirmación con QR ───────── */

/** Confirmación con QR (p. ej. entrada o reserva). Lee la reserva de useDemo().datos[clave] si no se pasan líneas. */
export function Confirmacion({ titulo, lineas, codigo, clave = 'reserva', children }: { titulo?: string; lineas?: [string, string][]; codigo?: string; clave?: string; children?: ReactNode }) {
  const t = useT()
  const r = useDemo().datos[clave] as DatosReserva | undefined
  const filas: [string, string][] = lineas ?? (r ? [
    [t({ es: 'Fecha', en: 'Date' }), new Date(r.fecha + 'T12:00').toLocaleDateString(t({ es: 'es-ES', en: 'en-GB' }), { weekday: 'short', day: 'numeric', month: 'short' })],
    [t({ es: 'Hora', en: 'Time' }), r.franja],
    [t({ es: 'Personas', en: 'People' }), String(r.personas)],
  ] : [])
  const cod = codigo ?? r?.codigo
  return (
    <div className="app-confirma">
      <span className="app-ok"><Ico name="check" size={26} /></span>
      <h2>{titulo ?? t({ es: 'Reserva confirmada', en: 'Booking confirmed' })}</h2>
      {cod ? (
        <>
          <Qr url={cod} className="app-qr" />
          <code className="app-codigo">{cod}</code>
        </>
      ) : <p className="app-texto">{t({ es: 'No hay ninguna reserva.', en: 'There is no booking.' })}</p>}
      {filas.length > 0 && <dl className="app-resumen">{filas.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
      {children}
    </div>
  )
}

/* ───────── Panel de gestión ───────── */

export type EstadoFila = 'ok' | 'aviso' | 'error' | 'pendiente'
const ESTADO_TXT: Record<EstadoFila, { es: string; en: string }> = {
  ok: { es: 'Correcto', en: 'OK' },
  aviso: { es: 'Revisar', en: 'Check' },
  error: { es: 'Incidencia', en: 'Issue' },
  pendiente: { es: 'Pendiente', en: 'Pending' },
}

/** Panel para el perfil gestor/empresa: indicadores arriba y lista con estado. Valores: reales con fuente o de ejemplo marcados. */
export function Panel({ indicadores, filas, tituloLista }: {
  indicadores: { valor: string; etiqueta: string; tendencia?: 'sube' | 'baja' }[]
  filas: { titulo: string; sub?: string; estado: EstadoFila }[]
  tituloLista?: string
}) {
  const t = useT()
  return (
    <div className="app-panel">
      <div className="app-kpis">
        {indicadores.map((k) => (
          <div key={k.etiqueta} className="app-kpi">
            <b className="tnum">{k.valor}{k.tendencia && <i className={k.tendencia}>{k.tendencia === 'sube' ? '↑' : '↓'}</i>}</b>
            <span>{k.etiqueta}</span>
          </div>
        ))}
      </div>
      {tituloLista && <h3 className="app-subt">{tituloLista}</h3>}
      <ul className="app-lista">
        {filas.map((f) => (
          <li key={f.titulo}>
            <div className="app-fila">
              <span><b>{f.titulo}</b>{f.sub && <small>{f.sub}</small>}</span>
              <span className={`app-estado ${f.estado}`}>{t(ESTADO_TXT[f.estado])}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
