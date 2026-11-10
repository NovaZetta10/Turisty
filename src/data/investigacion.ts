// Investigación previa · turismo en Canarias (consultado el 10-11-2026).
// Cada dato lleva su fuente [n]. `verificado: false` = no se pudo comprobar en la fuente primaria.

export type Fuente = { id: number; titulo: string; medio: string; fecha: string; url: string; abierta: boolean }

export const FUENTES: Fuente[] = [
  { id: 1, titulo: 'Cifras del turismo en Canarias 2025', medio: 'Promotur · Turismo de Islas Canarias', fecha: '2026', url: 'https://turismodeislascanarias.com/sites/default/files/2026-06/cifras_turismo_en_canarias_2025.pdf', abierta: true },
  { id: 2, titulo: 'Frontur, septiembre de 2026 (nota de prensa)', medio: 'INE', fecha: '04-11-2026', url: 'https://www.ine.es/dyngs/Prensa/FRONTUR0926.pdf', abierta: true },
  { id: 3, titulo: 'Canarias marca máximo histórico de turistas extranjeros en 2025', medio: 'RTVC', fecha: '03-02-2026', url: 'https://rtvc.es/canarias-maximo-historico-turistas-extranjeros-2025/', abierta: true },
  { id: 4, titulo: 'Canarias cierra un ciclo turístico sin precedentes: 18,6 millones de visitantes', medio: 'RTVC', fecha: '24-02-2026', url: 'https://rtvc.es/canarias-cierra-ciclo-turistico-precedentes-recibir-186-millones-visitantes-2025-24-febrero-2026/', abierta: true },
  { id: 5, titulo: 'Canarias prevé cerrar 2026 con más de 18 millones de turistas', medio: 'RTVC (previsión de Excelcan)', fecha: '15-09-2026', url: 'https://rtvc.es/canarias-preve-cerrar-2026-con-mas-de-18-millones-de-turistas-15-septiembre-2026/', abierta: true },
  { id: 6, titulo: 'Canarias mantiene casi el mismo turismo extranjero a mitad de 2026', medio: 'elDiario.es', fecha: '03-08-2026', url: 'https://www.eldiario.es/canariasahora/turismo/canarias-mantiene-turismo-extranjero-mitad-2026-ejercicio-record-anterior_1_13424814.html', abierta: true },
  { id: 7, titulo: 'Turismo en Canarias en julio: única caída', medio: 'Moncloa.com', fecha: '02-09-2026', url: 'https://www.moncloa.com/2026/09/02/turismo-canarias-julio-unica-caida-3424754/', abierta: true },
  { id: 8, titulo: 'Balance de situación turística de Tenerife 2025', medio: 'Turismo de Tenerife', fecha: '2026', url: 'https://www.webtenerife.com/-/media/files/investigacion/situacion-turistica/informes-de-situacin-turstica-de-tenerife/relateddocuments/2025/balance-de-situacin-turstica-de-tenerife-2025.pdf', abierta: true },
  { id: 9, titulo: 'La Palma acelera y el resto de Canarias reescribe su mapa turístico', medio: 'Vozpópuli (sin fuente primaria)', fecha: '07-2026', url: 'https://www.vozpopuli.com/espana/canarias/la-palma-acelera-y-el-resto-de-canarias-reescribe-su-mapa-turistico-para-esquivar-la-crisis-germana.html', abierta: true },
  { id: 10, titulo: 'Estadística experimental de vivienda vacacional, abril de 2026', medio: 'ISTAC', fecha: '20-05-2026', url: 'https://www.gobiernodecanarias.org/istac/.content/noticias/estadistica-experimental-vivienda-vacacional-noticia-2026-abril.html', abierta: true },
  { id: 11, titulo: 'Vivienda vacacional en Canarias: inspecciones municipales', medio: 'Moncloa.com', fecha: '16-08-2026', url: 'https://www.moncloa.com/2026/08/16/vivienda-vacacional-canarias-inspecciones-3416315', abierta: true },
  { id: 12, titulo: 'La ecotasa reduce de 38.200 a 10.893 las visitas al Teide', medio: 'RTVC', fecha: '04-03-2026', url: 'https://rtvc.es/la-ecotasa-reduce-de-38-200-a-10-893-las-visitas-al-teide-4-marzo-2026/', abierta: true },
  { id: 13, titulo: 'El Cabildo de Tenerife activa la ecotasa para los senderos del Teide', medio: 'RTVC', fecha: '18-01-2026', url: 'https://rtvc.es/el-cabildo-de-tenerife-activa-la-ecotasa-para-los-senderos-del-teide-18-enero-2026/', abierta: true },
  { id: 14, titulo: 'Falta de personal en el sector hotelero pese al récord de 2025', medio: 'RTVC (Ashotel)', fecha: '21-01-2026', url: 'https://rtvc.es/jorge-marichal-advierte-de-la-falta-de-personal-en-el-sector-hotelero-pese-al-record-turistico-de-2025/', abierta: true },
  { id: 15, titulo: 'Turismo de Canarias impulsa su modelo regenerativo con 48,3 millones para 2026', medio: 'RTVC', fecha: '12-02-2026', url: 'https://rtvc.es/turismo-de-canarias-impulsa-su-modelo-regenerativo-con-483-millones-para-2026-12-febrero/', abierta: true },
  { id: 16, titulo: 'Presentación Smart Data Canarias', medio: 'Ashotel y patronales', fecha: '31-07-2025', url: 'https://ashotel.es/wp-content/uploads/2025/07/31072025-presentacion-Smart-Data-Canarias-patronales.pdf', abierta: true },
  { id: 17, titulo: 'istacr: cliente de la API de datos del ISTAC', medio: 'CRAN', fecha: '—', url: 'https://cran.r-project.org/web/packages/istacr/refman/istacr.html', abierta: true },
  { id: 18, titulo: 'Talento Canario conecta en Madrid a más de 200 jóvenes con el tejido empresarial', medio: 'Gobierno de Canarias', fecha: '22-05-2026', url: 'https://www3.gobiernodecanarias.org/noticias/hemeroteca/talento-canario-conecta-en-madrid-a-mas-de-200-jovenes-con-el-tejido-empresarial-y-referentes-de-las-islas/', abierta: true },
  { id: 19, titulo: 'El Talento Canario vuela alto de la mano del Gobierno de Canarias y Binter', medio: 'Gobierno de Canarias', fecha: '30-04-2026', url: 'https://www3.gobiernodecanarias.org/noticias/el-talento-canario-vuela-alto-de-la-mano-del-gobierno-de-canarias-y-binter/', abierta: true },
  { id: 20, titulo: 'Hackatón Impulso Comercio Canarias', medio: 'Impulso Comercio Canarias', fecha: '18-06-2026', url: 'https://impulsocomerciocanarias.com/', abierta: true },
  { id: 21, titulo: 'Proexca incentiva la innovación de los jóvenes en el Hackathon de Canarias', medio: 'Gobierno de Canarias', fecha: '2025', url: 'https://www3.gobiernodecanarias.org/noticias/hemeroteca/proexca-incentiva-la-innovacion-de-los-jovenes-con-un-reto-en-el-hackathon-de-canarias/', abierta: true },
  { id: 22, titulo: 'Guest Intelligence App', medio: 'Lopesan', fecha: '2020–2023', url: 'https://www.lopesan.com/es/corporativa/guest-intelligence-app/', abierta: true },
  { id: 23, titulo: 'Alianza Quinta y Dunas Hotels', medio: 'Quinta', fecha: '25-10-2024', url: 'https://www.quinta.im/blog/quinta-dunas-hotels-partnership/', abierta: true },
  { id: 24, titulo: 'BlueBay lanza su Living Lab Hotel', medio: 'BlueBay Hotels', fecha: 's. f.', url: 'https://www.bluebayhotels.com/en/press-room/bluebay-hotels-launches-its-living-lab-hotel-to-boost-the-tourism-innovation-process-in-the-canary-islands/', abierta: true },
  { id: 25, titulo: 'Observatorio Turístico de Canarias con IA y big data', medio: 'Ayesa Digital', fecha: '27-05-2026', url: 'https://ayesa-digital.com/en/press/canary-islands-and-ayesa-digital-integrate-ai-and-big-data-into-the-tourism-observatory-to-optimize-planning-and-strengthen-the-destination/', abierta: true },
  { id: 26, titulo: 'Cámaras y sensores en el Teide para gestionar visitantes', medio: 'Canarian Weekly', fecha: '07-05-2025', url: 'https://www.canarianweekly.com/posts/Teide-to-get-cameras-and-sensors-to-manage-tourist-and-visitor-numbers', abierta: true },
  { id: 27, titulo: 'PRUG del Teide: lanzaderas, control de aparcamientos y reservas', medio: 'RTVC', fecha: '2026', url: 'https://rtvc.es/rosa-davila-avanza-detalles-del-prug-del-teide-lanzaderas-control-de-aparcamientos-y-reservas-previas/', abierta: true },
  { id: 28, titulo: 'Premio a la innovación turística sostenible (reservas por franjas)', medio: 'Volcano Teide', fecha: '2021', url: 'https://blog.volcanoteide.com/en/prize-tourist-innovation-sustainable', abierta: true },
  { id: 29, titulo: 'Nace Tenerife ON', medio: 'Cabildo de Tenerife', fecha: 's. f.', url: 'https://www.tenerifeon.es/en/updates-and-news/nace-tenerife-on-2', abierta: true },
  { id: 30, titulo: 'Venice Access Fee', medio: 'Comune di Venezia', fecha: '2024', url: 'https://veneziaunica.it/en/content/venice_access_fee', abierta: true },
  { id: 31, titulo: 'Málaga desarrolla una plataforma inteligente de destino', medio: 'Interempresas', fecha: '25-03-2025', url: 'https://www.interempresas.net/Smart_Cities/592364-Malaga-desarrolla-plataforma-inteligente-destino-4-6-millones-euros-fondos-europeos.html', abierta: true },
  { id: 32, titulo: 'València Tourist Card', medio: 'Fundación Visit València', fecha: 's. f.', url: 'https://fundacion.visitvalencia.com/en/digitalisation/valencia-tourist-card', abierta: true },
  { id: 33, titulo: 'Tallinn Card mobile app growing in popularity', medio: 'ERR News', fecha: '25-01-2024', url: 'https://news.err.ee/1609232781/tallinn-card-mobile-app-growing-in-popularity', abierta: true },
  { id: 34, titulo: 'Copenhagen expands sustainable tourism scheme (CopenPay)', medio: 'Comisión Europea · Urban Mobility Observatory', fecha: '23-07-2025', url: 'https://urban-mobility-observatory.transport.ec.europa.eu/news-events/news/copenhagen-expands-sustainable-tourism-scheme-summer-2025-2025-07-23_en', abierta: true },
  { id: 35, titulo: 'Closed for Maintenance', medio: 'Visit Faroe Islands', fecha: '2019', url: 'https://visitfaroeislands.com/en/about5', abierta: true },
  { id: 36, titulo: 'The Icelandic Pledge', medio: 'Ferðamálastofa (Turismo de Islandia)', fecha: '2017', url: 'https://www.ferdamalastofa.is/en/news/take-the-icelandic-pledge', abierta: true },
  { id: 37, titulo: 'Iberostar elimina los plásticos de un solo uso', medio: 'Iberostar', fecha: '18-04-2018', url: 'https://www.iberostar.com/en/press_room/news/iberostar-eliminates-single-use-plastics-from-all-its-hotel-rooms', abierta: true },
  { id: 38, titulo: 'GHT Hotels y HiJiffy', medio: 'Hotel Tech Report (caso del proveedor)', fecha: '2025', url: 'https://hoteltechreport.com/news/ght-hotels', abierta: true },
  { id: 39, titulo: 'Retos Digitales de Ashotel: premio a un hotel de La Gomera', medio: 'Hosteltur', fecha: '2019', url: 'https://www.hosteltur.com/133106_un-hotel-de-la-gomera-premiado-por-su-proyecto-de-integracion-de-datos.html', abierta: true },
  { id: 40, titulo: 'Mālama Hawaiʻi dashboard', medio: 'Maui Now', fecha: '10-04-2024', url: 'https://mauinow.com/2024/04/10/malama-hawaii-dashboard-connects-visitors-with-volunteer-opportunities-and-nonprofits/', abierta: false },
]

