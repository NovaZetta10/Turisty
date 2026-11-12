import type { ReactNode } from 'react'
import { Refs, Verificado } from './Refs'

// Tabla con columnas tipadas. En el móvil se desplaza en horizontal dentro de su marco. Uso:
//   type Fila = { isla: string; turistas: number }
//   <Tabla<Fila> titulo="…" fuentes={[1]} filas={filas}
//     columnas={[{ clave: 'isla', titulo: 'Isla' }, { clave: 'turistas', titulo: 'Turistas', num: true, render: (f) => `${f.turistas} M` }]} />

export type Columna<T> = {
  clave: keyof T & string
  titulo: string
  /** Alinea a la derecha con cifras tabulares. */
  num?: boolean
  render?: (fila: T) => ReactNode
}

export function Tabla<T extends Record<string, unknown>>({
  columnas, filas, titulo, nota, fuentes = [], verificado = true, minAncho = 520,
}: {
  columnas: Columna<T>[]
  filas: T[]
  titulo?: string
  nota?: string
  fuentes?: number[]
  verificado?: boolean
  /** Ancho mínimo en px antes de desplazar en horizontal. */
  minAncho?: number
}) {
  return (
    <figure className="tabla">
      {titulo && <figcaption className="graf-t">{titulo}<Refs ids={fuentes} /></figcaption>}
      <div className="table-wrap">
        <table style={{ minWidth: minAncho }}>
          <thead>
            <tr>{columnas.map((c) => <th key={c.clave} className={c.num ? 'num' : undefined}>{c.titulo}</th>)}</tr>
          </thead>
          <tbody>
            {filas.map((f, i) => (
              <tr key={i}>
                {columnas.map((c) => <td key={c.clave} className={c.num ? 'num tnum' : undefined}>{c.render ? c.render(f) : String(f[c.clave] ?? '')}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(nota || !verificado) && (
        <div className="graf-pie">
          {nota && <span className="small muted">{nota}</span>}
          {!verificado && <Verificado ok={false} />}
        </div>
      )}
    </figure>
  )
}
