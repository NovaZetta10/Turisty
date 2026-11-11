// Presentación · plantilla genérica de pitch.
// Pitch de 5 minutos: portada del reto → pregunta-gancho → acción 1 (probar la demo) → problema → solución → acción 2 (qué revisar).
// Si hace falta, hay más tipos de diapositiva (pasos, cifras, columnas): añádelas aquí sin tocar el código.
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
  { tipo: 'cta', kicker: 'Para el jurado', titulo: 'Todo está aquí. Si solo tenéis cinco minutos, empezad por esto:', texto: 'Escanea para abrir todos los entregables.' },
]
