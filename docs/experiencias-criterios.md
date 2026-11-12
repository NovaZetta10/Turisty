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
