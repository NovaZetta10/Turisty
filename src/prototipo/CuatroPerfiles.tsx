import { useEffect, useRef, useState } from 'react'
import { Movil } from './Movil'
import { PERFILES_DEMO } from './perfiles-demo'

// «Así lo ve cada perfil»: cuatro teléfonos independientes, cada uno en la portada de su perfil.
// Escritorio: los cuatro en fila. Móvil: carrusel con scroll-snap y chips para saltar a cada uno.
// «Ver recorrido»: cada teléfono avanza solo por sus pantallas clave (2,5 s) y se para al tocarlo. Sin autoplay con reduced-motion.

const PERFILES = PERFILES_DEMO

export function CuatroPerfiles() {
  const [auto, setAuto] = useState(false)
  const [reducido, setReducido] = useState(false)
  const [activo, setActivo] = useState<string>(PERFILES[0].id)
  const pista = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const f = () => setReducido(m.matches)
    f()
    m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [])

  // En el carrusel, el chip activo sigue al teléfono visible.
  useEffect(() => {
    const el = pista.current
    if (!el) return
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActivo((e.target as HTMLElement).dataset.perfil ?? '')), { root: el, threshold: 0.6 })
    el.querySelectorAll('[data-perfil]').forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [])

  const saltar = (id: string) => {
    const n = pista.current?.querySelector<HTMLElement>(`[data-perfil="${id}"]`)
    if (n && pista.current) pista.current.scrollTo({ left: n.offsetLeft - pista.current.offsetLeft, behavior: reducido ? 'auto' : 'smooth' })
  }

  return (
    <div className="proto-4">
      <div className="proto-4-barra">
        <div className="chips proto-4-chips" role="tablist" aria-label="Perfiles">
          {PERFILES.map((p) => <button key={p.id} role="tab" aria-selected={activo === p.id} className={`chip ${activo === p.id ? 'on' : ''}`} onClick={() => saltar(p.id)}>{p.nombre}</button>)}
        </div>
        {!reducido && (
          <button className="btn sm" onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
            {auto ? 'Parar recorrido' : 'Ver recorrido'}
          </button>
        )}
      </div>
      <div className="proto-4-pista" ref={pista}>
        {PERFILES.map((p) => (
          <figure key={p.id} className="proto-4-tel" data-perfil={p.id}>
            <div className="proto-4-escala"><Movil compacto pantalla={p.pantalla} datosIniciales={p.datos} recorrido={p.recorrido} auto={auto} etiqueta={`Tenique · ${p.nombre}`} /></div>
            <figcaption>{p.nombre}</figcaption>
          </figure>
        ))}
      </div>
      <p className="small muted proto-4-nota">Cada teléfono es independiente: tócalo para probarlo. {auto && 'El recorrido se para en el teléfono que toques.'}</p>
    </div>
  )
}
