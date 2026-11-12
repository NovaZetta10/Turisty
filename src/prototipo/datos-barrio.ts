import { FUENTES, PRESION } from '../data/investigacion'

// «Qué deja el turismo en tu barrio»: datos REALES por municipio, con la fuente visible en cada uno.
// · Vivienda vacacional y empleo: lista verificada por Investigación (VERIFICADOS, abajo), que manda.
//   Para el resto de municipios se construye el mismo dato desde PRESION (src/data/investigacion.ts), misma fuente ISTAC.
// · Camas por cada 100 vecinos y gasto del ayuntamiento: desde PRESION.
// · Turistas por municipio y retorno en servicios públicos no existen: la pantalla dice «Hoy este dato no se publica».
// Lo que aporta Tenique al fondo y en qué se gasta son valores de demostración: van aparte y marcados «ejemplo».

type T = { es: string; en: string }
export type FuenteDato = { medio: string; titulo: string; url: string; id?: number }
export type FilaDato = {
  id: string
  etiqueta: T
  valor?: string
  /** Texto del dato cuando es una frase (va debajo de la etiqueta, no a la derecha). */
  frase?: string
  /** Aclaración que acompaña al dato (p. ej. qué NO significa). */
  nota?: T
  fuentes: FuenteDato[]
  noSePublica?: boolean
}

const VV: FuenteDato = { medio: 'ISTAC', titulo: 'Viviendas vacacionales por municipio (estadística experimental), septiembre de 2026', url: 'https://www3.gobiernodecanarias.org/istac/statistical-visualizer/visualizer/data.html?resourceType=dataset&agencyId=ISTAC&resourceId=C00065A_000061&version=1.30' }
const EMP: FuenteDato = { medio: 'ISTAC', titulo: 'ECOSOC 2026: vínculo económico del hogar con el sector turístico, por comarcas', url: 'https://www3.gobiernodecanarias.org/istac/statistical-visualizer/visualizer/data.html?resourceType=dataset&agencyId=ISTAC&resourceId=C00086A_000491&version=1.0' }

/** Hogares con vínculo económico con el turismo, por comarca (ECOSOC 2026). Es el desglose más fino que publica el ISTAC. */
const COMARCA: Record<string, T> = {
  Norte: { es: 'Comarca Norte: el 12,8 % de los hogares tiene vínculo económico con el turismo', en: 'North district: 12.8% of households are economically linked to tourism' },
  Sur: { es: 'Comarca Sur: el 44,6 % de los hogares tiene vínculo económico con el turismo', en: 'South district: 44.6% of households are economically linked to tourism' },
  'Área metropolitana': { es: 'Comarca Área metropolitana: el 11,5 % de los hogares tiene vínculo económico con el turismo', en: 'Metropolitan district: 11.5% of households are economically linked to tourism' },
}

/** Verificados por Investigación (12-11-2026): viviendas vacacionales disponibles, plazas y comarca. */
const VERIFICADOS: Record<string, { viviendas: number; plazas: number; comarca: string }> = {
  'Puerto de la Cruz': { viviendas: 1108, plazas: 3807, comarca: 'Norte' },
  Adeje: { viviendas: 4232, plazas: 18753, comarca: 'Sur' },
  Arona: { viviendas: 4810, plazas: 18270, comarca: 'Sur' },
  'San Cristóbal de La Laguna': { viviendas: 551, plazas: 2016, comarca: 'Área metropolitana' },
  'Santa Cruz de Tenerife': { viviendas: 903, plazas: 3345, comarca: 'Área metropolitana' },
  'Buenavista del Norte': { viviendas: 90, plazas: 350, comarca: 'Norte' },
}

const fuentesInv = (...ids: number[]): FuenteDato[] =>
  ids.map((id) => FUENTES.find((f) => f.id === id)).filter((f): f is NonNullable<typeof f> => !!f).map((f) => ({ id: f.id, medio: f.medio.split(' · ')[0], titulo: f.titulo, url: f.url }))

