import type { ReactNode } from 'react'
import { Refs, Verificado } from './Refs'

// Gráficos en SVG/HTML sin dependencias. Uso:
//   <Barras titulo="…" datos={[{ etiqueta: 'Tenerife', valor: 7.1, texto: '7,1 M' }]} fuentes={[1]} />
//   <Linea titulo="…" datos={[{ etiqueta: '2023', valor: 16.2 }, …]} unidad=" M" fuentes={[1]} verificado={false} />
// Todo dato lleva fuente. Sin fuente comprobada → verificado={false} (se muestra «Por verificar»).

export type Punto = { etiqueta: string; valor: number; texto?: string; destacado?: boolean }

type Base = {
  titulo?: string
  nota?: string
  datos: Punto[]
  unidad?: string
  fuentes?: number[]
  verificado?: boolean
}

const fmt = (p: Punto, unidad = '') => p.texto ?? `${p.valor.toLocaleString('es-ES')}${unidad}`

function Marco({ titulo, nota, fuentes = [], verificado = true, children }: Omit<Base, 'datos'> & { children: ReactNode }) {
  return (
    <figure className="graf card">
      {titulo && <figcaption className="graf-t">{titulo}<Refs ids={fuentes} /></figcaption>}
      {children}
      {(nota || !verificado) && (
        <div className="graf-pie">
          {nota && <span className="small muted">{nota}</span>}
          {!verificado && <Verificado ok={false} />}
        </div>
      )}
    </figure>
  )
}

/** Barras horizontales: comparar categorías. Ordena tú los datos antes de pasarlos. */
export function Barras({ datos, unidad, max, ...rest }: Base & { max?: number }) {
  const tope = (max ?? Math.max(...datos.map((d) => d.valor), 0)) || 1
  return (
    <Marco {...rest}>
      <div className="gb">
        {datos.map((d, i) => (
          <div key={d.etiqueta} className={`gb-fila ${d.destacado ? 'on' : ''}`}>
            <span className="gb-nombre">{d.etiqueta}</span>
            <span className="gb-pista">
              <span className="gb-barra" style={{ transform: `scaleX(${Math.max(0, d.valor) / tope})`, animationDelay: `${i * 40}ms` }} />
            </span>
            <span className="gb-valor tnum">{fmt(d, unidad)}</span>
          </div>
        ))}
      </div>
    </Marco>
  )
}

/** Línea simple: evolución en el tiempo. Las etiquetas del eje X son las de cada punto. */
export function Linea({ datos, unidad, min, ...rest }: Base & { min?: number }) {
  const n = datos.length
  const vals = datos.map((d) => d.valor)
  const lo = min ?? Math.min(...vals)
  const hi = Math.max(...vals)
  const rango = hi - lo || 1
  const x = (i: number) => ((i + 0.5) / n) * 100 // centrado con la etiqueta del eje
  const y = (v: number) => 88 - ((v - lo) / rango) * 70 // % desde arriba, deja sitio a las etiquetas
  const pts = datos.map((d, i) => `${x(i)},${y(d.valor)}`).join(' ')
  return (
    <Marco {...rest}>
      <div className="gl">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={pts} fill="none" stroke="var(--nova)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        {datos.map((d, i) => (
          <span key={d.etiqueta} className={`gl-punto ${d.destacado || i === n - 1 ? 'on' : ''}`} style={{ left: `${x(i)}%`, top: `${y(d.valor)}%` }}>
            <i className="tnum">{fmt(d, unidad)}</i>
          </span>
        ))}
      </div>
      <div className="gl-eje" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {datos.map((d) => <span key={d.etiqueta}>{d.etiqueta}</span>)}
      </div>
      <span className="sr-only">{datos.map((d) => `${d.etiqueta}: ${fmt(d, unidad)}`).join('; ')}</span>
    </Marco>
  )
}