export type Dato = { etiqueta: string; valor: string; detalle?: string; fuentes: number[]; verificado: boolean }

export const AVISO_SERIES =
  'La prensa mezcla tres series: Promotur cuenta turistas totales (18,4 M en 2025), el INE solo extranjeros (15,69 M) y algunos medios «visitantes» (18,6 M). En la presentación usad una sola y citadla.'

export const CIFRAS_2025: Dato[] = [
  { etiqueta: 'Turistas totales', valor: '18,4 M', detalle: '+3,5 % frente a 2024', fuentes: [1], verificado: true },
  { etiqueta: 'Turistas extranjeros', valor: '15,69 M', detalle: '+3,0 %, récord por segundo año', fuentes: [3], verificado: true },
  { etiqueta: 'Gasto de extranjeros', valor: '24.431 M€', detalle: '+6,8 % (Egatur)', fuentes: [3], verificado: true },
  { etiqueta: 'Gasto medio por viaje', valor: '1.438 €', detalle: '178 € por día', fuentes: [1], verificado: true },
  { etiqueta: 'Estancia media', valor: '9,2 días', detalle: '-1 %', fuentes: [1], verificado: true },
  { etiqueta: 'Ocupación alojativa', valor: '82,2 %', detalle: 'ADR 127 € · RevPAR 105 €', fuentes: [1], verificado: true },
  { etiqueta: 'Plazas aéreas', valor: '24 M', detalle: '726 rutas, 154 destinos, 50 aerolíneas', fuentes: [1], verificado: true },
  { etiqueta: 'Peso de Reino Unido y Alemania', valor: '≈ 60 %', detalle: 'de los turistas extranjeros', fuentes: [6], verificado: true },
]

