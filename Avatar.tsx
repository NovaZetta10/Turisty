import { useState } from 'react'
import type { Miembro } from '../config/proyecto'

export const iniciales = (n: string) => n.split(/\s+/).filter((w) => w && !/^(y|de|del|la|el)$/i.test(w)).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

/** Foto propia, o la de GitHub, o iniciales si ninguna carga. */
export function Avatar({ m, className = 'avatar' }: { m: Miembro; className?: string }) {
  const src = m.foto || (m.github ? `https://github.com/${m.github}.png?size=160` : '')
  const [ok, setOk] = useState(true)
  return (
    <div className={className}>
      {iniciales(m.nombre)}
      {src && ok && <img src={src} alt="" loading="lazy" onError={() => setOk(false)} />}
    </div>
  )
}
