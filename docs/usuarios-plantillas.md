# Usuarios · plantillas para validar durante el evento

Material genérico de turismo. El día del reto se adapta en 10 minutos: cambia lo que va entre `{llaves}` y quita las preguntas que no apliquen.

Contenido:
1. Guion de entrevista de 5 minutos (español e inglés)
2. Hoja de notas por entrevista
3. Encuesta corta
4. Síntesis rápida en 30 minutos
5. Cómo pasarlo a `src/data/usuarios.ts`
6. Preguntas para Giulia

---

## 1 · Guion de entrevista (5 minutos)

### Reglas
- Pregunta por **lo que pasó**, no por lo que haría. «Cuéntame la última vez que…» funciona; «¿Usarías una app que…?» no sirve: casi todo el mundo dice que sí.
- No enseñes la idea antes de terminar las preguntas. Si la enseñas, deja de ser una entrevista y pasa a ser una prueba.
- Una pregunta cada vez. Deja silencio: lo útil suele llegar después.
- Pide ejemplos concretos: «¿Me pones un ejemplo?», «¿Qué hiciste entonces?».
- Dos personas: una pregunta y la otra anota. Las citas, palabra por palabra.

### Apertura (30 s)
> Hola, soy {nombre}, del equipo Nova del hackathon de turismo. Estamos intentando entender {tema del reto, en palabras sencillas}. ¿Tienes 5 minutos? No vendemos nada y no guardamos tu nombre. ¿Te importa que anotemos alguna frase tuya tal cual, sin decir quién la dijo?

Si dice que no a las citas: se anotan ideas, no frases literales.

### Preguntas (elige 6–8)
| # | Pregunta | Para qué |
|---|---|---|
| 1 | ¿Cuál es tu relación con {tema}? ¿Con qué frecuencia te pasa? | Situar el perfil |
| 2 | Cuéntame la última vez que {situación del reto}. ¿Qué pasó, paso a paso? | Hechos reales |
| 3 | ¿Qué fue lo más difícil o lo más pesado de eso? | Dolor |
| 4 | ¿Cómo lo resolviste? ¿Qué usaste (web, app, teléfono, alguien)? | Alternativas y canales |
| 5 | ¿Cuánto tiempo o dinero te costó? ¿Qué te perdiste por eso? | Coste del problema |
| 6 | ¿Has buscado alguna vez otra forma de hacerlo? ¿Por qué sí o por qué no? | Motivación real |
| 7 | Si pudieras cambiar una sola cosa de esa experiencia, ¿cuál sería? | Oportunidad |
| 8 | ¿En qué momento exacto lo habrías agradecido: antes del viaje, al llegar, durante, al volver? | Momento del journey |

### Cierre (30 s)
> ¿Hay algo que no te haya preguntado y debería? Gracias. ¿Podemos enseñarte en un rato lo que hagamos para ver si tiene sentido? (solo si dice que sí: ¿dónde te encontramos?)

### English version (tourists)
> Hi, I'm {name}, from team Nova at a tourism hackathon. We're trying to understand {challenge topic}. Do you have 5 minutes? We're not selling anything and we don't keep your name. Is it OK if we write down a sentence of yours word for word, anonymously?

1. How often do you {situation}? What's your connection to it?
2. Tell me about the last time you {situation}. What happened, step by step?
3. What was the hardest or most annoying part?
4. How did you solve it? What did you use (website, app, phone, someone)?
5. How much time or money did it cost you? Did you miss anything because of it?
6. Have you ever looked for another way to do it? Why or why not?
7. If you could change one thing about that experience, what would it be?
8. When exactly would help have been most useful: before the trip, on arrival, during your stay, going home?

> Is there anything I should have asked? Thank you very much.

---

## 2 · Hoja de notas (una por entrevista)

Copia este bloque en un documento compartido del equipo. **Sin nombres, teléfonos ni correos**: cada entrevista lleva un código (E01, E02…).

```
Código: E__        Fecha y hora:            Entrevista: ____  Notas: ____
Perfil (sin datos personales): residente / turista (país) / trabajador del sector (puesto) / otro
Edad aproximada: <30 · 30–50 · >50          Idioma: es / en / otro
Acepta citas literales: sí / no

Hechos (qué pasó, en orden):
-
Dolores (con sus palabras):
-
Cómo lo resuelve hoy / canales:
-
Momento del viaje en que ocurre:
Emoción en ese momento (-2 frustración … 2 entusiasmo):
Citas literales (solo si aceptó):
- «»
Lo que nos sorprendió:
```

