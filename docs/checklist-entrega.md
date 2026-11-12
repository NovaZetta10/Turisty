# Checklist de entrega · equipo Nova

La pasa el subagente revisor antes de cada entrega. Cada punto se marca ✅, ❌ (con el arreglo y su dueño) o «n/a».
Dueños: coordinador (`src/config/`, `App.tsx`, `styles.css`, `src/components/`), investigación, usuarios, prototipo, negocio, pitch. Ver «Quién toca qué» en el README.

## 0. Rúbrica de jurado · Reto 1 de Turismo de Tenerife

Fuente: PDF del reto («Presentacion_NextGen_reto1.pdf», entregado por Esther el 12-11-2026). Los criterios **no tienen pesos publicados**: no se asignan pesos ni notas numéricas inventadas. Cada criterio se valora como «fuerte / justo / flojo», con la prueba en la web.

Pregunta literal: «¿Cómo podríamos convertir la relación entre población local y turistas en una convivencia que sea, para ambos, identidad, bienestar y orgullo compartido?» El PDF añade: «Lo que más cuenta es la claridad y la fuerza de la idea».

### 0.1 Entregables oficiales

| Entregable | Dónde está | Qué necesita un jurado para la nota máxima | Alerta |
|---|---|---|---|
| **Diagnóstico** | `/diagnostico` | Qué pasa **en Tenerife** y por qué, con fuentes. Causas más allá de vivienda y movilidad, contrastadas y no supuestas. Qué no se sabe (el PDF dice que no hay datos desglosados del retorno del turismo en Tenerife) y cómo se mediría. Voz del vecino, aunque sea poca y declarada. | «Causas dadas por hechas». Cifras de Canarias leídas como de Tenerife. |
| **Plan de acción** | `/plan` | Hoja de ruta a corto, medio y largo plazo con plazos realistas. Un piloto concreto (dónde, con quién, cuánto tiempo). Cómo se financia, qué permisos hacen falta y qué se mide. Los presupuestos y objetivos supuestos aparecen etiquetados como supuestos. | «Es otra campaña». Plazos de un año para todo. |
| **Mapeo de responsabilidades** | `/responsabilidades` | Un papel concreto para cada agente: Turismo de Tenerife, Cabildo y administraciones, empresas turísticas, propietarios de vivienda vacacional, población local y turistas. Qué aporta cada uno, qué recibe y cómo colaboran entre sí, no solo con la administración. | «Responsabilidad solo de la administración». Vivienda vacacional o turistas sin papel. |

### 0.2 Criterios oficiales (sin pesos)

| Criterio | Nota máxima si el jurado ve… | Señal de alerta |
|---|---|---|
| **Viabilidad** (legal, medioambiental, económica, presupuestaria) | Encaje legal de que un vecino ofrezca y cobre una experiencia (alta, seguro, fiscalidad), marcado «Por verificar» hasta tener fuente. Límites de carga en espacios naturales. Coste por fases y quién lo paga. Un piloto pequeño antes de toda la isla. | «Toda la isla desde el día 1» sin piloto. Ingresos para anfitriones sin marco legal. |
| **Involucración de la sociedad tinerfeña en su conjunto** (no solo jóvenes) | Mayores, zonas rurales, asociaciones vecinales, comercio y productor local. Canales sin móvil: puntos físicos con personas que atienden. | «Solo digital». Persona tipo joven y conectada. |
| **Factor humano** (persona en el centro, no solo digital) | El encuentro entre personas es el producto y la app solo lo organiza. Mediadores o anfitriones con nombre de rol, y el relato del vecino. | La demo es lo único que se enseña. |
| **Impacto del turismo responsable** (gasto en la economía local, todos los ámbitos) | Adónde va cada euro: anfitrión, comercio, fondo de barrio. Un indicador medible y el método para medirlo. El fondo publica en qué se gasta. | Impacto descrito con adjetivos, sin indicador. |
| **Innovación** | Qué es nuevo frente a lo que ya existe (experiencias tipo marketplace, campañas institucionales). Es corresponsable y de doble sentido: el local también participa y gana. | «Es otra campaña». «Esto ya existe con otro nombre». |

