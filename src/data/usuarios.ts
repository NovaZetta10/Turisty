// Usuarios · «A quién le pasa» (se muestra dentro de Diagnóstico). Dueño: subagente de usuarios.
// TODO es hipótesis hasta contrastarlo en entrevistas reales (guion en docs/usuarios-guion-tenique.md).
// Marca `validado: true` solo cuando entrevistas reales lo confirmen. Las frases de las personas son nuestras
// y llevan «Hipótesis:» delante; las citas reales se añaden con su código de entrevista (V03, T02…).

export type Persona = {
  id: string
  /** Nombre de arquetipo, no una persona real. */
  nombre: string
  /** Tramo de edad orientativo. */
  edad: string
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
  /** Ids de FUENTES (src/data/investigacion.ts) que respaldan algún dato del perfil. */
  fuentes?: number[]
}

export const PERSONAS: Persona[] = [
  {
    id: 'vecina',
    nombre: 'Vecina de zona turística',
    edad: '35–55 años',
    origen: 'Municipio turístico de Tenerife',
    perfil: 'Ha crecido en la isla y vive en un barrio donde el turismo forma parte del paisaje diario. Trabaja o tiene familia que trabaja en el sector.',
    contexto: 'El turismo le da empleo, pero en su día a día lo nota sobre todo en el alquiler, el tráfico y los sitios de siempre llenos. No ve en qué mejora su barrio lo que deja el visitante.',
    digital: 'Usa el móvil a diario (mensajería, redes, banca). Sus padres apenas usan apps y se informan por el ayuntamiento, la asociación de vecinos o el boca a boca.',
    necesidades: [
      'Ver que el turismo deja algo concreto en su barrio',
      'Recuperar espacios y costumbres propias sin sentirse desplazada',
      'Tener voz en cómo se recibe al visitante',
    ],
    frenos: [
      'Desconfianza: «otra campaña más» que no cambia nada',
      'Falta de tiempo después del trabajo',
      'Miedo a que su barrio se convierta en un decorado para turistas',
    ],
    motivaciones: [
      'Orgullo por lo suyo: su cocina, sus fiestas, su paisaje',
      'Que su asociación o su barrio gane algo con lo que ya sabe hacer (y, más adelante, un ingreso propio si la ley lo permite)',
      'Que sus hijos no tengan que irse del barrio',
    ],
    frase: 'Hipótesis: «No tengo nada contra el turista. Lo que quiero es notar que también es bueno para mi barrio».',
    canales: ['WhatsApp', 'Ayuntamiento', 'Asociación de vecinos', 'Boca a boca'],
    validado: false,
  },
  {
    id: 'visitante',
    nombre: 'Visitante que quiere la isla de verdad',
    edad: '30–60 años',
    origen: 'Reino Unido, Alemania o Península',
    perfil: 'Repite destino y ya conoce la playa y el Teide. Quiere algo que no salga en los folletos y conocer a gente de aquí. El Reino Unido es el primer mercado de Tenerife y la mayoría de sus turistas repite.',
    contexto: 'Se aloja en el sur, en hotel, apartamento o vivienda vacacional. Fuera de lo comercial, apenas cruza palabra con residentes.',
    digital: 'Planifica con el móvil: reseñas, mapas y plataformas de actividades. Confía más en la recomendación de un local que en un anuncio.',
    necesidades: [
      'Encontrar experiencias auténticas con gente de la isla',
      'Saber que su gasto beneficia a quien vive aquí',
      'Reservar fácil y en su idioma',
    ],
    frenos: [
      'No sabe dónde buscar ni en quién confiar',
      'Barrera del idioma',
      'Miedo a molestar o a no ser bienvenido',
    ],
    motivaciones: [
      'Volver a casa con una historia, no solo con fotos',
      'Sentirse invitado, no cliente',
      'Viajar de forma responsable',
    ],
    frase: 'Hipótesis: «Llevo años viniendo y no conozco a nadie de aquí».',
    canales: ['Buscadores y mapas', 'Plataformas de actividades', 'Recepción del alojamiento', 'Oficinas de turismo'],
    validado: false,
    fuentes: [41],
  },
]

