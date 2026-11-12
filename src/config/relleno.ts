// Detección de texto de relleno: todo lo que va entre [corchetes] es un hueco por rellenar.
// Lo usan la web (avisos y filtros) y scripts/revisar.mjs (comprobación antes de entregar).

const HUECO = /\[[^\]\n]{2,}\]/

/** true si algún texto (en cualquier nivel del objeto) contiene un hueco [así]. */
export function tieneRelleno(x: unknown): boolean {
  if (typeof x === 'string') return HUECO.test(x)
  if (Array.isArray(x)) return x.some(tieneRelleno)
  if (x && typeof x === 'object') return Object.values(x).some(tieneRelleno)
  return false
}
