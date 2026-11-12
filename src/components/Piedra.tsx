import { useId } from 'react'
import { Icon } from './Icon'

// Las tres piedras del fogón (tenique). Uso:
//   <Piedra tipo="vecinos" size={72} />             → una piedra con su icono
//   <Fogon />                                        → las tres piedras alrededor de la llama
// Las tres piedras (decisión de Esther, 12-11-2026, encargo del pitch): Vecinos · Visitantes · Sector turístico.
// Turismo de Tenerife no es una cuarta piedra: enciende el fogón (garantiza y coordina).
// Colores con tokens de marca; el icono va en blanco (contraste ≥ 4,5:1 sobre las tres).

export type TipoPiedra = 'vecinos' | 'visitantes' | 'sector'
/** Nombres antiguos, aceptados mientras se actualizan los datos. */
type TipoAntiguo = 'turismo' | 'sectores' | 'instituciones'
const ALIAS: Record<TipoAntiguo, TipoPiedra> = { turismo: 'sector', sectores: 'sector', instituciones: 'sector' }

export const NOMBRE_PIEDRA: Record<TipoPiedra, string> = { vecinos: 'Vecinos', visitantes: 'Visitantes', sector: 'Sector turístico' }

const PIEDRAS: Record<TipoPiedra, { icono: string; forma: string }> = {
  // Tres siluetas distintas, redondeadas e irregulares, como piedras de verdad.
  vecinos: { icono: 'vecinos', forma: 'M14 38C8 26 18 9 36 7c17-2 30 8 31 23 1 16-9 29-27 31C24 63 18 51 14 38z' },
  visitantes: { icono: 'maleta', forma: 'M9 33C9 17 24 6 41 9c15 3 25 15 22 30-3 14-16 23-32 21C17 58 9 47 9 33z' },
  sector: { icono: 'tienda', forma: 'M12 30C14 15 29 6 44 10c13 4 21 17 18 31-2 13-15 21-30 19C18 58 10 44 12 30z' },
}

