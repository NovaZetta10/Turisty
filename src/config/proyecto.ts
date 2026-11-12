// ─────────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN DEL PROYECTO · edita este archivo el día del reto
//  Todo lo que cambia de un hackathon a otro está aquí: el equipo, el reto,
//  los entregables y la preview. El resto de la web lee de este archivo.
// ─────────────────────────────────────────────────────────────────────────────

export const EQUIPO_NOMBRE = 'Nova'

export const EVENTO = {
  nombre: 'Hackathon Talento Canario · Turismo',
  organiza: 'Talento Canario · Gobierno de Canarias',
  fecha: '12 y 13 de noviembre de 2026 · Santa Cruz de Tenerife',
}

/**
 * El reto. Mientras `definido` sea false, la web muestra «Reto por anunciar».
 * Fuente: presentación oficial del reto 1 (Turismo de Tenerife), entregada al equipo el 12-11-2026.
 */
export const RETO = {
  definido: true,
  empresa: 'Turismo de Tenerife',
  titulo: 'Convivencia entre turismo y población local',
  pregunta: '¿Cómo podríamos convertir la relación entre población local y turistas en una convivencia que sea, para ambos, identidad, bienestar y orgullo compartido?',
  contexto: 'El debate sobre el turismo crece en Tenerife. Rara vez se cuestiona el turismo en sí: el malestar suele ir ligado a la vivienda y la movilidad, y faltan datos claros sobre lo que el turismo devuelve a la isla. Turismo de Tenerife busca acciones tangibles y sostenidas, no otra campaña de comunicación.',
  /** Los criterios oficiales no publican pesos: `peso` solo si la organización lo da. */
  criterios: [
    { nombre: 'Viabilidad de implementación (legal, medioambiental, económica y presupuestaria)' },
    { nombre: 'Involucración de la sociedad tinerfeña en su conjunto' },
    { nombre: 'Factor humano: la persona en el centro, no solo lo digital' },
    { nombre: 'Impacto del turismo responsable en la economía local' },
    { nombre: 'Innovación frente a lo que ya se hace' },
  ] as { nombre: string; peso?: number }[],
  entregablesPedidos: [
    'Diagnóstico: qué pasa realmente hoy en la convivencia y sus causas reales',
    'Plan de acción: hoja de ruta y plazos realistas, a medio y largo plazo',
    'Mapeo de responsabilidades: el papel de cada agente y cómo colaboran',
  ],
}

/** Vídeo corto de preview (el que se enseña en la sesión de feedback). Déjalo en public/video/. */
export const PREVIEW = {
  video: 'video/preview.mp4', // ruta relativa a public/
  poster: '', // opcional: 'img/preview-poster.jpg'
  titulo: 'Preview de la propuesta',
  texto: 'Un adelanto de lo que presentaremos: el problema, la idea y cómo se vería en manos del usuario.',
}

export type Miembro = {
  nombre: string
  rol: string
  estudios: string
  linkedin?: string
  github?: string
  web?: string
  foto?: string // ruta en public/img/ o se usa la foto de GitHub
}

/** Rellena con los datos del equipo. Los que estén vacíos se muestran como «Por completar». */
export const EQUIPO: Miembro[] = [
  {
    nombre: 'Esther Medina Quintero',
    rol: 'Data & AI Engineer · Project Manager',
    estudios: 'Ingeniería Informática (ULL); cursando el máster de Big Data',
    linkedin: 'https://www.linkedin.com/in/esther-medina-quintero',
    github: 'EstherMQuinteroDataX',
  },
  {
    nombre: 'Giulia',
    rol: 'Turismo',
    estudios: 'Grado en Turismo (cuarto curso)',
  },
  {
    nombre: 'Javier Domínguez Parras',
    rol: 'Telecomunicaciones & Ciberseguridad',
    estudios: 'Grado y máster en Ingeniería de Telecomunicaciones; cursando el máster de Ciberseguridad',
    // Búsqueda en LinkedIn: sustituir por la URL exacta del perfil (linkedin.com/in/…) cuando la tengamos
    linkedin: 'https://www.linkedin.com/search/results/people/?keywords=Javier%20Dom%C3%ADnguez%20Parras',
  },
  {
    nombre: 'Marcelo',
    rol: 'Telecomunicaciones, logística & cocina',
    estudios: 'FP media y superior de Telecomunicaciones, dos especializaciones en logística; cursando FP superior de Dirección de Cocina',
  },
]

