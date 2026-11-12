// Plan de comunicación de Tenique y alternativas para quien no está digitalizado.
// Dueño: subagente de pitch. Lo pinta src/secciones/Comunicacion.tsx (dentro de la pestaña Tenique).
// Regla del reto: «no lanzar otra campaña de comunicación». La comunicación acompaña a acciones reales y
// cuenta lo que ya se ha hecho, con datos. Quién hace qué sale de src/data/responsabilidades.ts;
// los meses, de las etapas de src/data/viabilidad.ts (preparación 0–3, piloto 4–9, expansión 10–24).
// Nada de cifras inventadas: los objetivos sin fuente van como supuesto.

import type { AgenteId } from './responsabilidades'

export type Publico = {
  id: string
  nombre: string
  icono: string
  /** Una frase, tal como se le diría. */
  frase: string
  tono: string
  canales: string
}

export const PRINCIPIO = {
  titulo: 'No es otra campaña: contamos lo que ya se ha hecho',
  texto: 'Primero la acción, después el mensaje. Cada pieza enseña algo real: una experiencia que ya existe, un proyecto que ya está pagado, una cifra con su fuente.',
}

export const PUBLICOS: Publico[] = [
  {
    id: 'vecinos-jovenes',
    nombre: 'Vecinos jóvenes',
    icono: 'user',
    frase: 'Tu barrio decide en qué se gasta lo que deja el turismo. Vota y enséñalo.',
    tono: 'Directo y participativo. Piezas cortas, para el móvil.',
    canales: 'Redes de Turismo de Tenerife, app y centros ciudadanos',
  },
  {
    id: 'vecinos-mayores',
    nombre: 'Vecinos mayores',
    icono: 'home',
    frase: 'Lo que sabes de tu pueblo vale. Si quieres, enséñaselo a quien viene.',
    tono: 'Cercano y en persona. Letra grande y sin tecnicismos.',
    canales: 'Centros de mayores, radio local y folleto en papel',
  },
  {
    id: 'visitantes',
    nombre: 'Visitantes',
    icono: 'globe',
    frase: '«Tenerife! despierta emociones». Vívelas con quien vive aquí.',
    tono: 'El de la marca, pero honesto: invitado, no cliente. En español e inglés.',
    canales: 'App, alojamientos, oficinas de turismo y redes de Turismo de Tenerife',
  },
  {
    id: 'empresas',
    nombre: 'Sector turístico',
    icono: 'box',
    frase: 'Lo que aportas al fondo se ve en la calle, con tu sello de empresa corresponsable.',
    tono: 'Claro y con cifras: cuánto entra y en qué se gasta.',
    canales: 'Patronales e informe trimestral',
  },
  {
    id: 'anfitriones',
    nombre: 'Anfitriones',
    icono: 'heart',
    frase: 'Lo tuyo merece enseñarse. Te acompañamos para hacerlo.',
    tono: 'De tú a tú, con reconocimiento. Nunca como proveedor.',
    canales: 'Asociaciones vecinales, dinamizador de barrio y punto físico',
  },
  {
    id: 'administraciones',
    nombre: 'Administraciones',
    icono: 'check',
    frase: 'Un indicador de convivencia por municipio, medido por alguien de fuera.',
    tono: 'Institucional y con datos.',
    canales: 'Informe trimestral, evaluación externa y reuniones de seguimiento',
  },
]

export type Canal = { id: string; nombre: string; icono: string; que: string; quien: string }

export const CANALES: Canal[] = [
  { id: 'carteles', nombre: '«Esto lo ha pagado Tenique»', icono: 'check', que: 'Cartel en la calle en cada proyecto del fondo, con lo que costó.', quien: 'Turismo de Tenerife' },
  { id: 'informe', nombre: 'Informe trimestral', icono: 'calendar', que: 'Corto y sin jerga: qué ha entrado al fondo, en qué se ha gastado y qué viene.', quien: 'Turismo de Tenerife y Cabildo' },
  { id: 'medios', nombre: 'Prensa y radio locales', icono: 'play', que: 'Agenda de experiencias y cada proyecto terminado, contado por sus vecinos.', quien: 'Turismo de Tenerife, con los ayuntamientos' },
  { id: 'redes', nombre: 'Redes de Turismo de Tenerife', icono: 'globe', que: 'Experiencias reales y proyectos hechos, con su vocabulario: experiencias, emociones, producto local.', quien: 'Turismo de Tenerife' },
  { id: 'asociaciones', nombre: 'Asociaciones y centros de mayores', icono: 'heart', que: 'Presentaciones en persona y captación de anfitriones.', quien: 'Asociaciones vecinales, con el dinamizador de barrio' },
  { id: 'alojamientos', nombre: 'Puntos de información en alojamientos', icono: 'home', que: 'Qué es Tenique y las normas de convivencia del barrio, para cada huésped.', quien: 'Empresas turísticas y vivienda vacacional' },
]

