import { useEffect } from 'react'

/**
 * Pausa las animaciones infinitas de lo que no se ve (llama del fogón, escenas, estrella del título…):
 * marca con la clase `fuera` los elementos que salen de pantalla y el CSS detiene sus animaciones (styles.css).
 * (Con la pestaña oculta el navegador ya detiene las animaciones CSS.)
 */
const SELECTOR = '.fogon, .esc, .hero-word, .slide, .s-movil, [data-anima]'

export function PausaFueraDePantalla() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((es) => {
      for (const e of es) e.target.classList.toggle('fuera', !e.isIntersecting)
    }, { rootMargin: '80px' })
    const vistos = new WeakSet<Element>()
    const mirar = (raiz: ParentNode) => {
      raiz.querySelectorAll(SELECTOR).forEach((el) => { if (!vistos.has(el)) { vistos.add(el); io.observe(el) } })
    }
    mirar(document)
    let pendiente = 0
    const mo = new MutationObserver(() => {
      if (pendiente) return
      pendiente = window.setTimeout(() => { pendiente = 0; mirar(document) }, 120)
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect(); window.clearTimeout(pendiente) }
  }, [])
  return null
}