export type Estado = 'listo' | 'en-curso' | 'pendiente'

export type Seccion = {
  id: string
  ruta: string
  titulo: string
  corto: string // texto del menú
  resumen: string
  estado: Estado
  visible: boolean // pon false para ocultar una sección que el reto no pida
}

/** Las secciones (tabs) de la web. Cambia el estado o la visibilidad según avance el reto. */
export const SECCIONES: Seccion[] = [
  // El `id` es el nombre del archivo de src/pages (en minúsculas); la `ruta` y el `titulo` pueden cambiar sin renombrar archivos.
  {
    id: 'investigacion',
    ruta: '/diagnostico',
    titulo: 'Diagnóstico',
    corto: 'Diagnóstico',
    resumen: 'Qué pasa de verdad hoy en la convivencia entre turistas y población local en Tenerife, y sus causas reales, con datos y con quien lo vive.',
    estado: 'en-curso',
    visible: true,
  },
  {
    id: 'prototipo',
    ruta: '/tenique',
    titulo: 'Tenique',
    corto: 'Tenique',
    resumen: 'Nuestra propuesta: experiencias reales que vecinos y visitantes comparten en toda la isla. Tenerife se cocina entre todos.',
    estado: 'en-curso',
    visible: true,
  },
  {
    id: 'viabilidad',
    ruta: '/plan',
    titulo: 'Plan de acción',
    corto: 'Plan de acción',
    resumen: 'Cómo se pone en marcha: hoja de ruta a corto, medio y largo plazo, piloto, costes, fondo de barrio, indicadores y riesgos.',
    estado: 'en-curso',
    visible: true,
  },
  {
    id: 'responsabilidades',
    ruta: '/responsabilidades',
    titulo: 'Mapeo de responsabilidades',
    corto: 'Responsabilidades',
    resumen: 'Qué papel juega cada agente (Turismo de Tenerife, Cabildo, empresas, vivienda vacacional, población local y turistas) y cómo colaboran.',
    estado: 'en-curso',
    visible: true,
  },
  {
    id: 'presentacion',
    ruta: '/presentacion',
    titulo: 'Presentación',
    corto: 'Presentación',
    resumen: 'Las diapositivas del pitch, en el navegador y a pantalla completa.',
    estado: 'en-curso',
    visible: true,
  },
  {
    // Integrado en Diagnóstico («A quién le pasa»); no es pestaña propia.
    id: 'usuarios',
    ruta: '/usuarios',
    titulo: 'Análisis de usuario',
    corto: 'Usuarios',
    resumen: 'Para quién es la solución: persona y journey.',
    estado: 'en-curso',
    visible: false,
  },
]

/** Ruta de una sección por su id (para enlaces y QR que no deben romperse si cambia la ruta). */
export const rutaDe = (id: string) => SECCIONES.find((s) => s.id === id)?.ruta ?? '/'

export const ESTADO_TXT: Record<Estado, string> = { listo: 'Listo', 'en-curso': 'En curso', pendiente: 'Pendiente' }

/** Prototipo: pega aquí la URL (Figma, otra web, Codespaces…) cuando exista. */
export const PROTOTIPO = {
  url: '#/app', // '#/app' = prototipo hecho en esta web (src/prototipo/pantallas.tsx); o una URL externa (Figma…)
  embebible: true, // false si la web no se puede mostrar dentro de un iframe
  notas: [] as string[],
}

export const REPO_URL = '' // p. ej. 'https://github.com/usuario/repo'

/** Dirección pública de la web (para los QR de la presentación). Vacía = se usa la dirección actual. */
export const SITIO_URL = ''

/**
 * Llamada a la acción final de la presentación: los 2–3 entregables que queremos que el jurado revise primero.
 * `id` es el de SECCIONES; `motivo` es una frase de por qué mirarlo.
 */
export const DESTACADOS: { id: string; motivo: string }[] = [
  { id: 'prototipo', motivo: 'Pruébalo: elige qué quieres sentir y descubre una experiencia real de Tenerife avalada por su barrio.' },
  { id: 'investigacion', motivo: 'El 62,2 % de los residentes cree que el turismo es beneficioso, pero solo el 35,9 % nota que mejora su vida (ISTAC, 2026).' },
  { id: 'viabilidad', motivo: 'Cómo se pone en marcha: piloto en 3 municipios, fondo pagado sobre todo por quien se beneficia del turismo, e hitos hasta el año 5.' },
]
