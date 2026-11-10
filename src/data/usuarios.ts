// Usuarios · buyer personas y user journey.
// Son PLANTILLAS de turismo en Canarias para arrancar rápido: el jueves se ajustan al reto.
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

export const PERSONAS: Persona[] = [
  {
    id: 'familia-uk',
    nombre: 'Claire',
    edad: 41,
    origen: 'Mánchester, Reino Unido',
    perfil: 'Madre de dos niños; repite en el sur de Tenerife cada año.',
    contexto: 'Una semana en un hotel con todo incluido; sale poco del complejo.',
    digital: 'Usa el móvil para todo, en inglés. No instala apps de destino.',
    necesidades: ['Planes sencillos con niños cerca del hotel', 'Saber precios y horarios antes de salir', 'Transporte sin alquilar coche'],
    frenos: ['El idioma fuera del hotel', 'Miedo a perder tiempo o dinero', 'No sabe qué es auténtico y qué no'],
    motivaciones: ['Sol garantizado', 'Descanso', 'Que los niños vuelvan contentos'],
    frase: '«Si no está a diez minutos y en inglés, no vamos.»',
    canales: ['Email del touroperador', 'WhatsApp del hotel', 'Pantallas y recepción del hotel'],
    validado: false,
  },
  {
    id: 'pareja-alemana',
    nombre: 'Jonas y Lena',
    edad: 34,
    origen: 'Hamburgo, Alemania',
    perfil: 'Pareja activa: senderismo, naturaleza y gastronomía local.',
    contexto: 'Diez días con coche de alquiler; reservan alojamiento independiente.',
    digital: 'Planifican con mapas y foros; valoran la información oficial y en alemán.',
    necesidades: ['Reservar senderos y aparcamiento sin sorpresas', 'Rutas alternativas cuando algo está lleno', 'Producto local de verdad'],
    frenos: ['Tasas y cupos poco claros', 'Saturación en los sitios icónicos', 'Información dispersa'],
    motivaciones: ['Paisaje', 'Sentirse viajeros responsables', 'Experiencias fuera del circuito'],
    frase: '«Pagamos encantados si sabemos que ayuda a cuidar el sitio.»',
    canales: ['Web oficial del destino', 'Google Maps', 'Comunidades de viaje'],
    validado: false,
  },
  {
    id: 'peninsular',
    nombre: 'Lucía',
    edad: 29,
    origen: 'Madrid',
    perfil: 'Escapada de fin de semana largo; compara Canarias con otros destinos nacionales.',
    contexto: 'Tres o cuatro días, vuelo y apartamento; quiere aprovechar cada hora.',
    digital: 'Instagram y TikTok para inspirarse; compra todo desde el móvil.',
    necesidades: ['Plan cerrado y fácil de reservar', 'Precio total claro', 'Moverse entre islas o zonas sin perder el día'],
    frenos: ['Vuelos caros o con pocas frecuencias', 'Creer que Canarias es solo playa y resort', 'Poco tiempo'],
    motivaciones: ['Algo distinto y fotogénico', 'Comer bien', 'Volver con historias'],
    frase: '«Tengo cuatro días: dime qué no me puedo perder y resérvamelo.»',
    canales: ['Redes sociales', 'Comparadores', 'Newsletters de viajes'],
    validado: false,
  },
  {
    id: 'trabajador-sector',
    nombre: 'Yeray',
    edad: 26,
    origen: 'La Laguna, Tenerife',
    perfil: 'Recepcionista en un hotel del sur; estudió Turismo en la ULL.',
    contexto: 'Turnos rotativos y una hora de trayecto; valora irse fuera a trabajar.',
    digital: 'Nativo digital; usa las herramientas del hotel y muchas hojas de cálculo.',
    necesidades: ['Herramientas que le quiten tareas repetitivas', 'Información fiable para recomendar a clientes', 'Crecer en el sector'],
    frenos: ['Vivienda cara cerca del trabajo', 'Sistemas antiguos', 'Poca formación en datos e IA'],
    motivaciones: ['Quedarse en Canarias con un buen trabajo', 'Que su trabajo se note en la experiencia del cliente'],
    frase: '«Me paso el día contestando lo mismo; podría dedicar ese tiempo a algo mejor.»',
    canales: ['Formación interna', 'LinkedIn', 'Grupos de compañeros'],
    validado: false,
  },
]

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
export const JOURNEY: Record<string, PasoJourney[]> = {
  'pareja-alemana': [
    { fase: 'Inspiración', hace: 'Ve rutas por el Teide y laurisilva en redes y foros.', piensa: '¿Estará lleno? ¿Se puede ir sin coche?', dolor: 'Información dispersa y desactualizada.', oportunidad: 'Inspiración oficial con disponibilidad real.', emocion: 1, canales: ['Redes', 'Foros'] },
    { fase: 'Planificación', hace: 'Busca senderos, tasas y aparcamientos.', piensa: 'No entiendo qué hay que reservar y qué no.', dolor: 'Reglas nuevas (ecotasa, cupos) poco claras.', oportunidad: 'Un único sitio con normas, precios y alternativas.', emocion: -1, canales: ['Web del Cabildo', 'Mapas'] },
    { fase: 'Reserva', hace: 'Reserva vuelo, coche y alojamiento; intenta reservar el sendero.', piensa: 'Tres webs distintas para un mismo día.', dolor: 'Reservas fragmentadas.', oportunidad: 'Plan del día en una sola reserva.', emocion: -1, canales: ['Webs de reserva'] },
    { fase: 'Llegada', hace: 'Recoge el coche y llega al alojamiento.', piensa: '¿Qué hacemos mañana si llueve en el norte?', dolor: 'Microclimas y cambios de última hora.', oportunidad: 'Recomendaciones según tiempo y ocupación.', emocion: 0, canales: ['Móvil'] },
    { fase: 'Estancia', hace: 'Va al Teide temprano; encuentra el aparcamiento lleno.', piensa: 'Hemos madrugado para nada.', dolor: 'Saturación en puntos icónicos.', oportunidad: 'Aviso en tiempo real y alternativa equivalente.', emocion: -2, canales: ['Carretera', 'Móvil'] },
    { fase: 'Regreso', hace: 'Comparte fotos y valora.', piensa: 'Precioso, pero lo masificado empaña.', dolor: 'Sin canal para dejar retroalimentación útil al destino.', oportunidad: 'Encuesta corta que alimente la gestión del destino.', emocion: 1, canales: ['Redes', 'Email'] },
  ],
}

export const EMOCION_TXT: Record<Emocion, string> = { [-2]: 'Frustración', [-1]: 'Duda', 0: 'Neutral', 1: 'Ilusión', 2: 'Entusiasmo' }
