import { useRef, type ReactNode } from 'react'

/** Tarjeta que se levanta y se inclina hacia el ratón, con un brillo que lo sigue. */
export function Tilt({ children, className = '', max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const el = useRef<HTMLElement>(null)
  const mover = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.current!.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    el.current!.style.setProperty('--rx', `${((0.5 - y) * max).toFixed(2)}deg`)
    el.current!.style.setProperty('--ry', `${((x - 0.5) * max).toFixed(2)}deg`)
    el.current!.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.current!.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
  }
  const salir = () => { ['--rx', '--ry'].forEach((p) => el.current!.style.setProperty(p, '0deg')) }
  return (
    <article ref={el as React.RefObject<HTMLElement>} className={`tilt ${className}`} onPointerMove={mover} onPointerLeave={salir}>
      <span className="tilt-glow" aria-hidden="true" />
      {children}
    </article>
  )
}
