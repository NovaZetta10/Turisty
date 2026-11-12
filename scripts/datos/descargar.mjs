// Descarga de datos abiertos de turismo en Canarias (ISTAC, INE y catálogo de datos.canarias.es).
// Sin dependencias: Node 18 o superior. Guía completa: docs/investigacion-datos-abiertos.md
//
//   node scripts/datos/descargar.mjs basico                     → indicadores clave de Canarias y por islas (CSV)
//   node scripts/datos/descargar.mjs istac-lista [filtro]       → lista los indicadores del ISTAC (p. ej. «aloja»)
//   node scripts/datos/descargar.mjs istac <CODIGO> [opciones]  → un indicador en CSV
//        --geo canarias|islas|municipios   (por defecto canarias)
//        --tiempo mensual|trimestral|anual (por defecto mensual)
//   node scripts/datos/descargar.mjs ine <TABLA>                → una tabla del INE en CSV (10823 = Frontur por comunidad)
//   node scripts/datos/descargar.mjs buscar "<texto>"           → busca conjuntos en el catálogo de datos.canarias.es
//
//   --salida <carpeta>  Por defecto, una carpeta temporal fuera del repositorio.
//                       Usa --salida public/data solo para datos que vaya a cargar el prototipo.
import { mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const ISTAC = 'https://datos.canarias.es/api/estadisticas/indicators/v1.0/indicators'
const INE = 'https://servicios.ine.es/wstempus/js/ES'
const CKAN = 'https://datos.canarias.es/catalogos/general/api/3/action'

const args = process.argv.slice(2)
const opcion = (n, def) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : def }
const posicionales = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')))
const [orden, param] = posicionales
const salida = resolve(opcion('salida', join(tmpdir(), 'nova-datos')))

const GEO_GRAN = { islas: 'ISLANDS', municipios: 'MUNICIPALITIES' }
const TIEMPO = { mensual: 'MONTHLY', trimestral: 'QUARTERLY', anual: 'YEARLY' }

