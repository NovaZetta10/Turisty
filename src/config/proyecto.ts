// ─────────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN DEL PROYECTO · edita este archivo el día del reto
//  Todo lo que cambia de un hackathon a otro está aquí: el equipo, el reto,
//  los entregables y la preview. El resto de la web lee de este archivo.
// ─────────────────────────────────────────────────────────────────────────────

export const EQUIPO_NOMBRE = 'Nova'

export const EVENTO = {
  nombre: 'Hackathon Talento Canario · Turismo',
  organiza: 'Talento Canario · Gobierno de Canarias',
  fecha: 'Noviembre de 2026',
}

/** El reto. Mientras `definido` sea false, la web muestra «Reto por anunciar». */
export const RETO = {
  definido: false,
  empresa: 'Empresa por anunciar',
  titulo: 'El reto se anuncia el jueves',
  pregunta: '¿Cómo podemos…? (copia aquí la pregunta del reto tal cual la plantea la empresa)',
  contexto: 'Resumen del reto en dos o tres frases: qué problema tiene la empresa, para quién y por qué ahora.',
  criterios: [] as { nombre: string; peso: number }[], // p. ej. { nombre: 'Experiencia de usuario', peso: 40 }
  entregablesPedidos: [] as string[], // copia la lista oficial de entregables
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
  {
    id: 'investigacion',
    ruta: '/investigacion',
    titulo: 'Investigación previa',
    corto: 'Investigación',
    resumen: 'El turismo en Canarias en 2026: cifras con fuente, debates abiertos, retos tipo, quién innova y referentes.',
    estado: 'listo',
    visible: true,
  },
  {
    id: 'usuarios',
    ruta: '/usuarios',
    titulo: 'Usuarios: buyer persona y user journey',
    corto: 'Usuarios',
    resumen: 'Para quién es la solución: perfiles, necesidades, frenos y el recorrido antes, durante y después.',
    estado: 'en-curso',
    visible: true,
  },
  {
    id: 'prototipo',
    ruta: '/prototipo',
    titulo: 'Prototipo',
    corto: 'Prototipo',
    resumen: 'La solución, navegable. Se enlaza aquí en cuanto exista.',
    estado: 'pendiente',
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
]

export const ESTADO_TXT: Record<Estado, string> = { listo: 'Listo', 'en-curso': 'En curso', pendiente: 'Pendiente' }

/** Prototipo: pega aquí la URL (Figma, otra web, Codespaces…) cuando exista. */
export const PROTOTIPO = {
  url: '', // p. ej. 'https://www.figma.com/proto/…' o '#/app'
  embebible: true, // false si la web no se puede mostrar dentro de un iframe
  notas: [] as string[],
}

export const REPO_URL = '' // p. ej. 'https://github.com/usuario/repo'
