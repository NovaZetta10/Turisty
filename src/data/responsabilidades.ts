// Entregable 3 · Mapeo de responsabilidades. Dueño: subagente de usuarios.
// Es una PROPUESTA del equipo: ningún agente la ha aceptado todavía. Alineada con el plan de acción
// (src/data/viabilidad.ts). Si cambia el plan, revisa ACCIONES, FLUJOS y COMPETENCIAS.
// Reglas acordadas:
// - El fondo NO depende solo de la administración: empresas y vivienda vacacional pagan cuotas anuales; el 10 % de
//   cada reserva de pago y las donaciones también van al fondo. El Cabildo solo suma un 25 % por cada euro privado.
// - El fondo lo gestiona el CABILDO (una cuenta por municipio). Deciden los vecinos; el ayuntamiento comprueba y ejecuta.
// - Turismo de Tenerife promociona y gestiona el destino: coordina el programa, da la garantía, promociona y publica.
//   No gestiona dinero ni obras. Los dinamizadores los contrata el Cabildo con los ayuntamientos.
//   Las encuestas de percepción las hace el ISTAC o una universidad.
// - En el piloto los vecinos particulares NO cobran (gratis o con donación); cobran asociaciones, entidades y empresas.

export type Piedra = 'vecinos' | 'visitantes' | 'instituciones'

export type AgenteId = 'tdt' | 'cabildo' | 'ayto' | 'empresas' | 'vv' | 'local' | 'comercio' | 'turistas' | 'evaluador'

export type Agente = {
  id: AgenteId
  nombre: string
  /** Nombre corto para la cabecera de la matriz. */
  corto: string
  icono: string
  piedra: Piedra
  aporta: string[]
  recibe: string[]
  decide: string[]
  /** Con quién se coordina (ids de agente). */
  coordina: AgenteId[]
}

export const PIEDRAS: { id: Piedra; nombre: string; texto: string }[] = [
  { id: 'vecinos', nombre: 'Vecinos', texto: 'Ponen su tiempo y lo suyo, avalan las experiencias de su barrio y deciden en qué se gasta el fondo.' },
  { id: 'visitantes', nombre: 'Visitantes y sector turístico', texto: 'Los turistas y quienes viven de recibirlos: empresas asociadas de Turismo de Tenerife y vivienda vacacional. Van juntos porque el turismo les beneficia directamente: participan, difunden y pagan al fondo de forma sistemática.' },
  { id: 'instituciones', nombre: 'Instituciones', texto: 'Dan el marco: el Cabildo gestiona el fondo, Turismo de Tenerife coordina y garantiza, los ayuntamientos abren el punto físico y ejecutan, y una entidad independiente mide.' },
]