async function json(url) {
  const r = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} · ${url}`)
  return r.json()
}

const csv = (filas) => filas.map((f) => f.map((v) => (/[",;\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v)).join(',')).join('\n') + '\n'

function guardar(nombre, filas) {
  mkdirSync(salida, { recursive: true })
  const ruta = join(salida, nombre)
  writeFileSync(ruta, csv(filas), 'utf8')
  console.log(`  ✓ ${ruta} (${filas.length - 1} filas)`)
}

/** Indicador del ISTAC → filas [territorio, codigo, periodo, medida, valor]. Las observaciones vienen ordenadas por filas según `format`. */
async function istac(codigo, geo = 'canarias', tiempo = 'mensual') {
  const meta = await json(`${ISTAC}/${codigo}`)
  if (geo !== 'canarias' && !GEO_GRAN[geo]) throw new Error(`--geo debe ser canarias, islas o municipios`)
  if (!TIEMPO[tiempo]) throw new Error(`--tiempo debe ser mensual, trimestral o anual`)
  const t = `TIME[${TIEMPO[tiempo]}]`
  const q = geo === 'canarias'
    ? { representation: 'GEOGRAPHICAL[ES70],MEASURE[ABSOLUTE]', granularity: t }
    : { representation: 'MEASURE[ABSOLUTE]', granularity: `GEOGRAPHICAL[${GEO_GRAN[geo]}],${t}` }
  const url = `${ISTAC}/${codigo}/data?${new URLSearchParams(q)}`
  const d = await json(url)
  const dims = d.format.map((k) => {
    const idx = d.dimension[k].representation.index
    return { k, codigos: Object.keys(idx).sort((a, b) => idx[a] - idx[b]) }
  })
  const nombreGeo = Object.fromEntries((meta.dimension?.GEOGRAPHICAL?.representation ?? []).map((g) => [g.code, g.title?.es ?? g.code]))
  const filas = [['territorio', 'codigo_territorio', 'periodo', 'medida', 'valor']]
  d.observation.forEach((v, i) => {
    let resto = i
    const pos = {}
    for (let j = dims.length - 1; j >= 0; j--) { const n = dims[j].codigos.length; pos[dims[j].k] = dims[j].codigos[resto % n]; resto = Math.floor(resto / n) }
    if (v === '' || v == null) return
    filas.push([nombreGeo[pos.GEOGRAPHICAL] ?? pos.GEOGRAPHICAL, pos.GEOGRAPHICAL, pos.TIME, pos.MEASURE, v])
  })
  filas.splice(1, filas.length, ...filas.slice(1).sort((a, b) => String(a[1]).localeCompare(String(b[1])) || String(a[2]).localeCompare(String(b[2]))))
  return { titulo: meta.title?.es ?? codigo, filas }
}

async function main() {
  switch (orden) {
    case 'istac-lista': {
      const filtro = (param ?? '').toLowerCase()
      const todos = (await json(`${ISTAC}?limit=1000`)).items
      for (const i of todos) {
        const t = i.title?.es ?? ''
        if (!filtro || t.toLowerCase().includes(filtro) || i.code.toLowerCase().includes(filtro)) console.log(`${i.code.padEnd(52)} ${t}`)
      }
      break
    }
    case 'istac': {
      if (!param) throw new Error('Falta el código del indicador. Usa istac-lista para verlos.')
      const geo = opcion('geo', 'canarias'), tiempo = opcion('tiempo', 'mensual')
      const { titulo, filas } = await istac(param, geo, tiempo)
      console.log(`${titulo} · ${geo} · ${tiempo}`)
      guardar(`istac_${param}_${geo}_${tiempo}.csv`, filas)
      break
    }
    case 'basico': {
      // Indicadores que más se usan en un reto de turismo. Islas: solo las cinco que cubre Frontur/EGT.
      const lista = [
        ['TURISTAS', 'canarias', 'mensual'], ['TURISTAS', 'islas', 'anual'],
        ['TURISTAS_EXTRANJEROS', 'canarias', 'mensual'], ['TURISTAS_NACIONALES', 'canarias', 'mensual'],
        ['GASTO_TURISTICO_TURISTA', 'canarias', 'trimestral'], ['GASTO_TURISTICO_TURISTA_DIA', 'canarias', 'trimestral'],
        ['ALOJATUR_PLAZAS_OCUPACION', 'islas', 'mensual'], ['ALOJATUR_TARIFA_ADR', 'islas', 'mensual'],
        ['ALOJATUR_ESTANCIAS_MEDIAS', 'islas', 'mensual'], ['TRAFICO_AEREO_PASAJEROS', 'islas', 'mensual'],
      ]
      for (const [c, g, t] of lista) {
        try { const { titulo, filas } = await istac(c, g, t); console.log(`${titulo} · ${g} · ${t}`); guardar(`istac_${c}_${g}_${t}.csv`, filas) }
        catch (e) { console.log(`  ✗ ${c} (${g}, ${t}): ${e.message}`) }
      }
      break
    }
    case 'ine': {
      if (!param) throw new Error('Falta el número de tabla del INE (p. ej. 10823).')
      const d = await json(`${INE}/DATOS_TABLA/${param}?nult=${opcion('ultimos', '24')}`)
      const filas = [['serie', 'anyo', 'periodo', 'valor']]
      for (const s of d) for (const x of s.Data) filas.push([s.Nombre.trim(), x.Anyo, x.FK_Periodo ?? '', x.Valor ?? ''])
      console.log(`INE tabla ${param}: ${d.length} series`)
      guardar(`ine_${param}.csv`, filas)
      break
    }
    case 'buscar': {
      const r = (await json(`${CKAN}/package_search?q=${encodeURIComponent(param ?? 'turismo')}&rows=20`)).result
      console.log(`${r.count} conjuntos. Primeros 20:`)
      for (const p of r.results) {
        const formatos = [...new Set(p.resources.map((x) => x.format).filter(Boolean))].join(', ')
        console.log(`- ${p.title}\n  ${formatos} · ${p.license_title ?? 'sin licencia indicada'} · https://datos.canarias.es/catalogos/general/dataset/${p.name}`)
      }
      break
    }
    default:
      console.log('Órdenes: basico | istac-lista [filtro] | istac <CODIGO> [--geo canarias|islas|municipios] [--tiempo mensual|trimestral|anual] | ine <TABLA> | buscar "<texto>"  ·  --salida <carpeta>')
  }
}

main().catch((e) => { console.error('Error:', e.message); process.exitCode = 1 })
