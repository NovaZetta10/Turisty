import { useState } from 'react'
import { ISLAS_PATH } from '../data/mapa-canarias'

// Copia adaptada de src/prototipo/mapa-tenerife.tsx (CASCO, proyección y silueta), sin tocar el original.
// Posiciones aproximadas del casco de cada municipio (latitud, longitud): solo sirven para dibujar el punto.
const CASCO: Record<string, [number, number]> = {
  Adeje: [28.122, -16.726], Arafo: [28.34, -16.418], Arico: [28.18, -16.5], Arona: [28.099, -16.681],
  'Buenavista del Norte': [28.374, -16.861], Candelaria: [28.354, -16.372], 'El Rosario': [28.44, -16.37],
  'El Sauzal': [28.478, -16.433], 'El Tanque': [28.366, -16.785], Fasnia: [28.236, -16.437], Garachico: [28.373, -16.764],
  'Granadilla de Abona': [28.119, -16.576], 'Guía de Isora': [28.211, -16.779], Güímar: [28.316, -16.411],
  'Icod de los Vinos': [28.367, -16.711], 'La Guancha': [28.373, -16.652], 'La Matanza de Acentejo': [28.452, -16.447],
  'La Orotava': [28.391, -16.523], 'La Victoria de Acentejo': [28.432, -16.465], 'Los Realejos': [28.384, -16.583],
  'Los Silos': [28.367, -16.816], 'Puerto de la Cruz': [28.414, -16.549], 'San Cristóbal de La Laguna': [28.488, -16.316],
  'San Juan de la Rambla': [28.393, -16.65], 'San Miguel de Abona': [28.097, -16.616], 'Santa Cruz de Tenerife': [28.468, -16.255],
  'Santa Úrsula': [28.425, -16.489], 'Santiago del Teide': [28.297, -16.815], Tacoronte: [28.477, -16.41],
  Tegueste: [28.518, -16.338], 'Vilaflor de Chasna': [28.157, -16.636],
}
const ALIAS: Record<string, string> = { 'La Laguna': 'San Cristóbal de La Laguna', 'Santa Cruz': 'Santa Cruz de Tenerife', Vilaflor: 'Vilaflor de Chasna', Granadilla: 'Granadilla de Abona' }
export const cascoDe = (m: string) => CASCO[m] ?? CASCO[ALIAS[m] ?? '']

const PATH = ISLAS_PATH.tenerife ?? ''
const nums = PATH.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []
const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1)
const X0 = Math.min(...xs), X1 = Math.max(...xs), Y0 = Math.min(...ys), Y1 = Math.max(...ys)
const LON0 = -16.921, LON1 = -16.12, LAT0 = 28.59, LAT1 = 27.995
const proyectar = ([lat, lon]: [number, number]): [number, number] => [X0 + ((lon - LON0) / (LON1 - LON0)) * (X1 - X0), Y0 + ((lat - LAT0) / (LAT1 - LAT0)) * (Y1 - Y0)]
const M = 6
const VIEWBOX = `${X0 - M} ${Y0 - M} ${X1 - X0 + 2 * M} ${Y1 - Y0 + 2 * M}`
const U = (X1 - X0 + 2 * M) / 100 // 1 u = 1 % del ancho del mapa

export type PuntoMapa = {
  muni: string
  valor: number
  /** Texto dentro del círculo (corto). */
  etiqueta: string
  /** Texto alternativo del botón. */
  aria: string
  /** Anillo rojo de cuello de botella (0–100) en lugar de círculo de valor. */
  saturado?: number
  /** Insignia «proyecto pagado». */
  insignia?: boolean
  /** Cambia cuando entra un suceso nuevo: reinicia el destello. */
  ping?: number
}

export function MapaGestion({ puntos, color, activo, onElegir, descripcion }: { puntos: PuntoMapa[]; color: string; activo?: string; onElegir: (m: string | undefined) => void; descripcion: string }) {
  const [sobre, setSobre] = useState<string | undefined>()
  if (!PATH) return null
  const max = Math.max(1, ...puntos.filter((p) => p.saturado === undefined).map((p) => p.valor))
  const orden = puntos.filter((p) => cascoDe(p.muni)).slice().sort((a, b) => a.valor - b.valor)
  const top = new Set(puntos.filter((p) => p.saturado === undefined).sort((a, b) => b.valor - a.valor).slice(0, 4).filter((p) => p.valor > 0).map((p) => p.muni))
  const corto = (m: string) => m.replace('San Cristóbal de La Laguna', 'La Laguna').replace('Santa Cruz de Tenerife', 'Santa Cruz').replace(' de Abona', '').replace('Icod de los Vinos', 'Icod').replace(' de Chasna', '').replace('Buenavista del Norte', 'Buenavista')
  return (
    <svg className="gs-mapa" viewBox={VIEWBOX} role="group" aria-label={descripcion}>
      <path d={PATH} className="gs-isla" />
      {orden.map((p) => {
        const [x, y] = proyectar(cascoDe(p.muni)!)
        const on = p.muni === activo
        const k = p.valor / max
        const sat = p.saturado !== undefined
        const r = sat ? U * 2.5 : U * (p.valor > 0 ? 1.2 + 2.6 * Math.sqrt(k) : 0.8)
        const nombre = on || sobre === p.muni || top.has(p.muni) || sat
        return (
          <g key={p.muni} className={`gs-punto ${on ? 'on' : ''}`} role="button" tabIndex={0} aria-pressed={on} aria-label={p.aria}
            onClick={() => onElegir(on ? undefined : p.muni)}
            onMouseEnter={() => setSobre(p.muni)} onMouseLeave={() => setSobre(undefined)} onFocus={() => setSobre(p.muni)} onBlur={() => setSobre(undefined)}
            onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onElegir(on ? undefined : p.muni) } }}>
            <circle cx={x} cy={y} r={Math.max(r + U, U * 2.2)} className="gs-hit" />
            {p.ping !== undefined && !sat && <circle key={p.ping} cx={x} cy={y} r={r} className="gs-ping" style={{ stroke: color }} />}
            {sat ? (
              <circle cx={x} cy={y} r={r} className={`gs-c gs-sat ${p.saturado! >= 85 ? 'alta' : ''}`} style={{ strokeWidth: U * 0.55 }} />
            ) : (
              <circle cx={x} cy={y} r={r} className="gs-c" style={{ fill: p.valor > 0 ? `color-mix(in srgb, ${color} ${Math.round(30 + 70 * k)}%, var(--night-2))` : 'var(--night-3)', strokeWidth: on ? U * 0.5 : U * 0.25 }} />
            )}
            {(p.valor > 0 || sat) && r >= U * 1.7 && <text x={x} y={y} className="gs-n" style={{ fontSize: U * 1.55, strokeWidth: U * 0.45 }}>{p.etiqueta}</text>}
            {p.insignia && <circle cx={x + r * 0.8} cy={y - r * 0.8} r={U * 0.95} className="gs-insignia" />}
            {nombre && <text x={x} y={y + r + U * 1.9} className="gs-nombre" style={{ fontSize: U * 1.7, strokeWidth: U * 0.5 }}>{corto(p.muni)}</text>}
          </g>
        )
      })}
    </svg>
  )
}
