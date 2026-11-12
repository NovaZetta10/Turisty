import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { EQUIPO_NOMBRE, EVENTO, REPO_URL, RETO, SECCIONES } from './config/proyecto'
import { Icon } from './components/Icon'
import { NovaMark } from './components/NovaMark'
import { Cielo } from './components/Cielo'
import { Supernova } from './components/Supernova'
import Inicio from './pages/Inicio'
import { PausaFueraDePantalla } from './components/PausaFueraDePantalla'

// #/app y #/gestion se descargan solo cuando se abren
const Movil = lazy(() => import('./prototipo/Movil').then((m) => ({ default: m.Movil })))
const Gestion = lazy(() => import('./gestion/Gestion'))

/**
 * Registro automático de páginas: src/pages/Nombre.tsx se asocia a la sección con id 'nombre'.
 * Pestaña nueva = copiar src/pages/_Plantilla.tsx a src/pages/Nombre.tsx + una entrada en SECCIONES.
 * Los archivos que empiezan por _ no se registran.
 */
const CARGADORES = Object.fromEntries(
  Object.entries(import.meta.glob<{ default: ComponentType }>(['./pages/*.tsx', '!./pages/_*.tsx', '!./pages/Inicio.tsx']))
    .map(([ruta, cargar]) => [ruta.slice(8, -4).toLowerCase(), cargar] as const)
    .filter(([id]) => !id.startsWith('_')),
)
// Cada página es su propio fragmento: se descarga al abrirla (y el resto, en un rato de calma, para que cambiar de pestaña sea instantáneo).
const PAGINAS: Record<string, ComponentType> = Object.fromEntries(
  Object.entries(CARGADORES).map(([id, cargar]) => [id, lazy(cargar)] as const),
)
function usePrecarga(activa: boolean) {
  useEffect(() => {
    if (!activa) return
    const ric = (window as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback
    const lanzar = () => { Object.values(CARGADORES).forEach((c) => { c().catch(() => {}) }) }
    const id = ric ? ric(lanzar, { timeout: 4000 }) : window.setTimeout(lanzar, 2500)
    return () => { if (!ric) window.clearTimeout(id) }
  }, [activa])
}

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
  usePrecarga(pathname !== '/app' && pathname !== '/gestion')
  // Prototipo a pantalla completa (#/app): sin cabecera ni pie, para abrirlo desde el QR en el móvil.
  if (pathname === '/app') return <div className="app-escena"><Suspense fallback={null}><Movil completo /></Suspense></div>
  // Panel de gestión a pantalla completa (#/gestion), horizontal, para proyectar.
  if (pathname === '/gestion') return <Suspense fallback={null}><Gestion /></Suspense>
  return (
    <>
      <ScrollTop />
      <Cielo />
      <Supernova />
      <PausaFueraDePantalla />
      <header className="topbar">
        <div className="wrap topbar-inner">
          <Link to="/" className="brand">
            <NovaMark size={26} />
            <span><span className="wordmark">{EQUIPO_NOMBRE.toLowerCase()}</span><small>{EVENTO.nombre}</small></span>
          </Link>
          <nav className="nav" aria-label="Secciones">
            <NavLink to="/" end>Inicio</NavLink>
            {visibles.map((s) => <NavLink key={s.id} to={s.ruta} className={s.destacada ? 'nav-destacada' : undefined}>{s.destacada && <NovaMark size={14} className="nav-destacada-ic" />}{s.corto}</NavLink>)}
          </nav>
        </div>
      </header>
      <main>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          {visibles.map((s) => {
            const P = PAGINAS[s.id]
            return P ? <Route key={s.id} path={s.ruta} element={<P />} /> : null
          })}
          <Route path="*" element={<Inicio />} />
        </Routes>
        </Suspense>
      </main>
      <footer className="footer no-print">
        <div className="wrap">
          <span>Equipo {EQUIPO_NOMBRE} · {EVENTO.nombre} · {EVENTO.fecha}{RETO.definido && <> · Reto propuesto por {RETO.empresa}</>}</span>
          {REPO_URL && <a href={REPO_URL} target="_blank" rel="noreferrer">Código en GitHub</a>}
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
