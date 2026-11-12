// Plan de acción de Tenique (pestaña /plan, id 'viabilidad').
// Reglas:
//  - Todo número sin fuente es un SUPUESTO de trabajo: `supuesto: true` y se muestra como tal en la página.
//  - `fuentes` son ids de FUENTES (src/data/investigacion.ts). Los pide el coordinador a investigación.
//  - Las referencias de precios con fecha y URL están en docs/negocio-costes.md.

import type { AgenteId } from './responsabilidades'
import { RETORNO_COMPROMISO } from './investigacion'

export type Nivel = 'bajo' | 'medio' | 'alto'

// ─── 1 · hoja de ruta ────────────────────────────────────────────────────────

export type Hito = { que: string; lidera: string; fuentes?: number[] }
export type Fase = {
  id: string
  cuando: string // plazo relativo al arranque
  titulo: string
  objetivo: string
  alcance: string
  hitos: Hito[]
  decision?: string // qué se decide al cerrar la fase
}

export const FASES: Fase[] = [
  {
    id: 'preparar',
    cuando: 'Meses 0–3',
    titulo: 'Preparar',
    objetivo: 'Dejar listo lo legal, elegir dónde empezar y captar a los primeros anfitriones.',
    alcance: '3 municipios: uno turístico, uno rural y uno metropolitano',
    hitos: [
      { que: 'Convenio entre Cabildo y Turismo de Tenerife: el Cabildo crea y gestiona el fondo; Turismo de Tenerife coordina el programa', lidera: 'Cabildo y Turismo de Tenerife' },
      { que: 'Informe jurídico: figura del fondo, fiscalidad de anfitriones, seguros y RGPD', lidera: 'Servicios jurídicos del Cabildo' },
      { que: 'Elección de los 3 municipios y acuerdo con sus ayuntamientos', lidera: 'Cabildo con los ayuntamientos' },
      { que: 'Contratación de un dinamizador de barrio por municipio, que trabaja desde el punto físico que cede el ayuntamiento', lidera: 'Cabildo con los ayuntamientos' },
      { que: 'Captación y formación de anfitriones: vecinos, asociaciones, comercio y productores locales y empresas; protocolo de las tres piedras de validación', lidera: 'Dinamizadores de barrio' },
      { que: 'Propuesta: invitar a ser anfitriones a los participantes de «Tenerife es tuya», el programa de rutas del Cabildo para residentes', lidera: 'Turismo de Tenerife con el Cabildo', fuentes: [84] },
      { que: 'Acuerdo de aportación con empresas turísticas y con propietarios y gestores de vivienda vacacional', lidera: 'Cabildo con patronales y asociaciones de vivienda vacacional' },
      { que: 'App mínima y un punto físico por municipio (oficina de turismo o centro ciudadano que cede el ayuntamiento)', lidera: 'Turismo de Tenerife con los ayuntamientos' },
      { que: 'Encuesta de partida a residentes (antes), con evaluación externa', lidera: 'ISTAC o universidad, por encargo del Cabildo' },
    ],
  },
  {
    id: 'piloto',
    cuando: 'Meses 4–9',
    titulo: 'Piloto',
    objetivo: 'Probar con gente real si vecinos y visitantes comparten experiencias y si el fondo se nota en el barrio.',
    alcance: '3 municipios, 6 meses',
    hitos: [
      { que: 'Primeras experiencias con las tres piedras: «Garantía Turismo de Tenerife» (revisión de condiciones antes de publicar), «Avalada por el barrio» (aval de la asociación o de los vecinos) y «Valorada por quien la vivió» (todas las personas que asistieron, vecinos y visitantes)', lidera: 'Turismo de Tenerife, con el dinamizador para el aval vecinal' },
      { que: 'Primeras experiencias: de pago solo si las ofrecen asociaciones, entidades, comercio y productores locales o empresas; los vecinos, gratis o con donación al fondo', lidera: 'Anfitriones y asociaciones' },
      { que: 'Primeras empresas y viviendas vacacionales adheridas con aportación al fondo', lidera: 'Cabildo con las patronales; Turismo de Tenerife las invita' },
      { que: 'Primera votación del fondo en cada barrio, en la app y en papel', lidera: 'Ayuntamientos' },
      { que: 'Primer proyecto pagado por el fondo, señalizado en la calle', lidera: 'Ayuntamientos' },
      { que: 'Encuesta de cierre a residentes (después)', lidera: 'ISTAC o universidad (evaluación externa)' },
      { que: 'Evaluación con los umbrales y publicación de resultados', lidera: 'Turismo de Tenerife con el Cabildo' },
    ],
    decision: 'Mes 9: seguir, ajustar o parar según los umbrales del piloto.',
  },
  {
    id: 'expandir',
    cuando: 'Meses 10–24',
    titulo: 'Expandir',
    objetivo: 'Llevarlo a más municipios y hacer la aportación de las empresas sistemática.',
    alcance: 'Unos 10 municipios, por comarcas, con zonas rurales en cada tanda',
    hitos: [
      { que: 'Nuevos municipios por tandas, cada uno con su punto físico', lidera: 'Cabildo' },
      { que: 'Aportación de empresas turísticas y de vivienda vacacional por tramos, recogida en el convenio', lidera: 'Cabildo y patronales' },
      { que: 'Vecinos anfitriones pueden cobrar, solo si el informe jurídico deja clara la figura (alta, impuestos, seguro)', lidera: 'Cabildo' },
      { que: 'Primer informe anual del fondo en lenguaje cercano', lidera: 'Cabildo (cuentas) y Turismo de Tenerife (publicación)' },
      { que: 'Datos del programa publicados como datos abiertos', lidera: 'Cabildo' },
    ],
    decision: 'Mes 24: decidir la figura estable del fondo con lo aprendido.',
  },
  {
    id: 'isla',
    cuando: 'Año 3',
    titulo: 'Toda la isla',
    objetivo: 'Todos los municipios de Tenerife dentro y el fondo consolidado.',
    alcance: 'Toda Tenerife',
    hitos: [
      { que: 'Programa presente en todos los municipios', lidera: 'Cabildo' },
      { que: 'Fondo con figura jurídica estable y cuentas auditadas', lidera: 'Cabildo' },
      { que: 'Presupuestos participativos del fondo cada año en cada barrio', lidera: 'Ayuntamientos' },
    ],
  },
  {
    id: 'largo',
    cuando: 'Años 4–5',
    titulo: 'Hacerlo costumbre',
    objetivo: 'Que la convivencia sea parte de cómo se vive y se visita Tenerife, no un proyecto.',
    alcance: 'Toda Tenerife',
    hitos: [
      { que: 'Tenique dentro de la estrategia turística insular', lidera: 'Cabildo y Turismo de Tenerife' },
      { que: 'Medición anual de percepción de residentes comparable año a año', lidera: 'ISTAC o universidad' },
      { que: 'Evaluación externa del impacto y ajuste del modelo', lidera: 'ISTAC, universidad o entidad independiente' },
    ],
  },
]

// ─── 2 · fondo del barrio ────────────────────────────────────────────────────