export const AGENTES: Agente[] = [
  {
    id: 'tdt', nombre: 'Turismo de Tenerife', corto: 'Turismo de Tenerife', icono: 'star', piedra: 'instituciones',
    aporta: ['Coordinación del programa y gestión de la app', '«Garantía Turismo de Tenerife»: comprueba cada experiencia', 'Promoción de Tenique entre visitantes y residentes', 'Publicación de cada proyecto pagado: cartel en la calle, app e informe trimestral'],
    recibe: ['Un producto turístico diferencial y de toda la isla', 'Datos de convivencia para su estrategia', 'Mejor imagen del destino entre residentes'],
    decide: ['Si cada experiencia cumple sus condiciones', 'Normas de calidad y seguridad del programa'],
    coordina: ['cabildo', 'ayto', 'empresas', 'local'],
  },
  {
    id: 'cabildo', nombre: 'Cabildo de Tenerife', corto: 'Cabildo', icono: 'globe', piedra: 'instituciones',
    aporta: ['Convenio que crea el programa y el fondo', 'Gestión del fondo, con una cuenta por municipio, y rendición de cuentas', 'Un 25 % más por cada euro privado que entra al fondo (nunca la mayor parte)', 'Dinamizadores de barrio, contratados con los ayuntamientos', 'Convenio de cuotas con patronales y asociaciones de vivienda vacacional', 'Figura jurídica, datos abiertos y expansión a nuevos municipios'],
    recibe: ['Una herramienta de corresponsabilidad medible', 'Retorno visible del turismo en los barrios', 'Indicadores de convivencia por municipio'],
    decide: ['Figura jurídica y reglas del fondo', 'Ritmo de entrada de municipios'],
    coordina: ['tdt', 'ayto', 'empresas', 'evaluador'],
  },
  {
    id: 'ayto', nombre: 'Ayuntamientos', corto: 'Ayuntamientos', icono: 'home', piedra: 'instituciones',
    aporta: ['Punto físico cedido, para quien no usa el móvil y como base del dinamizador', 'Dinamizador de barrio, contratado con el Cabildo', 'Organización de la votación del fondo, en papel y en la app', 'Comprobación de que cada proyecto votado se puede hacer', 'Ejecución de los proyectos votados'],
    recibe: ['Proyectos de barrio pagados por el fondo', 'Vecinos implicados en el turismo de su municipio'],
    decide: ['Si un proyecto votado se puede hacer', 'Dónde va el punto físico'],
    coordina: ['cabildo', 'tdt', 'local'],
  },
  {
    id: 'empresas', nombre: 'Empresas asociadas de Turismo de Tenerife y patronales', corto: 'Empresas asociadas', icono: 'box', piedra: 'visitantes',
    aporta: ['Cuota anual al fondo, por tramos según su tamaño (fijada en el convenio con el Cabildo)', 'Experiencias propias con gente local (pueden cobrarlas)', 'Difusión de Tenique entre sus clientes'],
    recibe: ['Sello de empresa corresponsable', 'Clientes más satisfechos y que repiten', 'Mejor relación con los barrios donde operan'],
    decide: ['Qué experiencias propone', 'Cómo lo cuenta a sus clientes'],
    coordina: ['tdt', 'cabildo', 'comercio'],
  },
  {
    id: 'vv', nombre: 'Propietarios de vivienda vacacional', corto: 'Vivienda vacacional', icono: 'user', piedra: 'visitantes',
    aporta: ['Cuota anual por vivienda adherida (supuesto del piloto: 50 € por vivienda y año), fijada en el convenio del Cabildo con las asociaciones de vivienda vacacional', 'Información de Tenique y de las normas de convivencia del barrio a cada huésped', 'Contacto con anfitriones vecinos'],
    recibe: ['Sello de alojamiento corresponsable', 'Mejor relación con la comunidad de vecinos', 'Huéspedes con mejor experiencia'],
    decide: ['Qué cuota acuerda su asociación en el convenio', 'Qué recomienda a sus huéspedes'],
    coordina: ['tdt', 'local', 'ayto'],
  },
  {
    id: 'local', nombre: 'Vecinos y asociaciones vecinales', corto: 'Vecinos y asociaciones', icono: 'heart', piedra: 'vecinos',
    aporta: ['Tiempo, como anfitrión (en el piloto, gratis o con donación) o como voluntario', '«Avalada por el barrio»: el aval de la asociación vecinal o de los vecinos, que pueden retirarlo', 'Voto en los presupuestos participativos del fondo', 'Precio de residente, simbólico, en las experiencias de pago; o tiempo, si no puede pagar', 'Valoración de las experiencias a las que asiste'],
    recibe: ['Fondo del barrio con uso visible, que deciden ellos', 'Voz y reconocimiento', 'Ingreso para las asociaciones desde el piloto; para vecinos particulares, en la expansión si el informe jurídico lo permite'],
    decide: ['En qué se gasta el fondo de su barrio', 'Qué experiencias avalan y cuándo retiran el aval', 'Si participa, como anfitrión, voluntario o asistente'],
    coordina: ['ayto', 'tdt', 'comercio', 'vv'],
  },
  {
    id: 'comercio', nombre: 'Comercio y productores locales', corto: 'Comercio y productores', icono: 'map', piedra: 'vecinos',
    aporta: ['Experiencias en su negocio, su finca o su taller', 'Producto local en las experiencias de otros anfitriones'],
    recibe: ['Gasto turístico que llega a su negocio', 'Visibilidad en la app y en los puntos físicos'],
    decide: ['Qué ofrece y en qué condiciones'],
    coordina: ['local', 'empresas', 'tdt'],
  },
  {
    id: 'turistas', nombre: 'Turistas', corto: 'Turistas', icono: 'search', piedra: 'visitantes',
    aporta: ['El 10 % de cada reserva de pago, que va al fondo', 'Donaciones en las experiencias gratuitas, que van enteras al fondo', 'Su compromiso con el código de convivencia del barrio, que acepta antes de reservar', 'Cuidado compartido: jornadas de voluntariado con vecinos en playas, senderos y plazas', 'Valoración de las experiencias a las que asiste'],
    recibe: ['Experiencias auténticas con gente de la isla', 'Saber qué ha dejado su viaje en el barrio'],
    decide: ['Qué experiencia elige', 'Si se suma a una jornada de cuidado compartido'],
    coordina: ['local', 'empresas', 'vv'],
  },
  {
    id: 'evaluador', nombre: 'ISTAC o universidad', corto: 'ISTAC o universidad', icono: 'check', piedra: 'instituciones',
    aporta: ['Encuestas de percepción de la convivencia', 'Evaluación externa del programa', 'Método de medición que no depende de quien gestiona'],
    recibe: ['Datos del programa para investigar'],
    decide: ['Su método y sus conclusiones'],
    coordina: ['cabildo', 'tdt'],
  },
]

