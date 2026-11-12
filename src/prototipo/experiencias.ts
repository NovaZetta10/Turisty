import type { Texto } from './idioma'

// Carga de experiencias REALES desde src/data/experiencias.ts (lo mantiene el subagente de experiencias).
// Si el archivo no existe, la app compila igual y muestra estados vacíos.
// Precio de la plaza Tenique, valoración y aporte al fondo NO vienen de ese archivo: son valores de demostración,
// siempre marcados «ejemplo». Lo real (título, lugar, organizador, cuándo, precio según la fuente) se muestra tal cual.

export type Textura = 'picon' | 'calado' | 'ondas'
/** `color`: degradado propio [claro, oscuro], texto blanco encima (≥ 5:1 en ambos extremos). */
export type Emocion = { id: string; es: string; en: string; icono: string; color: [string, string]; textura: Textura; frase?: string; fraseEn?: string }

/** Traducción del «ejemplo» de cada emoción de Usuarios (que solo está en español). */
const FRASE_EN: Record<string, string> = {
  pertenencia: 'An afternoon with a residents’ association',
  orgullo: 'A craft or tradition told by those who keep it alive',
  raices: 'Neighbourhood stories from those who lived them',
  sabor: 'Cooking at home or in a local spot',
  calma: 'A walk along a rural path with a local',
  asombro: 'Looking at the sky or the landscape with someone from the area',
  adrenalina: 'A sea or mountain activity with a local club',
  celebracion: 'Living a neighbourhood festival from the inside',
}

/** Paleta de las emociones, en armonía con la marca (marino #27336D, azul #1A4F9D, rojo #E20612): blanco encima ≥ 6:1. */
const ESTILO_EMOCION: Record<string, { color: [string, string]; textura: Textura }> = {
  pertenencia: { color: ['#c8050f', '#8a0a14'], textura: 'picon' },
  orgullo: { color: ['#27336d', '#151c45'], textura: 'calado' },
  raices: { color: ['#6e4f37', '#46301f'], textura: 'calado' },
  sabor: { color: ['#a3470c', '#6b2e07'], textura: 'picon' },
  calma: { color: ['#2e6e5c', '#1b4a3d'], textura: 'ondas' },
  asombro: { color: ['#1a4f9d', '#10346b'], textura: 'picon' },
  adrenalina: { color: ['#0f6b85', '#0a4556'], textura: 'ondas' },
  celebracion: { color: ['#7a3f96', '#4f2566'], textura: 'calado' },
}
const ESTILO_POR_DEFECTO = { color: ['var(--app-accent)', 'var(--app-ink)'] as [string, string], textura: 'picon' as Textura }

/** Estilo de marca (cabeceras de inicio, barrio y estancia): solo tokens --app-*. */
export const MARCA: Emocion = { id: 'marca', es: 'Tenique', en: 'Tenique', icono: 'fogon', color: ['var(--app-accent)', 'var(--app-ink)'], textura: 'calado' }
const estilo = (id: string) => ESTILO_EMOCION[id] ?? ESTILO_POR_DEFECTO

/** Iconos del prototipo por emoción (si no está, se usa el que traiga el dato). */
const ICONO_EMOCION: Record<string, string> = {
  pertenencia: 'users', orgullo: 'star', raices: 'clock', sabor: 'fogon',
  calma: 'leaf', asombro: 'globe', adrenalina: 'mountain', celebracion: 'calendar',
}

/** Emociones provisionales: solo si src/data/usuarios.ts no exporta EMOCIONES. */
const EMOCIONES_PROVISIONALES: Emocion[] = [
  { id: 'nostalgia', es: 'Nostalgia', en: 'Nostalgia', icono: 'clock', ...estilo('nostalgia') },
  { id: 'adrenalina', es: 'Adrenalina', en: 'Adrenaline', icono: 'mountain', ...estilo('adrenalina') },
  { id: 'calma', es: 'Calma', en: 'Calm', icono: 'leaf', ...estilo('calma') },
  { id: 'asombro', es: 'Asombro', en: 'Wonder', icono: 'star', ...estilo('asombro') },
  { id: 'pertenencia', es: 'Pertenencia', en: 'Belonging', icono: 'users', ...estilo('pertenencia') },
  { id: 'alegria', es: 'Alegría', en: 'Joy', icono: 'heart', ...estilo('alegria') },
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
  /** Fiesta, romería o acto religioso o institucional: no se vende; se vive acompañado por un vecino (gratis o donación voluntaria). */
  fiesta: boolean
  fuente?: { titulo: string; url: string }
  /** Cumple el criterio «para jóvenes» (CRITERIO_JOVENES, src/data/usuarios.ts). Lo etiqueta Experiencias. */
  paraJovenes?: boolean
  /** Qué criterios cumple (texto de Experiencias, en español). */
  motivoJovenes?: string
}

/** Valores de demostración (no reales). */
export type DatosEjemplo = { gratis: boolean; precio: number; precioResidente: number; aporte: number; valoracion: number; opiniones: number }

type Crudo = Record<string, unknown>
const modulos = import.meta.glob<Crudo>('../data/experiencias.ts', { eager: true })
const mod: Crudo = Object.values(modulos)[0] ?? {}

