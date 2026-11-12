// DATOS SIMULADOS · prueba de concepto.
// Lo único REAL de este panel es el recuento del catálogo (experiencias verificadas por municipio y sus títulos).
// Todo lo demás (reservas, personas, aportaciones, proyectos, garantías, cupos, valores de los indicadores)
// lo genera este archivo con una semilla fija: siempre sale lo mismo. Nunca se presenta como dato real.

import { EXPERIENCIAS, anfitrion, type Experiencia } from '../prototipo/experiencias'
import { KPIS, PRUEBA_CONCEPTO } from '../data/viabilidad'
import { cascoDe } from './MapaGestion'

export const ROTULO_SIMULADO = 'Datos simulados · prueba de concepto'

// ─── Aleatorio con semilla fija ──────────────────────────────────────────────
function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const TXT = (x: Experiencia['titulo']) => (typeof x === 'string' ? x : x.es)

// ─── Tiempo: 14 días (la prueba de concepto) en horas simuladas ──────────────
export const HORAS_PRUEBA = 14 * 24
/** La demo empieza el día 8, con una semana de historia por detrás. */
export const H_INICIO = 7 * 24
export type Perfil = 'vecinos' | 'visitantes' | 'jovenes'
export type PerfilFiltro = Perfil | 'todos'
export type Periodo = 'hoy' | 'semana' | 'prueba'

export const PERFILES: { id: PerfilFiltro; es: string }[] = [
  { id: 'todos', es: 'Todos' }, { id: 'vecinos', es: 'Vecinos' }, { id: 'visitantes', es: 'Visitantes' }, { id: 'jovenes', es: 'Jóvenes' },
]
export const PERIODOS: { id: Periodo; es: string; largo: string }[] = [
  { id: 'hoy', es: 'Hoy', largo: 'Hoy' },
  { id: 'semana', es: 'Esta semana', largo: 'Esta semana' },
  { id: 'prueba', es: '2 semanas', largo: 'Las 2 semanas de la prueba de concepto' },
]

export const desdePeriodo = (p: Periodo, h: number) => (p === 'hoy' ? Math.floor(h / 24) * 24 : p === 'semana' ? Math.floor(h / 168) * 168 : 0)
export function reloj(h: number) {
  const dia = Math.min(14, Math.floor(h / 24) + 1)
  const hh = Math.floor(h % 24), mm = Math.floor((h * 60) % 60)
  return { dia, hora: `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}` }
}

// ─── Municipios: clasificación SIMULADA (supuesto de trabajo, no dato) ────────
export type Nivel = 'saturado' | 'medio' | 'poco'
const SATURADOS = ['Adeje', 'Arona', 'Puerto de la Cruz', 'Santiago del Teide', 'La Orotava']
const MEDIOS = ['Santa Cruz de Tenerife', 'San Cristóbal de La Laguna', 'Icod de los Vinos', 'Candelaria', 'Guía de Isora', 'Los Realejos', 'Granadilla de Abona', 'Garachico']
export const nivelDe = (m: string): Nivel => (SATURADOS.includes(m) ? 'saturado' : MEDIOS.includes(m) ? 'medio' : 'poco')

/** Lugares con cupo o mucha afluencia (simulado): sirven para las alertas de cuello de botella. */
export const CUELLOS: { muni: string; lugar: string; tipo: 'cupo' | 'afluencia'; pico: number }[] = [
  { muni: 'Santiago del Teide', lugar: 'Masca', tipo: 'cupo', pico: 1.04 },
  { muni: 'La Orotava', lugar: 'Teide', tipo: 'cupo', pico: 0.98 },
  { muni: 'Adeje', lugar: 'Costa de Adeje', tipo: 'afluencia', pico: 0.94 },
  { muni: 'Arona', lugar: 'Los Cristianos', tipo: 'afluencia', pico: 0.9 },
  { muni: 'Puerto de la Cruz', lugar: 'Casco y costa', tipo: 'afluencia', pico: 0.88 },
]