### 0.3 Requisitos transversales del PDF (comprobar en todas las pestañas)
- [ ] Los **tres ejes combinados** se ven: comunicación y relato, datos y transparencia en lenguaje cercano, y corresponsabilidad y acción.
- [ ] **Pack integral**: una parte digital y acciones humanas y relacionales.
- [ ] Llega a **quien no está en redes**.
- [ ] La **población local es protagonista**, no un decorado para el turista.
- [ ] Es de **doble sentido**: ni solo para el turista ni solo para el local.
- [ ] **No es otra campaña de comunicación**.
- [ ] Cubre **Tenerife entera**, con zonas rurales y no solo el sur.
- [ ] «Pensar a lo grande»: hay visión a largo plazo y un ajuste por fases.

### 0.4 Las cinco alertas, frase por frase
Si una de estas frases se le puede ocurrir a un jurado al ver una pestaña, esa pestaña pierde puntos:
1. «Es otra campaña»: hay logo, lema y vídeo, pero no un programa estable con agentes y presupuesto.
2. «Solo digital»: la app ocupa el centro y los puntos físicos son una línea al final.
3. «Solo para el turista»: el vecino aparece como oferta y no como usuario que también disfruta y gana.
4. «Causas dadas por hechas»: el diagnóstico repite «vivienda y movilidad» o «falta de contacto» sin datos de Tenerife ni contraste.
5. «Responsabilidad solo de la administración»: el fondo o el programa dependen solo del Cabildo, y las empresas y la vivienda vacacional no aportan nada concreto.

## 1. Encaje con el reto
- [ ] `RETO` relleno (`definido: true`), con la pregunta tal cual la plantea la empresa.
- [ ] Cada entregable de `RETO.entregablesPedidos` tiene su pestaña o su sitio, visible y en estado «listo».
- [ ] Rúbrica del punto 0 pasada pestaña por pestaña: «fuerte / justo / flojo» por criterio y dónde perdemos puntos. Sin pesos inventados.
- [ ] La solución responde a la pregunta del reto, no a otra parecida.
- [ ] `DESTACADOS` apunta a los 2–3 entregables que más puntúan, cada uno con un motivo real.
- [ ] **Todo es de Tenerife.** Canarias u otros destinos aparecen solo como comparación declarada («Canarias: …», «frente a Canarias…»). Ninguna cifra regional puede leerse como de Tenerife.

## 2. Datos
- [ ] Cada cifra visible tiene referencia [n] y la fuente dice exactamente eso.
- [ ] Una sola serie para cada magnitud en toda la web y la presentación (ojo: turistas totales de Promotur ≠ extranjeros del INE ≠ «visitantes» de la prensa).
- [ ] Nada marcado «Por verificar» en la presentación.
- [ ] Los enlaces de `FUENTES` abren (los que bloquean a los robots, abiertos a mano).
- [ ] Fechas de consulta y de los datos visibles cuando importan.

## 3. Honestidad
- [ ] Ninguna cita de usuario inventada: las citas reales llevan `validado: true`; las nuestras se presentan como hipótesis.
- [ ] Ningún cliente, acuerdo ni resultado inventado.
- [ ] Los supuestos de negocio están etiquetados como supuestos, con el cálculo visible.
- [ ] El prototipo dice qué es real y qué está simulado.