export function Piedra({ tipo: t, size = 64, titulo }: { tipo: TipoPiedra | TipoAntiguo; size?: number; titulo?: string }) {
  const tipo: TipoPiedra = t in ALIAS ? ALIAS[t as TipoAntiguo] : (t as TipoPiedra)
  const p = PIEDRAS[tipo]
  return (
    <span className={`piedra piedra-${tipo}`} style={{ width: size, height: size }} role="img" aria-label={titulo ?? `Piedra: ${NOMBRE_PIEDRA[tipo]}`}>
      <svg viewBox="0 0 72 70" aria-hidden="true">
        <defs>
          <radialGradient id={`pg-${tipo}`} cx="35%" cy="28%" r="80%">
            <stop offset="0" stopColor="var(--piedra-luz)" />
            <stop offset="1" stopColor="var(--piedra-sombra)" />
          </radialGradient>
          <linearGradient id={`pb-${tipo}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset=".45" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".42" />
          </linearGradient>
        </defs>
        <path d={p.forma} fill={`url(#pg-${tipo})`} />
        {/* volumen: sombra en la base, faceta de luz arriba a la izquierda y roce de borde */}
        <path d={p.forma} fill={`url(#pb-${tipo})`} />
        <path d="M20 22C24 14 33 10 41 11" fill="none" stroke="rgba(255,255,255,.34)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M17 36c-1-4 0-7 2-10" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M30 56c9 3 20 1 27-8" fill="none" stroke="rgba(0,0,0,.22)" strokeWidth="2" strokeLinecap="round" />
        <path d={p.forma} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1" />
        {/* poros: textura volcánica */}
        <circle cx="24" cy="44" r="1.4" fill="rgba(0,0,0,.24)" /><circle cx="50" cy="48" r="1.1" fill="rgba(0,0,0,.24)" /><circle cx="46" cy="22" r="1.2" fill="rgba(0,0,0,.2)" /><circle cx="56" cy="34" r=".9" fill="rgba(0,0,0,.2)" /><circle cx="33" cy="52" r=".9" fill="rgba(0,0,0,.2)" />
      </svg>
      <span className="piedra-ic"><Icon name={p.icono} size={Math.round(size * 0.4)} /></span>
    </span>
  )
}

/**
 * El fogón: un caldero de hierro apoyado en tres piedras volcánicas con el fuego vivo debajo.
 * Perspectiva: dos piedras atrás (visitantes, sector turístico), una delante (vecinos); el caldero entre ambas capas.
 * La escena (fuego + caldero + vapor) es un único SVG de 340×220 (1 unidad = size/100) que se intercala entre las piedras.
 * El fuego es Turismo de Tenerife. `fuego` añade debajo la leyenda de quién enciende el fogón (no cambia el tamaño del resto).
 */
export function Fogon({ size = 72, leyenda = true, fuego = false }: { size?: number; leyenda?: boolean; fuego?: boolean }) {
  const uid = useId().replace(/:/g, '')
  const g = (n: string) => `fg-${n}-${uid}`
  return (
    <figure className={`fogon ${leyenda ? 'con-leyenda' : ''}`} style={{ ['--fs' as string]: `${size}px` }} aria-label="Un caldero sostenido por tres piedras: vecinos, visitantes y sector turístico. Turismo de Tenerife enciende el fogón.">
      <div className="fogon-p fogon-p2"><Piedra tipo="visitantes" size={size} />{leyenda && <span>Visitantes</span>}</div>
      <div className="fogon-p fogon-p3"><Piedra tipo="sector" size={size} />{leyenda && <span>Sector turístico</span>}</div>
      <svg className="fogon-caldero" viewBox="0 0 340 220" aria-hidden="true">
        <defs>
          <radialGradient id={g('brillo')} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ff9a2e" stopOpacity=".55" /><stop offset=".55" stopColor="#ff6a1a" stopOpacity=".18" /><stop offset="1" stopColor="#ff6a1a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={g('f1')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff7a1a" /><stop offset="1" stopColor="#c8240f" /></linearGradient>
          <linearGradient id={g('f2')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffb52e" /><stop offset="1" stopColor="#ff6a1a" /></linearGradient>
          <linearGradient id={g('f3')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff2a8" /><stop offset="1" stopColor="#ffc933" /></linearGradient>
          <linearGradient id={g('hierro')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#10131e" /><stop offset=".3" stopColor="#3b4358" /><stop offset=".62" stopColor="#1a1e2c" /><stop offset="1" stopColor="#0b0d15" />
          </linearGradient>
          <radialGradient id={g('luzfuego')} cx="50%" cy="100%" r="60%">
            <stop offset="0" stopColor="#ff8a2a" stopOpacity=".6" /><stop offset="1" stopColor="#ff8a2a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={g('borde')} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4a5370" /><stop offset=".35" stopColor="#8a93b0" /><stop offset="1" stopColor="#2b3147" /></linearGradient>
        </defs>

        {/* resplandor y lecho de brasas */}
        <ellipse cx="170" cy="138" rx="104" ry="52" fill={`url(#${g('brillo')})`} />
        <ellipse cx="170" cy="150" rx="52" ry="8" fill="#e8420f" opacity=".75" />
        {/* fuego: tres capas que oscilan a distinto ritmo */}
        <g transform="translate(170 154) scale(1.35 1.22) translate(-170 -154)">
        <g className="fl fl-a"><path d="M126 152C116 130 138 122 142 102c8 10 12 4 14-12 8 10 12 2 14-18 6 18 12 24 16 16 4 12 10 20 14 16 4 14 24 24 14 48z" fill={`url(#${g('f1')})`} /></g>
        <g className="fl fl-b"><path d="M142 152c-6-16 8-24 12-38 6 8 10 2 14-14 6 14 12 20 16 12 6 14 20 22 14 40z" fill={`url(#${g('f2')})`} /></g>
        <g className="fl fl-c"><path d="M156 152c-4-10 6-18 10-28 4 8 10 12 12 6 6 10 10 16 6 22z" fill={`url(#${g('f3')})`} /></g>
        <circle className="brasa b1" cx="136" cy="148" r="2.2" fill="#ffb02e" /><circle className="brasa b2" cx="206" cy="146" r="1.8" fill="#ff9a2e" /><circle className="brasa b3" cx="188" cy="138" r="1.5" fill="#ffd27a" />
        </g>

        {/* caldero de hierro */}
        <g className="caldero" transform="translate(170 60) scale(1.18) translate(-170 -60)">
          <path d="M101 16C97 30 99 54 124 76c16 14 76 14 92 0 25-22 27-46 23-60z" fill={`url(#${g('hierro')})`} />
          <path d="M101 16C97 30 99 54 124 76c16 14 76 14 92 0 25-22 27-46 23-60z" fill={`url(#${g('luzfuego')})`} />
          {/* asas laterales y asa de arco */}
          <path d="M103 22c-14-2-18 6-16 12 2 7 10 8 17 4" fill="none" stroke="#2a3046" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M237 22c14-2 18 6 16 12-2 7-10 8-17 4" fill="none" stroke="#2a3046" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M104 18C100-14 240-14 236 18" fill="none" stroke="#596280" strokeWidth="3" strokeLinecap="round" />
          {/* brillo del hierro */}
          <path d="M113 32c-3 14 2 28 14 40" fill="none" stroke="rgba(255,255,255,.34)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M121 28c-1 6 0 11 2 16" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2" strokeLinecap="round" />
          <path d="M214 70c9-8 15-18 18-30" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="2" strokeLinecap="round" />
          {/* borde y boca */}
          <ellipse cx="170" cy="16" rx="70" ry="9" fill={`url(#${g('borde')})`} />
          <ellipse cx="170" cy="16.5" rx="61" ry="6" fill="#06080f" />
          <ellipse cx="170" cy="15" rx="61" ry="6" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1" />
        </g>
        {/* vapor */}
        <g className="fogon-vapor" fill="none" strokeLinecap="round">
          <path className="v1" d="M148 2q-8-9 0-18t0-18" /><path className="v2" d="M172 0q-8-10 0-20t0-20" /><path className="v3" d="M194 2q-8-9 0-18t0-18" />
        </g>
      </svg>
      <div className="fogon-p fogon-p1"><Piedra tipo="vecinos" size={size} />{leyenda && <span>Vecinos</span>}</div>
      {fuego && <figcaption className="fogon-fuego"><Icon name="llama" size={14} fill /> Turismo de Tenerife enciende el fogón</figcaption>}
    </figure>
  )
}