---

## 3 · Encuesta corta (2 minutos, 6 preguntas)

Para difundir por QR o por los grupos del evento. Herramienta: el formulario que el equipo ya tenga (Google Forms o Microsoft Forms), **sin recoger correos**.

1. ¿Cuál es tu relación con {tema}? *(opción única: residente · turista · trabajo en el sector · otro)*
2. ¿Cuándo fue la última vez que {situación}? *(este mes · este año · hace más de un año · nunca)*
3. ¿Qué te resultó más difícil? *(opción múltiple con 4–5 dolores sacados de las entrevistas + «Otro»)*
4. ¿Cómo lo resolviste? *(opción múltiple con canales + «Otro»)*
5. Del 1 al 5, ¿cuánto te molestó? *(escala)*
6. Si pudieras cambiar una cosa, ¿cuál? *(texto libre, opcional)*

Versión inglesa: misma estructura, mismas opciones, para comparar respuestas.

**Cómo contarlo en la web y el pitch:** siempre con el número de respuestas («12 de 19 personas que respondieron…»). Es una muestra de conveniencia, no representativa: no se convierte en porcentaje de la población ni se presenta como estudio.

---

## 4 · Síntesis rápida (30 minutos, todo el equipo)

1. **Volcado (10 min).** Cada entrevistador pasa sus notas a tarjetas: una idea por tarjeta, con el código de la entrevista (E03). Las citas, en tarjetas aparte.
2. **Agrupar (10 min).** Juntad tarjetas parecidas sin poner nombre a los grupos al principio. Después, un título por grupo escrito como frase del usuario («No sé a quién preguntar cuando…»).
3. **Contar (5 min).** En cada grupo, cuántas entrevistas distintas lo mencionan. Un grupo que solo sale en una entrevista es una anécdota, no un patrón.
4. **Hipótesis (5 min).** Rellenad esta tabla:

| Hipótesis | Lo apoyan (códigos) | Lo contradicen (códigos) | Estado |
|---|---|---|---|
| {lo que creíamos antes de hablar con nadie} | E01, E04 | E02 | confirmada · caída · sin datos |

Regla del equipo (decididla antes de entrevistar, no después): por ejemplo, «confirmada» si la apoya la mayoría de las entrevistas con ese perfil y nadie la contradice con un hecho concreto.

Resultado de la síntesis: 3 patrones como mucho, la hipótesis principal con su estado y 2–3 citas que la ilustren.

---

## 5 · Cómo pasarlo a `src/data/usuarios.ts`

| En la síntesis | En el código |
|---|---|
| Perfil que más se repite | `PERSONAS[0]`: `perfil`, `contexto`, `digital`, `canales` |
| Patrones de dolor | `frenos` y `dolor` en cada `PasoJourney` |
| Lo que quieren conseguir | `necesidades`, `motivaciones` |
| Cita real (con permiso) | `frase`, entre «comillas» |
| Frase escrita por nosotros | `frase` con «Hipótesis:» delante |
| Momento del viaje | `fase` del paso; emoción de -2 a 2 |
| Contrastado con personas reales | `validado: true` (persona o paso) |

- El nombre de la persona es inventado y se nota que lo es (un nombre de pila, sin apellidos): es un arquetipo, no alguien real. La edad, como dato del arquetipo.
- `validado: true` solo si lo respaldan entrevistas o encuestas reales. Indica cuántas en la web («Validado con N entrevistas»).
- Nunca se mezcla una cita real con texto nuestro.

---

## 6 · Preguntas para Giulia (criterio de sector)

Para resolver en cuanto se conozca el reto:
1. ¿Qué perfil de turista o de trabajador del sector es el más afectado por este problema en Canarias, según lo que has visto en la carrera o en prácticas?
2. ¿En qué fase del viaje suele aparecer este problema, y qué canal usa hoy el turista para resolverlo?
3. ¿Qué preguntas del guion sobran o suenan raras para alguien del sector?
4. ¿Qué términos del sector debemos usar (y cuáles evitar) al hablar con trabajadores de hotel, agencias o guías?
5. ¿Conoces a alguien del sector con quien podamos hablar 5 minutos durante el evento, por teléfono o en persona?
