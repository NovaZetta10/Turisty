import { useEffect } from 'react'

/**
 * Supernovas ocasionales en el cielo: cada 8–20 s una estrella estalla (destello + onda circular).
 * Al pasar la onda, las tarjetas y tablas cercanas reciben un brillo breve en el borde (clase .sn-hit).
 * Ligero: el canvas existe solo mientras dura el efecto (~2,6 s) y las distancias se miden una vez por evento.
 * Desactivado con «reducir movimiento», con la pestaña oculta y a pantalla completa (presentación).
 */
const DURACION = 2600
const OBJETIVOS = '.card, .tilt, .hero-stat, .table-wrap, .senal, .reto, .entidad, .fuente, .acordeon, .mapa-panel, .persona-tab'
const sale = (t: number) => 1 - Math.pow(1 - t, 3)

export function Supernova() {
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer = 0
    let activo = false
    let cancelar: (() => void) | null = null

    const programar = (min = 8000, max = 20000) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(disparar, min + Math.random() * (max - min))
    }

    const disparar = () => {
      if (rm.matches || document.hidden || document.fullscreenElement || activo) return programar(4000, 8000)
      activo = true
      const w = window.innerWidth, h = window.innerHeight
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const cx = w * (.1 + Math.random() * .8)
      const cy = 90 + Math.random() * Math.max(80, h - 150)
      const R = Math.min(440, Math.max(w, h) * .42)

      const cv = document.createElement('canvas')
      cv.className = 'supernova'
      cv.setAttribute('aria-hidden', 'true')
      cv.width = w * dpr; cv.height = h * dpr
      cv.style.width = w + 'px'; cv.style.height = h + 'px'
      const ctx = cv.getContext('2d')!
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      document.body.appendChild(cv)

      // elementos dentro del radio: una sola lectura de geometría por evento
      const dianas: { el: HTMLElement; d: number; hecho: boolean }[] = []
      document.querySelectorAll<HTMLElement>(OBJETIVOS).forEach((el) => {
        if (el.closest('.stage, .slide, .print-deck')) return
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > h || r.width === 0) return
        const dx = Math.max(r.left - cx, 0, cx - r.right), dy = Math.max(r.top - cy, 0, cy - r.bottom)
        const d = Math.hypot(dx, dy)
        if (d < R * .92) dianas.push({ el, d, hecho: false })
      })

      const t0 = performance.now()
      let raf = 0
      const fin = () => {
        cancelAnimationFrame(raf)
        cv.remove()
        activo = false
        cancelar = null
      }
      cancelar = fin

      const pintar = (ahora: number) => {
        const t = ahora - t0
        if (t >= DURACION || rm.matches || document.fullscreenElement) { fin(); programar(); return }
        const p = t / DURACION
        const r = Math.max(0, R * sale(p))
        ctx.clearRect(0, 0, w, h)

        // onda expansiva: anillo azul hielo con un hilo cálido detrás
        const a = Math.pow(1 - p, 1.6)
        ctx.lineWidth = 1.6 - p
        ctx.strokeStyle = `rgba(190,212,255,${(.5 * a).toFixed(3)})`
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
        ctx.lineWidth = 1
        ctx.strokeStyle = `rgba(255,205,160,${(.28 * a).toFixed(3)})`
        ctx.beginPath(); ctx.arc(cx, cy, Math.max(0, r - 7), 0, Math.PI * 2); ctx.stroke()
        const banda = ctx.createRadialGradient(cx, cy, Math.max(0, r - 50), cx, cy, r)
        banda.addColorStop(0, 'rgba(160,190,255,0)'); banda.addColorStop(1, `rgba(160,190,255,${(.06 * a).toFixed(3)})`)
        ctx.fillStyle = banda; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill()

        // destello: núcleo que se expande y se apaga, con cuatro rayos
        if (t < 900) {
          const q = t / 900, k = sale(q), f = 1 - q
          const rad = Math.max(0, 6 + 44 * k)
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
          g.addColorStop(0, `rgba(255,255,255,${(.95 * f).toFixed(3)})`)
          g.addColorStop(.35, `rgba(255,226,190,${(.5 * f).toFixed(3)})`)
          g.addColorStop(1, 'rgba(255,200,150,0)')
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill()
          ctx.strokeStyle = `rgba(255,255,255,${(.7 * f).toFixed(3)})`
          ctx.lineWidth = 1.2
          const L = 10 + 40 * k
          ctx.beginPath()
          ctx.moveTo(cx - L, cy); ctx.lineTo(cx + L, cy); ctx.moveTo(cx, cy - L); ctx.lineTo(cx, cy + L)
          ctx.stroke()
        }

        // la onda toca los elementos: brillo breve, más intenso cuanto más cerca
        for (const x of dianas) {
          if (!x.hecho && r >= x.d) {
            x.hecho = true
            x.el.style.setProperty('--sn-k', (1 - x.d / R * .7).toFixed(2))
            x.el.classList.add('sn-hit')
            window.setTimeout(() => { x.el.classList.remove('sn-hit'); x.el.style.removeProperty('--sn-k') }, 760)
          }
        }
        raf = requestAnimationFrame(pintar)
      }
      raf = requestAnimationFrame(pintar)
    }

    programar(6000, 12000)
    return () => { window.clearTimeout(timer); cancelar?.() }
  }, [])

  return null
}
