# Datos abiertos · cómo descargarlos

Probado el 11-11-2026. Script: `scripts/datos/descargar.mjs`. Necesita Node 18 o superior y no tiene dependencias.

## Uso rápido

```bash
node scripts/datos/descargar.mjs basico                         # 10 indicadores clave en CSV
node scripts/datos/descargar.mjs istac-lista aloja              # buscar indicadores del ISTAC
node scripts/datos/descargar.mjs istac ALOJATUR_PLAZAS_OCUPACION --geo islas --tiempo mensual
node scripts/datos/descargar.mjs ine 10823                      # Frontur por comunidad (INE)
node scripts/datos/descargar.mjs buscar "vivienda vacacional"   # catálogo de datos.canarias.es
```

- **Dónde se guarda:** por defecto, en la carpeta temporal del sistema (`%TEMP%\nova-datos` en Windows), fuera del repositorio.
- **Para el prototipo:** si va a cargar un CSV, usa `--salida public/data` y avisa al coordinador de la ruta y el formato.
- **Formato del CSV:** `territorio, codigo_territorio, periodo, medida, valor`, ordenado por territorio y periodo. Los periodos son `2026-09` (mes), `2026Q3` (trimestre) o `2025` (año).

## Qué hay y qué he comprobado

| Fuente | Acceso | Estado (11-11-2026) | Qué da |
|---|---|---|---|
| ISTAC · API de indicadores | `https://datos.canarias.es/api/estadisticas/indicators/v1.0/indicators` | Funciona, JSON, sin clave | 402 indicadores. Turistas mensuales hasta septiembre de 2026; alojamiento por las siete islas y por municipio. |
| INE · API Tempus | `https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/<tabla>` | Funciona, JSON, sin clave | Tabla 10823: extranjeros por comunidad, mensual. Tabla 23988: anual. |
| Catálogo datos.canarias.es (CKAN) | `https://datos.canarias.es/catalogos/general/api/3/action/package_search` | Funciona | Conjuntos del Gobierno, del ISTAC y del Cabildo de Tenerife (GTFS, paradas, senderos, registro turístico…). |
| Promotur / Observatorio | PDF en observatorioturisticodecanarias.com | Se descargan con curl | Conectividad aérea, cruceros, facturación y perfil por isla. Sin API: hay que leer el PDF. |
| AENA | aena.es, estadísticas (web y Excel) | La web responde; sin API | Los pasajeros por aeropuerto ya están en el ISTAC (`TRAFICO_AEREO_PASAJEROS*`). Mejor usar el ISTAC. |

## Indicadores del ISTAC más útiles

- **Turistas:**
  - `TURISTAS`, `TURISTAS_EXTRANJEROS`, `TURISTAS_NACIONALES`
  - mensual para Canarias y para cinco islas (sin La Gomera ni El Hierro)
  - el anual por islas solo llega a 2024
- **Gasto:**
  - `GASTO_TURISTICO`, `GASTO_TURISTICO_TURISTA`, `GASTO_TURISTICO_TURISTA_DIA`
  - trimestral; la encuesta excluye a los menores de 16 años
- **Alojamiento:**
  - `ALOJATUR_PLAZAS_OCUPACION`, `ALOJATUR_TARIFA_ADR`, `ALOJATUR_INGRESOS_HABITACION`, `ALOJATUR_ESTANCIAS_MEDIAS`, `ALOJATUR_PERNOCTACIONES`, `ALOJATUR_PLAZAS_OFERTADAS`, `ALOJATUR_VIAJEROS_ENTRADOS_*`
  - las siete islas
- **Aéreo:** `TRAFICO_AEREO_PASAJEROS`, más `…_LLEGADAS_GB`, `…_LLEGADAS_DE`, `…_LLEGADAS_EXTRANJEROS`, `…_LLEGADAS_NACIONALES_XCANARIAS` y `…_LLEGADAS_CANARIAS`.
- **Territorio:** `ENP_SUPERFICIE` (espacios naturales protegidos).

Comprobaciones de que los datos casan:
- `TURISTAS` de Canarias en 2025 suma 18.386.274, igual que Promotur (18,4 M) [1].
- Sumando los meses de 2025 por isla salen 18,34 M.
- Hasta septiembre de 2026: 13.425.149 turistas, un −0,66 % (ISTAC [46]). Extranjeros según el INE: 11.359.306, un −0,48 % [2].

## Licencias: qué podemos hacer con estos datos

| Fuente | Condiciones | Cómo citar |
|---|---|---|
| ISTAC | Reutilización permitida, también comercial. Hay que reconocer el origen y no desnaturalizar la información. | «Fuente: Instituto Canario de Estadística (ISTAC)» · [aviso legal](https://www.gobiernodecanarias.org/istac/aviso_legal.html) |
| INE | Reutilización permitida, comercial o no, de la información de la que el INE es fuente original. No se puede sugerir que el INE nos apoya. | «Fuente: INE» o «Elaboración propia con datos del INE» · [aviso legal](https://ine.es/dyngs/AYU/index.htm?cid=125) |
| Gobierno de Canarias (datos.canarias.es) | Cada organismo fija su licencia. Conviene mirarla en cada conjunto: el script la muestra. Los del Cabildo de Tenerife son CC BY. | «Fuente: Gobierno de Canarias» o el organismo del conjunto · [aviso legal](https://datos.canarias.es/portal/aviso-legal-y-condiciones-de-uso/) |
| Promotur / Observatorio | Informes públicos. No he encontrado una licencia explícita. | Citar el documento y su fecha. Por verificar antes de redistribuir los PDF. |

En la web y en el pitch, toda cifra sacada de aquí lleva su id de `FUENTES`.

## Si algo falla

- **El ISTAC devuelve 500:** pasa con algunas consultas de búsqueda (`?q=`). Usa `istac-lista` y filtra en local.
- **Error de `--geo` o `--tiempo`:** no todos los indicadores tienen todas las granularidades. Prueba con `--tiempo anual` o con `--geo canarias`.
- **Promotur cambia la URL de los PDF:** búscalos en la ficha de documentos del Observatorio (por ejemplo, la página de conectividad aérea).
