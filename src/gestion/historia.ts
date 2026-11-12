// «Un día en Tenique»: los cuatro puntos de vista de un mismo día, deducidos de los sucesos simulados.
// Títulos, municipios y anfitriones son del catálogo real; todo lo demás (quién, cuándo, valoraciones) es simulado.

import { anfitrion, buscar } from '../prototipo/experiencias'
import { SUCESOS, TARJETAS, euros, limpio, reloj, vidaDe, type Filtros, type Reserva } from './datos-simulados'

export type Voz = 'vecino' | 'visitante' | 'anfitrion' | 'turismo'
export const VOCES: { id: Voz; titulo: string; sub: string }[] = [
  { id: 'vecino', titulo: 'Vecinos', sub: 'Quien vive en el barrio' },
  { id: 'visitante', titulo: 'Visitantes', sub: 'Quien reserva' },
  { id: 'anfitrion', titulo: 'Anfitriones y sector', sub: 'Quien ofrece y aporta' },
  { id: 'turismo', titulo: 'Turismo de Tenerife', sub: 'Garantía y fondo' },
]

export type Paso = { h: number; texto: string }
export type Item = { clave: string; cadena: string; h: number; voz: Voz; texto: string; muni: string; titulo?: string; paso: string }

const estrellas = (id: number) => (id % 7 === 0 ? 3 : id % 3 === 0 ? 5 : 4)
const quien = (r: Reserva) => (r.perfil === 'vecinos' ? 'Un vecino de la isla' : r.perfil === 'jovenes' ? 'Una persona joven' : 'Una visitante')
const pers = (n: number) => `${n} ${n === 1 ? 'persona' : 'personas'}`

function pasosReserva(r: Reserva): Paso[] {
  const v = vidaDe(r)
  return [
    { h: r.h, texto: `${quien(r)} reserva «${r.titulo}» (${pers(r.personas)})` },
    { h: r.h, texto: `El fondo de ${r.muni} suma ${euros(r.euros)} de esa reserva` },
    { h: v.vive, texto: `La viven en ${r.muni}, con quien la ofrece` },
    { h: v.valora, texto: `Valoran la experiencia: ${estrellas(r.id)} de 5` },
  ]
}
function pasosTarjeta(id: string): Paso[] {
  const t = TARJETAS.find((x) => x.id === id)
  if (!t) return []
  const a = t.anfitrion
  return [
    { h: t.tiempos[0], texto: `${a} propone «${t.titulo}» en ${t.muni}` },
    { h: t.tiempos[1], texto: `Turismo de Tenerife revisa «${t.titulo}»` },
    { h: t.tiempos[2], texto: `Turismo de Tenerife da la garantía a «${t.titulo}»` },
    { h: t.tiempos[3], texto: `«${t.titulo}» ya se puede reservar` },
  ]
}