## 4. Técnica
- [ ] `npx tsc --noEmit` sin errores.
- [ ] `npm run build` sin errores.
- [ ] `npm run revisar:entrega` sin errores.
- [ ] Todas las pestañas y `#/app`, a 390 px y a 1280 px: sin desbordes horizontales ni texto cortado. Incluidas todas las sub-pestañas de Investigación.
- [ ] Ningún [corchete], «Por completar» ni texto para el equipo (rutas como `src/…` o `public/…`, «hueco», «rellena…») en lo que vaya a ver el jurado. `npm run revisar` no lo detecta todo: revisar a ojo Inicio, Usuarios, Prototipo y la portada de la presentación.
- [ ] Vídeo de preview en `public/video/preview.mp4`, y se reproduce.
- [ ] `SITIO_URL` relleno. Los dos QR de la presentación abren la web publicada en un móvil real (no `localhost`).
- [ ] La demo (`#/app`) carga en un móvil real desde el QR, sin pantallas de ejemplo, y se reinicia sola.
- [ ] «Exportar PDF»: una diapositiva por página y con los fondos.
- [ ] Enlaces del equipo (LinkedIn, GitHub) apuntan a perfiles, no a búsquedas.
- [ ] Raíz del repositorio limpia: sin capturas ni pruebas, y sin `dist/`, `tsconfig.tsbuildinfo` ni `node_modules` subidos.
- [ ] Subido a GitHub también lo nuevo (`docs/`, `scripts/`, `src/prototipo/`…). Lo borrado en local, borrado también en el repositorio (`git rm`).
- [ ] El workflow *Deploy* de la pestaña Actions termina en verde y la web publicada muestra la última versión.

## 5. Accesibilidad básica
- [ ] Contraste del texto ≥ 4,5:1, también en el prototipo (botón principal: texto blanco sobre `--app-accent`).
- [ ] Foco visible al navegar con el tabulador, en la web y en el prototipo.
- [ ] Imágenes con `alt` (decorativas con `alt=""`); botones de solo icono con `aria-label`.
- [ ] Con «reducir movimiento» activado no hay animaciones grandes (cielo estático, sin contadores ni inclinaciones).
- [ ] Campos de formulario con etiqueta.

## 6. Pitch
- [ ] Guion (`docs/pitch-guion.md`) cronometrado en voz alta por debajo de 5:00. Si pasa, decir qué se corta.
- [ ] Cada diapositiva tiene una idea y un título que se lee en 3 segundos.
- [ ] Cifras de la presentación con fuente en el pie.
- [ ] Respuestas preparadas para las preguntas probables del jurado, con quién responde cada una.
- [ ] Plan B si falla la wifi: PDF descargado y vídeo en local.

## Veredicto
- Lista para entregar: sí / no.
- Qué falta, en orden de gravedad, con su dueño.

---

## Registro · 12-11-2026 · evaluación rápida de Tenique (antes de construir)

Esta evaluación parte de la idea tal como la describe la memoria del proyecto, no de la web. Las valoraciones son mías y de juicio, no notas.

| Criterio | Hoy | Por qué |
|---|---|---|
| Viabilidad | Flojo | No hay marco legal para que un vecino cobre una experiencia, ni piloto, ni financiación del fondo de barrio. |
| Sociedad en su conjunto | Justo | Los puntos físicos y las zonas rurales ayudan, pero la pieza central es una app. |
| Factor humano | Justo | El encuentro es el núcleo, pero se cuenta como «app de experiencias». |
| Turismo responsable | Justo | El gasto va a anfitriones, al comercio y al fondo, pero no hay indicador ni método. |
| Innovación | Justo | La búsqueda por emoción y el fondo de barrio son originales. El catálogo de experiencias puede parecer ya existente. |

