// Captura pantallas reales de la app (perfil vecino → Tacoronte → Sabor → Mercadillo → tres piedras → qué deja aquí).
// Uso: node scripts/teaser/capturar-app.mjs http://localhost:5175
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lanzar, espera } from './cdp.mjs'

const BASE = process.argv[2] || 'http://localhost:5175'
const OUT = join(dirname(fileURLToPath(import.meta.url)), 'capturas')
mkdirSync(OUT, { recursive: true })
const W = 430, H = 932, DPR = 2

const b = await lanzar()
const meta = {}
try {
  await b.send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: DPR, mobile: true })
  await b.send('Emulation.setTouchEmulationEnabled', { enabled: false })
  await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'light' }] })
  await b.ir(BASE + '/#/app')
  await b.evaluar('localStorage.clear(); sessionStorage.clear()')
  await b.ir(BASE + '/#/app')
  await espera(1500)

  const foto = async (nombre) => {
    await espera(700)
    const { data } = await b.send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(join(OUT, nombre + '.png'), Buffer.from(data, 'base64'))
    console.log('·', nombre)
  }
  // Rectángulo (en px CSS del viewport) del botón cuyo texto contiene `txt`
  const rect = (txt, sel = 'button') => b.evaluar(`(() => {
    const el = [...document.querySelectorAll(${JSON.stringify(sel)})].find(e => e.offsetParent && e.textContent.includes(${JSON.stringify(txt)}))
    if (!el) return null
    el.scrollIntoView({ block: 'nearest' })
    const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }
  })()`)
  const pulsar = async (nombre, txt, sel = 'button') => {
    const r = await rect(txt, sel)
    if (!r) throw new Error('No encuentro: ' + txt)
    await espera(400)
    const r2 = await rect(txt, sel)
    meta[nombre] = r2
    await foto(nombre)
    await b.evaluar(`[...document.querySelectorAll(${JSON.stringify(sel)})].find(e => e.offsetParent && e.textContent.includes(${JSON.stringify(txt)})).click()`)
    await espera(900)
  }

  await pulsar('01-inicio', 'Vivo en Tenerife')
  await pulsar('02-municipio', 'Tacoronte')
  await pulsar('03-sentir', 'Sabor')
  await pulsar('04-lista', 'Mercadillo del Agricultor de Tacoronte', 'button.tq-card-btn')
  await foto('05-ficha')

  // Desplazamiento real de la ficha, fotograma a fotograma, hasta las piedras y «Qué deja aquí»
  const scroller = `(() => { const els = [...document.querySelectorAll('*')].filter(e => e.scrollHeight > e.clientHeight + 40 && /auto|scroll/.test(getComputedStyle(e).overflowY)); return els.sort((a,b) => b.clientHeight - a.clientHeight)[0] || document.scrollingElement })()`
  const destino = async (sel) => b.evaluar(`(() => { const s = ${scroller}; const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return null; return Math.max(0, Math.min(s.scrollHeight - s.clientHeight, s.scrollTop + el.getBoundingClientRect().top - 90)) })()`)
  const yPiedras = await destino('.tq-fuego')
  const yDeja = await destino('.tq-deja')
  meta.scroll = { piedras: yPiedras, deja: yDeja }
  console.log('scroll', meta.scroll)
  const pasos = 24
  const tramo = async (desde, hasta, prefijo) => {
    for (let i = 0; i <= pasos; i++) {
      const k = i / pasos, e = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2
      await b.evaluar(`(${scroller}).scrollTop = ${desde + (hasta - desde) * e}`)
      await espera(60)
      const { data } = await b.send('Page.captureScreenshot', { format: 'jpeg', quality: 92 })
      writeFileSync(join(OUT, `${prefijo}-${String(i).padStart(2, '0')}.jpg`), Buffer.from(data, 'base64'))
    }
    console.log('·', prefijo)
  }
  await tramo(0, yPiedras ?? 400, '06-scroll-piedras')
  await tramo(yPiedras ?? 400, yDeja ?? 900, '07-scroll-deja')
  writeFileSync(join(OUT, 'meta.json'), JSON.stringify({ W, H, DPR, ...meta }, null, 2))
} finally {
  b.cerrar()
}

process.exit(0)
