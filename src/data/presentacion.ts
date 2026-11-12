// Presentación · pitch de Tenique (reto 1 de Turismo de Tenerife: convivencia entre turismo y población local).
// Orden (Esther, 12-11-2026): portada → pregunta osada → acción (demo) → sendero → «Os presentamos… Tenique» con las tres piedras
// → tres escenas de problema, cada una con su solución (vecino, visitante con los tres sellos, Turismo de Tenerife con sus datos)
// → fogón → qué pedimos al jurado → «Somos Nova».
// El QR a la demo se queda en una esquina desde la acción (lo pinta Presentacion.tsx).
// Guion y tiempos: docs/pitch-guion.md. Alternativas de pregunta: docs/pitch-preguntas-gancho.md.
// Reglas: Tenique es una iniciativa. Solo se promete lo que el prototipo hace hoy. Sin marcas ni empresas reales en las escenas.
// Las quejas de las escenas son voces de personaje, no datos. Sin fechas ni meses del plan.
// Cifras: solo las verificadas de src/data/investigacion.ts, con su fuente en el pie.

export type Destino = 'plan' | 'futuro' | 'gestion'

export type Slide =
  /** Empresa, reto, equipo y quién presenta (salen de RETO, EQUIPO_NOMBRE y EQUIPO en la configuración). */
  | { tipo: 'portada' }
  /** La pregunta osada (patrón «¿Y si os dijéramos…?»). El remate es opcional y corto. */
  | { tipo: 'pregunta'; antes: string; destacado: string; despues?: string; remate?: string }
  /** Punto de acción: QR a la demo. 'app' abre la portada de perfiles (#/app); 'prototipo', la pestaña Tenique. */
  | { tipo: 'accion'; kicker: string; titulo: string; texto: string; destino: 'app' | 'prototipo' | 'web' }
  /** Sendero en zigzag con una parada por piedra: la fricción, cómo se resuelve y el botón que se pulsa en la app. */
  | { tipo: 'sendero'; kicker: string; titulo: string; paradas: { quien: string; boton: string; friccion: string; solucion: string }[] }
  /** Revelación del nombre, con su definición y fuente, y las tres piedras. */
  | { tipo: 'revelacion'; antes: string; nombre: string; definicion: string; fuente: string; union: string; piedras: { nombre: string; texto: string }[]; fuego: string }
  /** Escena: la voz de un personaje (no es un dato). El pie es opcional y solo lleva datos verificados. */
  | { tipo: 'escena'; kicker: string; voz: string; quien: string; pie?: string; /** Ilustración animada de src/components/escenas/Escenas.tsx. */ imagen: 'vecino' | 'visitante' | 'gestion' }
  /** Solución a la escena anterior: vídeo de la app en un móvil (public/video/demo-*). Solo lo que el prototipo hace hoy. */
  | { tipo: 'solucion'; kicker: string; titulo: string; intro: string; puntos: string[]; nota?: string; video: 'vecino' | 'visitante' }
  /** Los tres sellos con un ejemplo real del catálogo (se resuelve en Presentacion.tsx con src/prototipo/experiencias.ts). */
  | { tipo: 'sellos'; kicker: string; titulo: string; experienciaId: string; sellos: { nombre: string; texto: string }[]; nota: string }
  /** Solución de gestión: demo grande (public/video/demo-gestion o captura) con burbujas numeradas que aparecen una tras otra. */
  | { tipo: 'gestion'; kicker: string; titulo: string; burbujas: string[]; nota?: string }
  /** Para qué sirven los datos: datos → propuesta → entidades. */
  | { tipo: 'datos'; kicker: string; titulo: string; datos: string[]; propuesta: string; entidades: string[]; frase: string }
  /** El fogón encendido: tres piedras sosteniendo el caldero y el mensaje clave. */
  | { tipo: 'fogon'; kicker: string; titulo: string; piedras: { nombre: string; texto: string }[]; mensaje?: string }
  /** Cierre: remate grande, equipo y preguntas. */
  | { tipo: 'final'; titulo: string; subtitulo: string }
  | { tipo: 'columnas'; kicker: string; titulo: string; lead?: string; columnas: { titulo: string; texto: string }[]; fuente?: string }
  | { tipo: 'pasos'; kicker: string; titulo: string; pasos: { titulo: string; texto: string }[] }
  | { tipo: 'cifras'; kicker: string; titulo: string; cifras: { valor: string; etiqueta: string }[]; fuente?: string }
  | { tipo: 'frase'; kicker: string; titulo: string; lead?: string }
  /** Lo que pedimos a quienes validan el reto: tres cosas concretas, cada una con su QR. */
  | { tipo: 'cta'; kicker: string; titulo: string; pedidos: { titulo: string; texto: string; destino: Destino }[] }

