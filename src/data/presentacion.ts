// Presentación · plantilla de pitch.
// Cada diapositiva es un objeto: cambia los textos aquí. Los tipos admitidos están en Slide abajo.
import { EQUIPO_NOMBRE, EVENTO, RETO } from '../config/proyecto'

export type Slide =
  | { tipo: 'portada'; titulo: string; subtitulo: string; nota?: string }
  | { tipo: 'equipo'; titulo: string }
  | { tipo: 'texto'; kicker: string; titulo: string; puntos?: string[]; nota?: string }
  | { tipo: 'cifras'; kicker: string; titulo: string; cifras: { valor: string; etiqueta: string }[]; fuente?: string }
  | { tipo: 'pasos'; kicker: string; titulo: string; pasos: { titulo: string; texto: string }[] }
  | { tipo: 'cierre'; titulo: string; subtitulo: string }

export const SLIDES: Slide[] = [
  { tipo: 'portada', titulo: RETO.definido ? RETO.titulo : 'Nombre de la solución', subtitulo: `${EQUIPO_NOMBRE} · ${EVENTO.nombre}`, nota: RETO.definido ? `Reto propuesto por ${RETO.empresa}` : 'Reto propuesto por [empresa]' },
  { tipo: 'texto', kicker: 'El reto', titulo: RETO.definido ? RETO.pregunta : '¿Cómo podemos [verbo] para [usuario] sin [restricción]?', nota: 'Copia la pregunta del reto tal cual. Es lo primero que el jurado debe reconocer.' },
  {
    tipo: 'cifras',
    kicker: 'Por qué ahora',
    titulo: 'El turismo canario crece en valor, pero no en visitantes',
    cifras: [
      { valor: '18,4 M', etiqueta: 'turistas en 2025' },
      { valor: '-0,5 %', etiqueta: 'extranjeros ene–sep 2026' },
      { valor: '≈ 60 %', etiqueta: 'Reino Unido + Alemania' },
    ],
    fuente: 'Promotur 2025 · INE Frontur sep. 2026 · elDiario.es. Sustituir por las cifras del reto.',
  },
  { tipo: 'texto', kicker: 'El problema', titulo: 'Qué le pasa hoy al usuario', puntos: ['Dolor 1, con un dato', 'Dolor 2, con una cita de un usuario real', 'Dolor 3: lo que cuesta a la empresa'] },
  { tipo: 'texto', kicker: 'Para quién', titulo: 'Nuestra persona principal', puntos: ['Quién es y en qué momento del viaje está', 'Qué necesita', 'Qué la frena'], nota: 'Toma la persona de la pestaña Usuarios.' },
  { tipo: 'texto', kicker: 'La solución', titulo: 'Una frase que se entienda a la primera', puntos: ['Qué hace', 'Para quién', 'Por qué es distinta'] },
  {
    tipo: 'pasos',
    kicker: 'Cómo funciona',
    titulo: 'Tres pasos, desde el punto de vista del usuario',
    pasos: [
      { titulo: 'Descubre', texto: 'Dónde y cuándo entra en contacto con la solución.' },
      { titulo: 'Usa', texto: 'La acción principal, en un gesto.' },
      { titulo: 'Gana', texto: 'Lo que obtiene él y lo que obtiene la empresa.' },
    ],
  },
  { tipo: 'texto', kicker: 'Demo', titulo: 'Prototipo en vivo', nota: 'Abre la pestaña Prototipo o el QR de la demo.' },
  {
    tipo: 'cifras',
    kicker: 'Impacto',
    titulo: 'Qué mediremos para saber si funciona',
    cifras: [
      { valor: 'KPI 1', etiqueta: 'adopción o uso' },
      { valor: 'KPI 2', etiqueta: 'ingreso o ahorro' },
      { valor: 'KPI 3', etiqueta: 'satisfacción o sostenibilidad' },
    ],
    fuente: 'Hipótesis a validar en el piloto.',
  },
  { tipo: 'texto', kicker: 'Piloto y viabilidad', titulo: 'Cómo lo probaríamos y cuánto cuesta', puntos: ['Alcance: dónde, cuánto tiempo, con quién', 'Coste estimado y de dónde sale', 'Criterio para escalar o parar'] },
  { tipo: 'equipo', titulo: `Somos ${EQUIPO_NOMBRE}` },
  { tipo: 'cierre', titulo: 'Gracias', subtitulo: 'Preguntas' },
]