/** Fases del recorrido de convivencia (no de un viaje genérico). Sirven para las dos personas. */
export type FasePersona = 'Día a día' | 'Roce' | 'Descubre' | 'Participa' | 'Comparte' | 'Ve el retorno' | 'Orgullo'
/** Fases de las dos personas (vecina y visitante). Los recorridos de anfitrión y de Turismo de Tenerife tienen las suyas. */
export const FASES: FasePersona[] = ['Día a día', 'Roce', 'Descubre', 'Participa', 'Comparte', 'Ve el retorno', 'Orgullo']
/** Nombre de la fase: libre en los recorridos de agentes. */
export type Fase = string

export type Emocion = -2 | -1 | 0 | 1 | 2

export type PasoJourney = {
  fase: Fase
  hace: string
  piensa: string
  dolor: string
  oportunidad: string
  /** Emoción estimada (hipótesis). Sin ella no se dibuja la curva: los recorridos de instituciones no la llevan. */
  emocion?: Emocion
  canales: string[]
  /** true si en este paso actúa Tenique. */
  tenique: boolean
  /** id de la pantalla de la app que ilustra el paso */
  pantalla?: PantallaApp
  /** id de EMOCIONES para la portada ilustrada del paso */
  emocionApp?: string
}

/** Ids de PANTALLAS en src/prototipo/pantallas.tsx (fijados por Prototipo para el sendero de la pestaña Tenique). */
export type PantallaApp = 'inicio' | 'municipio' | 'sentir' | 'lista' | 'experiencia' | 'reserva' | 'confirmacion' | 'planes' | 'estancia' | 'barrio' | 'anfitrion' | 'turismo'

/** Recorridos que se muestran (y en este orden). `persona`: tiene ficha en PERSONAS. */
export const RECORRIDOS: { id: string; nombre: string; persona: boolean }[] = [
  { id: 'vecina', nombre: 'Vecina de zona turística', persona: true },
  { id: 'visitante', nombre: 'Visitante', persona: true },
  { id: 'anfitrion', nombre: 'Anfitrión o asociación', persona: false },
  { id: 'turismo', nombre: 'Turismo de Tenerife', persona: false },
]