// ─── Catálogo (real) ─────────────────────────────────────────────────────────
/** Experiencias verificadas con municipio que se puede dibujar. Las que no indican municipio ("No consta") quedan fuera del mapa. */
export const CATALOGO = EXPERIENCIAS.filter((e) => cascoDe(e.municipio))
export const SIN_MUNICIPIO = EXPERIENCIAS.length - CATALOGO.length
export const limpio = (x: string) => (/no consta/i.test(x) ? 'organizador por confirmar' : x)
export const MUNICIPIOS_CATALOGO = Array.from(new Set(CATALOGO.map((e) => e.municipio)))

// ─── Kanban de garantías ─────────────────────────────────────────────────────
export const COLUMNAS = ['Propuestas', 'En revisión', 'Con garantía', 'Activas'] as const
export const HILOS = ([
  { expId: 'mercadillo-agricultor-tacoronte', t: [9.2, 9.42, 9.67, 10.08], reserva: 11.08, personas: 2, vive: 18, valora: 19.5 },
  { expId: 'juego-del-palo-la-laguna', t: [10.5, 11, 12.33, 13], reserva: 14.17, personas: 3, vive: 19, valora: 20.5 },
  { expId: 'queserias-teno-alto', t: [12.75, 13.5, 15.17, 16], reserva: 17.33, personas: 2, vive: 21, valora: 22.5 },
] as const).map((x) => ({ expId: x.expId, personas: x.personas, t: x.t.map((v) => H_INICIO + v) as [number, number, number, number], reserva: H_INICIO + x.reserva, vive: H_INICIO + x.vive, valora: H_INICIO + x.valora }))
// Tres hilos del «Día en Tenique» (día 8): publicar → revisar → garantía → activa → reserva → la viven → valoran.

export type Tarjeta = { id: string; titulo: string; muni: string; anfitrion: string; emociones: string[]; joven: boolean; tiempos: [number, number, number, number] }

function generarTarjetas(): Tarjeta[] {
  const rnd = mulberry32(777)
  const vistos = new Set<string>()
  const barajadas = CATALOGO.slice().sort(() => rnd() - 0.5)
  const hilos = HILOS.map((x) => CATALOGO.find((e) => e.id === x.expId)).filter((e): e is Experiencia => !!e)
  const elegidas: Experiencia[] = [...hilos]
  hilos.forEach((e) => vistos.add(e.municipio))
  for (const e of barajadas) { if (elegidas.length >= 18) break; if (hilos.includes(e)) continue; if (vistos.has(e.municipio) && elegidas.length < 14) continue; vistos.add(e.municipio); elegidas.push(e) }
  return elegidas.map((e, i) => {
    const t0 = i * 16 - 150 + rnd() * 10
    const t1 = t0 + 14 + rnd() * 26, t2 = t1 + 16 + rnd() * 30, t3 = t2 + 12 + rnd() * 30
    const hilo = HILOS.find((x) => x.expId === e.id)
    return { id: e.id, titulo: TXT(e.titulo), muni: e.municipio, anfitrion: limpio(anfitrion(e)), emociones: e.emociones, joven: e.paraJovenes === true, tiempos: hilo ? hilo.t : [t0, t1, t2, t3] }
  })
}
export const TARJETAS = generarTarjetas()
/** 0 = propuesta … 3 = activa; -1 si todavía no ha entrado. */
export const etapaDe = (t: Tarjeta, h: number) => t.tiempos.reduce((e, x, i) => (h >= x ? i : e), -1)
export const ultimoCambio = (t: Tarjeta, h: number) => { const e = etapaDe(t, h); return e < 0 ? Infinity : h - t.tiempos[e] }

// ─── Flujo de sucesos simulados ──────────────────────────────────────────────
export type Reserva = { tipo: 'reserva'; id: number; h: number; muni: string; expId: string; titulo: string; perfil: Perfil; emocion: string; personas: number; euros: number; llevado: boolean }
export type Aporte = { tipo: 'aporte'; id: number; h: number; muni: string; euros: number }
export type Proyecto = { tipo: 'proyecto'; id: number; h: number; muni: string; titulo: string; coste: number }
export type Suceso = Reserva | Aporte | Proyecto

