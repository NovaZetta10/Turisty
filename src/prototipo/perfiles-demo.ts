// Perfiles de la demo: pantalla de portada, datos de arranque y recorrido automático.
// `planes`: un plan de ejemplo (código TQ-EJEMPLO) sobre una experiencia real y en su fecha real, para que «Mis planes» y «Tu estancia» no salgan vacíos.
// Los usan «Los 4 perfiles» y el sendero de la experiencia (mini pantallas). Las experiencias citadas son reales y verificadas.

export type PerfilDemo = {
  id: 'vecino' | 'turista' | 'anfitrion' | 'turismo'
  nombre: string
  /** Claves del recorrido en JOURNEY (src/data/usuarios.ts) que corresponden a este perfil. */
  journey: string[]
  pantalla: string
  datos: Record<string, unknown>
  recorrido: string[]
}

export const PERFILES_DEMO: PerfilDemo[] = [
  { id: 'vecino', nombre: 'Vecino', journey: ['vecina', 'vecino'], pantalla: 'sentir', datos: { perfil: 'vecino', municipio: 'Tacoronte', emocion: 'sabor', experiencia: 'mercadillo-agricultor-tacoronte', planes: [{ id: 'mercadillo-agricultor-tacoronte', codigo: 'TQ-EJEMPLO', fecha: '2026-11-14', franja: '10:00', personas: 2, modo: 'pago' }] }, recorrido: ['sentir', 'lista', 'experiencia', 'barrio'] },
  { id: 'turista', nombre: 'Visitante', journey: ['visitante', 'turista'], pantalla: 'sentir', datos: { perfil: 'turista', emocion: 'celebracion', experiencia: 'embarcacion-carmen-puerto-de-la-cruz', planes: [{ id: 'cacharros-puerto-de-la-cruz', codigo: 'TQ-EJEMPLO', fecha: '2026-11-29', franja: '17:00', personas: 2, modo: 'pago' }] }, recorrido: ['sentir', 'lista', 'experiencia', 'estancia'] },
  { id: 'anfitrion', nombre: 'Anfitrión', journey: ['anfitrion', 'anfitriona'], pantalla: 'anfitrion', datos: { perfil: 'anfitrion', municipio: 'Tacoronte', emocion: 'raices', experiencia: 'juego-del-palo-la-laguna' }, recorrido: ['anfitrion', 'experiencia', 'barrio'] },
  { id: 'turismo', nombre: 'Turismo de Tenerife', journey: ['turismo', 'tdt', 'turismo-de-tenerife'], pantalla: 'turismo', datos: { perfil: 'turismo', municipio: 'Puerto de la Cruz', experiencia: 'puertas-abiertas-observatorio-teide' }, recorrido: ['turismo', 'barrio', 'experiencia'] },
]