/** Un recorrido por clave de RECORRIDOS. Todo es hipótesis, fiel al plan de acción. */
export const JOURNEY: Record<string, PasoJourney[]> = {
  vecina: [
    { fase: 'Día a día', hace: 'Va al trabajo y hace recados en un barrio con mucho visitante.', piensa: '«Esto ya no parece mi pueblo».', dolor: 'Tráfico, alquileres altos, sitios de siempre llenos.', oportunidad: 'Reconocer el malestar sin culpar al turista.', emocion: -1, canales: ['Calle', 'Prensa local'], tenique: false, emocionApp: 'raices' },
    { fase: 'Roce', hace: 'Choca con el turismo: aparcar, una fiesta llena, un vecino que se va.', piensa: '«El beneficio se lo llevan otros».', dolor: 'No ve el retorno del turismo en su entorno.', oportunidad: 'Explicar con datos cercanos qué deja el turismo y dónde.', emocion: -2, canales: ['Conversaciones', 'Redes'], tenique: false, emocionApp: 'pertenencia' },
    { fase: 'Descubre', hace: 'Se entera de Tenique por su asociación, su ayuntamiento o un vecino.', piensa: '«¿Otra campaña?».', dolor: 'Desconfianza hacia iniciativas institucionales.', oportunidad: 'Que se lo cuente alguien cercano y que haya vecinos ya dentro.', emocion: 0, canales: ['Asociación de vecinos', 'Punto físico', 'WhatsApp'], tenique: true, pantalla: 'municipio', emocionApp: 'orgullo' },
    { fase: 'Participa', hace: 'Propone una experiencia (cocina, ruta, oficio) o se apunta a una.', piensa: '«Esto lo sé hacer yo».', dolor: 'Trámites, tiempo, miedo a no estar a la altura.', oportunidad: 'Alta sencilla, acompañamiento del dinamizador y aval del barrio.', emocion: 1, canales: ['App', 'Punto físico'], tenique: true, pantalla: 'lista', emocionApp: 'sabor' },
    { fase: 'Comparte', hace: 'Recibe a visitantes y vecinos en su experiencia.', piensa: '«Les interesa de verdad lo nuestro».', dolor: 'Idioma, grupos difíciles.', oportunidad: 'Grupos pequeños, apoyo de idioma, experiencias mixtas con locales.', emocion: 2, canales: ['En persona'], tenique: true, pantalla: 'planes', emocionApp: 'celebracion' },
    { fase: 'Ve el retorno', hace: 'Ve en un cartel, en la app y en el informe trimestral en qué se ha usado el fondo que ayudó a decidir.', piensa: '«Esto sí se nota».', dolor: 'Si el fondo no se ve, vuelve la desconfianza.', oportunidad: 'Uso del fondo visible, decidido con el barrio.', emocion: 2, canales: ['App', 'Cartel en el barrio', 'Asamblea'], tenique: true, pantalla: 'barrio', emocionApp: 'pertenencia' },
    { fase: 'Orgullo', hace: 'Avala experiencias de su barrio y anima a otros vecinos.', piensa: '«Mi barrio tiene mucho que enseñar».', dolor: 'Cansancio si todo depende de los mismos.', oportunidad: 'Reconocimiento público y relevo de anfitriones.', emocion: 2, canales: ['Boca a boca', 'App'], tenique: true, pantalla: 'anfitrion', emocionApp: 'orgullo' },
  ],
  visitante: [
    { fase: 'Día a día', hace: 'Pasa la estancia entre alojamiento, playa y restaurantes de la zona.', piensa: '«Esto podría ser cualquier sitio».', dolor: 'Burbuja turística, poco contacto real.', oportunidad: 'Abrir la puerta a la isla fuera del circuito.', emocion: 0, canales: ['Alojamiento', 'Mapas'], tenique: false, emocionApp: 'calma' },
    { fase: 'Roce', hace: 'Nota el malestar: pintadas, noticias, miradas.', piensa: '«¿Molesto aquí?».', dolor: 'Se siente culpable o rechazado.', oportunidad: 'Ofrecerle una forma clara de aportar.', emocion: -1, canales: ['Calle', 'Noticias'], tenique: false, emocionApp: 'pertenencia' },
    { fase: 'Descubre', hace: 'Busca por emoción («Quiero sentir… calma, sabor») en la app o en una oficina.', piensa: '«Esto lo recomiendan los de aquí».', dolor: 'Demasiadas webs de actividades iguales.', oportunidad: 'Triple validación: garantía de Turismo de Tenerife, aval del barrio y valoración de quien la vivió.', emocion: 1, canales: ['App', 'Oficina de turismo', 'Recepción'], tenique: true, pantalla: 'sentir', emocionApp: 'asombro' },
    { fase: 'Participa', hace: 'Reserva una experiencia con un anfitrión.', piensa: '«Sé a quién beneficia lo que pago».', dolor: 'Pagos, idioma, ubicación.', oportunidad: 'Reserva en su idioma y aviso claro del reparto (anfitrión y fondo).', emocion: 1, canales: ['App'], tenique: true, pantalla: 'reserva', emocionApp: 'sabor' },
    { fase: 'Comparte', hace: 'Cocina, camina o celebra con vecinos.', piensa: '«Me han tratado como a uno más».', dolor: 'Que parezca un espectáculo montado.', oportunidad: 'Experiencias reales, con vecinos también como participantes.', emocion: 2, canales: ['En persona'], tenique: true, pantalla: 'confirmacion', emocionApp: 'celebracion' },
    { fase: 'Ve el retorno', hace: 'Recibe qué se ha hecho en el barrio con el fondo.', piensa: '«Mi viaje ha dejado algo».', dolor: 'Si no recibe nada, lo olvida.', oportunidad: 'Mensaje sencillo con el uso del fondo.', emocion: 1, canales: ['Correo', 'App'], tenique: true, pantalla: 'estancia', emocionApp: 'pertenencia' },
    { fase: 'Orgullo', hace: 'Recomienda la experiencia y vuelve.', piensa: '«Tengo amigos en Tenerife».', dolor: 'Nada que le haga volver a esa zona.', oportunidad: 'Invitarle a otras experiencias del mismo barrio.', emocion: 2, canales: ['Boca a boca', 'Reseñas'], tenique: true, emocionApp: 'orgullo' },
  ],
  anfitrion: [
    { fase: 'Se entera', hace: 'El dinamizador de barrio le cuenta Tenique en el punto físico o en su asociación.', piensa: '«¿Y yo qué puedo enseñar?».', dolor: 'No ve qué tiene de especial lo suyo.', oportunidad: 'Ejemplos de otros barrios y acompañamiento cercano.', emocion: 0, canales: ['Punto físico', 'Asociación', 'Dinamizador'], tenique: true, pantalla: 'inicio', emocionApp: 'raices' },
    { fase: 'Propone', hace: 'Da de alta su experiencia: qué, cuándo y para cuántos. En el piloto, si es particular, gratis o con donación; si es una asociación, puede cobrar.', piensa: '«¿Tengo que darme de alta como negocio?».', dolor: 'Dudas legales, seguros y tiempo.', oportunidad: 'Alta guiada por el dinamizador; seguros y fiscalidad, según el informe jurídico.', emocion: -1, canales: ['App', 'Punto físico'], tenique: true, pantalla: 'anfitrion', emocionApp: 'orgullo' },
    { fase: 'Recibe el aval', hace: 'La asociación vecinal la avala y Turismo de Tenerife comprueba que cumple sus condiciones.', piensa: '«Mi barrio respalda lo que hago».', dolor: 'Esperar sin saber en qué punto está.', oportunidad: 'Estado visible: nueva, avalada por el barrio, con garantía.', emocion: 1, canales: ['App', 'Asociación'], tenique: true, pantalla: 'anfitrion', emocionApp: 'pertenencia' },
    { fase: 'Recibe a gente', hace: 'Recibe a visitantes y vecinos en un grupo pequeño.', piensa: '«Les interesa de verdad».', dolor: 'Idioma, cancelaciones.', oportunidad: 'Apoyo de idioma y aviso de cada reserva.', emocion: 2, canales: ['En persona'], tenique: true, pantalla: 'experiencia', emocionApp: 'sabor' },
    { fase: 'Le valoran', hace: 'Lee lo que puntúan quienes asistieron, vecinos y visitantes.', piensa: '«Puedo hacerlo mejor».', dolor: 'Una mala valoración pesa mucho.', oportunidad: 'Valoraciones con contexto y derecho a responder.', emocion: 1, canales: ['App'], tenique: true, pantalla: 'anfitrion', emocionApp: 'orgullo' },
    { fase: 'Ve el retorno', hace: 'Ve en qué proyecto del barrio se usa lo recaudado, en la cuenta del municipio que gestiona el Cabildo.', piensa: '«Esto se queda en mi barrio».', dolor: 'Si no se ve, se desanima.', oportunidad: 'Cartel en la calle, app e informe trimestral.', emocion: 2, canales: ['App', 'Cartel en el barrio'], tenique: true, pantalla: 'barrio', emocionApp: 'pertenencia' },
    { fase: 'Sigue', hace: 'Repite, invita a otro vecino o lo deja.', piensa: '«¿Compensa el tiempo que pongo?».', dolor: 'Cansancio. En el piloto, el particular no cobra.', oportunidad: 'Reconocimiento público y, en la expansión, cobro si el informe jurídico lo permite.', emocion: 1, canales: ['Boca a boca', 'Asociación'], tenique: true, emocionApp: 'celebracion' },
  ],
  turismo: [
    { fase: 'Prepara', hace: 'Con el Cabildo y los ayuntamientos, fija las condiciones de la garantía y pone en marcha la app.', piensa: '«Esto no puede ser otra campaña».', dolor: 'Hay que encontrar y comprobar experiencias reales.', oportunidad: 'Partir de lo que ya hacen las asociaciones y el comercio de cada barrio.', canales: ['Convenio', 'Reuniones'], tenique: true, emocionApp: 'raices' },
    { fase: 'Garantiza', hace: 'Comprueba cada experiencia que el barrio ya ha avalado.', piensa: '«¿Cumple las condiciones de calidad y seguridad?».', dolor: 'Muchas solicitudes a la vez.', oportunidad: 'Una lista única con el estado de cada experiencia.', canales: ['App'], tenique: true, pantalla: 'turismo', emocionApp: 'calma' },
    { fase: 'Coordina', hace: 'Coordina a anfitriones, dinamizadores (que contratan el Cabildo y los ayuntamientos) y puntos físicos.', piensa: '«Que nadie se quede fuera por no usar el móvil».', dolor: 'Muchos agentes, cada uno con su ritmo.', oportunidad: 'Un panel común por municipio.', canales: ['App', 'Punto físico'], tenique: true, pantalla: 'turismo', emocionApp: 'pertenencia' },
    { fase: 'Promociona', hace: 'Da a conocer Tenique a visitantes y residentes, con las empresas y la vivienda vacacional.', piensa: '«Que llegue también a quien no está en redes».', dolor: 'Competir con las plataformas de actividades.', oportunidad: 'Recepciones, oficinas de turismo y puntos físicos.', canales: ['Oficinas de turismo', 'Recepción', 'Redes'], tenique: true, pantalla: 'inicio', emocionApp: 'asombro' },
    { fase: 'Publica', hace: 'Publica cada proyecto pagado por el fondo: cartel en la calle, app e informe trimestral.', piensa: '«Que se vea en la calle».', dolor: 'Depende de que el Cabildo y los ayuntamientos le pasen los datos.', oportunidad: 'Los datos del fondo, que gestiona el Cabildo, en lenguaje cercano.', canales: ['Cartel en el barrio', 'App', 'Informe'], tenique: true, pantalla: 'barrio', emocionApp: 'orgullo' },
    { fase: 'Aprende', hace: 'Recibe la encuesta de percepción del ISTAC o de la universidad y ajusta el programa.', piensa: '«¿Está cambiando la convivencia?».', dolor: 'La percepción cambia despacio.', oportunidad: 'Evaluación externa, no autoevaluación.', canales: ['Informe'], tenique: true, emocionApp: 'calma' },
  ],
}