const PROYECTOS = ['Bancos y sombra en la plaza', 'Arreglo del sendero del barrio', 'Cartel y señal en el casco', 'Papeleras y fuente en el mirador', 'Rampa de acceso a la ermita', 'Luz en el camino de la romería', 'Aparcabicis junto a la parada', 'Mejora del lavadero']

const curvaDia = (hh: number) => 0.08 + Math.exp(-(((hh - 12) / 4.2) ** 2))

function generar(): Suceso[] {
  const rnd = mulberry32(20261112)
  const ev: Suceso[] = []
  const pesos = CATALOGO.map((e) => { const n = nivelDe(e.municipio); return n === 'saturado' ? 0.55 : n === 'poco' ? 1.35 : 1 })
  const suma = pesos.reduce((s, x) => s + x, 0)
  const elegir = () => { let r = rnd() * suma; for (let i = 0; i < CATALOGO.length; i++) { r -= pesos[i]; if (r <= 0) return CATALOGO[i] } return CATALOGO[0] }
  const saldo: Record<string, number> = {}
  let id = 1
  let proximoProyecto = 56
  for (let h = 0; h < HORAS_PRUEBA; h++) {
    const dia = h / 24
    const tasa = 2.6 * curvaDia(h % 24) * (0.55 + 0.75 * (dia / 14))
    const n = Math.floor(tasa + rnd())
    for (let k = 0; k < n && CATALOGO.length; k++) {
      const e = elegir()
      const u = rnd()
      const tarjeta = TARJETAS.find((t) => t.id === e.id)
      if (tarjeta && h < tarjeta.tiempos[3]) continue // una experiencia solo se reserva cuando está activa
      const perfil: Perfil = e.paraJovenes && u < 0.45 ? 'jovenes' : u < 0.3 ? 'vecinos' : 'visitantes'
      const personas = 1 + Math.floor(rnd() ** 1.6 * 5)
      const euros = personas * (2 + Math.floor(rnd() * 3))
      const t = h + rnd()
      const llevado = perfil !== 'vecinos' && nivelDe(e.municipio) === 'poco'
      ev.push({ tipo: 'reserva', id: id++, h: t, muni: e.municipio, expId: e.id, titulo: TXT(e.titulo), perfil, emocion: e.emociones[0] ?? '', personas, euros, llevado })
      saldo[e.municipio] = (saldo[e.municipio] ?? 0) + euros
    }
    // Aportaciones de empresas turísticas a un municipio.
    if (rnd() < 0.3 * curvaDia(h % 24) + 0.04 && MUNICIPIOS_CATALOGO.length) {
      const m = MUNICIPIOS_CATALOGO[Math.floor(rnd() * MUNICIPIOS_CATALOGO.length)]
      const euros = 50 + Math.floor(rnd() * 4) * 50
      ev.push({ tipo: 'aporte', id: id++, h: h + rnd(), muni: m, euros })
      saldo[m] = (saldo[m] ?? 0) + euros
    }
    // Un proyecto vecinal pagado con el fondo del municipio que tenga más saldo.
    if (h >= proximoProyecto) {
      const coste = 150 + Math.floor(rnd() * 4) * 75
      const [m, s] = Object.entries(saldo).sort((a, b) => b[1] - a[1])[0] ?? ['', 0]
      if (m && s >= coste) {
        ev.push({ tipo: 'proyecto', id: id++, h: h + rnd(), muni: m, titulo: PROYECTOS[Math.floor(rnd() * PROYECTOS.length)], coste })
        saldo[m] -= coste
        proximoProyecto = h + 14 + Math.floor(rnd() * 14)
      }
    }
  }
  for (const x of HILOS) {
    const e = CATALOGO.find((c) => c.id === x.expId)
    if (!e) continue
    const rid = id++
    VIDA[rid] = { vive: x.vive, valora: x.valora }
    ev.push({ tipo: 'reserva', id: rid, h: x.reserva, muni: e.municipio, expId: e.id, titulo: TXT(e.titulo), perfil: 'visitantes', emocion: e.emociones[0] ?? '', personas: x.personas, euros: x.personas * 3, llevado: nivelDe(e.municipio) === 'poco' })
  }
  return ev.sort((a, b) => a.h - b.h)
}
/** Cuándo se vive y se valora cada reserva (los hilos fijan su hora; el resto se deduce). */
export const VIDA: Record<number, { vive: number; valora: number }> = {}
export const vidaDe = (r: Reserva) => VIDA[r.id] ?? { vive: r.h + 2 + (r.id % 5), valora: r.h + 3.5 + (r.id % 5) }
export const SUCESOS: Suceso[] = generar()

