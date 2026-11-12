import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { EQUIPO_NOMBRE, EVENTO, REPO_URL, SECCIONES } from './config/proyecto'
import { Icon } from './components/Icon'
import { NovaMark } from './components/NovaMark'
import { Cielo } from './components/Cielo'
import Inicio from './pages/Inicio'
import { Movil } from './prototipo/Movil'

/**
 * Registro automático de páginas: src/pages/Nombre.tsx se asocia a la sección con id 'nombre'.
 * Pestaña nueva = copiar src/pages/_Plantilla.tsx a src/pages/Nombre.tsx + una entrada en SECCIONES.
 * Los archivos que empiezan por _ no se registran.
 */
const PAGINAS: Record<string, () => JSX.Element> = Object.fromEntries(
  Object.entries(import.meta.glob<{ default: () => JSX.Element }>(['./pages/*.tsx', '!./pages/_*.tsx'], { eager: true }))
    .map(([ruta, m]) => [ruta.slice(8, -4).toLowerCase(), m.default] as const)
    .filter(([id]) => !id.startsWith('_')),
)

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <button className={`totop no-print ${show ? 'on' : ''}`} aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <Icon name="up" size={18} />
    </button>
  )
}

export default function App() {
  const visibles = SECCIONES.filter((s) => s.visible)
  const { pathname } = useLocation()
  // Prototipo a pantalla completa (#/app): sin cabecera ni pie, para abrirlo desde el QR en el móvil.
  if (pathname === '/app') return <div className="app-escena"><Movil completo /></div>
  return (
    <>
      <ScrollTop />
      <Cielo />
      <header className="topbar">
        <div className="wrap topbar-inner">
          <Link to="/" className="brand">
            <NovaMark size={26} />
            <span><span className="wordmark">{EQUIPO_NOMBRE.toLowerCase()}</span><small>{EVENTO.nombre}</small></span>
          </Link>
          <nav className="nav" aria-label="Secciones">
            <NavLink to="/" end>Inicio</NavLink>
            {visibles.map((s) => <NavLink key={s.id} to={s.ruta}>{s.corto}</NavLink>)}
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          {visibles.map((s) => {
            const P = PAGINAS[s.id]
            return P ? <Route key={s.id} path={s.ruta} element={<P />} /> : null
          })}
          <Route path="*" element={<Inicio />} />
        </Routes>
      </main>
      <footer className="footer no-print">
        <div className="wrap">
          <span>Equipo {EQUIPO_NOMBRE} · {EVENTO.nombre} · {EVENTO.fecha}</span>
          {REPO_URL && <a href={REPO_URL} target="_blank" rel="noreferrer">Código en GitHub</a>}
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