/** R: lo hace · A: rinde cuentas (uno por fila) · C: se le consulta · I: se le informa. */
export type Raci = 'R' | 'A' | 'C' | 'I' | 'A/R'

export const RACI_TXT: Record<Raci, string> = { R: 'Lo hace', A: 'Rinde cuentas', 'A/R': 'Lo hace y rinde cuentas', C: 'Se le consulta', I: 'Se le informa' }

/** Etapas de la hoja de ruta del plan de acción. */
export const ETAPAS = ['Preparar · meses 0–3', 'Piloto en 3 municipios · meses 4–9', 'Unos 10 municipios · meses 10–24', 'Toda la isla · año 3', 'Estrategia insular · años 4–5'] as const
export type Etapa = (typeof ETAPAS)[number]

export type Accion = { accion: string; desde: Etapa; papeles: Partial<Record<AgenteId, Raci>> }

/** Matriz agente × acción. Mismo orden que el plan de acción. `desde`: etapa en la que empieza. */
export const ACCIONES: Accion[] = [
  { accion: 'Firmar el convenio que crea el programa y el fondo', desde: ETAPAS[0], papeles: { cabildo: 'A/R', tdt: 'C', ayto: 'C', empresas: 'C', local: 'I' } },
  { accion: 'Fijar las cuotas de empresas y de vivienda vacacional (convenio)', desde: ETAPAS[0], papeles: { cabildo: 'A', empresas: 'R', vv: 'R', tdt: 'C', ayto: 'I' } },
  { accion: 'Elegir los municipios del piloto', desde: ETAPAS[0], papeles: { cabildo: 'A', ayto: 'R', tdt: 'C', local: 'C' } },
  { accion: 'Contratar a los dinamizadores de barrio', desde: ETAPAS[0], papeles: { cabildo: 'A/R', ayto: 'R', tdt: 'I' } },
  { accion: 'Captar y formar anfitriones (dinamizador de barrio)', desde: ETAPAS[0], papeles: { cabildo: 'A', ayto: 'R', tdt: 'C', local: 'C', comercio: 'C' } },
  { accion: 'Validar experiencias (triple validación: garantía, aval del barrio y valoración de quien asistió)', desde: ETAPAS[1], papeles: { tdt: 'A/R', local: 'R', turistas: 'R', ayto: 'I' } },
  { accion: 'Ofrecer experiencias (vecinos particulares: gratis o con donación en el piloto)', desde: ETAPAS[1], papeles: { local: 'R', comercio: 'R', empresas: 'R', tdt: 'A' } },
  { accion: 'Abrir y atender los puntos físicos', desde: ETAPAS[1], papeles: { ayto: 'A/R', tdt: 'C', local: 'I' } },
  { accion: 'Promocionar Tenique entre visitantes y residentes', desde: ETAPAS[1], papeles: { tdt: 'A/R', empresas: 'R', vv: 'R', ayto: 'C', turistas: 'I', local: 'I' } },
  { accion: 'Escribir el código de convivencia de cada barrio', desde: ETAPAS[0], papeles: { local: 'R', tdt: 'A', ayto: 'C', vv: 'I', empresas: 'I' } },
  { accion: 'Aceptar el código de convivencia antes de reservar', desde: ETAPAS[1], papeles: { turistas: 'R', tdt: 'A', vv: 'R', empresas: 'I' } },
  { accion: 'Organizar jornadas de cuidado compartido (playas, senderos, plazas)', desde: ETAPAS[1], papeles: { ayto: 'A', local: 'R', turistas: 'R', tdt: 'C', empresas: 'C' } },
  { accion: 'Reservar y participar (residentes a precio simbólico o con tiempo)', desde: ETAPAS[1], papeles: { turistas: 'R', local: 'R', tdt: 'A' } },
  { accion: 'Pagar las cuotas anuales al fondo', desde: ETAPAS[1], papeles: { empresas: 'R', vv: 'R', cabildo: 'A', local: 'I' } },
  { accion: 'Aportar el 10 % de cada reserva y las donaciones', desde: ETAPAS[1], papeles: { turistas: 'R', local: 'R', cabildo: 'A' } },
  { accion: 'Sumar un 25 % por cada euro privado', desde: ETAPAS[1], papeles: { cabildo: 'A/R' } },
  { accion: 'Gestionar el fondo (una cuenta por municipio)', desde: ETAPAS[1], papeles: { cabildo: 'A/R', ayto: 'I', tdt: 'I' } },
  { accion: 'Organizar la votación del fondo (app y papel)', desde: ETAPAS[1], papeles: { ayto: 'A/R', cabildo: 'C', local: 'I' } },
  { accion: 'Decidir en qué se gasta el fondo (presupuestos participativos)', desde: ETAPAS[1], papeles: { local: 'A/R', ayto: 'C', cabildo: 'I', empresas: 'I', vv: 'I', turistas: 'I' } },
  { accion: 'Comprobar que el proyecto se puede hacer y ejecutarlo', desde: ETAPAS[1], papeles: { ayto: 'A/R', cabildo: 'I', local: 'I' } },
  { accion: 'Publicar cada proyecto: cartel, app e informe trimestral', desde: ETAPAS[1], papeles: { tdt: 'A/R', cabildo: 'C', ayto: 'C', local: 'I', turistas: 'I', empresas: 'I', vv: 'I' } },
  { accion: 'Medir la convivencia (encuestas de percepción)', desde: ETAPAS[1], papeles: { evaluador: 'R', cabildo: 'A', tdt: 'C', local: 'C', ayto: 'C' } },
  { accion: 'Publicar los datos del programa como datos abiertos', desde: ETAPAS[2], papeles: { cabildo: 'A/R', tdt: 'C' } },
  { accion: 'Abrir el cobro a vecinos anfitriones, si el informe jurídico lo permite', desde: ETAPAS[2], papeles: { cabildo: 'A/R', tdt: 'C', local: 'C' } },
  { accion: 'Ampliar a nuevos municipios', desde: ETAPAS[2], papeles: { cabildo: 'A/R', ayto: 'C', tdt: 'C', local: 'I' } },
  { accion: 'Evaluar el programa de forma independiente', desde: ETAPAS[2], papeles: { evaluador: 'R', cabildo: 'A', tdt: 'C', local: 'C' } },
]

