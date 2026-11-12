// «Más allá del piloto»: hacia dónde puede crecer Tenique. Son ideas, no compromisos.
// Sin cifras propias: los referentes son casos reales con su fuente en FUENTES (src/data/investigacion.ts).

export type Horizonte = 'siguiente' | 'ambicion' | 'sueno'

export const HORIZONTES: { id: Horizonte; titulo: string; cuando: string; texto: string }[] = [
  { id: 'siguiente', titulo: 'Siguiente paso', cuando: 'Años 2–3', texto: 'Crecer sobre lo que ya existe en la isla, si el piloto funciona.' },
  { id: 'ambicion', titulo: 'Ambición', cuando: 'Años 3–5', texto: 'Tenique como parte del servicio público insular.' },
  { id: 'sueno', titulo: 'Sueño', cuando: 'Más de 5 años', texto: 'Un modelo que otros destinos quieran copiar.' },
]

export type Idea = {
  id: string
  horizonte: Horizonte
  icono: string
  titulo: string
  que: string
  hariaFalta: string[]
  riesgo: string
  /** Caso real que inspira la idea, con sus fuentes. */
  referente?: { nombre: string; texto: string; fuentes: number[] }
}

export const IDEAS: Idea[] = [
  {
    id: 'ampliar-programas', horizonte: 'siguiente', icono: 'heart',
    titulo: 'Unir Tenique con «Tenerife es tuya» y REGENERATe',
    que: 'Los residentes que hoy redescubren la isla y los voluntarios que la regeneran pasan a ser anfitriones de experiencias compartidas con visitantes.',
    hariaFalta: ['Turismo de Tenerife: integrar los tres programas en un mismo calendario.', 'Asociaciones y guías que ya participan.'],
    riesgo: 'Que se diluya el foco de cada programa.',
    referente: { nombre: '«Tenerife es tuya» y REGENERATe', texto: 'Unos 2.500 participantes desde 2020; más de 40 actividades de voluntariado.', fuentes: [84, 86] },
  },
  {
    id: 'barometro', horizonte: 'siguiente', icono: 'search',
    titulo: 'Barómetro anual de convivencia',
    que: 'Medir cada año, por comarca, si mejora la convivencia y si la gente nota el retorno. Es el indicador de éxito de Tenique.',
    hariaFalta: ['ISTAC: mantener el módulo de turismo de su encuesta a residentes.', 'Turismo de Tenerife: preguntas propias sobre escucha y participación.'],
    riesgo: 'Que solo se publique cuando los datos salgan bien.',
    referente: { nombre: 'Encuesta de percepción de Barcelona', texto: 'Encuesta municipal anual a residentes sobre el turismo.', fuentes: [66, 49] },
  },
  {
    id: 'datos-abiertos', horizonte: 'siguiente', icono: 'globe',
    titulo: 'Datos abiertos del fondo y de su impacto',
    que: 'Publicar en tiempo real lo que entra en cada fondo de barrio, en qué se gasta y qué ha cambiado, en lenguaje cercano y por municipio.',
    hariaFalta: ['Cabildo: un portal de datos abiertos del fondo.', 'Ayuntamientos: informar de cada proyecto pagado.'],
    riesgo: 'Datos que nadie consulta si no se cuentan bien.',
    referente: { nombre: 'Tasa turística por barrios en Barcelona', texto: 'Proyectos de distrito pagados con la tasa, publicados uno a uno.', fuentes: [65] },
  },
  {
    id: 'guagua', horizonte: 'ambicion', icono: 'map',
    titulo: 'La guagua dentro de la experiencia',
    que: 'Que reservar una experiencia incluya el trayecto en transporte público, para no sumar coches en pueblos y espacios naturales.',
    hariaFalta: ['Cabildo y TITSA: un billete integrado con la reserva.', 'Experiencias en sitios con parada cercana.'],
    riesgo: 'Que el transporte no llegue a las zonas rurales a las horas necesarias.',
    referente: { nombre: 'València Tourist Card y CopenPay', texto: 'Tarjeta con transporte incluido (+56 % de uso en transporte) y premios por moverse en bici.', fuentes: [32, 64] },
  },
  {
    id: 'perfil-residente', horizonte: 'ambicion', icono: 'user',
    titulo: 'Un perfil de residente común',
    que: 'Un solo perfil para que el residente acceda gratis a ecotasas, reserve en Tenique y participe en programas del Cabildo.',
    hariaFalta: ['Cabildo: una identidad digital común entre servicios.', 'Cumplir la protección de datos desde el diseño.', 'Alternativa presencial para quien no usa el móvil.'],
    riesgo: 'Que deje fuera a quien no tiene medios digitales.',
    referente: { nombre: 'Ecotasas del Teide y de Masca', texto: 'Ya distinguen al residente en Tenerife, que entra gratis.', fuentes: [13, 59] },
  },
  {
    id: 'escuelas', horizonte: 'ambicion', icono: 'calendar',
    titulo: 'Programa escolar e intergeneracional',
    que: 'Alumnos y mayores preparan juntos experiencias sobre su barrio: la memoria la ponen los mayores y el idioma y la tecnología, los jóvenes.',
    hariaFalta: ['Gobierno de Canarias (Educación) y centros escolares.', 'Asociaciones de mayores y ayuntamientos.'],
    riesgo: 'Que dependa del empuje de un docente concreto.',
    referente: { nombre: '«Tenerife es tuya»', texto: 'Su edición de 2025 ya se dirige a personas mayores y colectivos.', fuentes: [84] },
  },
  {
    id: 'sello-empresas', horizonte: 'ambicion', icono: 'check',
    titulo: 'Sello «Tenique» para empresas',
    que: 'Reconocer a las empresas turísticas que aportan al fondo de barrio, compran a productores locales y ofrecen experiencias con vecinos.',
    hariaFalta: ['Turismo de Tenerife: criterios públicos y una auditoría sencilla.', 'Patronales del sector.'],
    riesgo: 'Que se convierta en un sello de marketing sin exigencia real.',
    referente: { nombre: 'Mālama Hawaiʻi', texto: 'Programa de la autoridad turística con 36 organizaciones adheridas en 2024.', fuentes: [40] },
  },
  {
    id: 'ia-emocion', horizonte: 'ambicion', icono: 'star',
    titulo: 'Recomendación por emoción con IA',
    que: 'Sugerir experiencias según cómo quiere sentirse cada persona, sin crear perfiles comerciales ni vender datos.',
    hariaFalta: ['Validar antes que buscar por emoción funciona (hipótesis H6).', 'Procesar los datos en la isla o anonimizados.'],
    riesgo: 'Que parezca vigilancia y reste confianza.',
    referente: { nombre: 'Marca «Tenerife! despierta emociones»', texto: 'La marca vigente de Turismo de Tenerife ya habla de emociones.', fuentes: [75] },
  },
  {
    id: 'ecotasa-residente', horizonte: 'ambicion', icono: 'alert',
    titulo: 'Más espacios con aforo y retorno al barrio',
    que: 'Si el piloto lo valida, aplicar el modelo de Masca a otros lugares saturados: gratis para residentes y con lo recaudado reinvertido allí mismo.',
    hariaFalta: ['Cabildo: estudios de capacidad de cada espacio.', 'Vecinos del entorno en la decisión.'],
    riesgo: 'Rechazo si se percibe como un peaje más.',
    referente: { nombre: 'Masca', texto: 'De más de 100.000 a unas 24.000 visitas al año; 652.000 € reinvertidos en el barranco.', fuentes: [59] },
  },
  {
    id: 'otras-islas', horizonte: 'sueno', icono: 'globe',
    titulo: 'Tenique en otras islas',
    que: 'Llevar el modelo a otras islas, adaptado a cada una, con los mismos tres apoyos: vecinos, visitantes e instituciones.',
    hariaFalta: ['Cabildos de cada isla.', 'Gobierno de Canarias como coordinador.'],
    riesgo: 'Copiar sin adaptar a islas con realidades distintas.',
    referente: { nombre: 'Red Greeters', texto: '181 destinos en 46 países comparten un mismo modelo de vecinos anfitriones.', fuentes: [62] },
  },
  {
    id: 'modelo-exportable', horizonte: 'sueno', icono: 'star',
    titulo: 'Un modelo para otros destinos',
    que: 'Que Tenerife sea referente internacional de convivencia entre vecinos y turistas, como hoy lo son Copenhague o las Feroe en sostenibilidad.',
    hariaFalta: ['Resultados medidos varios años seguidos.', 'Publicar la metodología en abierto.'],
    riesgo: 'Vender el modelo antes de haberlo demostrado.',
    referente: { nombre: 'Closed for Maintenance', texto: 'Feroe convirtió un programa local de voluntariado en referente internacional.', fuentes: [63] },
  },
]