export const EMOCION_TXT: Record<Emocion, string> = { [-2]: 'Malestar', [-1]: 'Recelo', 0: 'Indiferencia', 1: 'Interés', 2: 'Orgullo' }

/** Emociones propuestas para la búsqueda de Tenique. Por validar con Giulia y en las entrevistas (V7, T5). */
export type EmocionBusqueda = { id: string; nombre: string; en: string; icono: string; porque: string; ejemplo: string; validada: boolean }

export const EMOCIONES: EmocionBusqueda[] = [
  { id: 'pertenencia', nombre: 'Pertenencia', en: 'Belonging', icono: 'home', porque: 'Es el núcleo del reto: sentirse parte, tanto el vecino en su barrio como el visitante invitado.', ejemplo: 'Una tarde con una asociación de vecinos', validada: false },
  { id: 'orgullo', nombre: 'Orgullo', en: 'Pride', icono: 'star', porque: 'Está en la pregunta del reto. Pone al vecino como protagonista que enseña lo suyo.', ejemplo: 'Un oficio o una tradición contados por quien la mantiene', validada: false },
  { id: 'raices', nombre: 'Raíces', en: 'Roots', icono: 'user', porque: 'Da sitio a las personas mayores y a la memoria del barrio; el reto pide implicar a toda la sociedad, no solo a jóvenes.', ejemplo: 'Historias del barrio con quien las vivió', validada: false },
  { id: 'sabor', nombre: 'Sabor', en: 'Taste', icono: 'heart', porque: 'Encaja con la metáfora del fogón y lleva el gasto al productor y al comercio local.', ejemplo: 'Cocinar en casa o en un local del barrio', validada: false },
  { id: 'calma', nombre: 'Calma', en: 'Calm', icono: 'map', porque: 'Invita a la isla rural y a horas tranquilas, lejos de las zonas más llenas.', ejemplo: 'Paseo por un camino rural con un vecino', validada: false },
  { id: 'asombro', nombre: 'Asombro', en: 'Wonder', icono: 'globe', porque: 'Recoge el paisaje natural, pero contado por quien vive al lado.', ejemplo: 'Mirar el cielo o el paisaje con alguien de la zona', validada: false },
  { id: 'adrenalina', nombre: 'Adrenalina', en: 'Thrill', icono: 'up', porque: 'Es lo que muchos visitantes ya buscan; sirve de puerta de entrada hacia lo local.', ejemplo: 'Actividad de mar o montaña con un club local', validada: false },
  { id: 'celebracion', nombre: 'Celebración', en: 'Celebration', icono: 'calendar', porque: 'Las fiestas populares son donde vecinos y visitantes ya coinciden; Tenique ordena esa convivencia.', ejemplo: 'Vivir una fiesta del barrio desde dentro', validada: false },
]

