// Renderiza escena.html fotograma a fotograma (30 fps) con Chromium headless.
// Uso: node scripts/teaser/render.mjs http://localhost:5175 [t1,t2,...]   (sin tiempos: los 900 fotogramas)
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lanzar } from './cdp.mjs'

const BASE = process.argv[2] || 'http://localhost:5175'
const tiempos = process.argv[3]?.split(',').map(Number)
const AQUI = dirname(fileURLToPath(import.meta.url))
const OUT = join(AQUI, tiempos ? 'pruebas' : 'fotogramas')
if (!tiempos) rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
const FPS = 30

const b = await lanzar()
try {
  await b.send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false })
  await b.ir(BASE + '/scripts/teaser/escena.html')
  await b.evaluar('window.listo')
  const DUR = await b.evaluar('window.DURACION || 30')
  const lista = tiempos ?? Array.from({ length: Math.round(FPS * DUR) }, (_, f) => f / FPS)
  const t0 = Date.now()
  for (let i = 0; i < lista.length; i++) {
    await b.evaluar(`render(${lista[i]})`)
    const { data } = await b.send('Page.captureScreenshot', { format: 'jpeg', quality: 95, optimizeForSpeed: false })
    const nombre = tiempos ? `t-${lista[i].toFixed(2)}.jpg` : `f${String(i).padStart(4, '0')}.jpg`
    writeFileSync(join(OUT, nombre), Buffer.from(data, 'base64'))
    if (!tiempos && i % 90 === 0) console.log(`${i}/${lista.length} · ${((Date.now() - t0) / 1000).toFixed(0)} s`)
  }
  console.log('listo:', OUT)
} finally {
  b.cerrar()
}
process.exit(0)
