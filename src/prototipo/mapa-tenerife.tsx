import { ISLAS_PATH } from '../data/mapa-canarias'
import { useT } from './idioma'

// Mapa de calor de Tenerife: cuántas experiencias hay en cada municipio (más experiencias, color más intenso).
// Silueta: ISLAS_PATH.tenerife (Natural Earth, dominio público), sola, sin el resto del archipiélago.
// Posición de cada municipio: coordenadas aproximadas de su casco (latitud, longitud). Solo sirven para dibujar
// el punto y ordenar por cercanía; no son un dato que se presente.

/** Casco de cada municipio de Tenerife: [latitud, longitud], aproximadas. */
const CASCO: Record<string, [number, number]> = {
  Adeje: [28.122, -16.726],
  Arafo: [28.34, -16.418],
  Arico: [28.18, -16.5],
  Arona: [28.099, -16.681],
  'Buenavista del Norte': [28.374, -16.861],
  Candelaria: [28.354, -16.372],
  'El Rosario': [28.44, -16.37],
  'El Sauzal': [28.478, -16.433],
  'El Tanque': [28.366, -16.785],
  Fasnia: [28.236, -16.437],
  Garachico: [28.373, -16.764],
  'Granadilla de Abona': [28.119, -16.576],
  'Guía de Isora': [28.211, -16.779],
  Güímar: [28.316, -16.411],
  'Icod de los Vinos': [28.367, -16.711],
  'La Guancha': [28.373, -16.652],
  'La Matanza de Acentejo': [28.452, -16.447],
  'La Orotava': [28.391, -16.523],
  'La Victoria de Acentejo': [28.432, -16.465],
  'Los Realejos': [28.384, -16.583],
  'Los Silos': [28.367, -16.816],
  'Puerto de la Cruz': [28.414, -16.549],
  'San Cristóbal de La Laguna': [28.488, -16.316],
  'San Juan de la Rambla': [28.393, -16.65],
  'San Miguel de Abona': [28.097, -16.616],
  'Santa Cruz de Tenerife': [28.468, -16.255],
  'Santa Úrsula': [28.425, -16.489],
  'Santiago del Teide': [28.297, -16.815],
  Tacoronte: [28.477, -16.41],
  Tegueste: [28.518, -16.338],
  'Vilaflor de Chasna': [28.157, -16.636],
}
/** Otros nombres con los que puede venir un municipio. */
const ALIAS: Record<string, string> = { 'La Laguna': 'San Cristóbal de La Laguna', 'Santa Cruz': 'Santa Cruz de Tenerife', Vilaflor: 'Vilaflor de Chasna', Granadilla: 'Granadilla de Abona' }
const casco = (m: string) => CASCO[m] ?? CASCO[ALIAS[m] ?? '']

// La silueta va en proyección equirectangular: se ajusta con los extremos reales de la isla
// (Punta de Teno al oeste, Punta de Anaga al este y al norte, Punta Rasca al sur) a su caja en el dibujo.
const PATH = ISLAS_PATH.tenerife ?? ''
const nums = PATH.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []
const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1)
const X0 = Math.min(...xs), X1 = Math.max(...xs), Y0 = Math.min(...ys), Y1 = Math.max(...ys)
const LON0 = -16.921, LON1 = -16.12, LAT0 = 28.59, LAT1 = 27.995
const proyectar = ([lat, lon]: [number, number]): [number, number] => [X0 + ((lon - LON0) / (LON1 - LON0)) * (X1 - X0), Y0 + ((lat - LAT0) / (LAT1 - LAT0)) * (Y1 - Y0)]
const M = 6
const VIEWBOX = `${X0 - M} ${Y0 - M} ${X1 - X0 + 2 * M} ${Y1 - Y0 + 2 * M}`

/** Distancia aproximada en km entre los cascos de dos municipios (Infinity si falta alguno). */
export function distanciaKm(a: string, b: string) {
  const p = casco(a), q = casco(b)
  if (!p || !q) return Infinity
  const dy = (p[0] - q[0]) * 111, dx = (p[1] - q[1]) * 111 * Math.cos((p[0] * Math.PI) / 180)
  return Math.hypot(dx, dy)
}

/** Mapa de calor. `cuentas`: experiencias por municipio. Al tocar un municipio, `onElegir` (otra vez = quitar). */
export function MapaCalor({ cuentas, activo, onElegir }: { cuentas: Record<string, number>; activo?: string; onElegir: (m: string | undefined) => void }) {
  const t = useT()
  const puntos = Object.entries(cuentas).filter(([m, n]) => n > 0 && casco(m)).sort((a, b) => a[1] - b[1])
  const max = Math.max(1, ...puntos.map(([, n]) => n))
  const total = puntos.reduce((s, [, n]) => s + n, 0)
  if (!PATH || puntos.length === 0) return null
  const resumen = puntos.slice().reverse().map(([m, n]) => `${m}: ${n}`).join(', ')
  return (
    <figure className="tq-mapa">
      <svg viewBox={VIEWBOX} role="group" aria-label={t({ es: `Mapa de Tenerife con ${total} experiencias por municipio. ${resumen}.`, en: `Map of Tenerife with ${total} experiences by town. ${resumen}.` })}>
        <path d={PATH} className="tq-mapa-isla" />
        {puntos.map(([m, n]) => {
          const [x, y] = proyectar(casco(m)!)
          const k = n / max
          const on = m === activo
          return (
            <g
              key={m}
              className={`tq-mapa-punto ${on ? 'on' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={t({ es: `${m}: ${n} experiencia${n === 1 ? '' : 's'}`, en: `${m}: ${n} experience${n === 1 ? '' : 's'}` })}
              onClick={() => onElegir(on ? undefined : m)}
              onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onElegir(on ? undefined : m) } }}
            >
              <circle cx={x} cy={y} r={10} className="tq-mapa-hit" />
              <circle cx={x} cy={y} r={3.2 + 3.6 * Math.sqrt(k)} style={{ fill: `color-mix(in srgb, var(--app-highlight) ${Math.round(25 + 75 * k)}%, var(--app-surface))` }} className="tq-mapa-c" />
              <text x={x} y={y} className={`tq-mapa-n ${k > 0.45 ? 'claro' : ''}`}>{n}</text>
            </g>
          )
        })}
      </svg>
      <figcaption className="tq-mapa-ley">
        <span>{t({ es: 'Menos', en: 'Fewer' })}</span>
        <i aria-hidden="true" />
        <span>{t({ es: 'Más experiencias', en: 'More experiences' })}</span>
      </figcaption>
      <p className="tq-mapa-ayuda">{activo ? t({ es: `Viendo ${activo}. Toca su punto en el mapa para ver toda la isla.`, en: `Showing ${activo}. Tap its dot on the map to see the whole island.` }) : t({ es: 'Toca un municipio para ver sus experiencias.', en: 'Tap a town to see its experiences.' })}</p>
    </figure>
  )
}