/** Frase-problema propuesta para la diapositiva «El problema». Hipótesis hasta las entrevistas. */
export const FRASE_PROBLEMA = 'Quien vive en una zona turística de Tenerife convive cada día con el turismo, pero no siente que le pertenezca: ve el coste en su barrio y no ve el retorno. Y el visitante que quiere conocer la isla de verdad no encuentra cómo acercarse a ella.'

// ─── Entrevistas reales ────────────────────────────────────────────────────────
// Vuelca aquí cada entrevista hecha con el guion (docs/usuarios-guion-tenique.md), una por persona.
// Pasos y reglas en docs/usuarios-volcado.md. Sin nombres ni datos personales: solo el código.
// En cuanto haya una, la sección «Lo que hemos contrastado» aparece sola dentro de Diagnóstico.

/** + apoya la hipótesis · − la contradice. Si el tema no salió, no pongas la clave. */
export type Senal = '+' | '-'

export type Entrevista = {
  /** V01, V02… vecinos · T01, T02… turistas. */
  codigo: string
  tipo: 'vecino' | 'turista'
  zona: 'turística' | 'rural' | 'otra'
  edad: '<30' | '30-60' | '>60'
  /** Señal por hipótesis, con los ids de HIPOTESIS (src/data/investigacion.ts): { H1: '+', H3: '-' }. */
  hipotesis: Partial<Record<string, Senal>>
  /** Las dos emociones elegidas en V7/T5, con el id de EMOCIONES (pertenencia, sabor…). */
  emociones: string[]
  /** Emoción que dijo que faltaba, tal cual. */
  falta?: string
  /** Frase literal. Solo si dio permiso para citarla (sin nombre). */
  cita?: string
  /** T6: precio que dijo, tal cual («20 €»). Para Negocio. */
  precio?: string
}