/** Sucesos del día entre `desde` y `hasta`, filtrados como el resto del panel. */
export function itemsDia(desde: number, hasta: number, f: Filtros): Item[] {
  const out: Item[] = []
  const ok = (emocion: string) => f.emocion === 'todas' || f.emocion === emocion
  for (const t of TARJETAS) {
    if (!(f.emocion === 'todas' || t.emociones.includes(f.emocion)) || (f.perfil === 'jovenes' && !t.joven)) continue
    const p = pasosTarjeta(t.id)
    const voz: Voz[] = ['anfitrion', 'turismo', 'turismo', 'visitante']
    p.forEach((x, i) => { if (x.h >= desde && x.h <= hasta) out.push({ clave: `c${t.id}-${i}`, cadena: `c${t.id}`, h: x.h, voz: voz[i], texto: x.texto, muni: t.muni, titulo: t.titulo, paso: ETAS[i] }) })
  }
  for (const s of SUCESOS) {
    if (s.tipo === 'reserva') {
      if (f.perfil !== 'todos' && s.perfil !== f.perfil) continue
      if (!ok(s.emocion)) continue
      const v = vidaDe(s)
      const vozPers: Voz = s.perfil === 'vecinos' ? 'vecino' : 'visitante'
      const p = pasosReserva(s)
      const base = { cadena: `r${s.id}`, muni: s.muni, titulo: s.titulo }
      if (s.h >= desde && s.h <= hasta) {
        out.push({ ...base, clave: `r${s.id}-0`, h: s.h, voz: vozPers, texto: p[0].texto, paso: 'Reserva' })
        out.push({ ...base, clave: `r${s.id}-a`, h: s.h, voz: 'anfitrion', texto: `${anfitrionDe(s)[0].toUpperCase() + anfitrionDe(s).slice(1)} recibe una reserva de ${pers(s.personas)}`, paso: 'Reserva' })
        out.push({ ...base, clave: `r${s.id}-1`, h: s.h, voz: 'turismo', texto: p[1].texto, paso: 'Fondo' })
      }
      if (v.vive >= desde && v.vive <= hasta) out.push({ ...base, clave: `r${s.id}-2`, h: v.vive, voz: vozPers, texto: `Viven «${s.titulo}» en ${s.muni}`, paso: 'La viven' })
      if (v.valora >= desde && v.valora <= hasta) out.push({ ...base, clave: `r${s.id}-3`, h: v.valora, voz: vozPers, texto: `Valoran «${s.titulo}»: ${estrellas(s.id)} de 5`, paso: 'Valoración' })
    } else if (s.tipo === 'aporte') {
      if (s.h >= desde && s.h <= hasta) out.push({ clave: `a${s.id}`, cadena: `a${s.id}`, h: s.h, voz: 'anfitrion', texto: `Una empresa turística aporta ${euros(s.euros)} al fondo de ${s.muni}`, muni: s.muni, paso: 'Aportación' })
    } else if (s.h >= desde && s.h <= hasta) {
      out.push({ clave: `p${s.id}`, cadena: `p${s.id}`, h: s.h, voz: 'turismo', texto: `Proyecto pagado con el fondo de ${s.muni}: ${s.titulo} (${euros(s.coste)})`, muni: s.muni, paso: 'Proyecto' })
    }
  }
  return out.sort((a, b) => b.h - a.h)
}
const ETAS = ['Propuesta', 'En revisión', 'Garantía', 'Activa']
const anfitrionDe = (r: Reserva) => { const e = buscar(r.expId); return e ? limpio(anfitrion(e)) : 'El anfitrión' }

/** Todos los pasos de la cadena de un suceso (también los que aún no han pasado). */
export function detalleCadena(cadena: string): { titulo: string; muni?: string; pasos: Paso[] } | undefined {
  const tipo = cadena[0], id = cadena.slice(1)
  if (tipo === 'c') { const t = TARJETAS.find((x) => x.id === id); return t ? { titulo: t.titulo, muni: t.muni, pasos: pasosTarjeta(id) } : undefined }
  const s = SUCESOS.find((x) => x.id === Number(id))
  if (!s) return undefined
  if (s.tipo === 'reserva') return { titulo: s.titulo, muni: s.muni, pasos: pasosReserva(s) }
  if (s.tipo === 'aporte') return { titulo: `Aportación al fondo de ${s.muni}`, muni: s.muni, pasos: [{ h: s.h, texto: `Una empresa turística aporta ${euros(s.euros)}` }, { h: s.h, texto: 'Se publica en la app, en la cuenta del municipio' }] }
  return { titulo: s.titulo, muni: s.muni, pasos: [{ h: s.h, texto: `Los vecinos de ${s.muni} proponen y votan; se paga ${euros(s.coste)} del fondo` }, { h: s.h, texto: 'Se publica con su coste y un cartel en la calle' }] }
}

export const horaTxt = (h: number) => { const r = reloj(h); return `Día ${r.dia} · ${r.hora}` }