/** Qué pone el residente: no solo recibe, también aporta. */
export const RESIDENTE: { que: string; texto: string }[] = [
  { que: 'Su tiempo', texto: 'Como anfitrión de una experiencia o como voluntario en las de su barrio.' },
  { que: 'Su aval', texto: 'Avala, con su asociación o en reunión abierta, las experiencias de su barrio («Avalada por el barrio»).' },
  { que: 'Su voto', texto: 'Decide en qué se gasta el fondo de su barrio, en la app o en papel.' },
  { que: 'Su parte al reservar', texto: 'Paga un precio de residente simbólico y el 10 % va al fondo, como en cualquier reserva (supuesto).' },
  { que: 'O su tiempo, si no puede pagar', texto: 'Quien no puede pagar participa a cambio de horas de voluntariado en el barrio.' },
]

export type PiezaFondo = { titulo: string; texto: string; quien: string }

/** Cómo funciona el fondo, de la entrada del dinero a su publicación. */
export const FONDO: PiezaFondo[] = [
  {
    titulo: 'De dónde sale',
    texto: 'Sobre todo de quien vive del turismo: una aportación fija de las empresas turísticas según su tamaño, otra de cada vivienda vacacional y un porcentaje de cada reserva, también las del comercio y los productores locales (que en el piloto no pagan cuota). Las donaciones en experiencias gratuitas van enteras al fondo. El Cabildo suma una parte por cada euro privado, nunca la mayor.',
    quien: 'Empresas turísticas, vivienda vacacional, visitantes y Cabildo',
  },
  {
    titulo: 'Quién lo gestiona',
    texto: 'El Cabildo, con una cuenta separada por municipio. Nadie del programa cobra de esa cuenta. Turismo de Tenerife no maneja el dinero: coordina el programa y lo da a conocer.',
    quien: 'Cabildo',
  },
  {
    titulo: 'Quién decide en qué se gasta',
    texto: 'Los vecinos del barrio, con presupuestos participativos: proponen y votan en la app o en papel en el punto físico. El ayuntamiento comprueba que se puede hacer.',
    quien: 'Vecinos y ayuntamiento',
  },
  {
    titulo: 'Cómo se publica',
    texto: 'Cada proyecto lleva un cartel en la calle («esto lo ha pagado Tenique») y aparece en la app y en el punto físico con lo que costó. Informe trimestral corto y sin jerga.',
    quien: 'Cabildo (cuentas) y Turismo de Tenerife (publicación)',
  },
]

/** Lo que necesita revisión legal antes de mover dinero. En la web solo figuran cargos, nunca nombres del equipo. */
export const LEGAL: { tema: string; pregunta: string; quien: string }[] = [
  { tema: 'Figura del fondo', pregunta: '¿Convenio, consorcio, fundación pública o línea de subvenciones? ¿Puede recibir dinero de empresas privadas y del Cabildo en la misma cuenta?', quien: 'Servicios jurídicos del Cabildo' },
  { tema: 'Anfitriones particulares', pregunta: '¿Puede un vecino cobrar por una experiencia? ¿Cuándo tiene que darse de alta como actividad, qué licencia de actividad turística necesita y qué experiencias exigen guía habilitado según la normativa turística de Canarias? Hasta saberlo, los vecinos no cobran.', quien: 'Asesoría jurídica del Cabildo y Hacienda' },
  { tema: 'Impuestos', pregunta: '¿Cómo tributa el porcentaje que va al fondo (IGIC) y la aportación de las empresas (¿mecenazgo?)?', quien: 'Hacienda' },
  { tema: 'Seguros', pregunta: '¿Póliza colectiva de responsabilidad civil para anfitriones? ¿Quién responde si alguien se hace daño?', quien: 'Correduría de seguros' },
  { tema: 'Datos personales (RGPD)', pregunta: 'Datos de vecinos y turistas, valoraciones, votos del fondo y posibles menores: evaluación de impacto, base legal, servidores en la UE y minimización.', quien: 'Delegado de protección de datos del Cabildo' },
]

/** Supuestos del simulador del fondo. Ningún valor tiene fuente: son puntos de partida para discutir. */
export type SupuestoFondo = { id: string; etiqueta: string; min: number; max: number; paso: number; unidad: string; grupo: string }
export const SUPUESTOS_FONDO: SupuestoFondo[] = [
  { id: 'empresas', grupo: 'Empresas turísticas', etiqueta: 'Empresas adheridas', min: 0, max: 1000, paso: 5, unidad: 'empresas' },
  { id: 'cuota', grupo: 'Empresas turísticas', etiqueta: 'Aportación media por empresa al año', min: 0, max: 10000, paso: 100, unidad: '€' },
  { id: 'viviendas', grupo: 'Vivienda vacacional', etiqueta: 'Viviendas vacacionales adheridas', min: 0, max: 10000, paso: 50, unidad: 'viviendas' },
  { id: 'cuotaVV', grupo: 'Vivienda vacacional', etiqueta: 'Aportación por vivienda al año', min: 0, max: 500, paso: 10, unidad: '€' },
  { id: 'reservas', grupo: 'Reservas', etiqueta: 'Reservas de pago al mes', min: 0, max: 20000, paso: 50, unidad: 'reservas' },
  { id: 'precio', grupo: 'Reservas', etiqueta: 'Precio medio por reserva', min: 0, max: 100, paso: 1, unidad: '€' },
  { id: 'pctFondo', grupo: 'Reservas', etiqueta: 'Parte de cada reserva al fondo', min: 0, max: 30, paso: 1, unidad: '%' },
  { id: 'pctGestion', grupo: 'Reservas', etiqueta: 'Parte para seguros y gestión', min: 0, max: 20, paso: 1, unidad: '%' },
  { id: 'gratis', grupo: 'Reservas', etiqueta: 'Experiencias gratuitas con donación al mes', min: 0, max: 20000, paso: 50, unidad: 'reservas' },
  { id: 'donacion', grupo: 'Reservas', etiqueta: 'Donación media al fondo', min: 0, max: 30, paso: 1, unidad: '€' },
  { id: 'cabildo', grupo: 'Administración', etiqueta: 'El Cabildo suma, por cada euro privado', min: 0, max: 100, paso: 5, unidad: '%' },
]

/**
 * Escenarios de partida del simulador del fondo (supuestos).
 * Piloto: los vecinos no cobran (hasta que haya figura legal); las reservas de pago son de asociaciones, entidades, comercio y productores locales y empresas.
 * El comercio y los productores locales no pagan cuota en el piloto: su reserva aporta el mismo porcentaje que cualquier otra.
 */
export const ESCENARIOS: { id: string; nombre: string; valores: Record<string, number> }[] = [
  { id: 'piloto', nombre: 'Piloto (3 municipios)', valores: { empresas: 15, cuota: 1000, viviendas: 200, cuotaVV: 50, reservas: 150, precio: 25, pctFondo: 10, pctGestion: 5, gratis: 150, donacion: 5, cabildo: 25 } },
  { id: 'isla', nombre: 'Año 3 (toda la isla)', valores: { empresas: 300, cuota: 1500, viviendas: 3000, cuotaVV: 50, reservas: 5000, precio: 25, pctFondo: 10, pctGestion: 5, gratis: 1000, donacion: 5, cabildo: 25 } },
]