**Dónde perdemos puntos ya, por gravedad:**
1. **Datos y transparencia queda como «apoyo».** El PDF pide los tres ejes combinados y nombra como hipótesis la transparencia cercana. Si solo se ve el fondo de barrio, falta medio eje. *Arreglo:* una pieza de transparencia propia, que cuente qué deja el turismo en tu barrio en lenguaje cercano. Puede ser el panel del fondo, pero a escala de isla, y diciendo qué datos no existen hoy. Afecta a investigación y prototipo.
2. **Riesgo de que parezca «solo digital» y un marketplace de experiencias.** Si la portada y la demo son la app, el jurado ve un producto turístico. *Arreglo:* contar Tenique como programa con tres piedras: personas (anfitriones y mediadores en puntos físicos), lugares (puntos físicos en oficinas de turismo, centros ciudadanos y ayuntamientos) y app. La demo enseña también el perfil local y la gestión, no solo al turista buscando. Afecta a pitch, prototipo y coordinador (Inicio).
3. **No responde a vivienda y movilidad.** El PDF dice que el malestar va ligado a eso. *Arreglo:* el diagnóstico dice explícitamente qué causas aborda Tenique (desconexión, falta de retorno visible, falta de voz) y cuáles no resuelve y quién debe resolverlas. Así se evita «causas dadas por hechas» y no se promete lo imposible. Afecta a investigación y pitch.
4. **Corresponsabilidad de empresas y vivienda vacacional.** El fondo de barrio no dice quién lo financia. Si es solo el Cabildo, salta «solo la administración». *Arreglo:* aportación sistemática de empresas asociadas y de propietarios de vivienda vacacional al fondo, con el porcentaje marcado como supuesto, siguiendo la hipótesis del fondo coordinado del PDF. Afecta a negocio y responsabilidades.
5. **Viabilidad legal de los anfitriones.** Que un vecino cobre una experiencia toca normativa turística, fiscalidad y seguros. *Arreglo:* nombrarlo como riesgo con el encaje «Por verificar» y una alternativa sin cobro: experiencias de asociaciones o gratuitas en el piloto. Afecta a negocio.
6. **Experiencias reales, no inventadas.** Es una regla de Esther. En la demo y en la presentación, cada experiencia es real y lleva fuente, o se marca como ejemplo. Afecta a prototipo y pitch.
7. **Marca «Tenerife despierta emociones».** Su vigencia está «Por verificar». Si no se verifica, no se cita como apoyo. Afecta a investigación.

Lo que ya puntúa: el nombre y la metáfora de las tres piedras dan corresponsabilidad e identidad tinerfeña (relato). El ámbito es la isla entera con zonas rurales. El vecino de zona turística es la persona principal. Los puntos físicos sirven a quien no está en redes. El fondo de barrio es visible.

## Registro · 12-11-2026 · «Canarias» presentado como Tenerife

Revisado en el código. No lo he comprobado en el navegador porque las pestañas están en construcción.

| # | Dónde | Qué se ve | Gravedad | Dueño |
|---|---|---|---|---|
| 1 | `/diagnostico` (`src/pages/Investigacion.tsx:85-86`) | Kicker «Investigación previa · antes de conocer el reto» y título «El turismo en Canarias, de un vistazo». El entregable Diagnóstico es hoy la investigación de Canarias. | Alta | investigación |
| 2 | `/diagnostico`, Resumen (`CIFRAS_2025`, `CIFRAS_2026` en `src/data/investigacion.ts`) | Cifras de Canarias sin la palabra «Canarias» en la etiqueta: «Turistas totales 18,4 M», «Viviendas vacacionales 42.367», «Ocupación 82,2 %». Un jurado de Tenerife las lee como de la isla. | Alta | investigación |
| 3 | `/diagnostico`, Mapa por islas y De dónde vienen (`Investigacion.tsx:123,130`, `MapaIslas`, `Mercados`) | «Canarias por islas», «Lanzarote vive del británico; La Palma, del alemán…». Sirve solo como comparación de Tenerife con el resto, y declarada. | Media | investigación (`MapaIslas` y `Mercados` son del coordinador) |
| 4 | `/diagnostico`, Temas y retos, Benchmark y Datos y criterios (`DEBATES`, `RETOS_TIPO`, `FORMATO_HACKATHON`, `PENDIENTE_VERIFICAR`) | Temas regionales («única comunidad que pierde turistas», «Canarias Destino 2026») y material interno del hackathon («No hay criterios publicados…», «Talento Canario busca…»). Esto último no es diagnóstico y no debe verlo el jurado. | Media | investigación |
| 5 | `/tenique`, demo del kit (`src/prototipo/pantallas.tsx:76,113-116`) | «Canarias sin conexión», pins en Gran Canaria y Lanzarote. Son pantallas de ejemplo y deben desaparecer. El mapa (`Mapa` en `piezas-flujo.tsx`) dibuja todo el archipiélago: usar `islasActivas={['tenerife']}` o un mapa solo de Tenerife. | Media | prototipo |
| 6 | `src/data/usuarios.ts:47` | «Journey genérico del turista en Canarias». La pestaña Usuarios está oculta (`visible: false`): no se ve. | Baja | usuarios |

