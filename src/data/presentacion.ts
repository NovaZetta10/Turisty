// Presentación · pitch de Tenique (reto 1 de Turismo de Tenerife: convivencia entre turismo y población local).
// Orden (Esther, 12-11-2026): portada → pregunta-gancho → acción 1 (demo, perfiles) → «Os presentamos… Tenique»
// → cuatro parejas problema/solución (vecinos, visitantes, sectores, Turismo de Tenerife) → las tres piedras contentas
// → acción 2 (qué revisar) → gracias y preguntas.
// Desde la revelación, el QR a la demo se queda en una esquina (lo pinta Presentacion.tsx).
// Guion y tiempos: docs/pitch-guion.md. Propuestas de gancho: docs/pitch-preguntas-gancho.md.
// Cifras: solo las verificadas de src/data/investigacion.ts, con su fuente en el pie.

export type Slide =
  /** Empresa, reto y fecha (salen de RETO y EVENTO en la configuración). Sin nombre de equipo. */
  | { tipo: 'portada' }
  /** La pregunta que engancha y el remate que aparece después. */
  | { tipo: 'pregunta'; antes: string; destacado: string; despues?: string; remate: string }
  /** Punto de acción: QR a la demo. 'app' abre la portada de perfiles (#/app); 'prototipo', la pestaña Tenique. */
  | { tipo: 'accion'; kicker: string; titulo: string; texto: string; destino: 'app' | 'prototipo' | 'web' }
  /** Revelación del nombre, con su definición y fuente. */
  | { tipo: 'revelacion'; antes: string; nombre: string; definicion: string; fuente: string }
  /** Un problema con su dato verificado, enfrentado a cómo lo resuelve Tenique. */
  | { tipo: 'pareja'; kicker: string; problema: { titulo: string; valor: string; etiqueta: string }; solucion: { titulo: string; puntos: string[] }; fuente: string }
  /** El fogón encendido: tres piedras sosteniendo el caldero y el lema. */
  | { tipo: 'fogon'; kicker: string; titulo: string; piedras: { nombre: string; texto: string }[]; lema: string }
  /** Cierre: gracias, preguntas y equipo. */
  | { tipo: 'final'; titulo: string; subtitulo: string }
  | { tipo: 'columnas'; kicker: string; titulo: string; lead?: string; columnas: { titulo: string; texto: string }[]; fuente?: string }
  | { tipo: 'pasos'; kicker: string; titulo: string; pasos: { titulo: string; texto: string }[] }
  | { tipo: 'cifras'; kicker: string; titulo: string; cifras: { valor: string; etiqueta: string }[]; fuente?: string }
  | { tipo: 'frase'; kicker: string; titulo: string; lead?: string }
  /** Punto de acción final: dónde están los entregables y cuáles revisar primero (DESTACADOS en la configuración). */
  | { tipo: 'cta'; kicker: string; titulo: string; texto: string }