export function fondoAnual(v: Record<string, number>) {
  const ventas = v.reservas * 12 * v.precio
  const reservas = ventas * (v.pctFondo / 100) + v.gratis * 12 * v.donacion
  const empresas = v.empresas * v.cuota
  const viviendas = v.viviendas * v.cuotaVV
  const privado = reservas + empresas + viviendas
  const cabildo = privado * (v.cabildo / 100)
  const gestion = ventas * (v.pctGestion / 100)
  const anfitriones = Math.max(0, ventas - ventas * (v.pctFondo / 100) - gestion)
  const total = privado + cabildo
  return { ventas, reservas, empresas, viviendas, cabildo, privado, total, anfitriones, gestion, pctPublico: total ? (cabildo / total) * 100 : 0 }
}

// ─── 3 · piloto ──────────────────────────────────────────────────────────────

/** Hipótesis del piloto con su umbral de éxito y de parada. Los umbrales son supuestos. */
export type Hipotesis = { hipotesis: string; metrica: string; exito: string; parada: string }
export type Piloto = { donde: string; duracion: string; conQuien: string; hipotesis: Hipotesis[] }

export const PILOTO: Piloto = {
  donde: 'Un municipio turístico, uno rural y uno metropolitano, elegidos con el Cabildo y los ayuntamientos. Un punto físico en cada uno.',
  duracion: '6 meses (meses 4–9), después de 3 meses de preparación. Evaluación al cerrar.',
  conQuien: 'Turismo de Tenerife (coordina, da la garantía y promociona), Cabildo (gestiona el fondo y contrata a los dinamizadores con los ayuntamientos), 3 ayuntamientos (ceden el punto físico), ISTAC o universidad (evaluación externa), asociaciones vecinales, comercio y productores locales (mercados del agricultor, bodegas, queserías, artesanos), 30–50 anfitriones y las primeras empresas y viviendas vacacionales adheridas. Los vecinos no cobran en el piloto: ofrecen experiencias gratis o con donación al fondo; cobran asociaciones, entidades, comercio y productores locales y empresas.',
  hipotesis: [
    { hipotesis: 'Hay vecinos dispuestos a ser anfitriones aunque al principio no cobren.', metrica: 'Anfitriones con al menos una experiencia al mes.', exito: '30 o más anfitriones activos entre los 3 municipios', parada: 'Menos de 10 anfitriones activos' },
    { hipotesis: 'Los visitantes reservan experiencias locales buscando una emoción.', metrica: 'Reservas al mes y valoración media de quienes participan.', exito: '300 o más reservas al mes al final del piloto', parada: 'Menos de 75 reservas al mes' },
    { hipotesis: 'Los residentes también participan, no solo los turistas.', metrica: 'Parte de las plazas ocupadas por residentes.', exito: '25 % o más de las plazas, ocupadas por residentes', parada: 'Menos del 10 % de las plazas, ocupadas por residentes' },
    { hipotesis: 'El gasto se queda en el barrio cuando la experiencia incluye comercio y producto local.', metrica: 'Parte de lo que paga el visitante que cobran anfitriones, comercio y productores del municipio, más lo que el fondo gasta allí.', exito: '85 % o más del gasto, en el municipio', parada: 'Menos del 60 % del gasto, en el municipio' },
    { hipotesis: 'Llegamos a quien no usa redes.', metrica: 'Reservas, altas y votos hechos en los puntos físicos.', exito: '20 % o más de reservas, altas y votos, en puntos físicos', parada: 'Menos del 5 % de reservas, altas y votos, en puntos físicos' },
    { hipotesis: 'Un fondo visible mejora cómo ven los vecinos el turismo.', metrica: 'Encuesta externa (ISTAC o universidad) a residentes antes y después, con la misma pregunta.', exito: 'La valoración positiva sube 10 puntos porcentuales o más en la encuesta', parada: 'Sube 0 puntos porcentuales o baja en la encuesta' },
    { hipotesis: 'Ver en qué se gasta el fondo del barrio mejora la percepción del turismo más que no verlo (transparencia).', metrica: 'Misma encuesta antes y después en un barrio con panel del fondo (cartel en la calle y en la app) y en otro parecido sin panel. Al cerrar el año 1 se repite la comparación con el primer informe del retorno del turismo en el panel.', exito: 'La valoración positiva sube al menos 5 puntos porcentuales más en el barrio con panel que en el barrio sin panel', parada: 'La diferencia entre los dos barrios es de 0 puntos porcentuales o menos' },
    { hipotesis: 'Comunicación, datos y acción juntos generan más orgullo que una campaña aislada.', metrica: 'Pregunta de orgullo en la misma encuesta, antes y después: residentes que participan en Tenique (experiencia, voto o proyecto del fondo) frente a residentes que solo ven la campaña.', exito: 'El orgullo sube al menos 10 puntos porcentuales más entre quienes participan que entre quienes solo ven la campaña', parada: 'La diferencia entre los dos grupos es de 0 puntos porcentuales o menos' },
    { hipotesis: 'Las empresas turísticas y la vivienda vacacional aportan si el destino del dinero es visible.', metrica: 'Empresas y viviendas adheridas con aportación firmada, y parte del fondo que es privada.', exito: '15 empresas y 200 viviendas vacacionales adheridas o más; más del 50 % del fondo, privado', parada: 'Menos de 5 empresas adheridas, o más del 50 % del fondo, del Cabildo' },
  ],
}

// ─── 4 · KPIs ────────────────────────────────────────────────────────────────

