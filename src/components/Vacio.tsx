import type { ReactNode } from 'react'
import { Icon } from './Icon'

/** Solo se ve en local (npm run dev). Para instrucciones al equipo que el jurado no debe leer. */
export function SoloLocal({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null
  return <span className="solo-local">{children}</span>
}

/**
 * Hueco reservado para un entregable que aún no existe.
 * `children`: texto para el público. `interno`: instrucciones para el equipo, solo en local.
 */
export function Vacio({ titulo, children, interno, icono = 'box' }: { titulo: string; children?: ReactNode; interno?: ReactNode; icono?: string | null }) {
  return (
    <div className="empty enter enter-2">
      <div>
        {icono && <Icon name={icono} size={32} />}
        <h3>{titulo}</h3>
        {children && <p>{children}</p>}
        {interno && <p><SoloLocal>{interno}</SoloLocal></p>}
      </div>
    </div>
  )
}
