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

**Corrección (12-11-2026):** en el primer aviso puse «7 programas y 11 fuentes». No es exacto. Abrí y leí 6 páginas de 3 programas. Los otros 4 programas solo los vi como resultados de un buscador, sin abrir la página. Se distinguen abajo.

**Páginas abiertas y leídas (6), de 3 programas:**

Centro de Información Juvenil del Cabildo (Tenerife Joven y Educa):
1. https://tenerifejovenyeduca.com/cij/ (agenda de noviembre de 2026 y horario del centro)
2. https://tenerifejovenyeduca.com/cij/grupos-juveniles/grupo-de-conversacion-en-ingles-meet-talk/ (Meet and Talk: martes de 17:00 a 18:30; no dice precio)
3. https://tenerifejovenyeduca.com/cij/espacio-joven/ (agenda; no dice precio)
4. https://tenerifejovenyeduca.com/cij/actividades/ (no dice precio)

Distrito Joven de Santa Cruz:

5. https://diariodeavisos.elespanol.com/2026/09/actividades-jovenes-santa-cruz-tenerife/ (prensa; agenda de otoño de 2026: gratis, con inscripción)

Juventud de Adeje:

6. https://www.adeje.es/juventud (solo dos actividades de otoño de 2026, sin hora, precio ni idioma)

Intenté abrir https://tenerifejovenyeduca.com/cij/actividades/conversacion-en-ingles-meet-and-talk/, pero dio error 404.

**Vistas solo en resultados de búsqueda, sin abrir (no citarlas como fuente leída):**
- Juventud de La Laguna: https://www.aytolalaguna.es/actualidad/noticias/La-Laguna-pone-en-marcha-un-programa-de-promocion-del-bienestar-y-la-participacion-activa-de-los-adolescentes-en-los-barrios/ y https://diariodeavisos.elespanol.com/2026/09/pasaporte-joven-2026-la-laguna-actividades-septiembre/
- Juventud de Arona: https://www.arona.org/Agenda/ctl/Ver/mid/429?id=91557 (Arona Joven Fest) y https://www.arona.org/Tu-Ayuntamiento/Prensa/Noticias/ctl/Ver/mid/422?id=94609 (cursos para empadronados)
- Carné Joven Canarias: https://www3.gobiernodecanarias.org/noticias/juventud-acuerda-nuevos-descuentos-para-conciertos-y-festivales-con-el-carne-joven-europeo/?format=pdf
- Agenda de la ULL: https://www.ull.es/portal/agenda/

Lo que digo de estos 4 programas en «Por qué no llega ninguna» sale de esos resultados de búsqueda, no de leer la página. Para citarlos en el Diagnóstico habría que abrirlos antes.

Resultado: **sigue en 0.** He añadido dos actividades reales que se quedan cerca, con su motivo:
- **Meet and Talk** (Centro de Información Juvenil, Santa Cruz): los martes de 17:00 a 18:30, para hacer y en inglés. La fuente no dice el precio ni que participen jóvenes de fuera.
- **Sendero Nocturno Navideño** (Distrito Joven, 4 de diciembre de 2026): de noche, gratis y para hacer. Falta un segundo opcional.

Por qué no llega ninguna:
- **Precio:** las fichas del Centro de Información Juvenil no lo dicen.
- **Grupo mixto:** ningún programa dice que reciba a jóvenes visitantes. Varios piden inscripción previa en el programa, y algunos cursos de Arona, estar empadronado.
- **Idioma:** solo Meet and Talk menciona el inglés.
- **Relevo generacional:** ninguna fuente lo menciona.
- **Fechas:** el Carné Joven Canarias ofrece descuentos, no actividades. La agenda de la ULL no dice si sus actos son gratis ni abiertos al público. En Adeje y Arona lo más claro ya pasó (verano y septiembre).