/** 3–5 KPIs, ligados a los criterios del reto. Los objetivos son supuestos. */
export type Kpi = { nombre: string; criterio: string; comoSeMide: string; fuenteDatos: string; objetivo?: string; supuesto: boolean }
export const KPIS: Kpi[] = [
  {
    nombre: 'Residentes que participan',
    criterio: 'Involucración de la sociedad',
    comoSeMide: 'Residentes que han sido anfitriones, han ido a una experiencia o han votado el fondo, por cada 1.000 habitantes del municipio. Se desglosa por edad y por zona rural o urbana.',
    fuenteDatos: 'Registros de la app y de los puntos físicos; padrón municipal',
    objetivo: 'Más residentes por cada 1.000 habitantes cada año, en todos los tramos de edad',
    supuesto: true,
  },
  {
    nombre: 'Gasto que se queda en el barrio',
    criterio: 'Turismo responsable',
    comoSeMide: 'Euros que cobran los anfitriones, el comercio y los productores locales (mercados del agricultor, bodegas, queserías, artesanos) más euros del fondo gastados en el barrio, por municipio.',
    fuenteDatos: 'Contabilidad del programa y del fondo',
    objetivo: 'Al menos el 85 % del gasto de cada reserva, en el municipio',
    supuesto: true,
  },
  {
    nombre: 'Percepción de los residentes',
    criterio: 'Factor humano y orgullo',
    comoSeMide: 'Parte de residentes que dice que el turismo mejora su barrio y que se siente orgullosa de cómo se recibe al visitante. Misma encuesta antes, después y cada año.',
    fuenteDatos: 'Encuesta del ISTAC o de la universidad (evaluación externa), en papel y en línea',
    objetivo: '+10 puntos porcentuales en los barrios del piloto',
    supuesto: true,
  },
  {
    nombre: 'Anfitriones locales activos',
    criterio: 'Factor humano e innovación',
    comoSeMide: 'Anfitriones con al menos una experiencia al mes, y cuántos son vecinos, asociaciones, comercio y productores locales o empresas.',
    fuenteDatos: 'App (panel de gestión)',
    objetivo: '30 anfitriones activos en el piloto; al menos 1 anfitrión activo en cada municipio en el año 3',
    supuesto: true,
  },
  {
    nombre: 'Proyectos del fondo hechos y publicados',
    criterio: 'Viabilidad y transparencia',
    comoSeMide: 'Proyectos votados que se terminan y se publican con su coste, y días desde la votación hasta que se ven en la calle.',
    fuenteDatos: 'Informe del fondo',
    objetivo: '100 % de los proyectos publicados; primer proyecto en la calle antes del mes 9',
    supuesto: true,
  },
  {
    nombre: 'Reservas que llegan sin coche propio',
    criterio: 'Viabilidad medioambiental',
    comoSeMide: 'Parte de las reservas en que la persona llega en guagua, a pie, en bici o en coche compartido. Se pregunta al valorar la experiencia.',
    fuenteDatos: 'Valoraciones de la app y de los puntos físicos',
    objetivo: 'Más alto al cerrar el piloto que en el primer mes; el porcentaje se fija con los datos del primer mes',
    supuesto: true,
  },
]

// ─── 4b · viabilidad medioambiental ──────────────────────────────────────────

/** Cómo cuida Tenique el entorno, en ciudad y en espacios naturales. Las medidas son propuestas; ninguna cifra. */
export type MedidaAmbiental = { tema: string; que: string; quien: string }
export const MEDIOAMBIENTE: MedidaAmbiental[] = [
  { tema: 'Cupos y aforos', que: 'Cada experiencia tiene un máximo de plazas, acordado con el barrio. En espacios naturales, además, lo valida el área de medio ambiente del Cabildo. Cuando se llena, la app propone otra fecha u otro barrio.', quien: 'Turismo de Tenerife (ficha de la experiencia) con el barrio y el Cabildo' },
  { tema: 'Carga en zonas urbanas', que: 'Los cupos valen también en cascos históricos, plazas, mercados y calles, no solo en la naturaleza. Hay un máximo de plazas por barrio y día, horarios fuera de las horas de más afluencia, y la app reparte la demanda hacia barrios con menos visitantes. Los vecinos pueden pedir pausar una experiencia.', quien: 'Dinamizador de barrio y ayuntamiento' },
  { tema: 'Transporte', que: 'Cada ficha dice cómo llegar en guagua, a pie o en coche compartido, con el punto de encuentro en una parada. La búsqueda muestra primero las experiencias a las que se llega sin coche propio.', quien: 'Turismo de Tenerife (app) con el Cabildo (transporte)' },
  { tema: 'Residuos', que: 'Cero plásticos de un solo uso en las experiencias con producto local: menaje reutilizable, agua en jarra y producto de temporada y de cercanía. Es requisito para la «Garantía Turismo de Tenerife».', quien: 'Anfitriones; lo revisa Turismo de Tenerife' },
]

// ─── 5 · costes ──────────────────────────────────────────────────────────────

export type Categoria = 'personas' | 'herramientas' | 'infraestructura' | 'mantenimiento'
export type Tipo = 'implantacion' | 'mensual'

/** Una partida de coste: importe = cantidad × precio. Precios sin IVA ni IGIC. */
export type Coste = {
  id: string
  partida: string
  categoria: Categoria
  tipo: Tipo
  cantidad: number
  unidad: string
  precio: number // € por unidad
  nota?: string
  paga: Pagador
  fuentes: number[]
  supuesto: boolean
}
export type Pagador = 'Cabildo' | 'Turismo de Tenerife' | 'Ayuntamientos'

// Precios de servicios en dólares: se toma 1 $ = 1 € para simplificar (supuesto; el tipo real cambia el total en céntimos).
export const COSTES: Coste[] = [
  // implantación
  { id: 'app', partida: 'App y panel de gestión (versión del piloto)', categoria: 'personas', tipo: 'implantacion', cantidad: 1200, unidad: 'h', precio: 45, nota: 'Horas y tarifa sin fuente', paga: 'Turismo de Tenerife', fuentes: [], supuesto: true },
  { id: 'servicio', partida: 'Diseño del servicio, sello local y contenidos', categoria: 'personas', tipo: 'implantacion', cantidad: 300, unidad: 'h', precio: 40, paga: 'Turismo de Tenerife', fuentes: [], supuesto: true },
  { id: 'legal', partida: 'Asesoría jurídica (fondo, fiscalidad, RGPD)', categoria: 'personas', tipo: 'implantacion', cantidad: 1, unidad: 'informe', precio: 8000, paga: 'Cabildo', fuentes: [], supuesto: true },
  { id: 'formacion', partida: 'Formación de anfitriones y del personal de los puntos', categoria: 'personas', tipo: 'implantacion', cantidad: 20, unidad: 'sesión', precio: 300, paga: 'Turismo de Tenerife', fuentes: [], supuesto: true },
  { id: 'puntos', partida: 'Material de los puntos físicos (local cedido por el ayuntamiento) y carteles del fondo', categoria: 'infraestructura', tipo: 'implantacion', cantidad: 3, unidad: 'punto', precio: 1500, paga: 'Ayuntamientos', fuentes: [], supuesto: true },
  { id: 'encuesta', partida: 'Encuestas a residentes antes y después (ISTAC o universidad)', categoria: 'personas', tipo: 'implantacion', cantidad: 2, unidad: 'oleada', precio: 4000, paga: 'Cabildo', fuentes: [], supuesto: true },
  { id: 'protocolo', partida: 'Protocolo de revisión «Garantía Turismo de Tenerife» y modelo de aval vecinal', categoria: 'personas', tipo: 'implantacion', cantidad: 60, unidad: 'h', precio: 40, paga: 'Turismo de Tenerife', fuentes: [], supuesto: true },
  // mensual
  { id: 'revision', partida: 'Revisión de experiencias antes de publicar (Garantía Turismo de Tenerife)', categoria: 'personas', tipo: 'mensual', cantidad: 40, unidad: 'h', precio: 35, nota: 'Unas 20 experiencias nuevas o renovadas al mes × 2 h. El aval vecinal lo acompaña el dinamizador, sin coste extra', paga: 'Turismo de Tenerife', fuentes: [], supuesto: true },
  { id: 'coordinacion', partida: 'Coordinación del programa', categoria: 'personas', tipo: 'mensual', cantidad: 1, unidad: 'persona', precio: 3500, nota: 'Coste empresa mensual sin fuente', paga: 'Turismo de Tenerife', fuentes: [], supuesto: true },
  { id: 'dinamizadores', partida: 'Dinamizadores de barrio', categoria: 'personas', tipo: 'mensual', cantidad: 3, unidad: 'persona', precio: 2500, nota: 'Uno por municipio del piloto. Los contrata el Cabildo con los ayuntamientos; trabajan desde el punto físico que cede el ayuntamiento', paga: 'Cabildo', fuentes: [], supuesto: true },
  { id: 'mantenimiento', partida: 'Mantenimiento y soporte de la app', categoria: 'mantenimiento', tipo: 'mensual', cantidad: 40, unidad: 'h', precio: 45, paga: 'Turismo de Tenerife', fuentes: [], supuesto: true },
  { id: 'seguro', partida: 'Seguro colectivo de responsabilidad civil', categoria: 'mantenimiento', tipo: 'mensual', cantidad: 1, unidad: 'póliza', precio: 400, paga: 'Cabildo', fuentes: [], supuesto: true },
  { id: 'backend', partida: 'Base de datos y usuarios (Supabase Pro)', categoria: 'infraestructura', tipo: 'mensual', cantidad: 1, unidad: 'mes', precio: 25, nota: 'Precio oficial: 25 $/mes', paga: 'Turismo de Tenerife', fuentes: [76], supuesto: false },
  { id: 'web', partida: 'Alojamiento web (Vercel Pro)', categoria: 'infraestructura', tipo: 'mensual', cantidad: 1, unidad: 'mes', precio: 20, nota: 'Precio oficial: 20 $/mes', paga: 'Turismo de Tenerife', fuentes: [77], supuesto: false },
  { id: 'mapas', partida: 'Mapas (Mapbox)', categoria: 'infraestructura', tipo: 'mensual', cantidad: 1, unidad: 'mes', precio: 0, nota: '50.000 cargas web al mes gratis', paga: 'Turismo de Tenerife', fuentes: [78], supuesto: false },
  { id: 'ia', partida: 'IA para búsqueda por emoción y traducción (Claude Haiku 5.5)', categoria: 'herramientas', tipo: 'mensual', cantidad: 50, unidad: 'M tokens', precio: 0.3, nota: '0,10 $ entrada y 0,50 $ salida por millón; volumen y mezcla supuestos', paga: 'Turismo de Tenerife', fuentes: [79], supuesto: true },
  { id: 'avisos', partida: 'Avisos por WhatsApp (confirmaciones)', categoria: 'herramientas', tipo: 'mensual', cantidad: 2000, unidad: 'mensaje', precio: 0.0166, nota: 'Tarifa de utilidad en España por verificar en la tabla oficial de Meta', paga: 'Turismo de Tenerife', fuentes: [], supuesto: true },
]

