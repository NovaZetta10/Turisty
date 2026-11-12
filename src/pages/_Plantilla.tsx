// ─────────────────────────────────────────────────────────────────────────────
//  PLANTILLA DE PESTAÑA · no se publica (los archivos que empiezan por _ se ignoran)
//  Para añadir una pestaña:
//   1. Copia este archivo a src/pages/Nombre.tsx (p. ej. Negocio.tsx).
//   2. Añade en SECCIONES (src/config/proyecto.ts) una entrada con id 'nombre' (en minúsculas,
//      igual que el archivo) y ruta '/nombre'. App.tsx la registra sola.
//   3. Los datos, en src/data/nombre.ts. Aquí solo maquetación.
//   4. Si necesitas CSS propio: src/styles/nombre.css e impórtalo aquí (import '../styles/nombre.css').
//  Bloques disponibles: Tarjeta, Rejilla, Cifra (components/Tarjeta), Barras, Linea (components/Grafico),
//  Tabla (components/Tabla), Vacio (components/Vacio), Refs y Verificado (components/Refs).
// ─────────────────────────────────────────────────────────────────────────────
import { SECCIONES } from '../config/proyecto'
import { Barras, Linea, type Punto } from '../components/Grafico'
import { Tabla, type Columna } from '../components/Tabla'
import { Cifra, Rejilla, Tarjeta } from '../components/Tarjeta'
import { Vacio } from '../components/Vacio'

const ID = 'nombre' // ← el id de esta pestaña en SECCIONES

// Datos: muévelos a src/data/<id>.ts. Cada dato con fuente (número de FUENTES en investigacion.ts).
const CIFRAS: { valor: string; etiqueta: string; detalle?: string; fuentes: number[]; verificado: boolean }[] = []
const COMPARA: Punto[] = []
const EVOLUCION: Punto[] = []
type Fila = { nombre: string; valor: string }
const FILAS: Fila[] = []
const COLUMNAS: Columna<Fila>[] = [
  { clave: 'nombre', titulo: 'Nombre' },
  { clave: 'valor', titulo: 'Valor', num: true },
]

export default function Plantilla() {
  const s = SECCIONES.find((x) => x.id === ID)
  const vacio = CIFRAS.length + COMPARA.length + EVOLUCION.length + FILAS.length === 0
  return (
    <div className="wrap">
      <header className="page-head enter">
        <span className="kicker">Entregable · {s?.corto ?? ID}</span>
        <h1>{s?.titulo ?? 'Título de la pestaña'}</h1>
        <p>{s?.resumen}</p>
      </header>

      {vacio && <Vacio titulo="Sin contenido todavía">Rellena los datos de esta pestaña.</Vacio>}

      {CIFRAS.length > 0 && (
        <section>
          <Rejilla cols={4}>{CIFRAS.map((c) => <Cifra key={c.etiqueta} {...c} />)}</Rejilla>
        </section>
      )}

      {(COMPARA.length > 0 || EVOLUCION.length > 0) && (
        <section className="section">
          <div className="section-head"><div><h2>Título de bloque</h2><p>Una frase que diga qué se ve.</p></div></div>
          <div className="grid g2">
            {COMPARA.length > 0 && <Barras titulo="Comparación" datos={COMPARA} fuentes={[]} />}
            {EVOLUCION.length > 0 && <Linea titulo="Evolución" datos={EVOLUCION} fuentes={[]} />}
          </div>
        </section>
      )}

      {FILAS.length > 0 && (
        <section className="section">
          <Tabla titulo="Tabla" columnas={COLUMNAS} filas={FILAS} fuentes={[]} />
        </section>
      )}

      <section className="section">
        <Rejilla cols={3}>
          <Tarjeta kicker="01" titulo="Tarjeta enlazada" href="/prototipo">Texto breve.</Tarjeta>
        </Rejilla>
      </section>
    </div>
  )
}