// ─── Cálculo por municipio ───────────────────────────────────────────────────
export type Filtros = { perfil: PerfilFiltro; emocion: string }
export type DatosMuni = {
  muni: string
  exps: number // REAL (catálogo, con los filtros que se pueden aplicar)
  reservas: number; personas: number; llevados: number
  aportado: number; usado: number; proyectos: Proyecto[]
}
const vacio = (muni: string): DatosMuni => ({ muni, exps: 0, reservas: 0, personas: 0, llevados: 0, aportado: 0, usado: 0, proyectos: [] })

export function experienciasFiltradas(f: Filtros) {
  return CATALOGO.filter((e) => (f.emocion === 'todas' || e.emociones.includes(f.emocion)) && (f.perfil !== 'jovenes' || e.paraJovenes === true))
}

export function calcular(desde: number, hasta: number, f: Filtros) {
  const por: Record<string, DatosMuni> = {}
  const get = (m: string) => (por[m] ??= vacio(m))
  for (const m of MUNICIPIOS_CATALOGO) get(m)
  for (const e of experienciasFiltradas(f)) get(e.municipio).exps++
  const sinFiltro = f.perfil === 'todos' && f.emocion === 'todas'
  const recientes: Suceso[] = []
  for (const s of SUCESOS) {
    if (s.h > hasta) break
    if (s.h < desde) continue
    const d = get(s.muni)
    if (s.tipo === 'reserva') {
      if (f.perfil !== 'todos' && s.perfil !== f.perfil) continue
      if (f.emocion !== 'todas' && s.emocion !== f.emocion) continue
      d.reservas++; d.personas += s.personas; d.aportado += s.euros
      if (s.llevado) d.llevados += s.personas
    } else if (s.tipo === 'aporte') {
      if (sinFiltro) d.aportado += s.euros
    } else { d.usado += s.coste; d.proyectos.push(s) }
    recientes.push(s)
  }
  const lista = Object.values(por)
  const tot = lista.reduce((t, d) => ({ reservas: t.reservas + d.reservas, personas: t.personas + d.personas, aportado: t.aportado + d.aportado, usado: t.usado + d.usado, llevados: t.llevados + d.llevados, exps: t.exps + d.exps }), { reservas: 0, personas: 0, aportado: 0, usado: 0, llevados: 0, exps: 0 })
  return { por, lista, tot, recientes }
}

/** Ocupación simulada (% del cupo o de la afluencia habitual) de un lugar con cuello de botella a una hora. */
export function ocupacion(c: (typeof CUELLOS)[number], h: number, llevadosAcum: number) {
  const dia = Math.floor(h / 24), hh = h % 24
  const r = mulberry32(dia * 97 + c.lugar.length * 13)()
  const acumulado = Math.min(1, Math.max(0, (hh - 7) / 9)) ** 0.8
  const alivio = Math.min(0.12, llevadosAcum / 4000)
  const pico = Math.min(1, c.pico * (0.9 + 0.16 * r) - (dia >= 7 ? alivio : 0))
  return Math.round(Math.min(1, pico * acumulado) * 100)
}
export const ocupacionBase = (c: (typeof CUELLOS)[number]) => Math.round(Math.min(1, c.pico) * 100)