export const ENTREVISTAS: Entrevista[] = []

/**
 * Regla del equipo, fijada antes de entrevistar: con 3 o más entrevistas en las que salió el tema,
 * «confirmada» si al menos la mitad la apoya, «caída» si al menos la mitad la contradice; si no, «sin datos».
 */
export function estadoHipotesis(id: string): { a: number; c: number; n: number; estado: 'confirmada' | 'caída' | 'sin datos' } {
  const senales = ENTREVISTAS.map((e) => e.hipotesis[id]).filter((s): s is Senal => !!s)
  const a = senales.filter((s) => s === '+').length
  const c = senales.length - a
  const n = senales.length
  const estado = n < 3 ? 'sin datos' : a >= n / 2 && a > c ? 'confirmada' : c >= n / 2 && c > a ? 'caída' : 'sin datos'
  return { a, c, n, estado }
}

// ─── Encuesta (formulario) ─────────────────────────────────────────────────────
// Una encuesta NO es una entrevista: se muestra aparte y como «encuesta a N personas el {fecha}».
// Pasos en docs/usuarios-volcado.md (apartado «Encuesta»). Nunca copies nombres, correos ni teléfonos.
// Resúmela con: node scripts/encuesta.mjs ruta/al/archivo.csv   (el CSV se queda FUERA del repositorio).

