import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { EQUIPO_NOMBRE, EVENTO, REPO_URL, SECCIONES } from './config/proyecto'
import { Icon } from './components/Icon'
import { NovaMark } from './components/NovaMark'
import Inicio from './pages/Inicio'
import Investigacion from './pages/Investigacion'
import Usuarios from './pages/Usuarios'
import Prototipo from './pages/Prototipo'
import Presentacion from './pages/Presentacion'

const PAGINAS: Record<string, () => JSX.Element> = {
  investigacion: Investigacion,
  usuarios: Usuarios,
  prototipo: Prototipo,
  presentacion: Presentacion,
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
  return (
    <>
      <ScrollTop />
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