/** Supuestos globales del simulador de costes. */
export type Supuesto = { id: string; etiqueta: string; valor: number; min: number; max: number; paso: number; unidad: string }
export const SUPUESTOS: Supuesto[] = [
  { id: 'meses', etiqueta: 'Meses de funcionamiento', valor: 6, min: 1, max: 24, paso: 1, unidad: 'meses' },
  { id: 'colchon', etiqueta: 'Margen para imprevistos', valor: 15, min: 0, max: 50, paso: 5, unidad: '%' },
]

// ─── 6 · riesgos ─────────────────────────────────────────────────────────────

export type TipoRiesgo = 'técnico' | 'legal' | 'adopción' | 'operativo' | 'medioambiental' | 'económico'
export type Riesgo = { riesgo: string; tipo: TipoRiesgo; probabilidad: Nivel; impacto: Nivel; mitigacion: string; porVerificar?: boolean }
export const RIESGOS: Riesgo[] = [
  { riesgo: 'La figura del fondo no permite mezclar dinero público y privado como lo planteamos.', tipo: 'legal', probabilidad: 'medio', impacto: 'alto', mitigacion: 'Informe jurídico en los meses 0–3, antes de cobrar nada. Si hace falta, dos cuentas con el mismo uso y la misma publicación.' },
  { riesgo: 'No sabemos aún si un vecino puede cobrar una experiencia: fiscalidad, alta de actividad, seguro y licencia de actividad turística.', tipo: 'legal', probabilidad: 'alto', impacto: 'alto', porVerificar: true, mitigacion: 'El piloto empieza sin cobro para particulares: pagan solo las experiencias de asociaciones, entidades y empresas; las de vecinos son gratis o con donación al fondo. El cobro llega después, si el informe jurídico lo permite. Seguro colectivo desde el primer día.' },
  { riesgo: 'Datos personales de vecinos, turistas y votos del fondo.', tipo: 'legal', probabilidad: 'medio', impacto: 'alto', mitigacion: 'Evaluación de impacto antes del piloto, servidores en la UE, pedir solo lo necesario y voto sin datos a la vista.' },
  { riesgo: 'Pocos anfitriones, sobre todo en zonas rurales.', tipo: 'adopción', probabilidad: 'medio', impacto: 'alto', mitigacion: 'Dinamizador en cada municipio, asociaciones, comercio y productores locales como anfitriones y empezar con experiencias que ya existen.' },
  { riesgo: 'La gente mayor o sin móvil se queda fuera.', tipo: 'adopción', probabilidad: 'alto', impacto: 'medio', mitigacion: 'Todo se puede hacer en el punto físico, por teléfono o en papel, también votar el fondo.' },
  { riesgo: 'Más visitantes en barrios que ya están cansados, también en zonas urbanas (cascos históricos, plazas, mercados), no solo en espacios naturales.', tipo: 'medioambiental', probabilidad: 'medio', impacto: 'alto', mitigacion: 'Cupo de plazas por experiencia y por barrio y día, acordado con cada barrio; horarios fuera de las horas de más afluencia; la app reparte la demanda hacia barrios con menos visitantes; los vecinos pueden pedir pausar una experiencia.' },
  { riesgo: 'Experiencias en espacios naturales protegidos.', tipo: 'medioambiental', probabilidad: 'medio', impacto: 'medio', mitigacion: 'Validación con el área de medio ambiente del Cabildo y cupos por espacio, como ya se hace con el acceso a los senderos del Teide.' },
  { riesgo: 'Que se espere de Tenique lo que no puede dar: no resuelve la vivienda, la movilidad ni el saneamiento, que están detrás de buena parte del malestar.', tipo: 'operativo', probabilidad: 'alto', impacto: 'alto', mitigacion: 'Decirlo claro desde el principio y publicar a quién corresponde cada una. Tenique sí puede llevar a esas administraciones lo que digan los vecinos en las votaciones del fondo.' },
  { riesgo: 'Que parezca que el fondo lo paga solo la administración.', tipo: 'económico', probabilidad: 'medio', impacto: 'alto', mitigacion: 'Aportación sistemática de empresas turísticas y vivienda vacacional en el convenio; el Cabildo solo suma una parte por cada euro privado y se publica qué parte pone cada uno.' },
  { riesgo: 'El fondo es tan pequeño al principio que no se nota.', tipo: 'económico', probabilidad: 'alto', impacto: 'medio', mitigacion: 'Aportación del Cabildo por cada euro, proyectos pequeños pero muy visibles y publicar desde el primer euro.' },
  { riesgo: 'Pocas asociaciones dispuestas a avalar experiencias, sobre todo en barrios sin asociación activa.', tipo: 'adopción', probabilidad: 'medio', impacto: 'alto', mitigacion: 'Si no hay asociación, el aval lo dan vecinos del barrio en una reunión abierta en el punto físico, con el dinamizador. Avalar es poco trabajo (una ficha y una visita) y la asociación gana voz en el fondo de su barrio.' },
  { riesgo: 'Ecotasa para residentes (opción estudiada): no sabemos si una tasa puede distinguir entre residentes y visitantes, quién la aprueba ni si puede ir a un fondo de barrio.', tipo: 'legal', probabilidad: 'medio', impacto: 'medio', porVerificar: true, mitigacion: 'No entra en el plan base. Solo en piloto y después de un informe jurídico.' },
  { riesgo: 'Valoraciones falsas o compradas.', tipo: 'técnico', probabilidad: 'bajo', impacto: 'medio', mitigacion: 'Valoran todas las personas que asistieron, vecinos y visitantes, y solo ellas (reserva o registro de asistencia); el aval lo dan la asociación o los vecinos del barrio.' },
]

