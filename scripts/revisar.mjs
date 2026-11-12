// Revisión antes de entregar: huecos [entre corchetes], secciones «listo» vacías, ejemplos del kit,
// datos por verificar y piezas que faltan.
//   npm run revisar           → informa (no falla)
//   npm run revisar:entrega   → falla (código 1) si hay errores; úsalo antes de dar algo por terminado
import { build } from 'esbuild'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const entrega = process.argv.includes('--entrega')

// Carga todos los módulos de datos TypeScript de src/data/ y la configuración (solo datos: sin React ni CSS).
const archivosDatos = readdirSync(join(raiz, 'src/data')).filter((f) => f.endsWith('.ts'))
const nombre = (f) => f.replace(/\.ts$/, '').replace(/[^a-zA-Z0-9]/g, '_')
const entrada = [
  `export * as proyecto from './src/config/proyecto.ts'`,
  ...archivosDatos.map((f) => `export * as ${nombre(f)} from './src/data/${f}'`),
].join('\n')
const r = await build({ stdin: { contents: entrada, resolveDir: raiz, loader: 'ts' }, bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent' })
const m = await import('data:text/javascript;base64,' + Buffer.from(r.outputFiles[0].text).toString('base64'))
const { proyecto: P, investigacion: I, usuarios: U, presentacion: D } = m
const OTROS_DATOS = archivosDatos.map(nombre).filter((n) => !['investigacion', 'usuarios', 'presentacion'].includes(n))

const errores = []
const avisos = []
const HUECO = /\[[^\]\n]{2,}\]/

function huecos(x, ruta, out = []) {
  if (typeof x === 'string') { if (HUECO.test(x)) out.push(`${ruta}: «${x.length > 70 ? x.slice(0, 70) + '…' : x}»`) }
  else if (Array.isArray(x)) x.forEach((v, i) => huecos(v, `${ruta}[${i}]`, out))
  else if (x && typeof x === 'object') for (const [k, v] of Object.entries(x)) huecos(v, `${ruta}.${k}`, out)
  return out
}

// 1. El reto
if (!P.RETO.definido) (entrega ? errores : avisos).push('RETO.definido es false: la web muestra «Reto por anunciar».')
else {
  errores.push(...huecos(P.RETO, 'RETO'))
  if (P.RETO.criterios.length === 0) avisos.push('RETO.criterios está vacío.')
  if (P.RETO.entregablesPedidos.length === 0) avisos.push('RETO.entregablesPedidos está vacío.')
  const conPeso = P.RETO.criterios.filter((c) => c.peso != null)
  const suma = conPeso.reduce((a, c) => a + c.peso, 0)
  if (conPeso.length && suma !== 100) avisos.push(`Los pesos de RETO.criterios suman ${suma}, no 100.`)
}

// 2. Texto de relleno en lo que ve el jurado
errores.push(...huecos(D.SLIDES, 'presentacion.SLIDES'))
errores.push(...huecos(P.DESTACADOS, 'DESTACADOS'))
errores.push(...huecos(P.PROTOTIPO, 'PROTOTIPO'))
errores.push(...huecos(P.PREVIEW, 'PREVIEW'))
errores.push(...huecos(U.PERSONAS, 'usuarios.PERSONAS'))
errores.push(...huecos(U.JOURNEY, 'usuarios.JOURNEY'))
for (const [k, v] of Object.entries(I)) errores.push(...huecos(v, `investigacion.${k}`))
for (const n of OTROS_DATOS) for (const [k, v] of Object.entries(m[n])) errores.push(...huecos(v, `${n}.${k}`))

// 2b. Corchetes escritos en el código de las páginas y del prototipo (textos JSX y cadenas).
// Se ignoran las líneas con «RETO.definido ?» (solo se ven sin reto) o con el comentario revisar:ignorar.
const TEXTOS = /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|(?<![=-])>[^<>{}\n]+</g
for (const dir of ['src/pages', 'src/prototipo']) {
  for (const f of readdirSync(join(raiz, dir)).filter((f) => f.endsWith('.tsx') && !f.startsWith('_'))) {
    readFileSync(join(raiz, dir, f), 'utf8').split('\n').forEach((linea, i) => {
      if (/RETO\.definido \?|revisar:ignorar/.test(linea)) return
      for (const t of linea.match(TEXTOS) ?? []) {
        // Selectores CSS de atributo ('[data-x]', "[aria-x=y]") no son texto de relleno.
        const selector = /^['"]\[[\w-]+(?:[~|^$*]?=[^\]]*)?\]['"]$/.test(t)
        if (HUECO.test(t) && !selector && !/entre corchetes/.test(t)) errores.push(`${dir}/${f}:${i + 1}: «${t.slice(0, 70)}»`)
      }
    })
  }
}

// 3. Secciones marcadas como listas pero vacías
const vacia = {
  usuarios: () => U.PERSONAS.length === 0,
  prototipo: () => P.PROTOTIPO.url.trim() === '',
  presentacion: () => huecos(D.SLIDES, '').length > 0,
}
for (const s of P.SECCIONES.filter((s) => s.visible)) {
  if (s.estado === 'listo' && vacia[s.id]?.()) errores.push(`SECCIONES «${s.id}» está en «listo» pero sigue vacía o con relleno.`)
  const archivo = s.id[0].toUpperCase() + s.id.slice(1) + '.tsx'
  // #/gestion es una ruta a pantalla completa con su código en src/gestion/ (App.tsx), no en src/pages.
  if (s.id === 'gestion' && existsSync(join(raiz, 'src/gestion/Gestion.tsx'))) continue
  if (!readdirSync(join(raiz, 'src/pages')).some((f) => f.toLowerCase() === archivo.toLowerCase())) errores.push(`SECCIONES «${s.id}» no tiene página: falta src/pages/${archivo}.`)
}

// 4. Prototipo interno con pantallas de ejemplo del kit
const pantallas = readFileSync(join(raiz, 'src/prototipo/pantallas.tsx'), 'utf8')
if (P.PROTOTIPO.url.startsWith('#') && /ejemplo:\s*true/.test(pantallas)) errores.push('PROTOTIPO.url apunta a #/app pero quedan pantallas de ejemplo (ejemplo: true) en src/prototipo/pantallas.tsx.')

// 5. Piezas que faltan
if (!existsSync(join(raiz, 'public', P.PREVIEW.video))) avisos.push(`Falta el vídeo de preview: public/${P.PREVIEW.video}.`)
if (!P.SITIO_URL) avisos.push('SITIO_URL vacío: los QR usan la dirección desde la que se abra la web.')
if (!P.REPO_URL) avisos.push('REPO_URL vacío: el pie no enlaza al código.')
for (const e of P.EQUIPO) if (e.linkedin?.includes('/search/')) avisos.push(`LinkedIn de ${e.nombre} es una búsqueda, no su perfil.`)

// 6. Datos sin verificar (no pueden ir a la presentación)
const sinVerificar = []
;(function buscar(x, ruta) {
  if (Array.isArray(x)) x.forEach((v, i) => buscar(v, `${ruta}[${i}]`))
  else if (x && typeof x === 'object') {
    if (x.verificado === false) sinVerificar.push(`${ruta}${x.etiqueta ? ` (${x.etiqueta})` : ''}`)
    for (const [k, v] of Object.entries(x)) buscar(v, `${ruta}.${k}`)
  }
})(I, 'investigacion')

// Informe
const lista = (t, xs) => xs.length && console.log(`\n${t} (${xs.length})\n` + xs.map((x) => '  · ' + x).join('\n'))
console.log(`Revisión Nova · ${entrega ? 'modo entrega' : 'informe'}`)
lista('ERRORES · no se entrega así', errores)
lista('AVISOS', avisos)
lista('Datos «Por verificar» · no van a la presentación', sinVerificar)
if (!errores.length && !avisos.length) console.log('\nTodo en orden.')
if (entrega && errores.length) process.exit(1)
