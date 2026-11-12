// Catálogo de experiencias REALES de Tenerife para Tenique (demo y diagnóstico).
// Mantiene: subagente de Experiencias del equipo Nova. Consulta: 12-11-2026.
// Reglas:
//   · Nada inventado. Si un dato no está en la fuente, el campo se deja vacío.
//   · verificado: true  → una fuente oficial o la del organizador muestra la edición de 2026 o la actividad en curso.
//   · verificado: false → existe, pero no se ha podido confirmar que siga activa o sus datos actuales (Por verificar).
//   · emociones: ids de EMOCIONES en src/data/usuarios.ts (pertenencia, orgullo, raices, sabor, calma, asombro,
//     adrenalina, celebracion). Las asigna el equipo según lo que cuenta la fuente; no son un dato de la fuente.
// Criterios, fuentes de apoyo y descartes: docs/experiencias-criterios.md
// Formato final del coordinador: sin precios, valoraciones ni importes (la demo los marca «ejemplo»).
// Sin dependencias de React: lo importan Prototipo y Diagnóstico.

export type Zona = 'sur' | 'metropolitana' | 'norte' | 'anaga' | 'teno' | 'medianias' | 'otra'
/** 'entidad' = institución pública. */
export type Tipo = 'vecinos' | 'asociacion' | 'empresa' | 'productor' | 'entidad'

export type Experiencia = {
  id: string
  titulo: string | { es: string; en: string }
  descripcion: string | { es: string; en: string }
  municipio: string
  /** Barrio o núcleo, si la fuente lo da. */
  lugar?: string
  zona: Zona
  /** Entidad, asociación, empresa o productor real. */
  quienOfrece: string
  tipo: Tipo
  cuando: string
  /** Solo si consta en la fuente. */
  duracion?: string
  idiomas?: string[]
  /** Vecinos y visitantes participan juntos. */
  mixta: boolean
  /** ids de EMOCIONES (src/data/usuarios.ts) */
  emociones: string[]
  fuente: { titulo: string; url: string; consultado: string }
  verificado: boolean
  /** Extra: accesibilidad, solo si la fuente la da. */
  accesibilidad?: string
  /** Extra: fuente de apoyo (prensa u otra) y el dato que aporta. */
  apoyo?: { titulo: string; url: string; dato: string }
}

const HOY = '12-11-2026'