export const CIFRAS_2026: Dato[] = [
  { etiqueta: 'Extranjeros enero–septiembre', valor: '11,36 M', detalle: '-0,5 %, mientras España crece +5,2 %', fuentes: [2], verificado: true },
  { etiqueta: 'Julio', valor: '-0,7 %', detalle: 'única comunidad en caída; estancia ≈ 7,5 días (-8 %)', fuentes: [7], verificado: true },
  { etiqueta: 'Previsión del año', valor: '> 18 M', detalle: '-2 %; empleo de 233.020 personas (previsión de Excelcan, no oficial)', fuentes: [5], verificado: true },
  { etiqueta: 'Plazas desde Alemania (agosto)', valor: '-7,9 %', detalle: 'Francia +30,2 %; La Palma gana conectividad', fuentes: [9], verificado: false },
  { etiqueta: 'Viviendas vacacionales (abril)', valor: '42.367', detalle: '-18 % interanual; 173.770 plazas', fuentes: [10], verificado: true },
  { etiqueta: 'Visitas a senderos del Teide', valor: '-71,5 %', detalle: 'de 38.200 a 10.893 en un mes con la ecotasa', fuentes: [12], verificado: true },
]

export type Tema = { titulo: string; resumen: string; puntos: string[]; fuentes: number[] }

