import { useState } from 'react'
import { ISLAS, CANARIAS_2025 } from '../data/investigacion'
import { Refs } from './Refs'

// categórico validado sobre la superficie oscura (ver skill de dataviz); «Otros» en gris neutro
const SERIES = [
  { k: 'reinoUnido', t: 'Reino Unido', c: '#3987e5' },
  { k: 'alemania', t: 'Alemania', c: '#d95926' },
  { k: 'peninsula', t: 'Península', c: '#199e70' },
  { k: 'otros', t: 'Otros', c: '#3a4262' },
] as const

const filas = [CANARIAS_2025, ...ISLAS.filter((i) => i.turistas != null).sort((a, b) => b.turistas! - a.turistas!)]

export function Mercados() {
  const [tip, setTip] = useState<{ x: number; y: number; t: string } | null>(null)
  return (
    <div className="card mercados" onMouseLeave={() => setTip(null)}>
      <div className="leyenda-cat">
        {SERIES.map((s) => <span key={s.k}><i style={{ background: s.c }} />{s.t}</span>)}
      </div>
      <div className="barras">
        {filas.map((f) => {
          const otros = Math.max(0, 100 - (f.reinoUnido! + f.alemania! + f.peninsula!))
          const v: Record<string, number> = { reinoUnido: f.reinoUnido!, alemania: f.alemania!, peninsula: f.peninsula!, otros }
          return (
            <div key={f.id} className={`barra-fila ${f.id === 'canarias' ? 'total' : ''}`}>
              <span className="barra-nombre">{f.nombre}</span>
              <div className="barra">
                {SERIES.map((s) => (
                  <span
                    key={s.k}
                    className="seg"
                    style={{ width: `${v[s.k]}%`, background: s.c }}
                    onMouseMove={(e) => {
                      const r = (e.currentTarget.closest('.mercados') as HTMLElement).getBoundingClientRect()
                      setTip({ x: e.clientX - r.left, y: e.clientY - r.top, t: `${f.nombre} · ${s.t}: ${v[s.k].toLocaleString('es-ES', { maximumFractionDigits: 1 })} %` })
                    }}
                  >
                    {v[s.k] >= 9 && <em>{Math.round(v[s.k])}</em>}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {tip && <div className="tip" style={{ left: tip.x, top: tip.y }}>{tip.t}</div>}
      <p className="small muted" style={{ marginTop: 12 }}>% de turistas por país de residencia, 2025. «Otros» agrupa el resto de mercados <Refs ids={[41]} /></p>
    </div>
  )
}
