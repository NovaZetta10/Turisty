import { Icon } from './Icon'

// Las tres piedras del fogón (tenique). Uso:
//   <Piedra tipo="vecinos" size={72} />             → una piedra con su icono
//   <Fogon />                                        → las tres piedras alrededor de la llama
// Colores con tokens de marca; el icono va en blanco (contraste ≥ 4,5:1 sobre las tres).

export type TipoPiedra = 'vecinos' | 'visitantes' | 'instituciones'

const PIEDRAS: Record<TipoPiedra, { icono: string; nombre: string; forma: string }> = {
  // Tres siluetas distintas, redondeadas e irregulares, como piedras de verdad.
  vecinos: { icono: 'vecinos', nombre: 'Vecinos', forma: 'M14 38C8 26 18 9 36 7c17-2 30 8 31 23 1 16-9 29-27 31C24 63 18 51 14 38z' },
  visitantes: { icono: 'maleta', nombre: 'Visitantes y sector turístico', forma: 'M9 33C9 17 24 6 41 9c15 3 25 15 22 30-3 14-16 23-32 21C17 58 9 47 9 33z' },
  instituciones: { icono: 'institucion', nombre: 'Instituciones', forma: 'M12 30C14 15 29 6 44 10c13 4 21 17 18 31-2 13-15 21-30 19C18 58 10 44 12 30z' },
}

export function Piedra({ tipo, size = 64, titulo }: { tipo: TipoPiedra; size?: number; titulo?: string }) {
  const p = PIEDRAS[tipo]
  return (
    <span className={`piedra piedra-${tipo}`} style={{ width: size, height: size }} role="img" aria-label={titulo ?? `Piedra: ${p.nombre}`}>
      <svg viewBox="0 0 72 70" aria-hidden="true">
        <defs>
          <radialGradient id={`pg-${tipo}`} cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="var(--piedra-luz)" />
            <stop offset="1" stopColor="var(--piedra-sombra)" />
          </radialGradient>
        </defs>
        <path d={p.forma} fill={`url(#pg-${tipo})`} />
        {/* brillo y poros: textura volcánica sutil */}
        <path d={p.forma} fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="1.5" />
        <circle cx="24" cy="44" r="1.3" fill="rgba(0,0,0,.18)" /><circle cx="50" cy="48" r="1" fill="rgba(0,0,0,.18)" /><circle cx="44" cy="20" r="1.1" fill="rgba(255,255,255,.18)" />
      </svg>
      <span className="piedra-ic"><Icon name={p.icono} size={Math.round(size * 0.4)} /></span>
    </span>
  )
}

/** Las tres piedras alrededor de la llama: el fogón que sostiene a Tenique. */
export function Fogon({ size = 72, leyenda = true }: { size?: number; leyenda?: boolean }) {
  return (
    <figure className="fogon" style={{ ['--fs' as string]: `${size}px` }} aria-label="Tres piedras alrededor del fuego: vecinos, visitantes y sector turístico, e instituciones">
      <div className="fogon-llama" aria-hidden="true"><Icon name="llama" size={Math.round(size * 0.85)} fill /></div>
      <div className="fogon-p fogon-p1"><Piedra tipo="vecinos" size={size} />{leyenda && <span>Vecinos</span>}</div>
      <div className="fogon-p fogon-p2"><Piedra tipo="visitantes" size={size} />{leyenda && <span>Visitantes y sector</span>}</div>
      <div className="fogon-p fogon-p3"><Piedra tipo="instituciones" size={size} />{leyenda && <span>Instituciones</span>}</div>
    </figure>
  )
}