export const EXPERIENCIAS: Experiencia[] = [
  // ───────── Norte ─────────
  {
    id: 'cacharros-puerto-de-la-cruz',
    titulo: 'Fiesta del Cacharro y la Castaña',
    descripcion:
      'Por San Andrés, los vecinos atan latas y cacharros viejos a un alambre y los arrastran por las calles hasta la plaza del Charco. Se acaba con castañas asadas, batata, gofio y vino del país. Los barrios de La Vera, Calle Nueva, Punta Brava y San Antonio hacen la suya.',
    municipio: 'Puerto de la Cruz',
    lugar: 'Plaza del Charco',
    zona: 'norte',
    tipo: 'vecinos',
    quienOfrece: 'Vecinos del Puerto de la Cruz; programa municipal de 2026 aún sin publicar',
    cuando: '29 de noviembre, al anochecer. En 2026 cae en domingo',
    emociones: ['celebracion', 'raices', 'sabor'],
    mixta: true,
    fuente: {
      titulo: 'Fiestas del cacharro y la castaña · Hola Islas Canarias (turismo oficial de Canarias)',
      url: 'https://www.holaislascanarias.com/eventos/tenerife/fiestas-del-cacharro-y-la-castana/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Fiesta del Cacharro y la Castaña · Web Tenerife',
      url: 'https://www.webtenerife.co.uk/what-to-do/culture/traditions/fiesta-cacharro-castana/',
      dato: 'Recorrido hasta la plaza del Charco, castañas, gofio, batata y vino',
    },
    verificado: true,
  },
  {
    id: 'tablas-san-andres-icod',
    titulo: 'Tablas de San Andrés',
    descripcion:
      'Jóvenes del pueblo bajan en tablas de madera por calles muy empinadas y frenan contra neumáticos. Coincide con la apertura del vino nuevo. Las calles de siempre son El Plano, San Antonio, Hércules y del Salto.',
    municipio: 'Icod de los Vinos',
    zona: 'norte',
    tipo: 'vecinos',
    quienOfrece: 'Vecinos de Icod de los Vinos; programa del Ayuntamiento',
    cuando: 'En torno al 29 y 30 de noviembre. Fechas de 2026 por verificar: las fuentes no coinciden',
    emociones: ['adrenalina', 'celebracion', 'raices'],
    mixta: true,
    fuente: {
      titulo: 'San Andrés Tables · Hello Canary Islands (turismo oficial de Canarias)',
      url: 'https://www.hellocanaryislands.com/events/tenerife/san-andres-tables/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Icod presenta el cartel y programa de las Tablas de San Andrés · El Periódico de Icod-Daute',
      url: 'https://www.elperiodicodeycodendaute.es/icod-de-los-vinos-presenta-el-cartel-y-programa-de-actos-de-las-tradicionales-tablas-de-san-andres/',
      dato: 'Calles El Plano, San Antonio y Hércules (edición de 2025)',
    },
    verificado: false,
  },
  {
    id: 'mercadillo-agricultor-tacoronte',
    titulo: 'Mercadillo del Agricultor de Tacoronte',
    descripcion:
      'Más de cien puestos de agricultores de la comarca Tacoronte-Acentejo. Fruta y verdura de temporada, vino, queso y pan. Tiene ludoteca para familias y por San Andrés hay castañas, vino y gofio. Cumple 45 años en 2026.',
    municipio: 'Tacoronte',
    lugar: 'San Juan, carretera Tacoronte–Tejina km 3,5',
    zona: 'norte',
    tipo: 'productor',
    quienOfrece: 'Mercadillo del Agricultor de Tacoronte (agricultores de Tacoronte-Acentejo)',
    cuando: 'Sábados de 8:00 a 14:30 y domingos de 8:00 a 14:00',
    emociones: ['sabor', 'pertenencia'],
    mixta: true,
    fuente: { titulo: 'Mercadillo del Agricultor de Tacoronte · web oficial', url: 'https://mercadillodelagricultor.com/', consultado: HOY },
    apoyo: {
      titulo: 'Mercados del agricultor · Agrocabildo (Cabildo de Tenerife)',
      url: 'https://www.agrocabildo.org/guia_servicios_detalle.asp?id=18&tipo=A',
      dato: 'Lo incluye en la guía de mercados del agricultor del Cabildo',
    },
    verificado: true,
  },
  {
    id: 'casa-del-vino-el-sauzal',
    titulo: 'Catas en la Casa del Vino de Tenerife',
    descripcion:
      'Museo del vino con sala de catas de vinos de la isla, talleres de cata y exposiciones. Incluye el centro de visitantes de la Miel de Tenerife.',
    municipio: 'El Sauzal',
    lugar: 'Calle San Simón 49',
    zona: 'norte',
    tipo: 'entidad',
    quienOfrece: 'Fundación Canaria Tenerife Rural',
    cuando: 'Abierta todo el año; talleres de cata con fecha (por ejemplo, 8 y 24 de octubre de 2026). Horario por verificar',
    emociones: ['sabor', 'calma'],
    mixta: true,
    fuente: { titulo: 'Casa del Vino de Tenerife · web oficial', url: 'https://casadelvinotenerife.com/', consultado: HOY },
    verificado: true,
  },
  {
    id: 'romeria-san-isidro-la-orotava',
    titulo: 'Alfombras del Corpus y Romería de San Isidro',
    descripcion:
      'Los vecinos hacen alfombras de flores y un gran tapiz de arena volcánica en la plaza del Ayuntamiento. Días después sale la romería con sus carretas. En 2026 desfilaron 77 carretas.',
    municipio: 'La Orotava',
    zona: 'norte',
    tipo: 'entidad',
    quienOfrece: 'Ayuntamiento de La Orotava (fiestas patronales)',
    cuando: 'Mayo y junio. En 2026: alfombras el 11 de junio y romería el 14 de junio',
    emociones: ['asombro', 'celebracion', 'orgullo'],
    mixta: true,
    fuente: {
      titulo: 'Romería de San Isidro Labrador 2026 · Web Tenerife',
      url: 'https://www.webtenerife.com/agenda/2026/06/romeria-de-san-isidro-labrador/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Programa de fiestas 2026 · Ayuntamiento de La Orotava',
      url: 'https://laorotava.es/sites/default/files/documentos/Programa-Fiestas-La-Orotava-2026---web_0.pdf',
      dato: 'Fechas del programa de 2026',
    },
    verificado: true,
  },
  {
    id: 'embarcacion-carmen-puerto-de-la-cruz',
    titulo: 'Embarcación de la Virgen del Carmen y San Telmo',
    descripcion:
      'Los pescadores suben a la Virgen y a San Telmo a sus barcas en el muelle pesquero. Se bendicen las aguas, la gente se tira al mar y la noche acaba con fuegos sobre la bahía. En 2026 cumplió 105 años.',
    municipio: 'Puerto de la Cruz',
    lugar: 'Muelle pesquero',
    zona: 'norte',
    tipo: 'vecinos',
    quienOfrece: 'Pescadores y parroquia de Nuestra Señora de la Peña de Francia; fiestas de julio del Ayuntamiento',
    cuando: 'El martes anterior al 16 de julio. En 2026: 14 de julio',
    emociones: ['raices', 'asombro', 'celebracion'],
    mixta: true,
    fuente: {
      titulo: 'Embarcación de la Virgen del Carmen 2026 · Web Tenerife',
      url: 'https://www.webtenerife.co.uk/events/2026/07/embarcacion-de-la-virgen-del-carmen/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Multitudinaria embarcación de la Virgen del Carmen · RTVC, 14-07-2026',
      url: 'https://rtvc.es/embarcacion-virgen-del-carmen-san-telmo-puerto-de-la-cruz-tenerife-14-julio-2026/',
      dato: 'Crónica de la edición de 2026',
    },
    verificado: true,
  },
  {
    id: 'romeria-san-roque-garachico',
    titulo: 'Romería de San Roque',
    descripcion:
      'Romería doble: una por las calles con carretas, ganado y baile de romeros, y otra que acompaña al santo en barco por la costa. Viene del siglo XVII y es de Interés Turístico Nacional. En 2026 hubo 46 carretas.',
    municipio: 'Garachico',
    zona: 'norte',
    tipo: 'vecinos',
    quienOfrece: 'Fiestas patronales de Santa Ana y San Roque de Garachico',
    cuando: 'Cada 16 de agosto. En 2026 fue la LXII edición',
    emociones: ['celebracion', 'raices', 'orgullo'],
    mixta: true,
    fuente: {
      titulo: 'Garachico celebra su día grande con la Romería de San Roque · RTVC, 2026 (prensa)',
      url: 'https://rtvc.es/lxii-romeria-de-san-roque-en-garachico-16-agosto-2026/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Noticias de fiestas · Ayuntamiento de Garachico',
      url: 'https://www.garachico.es/?news-category=fiestas',
      dato: 'Canal oficial de las fiestas; no se ha leído la ficha de 2026',
    },
    verificado: true,
  },
  {
    id: 'reforestacion-monteverde-el-sauzal',
    titulo: 'Reforestación del monteverde tras el incendio de 2023',
    descripcion:
      'Jornadas de voluntariado ambiental del Cabildo para replantar especies del monteverde (viñátigo, faya, acebiño) donde quemó el incendio de 2023. En enero y febrero de 2026 plantaron más de 90 y más de 100 participantes en Las Calderetas.',
    municipio: 'El Sauzal',
    lugar: 'Las Calderetas',
    zona: 'norte',
    tipo: 'entidad',
    quienOfrece: 'Cabildo de Tenerife, Consejería de Medio Natural',
    cuando: 'Jornadas puntuales. Últimas confirmadas: 13 de enero y 3 de febrero de 2026',
    emociones: ['pertenencia', 'calma'],
    mixta: false,
    fuente: {
      titulo: 'Tenerife impulsa la mayor reforestación tras el incendio de 2023 · Ayuntamiento de El Sauzal, 2026',
      url: 'https://www.elsauzal.es/noticias/2026/tenerife-impulsa-la-mayor-reforestacion-tras-el-incendio-de-2023-con-150-nuevos-arboles-en-el-sauzal/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'El Cabildo reforesta más de 55.000 ejemplares de monteverde · Tenerife + Sostenible',
      url: 'https://tenerifemassostenible.tenerife.es/noticias/el-cabildo-de-tenerife-reforesta-mas-de-55-000-ejemplares-de-monteverde-en-el-norte-de-la-isla/',
      dato: 'Jornada del 3 de febrero de 2026 con más de 100 participantes',
    },
    verificado: true,
  },

  // ───────── Área metropolitana ─────────
  {
    id: 'romeria-san-benito-la-laguna',
    titulo: 'Romería Regional de San Benito Abad',
    descripcion:
      'La única romería de Canarias con carácter regional. Carretas adornadas con frutos del campo, unas 40 agrupaciones folclóricas y miles de romeros con vestimenta tradicional canaria por el casco de La Laguna. En 2026, 80ª edición y más de 20.000 personas.',
    municipio: 'San Cristóbal de La Laguna',
    lugar: 'Iglesia de San Benito y casco histórico',
    zona: 'metropolitana',
    tipo: 'vecinos',
    quienOfrece: 'Fiestas de San Benito Abad; dispositivo del Ayuntamiento de La Laguna',
    cuando: 'Segundo domingo de julio. En 2026: 12 de julio',
    emociones: ['celebracion', 'raices', 'orgullo'],
    mixta: true,
    fuente: {
      titulo: 'La Romería de San Benito Abad 2026 llenará las calles de La Laguna · RTVC (prensa)',
      url: 'https://rtvc.es/romeria-san-benito-abad-2026-llenara-este-domingo-calles-la-laguna-12-julio-2026/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Más de 20.000 personas en la Romería de San Benito Abad 2026 · Canal 4 Tenerife',
      url: 'https://www.canal4tenerife.tv/mas-de-20-000-personas-se-congregan-en-la-laguna-para-disfrutar-de-la-romeria-de-san-benito-abad-2026/',
      dato: 'Asistencia de más de 20.000 personas',
    },
    verificado: true,
  },
  {
    id: 'corazones-de-tejina',
    titulo: 'Los Corazones de Tejina',
    descripcion:
      'Tres barrios, El Pico, Calle Arriba y Calle Abajo, levantan cada uno un «corazón» de unos doce metros cubierto de frutas, pan y objetos del campo. Entran en la plaza con parrandas y días después se descuelgan y se reparten al público.',
    municipio: 'San Cristóbal de La Laguna',
    lugar: 'Tejina',
    zona: 'metropolitana',
    tipo: 'vecinos',
    quienOfrece: 'Vecinos de los barrios de Tejina (fiestas de San Bartolomé)',
    cuando: 'Finales de agosto. En 2026: entrada de los Corazones el 30 de agosto y descuelgue el 31',
    emociones: ['orgullo', 'celebracion', 'pertenencia'],
    mixta: true,
    fuente: {
      titulo: 'Tejina se prepara para su día grande · Diario de Avisos, 2026 (prensa)',
      url: 'https://diariodeavisos.elespanol.com/2026/08/corazones-tejina-fiestas-2026/',
      consultado: HOY,
    },
    verificado: true,
  },
  {
    id: 'mercado-nuestra-senora-de-africa',
    titulo: 'Mercado de Nuestra Señora de África (La Recova)',
    descripcion:
      'El mercado municipal de abastos de Santa Cruz: mercado cubierto de abastos donde compran a diario los vecinos de la capital.',
    municipio: 'Santa Cruz de Tenerife',
    lugar: 'Avenida de San Sebastián 51',
    zona: 'metropolitana',
    tipo: 'productor',
    quienOfrece: 'Comerciantes del Mercado Nuestra Señora de África',
    cuando: 'Todos los días por la mañana. Horario exacto por verificar: las fuentes no coinciden',
    emociones: ['sabor', 'pertenencia'],
    mixta: true,
    fuente: {
      titulo: 'Mercado Nuestra Señora de África · Santa Cruz es Comercio',
      url: 'https://santacruzescomercio.com/listing/mercado-nuestra-senora-de-africa/',
      consultado: HOY,
    },
    verificado: false,
  },
  {
    id: 'carnaval-santa-cruz-2027',
    titulo: 'Carnaval de Santa Cruz de Tenerife 2027',
    descripcion:
      'Concursos de murgas, comparsas y rondallas, coso y bailes en la calle. En 2027 se retrasa dos semanas y el tema es «Roma Eterna: El Imperio del Carnaval». El martes de Carnaval, 23 de febrero, es festivo local.',
    municipio: 'Santa Cruz de Tenerife',
    zona: 'metropolitana',
    tipo: 'entidad',
    quienOfrece: 'Ayuntamiento de Santa Cruz de Tenerife (Fiestas de Santa Cruz)',
    cuando: 'Gala inaugural el 22 de enero de 2027. Carnaval en la calle del 19 al 28 de febrero de 2027',
    emociones: ['celebracion', 'adrenalina'],
    mixta: true,
    fuente: {
      titulo: 'Santa Cruz presenta el programa oficial del Carnaval 2027 · Ayuntamiento de Santa Cruz de Tenerife',
      url: 'https://www.santacruzdetenerife.es/web/servicios-municipales/fiestas/noticias/noticia/santa-cruz-presenta-el-programa-oficial-de-los-concursos-galas-y-actos-del-carnaval-2027',
      consultado: HOY,
    },
    verificado: true,
  },
  {
    id: 'juego-del-palo-la-laguna',
    titulo: 'Escuelas municipales de juego del palo canario',
    descripcion:
      'Clases de juego del palo para niños desde 7 años en colegios públicos de La Laguna, con la dirección técnica del Colectivo Universitario de Palo Canario de la ULL, fundado en 1971.',
    municipio: 'San Cristóbal de La Laguna',
    zona: 'metropolitana',
    tipo: 'entidad',
    quienOfrece: 'Organismo Autónomo de Deportes de La Laguna y Colectivo Universitario de Palo Canario (ULL)',
    cuando: 'Curso 2026-27, de octubre a mayo; dos sesiones por semana',
    emociones: ['raices', 'orgullo'],
    mixta: false,
    fuente: {
      titulo: 'Actividad extraescolar de juego del palo · CEIP Camino Largo (Gobierno de Canarias), 23-06-2026',
      url: 'https://www3.gobiernodecanarias.org/medusa/edublog/ceipcaminolargo/2026/06/23/actividad-extraescolar-de-juego-del-palo/',
      consultado: HOY,
    },
    verificado: true,
  },

  // ───────── Anaga ─────────
  {
    id: 'anaga-biofest-pesca-punta-del-hidalgo',
    titulo: 'Anaga Biofest: ruta con la Cofradía de Pescadores de Punta del Hidalgo',
    descripcion:
      'Festival de ecoturismo en la Reserva de la Biosfera de Anaga. Una de sus rutas va por el Sendero Azul de Punta del Hidalgo, visita fincas y la cofradía, donde los pescadores hacen de anfitriones. Cubre agricultura, pesca artesanal, producto local y memoria vecinal.',
    municipio: 'San Cristóbal de La Laguna',
    lugar: 'Punta del Hidalgo',
    zona: 'anaga',
    tipo: 'asociacion',
    quienOfrece: 'Ecotouristing Ideas Regenerativas, con la Cofradía de Pescadores Nuestra Señora de la Consolación',
    cuando: 'Otoño (VI edición en 2026)',
    duracion: 'Unas 4 horas',
    emociones: ['raices', 'sabor', 'calma'],
    mixta: true,
    fuente: { titulo: 'Actividades · Anaga Biofest', url: 'https://www.biofest-anaga.com/actividades/', consultado: HOY },
    apoyo: {
      titulo: 'La pesca artesanal de Tenerife y Gran Canaria lleva su colaboración al Congreso de Ecoturismo · La Noción, 04-11-2026',
      url: 'https://www.lanocion.es/canarias/20261104/la-pesca-artesanal-de-tenerife-y-gran-canaria-llev-91f5b.html',
      dato: 'Hermanamiento Punta del Hidalgo–Agaete y edición de 2026',
    },
    verificado: true,
  },
  {
    id: 'anaga-cruz-del-carmen-sendero-sentidos',
    titulo: 'Centro de Visitantes de Cruz del Carmen y Sendero de los Sentidos',
    descripcion:
      'Centro de interpretación del Parque Rural de Anaga, a unos 920 metros, en plena laurisilva. Ofrece rutas guiadas con reserva previa. Desde allí sale el Sendero de los Sentidos, un paseo corto y llano.',
    municipio: 'San Cristóbal de La Laguna',
    lugar: 'Cruz del Carmen',
    zona: 'anaga',
    tipo: 'entidad',
    quienOfrece: 'Cabildo de Tenerife (Parque Rural de Anaga)',
    cuando: 'Horario por verificar. Rutas guiadas con reserva previa',
    accesibilidad: 'La guía municipal La Laguna Inclusiva incluye el centro; el Sendero de los Sentidos admite carritos y sillas de ruedas según una web educativa. Por verificar',
    emociones: ['calma', 'asombro'],
    mixta: true,
    fuente: {
      titulo: 'Centros de visitantes · Guía La Laguna Inclusiva (Ayuntamiento de La Laguna)',
      url: 'https://www.aytolalaguna.es/CDN/files/servicios/servicios-sociales/.galleries/DOCUMENTOS-La-Laguna-inclusiva/17.-Centros-de-visitantes-de-La-Laguna.pdf',
      consultado: HOY,
    },
    verificado: false,
  },

  {
    id: 'fiestas-taganana',
    titulo: 'Fiestas de Nuestra Señora de las Nieves en Taganana',
    descripcion:
      'Las fiestas de un caserío de Anaga, hechas por su asociación de vecinos: misa y procesión con fuegos, torneo de envite, verbenas y fiesta infantil del agua.',
    municipio: 'Santa Cruz de Tenerife',
    lugar: 'Taganana',
    zona: 'anaga',
    tipo: 'vecinos',
    quienOfrece: 'Asociación de Vecinos Nuestra Señora de las Nieves',
    cuando: 'De mediados de julio a mediados de agosto; día principal el 5 de agosto. En 2026, del 18 de julio al 16 de agosto',
    emociones: ['pertenencia', 'celebracion'],
    mixta: true,
    fuente: {
      titulo: 'Taganana vive el día principal de sus fiestas · Sol del Sur, 05-08-2026 (prensa)',
      url: 'https://www.soldelsurtenerife.com/area-metropolitana-santa-cruz-laguna/taganana-vive-dia-principal-fiestas-honor-nuestra-senora-nieves/20260805174117108818.html',
      consultado: HOY,
    },
    verificado: true,
  },

  // ───────── Teno ─────────
  {
    id: 'voluntariado-acantilados-de-teno',
    titulo: 'Aliadas por la Conservación: voluntariado en los Acantilados de Teno',
    descripcion:
      'Campaña de voluntariado ambiental en el Parque Rural de Teno, con diez acciones en tres líneas de trabajo. La coordina la Oficina de la Participación y el Voluntariado Ambiental del Cabildo.',
    municipio: 'Buenavista del Norte',
    lugar: 'Parque Rural de Teno',
    zona: 'teno',
    tipo: 'entidad',
    quienOfrece: 'Cabildo de Tenerife (Medio Natural y Oficina del Voluntariado Ambiental), con Rumbo Ziday',
    cuando: 'Verano de 2026. Próximas ediciones por verificar',
    emociones: ['pertenencia', 'calma'],
    mixta: false,
    fuente: {
      titulo: 'Nueva iniciativa de voluntariado ambiental: Acantilados de Teno · RENATURMAC (ITER), 04-08-2026',
      url: 'https://renaturmac.iter.es/en-marcha-una-nueva-iniciativa-de-voluntariado-ambiental-dentro-de-la-campana-aliadas-por-la-conservacion-acantilados-de-teno/',
      consultado: HOY,
    },
    verificado: true,
  },
  {
    id: 'queserias-teno-alto',
    titulo: 'Queso de cabra en las queserías de Teno Alto',
    descripcion:
      'En Teno Alto el pastoreo y el queso artesano siguen siendo el sustento del caserío. Las queserías Naturteno y Flores de Teno elaboran y venden queso de cabra en la propia finca.',
    municipio: 'Buenavista del Norte',
    lugar: 'Teno Alto',
    zona: 'teno',
    tipo: 'productor',
    quienOfrece: 'Quesería Naturteno y Quesería Flores de Teno',
    cuando: 'Todos los días según la ficha municipal. Horario actual por verificar',
    emociones: ['sabor', 'raices'],
    mixta: true,
    fuente: {
      titulo: 'Quesería Naturteno · Ayuntamiento de Buenavista del Norte',
      url: 'https://www.buenavistadelnorte.es/project/queseria-naturteno/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Queso de cabra, ganadero joven y pastoreo en Teno Alto · Pellagofio (2023)',
      url: 'https://pellagofio.es/islenos/sociedad-rural/queso-de-cabra-ganadero-joven-y-pastoreo-en-teno-alto/',
      dato: 'El ganadero vende también los sábados en el mercado de Buenavista',
    },
    verificado: false,
  },

  {
    id: 'mercado-agricultor-buenavista',
    titulo: 'Mercado del Agricultor y Artesano de Buenavista del Norte',
    descripcion: 'Mercado semanal en la plaza del pueblo con producto agrícola, artesanía y producto ecológico de la comarca de Teno.',
    municipio: 'Buenavista del Norte',
    lugar: 'Plaza Nuestra Señora de Los Remedios',
    zona: 'teno',
    tipo: 'productor',
    quienOfrece: 'Mercado del Agricultor y Artesano de Buenavista (ficha en la web del Ayuntamiento)',
    cuando: 'Sábados de 8:30 a 14:00. Por verificar: la ficha municipal no tiene fecha',
    emociones: ['sabor', 'pertenencia'],
    mixta: true,
    fuente: {
      titulo: 'Mercado del Agricultor y Artesano de Buenavista · Ayuntamiento de Buenavista del Norte',
      url: 'https://www.buenavistadelnorte.es/project/mercadillo-del-agricultor-buenavista/',
      consultado: HOY,
    },
    verificado: false,
  },

  // ───────── Medianías ─────────
  {
    id: 'feria-artesania-pinolere',
    titulo: 'Feria de Artesanía de Pinolere',
    descripcion:
      'La gran cita de la artesanía canaria: cerca de 200 artesanos de varias islas, talleres, folclore, concursos y mercado de productos. En 2026, 41ª edición dedicada a la madera.',
    municipio: 'La Orotava',
    lugar: 'Museo y Parque Etnográfico de Pinolere',
    zona: 'medianias',
    tipo: 'asociacion',
    quienOfrece: 'Proyecto cultural de Pinolere (nombre exacto de la entidad por verificar)',
    cuando: 'Primer fin de semana de septiembre. En 2026: del 4 al 6 de septiembre, desde las 10:00',
    emociones: ['raices', 'orgullo'],
    mixta: true,
    fuente: {
      titulo: '41st Pinolere Craft Fair · Web Tenerife',
      url: 'https://www.webtenerife.co.uk/events/2026/09/41-feria-de-artesania-de-pinolere-la-orotava/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'La gran cita de la artesanía canaria ya tiene fecha · Diario de Avisos, 2026',
      url: 'https://diariodeavisos.elespanol.com/2026/08/feria-pinolere-2026-artesania-canaria/',
      dato: 'Cerca de 200 artesanos de diferentes islas',
    },
    verificado: true,
  },
  {
    id: 'alfareria-cha-domitila-arguayo',
    titulo: 'Alfarería sin torno en el Centro Alfarero Cha Domitila',
    descripcion:
      'Museo y taller en una casa canaria de Arguayo. Muestra la loza modelada a mano, sin torno, con barro, arena volcánica, almagre y callaos, como hacían las alfareras del pueblo.',
    municipio: 'Santiago del Teide',
    lugar: 'Arguayo',
    zona: 'medianias',
    tipo: 'entidad',
    quienOfrece: 'Ayuntamiento de Santiago del Teide (Cultura)',
    cuando: 'Horario por verificar: la web municipal pide confirmar la apertura antes de ir',
    emociones: ['raices', 'calma'],
    mixta: true,
    fuente: {
      titulo: 'Centro Alfarero y Museo Etnográfico Cha Domitila · santiagodelteide.com',
      url: 'https://santiagodelteide.com/que-ver/centro-alfarero-cha-domitila/',
      consultado: HOY,
    },
    verificado: false,
  },

  {
    id: 'romeria-vilaflor',
    titulo: 'Romería de Vilaflor de Chasna',
    descripcion:
      'La romería de San Roque y San Agustín en el municipio más alto de España: carretas, yuntas de bueyes y trajes tradicionales con el paisaje del sur al fondo. Más tranquila que las grandes romerías de la isla.',
    municipio: 'Vilaflor de Chasna',
    zona: 'medianias',
    tipo: 'vecinos',
    quienOfrece: 'Fiestas patronales de Vilaflor',
    cuando: 'Finales de agosto. En 2026: 30 de agosto',
    emociones: ['raices', 'calma', 'celebracion'],
    mixta: true,
    fuente: { titulo: 'Procession of Vilaflor 2026 · Web Tenerife', url: 'https://www.webtenerife.co.uk/events/2026/08/romeria-de-vilaflor/', consultado: HOY },
    verificado: true,
  },

  // ───────── Sur ─────────
  {
    id: 'mercado-agricultor-san-miguel',
    titulo: 'Mercado del Agricultor de San Miguel de Abona',
    descripcion:
      'Mercado de producto local y de temporada en Las Chafiras, abierto en 2000. Unos 66 puestos, con talleres y degustaciones a lo largo del año. A pocos minutos de la zona turística del sur.',
    municipio: 'San Miguel de Abona',
    lugar: 'Las Chafiras',
    zona: 'sur',
    tipo: 'productor',
    quienOfrece: 'Asociación del Mercado del Agricultor de San Miguel',
    cuando: 'Miércoles, sábados y domingos de 8:00 a 14:00',
    emociones: ['sabor', 'pertenencia'],
    mixta: true,
    fuente: { titulo: 'Mercado del Agricultor de San Miguel de Abona · web oficial', url: 'https://www.mercadosanmigueldeabona.com/', consultado: HOY },
    apoyo: {
      titulo: 'Asociación del Mercado del Agricultor · Ayuntamiento de San Miguel de Abona',
      url: 'https://www.sanmigueldeabona.es/2011/09/22/asociacion-del-mercado-del-agricultor/',
      dato: 'Lo gestiona una asociación de agricultores (página de 2011)',
    },
    verificado: true,
  },
  {
    id: 'agromercado-adeje',
    titulo: 'Agromercado de Adeje',
    descripcion: 'Mercado del agricultor municipal de Adeje, en el corazón del sur turístico.',
    municipio: 'Adeje',
    lugar: 'Polígono Las Torres, calle Archajara',
    zona: 'sur',
    tipo: 'productor',
    quienOfrece: 'Ayuntamiento de Adeje',
    cuando: 'Sábados y domingos de 8:00 a 13:30 según Agrocabildo. Por verificar',
    emociones: ['sabor'],
    mixta: true,
    fuente: {
      titulo: 'Guía de servicios: mercados del agricultor · Agrocabildo (Cabildo de Tenerife)',
      url: 'https://www.agrocabildo.org/guia_servicios_detalle.asp?id=18&tipo=A',
      consultado: HOY,
    },
    verificado: false,
  },
  {
    id: 'bajada-virgen-del-socorro-guimar',
    titulo: 'Bajada de la Virgen del Socorro',
    descripcion:
      'Considerada la romería más antigua de Canarias. De madrugada, miles de peregrinos acompañan a la Virgen desde Güímar hasta la ermita de El Socorro, junto a la playa de Chimisay. Por la tarde se representa la ceremonia guanche. Ayuntamientos como El Sauzal organizan guaguas para ir juntos.',
    municipio: 'Güímar',
    lugar: 'De San Pedro Apóstol a la ermita de El Socorro',
    zona: 'sur',
    tipo: 'entidad',
    quienOfrece: 'Parroquia y fiestas de Güímar; «pateada» en guagua del Ayuntamiento de El Sauzal',
    cuando: 'Cada 7 de septiembre. En 2026, lunes 7 de septiembre, desde las 4:00',
    emociones: ['raices', 'pertenencia', 'asombro'],
    mixta: true,
    fuente: {
      titulo: 'Pateada «Bajada de la Virgen del Socorro» en Güímar 2026 · Ayuntamiento de El Sauzal',
      url: 'https://www.elsauzal.es/actividad/pateada-bajada-de-la-virgen-del-socorro-en-guimar-2026/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Bajada del Socorro en Güímar: horarios y guaguas · Diario de Avisos, 2026',
      url: 'https://diariodeavisos.elespanol.com/2026/09/bajada-socorro-guimar-horarios-guaguas/',
      dato: 'Horarios y recorrido de 2026',
    },
    verificado: true,
  },
  {
    id: 'peregrinacion-candelaria',
    titulo: 'Peregrinación a Candelaria',
    descripcion:
      'En la noche del 14 al 15 de agosto miles de personas caminan desde toda la isla hasta la Basílica de Candelaria, patrona de Canarias. El 14 al atardecer se representa en la plaza el hallazgo de la imagen por los guanches.',
    municipio: 'Candelaria',
    lugar: 'Basílica de Candelaria',
    zona: 'sur',
    tipo: 'vecinos',
    quienOfrece: 'Fiestas de la Virgen de Candelaria',
    cuando: '14 y 15 de agosto, cada año',
    emociones: ['pertenencia', 'raices'],
    mixta: true,
    fuente: {
      titulo: 'Festividad de la Virgen de Candelaria 2026 · Web Tenerife',
      url: 'https://www.webtenerife.co.uk/events/2026/08/festividad-de-la-virgen-de-candelaria/',
      consultado: HOY,
    },
    apoyo: {
      titulo: 'Candelaria celebra el día grande de la Virgen · RTVC, 15-08-2026',
      url: 'https://rtvc.es/festividad-de-la-virgen-de-candelaria-15-agosto-2026/',
      dato: 'Miles de peregrinos en 2026; la procesión se suspendió por el viento',
    },
    verificado: true,
  },
  {
    id: 'lucha-canaria-frenegal-guimar',
    titulo: 'Ver una luchada de lucha canaria en el terrero',
    descripcion:
      'La liga insular se juega en terreros de toda la isla, con equipos de barrio como el CL Frenegal de Güímar. La temporada 2026-27 ya ha empezado, con ligas masculinas, femenina y de base.',
    municipio: 'Güímar',
    zona: 'sur',
    tipo: 'asociacion',
    quienOfrece: 'Federación Insular de Lucha Canaria de Tenerife y clubes',
    cuando: 'Temporada de otoño a primavera; calendario por jornadas',
    emociones: ['adrenalina', 'raices', 'orgullo'],
    mixta: true,
    fuente: { titulo: 'Federación Insular de Lucha Canaria de Tenerife', url: 'https://www.fdlctenerife.es/', consultado: HOY },
    apoyo: {
      titulo: 'Canario Lucha · resultados por isla',
      url: 'https://www.canariolucha.com/',
      dato: 'Luchadas de la temporada 2026-27 en Tenerife (noviembre de 2026)',
    },
    verificado: false,
  },

  // ───────── Cumbre (otra) ─────────
  {
    id: 'puertas-abiertas-observatorio-teide',
    titulo: 'Jornadas de Puertas Abiertas del Observatorio del Teide',
    descripcion:
      'Un fin de semana al año el Instituto de Astrofísica de Canarias abre sus telescopios a la ciudadanía. Con inscripción previa; en 2026 se llenó.',
    municipio: 'La Orotava',
    lugar: 'Izaña',
    zona: 'otra',
    tipo: 'entidad',
    quienOfrece: 'Instituto de Astrofísica de Canarias (IAC)',
    cuando: 'Una vez al año. En 2026: 20 y 21 de junio',
    duracion: 'Unas 3 horas',
    idiomas: ['es'],
    emociones: ['asombro', 'orgullo'],
    mixta: true,
    fuente: { titulo: 'Open days at the Teide Observatory 2026 · IAC', url: 'https://www.iac.es/en/events/open-days-teide-observatory-2026', consultado: HOY },
    verificado: true,
  },
  {
    id: 'visita-guiada-observatorio-teide',
    titulo: 'Visita guiada de día al Observatorio del Teide',
    descripcion:
      'Visita a las instalaciones científicas: el Sol con telescopios solares portátiles, un taller de astrofísica y el interior de un telescopio nocturno. La organiza una empresa turística.',
    municipio: 'La Orotava',
    lugar: 'Izaña',
    zona: 'otra',
    tipo: 'empresa',
    quienOfrece: 'Volcano Teide',
    cuando: 'Todos los días en español e inglés; francés y alemán, algunos días entre semana',
    duracion: 'Hora y media',
    idiomas: ['es', 'en', 'fr', 'de'],
    accesibilidad: 'No recomendada para personas con movilidad reducida: hay caminos y escaleras, a unos 2.400 m de altitud',
    emociones: ['asombro'],
    mixta: false,
    fuente: {
      titulo: 'Guided visit of the Teide Observatory · Volcano Teide',
      url: 'https://www.volcanoteide.com/en/volcano_teide/stars/guided_visit_of_the_observatory',
      consultado: HOY,
    },
    verificado: true,
  },
]

/** Resumen para el diagnóstico. */
export const RESUMEN_EXPERIENCIAS = {
  total: EXPERIENCIAS.length,
  verificadas: EXPERIENCIAS.filter((e) => e.verificado).length,
  mixtas: EXPERIENCIAS.filter((e) => e.mixta).length,
  consultado: HOY,
}