/** Opciones estudiadas que no forman parte del plan base. */
export type Opcion = { titulo: string; origen: string; queEs: string; pros: string[]; contras: string[]; recomendacion: 'sí' | 'no' | 'en piloto'; porque: string; riesgoLegal: string }
export const OPCIONES: Opcion[] = [
  {
    titulo: 'Ecotasa mínima para residentes',
    origen: 'Idea de Turismo de Tenerife al presentar el reto: en Masca el turista paga 28 € y el residente podría pagar algo simbólico, quizá 5 €.',
    queEs: 'Que el residente también pague una cantidad pequeña en los espacios naturales donde ya se cobra al visitante, para que el cuidado sea compartido.',
    pros: [
      'Corresponsabilidad real: todos aportan al espacio que disfrutan.',
      'El visitante ve que no se le cobra solo a él.',
      'Ayuda a ordenar el acceso a espacios saturados.',
    ],
    contras: [
      'Puede sentirse como pagar por entrar en tu propia isla, lo contrario del orgullo que buscamos.',
      'Pesa más en quien menos tiene.',
      'Con 5 € por persona, cobrar y controlar puede costar casi lo que se recauda.',
    ],
    recomendacion: 'en piloto',
    porque: 'Solo en un espacio que ya cobra al visitante, desde el año 1 y con lo recaudado para el fondo del barrio cercano. Exentos quienes no puedan pagar y los participantes de «Tenerife es tuya»; también se puede pagar con horas de voluntariado. Si la encuesta muestra rechazo, se retira.',
    riesgoLegal: '¿Puede una tasa distinguir entre residentes y visitantes? ¿Quién la aprueba y puede lo recaudado ir a un fondo de barrio?',
  },
]

/** Lo que Tenique no resuelve y a quién corresponde. El detalle está en el diagnóstico (Investigación). */
export type Limite = { tema: string; partes: { quien: string; fuentes: number[] }[]; verificado: boolean }
export const LIMITES: Limite[] = [
  { tema: 'Vivienda (precio, alquiler, vivienda vacacional)', verificado: true, partes: [
    { quien: 'Gobierno de Canarias', fuentes: [74] },
    { quien: 'Ley 6/2025 de vivienda vacacional', fuentes: [71] },
    { quien: 'inspección de los ayuntamientos', fuentes: [11] },
  ] },
  { tema: 'Movilidad (atascos, transporte público, carreteras)', verificado: true, partes: [
    { quien: 'Cabildo de Tenerife y Gobierno de Canarias', fuentes: [72] },
    { quien: 'ayuntamientos', fuentes: [73] },
  ] },
  { tema: 'Saneamiento y vertidos', verificado: true, partes: [
    { quien: 'ayuntamientos (evacuación y tratamiento de aguas residuales)', fuentes: [73] },
    { quien: 'Gobierno de Canarias (censo y autorización de vertidos)', fuentes: [80] },
    { quien: 'Consejo Insular de Aguas de Tenerife (planificación hidrológica insular)', fuentes: [85] },
  ] },
]

/** Encaje con programas que ya funcionan: Tenique se apoya en ellos en lugar de empezar de cero. Son propuestas. */
export type Encaje = { programa: string; quien: string; queEs: string; comoEncaja: string; fuentes: number[] }
export const ENCAJE: Encaje[] = [
  {
    programa: '«Tenerife es tuya»',
    quien: 'Cabildo de Tenerife',
    queEs: 'Rutas y actividades gratuitas para residentes desde 2020, con unos 2.500 participantes. En 2025 se dirige a colectivos vulnerables, mayores y voluntariado.',
    comoEncaja: 'Propuesta: Tenique se apoya en sus participantes, sus rutas y su relación con los colectivos. En los meses 0–3, sus participantes son una vía para captar vecinos anfitriones, y sus rutas, experiencias que pueden abrirse también a visitantes.',
    fuentes: [84],
  },
]

// ─── DAFO ────────────────────────────────────────────────────────────────────

/** DAFO de Tenique. Resume lo que ya está en el plan; cada dato lleva su fuente. */
export type CuadranteDafo = 'debilidades' | 'amenazas' | 'fortalezas' | 'oportunidades'
export type PuntoDafo = { texto: string; fuentes?: number[]; supuesto?: boolean; porVerificar?: boolean }
const FONDO_PILOTO = fondoAnual(ESCENARIOS[0].valores)
const eurDafo = (n: number) => `${Math.round(n).toLocaleString('es-ES')} €`
export const DAFO: { id: CuadranteDafo; titulo: string; lado: string; puntos: PuntoDafo[] }[] = [
  {
    id: 'debilidades', titulo: 'Debilidades', lado: 'Interno · en contra',
    puntos: [
      { texto: `El fondo es pequeño al principio: ${eurDafo(FONDO_PILOTO.total)} al año en el piloto.`, supuesto: true },
      { texto: 'Los vecinos no cobran en el piloto: dependemos de su tiempo y sus ganas.' },
      { texto: 'Hay barrios sin asociación activa que avale las experiencias.' },
      { texto: 'Las cifras del plan son supuestos hasta medir el piloto.' },
    ],
  },
  {
    id: 'amenazas', titulo: 'Amenazas', lado: 'Externo · en contra',
    puntos: [
      { texto: 'No sabemos aún si un vecino puede cobrar una experiencia (licencia, impuestos, seguro).', porVerificar: true },
      { texto: 'El malestar viene sobre todo de la vivienda y la movilidad, que Tenique no resuelve.', fuentes: [74, 71, 72, 73] },
      { texto: 'Barrios ya cansados de visitantes pueden rechazar más actividad.' },
      { texto: 'Que se vea el fondo como dinero solo de la administración.' },
    ],
  },
  {
    id: 'fortalezas', titulo: 'Fortalezas', lado: 'Interno · a favor',
    puntos: [
      { texto: 'Triple validación de cada experiencia: Garantía Turismo de Tenerife, aval del barrio y valoración de quien la vivió.' },
      { texto: `El fondo lo paga sobre todo quien vive del turismo: ${100 - FONDO_PILOTO.pctPublico} % privado en el piloto.`, supuesto: true },
      { texto: 'Experiencias reales entre vecinos y visitantes, nunca inventadas.' },
      { texto: 'Base que ya funciona: «Tenerife es tuya», con unos 2.500 participantes desde 2020, y REGENERATe.', fuentes: [84, 86] },
    ],
  },
  {
    id: 'oportunidades', titulo: 'Oportunidades', lado: 'Externo · a favor',
    puntos: [
      { texto: 'La marca «Tenerife! despierta emociones» ya habla de emociones, como la búsqueda de Tenique.', fuentes: [75] },
      { texto: 'El ISTAC ya pregunta a los residentes qué piensan del turismo y publica sus datos en abierto.', fuentes: [49, 47] },
      { texto: 'Turismo de Tenerife propuso al presentar el reto un fondo con aportación de las empresas.' },
    ],
  },
]