export type ResultadoEncuesta = {
  /** Pregunta, resumida. */
  pregunta: string
  /** Respuesta que se cuenta («Sí», «Vivienda», «4 o 5 sobre 5»…). */
  respuesta: string
  /** Cuántos dieron esa respuesta, de cuántos respondieron a esa pregunta en ese grupo. */
  n: number
  de: number
  /** Grupo, si la encuesta permite separar: «vecinos», «turistas», «vecinos · zona rural»… */
  grupo?: string
  /** Hipótesis que mide (ids de HIPOTESIS). */
  hipotesis?: string[]
}

export type Encuesta = {
  /** dd-mm-aaaa */
  fecha: string
  /** Personas que respondieron. */
  respuestas: number
  vecinos?: number
  turistas?: number
  resultados: ResultadoEncuesta[]
  /** Veredicto del equipo por hipótesis, con la misma regla que las entrevistas. `apoyo`: la cuenta que lo justifica. */
  hipotesis: Partial<Record<string, { estado: 'confirmada' | 'caída' | 'sin datos'; apoyo: string }>>
  /** Citas literales de respuestas abiertas, sin nada que identifique a la persona. */
  citas: { texto: string; perfil: string }[]
}

/** null hasta que el equipo pase los resultados. */
export const ENCUESTA: Encuesta | null = null

// ─── Tipos de usuario (segmentación) ───────────────────────────────────────────
// Quién usa Tenique, más allá de las dos personas tipo. TODO hipótesis hasta contrastarlo (entrevistas y encuesta).
// Sin cifras: si se añade alguna, con su fuente de FUENTES.

export type Canal = 'app' | 'punto físico' | 'los dos'

export type Segmento = {
  id: string
  nombre: string
  /** De dónde es: residente, visitante o ambos. */
  quien: 'residente' | 'visitante' | 'residente y visitante'
  icono: string
  busca: string[]
  frena: string[]
  /** Tipos de experiencia que le encajan (genéricos, no experiencias concretas). */
  encaja: string[]
  canal: Canal
  /** Cómo le llega Tenique, en una frase. */
  llega: string
  /** Papel en Tenique además de asistir. */
  papel: string
  validado: boolean
}