export const SLIDES: Slide[] = [
  { tipo: 'portada' },
  {
    // Favorita (la 7) con el patrón de la pregunta de Fred. Olsen Express. Hay 15 propuestas en docs/pitch-preguntas-gancho.md.
    tipo: 'pregunta',
    antes: '¿Cómo podemos hacer que el vecino',
    destacado: 'note lo que deja el turismo, el visitante viva la isla de verdad y todos sintamos orgullo',
    despues: ', sin otra campaña ni más presión sobre los barrios?',
    remate: 'Con tres piedras.',
  },
  {
    tipo: 'accion',
    kicker: 'Ahora mismo',
    titulo: 'Sacad el móvil, elegid un perfil: os lo demostramos.',
    texto: 'Vecino, visitante, anfitrión o Turismo de Tenerife. Cada perfil ve Tenique a su manera, con experiencias reales de la isla.',
    destino: 'app',
  },
  {
    // Fuente 48 de src/data/investigacion.ts. Definición literal de la Academia Canaria de la Lengua.
    tipo: 'revelacion',
    antes: 'Os presentamos…',
    nombre: 'Tenique',
    definicion: '«Cada una de las tres piedras con que se hace un hogar rústico, que sirven para sustentar un tostador, una olla o cualquier otro recipiente».',
    fuente: 'Academia Canaria de la Lengua, Diccionario básico de canarismos.',
  },
  {
    // Fuente 49.
    tipo: 'pareja',
    kicker: 'Para los vecinos',
    problema: { titulo: 'El turismo es bueno para la isla, pero no lo notan en su vida.', valor: '35,9 %', etiqueta: 'cree que mejora su calidad de vida, aunque el 62,2 % lo ve muy beneficioso para la isla' },
    solucion: {
      titulo: 'Lo que deja el turismo se ve en su barrio, y lo deciden ellos.',
      puntos: ['Un fondo por barrio: los vecinos votan en qué se gasta, también en papel.', 'Cada proyecto lleva su cartel: «esto lo ha pagado Tenique».', 'Sin el aval del barrio, una experiencia no entra.'],
    },
    fuente: 'Residentes en Tenerife. Fuente: ISTAC, Encuesta de Hábitos y Confianza Socioeconómica (ECOSOC), segundo trimestre de 2026.',
  },
  {
    // Fuentes 8 y 57; la observación sale del catálogo src/data/experiencias.ts.
    tipo: 'pareja',
    kicker: 'Para los visitantes',
    problema: { titulo: 'Muchos visitantes y pocas formas de conocer a quien vive aquí.', valor: '7,56 M', etiqueta: 'turistas en Tenerife en 2025: unos 7,8 al año por cada residente' },
    solucion: {
      titulo: 'Experiencias reales con gente de la isla, buscadas por emoción.',
      puntos: ['Avaladas por el barrio y garantizadas por Turismo de Tenerife.', 'Como invitado, no como cliente: sabe qué deja su viaje en el barrio.', 'En toda la isla, no solo en el sur.'],
    },
    fuente: 'Fuentes: Turismo de Tenerife, Balance de situación turística 2025 · ISTAC, población por municipios, 2025 · catálogo de experiencias reales del equipo: hoy casi todo lo compartido son fiestas y actividades institucionales.',
  },
  {
    // Fuentes 51 y 8.
    tipo: 'pareja',
    kicker: 'Para empresas, comercio y vivienda vacacional',
    problema: { titulo: 'Se factura más por más turistas, no por más gasto, y a pocos hogares les llega.', valor: '23,1 %', etiqueta: 'de los hogares tiene vínculo económico con el turismo. Facturación de 2025: 9.134 M€ (+2,2 %)' },
    solucion: {
      titulo: 'El gasto llega al comercio y al productor local, y su aportación se ve en la calle.',
      puntos: ['Experiencias en su negocio, su finca o su taller, con producto local.', 'Cuota al fondo por convenio con el Cabildo, con sello de empresa o alojamiento corresponsable.', 'Garantía Turismo de Tenerife en cada experiencia.'],
    },
    fuente: 'Fuentes: ISTAC, ECOSOC, segundo trimestre de 2026 · Turismo de Tenerife, Balance de situación turística 2025.',
  },
  {
    // Fuentes 49, 50, 84 y 86.
    tipo: 'pareja',
    kicker: 'Para Turismo de Tenerife',
    problema: { titulo: 'La tensión crece, y otra campaña no la arregla.', valor: '53,9 %', etiqueta: 'de quienes viven en Tenerife ve tensiones con los turistas. En 2024 era el 49,6 %' },
    solucion: {
      titulo: 'Un relato con datos, sobre lo que ya hacéis.',
      puntos: ['Sigue a «Tenerife es tuya» y REGENERATe: del residente que redescubre y cuida la isla al que la comparte.', 'Turismo de Tenerife garantiza y coordina; el fondo lo gestiona el Cabildo.', 'La convivencia se mide por municipio, con una encuesta externa.'],
    },
    fuente: 'Fuentes: ISTAC, ECOSOC, segundo trimestre de 2024 y 2026 · Turismo de Tenerife, blog corporativo (02-09-2025 y 25-10-2025).',
  },
  {
    tipo: 'fogon',
    kicker: 'Las tres piedras, contentas',
    titulo: 'Con las tres, el fogón se enciende.',
    piedras: [
      { nombre: 'Vecinos', texto: 'Un fondo que deciden ellos, voz y reconocimiento.' },
      { nombre: 'Visitantes y sector', texto: 'La isla de verdad con quien la vive, y un gasto que llega al barrio.' },
      { nombre: 'Instituciones', texto: 'Datos de convivencia y un retorno que se ve.' },
    ],
    lema: 'Tenerife se cocina entre todos.',
  },
  { tipo: 'cta', kicker: 'Para el jurado', titulo: 'Todo está aquí. Al corregir, mirad esto primero:', texto: 'Escanead para abrir todos los entregables.' },
  { tipo: 'final', titulo: 'Gracias', subtitulo: '¿Preguntas?' },
]