// ─── cálculo del simulador de costes ─────────────────────────────────────────

export const importe = (c: Pick<Coste, 'cantidad' | 'precio'>) => c.cantidad * c.precio

export function totales(costes: Pick<Coste, 'tipo' | 'cantidad' | 'precio'>[], meses: number, colchonPct: number) {
  const implantacion = costes.filter((c) => c.tipo === 'implantacion').reduce((a, c) => a + importe(c), 0)
  const mensual = costes.filter((c) => c.tipo === 'mensual').reduce((a, c) => a + importe(c), 0)
  const base = implantacion + mensual * meses
  const colchon = base * (colchonPct / 100)
  return { implantacion, mensual, piloto: base + colchon, colchon }
}

export const CATEGORIA_TXT: Record<Categoria, string> = {
  personas: 'Personas',
  herramientas: 'Herramientas',
  infraestructura: 'Infraestructura',
  mantenimiento: 'Mantenimiento y seguros',
}

// ─── calendario interactivo (Gantt de 0 a 60 meses) ─────────────────────────
// Los meses concretos de cada hito son supuestos de planificación.
// El carril «Comunicación» se rellena solo si existe src/data/comunicacion.ts con `HITOS_CALENDARIO` (ver la página).

export type CarrilId = 'prep' | 'piloto' | 'expansion' | 'fondo' | 'comunicacion' | 'evaluacion'
export const CARRILES: { id: CarrilId; nombre: string }[] = [
  { id: 'prep', nombre: 'Preparación y convenio' },
  { id: 'piloto', nombre: 'Piloto' },
  { id: 'expansion', nombre: 'Expansión' },
  { id: 'fondo', nombre: 'Fondo del barrio' },
  { id: 'comunicacion', nombre: 'Comunicación' },
  { id: 'evaluacion', nombre: 'Evaluación externa' },
]

export type ItemCalendario = {
  id: string
  carril: CarrilId
  /** Mes de inicio; si falta `hasta`, es un hito. */
  desde: number
  hasta?: number
  titulo: string
  /** Texto corto para la barra cuando el título no cabe. */
  corto?: string
  que: string
  lidera: string
  conQuien?: string
  agentes: AgenteId[]
  umbral?: string
  decision?: boolean
  fuentes?: number[]
}

const UMBRAL_PILOTO =
  'Seguimos si se cumplen las metas: 30 o más anfitriones activos, 300 o más reservas al mes, 25 % o más de las plazas para residentes, 85 % o más del gasto en el municipio, 20 % o más de la actividad en puntos físicos, +10 puntos porcentuales de percepción en la encuesta y 15 empresas adheridas. Paramos o cambiamos si hay menos de 10 anfitriones activos, menos de 75 reservas al mes, menos del 60 % del gasto en el municipio o la percepción sube 0 puntos porcentuales o baja (supuestos).'