Sin problema: Inicio («Bajo el cielo de Tenerife», Tenique), Plan de acción (`viabilidad.ts`), Responsabilidades y `presentacion.ts` no mencionan Canarias. «Talento Canario · Gobierno de Canarias» en el pie es el organizador y es correcto. «Academia Canaria de la Lengua» es la fuente de «tenique» y es correcto.

## Registro · 12-11-2026 · revisión completa (versión local)

Revisión hecha sobre la versión local. Además del PDF, se tiene en cuenta lo que pidió quien presentó el reto en nombre de Turismo de Tenerife: participación real de los afectados («probar, medir y cambiar»), retorno explicado en lenguaje sencillo y desglosado, fondo de empresas por zonas, corresponsabilidad también del residente, foco ahora en el residente, y Turismo de Tenerife dedicado a promoción y gestión del destino, no a obras.

### Técnica: ✅
- ✅ `npx tsc --noEmit`, sin errores.
- ✅ `vite build`, sin errores (salida fuera del repositorio, ya borrada).
- ✅ `npm run revisar:entrega`: 0 errores. Hay 2 avisos (falta el vídeo de preview y el LinkedIn de Javier es una búsqueda) y 1 dato «Por verificar» (`REFERENTES[9]`, Venecia).
- ✅ Sin desbordes horizontales a 390 ni a 1280 px en Inicio, en las 8 sub-pestañas de Diagnóstico, en Tenique, Plan, Responsabilidades y Presentación, y en `#/app`.
- ✅ Contraste: `--app-accent` es ahora `#a8380f` (blanco encima, 6,5:1). No hay imágenes sin `alt` ni botones sin nombre en `#/app`.
- ✅ No se ve ningún texto interno: las rutas `src/…` y `public/…` van dentro de `SoloLocal` y solo aparecen con `npm run dev`. Única excepción: «script en scripts/datos/descargar.mjs», en Fuentes.
- ✅ Web publicada (versión anterior): carga, y `#/app` funciona en un móvil emulado de 390 px, sin desbordes.
- ✅ Enlaces de `FUENTES`: 84 de 85 responden 200. La [37] (Iberostar) devuelve 403 a los robots y hay que abrirla a mano.
- ✅ Raíz limpia: sin `dist/` ni `tsconfig.tsbuildinfo`.

### Lo que pidió Turismo de Tenerife en la presentación del reto
| Petición | Estado | Prueba |
|---|---|---|
| Probar, medir y cambiar | ✅ | Plan: piloto de 6 meses con umbrales «seguimos si / paramos si» y encuesta antes y después. |
| Participación real de los afectados | ❌ | Las personas y las hipótesis H1–H11 están sin contrastar: no hay ni una voz real de vecinos. |
| Retorno en lenguaje sencillo y desglosado | ✅ | «Qué deja el turismo en tu municipio» (12 municipios), con lo que se sabe y lo que nadie publica, también dentro de la app. |
| Fondo de las empresas por zonas | ✅ | Una cuenta por municipio. Lo pagan sobre todo las empresas y la vivienda vacacional, y el Cabildo «suma, no sostiene». |
| Corresponsabilidad del residente | ⚠️ | El residente avala, vota y ofrece, pero no aporta nada material y no se dice por qué. La ecotasa mínima para residentes no se menciona. |
| Foco ahora en el residente | ⚠️ | La pregunta del pitch y la persona principal ponen al residente en el centro, pero la app abre con «Estoy de visita» como primera opción. |
| Turismo de Tenerife no hace obras | ⚠️ | Las obras las hacen los ayuntamientos ✅. Pero el pitch llama a Turismo de Tenerife «quien la regula», y le asigna los dinamizadores de barrio y la gestión del fondo sin justificarlo como gestión del destino. |

