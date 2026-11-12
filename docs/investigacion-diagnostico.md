# Diagnóstico de Tenerife · de dónde sale cada cifra

Consultado el 12-11-2026. Las cifras están en `src/data/investigacion.ts` y se muestran en la pestaña Diagnóstico.

## Percepción de los residentes (fuentes 49–53)

- **Encuesta:** Hábitos y Confianza Socioeconómica (ECOSOC) del ISTAC, 2.º trimestre de 2026 y de 2024.
  - Residentes de 18 años o más.
  - Datos para Tenerife y sus tres grandes comarcas: Área metropolitana, Norte y Sur.
- **Cómo descargarla:** CSV en `https://datos.canarias.es/api/estadisticas/statistical-resources/v1.0/datasets/ISTAC/<ID>/1.0.csv`. Tablas usadas:
  - `C00086A_000493`: afirmaciones sobre el turismo, 2026.
  - `C00086A_000250`: lo mismo, 2024.
  - `C00086A_000491`: vínculo económico del hogar con el turismo.
  - `C00086A_000501`: tasa turística sí o no.
  - `C00086A_000504`: a qué destinarían la tasa (solo Canarias).
- **Cálculo:**
  - «% de acuerdo» = «muy de acuerdo» + «de acuerdo».
  - Filtros: `MEDIDAS_CODE = POBLACION_PORCENTAJE`, sexo y edad `_T`.
- **Tabla no usada:** la de valoración de la Administración (`C00086A_000497`). Varios servicios repiten exactamente los mismos porcentajes, así que la dejamos fuera hasta confirmarla con el ISTAC.

## Presión por municipio (fuentes 55–57)

- **Fórmula:** plazas por cada 100 habitantes = (plazas de hoteles y apartamentos + plazas de vivienda vacacional) / población × 100.
- **Hoteles y apartamentos:** indicador `ALOJATUR_PLAZAS_OFERTADAS`, municipios, septiembre de 2026.
  - El ISTAC solo lo publica para los municipios turísticos.
  - En la tabla, «s. d.» significa que no está publicado.
- **Vivienda vacacional:** conjunto `C00065A_000061` (estadística experimental), plazas disponibles en septiembre de 2026, con el filtro `INTERVALOS_PLAZAS_CODE = _T`.
- **Población:** indicador `POBLACION`, municipios, 2025. Tenerife tiene 966.469 habitantes.
- **Isla completa:** (129.113 + 77.001) / 966.469 = 21,3 plazas por cada 100 habitantes.

## Turistas y retorno

- **2025:** 7.561.659 turistas, 9.134 M€ de facturación, 96.750 afiliados en turismo y el 44,4 % de los contratos. Fuente: balance de Turismo de Tenerife [8], págs. 5, 7, 141 y 142.
- **Enero a septiembre de 2026:** indicador `TURISTAS` del ISTAC por islas. Da 5.321.699 turistas frente a 5.449.526 en 2025 (−2,3 %).
  - Ojo: esa misma serie da hoy 7.412.046 para todo 2025.
  - Usamos el balance para el año completo y el ISTAC para las variaciones de 2026.
- **Afiliaciones en turismo:** indicador `AFILIACIONES_TURISMO`. En octubre de 2026 había 100.665 de un total de 433.080 afiliados, es decir, el 23,2 %.
- **Masca:** nota del Cabildo [59], comprobada en la página el 12-11-2026.

## Para repetir las descargas

```bash
node scripts/datos/descargar.mjs istac TURISTAS --geo islas --tiempo mensual
node scripts/datos/descargar.mjs istac ALOJATUR_PLAZAS_OFERTADAS --geo municipios --tiempo mensual
node scripts/datos/descargar.mjs istac POBLACION --geo municipios --tiempo anual
node scripts/datos/descargar.mjs buscar "afirmaciones sobre el turismo"
```

## Qué deja el turismo en tu municipio (fuentes 55, 69 y 70)

- **Ingresos de la vivienda vacacional:** conjunto `C00065A_000061`, medida `INGRESOS_TOTALES`, suma de los 12 meses de 2025. En Tenerife fueron 496,27 M€.
- **Gasto del ayuntamiento por habitante:** indicador `PRESUPUESTO_AYUNTAMIENTOS_LIQUIDADO_GASTO_HABITANTE`, año 2024, el último publicado. Es todo el presupuesto municipal, no solo lo que viene del turismo.
- **Paro registrado:** indicador `PARO_REGISTRADO`, municipios, octubre de 2026 frente a octubre de 2025.
- **Lo que no existe por municipio:** turistas, gasto turístico, empleo turístico, retorno fiscal y aportación del turismo a sanidad, educación o limpieza.
  - El indicador `EMPLEO_REGISTRADO_*` no devuelve datos por municipio.

## Competencias (fuentes 71–74)

- **Vivienda:**
  - Gobierno de Canarias: competencia exclusiva según el art. 143 del Estatuto [74]. También aprobó la Ley 6/2025 de vivienda vacacional [71].
  - Ayuntamientos: su planeamiento decide si se admite el uso turístico [71] y hacen las inspecciones [11].
- **Movilidad:**
  - Cabildo: carreteras, salvo las de interés autonómico, y transporte por carretera (Ley 8/2015, art. 6.2 c y d) [72].
  - Gobierno de Canarias: carreteras de interés autonómico [72].
  - Ayuntamientos: tráfico, aparcamiento y transporte colectivo urbano (Ley 7/1985, art. 25.2 g) [73].
