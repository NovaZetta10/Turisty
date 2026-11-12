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
export type Fase = 'Día a día' | 'Roce' | 'Descubre' | 'Participa' | 'Comparte' | 'Ve el retorno' | 'Orgullo'
export const FASES: Fase[] = ['Día a día', 'Roce', 'Descubre', 'Participa', 'Comparte', 'Ve el retorno', 'Orgullo']

export type Emocion = -2 | -1 | 0 | 1 | 2

export type PasoJourney = {
  fase: Fase
  hace: string
  piensa: string
  dolor: string
  oportunidad: string
  emocion: Emocion
  canales: string[]
  /** true si en este paso actúa Tenique. */
  tenique: boolean
}

/** Un recorrido por persona, con la clave del `id` de la persona. Emociones estimadas: hipótesis. */
export const JOURNEY: Record<string, PasoJourney[]> = {
  vecina: [
    { fase: 'Día a día', hace: 'Va al trabajo y hace recados en un barrio con mucho visitante.', piensa: '«Esto ya no parece mi pueblo».', dolor: 'Tráfico, alquileres altos, sitios de siempre llenos.', oportunidad: 'Reconocer el malestar sin culpar al turista.', emocion: -1, canales: ['Calle', 'Prensa local'], tenique: false },
    { fase: 'Roce', hace: 'Choca con el turismo: aparcar, una fiesta llena, un vecino que se va.', piensa: '«El beneficio se lo llevan otros».', dolor: 'No ve el retorno del turismo en su entorno.', oportunidad: 'Explicar con datos cercanos qué deja el turismo y dónde.', emocion: -2, canales: ['Conversaciones', 'Redes'], tenique: false },
    { fase: 'Descubre', hace: 'Se entera de Tenique por su asociación, su ayuntamiento o un vecino.', piensa: '«¿Otra campaña?».', dolor: 'Desconfianza hacia iniciativas institucionales.', oportunidad: 'Que se lo cuente alguien cercano y que haya vecinos ya dentro.', emocion: 0, canales: ['Asociación de vecinos', 'Punto físico', 'WhatsApp'], tenique: true },
    { fase: 'Participa', hace: 'Propone una experiencia (cocina, ruta, oficio) o se apunta a una.', piensa: '«Esto lo sé hacer yo».', dolor: 'Trámites, tiempo, miedo a no estar a la altura.', oportunidad: 'Alta sencilla, acompañamiento del dinamizador y aval del barrio.', emocion: 1, canales: ['App', 'Punto físico'], tenique: true },
    { fase: 'Comparte', hace: 'Recibe a visitantes y vecinos en su experiencia.', piensa: '«Les interesa de verdad lo nuestro».', dolor: 'Idioma, grupos difíciles.', oportunidad: 'Grupos pequeños, apoyo de idioma, experiencias mixtas con locales.', emocion: 2, canales: ['En persona'], tenique: true },
    { fase: 'Ve el retorno', hace: 'Ve en un cartel, en la app y en el informe trimestral en qué se ha usado el fondo que ayudó a decidir.', piensa: '«Esto sí se nota».', dolor: 'Si el fondo no se ve, vuelve la desconfianza.', oportunidad: 'Uso del fondo visible, decidido con el barrio.', emocion: 2, canales: ['App', 'Cartel en el barrio', 'Asamblea'], tenique: true },
    { fase: 'Orgullo', hace: 'Avala experiencias de su barrio y anima a otros vecinos.', piensa: '«Mi barrio tiene mucho que enseñar».', dolor: 'Cansancio si todo depende de los mismos.', oportunidad: 'Reconocimiento público y relevo de anfitriones.', emocion: 2, canales: ['Boca a boca', 'App'], tenique: true },
  ],
  visitante: [
    { fase: 'Día a día', hace: 'Pasa la estancia entre alojamiento, playa y restaurantes de la zona.', piensa: '«Esto podría ser cualquier sitio».', dolor: 'Burbuja turística, poco contacto real.', oportunidad: 'Abrir la puerta a la isla fuera del circuito.', emocion: 0, canales: ['Alojamiento', 'Mapas'], tenique: false },
    { fase: 'Roce', hace: 'Nota el malestar: pintadas, noticias, miradas.', piensa: '«¿Molesto aquí?».', dolor: 'Se siente culpable o rechazado.', oportunidad: 'Ofrecerle una forma clara de aportar.', emocion: -1, canales: ['Calle', 'Noticias'], tenique: false },
    { fase: 'Descubre', hace: 'Busca por emoción («Quiero sentir… calma, sabor») en la app o en una oficina.', piensa: '«Esto lo recomiendan los de aquí».', dolor: 'Demasiadas webs de actividades iguales.', oportunidad: 'Triple validación: garantía de Turismo de Tenerife, aval del barrio y valoración de quien la vivió.', emocion: 1, canales: ['App', 'Oficina de turismo', 'Recepción'], tenique: true },
    { fase: 'Participa', hace: 'Reserva una experiencia con un anfitrión.', piensa: '«Sé a quién beneficia lo que pago».', dolor: 'Pagos, idioma, ubicación.', oportunidad: 'Reserva en su idioma y aviso claro del reparto (anfitrión y fondo).', emocion: 1, canales: ['App'], tenique: true },
    { fase: 'Comparte', hace: 'Cocina, camina o celebra con vecinos.', piensa: '«Me han tratado como a uno más».', dolor: 'Que parezca un espectáculo montado.', oportunidad: 'Experiencias reales, con vecinos también como participantes.', emocion: 2, canales: ['En persona'], tenique: true },
    { fase: 'Ve el retorno', hace: 'Recibe qué se ha hecho en el barrio con el fondo.', piensa: '«Mi viaje ha dejado algo».', dolor: 'Si no recibe nada, lo olvida.', oportunidad: 'Mensaje sencillo con el uso del fondo.', emocion: 1, canales: ['Correo', 'App'], tenique: true },
    { fase: 'Orgullo', hace: 'Recomienda la experiencia y vuelve.', piensa: '«Tengo amigos en Tenerife».', dolor: 'Nada que le haga volver a esa zona.', oportunidad: 'Invitarle a otras experiencias del mismo barrio.', emocion: 2, canales: ['Boca a boca', 'Reseñas'], tenique: true },
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