### Puntuación por criterio (sin pesos)
| Criterio | Nota | Por qué |
|---|---|---|
| Viabilidad | **Fuerte** | Hoja de ruta en 5 fases con decisión en los meses 9 y 24. Hay tabla legal (figura del fondo, anfitriones, IGIC, seguros, RGPD), costes con simulador y supuestos marcados, y en el piloto los vecinos no cobran. |
| Sociedad en su conjunto | **Justo** | Hay puntos físicos, votación en papel, KPI por edad y zona rural, municipio rural en el piloto y Tenerife es tuya (mayores y colectivos). Falta la participación real de los afectados. |
| Factor humano | **Justo** | En el plan sí hay personas (dinamizadores, anfitriones). Pero la pestaña Tenique es solo un teléfono, y la demo empieza por el visitante. |
| Turismo responsable | **Fuerte** | Hay un KPI de gasto que se queda en el barrio (85 % supuesto), fondo por municipio con cartel en la calle y transparencia por municipio. |
| Innovación | **Justo** | La triple validación, el fondo votado por el barrio y la búsqueda por emoción ligada a la marca vigente son originales. Pero la demo vende plazas de 10 € en romerías y procesiones, y el propio diagnóstico dice que apenas hay vecinos anfitriones. |

### Arreglos, de más a menos grave
1. **El pitch no cuenta ni el plan ni el fondo.** Problema: las 7 diapositivas no hablan del fondo, del piloto ni de qué pone cada agente, y el guion de la 7 sigue con «[destacado 1]» y «[Piloto…]». Dónde: `src/data/presentacion.ts` y `docs/pitch-guion.md`. Por qué importa: viabilidad e impacto, dos de los cinco criterios, no se oyen en los 5 minutos, y «lo que más cuenta es la claridad y la fuerza de la idea». Arreglo: en la diapositiva 6 o en una nueva, contar en una frase quién paga el fondo, quién decide en qué se gasta y el piloto (3 municipios, 6 meses, umbral). Rellenar la diapositiva 7 con el plan. Recortar la 5 si no cabe. Dueño: **pitch**.
2. **«Quien la regula, que es Turismo de Tenerife».** Problema: Turismo de Tenerife promociona y gestiona el destino; no regula actividades. Dónde: diapositiva 6 de `presentacion.ts` («Quien la regula comprueba…») y el guion de la diapositiva 6, punto 2. Por qué importa: el jurado es Turismo de Tenerife y lo corregirá en directo. Arreglo: «quien cuida el destino» o «quien da la garantía». Dueño: **pitch**.
3. **Ninguna voz real de vecinos.** Problema: las personas, el recorrido y H1–H11 son hipótesis. Dónde: Diagnóstico, «A quién le pasa» y «Causas». Por qué importa: quien presentó el reto pidió participación real de los afectados, y sin ella «Sociedad en su conjunto» se queda en «justo». Arreglo: hacer hoy 5–8 entrevistas cortas con el guion (`docs/usuarios-guion-tenique.md`). Publicar las citas con su código y `validado: true`, y decir qué hipótesis se confirman o se caen. Si no se llega, decirlo en el pitch como primer paso del piloto. Dueños: **usuarios** e **investigación**.
4. **La demo empieza por el visitante y vende plazas en fiestas populares.** Problema: la primera opción es «Estoy de visita». La ficha de una procesión (Embarcación de la Virgen del Carmen) muestra «Plaza Tenique 10 € · Reservar». Dónde: `src/prototipo/pantallas.tsx`. Por qué importa: choca con «foco ahora en el residente», con el miedo de la persona («que su barrio se convierta en un decorado») y con el propio plan (en el piloto los vecinos no cobran). Arreglo: poner «Vivo en Tenerife» primero. En fiestas y actos religiosos, la experiencia es «acompañado por un vecino», gratis o con donación al fondo, nunca una plaza de pago en la fiesta. En la demo, enseñar primero una experiencia con anfitrión. Dueño: **prototipo**.
5. **La pestaña Tenique no explica el programa.** Problema: dice «Entregable · prototipo · La solución, navegable» y solo muestra el teléfono. Dónde: `src/pages/Prototipo.tsx`. Por qué importa: quien entra por esa pestaña ve una app, y salta la alerta «solo digital». Arreglo: un bloque corto antes del teléfono con las tres partes (personas, puntos físicos, app), la triple validación y el fondo, enlazando a Plan y Responsabilidades. Cambiar el kicker a «La propuesta». Dueño: **coordinador**.
6. **No se dice qué pone el residente.** Problema: el residente decide y avala, pero no se dice qué aporta. Tampoco se responde a la idea de la ecotasa mínima para residentes. Dónde: `src/data/responsabilidades.ts` y el fondo en `viabilidad.ts`. Por qué importa: el representante de Turismo de Tenerife lo planteó, y saldrá en las preguntas. Arreglo: escribir qué pone el residente (tiempo como anfitrión, aval, voto, y el 10 % cuando reserva a precio de residente). Añadir la ecotasa mínima como opción estudiada, sí o no y por qué, marcada como supuesto. Respuesta preparada en `docs/pitch-preguntas.md`. Dueños: **negocio** (responsabilidades y viabilidad) y **pitch**.
7. **El papel de Turismo de Tenerife va más allá de su función.** Problema: contrata dinamizadores de barrio, gestiona el fondo y hace las encuestas. Dónde: Plan, fase 1, y la ficha de Turismo de Tenerife en Responsabilidades. Por qué importa: dijeron que su papel es la promoción y la gestión del destino. El jurado puede ver un encargo que no es suyo. Arreglo: justificar cada tarea como gestión del destino, o pasar los dinamizadores a Cabildo y ayuntamientos y dejar a Turismo de Tenerife la garantía, la difusión, la medición y la publicación. Dueño: **negocio**.
8. **Incoherencias entre pestañas.**
   - «Valorada por quien la vivió» son «vecinos y visitantes» en el pitch, pero «turistas que asistieron» en Responsabilidades.
   - La piedra 2 se llama «Visitantes» y mete a empresas y vivienda vacacional, mientras Inicio dice «vecinos, visitantes e instituciones».

   Arreglo: unificar. En la valoración, «vecinos y visitantes». En la piedra 2, nombrarla para que se vea a las empresas, o explicarlo en una frase. Dueños: **negocio** (responsabilidades) y **pitch**.
