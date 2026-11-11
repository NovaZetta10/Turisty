import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

/** QR en SVG, generado en el navegador (sin servicios externos). */
export function Qr({ url, className = 's-qr' }: { url: string; className?: string }) {
  const [svg, setSvg] = useState('')
  useEffect(() => {
    QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#060a17', light: '#f6f2e9' } }).then(setSvg).catch(() => setSvg(''))
  }, [url])
  return <div className={className} aria-label={`Código QR: ${url}`} dangerouslySetInnerHTML={{ __html: svg }} />
}

/** Dirección base de la web publicada (configurable en SITIO_URL). */
export function urlBase(sitio: string) {
  if (sitio) return sitio.replace(/\/?$/, '/')
  return window.location.origin + window.location.pathname
}