/** Hitos comunicables, por mes del plan (0–24). Negocio los pinta en el calendario del plan de acción. */
export type Hito = { mes: number; nombre: string; que: string; tipo: 'lanzamiento' | 'hito' | 'informe' | 'decision' }

export const HITOS: Hito[] = [
  { mes: 2, nombre: 'Presentación a vecinos y asociaciones', que: 'En los 3 municipios del piloto, en persona, antes de anunciar nada fuera. Se buscan los primeros anfitriones.', tipo: 'hito' },
  { mes: 4, nombre: 'Lanzamiento del piloto', que: 'Cartel de barrio y acción en un mercado del agricultor, con las primeras experiencias ya publicadas.', tipo: 'lanzamiento' },
  { mes: 6, nombre: 'Primera votación del fondo', que: 'Los vecinos votan en qué se gasta, en la app o en papel en el punto físico. Se anuncia en el tablón, el folleto y la radio local.', tipo: 'hito' },
  { mes: 7, nombre: 'Primer informe trimestral', que: 'Qué ha entrado al fondo y qué se ha hecho, en lenguaje sencillo.', tipo: 'informe' },
  { mes: 9, nombre: 'Primer proyecto del fondo hecho', que: 'El que se votó en el mes 6. Cartel «esto lo ha pagado Tenique», nota a prensa y radio local, y vídeo con los vecinos que lo votaron. Llega antes de decidir si seguimos.', tipo: 'hito' },
  { mes: 9, nombre: 'Resultados del piloto', que: 'Encuesta de cierre y publicación de resultados: seguir, ajustar o parar. Se cuenta igual si sale mal.', tipo: 'decision' },
  { mes: 10, nombre: 'Llegada a nuevos municipios', que: 'Presentación en persona en cada municipio nuevo, con lo aprendido en el piloto.', tipo: 'lanzamiento' },
  { mes: 13, nombre: 'Informe trimestral', que: 'Fondo, proyectos y experiencias por municipio.', tipo: 'informe' },
  { mes: 16, nombre: 'Informe trimestral', que: 'Fondo, proyectos y experiencias por municipio.', tipo: 'informe' },
  { mes: 19, nombre: 'Informe trimestral', que: 'Fondo, proyectos y experiencias por municipio.', tipo: 'informe' },
  { mes: 22, nombre: 'Informe trimestral', que: 'Fondo, proyectos y experiencias por municipio.', tipo: 'informe' },
  { mes: 24, nombre: 'Balance de dos años', que: 'Encuesta externa y balance público, antes de decidir la figura estable del fondo.', tipo: 'decision' },
]

export type Pieza = { titulo: string; icono: string; texto: string; cuando: string }

export const CAMPANA = {
  lema: 'Tenerife se cocina entre todos',
  concepto: 'Un fogón en la calle: tres piedras (vecinos, visitantes y sector turístico) y Turismo de Tenerife, que lo enciende. No anuncia una promesa: enseña la primera experiencia y el primer proyecto reales, y a la gente que los ha hecho.',
  marca: '«Tenerife! despierta emociones» las despierta; Tenique las hace compartidas. Usa el vocabulario de la marca y le añade lo que sus campañas no cuentan: la convivencia y lo que el turismo deja en el barrio.',
  marcaFuentes: [75],
  piezas: [
    { titulo: 'Cartel de barrio', icono: 'home', texto: 'El lema y una sola cosa real: la experiencia de esta semana o el proyecto que acaba de pagar el fondo. En el punto físico, el comercio y el proyecto.', cuando: 'Desde el lanzamiento (mes 4)' },
    { titulo: 'Vídeo corto con un anfitrión real', icono: 'play', texto: 'Un vecino cuenta lo que enseña y por qué. Sin actores: si aún no hay anfitrión que quiera contarlo, no se graba.', cuando: 'Cuando haya un anfitrión real' },
    { titulo: 'Un fogón en el mercado del agricultor', icono: 'heart', texto: 'Vecinos y visitantes prueban producto local juntos y conocen Tenique en persona. Propuesta: Mercadillo del Agricultor de Tacoronte, si su organización acepta.', cuando: 'Lanzamiento del piloto (mes 4)' },
  ] as Pieza[],
}