export const SLIDES: Slide[] = [
  { tipo: 'portada' },
  {
    // Esther (12-11-2026): tira hacia el orgullo, lo que quiere Turismo de Tenerife que se sienta al terminar.
    // «Orgullo» tiene 8 experiencias verificadas (porEmocion('orgullo')). Camino en la demo: #/app → «Vivo en Tenerife» → «Orgullo» → lista: 2 toques.
    tipo: 'pregunta',
    antes: '¿Y si os dijéramos que',
    destacado: 'en menos de 30 segundos',
    despues: 'podéis sentir orgullo de ser tinerfeños?',
  },
  {
    tipo: 'accion',
    kicker: 'Os lo demostramos',
    titulo: 'Sacad el móvil y escanead.',
    texto: 'Acompañadnos con uno de los perfiles del turismo de Tenerife.',
    destino: 'app',
  },
  {
    // Los botones son los textos exactos de la portada de #/app (Inicio en src/prototipo/pantallas.tsx).
    tipo: 'sendero',
    kicker: 'El sendero',
    titulo: 'Acompañadnos en este sendero: los puntos de fricción que hemos detectado y cómo los resolvemos.',
    paradas: [
      { quien: 'Vecino', boton: 'Vivo en Tenerife', friccion: 'No nota lo que deja el turismo en su barrio.', solucion: 'Lo de aquí, avalado por su barrio.' },
      { quien: 'Visitante', boton: 'Estoy de visita', friccion: 'No sabe cómo conocer a gente de aquí.', solucion: 'Elige lo que quiere sentir y lo vive con gente de aquí.' },
      { quien: 'Gestión', boton: 'Turismo de Tenerife', friccion: 'No ve dónde se queda lo que deja el turismo.', solucion: 'Un panel con garantías y fondo por municipio.' },
    ],
  },
  {
    // Fuente 48 de src/data/investigacion.ts. Definición literal de la Academia Canaria de la Lengua.
    tipo: 'revelacion',
    antes: 'Os presentamos…',
    nombre: 'Tenique',
    definicion: '«Cada una de las tres piedras con que se hace un hogar rústico, que sirven para sustentar un tostador, una olla o cualquier otro recipiente».',
    fuente: 'Academia Canaria de la Lengua, Diccionario básico de canarismos.',
    union: 'Una iniciativa que une las tres piedras que hacen funcionar Tenerife.',
    piedras: [
      { nombre: 'Vecinos', texto: 'Quien vive aquí, quiere saber cómo se mueve el turismo y cómo puede aportar.' },
      { nombre: 'Visitantes', texto: 'Quien viene de fuera y quiere sentirse parte de la comunidad.' },
      { nombre: 'Sector turístico', texto: 'Hostelería, gastronomía, comercio y anfitriones: las empresas asociadas a Turismo de Tenerife y quienes viven del turismo.' },
    ],
    fuego: 'Turismo de Tenerife no es una cuarta piedra: enciende el fogón, porque garantiza y coordina.',
  },
  {
    tipo: 'escena',
    kicker: 'Escena · un vecino',
    voz: 'Muchacho, mi niño… me tienen el barrio hecho un asco, y aquí solo vienen turistas a molestar y a hacer ruido.',
    quien: 'Voz de un personaje, no un dato',
    imagen: 'vecino',
    // Fuente 49.
    pie: 'El 53,9 % de quienes viven en Tenerife ve tensiones con los turistas. Fuente: ISTAC, ECOSOC, segundo trimestre de 2026.',
  },
  {
    tipo: 'solucion',
    kicker: 'Para los vecinos',
    titulo: 'Desde Tenique, vemos y entendemos la frustración del vecino.',
    intro: 'Con nuestra iniciativa…',
    puntos: [
      'Experiencias avaladas por su barrio: comida, oficios y fiestas.',
      'Parte de cada reserva, al fondo de su municipio, en una cuenta del Cabildo.',
      'El barrio propone en qué se usa.',
      'Precio de residente o 2 horas de su tiempo.',
    ],
    nota: 'En la demo, importes, precios y valoraciones son ejemplos, y las propuestas no se envían.',
    video: 'vecino',
  },
  {
    tipo: 'escena',
    kicker: 'Escena · un visitante',
    voz: 'Llegué al aeropuerto y me recibieron con pancartas diciéndome que me fuera. Así no se puede.',
    quien: 'Voz de un personaje, no un dato',
    imagen: 'visitante',
  },
  {
    tipo: 'solucion',
    kicker: 'Para los visitantes',
    titulo: 'Desde Tenique, vemos y entendemos la frustración del visitante.',
    intro: 'Con nuestra iniciativa…',
    puntos: [
      'Elige la emoción que quiere sentir.',
      'Encuentra experiencias con gente de aquí.',
      'Cada experiencia lleva tres sellos.',
    ],
    nota: 'Las emociones están por validar: se enseñan como diseño.',
    video: 'visitante',
  },
  {
    // Experiencia real y verificada del catálogo (src/data/experiencias.ts). Textos de los sellos: PIEDRAS en src/prototipo/tenique-piezas.tsx.
    tipo: 'sellos',
    kicker: 'Los tres sellos',
    titulo: 'Así queda una experiencia real, con sus tres sellos.',
    experienciaId: 'juego-del-palo-la-laguna',
    sellos: [
      { nombre: 'Avalada por el barrio', texto: 'Los vecinos o su asociación la avalan y lo renuevan. Si retiran el aval, sale.' },
      { nombre: 'Garantía Turismo de Tenerife', texto: 'Cumple las condiciones del destino: legalidad, seguro de responsabilidad civil, accesibilidad y respeto al entorno. Antes de publicar.' },
      { nombre: 'Valorada por quien la vivió', texto: 'Puntúan todas las personas que asistieron, vecinos y visitantes.' },
    ],
    nota: 'Experiencia real del catálogo. Los sellos y la valoración son ejemplos de la demo.',
  },
  {
    tipo: 'escena',
    kicker: 'Escena · Turismo de Tenerife',
    voz: 'Pero oíste… ¿y todo este dinero para dónde va? Porque aquí se mueve muchísimo.',
    quien: 'Voz de un personaje, no un dato',
    imagen: 'gestion',
  },
  {
    // Esther completará esta diapositiva más adelante. Hoy solo lo que existe en #/gestion y en el panel de Turismo de Tenerife.
    tipo: 'gestion',
    kicker: 'Para Turismo de Tenerife',
    titulo: 'Desde Tenique, vemos y entendemos la frustración de Turismo de Tenerife.',
    burbujas: [
      'Garantías pendientes: qué espera su visto bueno.',
      'Fondo publicado por municipio.',
      'Mapa de experiencias por municipio.',
      'Un día en Tenique, en directo.',
    ],
    nota: 'Datos del panel simulados, con títulos y municipios reales del catálogo.',
  },
  {
    tipo: 'datos',
    kicker: 'Y todos estos datos sirven para algo más',
    titulo: 'Con lo que se recopila, Turismo de Tenerife puede ir a cualquier mesa.',
    datos: ['Experiencias por municipio', 'Fondo publicado', 'Valoraciones de quien las vivió', 'Garantías y avales'],
    propuesta: 'Esto es lo que os proponemos',
    entidades: ['Gobierno de Canarias', 'Cabildo', 'Universidad', 'Cualquier entidad'],
    frase: '«Estos son nuestros datos, así se mueve nuestro turismo, y esto es lo que os proponemos; no porque nos apetezca, sino porque los datos nos avalan.»',
  },
  {
    // Quitado a petición de Esther: la comparación con 2020 (fuentes 46 y 97), «Tenerife se cocina entre todos» y lo del pulmón (ver guion).
    tipo: 'fogon',
    kicker: 'Las tres piedras, contentas',
    titulo: 'Con las tres, el fogón se enciende.',
    piedras: [
      { nombre: 'Vecinos', texto: 'Ven lo que deja el turismo y proponen en qué se usa.' },
      { nombre: 'Visitantes', texto: 'Viven la isla con gente de aquí.' },
      { nombre: 'Sector turístico', texto: 'Un gasto que llega a lo de aquí, con garantía.' },
    ],
    mensaje: 'La solución no es menos turismo, sino turismo de mejor calidad.',
  },
  {
    tipo: 'cta',
    kicker: 'Os pedimos tres cosas',
    titulo: 'Para quienes validáis el reto:',
    pedidos: [
      { titulo: 'Jugad con nuestro simulador de costes', texto: 'Hemos acotado la solución y, en el peor caso, proponemos alternativas a los problemas que hemos pensado.', destino: 'plan' },
      { titulo: 'Mirad nuestras ambiciones', texto: 'Nos hemos propuesto un producto mínimo viable, pero queremos que veáis hacia dónde puede crecer.', destino: 'futuro' },
      { titulo: 'Ved un día en Tenique en vivo', texto: 'La simulación con todos los perfiles moviéndose a lo largo de un día.', destino: 'gestion' },
    ],
  },
  { tipo: 'final', titulo: 'Somos Nova', subtitulo: '¿Preguntas?' },
]