export const DEBATES: Tema[] = [
  {
    titulo: 'Estancamiento y dependencia de dos mercados',
    resumen: 'Canarias es la única comunidad que pierde turistas extranjeros en 2026 mientras España crece.',
    puntos: ['Reino Unido y Alemania suman casi el 60 % de los extranjeros.', 'Alemania pierde plazas aéreas; Francia y La Palma ganan.', 'La estancia media se acorta en verano.'],
    fuentes: [2, 6, 7, 9],
  },
  {
    titulo: 'Vivienda vacacional y vivienda para residentes',
    resumen: 'La oferta cae un 18 % y hay una reforma con regularización e inspecciones municipales.',
    puntos: ['Los ayuntamientos debían aprobar sus planes de inspección antes del 13-8-2026.', 'En La Laguna solo 86 de 1.179 viviendas inscritas tramitaron la comunicación previa.', 'La relación exacta entre la Ley 6/2025 y la reforma de julio de 2026 está por verificar.'],
    fuentes: [10, 11],
  },
  {
    titulo: 'Presión en espacios naturales y movilidad',
    resumen: 'La ecotasa del Teide cambió el comportamiento en un mes; el Cabildo prepara lanzaderas y reserva de aparcamiento.',
    puntos: ['Telesforo Bravo: 15 € para no residentes en Canarias; gratis para residentes en Tenerife.', '9 cámaras y 30 contadores de visitantes (1,8 M€).', 'Se estudia limitar el vehículo privado.'],
    fuentes: [12, 13, 26, 27],
  },
  {
    titulo: 'Talento y empleo en el sector',
    resumen: 'Faltan profesionales pese al récord de turistas; la vivienda de los trabajadores es parte del problema.',
    puntos: ['Ashotel alerta de falta de personal.', 'El empleo en alojamiento cayó un 3 % en 2025.', 'Talento Canario busca retener y hacer volver a jóvenes canarios.'],
    fuentes: [14, 1, 18],
  },
  {
    titulo: 'De promocionar a gestionar el destino',
    resumen: 'El plan Canarias Destino 2026 (48,3 M€) apuesta por gestión, datos y turismo regenerativo.',
    puntos: ['RegNext: unos 5 M€ para regeneración ambiental y social.', 'Digitalización e IA: 4,6 M€.', 'Smart Data Canarias (patronales) y el Observatorio Turístico con IA.'],
    fuentes: [15, 16, 25],
  },
]