**Hallazgo para el Diagnóstico (corregido):** en las 6 páginas leídas de 3 programas de juventud de Tenerife (Centro de Información Juvenil del Cabildo, Distrito Joven de Santa Cruz y Juventud de Adeje) no aparece ninguna actividad que, según su fuente, sea a la vez asequible, en horario compatible y abierta a compartir entre jóvenes de aquí y de fuera. Lo que más falta en las fuentes es el precio, la apertura a visitantes y el idioma.

## Experiencias de Turismo de Tenerife (12-11-2026)

Encargo de Esther: en el feedback, Turismo de Tenerife pidió ver sus propias experiencias en Tenique. Todo lo de abajo está abierto y leído, salvo lo marcado «sin abrir, no citar».

### «Tenerife es tuya»: 18 añadidas, todas verificadas

Qué es: un programa de sensibilización turística del Cabildo, a través de Turismo de Tenerife. Es gratuito. Lo guían guías oficiales de APIT Tenerife, empresas de las Cartas por la Sostenibilidad y entidades de buenas prácticas.

Quién puede ir: solo colectivos (asociaciones, ONG, personas mayores, colectivos vulnerables, alumnado de formación y profesionales del turismo y la comunicación). Grupos de 15 a 20 personas, inscritos con 15 días de antelación. No hay plazas para personas sueltas ni para visitantes, así que todas llevan `mixta: false`. La 6.ª edición iba hasta abril de 2026; las fichas actuales ya tienen fechas de 2027.

Página del programa: https://www.webtenerife.com/corporativa/que-hacemos/tenerife-proyecta/tenerife-es-tuya/
Noticia de la 6.ª edición: https://www.webtenerife.com/blogcorporativo/2025/09/el-cabildo-ofrece-hasta-60-actividades-y-rutas-para-que-mayores-y-personas-en-situacion-de-vulnerabilidad-disfruten-de-los-atractivos-de-la-isla/

Hay 34 fichas: 7 culturales, 13 de la Carta por la Sostenibilidad y 14 de buenas prácticas. Las abrí todas. He añadido las 18 que tienen fecha futura y lugar, con `programa: 'Tenerife es tuya'`. Ninguna ficha nombra a la empresa o guía concreta. Si la ficha no da el municipio, pone «No consta». No he deducido ninguno por el nombre del lugar.

No añadidas:
- Con la fecha ya pasada (octubre y 9-11 de noviembre de 2026): Macizo de Teno, Snorkeling en Montaña Amarilla, Paseo en barco a Faro de Rasca, El tesoro escondido de Anaga, Anaga Biofest y sendero, Nivarina e Innova Foods, y Observatorio de Aves de Buenavista y Los Silos.
- Sin fecha confirmada: Observación del cielo nocturno en el Barranco de Badajoz, Paseo costero de Santa Úrsula con bodega, Senderismo Secretos de Teno, Sabores de Tenerife, y Bodegas Monje con la Casa del Vino.
- Sin lugar: Comunidades turísticas circulares y Hotel GF, Finca Ecológica La Jara, y Tuno Canarias.
- Ficha vacía: Del plátano se aprovecha todo.

### Otras iniciativas que se citaron