export const SEGMENTOS: Segmento[] = [
  {
    id: 'jovenes', nombre: 'Jóvenes', quien: 'residente y visitante', icono: 'star',
    busca: ['Planes de tarde, noche o fin de semana', 'Hacer, no solo mirar', 'Conocer a gente de su edad, de aquí y de fuera', 'Precio bajo o gratis'],
    frena: ['Horarios de mañana entre semana', 'Planes pensados para mayores o para turistas', 'Precio', 'Sentir que no pinta nada en su barrio'],
    encaja: ['Deporte y naturaleza con un club local', 'Música, fiestas y cultura del barrio', 'Cocina sencilla en grupo', 'Oficios y tradiciones aprendidos de un mayor'],
    canal: 'app', llega: 'Por la app, redes y boca a boca; en el instituto, la universidad o el club.',
    papel: 'También anfitrión: enseña lo suyo (su barrio, su deporte, su música) y toma el relevo de los mayores.',
    validado: false,
  },
  {
    id: 'familias', nombre: 'Familias', quien: 'residente y visitante', icono: 'home',
    busca: ['Planes para todas las edades', 'Horarios compatibles con niños', 'Seguridad y sitios accesibles'],
    frena: ['Grupos que no admiten niños', 'Precio por persona', 'Desplazamientos largos'],
    encaja: ['Cocina y producto local', 'Rutas cortas y fáciles', 'Fiestas del barrio', 'Jornadas de cuidado de playas o plazas'],
    canal: 'los dos', llega: 'Por la app y por el colegio, la asociación de vecinos o la recepción del alojamiento.',
    papel: 'Asiste en grupo y puede ofrecer experiencias en familia.',
    validado: false,
  },
  {
    id: 'mayores', nombre: 'Personas mayores', quien: 'residente', icono: 'user',
    busca: ['Que se escuche y se valore lo que saben', 'Compañía', 'Planes cerca de casa'],
    frena: ['No usan apps', 'Movilidad', 'Desconfianza hacia lo nuevo'],
    encaja: ['Contar la historia del barrio', 'Enseñar un oficio, una receta o una tradición', 'Paseos tranquilos por el barrio'],
    canal: 'punto físico', llega: 'Por el punto físico del ayuntamiento, la asociación, el centro de mayores o un familiar.',
    papel: 'Sobre todo anfitriones: guardan la memoria y el saber que se transmite a los jóvenes.',
    validado: false,
  },
  {
    id: 'larga', nombre: 'Larga estancia y nómadas digitales', quien: 'visitante', icono: 'globe',
    busca: ['Sentirse parte del barrio, no turista', 'Rutina y planes repetidos', 'Practicar el idioma'],
    frena: ['No saber cómo entrar en la vida del barrio', 'Idioma', 'Recelo de los vecinos por la vivienda'],
    encaja: ['Voluntariado con vecinos', 'Clases y talleres con gente local', 'Clubs y grupos que quedan cada semana'],
    canal: 'app', llega: 'Por la app, los espacios de trabajo compartido y la vivienda vacacional.',
    papel: 'Puede repetir y comprometerse más: voluntariado y cuidado compartido del barrio.',
    validado: false,
  },
  {
    id: 'corta', nombre: 'Visitantes de pocos días y cruceristas', quien: 'visitante', icono: 'map',
    busca: ['Algo auténtico en poco tiempo', 'Cerca del puerto o del alojamiento', 'Reservar fácil'],
    frena: ['Poco tiempo', 'No conocer la isla', 'Ofertas iguales en todas partes'],
    encaja: ['Experiencias cortas, de 1 a 2 horas', 'Comercio y producto local', 'Paseos con un vecino por el casco'],
    canal: 'los dos', llega: 'Por la app, la oficina de turismo o un punto en el puerto o el alojamiento.',
    papel: 'Asiste y aporta al fondo; es la puerta para que vuelva.',
    validado: false,
  },
]

// ─── Criterio «para jóvenes» ───────────────────────────────────────────────────
// Lo usan Experiencias (para etiquetar) y Prototipo (para el filtro de la app). Hipótesis por validar.

export const CRITERIO_JOVENES = {
  edad: 'Orientativo: de 18 a 35 años, residentes y visitantes.',
  regla: 'Una experiencia es «para jóvenes» si cumple los 2 obligatorios y al menos 2 de los 4 opcionales.',
  obligatorios: [
    'Horario compatible con estudiar o trabajar: tarde, noche o fin de semana.',
    'Precio asequible: gratis, con donación o a precio de residente.',
  ],
  opcionales: [
    'Es para hacer, no solo para mirar o escuchar.',
    'Grupo mixto: jóvenes de aquí y de fuera.',
    'Se ofrece en español y en inglés.',
    'La ofrece una persona joven, o un mayor que enseña a jóvenes (relevo generacional).',
  ],
}