// ─── Indicadores (nombres de src/data/viabilidad.ts; cifras simuladas) ────────
const SIM: { unidad: string; base: number; obj: number; exp: number }[] = [
  { unidad: 'por 1.000 hab.', base: 3, obj: 9, exp: 0.8 },
  { unidad: '% del gasto', base: 55, obj: 85, exp: 0.9 },
  { unidad: 'puntos de mejora', base: 0, obj: 10, exp: 1.2 },
  { unidad: 'anfitriones', base: 6, obj: 30, exp: 0.75 },
  { unidad: 'proyectos hechos', base: 0, obj: 8, exp: 1 },
  { unidad: '% de reservas', base: 28, obj: 45, exp: 1 },
]
export type IndicadorSim = { nombre: string; unidad: string; base: string; actual: string; obj: string; fraccion: number; detalle: string }
const totalReservas = SUCESOS.filter((s) => s.tipo === 'reserva').length || 1
const totalProyectos = SUCESOS.filter((s) => s.tipo === 'proyecto').length || 1
const avanceReservas = (h: number) => SUCESOS.filter((s) => s.tipo === 'reserva' && s.h <= h).length / totalReservas
const n1 = (n: number) => (Math.round(n * 10) / 10).toLocaleString('es-ES')
const acota = (x: number) => Math.max(0, Math.min(1, x))

/** Los 6 indicadores del piloto (viabilidad.ts, KPIS): nombre real; línea base, valor y objetivo simulados. */
export function indicadores(h: number): IndicadorSim[] {
  const hecho = avanceReservas(h)
  const proy = SUCESOS.filter((s) => s.tipo === 'proyecto' && s.h <= h).length / totalProyectos
  return KPIS.slice(0, SIM.length).map((k, i) => {
    const s = SIM[i]
    const avance = i === 4 ? proy : Math.min(1, hecho ** s.exp * (0.78 + 0.2 * mulberry32(i + 5)()))
    const actual = s.base + (s.obj - s.base) * avance
    return { nombre: k.nombre, unidad: s.unidad, base: n1(s.base), actual: n1(actual), obj: n1(s.obj), fraccion: avance, detalle: k.objetivo ? `Objetivo del plan (supuesto): ${k.objetivo}` : '' }
  })
}

/** Los 6 indicadores de la prueba de concepto de 2 semanas (viabilidad.ts, PRUEBA_CONCEPTO): textos reales; valores simulados. */
export function indicadoresPrueba(h: number): IndicadorSim[] {
  const hecho = avanceReservas(h)
  const garantia = TARJETAS.filter((t) => etapaDe(t, h) >= 2).length
  const reservas = Math.round(57 * hecho)
  const euro = SUCESOS.reduce((t, s) => (s.h <= h && (s.tipo === 'aporte' || s.tipo === 'reserva') ? t + s.euros : t), 0)
  const valores: { unidad: string; base: string; actual: string; obj: string; fraccion: number }[] = [
    { unidad: 'experiencias', base: '0', actual: String(garantia), obj: '10 o más', fraccion: garantia / 10 },
    { unidad: 'reservas', base: '0', actual: String(reservas), obj: '50 o más', fraccion: reservas / 50 },
    { unidad: 'sobre 5', base: 'sin dato', actual: hecho > 0.04 ? n1(3.7 + 0.7 * hecho ** 0.7) : 'sin dato', obj: '4 o más', fraccion: hecho > 0.04 ? (3.7 + 0.7 * hecho ** 0.7 - 3) : 0 },
    { unidad: '% de visitantes', base: '31 (día 1)', actual: n1(31 + 11 * hecho), obj: 'más alto el día 14', fraccion: hecho },
    { unidad: '% de vecinos', base: '54 (día 1)', actual: n1(54 + 9 * hecho), obj: 'más alto el día 14', fraccion: hecho },
    { unidad: 'al fondo', base: '0 €', actual: euros(euro), obj: '10 % por reserva y 1 empresa', fraccion: hecho },
  ]
  return PRUEBA_CONCEPTO.indicadores.slice(0, valores.length).map((k, i) => ({
    nombre: k.indicador, ...valores[i], fraccion: acota(valores[i].fraccion),
    detalle: `Base: ${k.base}. Objetivo (supuesto): ${k.objetivo}. ${k.comoSeMide}`,
  }))
}

export const euros = (n: number) => `${Math.round(n).toLocaleString('es-ES')} €`