- **MUECA:** existe. Es el Festival Internacional de Arte en la Calle del Puerto de la Cruz (24.ª edición, del 7 al 10 de mayo de 2026). Lo organizan el Área de Cultura del Ayuntamiento y la Plataforma Cómplice MUECA, una red de vecinos, entidades, comercios y empresas que lleva 15 años sosteniéndolo. Ninguna de las dos fuentes leídas dice que haya casas que se abren a visitantes, que se lleve comida ni que se aloje a artistas. Añadido como 1 experiencia, verificada. Fuentes: https://www.puertodelacruz.es/noticias/2026/04/06/el-festival-mueca-vuelve-a-situar-la-cultura-en-el-centro-de-la-vida-urbana-de-puerto-de-la-cruz-del-7-al-10-de-mayo/ y https://www.festivalmueca.com/el-festival-mueca-vuelve-a-situar-la-cultura-en-el-centro-de-la-vida-urbana-de-puerto-de-la-cruz-del-7-al-10-de-mayo/
- **Tenerife Film Commission:** existe, en la web de Turismo de Tenerife. Sirve para atraer rodajes y apoyar a cineastas, con encuentros profesionales y un sello de rodaje sostenible. No ofrece experiencias al público ni a visitantes. No añadida. Fuente: https://www.webtenerife.com/blogcorporativo/tag/film-commission/. Un artículo de ResearchGate habla de una ruta de 2012 por los lugares de rodaje de «Furia de Titanes»: sin abrir, no citar.
- **«Guay Tenerife»:** no aparece en ninguna de las dos búsquedas. El único resultado con «Guay» es una agencia de viajes de Santa Cruz sin relación con el programa. No existe con ese nombre, o se llama de otra forma. Hay que preguntar a Esther o a Turismo de Tenerife el nombre exacto.

Total del catálogo: 56 experiencias, 46 verificadas, 32 mixtas.

## Deporte (12-11-2026)

Encargo de Esther: que el deporte tenga voz. He añadido 8 experiencias deportivas, todas con fecha futura, verificadas y leídas:
- **VII Torneo del Fajín de Lucha Canaria:** repesca el 28-11-2026 y final el 29-11-2026, en el terrero de San Miguel de Abona. Lo organiza la Fundación CajaCanarias. Es para niños y niñas residentes en Canarias. `mixta: false`: la fuente no dice si el público puede ir. Fuentes: https://www.cajacanarias.com/noticias/la-gran-final-del-torneo-del-fajin-fundacion-cajacanarias-regresa-a-tenerife/ y https://www.cajacanarias.com/agenda/vii-torneo-del-fajin-lucha-canaria/
- **K42 Canarias Anaga Marathon**, La Laguna, del 4 al 6 de diciembre de 2026.
- **III Cross Navideño del Puerto de la Cruz**, 12 de diciembre de 2026.
- **XXXVI Media Maratón Ciudad de Tacoronte**, 20 de diciembre de 2026.
- **XIII San Silvestre de Candelaria**, 26 de diciembre de 2026. Tiene carrera adaptada.
- **XIV San Silvestre Garachiquense**, 31 de diciembre de 2026.
- **X San Silvestre Golden Mile**, Playa de las Américas, 31 de diciembre de 2026.
- **Trail Nocturno Tegueste**, 16 de enero de 2027.

Las carreras van con `mixta: true` porque cualquiera, residente o visitante, puede inscribirse. Leí su ficha de inscripción en Chronotrack Canarias y el listado de https://www.gesportcanarias.com/web/inscripciones/. En varias fichas no consta el organizador; ahí el `tipo` es provisional («empresa»).

Emociones del catálogo tras añadir el deporte (64 experiencias): adrenalina 12 (antes 4), orgullo 18 (antes 16), raices 29, pertenencia 23, celebracion 18, sabor 15, asombro 15, calma 12.

Huecos y descartes:
- **Salto del pastor:** la Federación (https://www.saltodelpastorcanario.org/web/) solo aparece en resultados de búsqueda; sin abrir, no citar. Según esos resultados, sus rutas de 2026 en Teno y Anaga ya pasaron y el curso de iniciación de otoño está completo. No he encontrado ninguna fecha futura.
- **Bola canaria y vela latina:** los campeonatos de 2026 encontrados fueron en Gran Canaria y Fuerteventura. No he encontrado ninguno en Tenerife con fecha futura.
- **Milla del Vino (22-11-2026):** descartada porque la ficha no da el municipio.
- **Juego del palo:** sigue la ficha de las escuelas de La Laguna; no hay ningún encuentro abierto con fecha futura.
- **Concentración del Fajín en Güímar (15-11-2026):** va dentro de la ficha del torneo, no como experiencia aparte.
