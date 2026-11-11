import { useEffect, useRef } from 'react'

/**
 * Cielo estrellado de fondo. Las estrellas titilan y, al mover el ratón,
 * las cercanas se unen en constelaciones que se desvanecen poco a poco.
 * Con «reducir movimiento» se dibuja un cielo estático.
 */
type Estrella = { x: number; y: number; r: number; fase: number; vel: number; tono: string }

const RADIO = 130      // px alrededor del ratón en que se forman constelaciones
const ENLACE = 95      // distancia máxima entre dos estrellas unidas
const VIDA = 2.2       // segundos que tarda en desvanecerse una línea

export function Cielo() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, dpr = 1
    let estrellas: Estrella[] = []
    const lineas = new Map<string, number>() // "a-b" → vida 0..1
    const brillo = new Map<number, number>()  // estrella → brillo extra 0..1
    let raton: { x: number; y: number } | null = null
    let raf = 0, t0 = performance.now()

    const crear = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = window.innerWidth; h = window.innerHeight
      cv.width = w * dpr; cv.height = h * dpr
      cv.style.width = w + 'px'; cv.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round((w * h) / 5200)
      estrellas = Array.from({ length: n }, () => {
        const g = Math.random()
        return {
          x: Math.random() * w, y: Math.random() * h,
          r: g > .97 ? 1.6 : g > .85 ? 1.1 : .6 + Math.random() * .4,
          fase: Math.random() * Math.PI * 2, vel: .25 + Math.random() * .6,
          tono: g > .93 ? '255,238,210' : g > .85 ? '214,224,255' : '255,255,255',
        }
      })
      lineas.clear(); brillo.clear()
    }

    const vecinas = () => {
      if (!raton) return
      const cerca: number[] = []
      estrellas.forEach((e, i) => { if (Math.hypot(e.x - raton!.x, e.y - raton!.y) < RADIO) cerca.push(i) })
      for (const i of cerca) {
        brillo.set(i, 1)
        // cada estrella cercana se une a sus dos vecinas más próximas
        const d = cerca.filter((j) => j !== i)
          .map((j) => [j, Math.hypot(estrellas[i].x - estrellas[j].x, estrellas[i].y - estrellas[j].y)] as const)
          .filter(([, dist]) => dist < ENLACE).sort((a, b) => a[1] - b[1]).slice(0, 1)
        for (const [j] of d) lineas.set(i < j ? `${i}-${j}` : `${j}-${i}`, 1)
      }
    }

    const pintar = (t: number) => {
      const dt = Math.min(.05, (t - t0) / 1000); t0 = t
      ctx.clearRect(0, 0, w, h)
      vecinas()
      // líneas de constelación
      ctx.lineWidth = .6
      for (const [k, v] of lineas) {
        const [a, b] = k.split('-').map(Number), A = estrellas[a], B = estrellas[b]
        if (!A || !B) { lineas.delete(k); continue }
        ctx.strokeStyle = `rgba(220,228,255,${(v * .16).toFixed(3)})`
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke()
        const nv = v - dt / VIDA
        if (nv <= 0) lineas.delete(k); else lineas.set(k, nv)
      }
      // estrellas
      const s = t / 1000
      for (let i = 0; i < estrellas.length; i++) {
        const e = estrellas[i]
        const tw = quieto ? .7 : .62 + .18 * Math.sin(s * e.vel + e.fase)
        const b = brillo.get(i) ?? 0
        const a = Math.min(1, tw * .75 + b * .25)
        if (b > 0) {
          const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, 4 + e.r * 3)
          g.addColorStop(0, `rgba(230,236,255,${(b * .12).toFixed(3)})`); g.addColorStop(1, 'rgba(230,236,255,0)')
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(e.x, e.y, 4 + e.r * 3, 0, Math.PI * 2); ctx.fill()
          const nb = b - dt / VIDA
          if (nb <= 0) brillo.delete(i); else brillo.set(i, nb)
        }
        ctx.fillStyle = `rgba(${e.tono},${a.toFixed(3)})`
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r + b * .25, 0, Math.PI * 2); ctx.fill()
      }
      if (!quieto) raf = requestAnimationFrame(pintar)
    }

    const mover = (ev: PointerEvent) => { if (ev.pointerType === 'mouse' || ev.pointerType === 'pen') raton = { x: ev.clientX, y: ev.clientY } }
    const salir = () => { raton = null }
    const visib = () => { cancelAnimationFrame(raf); if (!document.hidden && !quieto) { t0 = performance.now(); raf = requestAnimationFrame(pintar) } }
    let to = 0
    const redim = () => { clearTimeout(to); to = window.setTimeout(() => { crear(); if (quieto) pintar(performance.now()) }, 150) }

    crear()
    if (quieto) pintar(performance.now()); else raf = requestAnimationFrame(pintar)
    window.addEventListener('pointermove', mover, { passive: true })
    document.addEventListener('pointerleave', salir)
    window.addEventListener('blur', salir)
    window.addEventListener('resize', redim)
    document.addEventListener('visibilitychange', visib)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', mover)
      document.removeEventListener('pointerleave', salir)
      window.removeEventListener('blur', salir)
      window.removeEventListener('resize', redim)
      document.removeEventListener('visibilitychange', visib)
    }
  }, [])

  return <canvas ref={ref} className="cielo" aria-hidden="true" />
}
