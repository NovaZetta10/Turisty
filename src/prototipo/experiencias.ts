import type { Texto } from './idioma'

// Carga de experiencias REALES desde src/data/experiencias.ts (lo mantiene el subagente de experiencias).
// Si el archivo no existe, la app compila igual y muestra estados vacíos.
// Precio de la plaza Tenique, valoración y aporte al fondo NO vienen de ese archivo: son valores de demostración,
// siempre marcados «ejemplo». Lo real (título, lugar, organizador, cuándo, precio según la fuente) se muestra tal cual.

export type Emocion = { id: string; es: string; en: string; icono: string }

/** Iconos del prototipo por emoción (si no está, se usa el que traiga el dato). */
const ICONO_EMOCION: Record<string, string> = {
  pertenencia: 'users', orgullo: 'star', raices: 'clock', sabor: 'fogon',
  calma: 'leaf', asombro: 'globe', adrenalina: 'mountain', celebracion: 'calendar',
}

/** Emociones provisionales: solo si src/data/usuarios.ts no exporta EMOCIONES. */
const EMOCIONES_PROVISIONALES: Emocion[] = [
  { id: 'nostalgia', es: 'Nostalgia', en: 'Nostalgia', icono: 'clock' },
  { id: 'adrenalina', es: 'Adrenalina', en: 'Adrenaline', icono: 'mountain' },
  { id: 'calma', es: 'Calma', en: 'Calm', icono: 'leaf' },
  { id: 'asombro', es: 'Asombro', en: 'Wonder', icono: 'star' },
  { id: 'pertenencia', es: 'Pertenencia', en: 'Belonging', icono: 'users' },
  { id: 'alegria', es: 'Alegría', en: 'Joy', icono: 'heart' },
]

export type Experiencia = {
  id: string
  titulo: Texto
  descripcion: Texto
  municipio: string
  lugar?: string
  organizador: string
  emociones: string[]
  /** Cuándo, según la fuente. */
  cuando?: string
  /** Precio según la fuente (texto). */
  precioFuente?: string
  idiomas?: string[]
  /** Vecinos y visitantes participan juntos. */
  mixta: boolean
  /** false = «Por verificar»: no entra en el flujo de visitantes; va a la cola de validación. */
  verificado: boolean
  fuente?: { titulo: string; url: string }
}

/** Valores de demostración (no reales). */
export type DatosEjemplo = { gratis: boolean; precio: number; precioResidente: number; aporte: number; valoracion: number; opiniones: number }

type Crudo = Record<string, unknown>
const modulos = import.meta.glob<Crudo>('../data/experiencias.ts', { eager: true })
const mod: Crudo = Object.values(modulos)[0] ?? {}

const txt = (v: unknown): Texto | undefined =>
  typeof v === 'string' ? v : v && typeof v === 'object' && 'es' in v ? { es: String((v as Crudo).es), en: String((v as Crudo).en ?? (v as Crudo).es) } : undefined
const str = (...vs: unknown[]) => vs.find((v) => typeof v === 'string' && v.trim()) as string | undefined

function normalizar(x: Crudo, i: number): Experiencia | null {
  const titulo = txt(x.titulo) ?? txt(x.nombre)
  const municipio = str(x.municipio)
  if (!titulo || !municipio) return null
  const f = (typeof x.fuente === 'object' && x.fuente ? x.fuente : {}) as Crudo
  const url = str(f.url, x.fuente, x.url)
  return {
    id: str(x.id) ?? `exp-${i}`,
    titulo,
    descripcion: txt(x.descripcion) ?? '',
    municipio,
    lugar: str(x.lugar),
    organizador: str(x.organizador, x.quienOfrece) ?? '',
    emociones: Array.isArray(x.emociones) ? x.emociones.map(String) : [],
    cuando: str(x.cuando),
    precioFuente: str(x.precio),
    idiomas: Array.isArray(x.idiomas) ? x.idiomas.map(String) : undefined,
    mixta: x.mixta !== false,
    verificado: x.verificado !== false,
    fuente: url ? { titulo: str(f.titulo) ?? url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0], url } : undefined,
  }
}

const TODAS: Experiencia[] = (Array.isArray(mod.EXPERIENCIAS) ? (mod.EXPERIENCIAS as Crudo[]) : [])
  .map(normalizar).filter((e): e is Experiencia => e !== null)

/** Experiencias verificadas: las que ve el visitante. */
export const EXPERIENCIAS = TODAS.filter((e) => e.verificado)
/** «Por verificar»: cola de validación de Turismo de Tenerife. */
export const POR_VALIDAR = TODAS.filter((e) => !e.verificado)

// Emociones: primero las de Usuarios (src/data/usuarios.ts), luego las de experiencias.ts; si no hay, las provisionales.
const modUsuarios: Crudo = Object.values(import.meta.glob<Crudo>('../data/usuarios.ts', { eager: true }))[0] ?? {}
const crudasEmo = [modUsuarios.EMOCIONES, mod.EMOCIONES].find((x) => Array.isArray(x) && x.length) as Crudo[] | undefined

export const EMOCIONES: Emocion[] = crudasEmo
  ? crudasEmo.map((e) => {
      const id = String(e.id)
      return { id, es: String(e.es ?? e.nombre ?? id), en: String(e.en ?? e.es ?? e.nombre ?? id), icono: ICONO_EMOCION[id] ?? String(e.icono ?? 'heart') }
    })
  : EMOCIONES_PROVISIONALES

/** true si las emociones aún son hipótesis (provisionales o con validada: false en Usuarios). */
export const emocionesProvisionales = !crudasEmo || crudasEmo.some((e) => e.validada === false)

/** Primero en las listas (variedad y reconocimiento local; propuesta del coordinador). Solo cuentan si están verificadas. */
const DESTACADAS = ['mercadillo-agricultor-tacoronte', 'embarcacion-carmen-puerto-de-la-cruz', 'juego-del-palo-la-laguna', 'voluntariado-acantilados-de-teno', 'puertas-abiertas-observatorio-teide']
const orden = (e: Experiencia) => { const i = DESTACADAS.indexOf(e.id); return i < 0 ? 99 : i }

export const porEmocion = (id?: string) => (id ? EXPERIENCIAS.filter((e) => e.emociones.includes(id)) : EXPERIENCIAS).slice().sort((a, b) => orden(a) - orden(b))
export const buscar = (id?: unknown) => TODAS.find((e) => e.id === id)

/** Valores de demostración estables por experiencia. NO son reales: la interfaz los marca siempre como «ejemplo». */
export function ejemplo(e: Experiencia): DatosEjemplo {
  let h = 0
  for (const c of e.id) h = (h * 31 + c.charCodeAt(0)) >>> 0
  const gratis = /grat|libre/i.test(e.precioFuente ?? '') && !/€/.test(e.precioFuente ?? '')
  const precio = gratis ? 0 : 10 + (h % 4) * 5 // 10–25 €
  return {
    gratis,
    precio,
    precioResidente: e.mixta ? Math.round(precio * 0.6) : precio,
    aporte: gratis ? 2 : Math.round(precio * 0.1 * 100) / 100, // 10 % al fondo; si es gratis, aporte voluntario
    valoracion: 4.3 + ((h >>> 3) % 7) / 10, // 4,3–4,9
    opiniones: 6 + ((h >>> 6) % 30),
  }
}

/** A quién va el fondo: el municipio (en los datos, `lugar` suele ser una plaza o un espacio, no un barrio). */
export const barrio = (e: Experiencia) => e.municipio
export const donde = (e: Experiencia) => (e.lugar ? `${e.lugar}, ${e.municipio}` : e.municipio)
