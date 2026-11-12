// Iconos SVG en línea (sin dependencias). Añade más trazos aquí si hacen falta.
const PATHS: Record<string, string> = {
  star: 'M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  left: 'M15 6l-6 6 6 6',
  right: 'M9 6l6 6-6 6',
  up: 'M12 19V5M6 11l6-6 6 6',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  play: 'M8 5v14l11-7z',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  print: 'M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z',
  check: 'M5 12l5 5L19 7',
  alert: 'M12 8v5M12 16.5v.5M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  linkedin: 'M6 9v11M6 5.5v.5M10 20v-6a3 3 0 0 1 6 0v6M10 9v11',
  github: 'M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5 5 0 0 0-1.4-3.6 4.7 4.7 0 0 0-.1-3.6s-1.1-.3-3.6 1.4a12.3 12.3 0 0 0-6.4 0C6.1 1.1 5 1.4 5 1.4a4.7 4.7 0 0 0-.1 3.6A5 5 0 0 0 3.5 8.6c0 5 3 6.3 6 6.6a3 3 0 0 0-.9 2.3V21',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  box: 'M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10',
  home: 'M4 11l8-7 8 7M6 9.5V20h12V9.5M10 20v-5h4v5',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',
  heart: 'M12 20s-7-4.4-9-9a4.8 4.8 0 0 1 9-3 4.8 4.8 0 0 1 9 3c-2 4.6-9 9-9 9z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  phone: 'M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2',
  // las tres piedras: vecinos, visitantes (maleta), sector turístico (tienda); institución para quien enciende el fogón
  vecinos: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 11a2.5 2.5 0 1 0 0-5M17 14.5a5 5 0 0 1 4 5.5',
  maleta: 'M4 8h16v11H4zM9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 13h16M10 13v2h4v-2',
  institucion: 'M3 20h18M4 10h16M12 3l9 5H3zM6 10v8M10 10v8M14 10v8M18 10v8',
  tienda: 'M4 10l1.5-5h13L20 10M4 10h16M4 10a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5 11v9h14v-9M10 20v-5h4v5',
  llama: 'M12 21c3.5 0 6-2.4 6-5.6 0-3.6-3-5.4-3.6-8.9-1.8 1.5-2.4 3.6-2.4 3.6S10.5 8.6 9.6 6C7.2 8.6 6 11.4 6 15.4 6 18.6 8.5 21 12 21z',
}

export function Icon({ name, size = 16, fill = false }: { name: keyof typeof PATHS | string; size?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name] ?? ''} />
    </svg>
  )
}