export type Reto = { titulo: string; dolor: string; dato: string; fuentes: number[] }

export const RETOS_TIPO: Reto[] = [
  { titulo: 'Diversificar mercados', dolor: 'Demasiada dependencia de Reino Unido y Alemania.', dato: '≈ 60 % de los extranjeros; Alemania -7,9 % de plazas.', fuentes: [6, 9] },
  { titulo: 'Recuperar al turista peninsular', dolor: 'Menos conectividad y menos atractivo frente a otros destinos nacionales.', dato: 'Caída de plazas en invierno de 2026 (prensa, por verificar).', fuentes: [9] },
  { titulo: 'Más gasto, no más turistas', dolor: 'Crecer sin saturar: subir el valor de cada visita.', dato: 'Gasto +6,8 % con turistas +3,0 % en 2025.', fuentes: [3] },
  { titulo: 'Alargar la estancia', dolor: 'Los viajes se acortan y bajan las pernoctaciones.', dato: 'Estancia de julio de 2026 -8 %.', fuentes: [7] },
  { titulo: 'Repartir la presión en espacios naturales', dolor: 'Saturación en puntos icónicos; la tasa redistribuye pero no orienta.', dato: 'Teide: -71,5 % de visitas en senderos con ecotasa.', fuentes: [12] },
  { titulo: 'Movilidad sin coche', dolor: 'Tráfico y aparcamiento en zonas turísticas y en el Teide.', dato: 'El PRUG del Teide prevé lanzaderas y reserva de aparcamiento.', fuentes: [27] },
  { titulo: 'Cumplimiento de la vivienda vacacional', dolor: 'Propietarios y ayuntamientos con trámites nuevos y pocos medios.', dato: 'La Laguna: 93 % sin comunicación previa.', fuentes: [11] },
  { titulo: 'Atraer y retener talento en turismo', dolor: 'Falta personal y la vivienda lo agrava.', dato: 'Ashotel alerta pese al récord; empleo en alojamiento -3 %.', fuentes: [14, 1] },
  { titulo: 'Datos para pymes turísticas', dolor: 'Los pequeños no tienen la inteligencia de datos de las cadenas.', dato: '4,6 M€ para digitalización e IA en 2026.', fuentes: [15, 16] },
  { titulo: 'Turismo regenerativo con impacto local', dolor: 'Que el visitante deje huella positiva y se vea.', dato: 'RegNext ≈ 5 M€ en 2026.', fuentes: [15] },
  { titulo: 'Cruceros que gasten en la ciudad', dolor: 'Escalas cortas con poco impacto en el comercio local.', dato: '+25 % de cruceristas en Las Palmas (1.er semestre de 2025).', fuentes: [1] },
]

