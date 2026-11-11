import { useEffect, useState } from 'react'

/** Anima la parte numérica de un texto como «18,4 M» o «-0,5 %» desde 0. */
export function Contador({ valor, ms = 1100 }: { valor: string; ms?: number }) {
  const m = valor.match(/-?\d+(?:[.,]\d+)?/)
  const [txt, setTxt] = useState(m ? valor.replace(m[0], m[0].replace(/\d/g, '0')) : valor)
  useEffect(() => {
    if (!m || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setTxt(valor); return }
    const fin = parseFloat(m[0].replace('.', '').replace(',', '.'))
    const dec = (m[0].split(',')[1] ?? '').length
    let raf = 0; const t0 = performance.now()
    const paso = (t: number) => {
      const p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3)
      const n = (fin * e).toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec })
      setTxt(valor.replace(m[0], n))
      if (p < 1) raf = requestAnimationFrame(paso)
    }
    raf = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf)
  }, [valor])
  return <>{txt}</>
}