export const CALENDARIO: ItemCalendario[] = [
  // preparación
  { id: 'prep', carril: 'prep', desde: 0, hasta: 3, titulo: 'Preparar', que: 'Dejar listo lo legal, elegir los 3 municipios y abrir un punto físico en cada uno.', lidera: 'Cabildo y Turismo de Tenerife', conQuien: 'Ayuntamientos', agentes: ['cabildo', 'tdt', 'ayto'] },
  { id: 'convenio', carril: 'prep', desde: 1, titulo: 'Convenio Cabildo–Turismo de Tenerife', que: 'El Cabildo crea y gestiona el fondo; Turismo de Tenerife coordina el programa.', lidera: 'Cabildo y Turismo de Tenerife', agentes: ['cabildo', 'tdt'] },
  { id: 'juridico', carril: 'prep', desde: 2, titulo: 'Informe jurídico', que: 'Figura del fondo, fiscalidad de anfitriones, seguros y protección de datos.', lidera: 'Asesoría jurídica del Cabildo', agentes: ['cabildo'] },
  { id: 'municipios', carril: 'prep', desde: 3, titulo: 'Acuerdo con 3 ayuntamientos', que: 'Uno turístico, uno rural y uno metropolitano. Cada uno cede un punto físico.', lidera: 'Cabildo', conQuien: 'Ayuntamientos', agentes: ['cabildo', 'ayto'] },
  { id: 'anfitriones', corto: 'Captación', carril: 'prep', desde: 1, hasta: 4, titulo: 'Captar y formar anfitriones', que: 'Vecinos, asociaciones, comercio y productores locales y empresas. Formación en las tres piedras de validación. Propuesta: invitar a los participantes de «Tenerife es tuya».', lidera: 'Dinamizadores de barrio (los contrata el Cabildo con los ayuntamientos)', conQuien: 'Asociaciones vecinales, comercio y productores, empresas', agentes: ['cabildo', 'ayto', 'local', 'comercio', 'empresas'], fuentes: [84] },
  // piloto
  { id: 'piloto', corto: 'Piloto', carril: 'piloto', desde: 4, hasta: 9, titulo: 'Piloto en 3 municipios', que: 'Experiencias reales entre vecinos y visitantes durante 6 meses. Los vecinos no cobran: gratis o con donación al fondo.', lidera: 'Turismo de Tenerife (coordina) y Cabildo (fondo)', conQuien: 'Ayuntamientos, asociaciones, comercio y productores, empresas, vivienda vacacional, turistas', agentes: ['tdt', 'cabildo', 'ayto', 'local', 'comercio', 'empresas', 'vv', 'turistas'], umbral: UMBRAL_PILOTO },
  { id: 'tres-piedras', carril: 'piloto', desde: 4, titulo: 'Primeras experiencias con las tres piedras', que: '«Garantía Turismo de Tenerife», «Avalada por el barrio» y «Valorada por quien la vivió» (todas las personas que asistieron).', lidera: 'Turismo de Tenerife', conQuien: 'Dinamizador y asociaciones vecinales (aval)', agentes: ['tdt', 'local', 'comercio'] },
  { id: 'decision-9', carril: 'piloto', desde: 9, titulo: 'Mes 9: seguir, ajustar o parar', que: 'Se comparan los resultados con los umbrales del piloto y se decide.', lidera: 'Cabildo y Turismo de Tenerife', conQuien: 'Ayuntamientos; datos de la evaluación externa', agentes: ['cabildo', 'tdt', 'ayto', 'evaluador'], umbral: UMBRAL_PILOTO, decision: true },
  // expansión
  { id: 'diez', carril: 'expansion', desde: 10, hasta: 24, titulo: 'Unos 10 municipios', que: 'Nuevos municipios por comarcas, con zonas rurales en cada tanda, cada uno con su punto físico.', lidera: 'Cabildo', conQuien: 'Ayuntamientos y Turismo de Tenerife', agentes: ['cabildo', 'ayto', 'tdt'] },
  { id: 'cobro', carril: 'expansion', desde: 12, titulo: 'Vecinos anfitriones pueden cobrar', que: 'Solo si el informe jurídico deja clara la figura (alta, impuestos, seguro).', lidera: 'Cabildo', agentes: ['cabildo', 'local'], umbral: 'Condición: informe jurídico favorable.' },
  { id: 'isla', carril: 'expansion', desde: 24, hasta: 36, titulo: 'Toda la isla', que: 'Todos los municipios de Tenerife dentro.', lidera: 'Cabildo', conQuien: 'Ayuntamientos y Turismo de Tenerife', agentes: ['cabildo', 'ayto', 'tdt'] },
  { id: 'costumbre', carril: 'expansion', desde: 36, hasta: 60, titulo: 'Hacerlo costumbre', que: 'Tenique dentro de la estrategia turística insular: parte de cómo se vive y se visita Tenerife.', lidera: 'Cabildo y Turismo de Tenerife', agentes: ['cabildo', 'tdt'] },
  // fondo
  { id: 'aportacion', corto: 'Acuerdo', carril: 'fondo', desde: 1, hasta: 4, titulo: 'Acuerdo de aportación', que: 'Aportación fija de empresas turísticas y de vivienda vacacional, más el 10 % de cada reserva (supuestos).', lidera: 'Cabildo', conQuien: 'Patronales y asociaciones de vivienda vacacional; Turismo de Tenerife las invita', agentes: ['cabildo', 'empresas', 'vv', 'tdt'] },
  { id: 'fondo-piloto', carril: 'fondo', desde: 4, hasta: 10, titulo: 'Fondo en el piloto', que: 'Primeras aportaciones y primera votación de los vecinos. El dinero privado es la mayor parte.', lidera: 'Cabildo (cuenta por municipio)', conQuien: 'Vecinos, ayuntamientos, empresas, vivienda vacacional', agentes: ['cabildo', 'local', 'ayto', 'empresas', 'vv', 'comercio', 'turistas'], umbral: 'Seguimos con 15 empresas y 200 viviendas vacacionales adheridas y más del 50 % del fondo privado. Paramos con menos de 5 empresas adheridas o si más del 50 % del fondo lo pone el Cabildo (supuestos).' },
  { id: 'votacion', carril: 'fondo', desde: 7, titulo: 'Primera votación del fondo', que: 'Los vecinos votan en qué se gasta, en la app o en papel en el punto físico.', lidera: 'Ayuntamientos', conQuien: 'Vecinos y asociaciones', agentes: ['ayto', 'local'] },
  { id: 'primer-proyecto', carril: 'fondo', desde: 9, titulo: 'Primer proyecto en la calle', que: 'Señalizado con un cartel: «esto lo ha pagado Tenique».', lidera: 'Ayuntamientos', conQuien: 'Turismo de Tenerife lo publica', agentes: ['ayto', 'tdt', 'local'] },
  { id: 'tramos', carril: 'fondo', desde: 10, hasta: 24, titulo: 'Aportación por tramos', que: 'La aportación de empresas y vivienda vacacional pasa a ser sistemática, recogida en el convenio.', lidera: 'Cabildo', conQuien: 'Patronales y vivienda vacacional', agentes: ['cabildo', 'empresas', 'vv'] },
  { id: 'informe', carril: 'fondo', desde: 15, titulo: 'Primer informe anual del fondo', que: 'En lenguaje cercano: cuánto entró, quién lo puso y en qué se gastó.', lidera: 'Cabildo (cuentas) y Turismo de Tenerife (publicación)', agentes: ['cabildo', 'tdt'] },
  { id: 'figura', carril: 'fondo', desde: 24, titulo: 'Decisión: figura estable del fondo', que: 'Con lo aprendido, se elige la figura jurídica definitiva.', lidera: 'Cabildo', agentes: ['cabildo'], decision: true },
  { id: 'consolidado', carril: 'fondo', desde: 24, hasta: 60, titulo: 'Fondo consolidado', que: 'Cuentas auditadas y presupuestos participativos cada año en cada barrio.', lidera: 'Cabildo', conQuien: 'Ayuntamientos y vecinos', agentes: ['cabildo', 'ayto', 'local'] },
  // evaluación
  { id: 'enc-antes', carril: 'evaluacion', desde: 3, titulo: 'Encuesta de partida (antes)', que: 'Percepción de los residentes antes del piloto, en papel y en línea.', lidera: 'ISTAC o universidad, por encargo del Cabildo', agentes: ['evaluador', 'cabildo'] },
  { id: 'enc-despues', carril: 'evaluacion', desde: 9, titulo: 'Encuesta de cierre (después)', que: 'Misma pregunta que al principio, para comparar.', lidera: 'ISTAC o universidad', agentes: ['evaluador'], umbral: 'Seguimos si la valoración positiva sube 10 puntos porcentuales o más; paramos si sube 0 puntos porcentuales o baja (supuesto).' },
  { id: 'retorno', carril: 'evaluacion', desde: 12, titulo: 'Primer informe del retorno del turismo', que: `${RETORNO_COMPROMISO.frase} El primero sale al cerrar el año 1 y después, uno cada año; también en papel en ayuntamientos y asociaciones.`, lidera: 'Cabildo e ISTAC (lo calculan); Turismo de Tenerife lo publica', conQuien: 'Ayuntamientos', agentes: ['cabildo', 'evaluador', 'tdt', 'ayto'] },
  { id: 'anual-24', carril: 'evaluacion', desde: 24, titulo: 'Medición anual de percepción', que: 'Comparable año a año.', lidera: 'ISTAC o universidad', agentes: ['evaluador'] },
  { id: 'anual-36', carril: 'evaluacion', desde: 36, titulo: 'Medición anual de percepción', que: 'Comparable año a año.', lidera: 'ISTAC o universidad', agentes: ['evaluador'] },
  { id: 'impacto', corto: 'Impacto', carril: 'evaluacion', desde: 48, hasta: 60, titulo: 'Evaluación externa del impacto', que: 'Evaluación independiente y ajuste del modelo.', lidera: 'ISTAC, universidad o entidad independiente', conQuien: 'Cabildo y Turismo de Tenerife', agentes: ['evaluador', 'cabildo', 'tdt'] },
]