export type SinConexion = { id: string; nombre: string; icono: string; que: string; aQuien: string; quien: string; propuesta?: boolean }

/** Para quien no está en redes ni usa el móvil. Quién lo gestiona, coherente con src/data/responsabilidades.ts. */
export const SIN_CONEXION: SinConexion[] = [
  { id: 'puntos', nombre: 'Puntos físicos', icono: 'map', que: 'Oficinas de turismo, centros ciudadanos y ayuntamientos: información, reservas y alta de anfitriones.', aQuien: 'Mayores, quien no usa el móvil y visitantes sin datos', quien: 'Ayuntamientos (punto cedido y dinamizador de barrio) y Turismo de Tenerife (oficinas de turismo)' },
  { id: 'folleto', nombre: 'Folleto mensual en papel', icono: 'print', que: 'Agenda de experiencias del mes y qué ha pagado el fondo en el municipio.', aQuien: 'Mayores y zonas rurales', quien: 'Turismo de Tenerife lo edita; se reparte en puntos físicos, centros de mayores y comercio local' },
  { id: 'tablon', nombre: 'Tablón por municipio', icono: 'calendar', que: 'Experiencias, votaciones abiertas y proyectos hechos, en el punto físico.', aQuien: 'Todo el municipio', quien: 'Ayuntamiento, con el dinamizador de barrio' },
  { id: 'telefono', nombre: 'Reserva por teléfono', icono: 'phone', que: 'Reservar o preguntar sin app, con una persona al otro lado.', aQuien: 'Quien no usa la app, también visitantes', quien: 'Punto físico y dinamizador de barrio', propuesta: true },
  { id: 'mediadores', nombre: 'Mediadores', icono: 'heart', que: 'Asociaciones vecinales y centros de mayores invitan en persona y acompañan a quien quiere ser anfitrión.', aQuien: 'Vecinos que no se enteran por otros canales', quien: 'Asociaciones vecinales, con el dinamizador de barrio (Cabildo y ayuntamientos)' },
  { id: 'voto', nombre: 'Voto del fondo en papel', icono: 'check', que: 'La votación de en qué se gasta el fondo del barrio, también en papel.', aQuien: 'Todos los vecinos', quien: 'Ayuntamiento, que organiza la votación en papel y en la app' },
  { id: 'radio', nombre: 'Radio y prensa local', icono: 'play', que: 'Agenda y proyectos hechos, contados por sus vecinos.', aQuien: 'Mayores y zonas rurales', quien: 'Turismo de Tenerife, con los medios locales' },
]

export type IndicadorCom = { nombre: string; comoSeMide: string; objetivo: string; supuesto: boolean }

export const INDICADORES: IndicadorCom[] = [
  { nombre: 'Vecinos que conocen Tenique', comoSeMide: 'Una pregunta en la encuesta externa a residentes (ISTAC o universidad), antes y después del piloto.', objetivo: 'Que suba entre la encuesta de partida y la de cierre. La cifra se fija con la encuesta de partida.', supuesto: true },
  { nombre: 'Proyectos del fondo comunicados', comoSeMide: 'Proyectos con cartel en la calle y en el informe trimestral, frente a proyectos hechos.', objetivo: 'Todos, como pide el plan de acción.', supuesto: false },
  { nombre: 'Participación sin conexión', comoSeMide: 'Reservas y votos hechos por teléfono, en papel o en el punto físico, frente al total. Registro del punto físico y recuento de la votación.', objetivo: 'Se fija tras el piloto; la señal de alarma es que baje al pasar a más municipios.', supuesto: true },
]

/**
 * Carril «Comunicación» del calendario del plan de acción (lo pinta Negocio). Meses 0–60.
 * Sin `hasta` = hito; con `hasta` = barra. Meses según la hoja de ruta de src/data/viabilidad.ts:
 * preparación 0–3, piloto 4–9, expansión 10–24, isla entera en el año 3 (25–36), estrategia insular en los años 4–5 (37–60).
 * Lidera, según src/data/responsabilidades.ts: Turismo de Tenerife promociona y publica; el Cabildo, el convenio y las cuentas.
 */
