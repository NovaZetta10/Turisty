// Resume la exportación CSV del formulario (Forms) para volcarla en src/data/usuarios.ts → ENCUESTA.
// Dueño: subagente de usuarios. No escribe ningún archivo: solo imprime el resumen en pantalla.
//
//   node scripts/usuarios-encuesta.mjs ../encuesta.csv
//   node scripts/usuarios-encuesta.mjs ../encuesta.csv --grupo "vives"     (separa por la columna cuyo título contiene «vives»)
//
// - El CSV se guarda FUERA del repositorio. Si es Excel, ábrelo y «Guardar como» CSV UTF-8.
// - Quita las columnas que identifican (nombre, correo, teléfono…) y las de metadatos de Forms (Id, horas).
// - Preguntas cerradas: «N de M» por respuesta (las de varias opciones, separadas por «;», se cuentan una a una).
// - Preguntas abiertas: lista las respuestas y tapa correos, teléfonos y números largos.
import { readFileSync } from 'node:fs'

const args = process.argv.slice(2)
const ruta = args.find((a) => !a.startsWith('--'))
const iGrupo = args.indexOf('--grupo')
const filtroGrupo = iGrupo >= 0 ? args[iGrupo + 1]?.toLowerCase() : null
if (!ruta) { console.error('Uso: node scripts/usuarios-encuesta.mjs archivo.csv [--grupo "texto de la columna"]'); process.exit(1) }

const texto = readFileSync(ruta, 'utf8').replace(/^﻿/, '')
const sep = (texto.split('\n')[0].match(/;/g)?.length ?? 0) > (texto.split('\n')[0].match(/,/g)?.length ?? 0) ? ';' : ','

/** CSV con comillas y saltos de línea dentro de los campos. */
function parse(t) {
  const filas = []; let fila = []; let campo = ''; let q = false
  for (let i = 0; i < t.length; i++) {
    const c = t[i]
    if (q) { if (c === '"' && t[i + 1] === '"') { campo += '"'; i++ } else if (c === '"') q = false; else campo += c }
    else if (c === '"') q = true
    else if (c === sep) { fila.push(campo); campo = '' }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; fila.push(campo); filas.push(fila); fila = []; campo = '' }
    else campo += c
  }
  if (campo || fila.length) { fila.push(campo); filas.push(fila) }
  return filas.filter((f) => f.some((x) => x.trim()))
}

const [cab, ...filas] = parse(texto)
const IDENTIFICA = /nombre|name|apellido|correo|e-?mail|tel[eé]fono|phone|m[oó]vil|dni|nie|direcci[oó]n|address|\bip\b|^id$|hora de (inicio|finalizaci[oó]n)|start time|completion time|[uú]ltima modificaci[oó]n|last modified/i
const quitadas = cab.filter((h) => IDENTIFICA.test(h.trim()))
const cols = cab.map((h, i) => ({ h: h.trim(), i })).filter((c) => !IDENTIFICA.test(c.h))
const tapar = (s) => s.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '[correo]').replace(/\+?\d[\d\s-]{7,}\d/g, '[número]')

const colGrupo = filtroGrupo ? cols.find((c) => c.h.toLowerCase().includes(filtroGrupo)) : null
if (filtroGrupo && !colGrupo) { console.error(`No hay ninguna columna que contenga «${filtroGrupo}».`); process.exit(1) }
const grupos = colGrupo ? [...new Set(filas.map((f) => (f[colGrupo.i] ?? '').trim() || '(sin respuesta)'))] : [null]

console.log(`Encuesta · ${filas.length} respuestas · ${cols.length} preguntas`)
if (quitadas.length) console.log(`Columnas quitadas por identificar o ser metadatos: ${quitadas.join(' · ')}`)
if (colGrupo) console.log(`Separado por: «${colGrupo.h}» → ${grupos.map((g) => `${g} (${filas.filter((f) => ((f[colGrupo.i] ?? '').trim() || '(sin respuesta)') === g).length})`).join(' · ')}`)

for (const c of cols) {
  if (c === colGrupo) continue
  console.log(`\n## ${c.h}`)
  for (const g of grupos) {
    const sub = g === null ? filas : filas.filter((f) => ((f[colGrupo.i] ?? '').trim() || '(sin respuesta)') === g)
    const resp = sub.map((f) => (f[c.i] ?? '').trim()).filter(Boolean)
    const etiqueta = g === null ? '' : `  [${g}] `
    if (!resp.length) { console.log(`${etiqueta}nadie respondió`); continue }
    const valores = resp.flatMap((r) => r.split(';').map((x) => x.trim()).filter(Boolean))
    const distintos = new Set(valores)
    const cerrada = distintos.size <= 12 && valores.every((v) => v.length <= 60 && v.split(/\s+/).length <= 6)
    if (cerrada) {
      const cuenta = [...distintos].map((v) => [v, resp.filter((r) => r.split(';').map((x) => x.trim()).includes(v)).length]).sort((a, b) => b[1] - a[1])
      console.log(`${etiqueta}respondieron ${resp.length} de ${sub.length}`)
      for (const [v, n] of cuenta) console.log(`${etiqueta}  ${n} de ${resp.length} · ${tapar(v)}`)
    } else {
      console.log(`${etiqueta}abierta · ${resp.length} respuestas (revisa que ninguna identifique a nadie antes de citarla):`)
      resp.forEach((r, i) => console.log(`${etiqueta}  ${String(i + 1).padStart(2)}. ${tapar(r).replace(/\s+/g, ' ')}`))
    }
  }
}
console.log('\nNada se ha guardado. Copia a ENCUESTA solo las cuentas («N de M») y las citas sin datos personales.')