/** Municipios con algún dato real. */
export const MUNICIPIOS_CON_DATOS = [...new Set([...Object.keys(VERIFICADOS), ...PRESION.map((p) => p.nombre)])]

const ETQ = {
  turistas: { es: 'Turistas alojados al año en el municipio', en: 'Tourists staying per year in the town' },
  vv: { es: 'Vivienda vacacional', en: 'Holiday rentals' },
  empleo: { es: 'Hogares con vínculo económico con el turismo (por comarca)', en: 'Households economically linked to tourism (by district)' },
  camas: { es: 'Camas turísticas por cada 100 vecinos', en: 'Tourist beds per 100 residents' },
  gasto: { es: 'Gasto del ayuntamiento por vecino (2024)', en: 'Town council spending per resident (2024)' },
  retorno: { es: 'Retorno del turismo en sanidad, educación y limpieza', en: 'Tourism return in health, education and cleaning' },
}

export function datosDe(municipio: string, idioma: 'es' | 'en'): FilaDato[] {
  // es-ES no separa los miles en números de 4 cifras (2237); de-DE usa los mismos signos y sí lo hace (2.237).
  const n = (x: number) => x.toLocaleString(idioma === 'es' ? 'de-DE' : 'en-GB', { maximumFractionDigits: 0 })
  const p = PRESION.find((x) => x.nombre === municipio)
  const v = VERIFICADOS[municipio]
  const pendiente = (id: keyof typeof ETQ): FilaDato => ({ id, etiqueta: ETQ[id], fuentes: [] })

  const es = idioma === 'es'
  const vv = v
    ? (es ? `${n(v.viviendas)} viviendas vacacionales disponibles (${n(v.plazas)} plazas)` : `${n(v.viviendas)} holiday rentals available (${n(v.plazas)} places)`)
    : p ? (es ? `${n(p.plazasVV)} plazas de vivienda vacacional disponibles` : `${n(p.plazasVV)} holiday rental places available`) : undefined
  const comarca = COMARCA[v?.comarca ?? p?.zona ?? '']
  const empleo = comarca ? comarca[idioma] : undefined

  const filas: FilaDato[] = [
    { id: 'turistas', etiqueta: ETQ.turistas, noSePublica: true, fuentes: [] },
    vv ? { id: 'vv', etiqueta: ETQ.vv, frase: vv, fuentes: [VV] } : pendiente('vv'),
    empleo
      ? { id: 'empleo', etiqueta: ETQ.empleo, frase: empleo, nota: { es: 'No se publica el empleo turístico por municipio: la comarca es el desglose más fino.', en: 'Tourism jobs are not published by town: the district is the finest breakdown.' }, fuentes: [EMP] }
      : pendiente('empleo'),
  ]
  if (p) {
    const camas = ((p.plazasRegladas ?? 0) + p.plazasVV) / p.poblacion * 100
    filas.push(
      p.plazasRegladas == null
        ? { id: 'camas', etiqueta: { es: 'Camas en vivienda vacacional por cada 100 vecinos', en: 'Holiday rental beds per 100 residents' }, valor: n(camas), nota: { es: 'Las plazas de hoteles y apartamentos no se publican para este municipio.', en: 'Hotel and apartment places are not published for this town.' }, fuentes: fuentesInv(55, 57) }
        : { id: 'camas', etiqueta: ETQ.camas, valor: n(camas), fuentes: fuentesInv(55, 56, 57) },
      { id: 'gasto', etiqueta: ETQ.gasto, valor: `${n(p.gastoAyto)} €`, nota: { es: 'Es todo el presupuesto municipal, no lo que aporta el turismo.', en: 'This is the whole council budget, not what tourism contributes.' }, fuentes: fuentesInv(69) },
    )
  }
  filas.push({ id: 'retorno', etiqueta: ETQ.retorno, noSePublica: true, fuentes: [] })
  return filas
}
