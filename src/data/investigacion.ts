// Diagnóstico de Tenerife (fase 2, consultado el 12-11-2026) e investigación previa de Canarias (10-11-2026), que queda como comparación.
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
  { id: 32, titulo: 'Las ventas de la València Tourist Card se incrementan un 40 %', medio: 'Ajuntament de València', fecha: '15-08-2024', url: 'https://www.valencia.es/cas/actualidad/-/content/valencia-tourist-card', abierta: true },
  { id: 33, titulo: 'Tallinn Card mobile app growing in popularity', medio: 'ERR News', fecha: '25-01-2024', url: 'https://news.err.ee/1609232781/tallinn-card-mobile-app-growing-in-popularity', abierta: true },
  { id: 34, titulo: 'Copenhagen expands sustainable tourism scheme (CopenPay)', medio: 'Comisión Europea · Urban Mobility Observatory', fecha: '23-07-2025', url: 'https://urban-mobility-observatory.transport.ec.europa.eu/news-events/news/copenhagen-expands-sustainable-tourism-scheme-summer-2025-2025-07-23_en', abierta: true },
  { id: 35, titulo: 'Closed for Maintenance', medio: 'Visit Faroe Islands', fecha: '2019–2026', url: 'https://visitfaroeislands.com/en/closedformaintenance', abierta: true },
  { id: 36, titulo: 'The Icelandic Pledge', medio: 'Ferðamálastofa (Turismo de Islandia)', fecha: '2017', url: 'https://www.ferdamalastofa.is/en/news/take-the-icelandic-pledge', abierta: true },
  { id: 37, titulo: 'Iberostar elimina los plásticos de un solo uso', medio: 'Iberostar', fecha: '18-04-2018', url: 'https://www.iberostar.com/en/press_room/news/iberostar-eliminates-single-use-plastics-from-all-its-hotel-rooms', abierta: true },
  { id: 38, titulo: 'GHT Hotels y HiJiffy', medio: 'Hotel Tech Report (caso del proveedor)', fecha: '2025', url: 'https://hoteltechreport.com/news/ght-hotels', abierta: true },
  { id: 39, titulo: 'Retos Digitales de Ashotel: premio a un hotel de La Gomera', medio: 'Hosteltur', fecha: '2019', url: 'https://www.hosteltur.com/133106_un-hotel-de-la-gomera-premiado-por-su-proyecto-de-integracion-de-datos.html', abierta: true },
  { id: 41, titulo: 'Perfil del turista según isla de alojamiento 2025 (Canarias e islas)', medio: 'Promotur · Observatorio Turístico de Canarias', fecha: '03-2026', url: 'https://observatorioturisticodecanarias.com/sites/default/files/migration_files/2026-03/Promotur_canarias%20e%20islas_2025_0.pdf', abierta: true },
  { id: 40, titulo: 'Mālama Hawaiʻi dashboard', medio: 'Maui Now', fecha: '10-04-2024', url: 'https://mauinow.com/2024/04/10/malama-hawaii-dashboard-connects-visitors-with-volunteer-opportunities-and-nonprofits/', abierta: true },
  { id: 42, titulo: 'Capacidad aérea regular hacia Canarias, verano 2026', medio: 'Observatorio Turístico de Canarias (Promotur)', fecha: '17-08-2026', url: 'https://observatorioturisticodecanarias.com/system/files/document/2026-08/Islas%20Canarias_Capacidad%20a%C3%A9rea%20regular%20S26_17ago.pdf', abierta: true },
  { id: 43, titulo: 'Evolución de la facturación turística, 3.er trimestre de 2026 (ISTAC, EGT)', medio: 'Observatorio Turístico de Canarias (Promotur)', fecha: '11-2026', url: 'https://observatorioturisticodecanarias.com/system/files/document/2026-11/Promotur_evoluci%C3%B3n%20facturaci%C3%B3n_2026Q3.pdf', abierta: true },
  { id: 44, titulo: 'Tráfico de cruceristas en Canarias, septiembre de 2026', medio: 'Observatorio Turístico de Canarias (autoridades portuarias)', fecha: '11-2026', url: 'https://observatorioturisticodecanarias.com/system/files/document/2026-11/Promotur_cruceros_sep%2026.pdf', abierta: true },
  { id: 45, titulo: 'Capacidad aérea regular hacia Canarias, invierno 2026/27', medio: 'Observatorio Turístico de Canarias (Promotur)', fecha: '19-10-2026', url: 'https://observatorioturisticodecanarias.com/system/files/document/2026-10/Islas%20Canarias_Capacidad%20a%C3%A9rea%20regular_W2627_19oct.pdf', abierta: true },
  { id: 46, titulo: 'Indicador «Turistas recibidos» (Frontur-Canarias), mensual', medio: 'ISTAC · API de indicadores', fecha: 'consultado el 11-11-2026', url: 'https://datos.canarias.es/api/estadisticas/indicators/v1.0/indicators/TURISTAS', abierta: true },
  { id: 47, titulo: 'Catálogo de datos abiertos de Canarias', medio: 'Gobierno de Canarias · datos.canarias.es', fecha: 'consultado el 11-11-2026', url: 'https://datos.canarias.es/catalogos/general/', abierta: true },
  { id: 48, titulo: 'tenique', medio: 'Academia Canaria de la Lengua · Diccionario básico de canarismos', fecha: 'consultado el 12-11-2026', url: 'https://www.academiacanarialengua.org/palabra/tenique/', abierta: true },
  { id: 49, titulo: 'Población según grado de acuerdo con afirmaciones sobre el turismo. Grandes comarcas. 2.º trimestre de 2026 (ECOSOC)', medio: 'ISTAC · Encuesta de Hábitos y Confianza Socioeconómica', fecha: '2026', url: 'https://www3.gobiernodecanarias.org/istac/statistical-visualizer/visualizer/data.html?resourceType=dataset&agencyId=ISTAC&resourceId=C00086A_000493&version=1.0', abierta: true },
  { id: 50, titulo: 'Población según grado de acuerdo con afirmaciones sobre el turismo. Grandes comarcas. 2.º trimestre de 2024 (ECOSOC)', medio: 'ISTAC · Encuesta de Hábitos y Confianza Socioeconómica', fecha: '2024', url: 'https://www3.gobiernodecanarias.org/istac/statistical-visualizer/visualizer/data.html?resourceType=dataset&agencyId=ISTAC&resourceId=C00086A_000250&version=1.0', abierta: true },
  { id: 51, titulo: 'Población según vinculación económica del hogar con el sector turístico. Grandes comarcas. 2.º trimestre de 2026', medio: 'ISTAC · ECOSOC', fecha: '2026', url: 'https://www3.gobiernodecanarias.org/istac/statistical-visualizer/visualizer/data.html?resourceType=dataset&agencyId=ISTAC&resourceId=C00086A_000491&version=1.0', abierta: true },
  { id: 52, titulo: 'Población según considera que los turistas deben pagar una tasa turística. Grandes comarcas. 2.º trimestre de 2026', medio: 'ISTAC · ECOSOC', fecha: '2026', url: 'https://www3.gobiernodecanarias.org/istac/statistical-visualizer/visualizer/data.html?resourceType=dataset&agencyId=ISTAC&resourceId=C00086A_000501&version=1.0', abierta: true },
  { id: 53, titulo: 'Población a favor de la tasa turística según el fin al que la destinaría. Canarias. 2.º trimestre de 2026', medio: 'ISTAC · ECOSOC', fecha: '2026', url: 'https://www3.gobiernodecanarias.org/istac/statistical-visualizer/visualizer/data.html?resourceType=dataset&agencyId=ISTAC&resourceId=C00086A_000504&version=1.0', abierta: true },
  { id: 54, titulo: 'Percepción del turismo en Canarias y Tenerife (ECOSOC, 2.º trimestre de 2024)', medio: 'Turismo de Tenerife · Investigación', fecha: '2024', url: 'https://www.webtenerife.com/-/media/files/investigacion/informes-y-estudios/otros/relateddocuments/ecosoc_2024q2_percepcion-turismo-canarias_tenerife.pdf', abierta: true },
  { id: 55, titulo: 'Viviendas vacacionales, plazas, ocupación e ingresos. Islas y municipios (estadística experimental), septiembre de 2026', medio: 'ISTAC', fecha: 'consultado el 12-11-2026', url: 'https://www3.gobiernodecanarias.org/istac/statistical-visualizer/visualizer/data.html?resourceType=dataset&agencyId=ISTAC&resourceId=C00065A_000061&version=1.30', abierta: true },
  { id: 56, titulo: 'Indicador «Plazas ofertadas por alojamientos turísticos», municipios, mensual', medio: 'ISTAC · API de indicadores', fecha: 'consultado el 12-11-2026', url: 'https://datos.canarias.es/api/estadisticas/indicators/v1.0/indicators/ALOJATUR_PLAZAS_OFERTADAS', abierta: true },
  { id: 57, titulo: 'Indicador «Población», municipios, 2025', medio: 'ISTAC · API de indicadores', fecha: 'consultado el 12-11-2026', url: 'https://datos.canarias.es/api/estadisticas/indicators/v1.0/indicators/POBLACION', abierta: true },
  { id: 58, titulo: 'Indicador «Afiliaciones a la Seguridad Social. Actividades turísticas», islas, mensual', medio: 'ISTAC · API de indicadores', fecha: 'consultado el 12-11-2026', url: 'https://datos.canarias.es/api/estadisticas/indicators/v1.0/indicators/AFILIACIONES_TURISMO', abierta: true },
  { id: 59, titulo: 'La ecotasa de Masca reduce un 76 % la afluencia al barranco', medio: 'Cabildo de Tenerife · Tenerife + Sostenible', fecha: '09-06-2025', url: 'https://tenerifemassostenible.tenerife.es/gestion-del-medio-natural/la-ecotasa-de-masca-reduce-un-76-la-afluencia-al-barranco-y-permite-la-regeneracion-de-este-espacio-natural-de-tenerife/', abierta: true },
  { id: 60, titulo: 'Manifestaciones «Canarias tiene un límite» (20A)', medio: 'RTVC', fecha: '20-04-2024', url: 'https://rtvc.es/manifestaciones-canarias-tiene-un-limite-20a/', abierta: true },
  { id: 61, titulo: 'IMPACTUR Canarias 2024', medio: 'Exceltur', fecha: '05-05-2026', url: 'https://www.exceltur.org/impactur-canarias-2024/', abierta: true },
  { id: 62, titulo: 'Greeters: free walks with locals (cifras de 2025)', medio: 'International Greeter Association', fecha: '2026', url: 'https://internationalgreeter.org/', abierta: true },
  { id: 63, titulo: 'Closed for Maintenance: facts & figures', medio: 'Visit Faroe Islands', fecha: '2026', url: 'https://visitfaroeislands.com/en/closed/about-closed-for-maintenance/facts-figures0', abierta: true },
  { id: 64, titulo: 'Is this the future of travel? (CopenPay 2025)', medio: 'Wonderful Copenhagen', fecha: '15-09-2025', url: 'https://www.wonderfulcopenhagen.com/wonderful-copenhagen/international-press/press-kit-sustainability/future-travel', abierta: true },
  { id: 65, titulo: 'Tourist tax to fund new projects in the neighbourhoods', medio: 'Ajuntament de Barcelona · InfoBarcelona', fecha: '19-07-2025', url: 'https://www.barcelona.cat/infobarcelona/en/tourist-tax-to-fund-new-projects-in-the-neighbourhoods_1539540.html', abierta: true },
  { id: 66, titulo: 'La mayoría de los barceloneses, a favor de incrementar la tasa turística (encuesta de percepción 2025)', medio: 'Ajuntament de Barcelona', fecha: '05-02-2026', url: 'https://ajuntament.barcelona.cat/lescorts/es/noticias/la-mayoria-de-los-barceloneses-a-favor-de-incrementar-la-tasa-turistica-1599021', abierta: true },
  { id: 67, titulo: 'Nonprofits raised almost €4 million via Airbnb Experiences', medio: 'Airbnb Newsroom', fecha: '31-05-2019', url: 'https://news.airbnb.com/nonprofits-raised-almost-e4-million-via-airbnb-experiences-airbnb-to-grow-dutch-offering', abierta: true },
  { id: 68, titulo: 'Contributo di accesso: i numeri del 2025', medio: 'Comune di Venezia', fecha: '08-2025', url: 'https://live.comune.venezia.it/it/2025/08/contributo-di-accesso-i-numeri-del-2025', abierta: true },
  { id: 69, titulo: 'Indicador «Presupuesto liquidado. Gastos por habitante. Ayuntamientos», 2024', medio: 'ISTAC · API de indicadores', fecha: 'consultado el 12-11-2026', url: 'https://datos.canarias.es/api/estadisticas/indicators/v1.0/indicators/PRESUPUESTO_AYUNTAMIENTOS_LIQUIDADO_GASTO_HABITANTE', abierta: true },
  { id: 70, titulo: 'Indicador «Paro registrado», municipios, mensual', medio: 'ISTAC · API de indicadores', fecha: 'consultado el 12-11-2026', url: 'https://datos.canarias.es/api/estadisticas/indicators/v1.0/indicators/PARO_REGISTRADO', abierta: true },
  { id: 71, titulo: 'Ley 6/2025, de 10 de diciembre, de Ordenación Sostenible del Uso Turístico de Viviendas', medio: 'Boletín Oficial de Canarias n.º 246', fecha: '12-12-2025', url: 'https://www.gobiernodecanarias.org/boc/2025/246/4229.html', abierta: true },
  { id: 72, titulo: 'Ley 8/2015, de 1 de abril, de Cabildos Insulares (art. 6.2: carreteras y transporte por carretera)', medio: 'BOE · texto consolidado', fecha: '28-04-2015', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2015-4621', abierta: true },
  { id: 73, titulo: 'Ley 7/1985, Reguladora de las Bases del Régimen Local (art. 25.2: urbanismo, tráfico, estacionamiento y transporte urbano)', medio: 'BOE · texto consolidado', fecha: '03-04-1985', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392', abierta: true },
  { id: 74, titulo: 'Ley Orgánica 1/2018, de reforma del Estatuto de Autonomía de Canarias (art. 143: vivienda)', medio: 'BOE · texto consolidado', fecha: '06-11-2018', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2018-15138', abierta: true },
  { id: 75, titulo: '¡Llega la Copa «Tenerife! despierta emociones»', medio: 'Turismo de Tenerife · blog corporativo', fecha: '09-09-2026', url: 'https://www.webtenerife.com/blogcorporativo/2026/09/llega-la-copa-tenerife-despierta-emociones/', abierta: true },
  { id: 76, titulo: 'Pricing', medio: 'Supabase', fecha: 'consultado el 11-11-2026', url: 'https://supabase.com/pricing', abierta: true },
  { id: 77, titulo: 'Pricing', medio: 'Vercel', fecha: 'consultado el 11-11-2026', url: 'https://vercel.com/pricing', abierta: true },
  { id: 78, titulo: 'Pricing', medio: 'Mapbox', fecha: 'consultado el 11-11-2026', url: 'https://www.mapbox.com/pricing', abierta: true },
  { id: 79, titulo: 'Pricing (precios de la API de Claude)', medio: 'Anthropic · Claude Docs', fecha: 'consultado el 11-11-2026', url: 'https://platform.claude.com/docs/en/about-claude/pricing', abierta: true },
  { id: 80, titulo: 'Actualización del censo de vertidos desde tierra al mar en IDECanarias', medio: 'Grafcan · Gobierno de Canarias', fecha: '07-2025', url: 'https://www.grafcan.es/noticias/2025-07/actualizacion-del-censo-de-vertidos-desde-tierra-al-mar-en-idecanarias/', abierta: true },
  { id: 81, titulo: 'Sanidad ha recomendado once cierres de playas en Tenerife este año, aunque el 99 % de las muestras son aptas para el baño', medio: 'elDiario.es · Canarias Ahora (comunicado del Servicio Canario de la Salud)', fecha: '05-10-2026', url: 'https://www.eldiario.es/canariasahora/sociedad/sanidad-recomendado-once-cierres-playas-tenerife-ano-99-muestras-son-aptas-bano_1_13563592.html', abierta: true },
  { id: 82, titulo: 'Canarias pagó más de 8,2 millones de euros en cuatro años en multas de la UE por incumplir la depuración de aguas', medio: 'Atlántico Hoy (respuesta parlamentaria del Gobierno de Canarias)', fecha: '30-07-2026', url: 'https://www.atlanticohoy.com/sociedad/canarias-pago-mas-82-millones-euros-en-cuatro-anos-en-multas-ue-por-incumplir-depuracion-aguas_1564888_102.html', abierta: true },
  { id: 83, titulo: 'La UE condena a España por los vertidos al mar en la isla de Tenerife', medio: 'Diario de Avisos', fecha: '19-12-2025', url: 'https://diariodeavisos.elespanol.com/2025/12/vertidos-mar-tenerife-condena/', abierta: true },
  { id: 84, titulo: 'El Cabildo ofrece hasta 60 actividades y rutas para que mayores y personas en situación de vulnerabilidad disfruten de los atractivos de la isla («Tenerife es tuya»)', medio: 'Turismo de Tenerife · blog corporativo', fecha: '02-09-2025', url: 'https://www.webtenerife.com/blogcorporativo/2025/09/el-cabildo-ofrece-hasta-60-actividades-y-rutas-para-que-mayores-y-personas-en-situacion-de-vulnerabilidad-disfruten-de-los-atractivos-de-la-isla/', abierta: true },
  { id: 85, titulo: 'Ley 12/1990, de 26 de julio, de Aguas de Canarias (art. 9: Consejos Insulares de Aguas; art. 40: planes hidrológicos insulares)', medio: 'BOE · texto consolidado', fecha: '27-07-1990', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1990-23087', abierta: true },
]

export type Dato = { etiqueta: string; valor: string; detalle?: string; fuentes: number[]; verificado: boolean }

export const AVISO_SERIES =
  'La prensa mezcla tres series: Promotur e ISTAC cuentan turistas totales (18,4 M en 2025), el INE solo extranjeros (15,69 M) y algunos medios «visitantes» (18,6 M). Usamos la de ISTAC/Promotur, que incluye peninsulares y se desglosa por islas; el INE, solo para comparar con otras comunidades.'

export const CIFRAS_2025: Dato[] = [
  { etiqueta: 'Canarias · Turistas totales', valor: '18,4 M', detalle: '+3,5 % frente a 2024', fuentes: [1], verificado: true },
  { etiqueta: 'Canarias · Turistas extranjeros', valor: '15,69 M', detalle: '+3,0 %, récord por segundo año', fuentes: [3], verificado: true },
  { etiqueta: 'Canarias · Gasto de extranjeros', valor: '24.431 M€', detalle: '+6,8 % (Egatur)', fuentes: [3], verificado: true },
  { etiqueta: 'Canarias · Gasto medio por viaje', valor: '1.438 €', detalle: '178 € por día', fuentes: [1], verificado: true },
  { etiqueta: 'Canarias · Estancia media', valor: '9,2 días', detalle: '-1 %', fuentes: [1], verificado: true },
  { etiqueta: 'Canarias · Ocupación alojativa', valor: '82,2 %', detalle: 'ADR 127 € · RevPAR 105 €', fuentes: [1], verificado: true },
  { etiqueta: 'Canarias · Plazas aéreas', valor: '24 M', detalle: '726 rutas, 154 destinos, 50 aerolíneas', fuentes: [1], verificado: true },
  { etiqueta: 'Canarias · Peso de Reino Unido y Alemania', valor: '≈ 60 %', detalle: 'de los turistas extranjeros', fuentes: [6], verificado: true },
]

export const CIFRAS_2026: Dato[] = [
  { etiqueta: 'Canarias · Turistas enero–septiembre', valor: '13,43 M', detalle: '-0,7 % (ISTAC, incluye peninsulares)', fuentes: [46], verificado: true },
  { etiqueta: 'Canarias · Extranjeros enero–septiembre', valor: '11,36 M', detalle: '-0,5 %, mientras España crece +5,2 %', fuentes: [2], verificado: true },
  { etiqueta: 'Canarias · Julio', valor: '-0,7 %', detalle: 'única comunidad en caída; estancia ≈ 7,5 días (-8 %)', fuentes: [7], verificado: true },
  { etiqueta: 'Canarias · Previsión del año', valor: '> 18 M', detalle: '-2 %; empleo de 233.020 personas (previsión de Excelcan, no oficial)', fuentes: [5], verificado: true },
  { etiqueta: 'Canarias · Plazas aéreas desde Alemania (verano)', valor: '-10,0 %', detalle: 'Francia +25,2 %; La Palma +32,3 %; total Canarias +0,8 % (13,3 M plazas regulares)', fuentes: [42], verificado: true },
  { etiqueta: 'Canarias · Facturación turística enero–septiembre', valor: '17.125 M€', detalle: '+2,3 %, pero el tercer trimestre cae un 2,6 % (ISTAC, EGT, 16 años o más)', fuentes: [43], verificado: true },
  { etiqueta: 'Canarias · Cruceristas enero–septiembre', valor: '2,34 M', detalle: '+8,2 %, tras un 2025 récord de 3,71 M (+16,2 %)', fuentes: [44], verificado: true },
  { etiqueta: 'Canarias · Plazas aéreas invierno 2026-27', valor: '11,07 M', detalle: '+3,9 %; Península +12,4 %, Reino Unido -3,2 %, Alemania -1,1 %', fuentes: [45], verificado: true },
  { etiqueta: 'Canarias · Viviendas vacacionales (abril)', valor: '42.367', detalle: '-18 % interanual; 173.770 plazas', fuentes: [10], verificado: true },
  { etiqueta: 'Tenerife · Visitas a senderos del Teide', valor: '-71,5 %', detalle: 'de 38.200 a 10.893 en un mes con la ecotasa', fuentes: [12], verificado: true },
]

// ─────────────────────────────────────────────────────────────────────────────
// DIAGNÓSTICO · TENERIFE (fase 2, reto de convivencia de Turismo de Tenerife)
// Datos de Tenerife salvo que se diga lo contrario. Canarias u otros lugares, solo para comparar.
// ─────────────────────────────────────────────────────────────────────────────

/** Id de la fuente que explica el nombre de la propuesta (Academia Canaria de la Lengua, «tenique»). */
export const FUENTE_TENIQUE = 48

/** La respuesta corta a «¿qué pasa en Tenerife?», en tres frases. */
export const RESPUESTA_RETO: { titulo: string; texto: string; fuentes: number[] }[] = [
  {
    titulo: 'Valoran el turismo, pero no lo notan en su vida',
    texto: 'El 62,2 % cree que el turismo ha sido muy beneficioso para la isla. Solo el 35,9 % cree que mejora su calidad de vida y el 31,4 %, que mejora los servicios de su comarca.',
    fuentes: [49],
  },
  {
    titulo: 'La convivencia empeora, y más que en el resto de Canarias',
    texto: 'El 53,9 % cree que el turismo provoca tensiones entre residentes y turistas: 4,3 puntos más que en 2024 y 10,5 más que la media canaria. La idea de que el turismo mantiene la identidad cae del 44,5 % al 36,8 %.',
    fuentes: [49, 50],
  },
  {
    titulo: 'El beneficio se concentra; los costes se reparten',
    texto: 'El turismo da 1 de cada 4 empleos, pero solo el 23,1 % de los hogares tiene un vínculo económico con él (44,6 % en el sur, 11,5 % en el área metropolitana). El resto paga vivienda, tráfico y residuos sin ver el retorno.',
    fuentes: [51, 58],
  },
]

/** Las cifras de cabecera del diagnóstico. */
export const CIFRAS_TENERIFE: Dato[] = [
  { etiqueta: 'turistas en 2025', valor: '7,56 M', detalle: '+2,4 %; unos 7,8 al año por cada residente', fuentes: [8, 57], verificado: true },
  { etiqueta: 'cree que el turismo causa tensiones con los residentes', valor: '53,9 %', detalle: '49,6 % en 2024; Canarias, 43,4 %', fuentes: [49, 50], verificado: true },
  { etiqueta: 'cree que el turismo mejora su calidad de vida', valor: '35,9 %', detalle: 'aunque el 62,2 % lo ve muy beneficioso para la isla', fuentes: [49], verificado: true },
  { etiqueta: 'plazas turísticas por cada 100 vecinos en Adeje', valor: '130', detalle: 'media de la isla: 21 (hoteles, apartamentos y vivienda vacacional)', fuentes: [55, 56, 57], verificado: true },
]

export const AVISO_TENERIFE =
  'Turistas: para 2025 usamos el balance de Turismo de Tenerife (7,56 M) y para 2026, el ISTAC. La serie del ISTAC da hoy 7,41 M para 2025 (dato revisado); las variaciones de 2026 se calculan dentro de esa misma serie. Percepción: Encuesta de Hábitos y Confianza Socioeconómica del ISTAC, residentes de 18 años o más, 2.º trimestre de 2026 y de 2024.'

/** Turistas en Tenerife de enero a septiembre (ISTAC, serie mensual por islas) [46]. */
export const TURISTAS_TF_ENE_SEP = { y2025: 5449526, y2026: 5321699 } // −2,3 %

/** Una afirmación de la encuesta del ISTAC: % «de acuerdo» o «muy de acuerdo». */
export type Percepcion = {
  afirmacion: string
  tipo: 'beneficio' | 'coste'
  tf26: number
  tf24: number
  canarias26: number
  metro: number
  norte: number
  sur: number
}

/** ISTAC, ECOSOC 2.º trimestre de 2026 [49] y 2024 [50]. Tenerife por grandes comarcas. */
export const PERCEPCION: Percepcion[] = [
  { afirmacion: 'Ha sido muy beneficioso para la isla y sus habitantes', tipo: 'beneficio', tf26: 62.2, tf24: 58.4, canarias26: 67.9, metro: 60.0, norte: 59.7, sur: 66.5 },
  { afirmacion: 'Contribuye al desarrollo económico', tipo: 'beneficio', tf26: 72.3, tf24: 76.5, canarias26: 77.3, metro: 66.4, norte: 73.6, sur: 78.5 },
  { afirmacion: 'Permite relacionarse con personas de otros lugares', tipo: 'beneficio', tf26: 72.9, tf24: 79.6, canarias26: 76.9, metro: 67.7, norte: 69.8, sur: 81.4 },
  { afirmacion: 'Los beneficios superan con mucho a los costes', tipo: 'beneficio', tf26: 44.5, tf24: 49.5, canarias26: 45.7, metro: 42.6, norte: 42.1, sur: 48.6 },
  { afirmacion: 'Mantiene la identidad, la cultura y las tradiciones', tipo: 'beneficio', tf26: 36.8, tf24: 44.5, canarias26: 43.2, metro: 39.7, norte: 36.8, sur: 33.3 },
  { afirmacion: 'Crea una sociedad más tolerante', tipo: 'beneficio', tf26: 36.7, tf24: 54.3, canarias26: 44.5, metro: 36.7, norte: 37.7, sur: 36.0 },
  { afirmacion: 'Aumenta la calidad de vida de los residentes', tipo: 'beneficio', tf26: 35.9, tf24: 43.3, canarias26: 38.9, metro: 30.8, norte: 33.4, sur: 43.9 },
  { afirmacion: 'Mejora los servicios de mi comarca', tipo: 'beneficio', tf26: 31.4, tf24: 38.8, canarias26: 37.3, metro: 27.4, norte: 31.4, sur: 36.3 },
  { afirmacion: 'Ayuda a conservar los espacios naturales', tipo: 'beneficio', tf26: 24.3, tf24: 31.5, canarias26: 29.3, metro: 25.7, norte: 16.6, sur: 28.1 },
  { afirmacion: 'Encarece la vivienda', tipo: 'coste', tf26: 81.2, tf24: 77.5, canarias26: 77.1, metro: 83.3, norte: 79.7, sur: 79.7 },
  { afirmacion: 'Provoca cambios de residencia no deseados', tipo: 'coste', tf26: 71.4, tf24: 63.5, canarias26: 62.8, metro: 74.3, norte: 68.6, sur: 69.7 },
  { afirmacion: 'Genera demasiados residuos, contaminación o aguas residuales', tipo: 'coste', tf26: 69.6, tf24: 64.6, canarias26: 61.0, metro: 68.7, norte: 74.9, sur: 67.0 },
  { afirmacion: 'Perjudica el tráfico y la movilidad', tipo: 'coste', tf26: 68.5, tf24: 64.8, canarias26: 58.8, metro: 68.7, norte: 65.3, sur: 70.3 },
  { afirmacion: 'Encarece el coste de la vida', tipo: 'coste', tf26: 66.4, tf24: 73.3, canarias26: 64.0, metro: 68.7, norte: 63.4, sur: 65.7 },
  { afirmacion: 'Genera empleo precario', tipo: 'coste', tf26: 65.3, tf24: 65.4, canarias26: 63.4, metro: 67.9, norte: 65.8, sur: 61.9 },
  { afirmacion: 'Causa daños irreparables a los ecosistemas', tipo: 'coste', tf26: 63.2, tf24: 57.8, canarias26: 53.1, metro: 61.7, norte: 63.9, sur: 64.5 },
  { afirmacion: 'Provoca tensiones entre residentes y turistas', tipo: 'coste', tf26: 53.9, tf24: 49.6, canarias26: 43.4, metro: 56.7, norte: 50.1, sur: 53.2 },
  { afirmacion: 'Colapsa los servicios sanitarios', tipo: 'coste', tf26: 51.7, tf24: 48.3, canarias26: 42.8, metro: 51.1, norte: 52.7, sur: 51.7 },
]

export type Zona = { id: string; nombre: string; ejemplos: string; resumen: string; datos: string[]; fuentes: number[]; hipotesis?: boolean }

/** Cuatro Tenerifes. Las tres primeras son las grandes comarcas del ISTAC; la rural no tiene encuesta propia. */
export const ZONAS: Zona[] = [
  {
    id: 'sur', nombre: 'Sur turístico', ejemplos: 'Adeje, Arona, San Miguel, Santiago del Teide',
    resumen: 'Vive del turismo y lo valora más, pero también nota la expulsión.',
    datos: ['44,6 % de los hogares con vínculo económico con el turismo.', '43,9 % cree que mejora su calidad de vida (la cifra más alta de la isla).', '69,7 % ve cambios de residencia no deseados.', 'Adeje: 130 plazas turísticas por cada 100 vecinos; Arona: 62.'],
    fuentes: [49, 51, 55, 56, 57],
  },
  {
    id: 'metro', nombre: 'Área metropolitana', ejemplos: 'Santa Cruz, La Laguna',
    resumen: 'Apenas aloja turistas, pero paga vivienda y tráfico. Es la zona más crítica.',
    datos: ['11,5 % de los hogares con vínculo económico con el turismo.', '30,8 % cree que mejora su calidad de vida; 27,4 %, que mejora los servicios de su comarca.', '83,3 % cree que encarece la vivienda; 56,7 % ve tensiones.', 'Santa Cruz: 3 plazas turísticas por cada 100 vecinos; La Laguna: 1,7.'],
    fuentes: [49, 51, 55, 56, 57],
  },
  {
    id: 'norte', nombre: 'Norte', ejemplos: 'Puerto de la Cruz, La Orotava, Icod, Garachico',
    resumen: 'Turismo antiguo en el Puerto y naturaleza muy visitada. Lo que más preocupa es el entorno.',
    datos: ['74,9 % cree que el turismo genera demasiados residuos o aguas residuales (la cifra más alta).', 'Solo el 16,6 % cree que ayuda a conservar los espacios naturales.', '12,8 % de los hogares con vínculo económico con el turismo.', 'Puerto de la Cruz: 78 plazas turísticas por cada 100 vecinos.'],
    fuentes: [49, 51, 55, 56, 57],
  },
  {
    id: 'rural', nombre: 'Zonas rurales', ejemplos: 'Arico, Garachico, Vilaflor, Teno, Anaga',
    resumen: 'Sin hoteles, pero la vivienda vacacional ya llega. La encuesta no las separa: lo validamos con entrevistas.',
    datos: ['Arico: 21 plazas de vivienda vacacional por cada 100 vecinos; Garachico: 15. Santa Cruz: 1,6.', 'Masca: el 95 % de quien recorre el barranco es visitante.'],
    fuentes: [55, 57, 59],
    hipotesis: true,
  },
]

export type Municipio = {
  nombre: string; zona: 'Sur' | 'Norte' | 'Área metropolitana'; poblacion: number; plazasRegladas: number | null; plazasVV: number
  /** Ingresos de la vivienda vacacional en 2025, en millones de euros (ISTAC [55]). */
  ingresosVV: number
  /** Gasto liquidado del ayuntamiento por habitante, 2024, en euros (ISTAC [69]). */
  gastoAyto: number
  /** Paro registrado, octubre de 2026, y octubre de 2025 (ISTAC [70]). */
  paro: number; paroAnterior: number
}

/**
 * Presión turística por municipio. Plazas regladas = hoteles y apartamentos abiertos (ISTAC, septiembre de 2026) [56];
 * el ISTAC solo las publica para los municipios turísticos (null = no publicado).
 * Plazas VV = vivienda vacacional disponible (ISTAC, estadística experimental, septiembre de 2026) [55]. Población 2025 [57].
 */
export const PRESION: Municipio[] = [
  { nombre: 'Adeje', zona: 'Sur', poblacion: 50612, plazasRegladas: 47250, plazasVV: 18753, ingresosVV: 142.49, gastoAyto: 2228, paro: 1927, paroAnterior: 1925 },
  { nombre: 'Santiago del Teide', zona: 'Sur', poblacion: 12656, plazasRegladas: 6395, plazasVV: 4189, ingresosVV: 25.67, gastoAyto: 1797, paro: 437, paroAnterior: 435 },
  { nombre: 'Puerto de la Cruz', zona: 'Norte', poblacion: 31589, plazasRegladas: 20985, plazasVV: 3807, ingresosVV: 21.76, gastoAyto: 1407, paro: 2237, paroAnterior: 2290 },
  { nombre: 'Arona', zona: 'Sur', poblacion: 89036, plazasRegladas: 37374, plazasVV: 18270, ingresosVV: 109.35, gastoAyto: 1269, paro: 4684, paroAnterior: 4686 },
  { nombre: 'San Miguel de Abona', zona: 'Sur', poblacion: 24307, plazasRegladas: 4891, plazasVV: 4234, ingresosVV: 26.29, gastoAyto: 1146, paro: 1132, paroAnterior: 1093 },
  { nombre: 'Guía de Isora', zona: 'Sur', poblacion: 22846, plazasRegladas: 4616, plazasVV: 2147, ingresosVV: 14.01, gastoAyto: 1110, paro: 1085, paroAnterior: 1125 },
  { nombre: 'Arico', zona: 'Sur', poblacion: 9510, plazasRegladas: null, plazasVV: 2023, ingresosVV: 10.32, gastoAyto: 1079, paro: 573, paroAnterior: 591 },
  { nombre: 'Garachico', zona: 'Norte', poblacion: 4941, plazasRegladas: null, plazasVV: 739, ingresosVV: 4.45, gastoAyto: 1821, paro: 288, paroAnterior: 336 },
  { nombre: 'Granadilla de Abona', zona: 'Sur', poblacion: 59126, plazasRegladas: 905, plazasVV: 4626, ingresosVV: 26.7, gastoAyto: 934, paro: 3283, paroAnterior: 3192 },
  { nombre: 'Icod de los Vinos', zona: 'Norte', poblacion: 24675, plazasRegladas: null, plazasVV: 1685, ingresosVV: 10.28, gastoAyto: 1466, paro: 1791, paroAnterior: 1943 },
  { nombre: 'Santa Cruz de Tenerife', zona: 'Área metropolitana', poblacion: 211498, plazasRegladas: 2935, plazasVV: 3345, ingresosVV: 20.0, gastoAyto: 1499, paro: 15532, paroAnterior: 16471 },
  { nombre: 'San Cristóbal de La Laguna', zona: 'Área metropolitana', poblacion: 161927, plazasRegladas: 677, plazasVV: 2016, ingresosVV: 12.32, gastoAyto: 1162, paro: 10898, paroAnterior: 11474 },
]

/** Totales de la isla para la misma tabla (mismas fuentes y periodos). */
export const PRESION_TENERIFE = { poblacion: 966469, plazasRegladas: 129113, plazasVV: 77001, viviendasVV: 19148, viviendasVVAnterior: 19552, ingresosVV: 496.27 }

export type Causa = {
  titulo: string; resumen: string; evidencia: string[]; fuentes: number[]; principal?: boolean
  /** Qué hace Tenique con esta causa. */
  tenique: 'aborda' | 'en parte' | 'no aborda'
  queHace: string
  /** Quién tiene la competencia o la palanca, con su fuente. */
  quien?: { texto: string; fuentes: number[] }
}

/** Causas con evidencia. Las tres `principal` son las que devolvemos al equipo. */
export const CAUSAS: Causa[] = [
  {
    titulo: 'El retorno no se ve',
    resumen: 'El turismo deja dinero en la isla, pero el vecino no lo nota en su barrio ni en sus servicios.',
    evidencia: [
      'Solo el 31,4 % cree que el turismo mejora los servicios de su comarca (38,8 % en 2024).',
      'No hay datos públicos por isla de lo que el turismo aporta a sanidad, educación o limpieza. Lo dice el propio reto y no lo hemos encontrado.',
      'En Tenerife, el 58 % apoya una tasa turística. En Canarias, la mayoría la destinaría a servicios públicos (36,6 %) o a medio ambiente (29,2 %).',
      'Comparación: en Barcelona, el 75,7 % conoce la tasa turística, pero menos de la mitad sabe que financia proyectos.',
    ],
    fuentes: [49, 50, 52, 53, 66],
    principal: true,
    tenique: 'aborda',
    queHace: 'Cada reserva deja dinero en un fondo del barrio, y en qué se gasta se ve en la calle y en la app.',
  },
  {
    titulo: 'El beneficio se concentra en pocos',
    resumen: 'El empleo turístico existe, pero se percibe precario y llega a pocos hogares, sobre todo fuera del sur.',
    evidencia: [
      'El turismo da el 23,2 % de las afiliaciones (100.665 en octubre de 2026) y el 44,4 % de los contratos de 2025.',
      'Solo el 23,1 % de los hogares tiene un vínculo económico con el turismo: 44,6 % en el sur, 12,8 % en el norte y 11,5 % en el área metropolitana.',
      'El 65,3 % cree que el turismo genera empleo precario.',
      'La facturación de 2025 creció un 2,2 % por la llegada de más turistas, no porque cada uno gastara más.',
    ],
    fuentes: [8, 49, 51, 58],
    principal: true,
    tenique: 'en parte',
    queHace: 'Abre una vía de ingreso a vecinos anfitriones, asociaciones y comercio local. No cambia los salarios del sector.',
  },
  {
    titulo: 'La identidad y la convivencia se erosionan',
    resumen: 'Cada vez menos gente siente que el turismo cuida lo propio, y crece la sensación de tensión.',
    evidencia: [
      'Solo el 36,8 % cree que el turismo mantiene la identidad y las tradiciones (44,5 % en 2024).',
      'Que el turismo crea una sociedad más tolerante: del 54,3 % al 36,7 % en dos años.',
      'Tensiones entre residentes y turistas: 53,9 %, frente al 43,4 % de Canarias.',
      'Pero el 72,9 % valora poder relacionarse con gente de otros lugares (81,4 % en el sur). El encuentro se valora; lo que falla es cómo se da.',
      'La manifestación del 20 de abril de 2024 en Santa Cruz reunió a unas 30.000 personas según la Delegación del Gobierno. Los organizadores insistieron en que no era contra los turistas.',
      'Observación de nuestro catálogo de experiencias reales (29 revisadas, no es una cifra de la isla): casi todo lo que hoy comparten vecinos y visitantes son fiestas, romerías y actividades institucionales. Apenas hay experiencias con un vecino como anfitrión.',
    ],
    fuentes: [49, 50, 60],
    principal: true,
    tenique: 'aborda',
    queHace: 'Encuentros reales en los que el vecino enseña lo suyo y en sus términos; los locales validan y puntúan.',
  },
  {
    titulo: 'Presión sobre el entorno natural',
    resumen: 'Residuos, agua y espacios naturales saturados. Es una de las preocupaciones que más crecen.',
    evidencia: [
      'El 69,6 % cree que el turismo genera demasiados residuos o aguas residuales (74,9 % en el norte).',
      'Daños irreparables a los ecosistemas: del 57,8 % al 63,2 %.',
      'Masca recibía más de 100.000 visitas al año. Con aforo y ecotasa, unas 24.000.',
      'La ecotasa del Teide redujo las visitas a los senderos de 38.200 a 10.893 en un mes.',
    ],
    fuentes: [49, 50, 59, 12],
    tenique: 'en parte',
    queHace: 'Experiencias de cuidado del entorno con vecinos y visitantes juntos. Los aforos y las ecotasas siguen siendo del Cabildo.',
    quien: { texto: 'Cabildo de Tenerife: gestiona los espacios naturales y sus ecotasas (Teide, Masca).', fuentes: [12, 59] },
  },
  {
    titulo: 'Vivienda y coste de la vida',
    resumen: 'La causa conocida. La incluimos porque sigue creciendo y explica la sensación de expulsión.',
    evidencia: [
      'El 81,2 % cree que el turismo encarece la vivienda y el 71,4 % ve cambios de residencia no deseados (63,5 % en 2024).',
      'La vivienda vacacional es el 49 % de las plazas inscritas en la isla (130.283 de 266.480 en 2025).',
      'En septiembre de 2026 había 19.148 viviendas vacacionales disponibles en Tenerife, el 41 % de Canarias.',
    ],
    fuentes: [49, 50, 8, 55],
    tenique: 'no aborda',
    queHace: 'No la resuelve. No crea plazas turísticas: las experiencias no necesitan alojamiento.',
    quien: { texto: 'Gobierno de Canarias: competencia exclusiva en vivienda (Estatuto, art. 143) y ley de vivienda vacacional (Ley 6/2025). Ayuntamientos: su planeamiento decide si se admite el uso turístico y hacen las inspecciones.', fuentes: [74, 71, 11] },
  },
  {
    titulo: 'Vertidos y playas cerradas',
    resumen: 'El saneamiento no da abasto en parte de la costa. El vecino lo vive como playas que pierde.',
    evidencia: [
      'El 69,6 % cree que el turismo genera demasiados residuos, contaminación o aguas residuales (74,9 % en el norte).',
      'En 2026, Sanidad ha recomendado once cierres de baño en Tenerife: tres en Playa Jardín y uno en El Camisón, Los Cristianos, El Médano y otras siete zonas. Pero el 99 % de las 891 muestras fueron aptas.',
      'El TJUE condenó a España en diciembre de 2025 por no recoger bien las aguas residuales en varias aglomeraciones de Tenerife, entre ellas zonas turísticas como Adeje-Arona, Golf del Sur y Puerto de Santiago-Playa la Arena.',
      'Canarias pagó 8,22 M€ en multas de la UE entre 2019 y 2023 por una condena anterior sobre depuración.',
      'Censo oficial de 2025: 403 puntos de vertido al mar en Canarias, de los que 291 no tienen autorización vigente (no hay desglose por isla en la nota).',
    ],
    fuentes: [49, 81, 83, 82, 80],
    tenique: 'no aborda',
    queHace: 'No lo resuelve. Puede mostrar con transparencia el estado de las playas del municipio.',
    quien: { texto: 'Ayuntamientos: evacuación y tratamiento de aguas residuales (Ley 7/1985, art. 25.2 c). Gobierno de Canarias: censo y autorización de vertidos al mar. El Cabildo planifica a través del Consejo Insular de Aguas, aunque declara no ser el competente.', fuentes: [73, 80, 83] },
  },
  {
    titulo: 'Movilidad y servicios tensionados',
    resumen: 'El residente siente que comparte carreteras y servicios pensados para menos gente.',
    evidencia: [
      'El 68,5 % cree que el turismo perjudica el tráfico y la movilidad.',
      'El 51,7 % cree que colapsa los servicios sanitarios (Canarias: 42,8 %).',
    ],
    fuentes: [49],
    tenique: 'no aborda',
    queHace: 'No la resuelve. Puede priorizar experiencias a pie o en guagua, pero eso no cambia el tráfico.',
    quien: { texto: 'Cabildo: carreteras insulares y transporte por carretera (Ley 8/2015, art. 6.2). Gobierno de Canarias: carreteras de interés autonómico. Ayuntamientos: tráfico, aparcamiento y transporte urbano (Ley 7/1985, art. 25.2).', fuentes: [72, 73] },
  },
]

export type Hipotesis = { id: string; texto: string; porQue: string; pregunta: string; aQuien: string; guion?: string }

/**
 * Lo que no tiene evidencia todavía. H1–H7 son las mismas del guion de entrevistas (docs/usuarios-guion-tenique.md);
 * H8–H10 salen de huecos del diagnóstico. `guion` = preguntas del guion que la miden.
 */
export const HIPOTESIS: Hipotesis[] = [
  { id: 'H1', texto: 'El malestar no es contra el turista. Va ligado a la vivienda, la movilidad y a sentir que el beneficio no llega al barrio.', porQue: 'Lo apuntan los datos (81,2 % vivienda; 31,4 % nota mejora en los servicios de su comarca), pero falta oírlo en primera persona.', pregunta: '¿Qué es lo que más te molesta del turismo en tu día a día? ¿Y qué te aporta?', aQuien: 'Vecinos de zonas turísticas', guion: 'V3, V4' },
  { id: 'H2', texto: 'Vecinos y turistas apenas se relacionan fuera de lo comercial.', porQue: 'El 72,9 % valora relacionarse con gente de fuera, pero no sabemos cuánto ocurre de verdad.', pregunta: 'Piensa en la última vez que trataste con un turista fuera del trabajo. ¿Qué pasó?', aQuien: 'Vecinos y turistas', guion: 'V2, T2' },
  { id: 'H3', texto: 'Un vecino compartiría algo suyo aunque no cobre, si recibe algo visible a cambio: mejora del barrio, voz o reconocimiento.', porQue: 'Solo el 36,8 % cree que el turismo mantiene la identidad; las redes de greeters funcionan con voluntarios (3.660 en 2025).', pregunta: '¿Hay algo de tu zona o tuyo que te gustaría que un visitante conociera?', aQuien: 'Vecinos, asociaciones, productores', guion: 'V5, V6' },
  { id: 'H4', texto: 'Ver en qué se gasta el dinero del turismo en el barrio cambia cómo se percibe.', porQue: 'Solo el 31,4 % nota mejora en los servicios de su comarca. En Barcelona, menos de la mitad sabe que la tasa financia proyectos.', pregunta: '¿Notas que el dinero del turismo se quede en tu barrio? ¿En qué lo notas?', aQuien: 'Vecinos de las tres comarcas', guion: 'V4, V6' },
  { id: 'H5', texto: 'El turista quiere conocer a gente de aquí y no sabe dónde encontrarla.', porQue: 'Sin dato en Tenerife. Lo sugieren las redes de greeters: 46.927 visitantes en 2025.', pregunta: 'En este viaje, ¿has hablado con alguien de aquí que no te estuviera vendiendo nada?', aQuien: 'Turistas en zonas de paso', guion: 'T2, T3' },
  { id: 'H6', texto: 'Buscar experiencias por emoción se entiende y sirve.', porQue: 'Encaja con la marca vigente de Turismo de Tenerife, «Tenerife! despierta emociones», pero no está probado con usuarios.', pregunta: 'Si buscaras algo así por cómo quieres sentirte, ¿qué elegirías?', aQuien: 'Vecinos y turistas', guion: 'V7, T5' },
  { id: 'H7', texto: 'Quien no usa redes se enteraría por su ayuntamiento, su asociación o el boca a boca.', porQue: 'El reto pide llegar a quien no está en redes. Sin dato propio.', pregunta: '¿Cómo te enterarías tú de algo así? ¿Y tus padres o tus abuelos?', aQuien: 'Mayores y personas sin smartphone', guion: 'V8' },
  { id: 'H8', texto: 'La población no se siente escuchada en las decisiones sobre turismo.', porQue: 'No hay ninguna medición pública de esto en Tenerife.', pregunta: '¿Alguien te ha preguntado alguna vez qué turismo quieres para tu pueblo?', aQuien: 'Vecinos y asociaciones vecinales' },
  { id: 'H9', texto: 'En las zonas rurales el turismo se vive más como una oportunidad que no llega que como presión.', porQue: 'La encuesta no separa lo rural; la vivienda vacacional ya llega a Arico o Garachico.', pregunta: '¿El turismo te ha traído algo a tu pueblo? ¿Qué te gustaría que trajera?', aQuien: 'Vecinos de medianías y pueblos' },
  { id: 'H11', texto: 'Las depuradoras de las zonas turísticas no están dimensionadas para la población flotante.', porQue: 'Varias aglomeraciones condenadas por el TJUE son turísticas, pero no hay un dato público de la carga que suponen los turistas.', pregunta: 'Para técnicos municipales: ¿para cuánta población se diseñó la depuradora? ¿Y cuánta recibe en temporada alta?', aQuien: 'Técnicos de ayuntamientos y del Consejo Insular de Aguas' },
  { id: 'H10', texto: 'Los jóvenes son los más críticos porque son los que más sufren la vivienda.', porQue: 'El informe de Turismo de Tenerife sobre la encuesta de 2024 dice que los jóvenes son los más críticos.', pregunta: '¿Te ves viviendo en tu municipio dentro de diez años? ¿Qué tiene que ver el turismo con eso?', aQuien: 'Jóvenes de 18 a 34 años' },
]

/** Lo que devuelve el turismo a Tenerife, con lo que hay publicado. */
export const RETORNO: Dato[] = [
  { etiqueta: 'Facturación turística en 2025', valor: '9.134 M€', detalle: '+2,2 %, por más turistas, no por más gasto', fuentes: [8], verificado: true },
  { etiqueta: 'Afiliaciones en turismo (octubre de 2026)', valor: '100.665', detalle: 'el 23,2 % de toda la isla', fuentes: [58], verificado: true },
  { etiqueta: 'Contratos turísticos en 2025', valor: '44,4 %', detalle: 'de todos los contratos de Tenerife (147.971)', fuentes: [8], verificado: true },
  { etiqueta: 'Hogares con vínculo económico con el turismo', valor: '23,1 %', detalle: 'sur 44,6 %; norte 12,8 %; área metropolitana 11,5 %', fuentes: [51], verificado: true },
  { etiqueta: 'Reinvertido por la ecotasa de Masca', valor: '652.000 €', detalle: 'en el barranco, el sendero y la guagua; 17 empleos, la mayoría de residentes del entorno', fuentes: [59], verificado: true },
  { etiqueta: 'Apoyo a una tasa turística en Tenerife', valor: '58,0 %', detalle: 'Canarias: 49,7 %', fuentes: [52], verificado: true },
]

/** «Qué deja el turismo en tu municipio»: lo que se puede saber hoy con datos públicos. */
export const MUNICIPIO_EXISTE: { dato: string; fuentes: number[] }[] = [
  { dato: 'Cuántas camas turísticas hay por cada 100 vecinos (hoteles, apartamentos y vivienda vacacional).', fuentes: [55, 56, 57] },
  { dato: 'Cuánto ingresó la vivienda vacacional del municipio en un año.', fuentes: [55] },
  { dato: 'Cuánto gasta el ayuntamiento por vecino (todo su presupuesto, no solo lo que viene del turismo).', fuentes: [69] },
  { dato: 'Cuánta gente está en paro y cómo cambia de un año a otro.', fuentes: [70] },
]

/** Lo que el vecino querría saber y hoy no está publicado por municipio. */
export const MUNICIPIO_NO_EXISTE: string[] = [
  'Cuántos turistas pasan o duermen en tu municipio.',
  'Cuánto gastan en tu municipio y en qué negocios.',
  'Cuántos empleos turísticos hay en tu municipio (el ISTAC solo lo publica por isla).',
  'Cuánto de lo que pagan los turistas en impuestos vuelve a tu municipio.',
  'Qué parte de la sanidad, la educación o la limpieza de tu zona se paga gracias al turismo.',
]

/** Lo que no está publicado (y es parte del diagnóstico). */
export const RETORNO_HUECOS: string[] = [
  'No hay datos por isla de lo que el turismo aporta a sanidad, educación o limpieza.',
  'No hay un dato acumulado y publicado de lo recaudado por la ecotasa del Teide en 2026.',
  'No hemos encontrado ninguna encuesta del Cabildo ni de Turismo de Tenerife sobre convivencia o sobre si la gente se siente escuchada.',
  'Para comparar: en Canarias, el turismo supone el 37,7 % del PIB y el 42,3 % del empleo (Exceltur, 2024). No hay cifra por isla.',
]

export type Referente = { nombre: string; lugar: string; categoria: string; que: string; resultado?: string; leccion?: string; fuentes: number[]; verificado: boolean }

/** Benchmark de convivencia y corresponsabilidad: casos con resultado medible. */
export const REFERENTES: Referente[] = [
  { nombre: 'Ecotasa y aforo de Masca', lugar: 'Tenerife', categoria: 'Retorno visible', que: 'Reserva obligatoria, 275 personas al día y tasa para no residentes. Gratis para residentes en Tenerife.', resultado: 'Visitas de más de 100.000 a unas 24.000 al año (−76 %); 652.000 € reinvertidos en el barranco; 17 empleos, sobre todo de vecinos del entorno.', leccion: 'Ya funciona en la isla: el dinero se queda donde se genera y se ve. Pero el 95 % de quien lo recorre es visitante: falta el encuentro.', fuentes: [59], verificado: true },
  { nombre: 'Tenerife es tuya', lugar: 'Tenerife', categoria: 'Antecedente en Tenerife', que: 'Programa del Cabildo y Turismo de Tenerife para que residentes redescubran la isla con rutas guiadas gratuitas. En 2025, para colectivos vulnerables, mayores y voluntariado.', resultado: 'Unos 2.500 participantes desde 2020.', leccion: 'Turismo de Tenerife ya trabaja con residentes, pero sin turistas y en grupos. Tenique es el paso siguiente: el vecino pasa de redescubrir la isla a compartirla.', fuentes: [84], verificado: true },
  { nombre: 'Greeters', lugar: '181 destinos en 46 países', categoria: 'Vecinos anfitriones', que: 'Vecinos voluntarios pasean gratis a grupos pequeños de visitantes por su barrio.', resultado: '3.660 greeters y 46.927 visitantes en 2025.', leccion: 'El vecino como anfitrión funciona a escala. Tenique añade ingreso para el anfitrión y fondo para el barrio.', fuentes: [62], verificado: true },
  { nombre: 'Closed for Maintenance', lugar: 'Islas Feroe', categoria: 'Vecinos y visitantes juntos', que: 'Se cierran lugares turísticos un fin de semana y voluntarios de fuera y vecinos los reparan juntos.', resultado: '2019–2026: 72 proyectos en 46 lugares; 754 voluntarios extranjeros y 279 feroeses; 44.625 solicitudes.', leccion: 'Hacer algo juntos genera orgullo. La demanda supera de largo a las plazas.', fuentes: [63], verificado: true },
  { nombre: 'CopenPay', lugar: 'Copenhague', categoria: 'Vecinos y visitantes juntos', que: 'Premia con experiencias gratis a quien hace acciones verdes (bici, limpieza, voluntariado). Abierto a turistas y residentes.', resultado: '2025: 25.000 participantes, 100 socios, alquiler de bicis +59 %.', leccion: 'La experiencia como recompensa mueve a la gente. Lo abierto a locales evita el «solo para turistas».', fuentes: [64], verificado: true },
  { nombre: 'La tasa turística, a los barrios', lugar: 'Barcelona', categoria: 'Fondo con uso visible', que: 'Parte de lo recaudado financia proyectos que piden los distritos.', resultado: '106,5 M€ recaudados en 2024; 37,12 M€ para 118 iniciativas en el mandato (julio de 2025).', leccion: 'El fondo de barrio es viable a gran escala.', fuentes: [65], verificado: true },
  { nombre: 'Encuesta anual de percepción', lugar: 'Barcelona', categoria: 'Medir la convivencia', que: 'Encuesta municipal anual a residentes sobre el turismo.', resultado: '2025: 59,6 % lo ve más beneficioso que perjudicial; 76,7 % cree que la ciudad está en su límite; 75,7 % conoce la tasa, pero menos de la mitad sabe que financia proyectos.', leccion: 'Si el uso del dinero no se ve, no cuenta. Hay que medir la convivencia cada año.', fuentes: [66], verificado: true },
  { nombre: 'Airbnb Social Impact Experiences', lugar: 'Varios países', categoria: 'Fondo con uso visible', que: 'Experiencias organizadas por ONG; la plataforma renuncia a su comisión.', resultado: 'Casi 4 M€ recaudados por ONG (2019).', leccion: 'Cada reserva puede financiar a una entidad local de forma directa.', fuentes: [67], verificado: true },
  { nombre: 'Mālama Hawaiʻi', lugar: 'Hawái', categoria: 'Corresponsabilidad', que: 'Panel de la autoridad turística que conecta visitantes con voluntariado local.', resultado: '36 organizaciones en el programa (2024).', leccion: 'Sin participación real, la campaña no cambia la percepción: hay que medir cuánta gente participa, no solo cuánta oferta hay.', fuentes: [40], verificado: true },
  { nombre: 'Contributo di accesso', lugar: 'Venecia', categoria: 'Retorno visible', que: 'Tasa para excursionistas de un día en las jornadas punta.', resultado: '2025: 723.497 pagos y 5,4 M€; al menos 1,5 M€ para bajar la tasa de basuras a los residentes.', leccion: 'Devolver al residente algo que nota en su bolsillo.', fuentes: [68], verificado: false },
]

export type DatoAbierto = { nombre: string; que: string; acceso: string; fuentes: number[] }

export const DATOS_ABIERTOS: DatoAbierto[] = [
  { nombre: 'ISTAC · encuesta a residentes (ECOSOC)', que: 'Percepción del turismo por grandes comarcas de Tenerife, 2024 y 2026.', acceso: 'datos.canarias.es · conjuntos C00086A_000493 (2026) y C00086A_000250 (2024)', fuentes: [49, 50] },
  { nombre: 'ISTAC · API de indicadores', que: 'Turistas por isla, plazas por municipio, población, afiliaciones en turismo.', acceso: 'datos.canarias.es/api/estadisticas/indicators · sin clave; script en scripts/datos/descargar.mjs', fuentes: [46, 56, 57, 58] },
  { nombre: 'ISTAC · vivienda vacacional', que: 'Viviendas, plazas, ocupación e ingresos por municipio, mensual.', acceso: 'datos.canarias.es · conjunto C00065A_000061', fuentes: [55] },
  { nombre: 'Turismo de Tenerife · investigación', que: 'Balance anual de la isla: turistas, gasto, empleo, oferta inscrita.', acceso: 'webtenerife.com · investigación', fuentes: [8, 54] },
]

export const PENDIENTE_VERIFICAR = [
  'Venecia: pagos y recaudación de 2025 (la página oficial no carga; las cifras vienen de prensa).',
  'Vertidos: cuántos de los 403 puntos del censo están en Tenerife (la prensa da 180 en 2025 y 195 en 2021; falta el dato oficial por isla en IDECanarias).',
  'Depuración: capacidad del 52 % (2023) o el 86 % (2026) del agua residual, y 62,5 millones de m³ al año sin depurar bien. Vienen de un observatorio ciudadano, no de una fuente oficial.',
  'Playa Jardín: casi un año cerrada y reabierta en 2025 (fuente no oficial).',
  'Salario medio en hostelería (INE, Encuesta Anual de Estructura Salarial 2024): sin abrir la fuente; no hay dato por isla.',
  'Recaudación acumulada de la ecotasa del Teide en 2026.',
  'Si la población se siente escuchada: no hay dato. Es la hipótesis H3.',
  'Relación entre la Ley 6/2025 y la reforma de julio de 2026 de la vivienda vacacional.',
]

/** Perfil del turista por isla, 2025 (Promotur, turistas de 16 años o más) [41]. La Gomera y El Hierro no vienen en ese informe. */
export type Isla = {
  id: string
  nombre: string
  turistas?: number
  gastoViaje?: number
  gastoDiario?: number
  estancia?: number
  repetidores?: number
  reinoUnido?: number
  alemania?: number
  peninsula?: number
}

export const ISLAS: Isla[] = [
  { id: 'tenerife', nombre: 'Tenerife', turistas: 6443553, gastoViaje: 1418, gastoDiario: 182.15, estancia: 8.9, repetidores: 69.2, reinoUnido: 37.1, alemania: 11.5, peninsula: 12.3 },
  { id: 'gran-canaria', nombre: 'Gran Canaria', turistas: 4192419, gastoViaje: 1498, gastoDiario: 175.35, estancia: 10.1, repetidores: 72.8, reinoUnido: 21.3, alemania: 19.5, peninsula: 12.1 },
  { id: 'lanzarote', nombre: 'Lanzarote', turistas: 2871074, gastoViaje: 1439, gastoDiario: 184.03, estancia: 8.7, repetidores: 78.4, reinoUnido: 51.1, alemania: 8.2, peninsula: 9.3 },
  { id: 'fuerteventura', nombre: 'Fuerteventura', turistas: 2388592, gastoViaje: 1390, gastoDiario: 166.72, estancia: 9.2, repetidores: 70.0, reinoUnido: 30.7, alemania: 29.0, peninsula: 8.1 },
  { id: 'la-palma', nombre: 'La Palma', turistas: 188913, gastoViaje: 1366, gastoDiario: 158.97, estancia: 9.7, repetidores: 79.9, reinoUnido: 7.8, alemania: 42.0, peninsula: 27.0 },
  { id: 'la-gomera', nombre: 'La Gomera' },
  { id: 'el-hierro', nombre: 'El Hierro' },
]

export const CANARIAS_2025: Isla = { id: 'canarias', nombre: 'Canarias', turistas: 16125238, gastoViaje: 1438, gastoDiario: 178.16, estancia: 9.2, repetidores: 72.0, reinoUnido: 34.1, alemania: 16.0, peninsula: 11.3 }
