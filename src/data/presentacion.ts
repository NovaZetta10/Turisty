// Presentación · plantilla genérica de pitch.
// Estructura: portada del reto → pregunta-gancho → acción 1 (probar la demo) → explicación → acción 2 (qué revisar).
// Lo que va entre [corchetes] se sustituye cuando conozcamos el reto. Los tipos admitidos están en Slide.

export type Slide =
  /** Empresa, reto y fecha (salen de RETO y EVENTO en la configuración). Sin nombre de equipo. */
  | { tipo: 'portada' }
  /** La pregunta que engancha y el remate que aparece después. */
  | { tipo: 'pregunta'; antes: string; destacado: string; despues?: string; remate: string }
  /** Primer punto de acción: QR a la demo para que el jurado la pruebe mientras hablamos. */
  | { tipo: 'accion'; kicker: string; titulo: string; texto: string; destino: 'prototipo' | 'web' }
  | { tipo: 'columnas'; kicker: string; titulo: string; lead?: string; columnas: { titulo: string; texto: string }[] }
  | { tipo: 'pasos'; kicker: string; titulo: string; pasos: { titulo: string; texto: string }[] }
  | { tipo: 'cifras'; kicker: string; titulo: string; cifras: { valor: string; etiqueta: string }[]; fuente?: string }
  | { tipo: 'frase'; kicker: string; titulo: string; lead?: string }
  /** Último punto de acción: dónde están los entregables y cuáles revisar primero (DESTACADOS en la configuración). */
  | { tipo: 'cta'; kicker: string; titulo: string; texto: string }

export const SLIDES: Slide[] = [
  { tipo: 'portada' },
  { tipo: 'pregunta', antes: '¿Y si te dijéramos que', destacado: '[resultado concreto para el usuario]', despues: 'sin [lo que hoy lo impide]?', remate: 'Te lo demostramos.' },
  { tipo: 'accion', kicker: 'Ahora mismo', titulo: 'Saca el móvil y pruébalo mientras te lo contamos.', texto: '[Qué puede hacer en 30 segundos: el gesto principal de la demo].', destino: 'prototipo' },
  {
    tipo: 'columnas',
    kicker: 'El problema',
    titulo: '[Usuario] hoy [lo que le pasa], y le cuesta [tiempo, dinero o experiencia].',
    columnas: [
      { titulo: 'Qué pasa', texto: '[El dolor, con un dato o una cita real].' },
      { titulo: 'A quién', texto: '[El usuario principal y el momento en que le ocurre].' },
      { titulo: 'Qué cuesta', texto: '[El impacto para la empresa].' },
    ],
  },
  { tipo: 'frase', kicker: 'La solución', titulo: '[Nombre]: [qué hace, en una frase que se entienda a la primera].', lead: '[Para quién] · [por qué es distinta de lo que existe].' },
  {
    tipo: 'pasos',
    kicker: 'Cómo funciona',
    titulo: 'Tres pasos, desde el punto de vista del usuario.',
    pasos: [
      { titulo: '[Paso 1]', texto: '[Cuándo y dónde entra en contacto].' },
      { titulo: '[Paso 2]', texto: '[La acción principal, en un gesto].' },
      { titulo: '[Paso 3]', texto: '[Lo que gana él y lo que gana la empresa].' },
    ],
  },
  {
    tipo: 'cifras',
    kicker: 'Impacto',
    titulo: 'Qué mediremos para saber que funciona.',
    cifras: [
      { valor: '[KPI 1]', etiqueta: '[adopción o uso]' },
      { valor: '[KPI 2]', etiqueta: '[ingreso o ahorro]' },
      { valor: '[KPI 3]', etiqueta: '[satisfacción o sostenibilidad]' },
    ],
    fuente: '[Hipótesis a validar en el piloto / fuente del dato].',
  },
  {
    tipo: 'columnas',
    kicker: 'Viabilidad',
    titulo: 'Cómo lo pondríamos en marcha.',
    columnas: [
      { titulo: 'Piloto', texto: '[Dónde, cuánto tiempo y con quién].' },
      { titulo: 'Coste', texto: '[Implantación y coste mensual estimados].' },
      { titulo: 'Siguiente paso', texto: '[Criterio para escalar o parar].' },
    ],
  },
  { tipo: 'cta', kicker: 'Para el jurado', titulo: 'Todo está aquí. Si solo tenéis cinco minutos, empezad por esto:', texto: 'Escanea para abrir todos los entregables.' },
]
