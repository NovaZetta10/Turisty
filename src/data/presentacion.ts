// Presentación · pitch de Tenique (reto 1 de Turismo de Tenerife: convivencia entre turismo y población local).
// Pitch de 5 minutos: portada del reto → pregunta-gancho → acción 1 (probar la demo) → problema (cifras) → diagnóstico → Tenique → acción 2 (qué revisar).
// Guion y tiempos en docs/pitch-guion.md. Lo que va entre [corchetes] depende de otros subagentes (cifras, causa nueva, mapeo):
// no se presenta así. Solo cifras verificadas por Investigación, con su fuente en el pie de la diapositiva.

export type Slide =
  /** Empresa, reto y fecha (salen de RETO y EVENTO en la configuración). Sin nombre de equipo. */
  | { tipo: 'portada' }
  /** La pregunta que engancha y el remate que aparece después. */
  | { tipo: 'pregunta'; antes: string; destacado: string; despues?: string; remate: string }
  /** Primer punto de acción: QR a la demo para que el jurado la pruebe mientras hablamos. */
  | { tipo: 'accion'; kicker: string; titulo: string; texto: string; destino: 'prototipo' | 'web' }
  | { tipo: 'columnas'; kicker: string; titulo: string; lead?: string; columnas: { titulo: string; texto: string }[]; fuente?: string }
  | { tipo: 'pasos'; kicker: string; titulo: string; pasos: { titulo: string; texto: string }[] }
  | { tipo: 'cifras'; kicker: string; titulo: string; cifras: { valor: string; etiqueta: string }[]; fuente?: string }
  | { tipo: 'frase'; kicker: string; titulo: string; lead?: string }
  /** Último punto de acción: dónde están los entregables y cuáles revisar primero (DESTACADOS en la configuración). */
  | { tipo: 'cta'; kicker: string; titulo: string; texto: string }

export const SLIDES: Slide[] = [
  { tipo: 'portada' },
  {
    // Versiones alternativas en docs/pitch-guion.md
    tipo: 'pregunta',
    antes: '¿Y si pudiéramos haceros sentir',
    destacado: 'el orgullo de enseñar vuestro barrio',
    despues: 'a quien viene a conocerlo?',
    remate: 'Os lo demostramos: sacad el móvil.',
  },
  {
    tipo: 'accion',
    kicker: 'Ahora mismo',
    titulo: 'Sacad el móvil y probadlo mientras os lo contamos.',
    texto: '«Tenerife! despierta emociones». Tenique las hace compartidas: elegid qué queréis sentir y descubrid experiencias reales de la isla.',
    destino: 'prototipo',
  },
  {
    // Cifras verificadas de Investigación: FUENTES 49 (src/data/investigacion.ts).
    tipo: 'cifras',
    kicker: 'El problema',
    titulo: 'El turismo es bueno para la isla, pero la mayoría no lo nota en su día a día.',
    cifras: [
      { valor: '62,2 %', etiqueta: 'cree que el turismo ha sido muy beneficioso para la isla' },
      { valor: '35,9 %', etiqueta: 'cree que mejora su calidad de vida' },
      { valor: '31,4 %', etiqueta: 'cree que mejora los servicios de su comarca' },
    ],
    fuente: 'Residentes en Tenerife. Fuente: ISTAC, Encuesta de Hábitos y Confianza Socioeconómica (ECOSOC), 2.º trimestre de 2026.',
  },
  {
    // Cifras verificadas de Investigación: FUENTES 49, 50 y 51.
    tipo: 'columnas',
    kicker: 'El diagnóstico',
    titulo: 'El 53,9 % ve tensiones entre residentes y turistas. En 2024 era el 49,6 %.',
    lead: 'El malestar rara vez es contra el turismo: va ligado a la vivienda, la movilidad y a no ver el retorno.',
    columnas: [
      { titulo: 'Vivienda y movilidad', texto: 'Tenique no las resuelve. Vivienda: Gobierno de Canarias y ayuntamientos. Movilidad: Cabildo, ayuntamientos y Gobierno de Canarias.' },
      { titulo: 'Lo que no llega', texto: 'Solo el 23,1 % de los hogares tiene vínculo económico con el turismo: 44,6 % en el sur y 11,5 % en el área metropolitana.' },
      { titulo: 'Lo que se comparte hoy', texto: 'Casi todo son fiestas y actividades institucionales. Apenas hay vecinos que hagan de anfitriones.' },
    ],
    fuente: 'Media de Canarias en 2026: 43,4 %. Fuentes: ISTAC, ECOSOC, 2.º trimestre de 2024 y 2026 · competencias: Estatuto de Autonomía de Canarias (art. 143), leyes 6/2025, 8/2015 y 7/1985 · reto 1 de Turismo de Tenerife (2026) · catálogo de experiencias reales del equipo, 12-11-2026.',
  },
  {
    tipo: 'columnas',
    kicker: 'La solución · Tenique',
    titulo: 'Un fogón no se sostiene con una piedra ni con dos.',
    lead: 'Una experiencia solo entra si la avalan quien cuida el destino, quien vive al lado y quien la ha vivido. Lo pagan sobre todo quienes viven del turismo; deciden los vecinos; se prueba 6 meses en 3 municipios y se cambia lo que no funcione.',
    columnas: [
      { titulo: 'Garantía Turismo de Tenerife', texto: 'Quien cuida el destino comprueba que la experiencia es real y cumple las normas.' },
      { titulo: 'Avalada por el barrio', texto: 'Los vecinos le dan su sello antes de que entre: es de aquí y el barrio está de acuerdo.' },
      { titulo: 'Valorada por quien la vivió', texto: 'Todas las personas que asistieron, vecinos y visitantes, la puntúan después. Así se mantiene.' },
    ],
    fuente: 'Tenerife se cocina entre todos. Tenique: cada una de las tres piedras del fogón (Academia Canaria de la Lengua, Diccionario básico de canarismos). Un programa estable con anfitriones y mediadores, puntos físicos y app: el paso siguiente a «Tenerife es tuya», del Cabildo.',
  },
  { tipo: 'cta', kicker: 'Para el jurado', titulo: 'Todo está aquí. Si solo tenéis cinco minutos, empezad por esto:', texto: 'Escanead para abrir todos los entregables.' },
]