export type Entidad = { nombre: string; que: string; retoProbable: string; fuentes: number[] }

export const ENTIDADES: Entidad[] = [
  { nombre: 'Binter', que: 'Socio de difusión de Talento Canario a bordo.', retoProbable: 'Experiencia del viajero interinsular, primer y último kilómetro.', fuentes: [19] },
  { nombre: 'Lopesan', que: 'Guest Intelligence App: asistente de voz con IA y recomendador.', retoProbable: 'Personalización y recomendación de actividades.', fuentes: [22] },
  { nombre: 'Dunas Hotels', que: 'IA conversacional para atención y reserva directa (Quinta).', retoProbable: 'Reserva directa y atención multilingüe.', fuentes: [23] },
  { nombre: 'BlueBay / Satocan', que: 'Living Lab Hotel en Gran Canaria con ITC, Cabildo y Microsoft.', retoProbable: 'Innovación abierta con startups.', fuentes: [24] },
  { nombre: 'Ashotel', que: 'Retos Digitales, Smart Data Canarias y observatorio de pymes.', retoProbable: 'Digitalización de pymes hoteleras.', fuentes: [39, 16] },
  { nombre: 'Promotur', que: 'Observatorio Turístico con IA y big data (Ayesa).', retoProbable: 'Datos, desestacionalización, producto local.', fuentes: [25] },
  { nombre: 'Cabildo y Turismo de Tenerife', que: 'Tenerife ON, ecotasa y conteo de visitantes del Teide.', retoProbable: 'Flujos, aforos y movilidad en espacios naturales.', fuentes: [29, 26, 12] },
  { nombre: 'Volcano Teide', que: 'Reservas por franjas en el Teleférico y Masca.', retoProbable: 'Colas y experiencia en espacios naturales.', fuentes: [28] },
]

export type Referente = { nombre: string; lugar: string; categoria: string; que: string; resultado?: string; fuentes: number[]; verificado: boolean }