const txt = (v: unknown): Texto | undefined =>
  typeof v === 'string' ? v : v && typeof v === 'object' && 'es' in v ? { es: String((v as Crudo).es), en: String((v as Crudo).en ?? (v as Crudo).es) } : undefined
const str = (...vs: unknown[]) => vs.find((v) => typeof v === 'string' && v.trim()) as string | undefined

/** Fiestas, romerías y actos religiosos o institucionales (por el título). */
const FIESTA = /fiesta|romer[ií]a|embarcaci[oó]n|bajada|peregrinaci[oó]n|carnaval|corazones|tablas de san|alfombras|corpus/i

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
    fiesta: FIESTA.test(String(x.titulo ?? '')),
    paraJovenes: x.paraJovenes === true,
    motivoJovenes: str(x.motivoJovenes),
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
      return { id, es: String(e.es ?? e.nombre ?? id), en: String(e.en ?? e.es ?? e.nombre ?? id), icono: ICONO_EMOCION[id] ?? String(e.icono ?? 'heart'), ...estilo(id), frase: typeof e.ejemplo === 'string' ? e.ejemplo : undefined, fraseEn: typeof e.ejemploEn === 'string' ? e.ejemploEn : FRASE_EN[id] }
    })
  : EMOCIONES_PROVISIONALES

/** true si las emociones aún son hipótesis (provisionales o con validada: false en Usuarios). */
export const emocionesProvisionales = !crudasEmo || crudasEmo.some((e) => e.validada === false)

/** Primero en las listas (variedad y reconocimiento local; propuesta del coordinador). Solo cuentan si están verificadas. */
const DESTACADAS = ['mercadillo-agricultor-tacoronte', 'juego-del-palo-la-laguna', 'casa-del-vino-el-sauzal', 'queserias-teno-alto', 'voluntariado-acantilados-de-teno', 'puertas-abiertas-observatorio-teide', 'embarcacion-carmen-puerto-de-la-cruz']
const orden = (e: Experiencia) => { const i = DESTACADAS.indexOf(e.id); return i < 0 ? 99 : i }

export const porEmocion = (id?: string) => (id ? EXPERIENCIAS.filter((e) => e.emociones.includes(id)) : EXPERIENCIAS).slice().sort((a, b) => orden(a) - orden(b))
export const buscar = (id?: unknown) => TODAS.find((e) => e.id === id)

/** Valores de demostración estables por experiencia. NO son reales: la interfaz los marca siempre como «ejemplo». */
export function ejemplo(e: Experiencia): DatosEjemplo {
  let h = 0
  for (const c of e.id) h = (h * 31 + c.charCodeAt(0)) >>> 0
  const gratis = e.fiesta || (/grat|libre/i.test(e.precioFuente ?? '') && !/€/.test(e.precioFuente ?? ''))
  const precio = gratis ? 0 : 10 + (h % 4) * 5 // 10–25 €
  return {
    gratis,
    precio,
    precioResidente: gratis ? 0 : 3, // simbólico; o aportar tiempo (voluntariado o hacer de anfitrión)
    aporte: gratis ? 2 : Math.round(precio * 0.1 * 100) / 100, // 10 % al fondo; si es gratis, aporte voluntario
    valoracion: 4.3 + ((h >>> 3) % 7) / 10, // 4,3–4,9
    opiniones: 6 + ((h >>> 6) % 30),
  }
}

/** A quién va el fondo: el municipio (en los datos, `lugar` suele ser una plaza o un espacio, no un barrio). */
export const barrio = (e: Experiencia) => e.municipio
export const donde = (e: Experiencia) => (e.lugar ? `${e.lugar}, ${e.municipio}` : e.municipio)

/** Emoción por id (o la primera de una experiencia), con su estilo. */
export const emocion = (id?: unknown) => EMOCIONES.find((e) => e.id === id)
export const emocionDe = (e: Experiencia) => emocion(e.emociones[0]) ?? EMOCIONES[0]

/** Quién la ofrece, en corto (antes de «;» o «(»), e iniciales para el avatar. */
export const anfitrion = (e: Experiencia) => (e.organizador.split(/[;(]/)[0] || e.organizador).trim()
export const iniciales = (texto: string) =>
  texto.split(/\s+/).filter((p) => /^[A-ZÁÉÍÓÚÑ]/.test(p)).slice(0, 2).map((p) => p[0]).join('') || texto.slice(0, 1).toUpperCase()

/** Icono de portada según el tipo de experiencia (por el título); si no encaja, el de su emoción. */
export function iconoDe(e: Experiencia): string | undefined {
  const x = typeof e.titulo === 'string' ? e.titulo : e.titulo.es
  if (/mercad|agromercado|recova/i.test(x)) return 'cesta'
  if (/vino|cata|bodega/i.test(x)) return 'copa'
  if (/observatorio|cielo|estrell/i.test(x)) return 'star'
  if (/pesca|pescador|mar|embarcaci/i.test(x)) return 'ola'
  if (/voluntariado|reforesta|monteverde|sendero/i.test(x)) return 'leaf'
  if (FIESTA.test(x)) return 'calendar'
  return undefined
}

/** Emoción para la portada: la primera distinta de `evitar` (así una lista filtrada no sale toda del mismo color). */
export const emocionPortada = (e: Experiencia, evitar?: unknown) =>
  emocion(e.emociones.find((id) => id !== evitar) ?? e.emociones[0]) ?? EMOCIONES[0]