9. **Falta el vídeo de preview.** Inicio muestra «Vídeo en preparación.» al jurado. Arreglo: subir `public/video/preview.mp4` u ocultar el bloque si no hay vídeo. Dueños: **Esther** y **coordinador**.
10. **Las secciones siguen «En curso».** Las 5 pestañas visibles tienen `estado: 'en-curso'`. Arreglo: pasar a «listo» lo que se entregue, justo antes de la entrega. Dueño: **coordinador** (`proyecto.ts`).
11. **Menores.**
   - LinkedIn de Javier: es una búsqueda. Dueños: Esther y coordinador.
   - «Javier» aparece como revisor en la tabla legal del Plan: usar el rol («equipo Nova») o la entidad. Dueño: negocio.
   - «script en scripts/datos/descargar.mjs» se ve en Fuentes. Dueño: investigación.
   - H11 aparece antes que H10 en Causas. Dueño: investigación.
   - Abrir la [37] a mano. Dueño: investigación.

### Veredicto
**No lista para entregar todavía, pero cerca.** La web es sólida en lo técnico, en el diagnóstico (Tenerife, con fuentes, y con lo que Tenique no resuelve y quién debe resolverlo), en el plan y en el mapeo. Lo que falta pesa en la nota:
- Imprescindible: arreglos 1 a 4 (pitch con plan y fondo, papel correcto de Turismo de Tenerife, voces reales y demo centrada en el residente), más el 9 y el 10 justo antes de entregar.
- Muy recomendable: 5 a 8.
- Con lo imprescindible resuelto, la estimación pasaría a «fuerte» en sociedad en su conjunto y factor humano, e innovación quedaría entre «justo» y «fuerte».