export const REFERENTES: Referente[] = [
  { nombre: 'Reservas por franjas', lugar: 'Teleférico del Teide y Masca', categoria: 'Flujos y aforos', que: 'Motor de reservas por franja horaria para acabar con colas de horas.', fuentes: [28], verificado: true },
  { nombre: 'Conteo de visitantes', lugar: 'Parque Nacional del Teide', categoria: 'Flujos y aforos', que: '9 cámaras y 30 contadores en senderos, con fondos Next Generation.', resultado: '1,8 M€ de inversión', fuentes: [26], verificado: true },
  { nombre: 'Venice Access Fee', lugar: 'Venecia', categoria: 'Flujos y aforos', que: 'Tasa de 5 € con reserva y QR para excursionistas en días punta.', fuentes: [30], verificado: true },
  { nombre: 'Tenerife ON', lugar: 'Tenerife', categoria: 'App de destino', que: 'App oficial gratuita de senderos y espacios naturales.', fuentes: [29], verificado: true },
  { nombre: 'Plataforma inteligente de destino', lugar: 'Málaga', categoria: 'Datos de destino', que: 'Asesor virtual, recomendador, tarjeta turística y rutas.', resultado: '4,68 M€ (proyecto, sin resultados aún)', fuentes: [31], verificado: true },
  { nombre: 'Observatorio Turístico con IA', lugar: 'Canarias', categoria: 'Datos de destino', que: 'IA generativa y big data de movilidad para planificar el destino.', fuentes: [25], verificado: true },
  { nombre: 'València Tourist Card', lugar: 'València', categoria: 'Tarjeta turística', que: 'Tarjeta digital con lectores anónimos que dan datos de comportamiento.', fuentes: [32], verificado: true },
  { nombre: 'Tallinn Card', lugar: 'Tallin', categoria: 'Tarjeta turística', que: 'Tarjeta con app móvil desde 2023.', resultado: '97.000 usos en 2023', fuentes: [33], verificado: true },
  { nombre: 'CopenPay', lugar: 'Copenhague', categoria: 'Sostenibilidad', que: 'Recompensas por conductas sostenibles en más de 90 atracciones.', resultado: '+29 % de alquiler de bicicletas en el piloto', fuentes: [34], verificado: true },
  { nombre: 'Closed for Maintenance', lugar: 'Islas Feroe', categoria: 'Sostenibilidad', que: 'Cierre de sitios para que voluntarios hagan mantenimiento.', fuentes: [35], verificado: true },
  { nombre: 'Icelandic Pledge', lugar: 'Islandia', categoria: 'Sostenibilidad', que: 'Compromiso online del visitante con certificado para compartir.', fuentes: [36], verificado: true },
  { nombre: 'Mālama Hawaiʻi', lugar: 'Hawái', categoria: 'Sostenibilidad', que: 'Panel que conecta visitantes con voluntariado local.', fuentes: [40], verificado: false },
  { nombre: 'Wave of Change', lugar: 'Iberostar', categoria: 'Sostenibilidad', que: 'Eliminación de plásticos de un solo uso en habitaciones.', resultado: '> 175 t/año menos en España', fuentes: [37], verificado: true },
  { nombre: 'Asistente de reservas con IA', lugar: 'GHT Hotels', categoria: 'IA en hoteles', que: 'Chat que resuelve conversaciones y reserva directo.', resultado: '89 % resueltas solas; 733.000 € en reservas directas (dato del proveedor)', fuentes: [38], verificado: true },
  { nombre: 'Guest Intelligence App', lugar: 'Lopesan', categoria: 'IA en hoteles', que: 'Asistente de voz y recomendador para clientes y empleados.', fuentes: [22], verificado: true },
]

export type DatoAbierto = { nombre: string; que: string; acceso: string; fuentes: number[] }

export const DATOS_ABIERTOS: DatoAbierto[] = [
  { nombre: 'API del ISTAC', que: 'Indicadores y cubos: alojamiento por isla y municipio, vivienda vacacional mensual.', acceso: 'datos.canarias.es/api/estadisticas/ · clientes istacpy (Python) e istacr (R)', fuentes: [17, 10] },
  { nombre: 'Promotur · investigación', que: 'Frontur, Egatur, AENA, cruceros e informes por isla.', acceso: 'investigacion.turismodeislascanarias.com (PDF mensuales)', fuentes: [1] },
  { nombre: 'INE', que: 'Frontur y Egatur nacionales con desglose por comunidad.', acceso: 'ine.es (notas de prensa y API)', fuentes: [2] },
]

export const FORMATO_HACKATHON: Tema = {
  titulo: 'Qué suelen valorar estos hackathons',
  resumen: 'No hay criterios publicados de ninguna edición de Talento Canario. Los hackathons canarios de referencia comparten patrón.',
  puntos: [
    'Prototipo funcional o navegable, no solo una idea.',
    'Validación con usuarios reales durante el evento.',
    'Pitch corto y claro, con plan de continuidad hasta un Demo Day.',
    'Talento Canario gira en torno a retener y hacer volver a jóvenes canarios: un ángulo de talento local suma.',
  ],
  fuentes: [18, 20, 21],
}

export const PENDIENTE_VERIFICAR = [
  'Elegir una sola serie de turistas (Promotur o INE) para toda la presentación.',
  'Contrastar las plazas aéreas de prensa con AENA o Promotur.',
  'Relación entre la Ley 6/2025 y la reforma de julio de 2026 de la vivienda vacacional.',
  'Cifras por isla y por mercado para todo Canarias en el ISTAC.',
  'Bases, rúbrica y empresa del reto: preguntarlo al organizador el primer día.',
]