export const HITOS_CALENDARIO: { desde: number; hasta?: number; titulo: string; que?: string; lidera?: string; agentes?: AgenteId[] }[] = [
  { desde: 1, hasta: 3, titulo: 'Presentación en persona en los 3 municipios', que: 'Asociaciones vecinales y centros de mayores, antes de anunciar nada fuera. Se buscan los primeros anfitriones.', lidera: 'Turismo de Tenerife, con el dinamizador de barrio', agentes: ['tdt', 'ayto', 'local'] },
  { desde: 3, titulo: 'Anuncio del convenio y de las primeras aportaciones', que: 'Quién aporta al fondo y cómo se decidirá en qué se gasta.', lidera: 'Cabildo', agentes: ['cabildo', 'tdt', 'empresas', 'vv'] },
  { desde: 4, titulo: 'Lanzamiento del piloto', que: '«Tenerife se cocina entre todos»: cartel de barrio y un fogón en un mercado del agricultor, con las primeras experiencias ya publicadas.', lidera: 'Turismo de Tenerife', agentes: ['tdt', 'ayto', 'local', 'comercio'] },
  { desde: 4, hasta: 9, titulo: 'Folleto mensual, tablón y punto físico', que: 'Agenda de experiencias y votación del fondo también sin conexión.', lidera: 'Turismo de Tenerife (folleto) y ayuntamientos (tablón y votación en papel)', agentes: ['tdt', 'ayto'] },
  { desde: 6, titulo: 'Primera votación del fondo', que: 'Los vecinos votan en qué se gasta, en la app o en papel. Se anuncia en el tablón, el folleto y la radio local.', lidera: 'Ayuntamientos (organizan la votación); Turismo de Tenerife la difunde', agentes: ['ayto', 'local', 'tdt'] },
  { desde: 7, titulo: 'Primer informe trimestral', que: 'Qué ha entrado al fondo y qué se ha hecho, en lenguaje sencillo.', lidera: 'Turismo de Tenerife, con las cuentas del Cabildo', agentes: ['tdt', 'cabildo'] },
  { desde: 9, titulo: 'Primer proyecto del fondo hecho', que: 'El votado en el mes 6. Cartel «esto lo ha pagado Tenique», prensa y radio local, y los vecinos que lo votaron contándolo.', lidera: 'Turismo de Tenerife (lo publica); el ayuntamiento lo ejecuta', agentes: ['tdt', 'ayto', 'local'] },
  { desde: 9, titulo: 'Resultados del piloto', que: 'Encuesta de cierre y decisión pública: seguir, ajustar o parar. Se cuenta igual si sale mal.', lidera: 'Turismo de Tenerife con el Cabildo', agentes: ['tdt', 'cabildo', 'evaluador'] },
  { desde: 10, hasta: 24, titulo: 'Presentación en cada municipio nuevo e informe trimestral', que: 'Por tandas y comarcas. Cada proyecto pagado, con su cartel.', lidera: 'Turismo de Tenerife', agentes: ['tdt', 'ayto', 'local'] },
  { desde: 22, titulo: 'Primer informe anual del fondo', que: 'En lenguaje cercano y con datos abiertos.', lidera: 'Cabildo (cuentas) y Turismo de Tenerife (publicación)', agentes: ['cabildo', 'tdt'] },
  { desde: 24, titulo: 'Balance de dos años', que: 'Encuesta externa y balance público antes de decidir la figura estable del fondo.', lidera: 'Cabildo, con la evaluación externa', agentes: ['cabildo', 'evaluador', 'tdt'] },
  { desde: 25, hasta: 36, titulo: 'Comunicación en toda la isla', que: 'Tenique en todos los municipios: alojamientos, redes de Turismo de Tenerife y presupuestos participativos de cada barrio.', lidera: 'Turismo de Tenerife', agentes: ['tdt', 'ayto', 'empresas', 'vv'] },
  { desde: 37, hasta: 60, titulo: 'Informe anual dentro de la estrategia insular', que: 'Medición anual de la percepción de residentes, comparable año a año, publicada en lenguaje cercano.', lidera: 'Cabildo y Turismo de Tenerife', agentes: ['cabildo', 'tdt', 'evaluador'] },
]
