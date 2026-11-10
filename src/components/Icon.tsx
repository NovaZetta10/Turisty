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
}

export function Icon({ name, size = 16, fill = false }: { name: keyof typeof PATHS | string; size?: number; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name] ?? ''} />
    </svg>
  )
}