/** Lo que circula entre agentes. Para la vista «cómo colaboran». */
export type Flujo = { de: string; a: string; que: string; tipo: 'dinero' | 'experiencia' | 'decision' | 'informacion' }

export const FLUJOS: Flujo[] = [
  { de: 'Empresas asociadas', a: 'Fondo del barrio', que: 'Cuota anual por tramos, fijada en el convenio', tipo: 'dinero' },
  { de: 'Vivienda vacacional', a: 'Fondo del barrio', que: 'Cuota anual por vivienda adherida (supuesto: 50 € al año), fijada en el convenio', tipo: 'dinero' },
  { de: 'Quien reserva', a: 'Fondo del barrio', que: 'El 10 % de cada reserva de pago y las donaciones de las experiencias gratuitas', tipo: 'dinero' },
  { de: 'Cabildo', a: 'Fondo del barrio', que: 'Un 25 % más por cada euro privado (nunca la mayor parte). Lo gestiona, con una cuenta por municipio', tipo: 'dinero' },
  { de: 'Turistas', a: 'Asociaciones, entidades y empresas', que: 'Pago por la experiencia (en el piloto, los vecinos particulares no cobran)', tipo: 'dinero' },
  { de: 'Turistas', a: 'Barrio', que: 'Respeto al código de convivencia y jornadas de cuidado compartido con vecinos', tipo: 'experiencia' },
  { de: 'Anfitriones y comercio', a: 'Turistas y vecinos', que: 'Experiencias reales compartidas', tipo: 'experiencia' },
  { de: 'Asociaciones vecinales', a: 'Turismo de Tenerife', que: 'Aval del barrio a cada experiencia (y su retirada)', tipo: 'decision' },
  { de: 'Quien asistió (vecinos y visitantes)', a: 'Turismo de Tenerife', que: 'Valoración de la experiencia', tipo: 'decision' },
  { de: 'Vecinos', a: 'Ayuntamiento', que: 'Voto del uso del fondo', tipo: 'decision' },
  { de: 'Ayuntamiento', a: 'Barrio', que: 'Proyecto pagado por el fondo, señalizado en la calle', tipo: 'experiencia' },
  { de: 'Turismo de Tenerife', a: 'Todos', que: 'Cada proyecto, en un cartel en la calle, en la app y en el informe trimestral', tipo: 'informacion' },
  { de: 'ISTAC o universidad', a: 'Todos', que: 'Encuesta de percepción de la convivencia', tipo: 'informacion' },
]

