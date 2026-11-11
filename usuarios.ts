// Usuarios · buyer personas y user journey.
// Estructura lista y datos vacíos: se rellenan cuando sepamos el reto.
// Marca `validado: true` cuando una persona o paso se haya contrastado con usuarios reales.

export type Persona = {
  id: string
  nombre: string
  edad: number
  origen: string
  perfil: string
  contexto: string
  digital: string
  necesidades: string[]
  frenos: string[]
  motivaciones: string[]
  frase: string
  canales: string[]
  validado: boolean
}

/**
 * Vacío a propósito: se rellena cuando conozcamos el reto. Ejemplo de una persona:
 * {
 *   id: 'familia', nombre: 'Nombre', edad: 40, origen: 'Ciudad, país',
 *   perfil: 'Quién es', contexto: 'En qué situación usa la solución', digital: 'Cómo usa la tecnología',
 *   necesidades: ['…'], frenos: ['…'], motivaciones: ['…'],
 *   frase: '«Una cita que lo resuma.»', canales: ['…'], validado: false,
 * }
 */
export const PERSONAS: Persona[] = []

export type Fase = 'Inspiración' | 'Planificación' | 'Reserva' | 'Llegada' | 'Estancia' | 'Regreso'
export const FASES: Fase[] = ['Inspiración', 'Planificación', 'Reserva', 'Llegada', 'Estancia', 'Regreso']

export type Emocion = -2 | -1 | 0 | 1 | 2

export type PasoJourney = {
  fase: Fase
  hace: string
  piensa: string
  dolor: string
  oportunidad: string
  emocion: Emocion
  canales: string[]
}

/** Journey genérico del turista en Canarias. Se duplica y adapta por persona cuando sepamos el reto. */
/**
 * Un journey por persona, con la clave del `id` de la persona. Vacío hasta conocer el reto. Ejemplo de un paso:
 * { fase: 'Planificación', hace: '…', piensa: '…', dolor: '…', oportunidad: '…', emocion: -1, canales: ['…'] }
 */
export const JOURNEY: Record<string, PasoJourney[]> = {}

export const EMOCION_TXT: Record<Emocion, string> = { [-2]: 'Frustración', [-1]: 'Duda', 0: 'Neutral', 1: 'Ilusión', 2: 'Entusiasmo' }
