// Mínimo cliente CDP (Chrome DevTools Protocol) sin dependencias: lanza el Chromium de Playwright en modo headless.
import { spawn } from 'node:child_process'
import { existsSync, readdirSync, mkdtempSync } from 'node:fs'
import { tmpdir, homedir } from 'node:os'
import { join } from 'node:path'

export function chromePath() {
  if (process.env.CHROME) return process.env.CHROME
  const base = join(homedir(), 'AppData', 'Local', 'ms-playwright')
  const dirs = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()
  for (const d of dirs) {
    for (const sub of ['chrome-win64', 'chrome-win']) {
      const p = join(base, d, sub, 'chrome.exe')
      if (existsSync(p)) return p
    }
  }
  throw new Error('No encuentro Chromium. Define CHROME=ruta\\chrome.exe')
}

export async function lanzar() {
  const perfil = mkdtempSync(join(tmpdir(), 'teaser-chrome-'))
  const proc = spawn(chromePath(), [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${perfil}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--mute-audio',
    '--force-color-profile=srgb', '--font-render-hinting=none', 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] })
  const wsUrl = await new Promise((ok, ko) => {
    let buf = ''
    proc.stderr.on('data', (d) => {
      buf += d
      const m = buf.match(/DevTools listening on (ws:\/\/\S+)/)
      if (m) ok(m[1])
    })
    proc.on('exit', (c) => ko(new Error('Chromium salió con código ' + c)))
  })
  const port = new URL(wsUrl).port
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
  const page = tabs.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((ok) => ws.addEventListener('open', ok, { once: true }))
  let id = 0
  const pend = new Map()
  const oyentes = new Map()
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pend.has(msg.id)) {
      const { ok, ko } = pend.get(msg.id); pend.delete(msg.id)
      msg.error ? ko(new Error(msg.error.message)) : ok(msg.result)
    } else if (msg.method && oyentes.has(msg.method)) {
      for (const f of oyentes.get(msg.method)) f(msg.params)
    }
  })
  const send = (method, params = {}) => new Promise((ok, ko) => {
    const n = ++id; pend.set(n, { ok, ko }); ws.send(JSON.stringify({ id: n, method, params }))
  })
  const once = (method) => new Promise((ok) => {
    const f = (p) => { oyentes.get(method).delete(f); ok(p) }
    if (!oyentes.has(method)) oyentes.set(method, new Set())
    oyentes.get(method).add(f)
  })
  const evaluar = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
    return r.result.value
  }
  const ir = async (url) => {
    const cargada = once('Page.loadEventFired')
    await send('Page.navigate', { url })
    await cargada
  }
  await send('Page.enable')
  await send('Runtime.enable')
  const cerrar = () => { try { ws.close() } catch {} proc.kill() }
  return { send, evaluar, ir, cerrar }
}

export const espera = (ms) => new Promise((r) => setTimeout(r, ms))