/** Triple validación: cada experiencia se sostiene sobre tres piedras. Decisión del equipo (Esther). */
export const VALIDACION: { sello: string; quien: string; que: string }[] = [
  { sello: 'Garantía Turismo de Tenerife', quien: 'Turismo de Tenerife', que: 'Comprueba que la experiencia cumple sus condiciones.' },
  { sello: 'Avalada por el barrio', quien: 'Asociación vecinal o vecinos', que: 'Avalan que es real y de aquí. Pueden retirar el aval.' },
  { sello: 'Valorada por quien la vivió', quien: 'Todas las personas que asistieron, vecinos y visitantes', que: 'Puntúan después de vivirla.' },
]

/**
 * Código de convivencia del barrio: lo acepta el visitante antes de reservar (Prototipo lo muestra en la app).
 * Base común; cada barrio lo adapta con su asociación vecinal. Propuesta del equipo, por validar con vecinos.
 */
export const CODIGO_CONVIVENCIA: { id: string; es: string; en: string }[] = [
  { id: 'descanso', es: 'Respeta el descanso: de noche, baja la voz en la calle y en las zonas de casas.', en: 'Respect people\'s rest: at night, keep your voice down in the street and near homes.' },
  { id: 'espacios', es: 'Las plazas, las playas y los senderos son de todos: úsalos y déjalos como los encontraste.', en: 'Squares, beaches and trails belong to everyone: enjoy them and leave them as you found them.' },
  { id: 'gente', es: 'Pregunta antes de fotografiar a personas, casas o fiestas.', en: 'Ask before taking photos of people, homes or local festivities.' },
  { id: 'entorno', es: 'No salgas de los senderos, no te lleves piedras ni plantas y llévate tu basura.', en: 'Stay on the trails, don\'t take stones or plants, and take your rubbish with you.' },
  { id: 'barrio', es: 'Compra en el comercio del barrio y trata a quien te recibe como anfitrión, no como servicio.', en: 'Shop locally and treat the people who welcome you as hosts, not as a service.' },
]

