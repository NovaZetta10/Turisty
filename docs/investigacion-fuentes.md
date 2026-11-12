# Fuentes por tipo de reto · arranque rápido

Preparado el 11-11-2026, sin conocer el reto. Comprobé uno a uno los enlaces de este documento ese día.
Los números entre corchetes [n] son los ids de `FUENTES` en `src/data/investigacion.ts`.
Las órdenes `node scripts/datos/descargar.mjs …` se explican en `docs/investigacion-datos-abiertos.md`.

## Cómo arrancar en los primeros 15 minutos

1. Localiza el tipo de reto en la lista de abajo. Si toca varios, combina sus secciones.
2. Descarga lo básico: `node scripts/datos/descargar.mjs basico` y los indicadores de esa sección.
3. Abre la fuente primaria de cada cifra que vaya a salir en el pitch. Si el número coincide, `verificado: true`; si no, «Por verificar».
4. **Una sola serie de turistas para todo el proyecto.** Recomiendo **ISTAC / Promotur (Frontur-Canarias)**: incluye a los peninsulares, se desglosa por islas y es la que usan Promotur y el Observatorio. En 2025 son 18,39 M de turistas según el ISTAC; Promotur lo redondea a 18,4 M [1]. El INE solo cuenta extranjeros (15,69 M en 2025 [3]): úsalo únicamente para comparar Canarias con otras comunidades.
5. Las cifras que saquemos de la empresa del reto (web, notas de prensa) van con fuente nueva y fecha.

## Fuentes generales (todo reto)

