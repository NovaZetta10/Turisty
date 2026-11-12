import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ESTADO_TXT, type Estado } from '../config/proyecto'
import { Icon } from './Icon'
import { Refs, Verificado } from './Refs'

// Tarjetas y rejillas reutilizables. Uso:
//   <Rejilla cols={3}>
//     <Tarjeta kicker="01" titulo="…" icono="star" fuentes={[2]}>Texto</Tarjeta>
//     <Cifra valor="18,4 M" etiqueta="Turistas" detalle="+3,5 %" fuentes={[1]} />
//   </Rejilla>

const TAG: Record<Estado, string> = { listo: 'ok', 'en-curso': 'warn', pendiente: 'off' }

export function EstadoTag({ estado }: { estado: Estado }) {
  return <span className={`tag ${TAG[estado]}`}><span className="dot" />{ESTADO_TXT[estado]}</span>
}

export function Rejilla({ cols = 3, children }: { cols?: 2 | 3 | 4; children: ReactNode }) {
  return <div className={`grid g${cols} rejilla`}>{children}</div>
}

export function Tarjeta({
  kicker, titulo, icono, estado, fuentes = [], href, children,
}: {
  kicker?: string
  titulo: string
  icono?: string
  estado?: Estado
  fuentes?: number[]
  /** Ruta interna ('/prototipo') o URL externa. La tarjeta entera se vuelve enlace. */
  href?: string
  children?: ReactNode
}) {
  const cuerpo = (
    <>
      {(kicker || icono || estado) && (
        <div className="tj-top">
          <span className="kicker">{icono && <Icon name={icono} size={14} />}{kicker}</span>
          {estado && <EstadoTag estado={estado} />}
        </div>
      )}
      <h3>{titulo}<Refs ids={fuentes} /></h3>
      {children && <div className="tj-txt">{children}</div>}
      {href && <span className="tj-go">Abrir <Icon name={href.startsWith('http') ? 'external' : 'arrow'} size={14} /></span>}
    </>
  )
  if (!href) return <div className="card tarjeta">{cuerpo}</div>
  if (href.startsWith('http')) return <a className="card tarjeta link-card" href={href} target="_blank" rel="noreferrer">{cuerpo}</a>
  return <Link className="card tarjeta link-card" to={href}>{cuerpo}</Link>
}

/** Una cifra grande con fuente. Sin fuente verificada no debe ir a la presentación. */
export function Cifra({ valor, etiqueta, detalle, fuentes = [], verificado = true }: { valor: string; etiqueta: string; detalle?: string; fuentes?: number[]; verificado?: boolean }) {
  return (
    <div className="card stat">
      <div className="l">{etiqueta}</div>
      <div className="v">{valor}</div>
      {detalle && <div className="d">{detalle}</div>}
      <div className="foot"><span><Refs ids={fuentes} /></span>{!verificado && <Verificado ok={false} />}</div>
    </div>
  )
}
