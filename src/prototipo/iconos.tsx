import { Icon } from '../components/Icon'

// Iconos extra del prototipo. Si el nombre no está aquí, se usa el de components/Icon.tsx
// (star, arrow, left, right, up, external, play, check, alert, globe, box, home, search, user, map, heart, calendar, phone…).
const EXTRA: Record<string, string> = {
  restart: 'M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5',
  pin: 'M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  ticket: 'M4 8a2 2 0 0 0 0 4v4h16v-4a2 2 0 0 1 0-4V4H4zM14 4v16',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  briefcase: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  wifi: 'M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.5v.01',
  x: 'M6 6l12 12M18 6L6 18',
  mountain: 'M2 20l7-12 4 6 3-4 6 10z',
  leaf: 'M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l7-7',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 3.5 6',
  sello: 'M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6zM8.5 12l2.5 2.5 4.5-5',
  fogon: 'M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-4 0-7zM4 21l3-4M20 21l-3-4M9 21h6',
  plus: 'M12 5v14M5 12h14',
  euro: 'M17 6.5A6.5 6.5 0 1 0 17 17.5M4 10h9M4 14h9',
  cesta: 'M4 10h16l-1.5 9h-13zM8 10l3-6M16 10l-3-6M9 14v2M12 14v2M15 14v2',
  copa: 'M7 3h10c0 5-2 8-5 8s-5-3-5-8zM12 11v8M8 20h8',
  ola: 'M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M7 10c0-3 2.5-5 5-5',
}

export function Ico({ name, size = 18, fill = false }: { name: string; size?: number; fill?: boolean }) {
  if (!EXTRA[name]) return <Icon name={name} size={size} fill={fill} />
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={EXTRA[name]} />
    </svg>
  )
}
