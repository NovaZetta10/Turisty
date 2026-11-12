import { useMemo, useState } from 'react'
import { ISLAS, CANARIAS_2025, type Isla } from '../data/investigacion'
import { ISLAS_ETIQUETA, ISLAS_PATH, MAPA_VIEWBOX } from '../data/mapa-canarias'
import { Refs } from './Refs'

type Clave = 'turistas' | 'gastoDiario' | 'gastoViaje' | 'estancia' | 'repetidores' | 'reinoUnido' | 'alemania' | 'peninsula'
const METRICAS: { k: Clave; t: string; fmt: (v: number) => string }[] = [
  { k: 'turistas', t: 'Turistas', fmt: (v) => (v >= 1e6 ? `${(v / 1e6).toLocaleString('es-ES', { maximumFractionDigits: 2 })} M` : `${Math.round(v / 1000).toLocaleString('es-ES')} mil`) },
  { k: 'gastoDiario', t: 'Gasto diario', fmt: (v) => `${v.toLocaleString('es-ES', { maximumFractionDigits: 0 })} €` },
  { k: 'gastoViaje', t: 'Gasto por viaje', fmt: (v) => `${v.toLocaleString('es-ES')} €` },
  { k: 'estancia', t: 'Estancia', fmt: (v) => `${v.toLocaleString('es-ES')} noches` },
  { k: 'repetidores', t: 'Repetidores', fmt: (v) => `${v.toLocaleString('es-ES')} %` },
  { k: 'reinoUnido', t: '% Reino Unido', fmt: (v) => `${v.toLocaleString('es-ES')} %` },
  { k: 'alemania', t: '% Alemania', fmt: (v) => `${v.toLocaleString('es-ES')} %` },
  { k: 'peninsula', t: '% Península', fmt: (v) => `${v.toLocaleString('es-ES')} %` },
]

// rampa secuencial de un solo tono (ámbar nova): oscuro = poco, brillante = mucho
const RAMPA = ['#2a2f5c', '#5a2a5e', '#8c1e4a', '#c0102e', '#ff6b70'] // marino → rojo de marca: más rojo = más presión
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
function color(t: number) {
  const x = Math.max(0, Math.min(1, t)) * (RAMPA.length - 1)
  const i = Math.min(RAMPA.length - 2, Math.floor(x)), f = x - i
  const a = hex(RAMPA[i]), b = hex(RAMPA[i + 1])
  return `rgb(${a.map((v, j) => Math.round(v + (b[j] - v) * f)).join(',')})`
}

export function MapaIslas() {
  const [m, setM] = useState<Clave>('turistas')
  const [sel, setSel] = useState<string>('tenerife')
  const [tabla, setTabla] = useState(false)
  const met = METRICAS.find((x) => x.k === m)!
  const vals = ISLAS.map((i) => i[m]).filter((v): v is number => v != null)
  const [min, max] = [Math.min(...vals), Math.max(...vals)]
  const isla: Isla = ISLAS.find((i) => i.id === sel) ?? CANARIAS_2025
  const ranking = useMemo(() => [...ISLAS].filter((i) => i[m] != null).sort((a, b) => (b[m]! - a[m]!)), [m])

  return (
    <div className="mapa card">
      <div className="chips" role="radiogroup" aria-label="Indicador del mapa">
        {METRICAS.map((x) => <button key={x.k} role="radio" aria-checked={m === x.k} className={`chip ${m === x.k ? 'on' : ''}`} onClick={() => setM(x.k)}>{x.t}</button>)}
      </div>

      <div className="mapa-body">
        <div className="mapa-svg">
          <svg viewBox={MAPA_VIEWBOX} role="img" aria-label={`Mapa de Canarias coloreado por ${met.t.toLowerCase()}`}>
            <defs>
              <pattern id="sin-dato" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="6" height="6" fill="#1c2552" /><line x1="0" y1="0" x2="0" y2="6" stroke="#3a456b" strokeWidth="2" />
              </pattern>
            </defs>
            {ISLAS.map((i) => {
              const v = i[m]
              const fill = v == null ? 'url(#sin-dato)' : color((v - min) / (max - min || 1))
              return (
                <path
                  key={i.id}
                  d={ISLAS_PATH[i.id]}
                  className={`isla ${sel === i.id ? 'on' : ''}`}
                  fill={fill}
                  tabIndex={0}
                  role="button"
                  aria-label={`${i.nombre}: ${v == null ? 'sin dato' : met.fmt(v)}`}
                  onMouseEnter={() => setSel(i.id)}
                  onFocus={() => setSel(i.id)}
                  onClick={() => setSel(i.id)}
                />
              )
            })}
            {ISLAS.map((i) => {
              const [x, y] = ISLAS_ETIQUETA[i.id]
              const v = i[m]
              return (
                <text key={i.id} x={x} y={y} className={`isla-lbl ${sel === i.id ? 'on' : ''}`} textAnchor="middle">
                  <tspan x={x} dy="0">{i.nombre}</tspan>
                  <tspan x={x} dy="22" className="v">{v == null ? 'sin dato' : met.fmt(v)}</tspan>
                </text>
              )
            })}
          </svg>
          <div className="leyenda">
            <span>{met.fmt(min)}</span>
            <i style={{ background: `linear-gradient(90deg, ${RAMPA.join(',')})` }} />
            <span>{met.fmt(max)}</span>
            <span className="sd"><i />Sin dato</span>
          </div>
        </div>

        <aside className="mapa-panel" aria-live="polite">
          <div className="kicker">Isla</div>
          <h3>{isla.nombre}</h3>
          {isla.turistas == null ? (
            <p className="muted small" style={{ marginTop: 8 }}>El informe de Promotur por islas no incluye La Gomera ni El Hierro. Buscar en el ISTAC si el reto los toca.</p>
          ) : (
            <dl>
              {METRICAS.map((x) => {
                const v = isla[x.k]!, c = CANARIAS_2025[x.k]!
                return (
                  <div key={x.k} className={x.k === m ? 'on' : ''}>
                    <dt>{x.t}</dt>
                    <dd><b>{x.fmt(v)}</b><span className={v > c ? 'up' : v < c ? 'down' : ''}>{x.k === 'turistas' ? `${((v / c) * 100).toLocaleString('es-ES', { maximumFractionDigits: 0 })} % del total` : `${v > c ? '▲' : v < c ? '▼' : '='} media ${x.fmt(c)}`}</span></dd>
                  </div>
                )
              })}
            </dl>
          )}
          <p className="small muted" style={{ marginTop: 'auto', paddingTop: 12 }}>Turistas de 16 años o más, 2025 <Refs ids={[41]} /></p>
        </aside>
      </div>

      <button className="btn sm" style={{ marginTop: 14 }} onClick={() => setTabla(!tabla)}>{tabla ? 'Ocultar tabla' : 'Ver como tabla'}</button>
      {tabla && (
        <div className="table-wrap" style={{ marginTop: 10 }}>
          <table>
            <thead><tr><th>Isla</th>{METRICAS.map((x) => <th key={x.k}>{x.t}</th>)}</tr></thead>
            <tbody>
              {[...ranking, CANARIAS_2025].map((i) => <tr key={i.id}><td>{i.nombre}</td>{METRICAS.map((x) => <td key={x.k} className="tnum">{x.fmt(i[x.k]!)}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
