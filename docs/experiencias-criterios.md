# Experiencias reales · criterios, huecos y descartes

Catálogo: `src/data/experiencias.ts`. Consulta: 12-11-2026.
Esther: «selecciona experiencias reales, no inventes».

## Criterios

- **Solo experiencias que existen.** Cada una tiene fuente con URL y fecha de consulta.
- **Orden de fuentes:** web del organizador, ayuntamiento, Cabildo, Web Tenerife o Hola Islas Canarias. La prensa local solo como apoyo, y se dice que es prensa.
- **`verificado: true`:** una fuente oficial, del organizador o de prensa de 2026 muestra la edición de 2026 o la actividad en curso.
- **`verificado: false`:** existe, pero falta confirmar horario, fechas de 2026 o que siga activa. En la web: «Por verificar».
- **Sin importes:** por decisión del coordinador, el archivo no lleva precios, valoraciones ni importes; la demo los pone marcados como «ejemplo». Los precios públicos que dan las fuentes (por ejemplo, la pateada al Socorro desde El Sauzal: 8 € residentes, 10 € no residentes) se quedan aquí, en las notas.
- **Campos vacíos:** si la fuente no da duración, idioma o accesibilidad, no se rellenan. No hay anfitriones con nombre propio.
- **Emociones:** las asigna el equipo según lo que cuenta la fuente; no son un dato de la fuente. Usan los 8 ids de `EMOCIONES` en `src/data/usuarios.ts`: pertenencia, orgullo, raices, sabor, calma, asombro, adrenalina, celebracion.
- **`mixta`:** true si vecinos y visitantes pueden estar juntos en la misma actividad. False si es solo para escolares, voluntarios inscritos o un público casi solo turista.

## Zonas

Las zonas de la ficha son las del encargo. Decisiones:
- **Güímar y Candelaria** van como «sur» (comarca sureste). No hay zona «este».
- **Arguayo (Santiago del Teide), Pinolere (La Orotava) y Vilaflor** van como «medianías».
- **Izaña (Observatorio del Teide)** va como «otra»: es cumbre.

## Reparto (29 experiencias, 21 verificadas)

| Zona | Nº |
|---|---|
| Norte | 8 |
| Metropolitana | 5 |
| Sur | 5 |
| Anaga | 3 |
| Teno | 3 |
| Medianías | 3 |
| Otra (cumbre) | 2 |

| Tipo (`tipo`) | Nº |
|---|---|
| Entidad pública | 10 |
| Vecinos | 9 |
| Productor o comercio | 6 |
| Asociación | 3 |
| Empresa turística | 1 |

## Por verificar (8)

- Tablas de San Andrés (Icod): las fechas de 2026 no coinciden entre fuentes. Falta el programa del Ayuntamiento.
- Mercado de Nuestra Señora de África: horario distinto en cada fuente; no hay ficha municipal leída.
- Cruz del Carmen y Sendero de los Sentidos: sin horario oficial actual; la accesibilidad del sendero viene de una web educativa.
- Queserías de Teno Alto: fichas municipales de hace 5 o 6 años.
- Mercado del Agricultor y Artesano de Buenavista: ficha municipal sin fecha.
- Centro Alfarero Cha Domitila: la web municipal pide confirmar la apertura antes de ir.
- Agromercado de Adeje: solo la guía de Agrocabildo, sin fecha; la página del Cabildo no cargó al consultar.
- Lucha canaria: la federación insular existe y la temporada 2026-27 está en marcha, pero no se ha leído un calendario oficial de luchadas.

## Huecos

- **Empresa turística:** solo una (visita al Observatorio). Faltan empresas del sur que ya hagan experiencias con gente local. Buscar entre las adheridas a programas del Cabildo.
- **Vecino anfitrión individual:** ninguna. No hay una fuente pública de vecinos que ofrezcan algo a título personal. Es justo el hueco que Tenique cubre; no se ha inventado ninguno.
- **Pesca artesanal todo el año:** solo Anaga Biofest (anual). No se ha encontrado pesca-turismo autorizado en Tenerife.
- **Guachinches:** existe un registro (Decreto 83/2013, comunicación anual al Cabildo), pero no se ha encontrado el listado público. Los directorios privados mezclan guachinches con restaurantes. Descartado hasta tener la lista oficial.
- **Sur turístico de costa (Adeje, Arona):** pocas experiencias verificadas. El Agromercado de Adeje está por verificar.
- **Astronomía popular:** las Puertas Abiertas del IAC son solo en junio y en español. Falta una actividad de observación nocturna con vecinos.
- **Accesibilidad:** casi ninguna fuente la detalla.

## Descartadas

- **Festival Taganana (agosto-septiembre de 2026), con el mercado El Mortero de Anaga:** solo leído en prensa e Instagram. Se puede añadir si se lee la web del festival.
- **Romerías de Arico y Granadilla:** solo en calendarios de prensa y de un comercio, con fechas que no coinciden.
- **Ruta del Hermano Pedro (Vilaflor–Granadilla):** es un camino, no una actividad con organizador y fecha.
- **Arrastre de cacharros en otros barrios y en el Mercadillo de Tacoronte por San Andrés:** incluidos dentro de otras fichas.