| Qué | Dónde | Notas |
|---|---|---|
| Turistas, gasto y alojamiento | API de indicadores del ISTAC (`datos.canarias.es/api/estadisticas`) | Mensual, por isla y municipio. Turistas hasta septiembre de 2026. |
| Informes y fichas oficiales | [Observatorio Turístico de Canarias](https://observatorioturisticodecanarias.com/conectividad-aerea) (Promotur) | PDF de conectividad aérea, cruceros, facturación, perfil por isla [1] [41] [42] [43] [44] [45]. |
| Comparar con España | INE, tabla 10823 (Frontur por comunidad, mensual) y 23988 (anual) | Solo extranjeros. Canarias, ene–sep 2026: 11.359.306 (−0,48 %) [2]. |
| Catálogo de datos abiertos | [datos.canarias.es](https://datos.canarias.es/catalogos/general/) | 2.136 conjuntos al buscar «turismo». Buscar: `descargar.mjs buscar "<texto>"`. |
| Tenerife | Boletines mensuales de Turismo de Tenerife (en el catálogo, CC BY) | Balance anual de 2025 [8]. |

## Movilidad (guaguas, aeropuertos, conectividad, Teide)

- **Conectividad aérea:** capacidad regular del verano de 2026 [42] y del invierno 2026-27 [45], por isla y mercado.
- **Pasajeros aéreos (AENA vía ISTAC):** `TRAFICO_AEREO_PASAJEROS`, `…_LLEGADAS_GB`, `…_LLEGADAS_DE`, `…_LLEGADAS_EXTRANJEROS`, `…_LLEGADAS_NACIONALES_XCANARIAS`, `…_LLEGADAS_CANARIAS` (interinsulares).
- **Transporte público de Tenerife (CC BY):**
  - [GTFS de TITSA](https://datos.canarias.es/catalogos/general/dataset/informacion-sobre-el-sistema-de-transporte-de-titsa-en-tenerife)
  - [GTFS del tranvía](https://datos.canarias.es/catalogos/general/dataset/informacion-sobre-el-sistema-de-transporte-de-metropolitano-de-tenerife-tranvia1-1)
  - [paradas](https://datos.canarias.es/catalogos/general/dataset/paradas-de-guaguas-de-tenerife1)
  - [líneas y horarios](https://datos.canarias.es/catalogos/general/dataset/lineas-y-horarios-de-guaguas-del-transporte-publico-de-tenerife)
- **Hueco:** en el catálogo no encontré GTFS de Gran Canaria ni de las demás islas. Si el reto lo necesita, buscarlo en la web de cada operador.
- **Teide:** PRUG con lanzaderas y reserva de aparcamiento [27]; cámaras y contadores [26].
- **Referentes:** CopenPay [34], València Tourist Card [32], Tallinn Card [33].

## Espacios naturales y sostenibilidad

- **Datos:**
  - [Espacios Naturales Protegidos de Canarias (capas)](https://datos.canarias.es/catalogos/general/dataset/espacios-naturales-protegidos-de-canarias)
  - [superficie de los ENP (ISTAC)](https://datos.canarias.es/catalogos/general/dataset/superficie-de-los-espacios-naturales-protegidos-de-canarias1)
  - indicador `ENP_SUPERFICIE`
- **Tenerife (CC BY):** [itinerarios](https://datos.canarias.es/catalogos/general/dataset/itinerarios-de-la-isla-de-tenerife) y [puntos de interés](https://datos.canarias.es/catalogos/general/dataset/puntos-de-interes-de-la-isla-de-tenerife), en GeoJSON.
- **Hechos clave:** ecotasa del Teide [12] [13]; reservas por franjas [28]; Tenerife ON [29]; plan regenerativo de 48,3 M€ [15].
- **Referentes:** Venecia [30], Feroe [35], Islandia [36], Mālama Hawaiʻi [40], Iberostar [37].

## Alojamiento y vivienda vacacional

- **Indicadores del ISTAC por isla y mes:**
  - `ALOJATUR_PLAZAS_OCUPACION`, `ALOJATUR_TARIFA_ADR`, `ALOJATUR_INGRESOS_HABITACION` (RevPAR)
  - `ALOJATUR_ESTANCIAS_MEDIAS`, `ALOJATUR_PERNOCTACIONES`, `ALOJATUR_PLAZAS_OFERTADAS`, `ALOJATUR_VIAJEROS_ENTRADOS_*`
  - cubren las siete islas
- **Vivienda vacacional:**
  - [registro de viviendas vacacionales (CSV/JSON)](https://datos.canarias.es/catalogos/general/dataset/establecimientos-extrahoteleros-de-tipologia-vivienda-vacacional-inscritos-en-el-registro)
  - estadística experimental del ISTAC [10]
  - inspecciones municipales [11]
- **Tenerife (CC BY):** [alojamientos](https://datos.canarias.es/catalogos/general/dataset/alojamientos-turisticos-de-tenerife) y [plazas](https://datos.canarias.es/catalogos/general/dataset/plazas-de-alojamientos-turisticos-en-tenerife).
- **Por verificar:** la relación entre la Ley 6/2025 y la reforma de julio de 2026.

## Hoteles (cadenas, digitalización, IA)

- **Sector:** falta de personal [14]; Smart Data Canarias [16]; Retos Digitales de Ashotel [39].
- **Casos en Canarias:** Lopesan [22], Dunas Hotels [23], BlueBay Living Lab [24].
- **Casos fuera:** GHT Hotels (dato del proveedor) [38].
- **Datos:** los indicadores `ALOJATUR_*` de arriba y la facturación por mercado [43].

## Cruceros

- **Cifras:** 3,71 M de cruceristas en 2025 (+16,2 %) y 2,34 M hasta septiembre de 2026 (+8,2 %), por puerto [44].
- **Series del ISTAC:**
  - [pasajeros en Puertos del Estado por puerto y servicio](https://datos.canarias.es/catalogos/general/dataset/trafico-de-pasajeros-en-los-puertos-del-estado-de-las-islas-de-canarias-segun-puertos-y-servici1)
  - [pasajeros en Puertos Canarios](https://datos.canarias.es/catalogos/general/dataset/trafico-de-pasajeros-en-los-puertos-canarios-de-las-islas-de-canarias-segun-puertos-y-servicio-)
- **Ojo:** el dato de cruceristas viene de las autoridades portuarias; no se mezcla con turistas de Frontur.

## Comercio local

- **ISTAC, Canarias y España por meses:**
  - [índices de comercio al por menor](https://datos.canarias.es/catalogos/general/dataset/indices-de-comercio-al-por-menor-segun-grupos-de-venta-espana-y-comunidades-autonomas-por-20151)
  - [cifra de negocios a precios corrientes](https://datos.canarias.es/catalogos/general/dataset/indices-de-cifra-de-negocios-a-precios-corrientes-segun-grupos-de-venta-espana-y-canarias-20211)
- **Contexto:** Hackatón Impulso Comercio Canarias [20]; gasto de los extranjeros [3]; cruceristas por puerto [44].

## Talento y empleo

- **Afiliaciones en actividades características del turismo (ISTAC):**
  - [por islas y meses](https://datos.canarias.es/catalogos/general/dataset/afiliaciones-segun-situaciones-en-el-empleo-actividades-caracteristicas-del-turismo-y-nacionali1-2)
  - [Canarias y meses](https://datos.canarias.es/catalogos/general/dataset/afiliaciones-segun-situaciones-en-el-empleo-actividades-caracteristicas-del-turismo-y-nacionali1-1)
- **Contexto:** Talento Canario [18] [19]; falta de personal [14]; empleo en alojamiento −3 % en 2025 [1].

## Huecos conocidos

- La Gomera y El Hierro no salen en Frontur ni en el perfil del turista de Promotur. Para esas islas hay datos de alojamiento (`ALOJATUR_*`) y de pasajeros aéreos.
- El anual por islas de `TURISTAS` en el ISTAC llega a 2024. Para 2025, hay que sumar los meses.
- La previsión de cierre de 2026 de Excelcan [5] no es oficial.