/** Cuidado compartido: además del código, se invita al visitante a cuidar el barrio con los vecinos. */
export const CUIDADO_COMPARTIDO = {
  es: 'Súmate a una jornada de cuidado compartido con vecinos: limpiar una playa, arreglar un sendero, cuidar una plaza.',
  en: 'Join a shared care day with locals: clean a beach, repair a trail, look after a square.',
}

export const FLUJO_TXT: Record<Flujo['tipo'], string> = { dinero: 'Dinero', experiencia: 'Experiencia', decision: 'Decisión', informacion: 'Información' }

/**
 * Causas que Tenique NO resuelve y quién tiene la competencia. Deben coincidir con el Diagnóstico.
 * Verificado por Investigación (BOE, BOC y prensa): vivienda 11, 71, 74; movilidad 72, 73; saneamiento 73, 80, 81, 85.
 */
export type Competencia = { tema: string; quien: string; que: string; tenique: string; fuentes: number[]; verificado: boolean }

export const COMPETENCIAS: Competencia[] = [
  {
    tema: 'Vivienda',
    quien: 'Gobierno de Canarias y ayuntamientos',
    que: 'Gobierno de Canarias: competencia exclusiva en vivienda (Estatuto, art. 143) y ley de vivienda vacacional (Ley 6/2025). Ayuntamientos: su planeamiento decide si se admite el uso turístico de viviendas, y hacen la inspección.',
    tenique: 'No la resuelve. Aporta datos de convivencia por barrio y la voz de los vecinos a quien decide. El fondo no sustituye la política de vivienda.',
    fuentes: [74, 71, 11],
    verificado: true,
  },
  {
    tema: 'Movilidad',
    quien: 'Cabildo de Tenerife, ayuntamientos y Gobierno de Canarias',
    que: 'Cabildo: carreteras que no son autonómicas y transporte por carretera (Ley 8/2015, art. 6.2 c y d). Gobierno de Canarias: carreteras de interés autonómico. Ayuntamientos: tráfico, aparcamiento y transporte urbano (Ley 7/1985, art. 25.2 g).',
    tenique: 'No la resuelve. Propone llegar a las experiencias en transporte público cuando se pueda y señala a quien decide dónde aprieta la movilidad.',
    fuentes: [72, 73],
    verificado: true,
  },
  {
    tema: 'Saneamiento y vertidos',
    quien: 'Ayuntamientos, Gobierno de Canarias y Consejo Insular de Aguas de Tenerife',
    que: 'Ayuntamientos: evacuación y tratamiento de aguas residuales (Ley 7/1985, art. 25.2 c). Gobierno de Canarias: censo y autorización de vertidos. Consejo Insular de Aguas de Tenerife: planificación hidrológica insular (Ley 12/1990 de Aguas de Canarias, arts. 9.1 y 40.1). En 2026 Sanidad recomendó once cierres de baño en Tenerife, tres de ellos en Playa Jardín.',
    tenique: 'No lo resuelve. Traslada a quien decide lo que cuentan vecinos y visitantes. El fondo no paga obras de saneamiento, que corresponden a estas administraciones.',
    fuentes: [73, 80, 85, 81],
    verificado: true,
  },
]