## Fuentes de apoyo consultadas

Las fuentes principales y de apoyo de cada experiencia están en su ficha (`fuente` y `apoyo`).

## Ampliación urbana: comercio local y cultura (12-11-2026)

Encargo del coordinador, aprobado por Esther: el criterio «Impacto del turismo responsable» pide gasto local en todos los ámbitos, no solo en naturaleza. Se añaden 6 experiencias urbanas (4 verificadas). Total: 35 experiencias, 26 verificadas.

- Mercado Municipal de La Laguna · verificada (prensa de abril de 2026).
- La Noche en Blanco de La Laguna, 28-11-2026 · verificada (Ayuntamiento). El programa completo aún no se ha publicado.
- Ruta del Bocadillazo del Distrito Suroeste, Santa Cruz, del 12-11 al 06-12-2026 · verificada (Sociedad de Desarrollo).
- Feria del Pescado de Los Cristianos, Arona · verificada (agenda del Ayuntamiento, edición de 2026).
- Rutas histórico-comerciales por la Rambla y Salamanca, Santa Cruz · por verificar: solo consta la edición de noviembre de 2025.
- Artenerife en la Casa de la Aduana, Puerto de la Cruz · por verificar: no consta el horario de la tienda.

Descartadas:
- Los Sabandeños en el Teatro Leal (28-11-2026): solo en prensa de agosto, no está en la programación del teatro.
- Casa Iriarte, Puerto de la Cruz: puede estar cerrada.
- Punto de venta de pescado de la cofradía de Los Cristianos: solo hay un convenio de 2020, sin confirmar que esté abierto.

Hueco: no hay ningún taller en un oficio o tienda local con fuente pública y fecha.

## Criterio «para jóvenes» (12-11-2026)

Regla de `CRITERIO_JOVENES` (`src/data/usuarios.ts`): los 2 obligatorios y al menos 2 de los 4 opcionales, y todo tiene que salir de la fuente.

Resultado: **0 marcadas.** Ninguna fuente confirma a la vez horario de tarde o fin de semana, precio asequible y dos opcionales. Casi ninguna dice el precio, y el archivo no lleva importes.

Las que más se acercan llevan `paraJovenes: false` y el motivo en `motivoJovenes`:
- Rutas histórico-comerciales de Santa Cruz: fin de semana, gratis, residentes y visitantes. Pero es para mirar y escuchar, y solo consta 2025.
- Feria de Pinolere: fin de semana y talleres. Solo es gratis una parte, y la fuente no habla de grupo mixto.
- Puertas Abiertas del Observatorio: fin de semana y gratis. Pero es para mirar y escuchar, y solo en español.

Descartadas sin anotar:
- Escuelas de juego del palo: tarde, gratis y relevo generacional, pero son para niños desde 7 años.
- Mercados, fiestas y romerías: la fuente no dice el precio.

Para que una pase a «para jóvenes» haría falta que su organizador confirme el precio y quién participa.

### Búsqueda dirigida a programas de juventud (12-11-2026, unos 30 minutos)

He mirado 7 programas en 11 fuentes:
- Centro de Información Juvenil del Cabildo (Tenerife Joven y Educa).
- Juventud de La Laguna: talleres de adolescentes y Pasaporte Joven.
- Distrito Joven de Santa Cruz.
- Juventud de Adeje.
- Juventud de Arona.
- Carné Joven Canarias.
- Agenda cultural de la ULL.

Resultado: **sigue en 0.** He añadido dos actividades reales que se quedan cerca, con su motivo:
- **Meet and Talk** (Centro de Información Juvenil, Santa Cruz): los martes de 17:00 a 18:30, para hacer y en inglés. La fuente no dice el precio ni que participen jóvenes de fuera.
- **Sendero Nocturno Navideño** (Distrito Joven, 4 de diciembre de 2026): de noche, gratis y para hacer. Falta un segundo opcional.

Por qué no llega ninguna:
- **Precio:** las fichas del Centro de Información Juvenil no lo dicen.
- **Grupo mixto:** ningún programa dice que reciba a jóvenes visitantes. Varios piden inscripción previa en el programa, y algunos cursos de Arona, estar empadronado.
- **Idioma:** solo Meet and Talk menciona el inglés.
- **Relevo generacional:** ninguna fuente lo menciona.
- **Fechas:** el Carné Joven Canarias ofrece descuentos, no actividades. La agenda de la ULL no dice si sus actos son gratis ni abiertos al público. En Adeje y Arona lo más claro ya pasó (verano y septiembre).

**Hallazgo para el Diagnóstico:** en 7 programas de juventud de Tenerife y 11 fuentes no aparece ninguna actividad que, según su fuente, sea a la vez asequible, en horario compatible y abierta a compartir entre jóvenes de aquí y de fuera. Lo que más falta en las fuentes es el precio, la apertura a visitantes y el idioma.
