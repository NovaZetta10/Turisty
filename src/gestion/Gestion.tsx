import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { EMOCIONES } from '../prototipo/experiencias'
import { MapaGestion, type PuntoMapa } from './MapaGestion'
import {
  COLUMNAS, CUELLOS, SIN_MUNICIPIO, H_INICIO, PERFILES, PERIODOS, ROTULO_SIMULADO, SUCESOS, TARJETAS, TXT, CATALOGO,
  calcular, desdePeriodo, etapaDe, euros, experienciasFiltradas, indicadores, indicadoresPrueba, nivelDe, ocupacion, ocupacionBase, reloj, ultimoCambio,
  type DatosMuni, type Filtros, type Periodo, type PerfilFiltro, type Suceso,
} from './datos-simulados'
import { VOCES, detalleCadena, horaTxt, itemsDia, type Item } from './historia'
import './gestion.css'

type CapaId = 'exps' | 'visit' | 'fondo' | 'pueblos'
const CAPAS: { id: CapaId; corto: string; largo: string; color: string; real: boolean; unidad: string; valor: (d: DatosMuni) => number; fmt: (n: number) => string; etiq: (n: number) => string }[] = [
  { id: 'exps', corto: 'Experiencias', largo: 'Experiencias por municipio', color: 'var(--ice)', real: true, unidad: 'experiencias', valor: (d) => d.exps, fmt: (n) => String(n), etiq: (n) => String(n) },
  { id: 'visit', corto: 'Visitantes', largo: 'Dónde estarán los visitantes', color: 'var(--amber)', real: false, unidad: 'personas con reserva', valor: (d) => d.personas, fmt: (n) => `${n} pers.`, etiq: (n) => String(n) },
  { id: 'fondo', corto: 'Fondo', largo: 'Fondo e inversión por municipio', color: 'var(--ok)', real: false, unidad: 'al fondo', valor: (d) => d.aportado, fmt: euros, etiq: (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace('.', ',')}k` : String(Math.round(n))) },
  { id: 'pueblos', corto: 'A pueblos', largo: 'Visitantes llevados a pueblos', color: 'var(--gs-cian)', real: false, unidad: 'visitantes llevados', valor: (d) => d.llevados, fmt: (n) => `${n} pers.`, etiq: (n) => String(n) },
]
const NIVEL_TXT = { saturado: 'Zona con mucha afluencia', medio: 'Afluencia media', poco: 'Poco turismo' } as const
const VELOCIDAD = { dia: 24 / 36, semana: 168 / 48 }
const VEL_HISTORIA = [{ id: 0.6, es: 'Lenta' }, { id: 1, es: 'Normal' }, { id: 2, es: 'Rápida' }]
const HISTORIA_H0 = H_INICIO + 8, HISTORIA_H1 = H_INICIO + 23 // 08:00 → 23:00 del día 8 // horas simuladas por segundo real: un día en 36 s, una semana en 48 s
const DURACION = { dia: 24, semana: 168 }

const Pausa = () => <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
const Reinicio = () => <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5" /></svg>
const Giro = () => <svg width="56" height="56" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /><path d="M21 8c1.5 1.5 1.5 6.5 0 8M21 16l-1.5-1.8M21 16l1.7-1.4" opacity=".0" /></svg>

const num1 = (n: number) => (Math.round(n * 10) / 10).toLocaleString('es-ES')

function textoSuceso(s: Suceso) {
  if (s.tipo === 'reserva') return { t: `${s.personas} ${s.personas === 1 ? 'persona reserva' : 'personas reservan'} «${s.titulo}»`, m: s.muni, k: 'reserva' }
  if (s.tipo === 'aporte') return { t: `+${euros(s.euros)} de una empresa al fondo`, m: s.muni, k: 'aporte' }
  return { t: `Proyecto pagado: ${s.titulo} (${euros(s.coste)})`, m: s.muni, k: 'proyecto' }
}

function EventoDetalle({ item, h, onCerrar, onMapa }: { item: Item; h: number; onCerrar: () => void; onMapa: (m: string) => void }) {
  const d = detalleCadena(item.cadena)
  const voz = VOCES.find((v) => v.id === item.voz)
  return (
    <section className="gs-detalle gs-evento" aria-live="polite">
      <div className="gs-det-cab">
        <h2>{item.paso}</h2>
        <button type="button" className="gs-cerrar" onClick={onCerrar} aria-label="Cerrar el detalle del suceso">Cerrar</button>
      </div>
      <p className="gs-nivel">{horaTxt(item.h)} · punto de vista: {voz?.titulo.toLowerCase()} <em>(suceso simulado)</em></p>
      <p className="gs-ev-t">{item.texto}</p>
      {d && (
        <>
          <h3>{d.titulo} {item.titulo && <span className="gs-real">Título real del catálogo</span>}</h3>
          <ol className="gs-pasos">
            {d.pasos.map((p, i) => <li key={i} className={p.h <= h ? 'hecho' : ''}><time>{horaTxt(p.h)}</time><span>{p.texto}</span></li>)}
          </ol>
        </>
      )}
      <button type="button" className="gs-cerrar gs-ver" onClick={() => onMapa(item.muni)}>Ver {item.muni} en el mapa</button>
    </section>
  )
}

export default function Gestion() {
  const [capa, setCapa] = useState<CapaId>('exps')
  const [perfil, setPerfil] = useState<PerfilFiltro>('todos')
  const [emocion, setEmocion] = useState('todas')
  const [periodo, setPeriodo] = useState<Periodo>('prueba')
  const [muni, setMuni] = useState<string | undefined>()
  const [modo, setModo] = useState<'dia' | 'semana'>('dia')
  const [vista, setVista] = useState<'panel' | 'dia'>('panel')
  const [mult, setMult] = useState(1)
  const [evento, setEvento] = useState<Item | undefined>()
  const dia8 = vista === 'dia'
  const inicio = dia8 ? HISTORIA_H0 : H_INICIO
  const [h, setH] = useState(H_INICIO)
  const [jugando, setJugando] = useState(false)
  const hRef = useRef(H_INICIO)

  const fin = dia8 ? HISTORIA_H1 : H_INICIO + DURACION[modo]
  const vel = dia8 ? ((HISTORIA_H1 - HISTORIA_H0) / 50) * mult : VELOCIDAD[modo]
  useEffect(() => {
    if (!jugando) return
    const id = window.setInterval(() => {
      hRef.current = Math.min(fin, hRef.current + vel * 0.1)
      setH(hRef.current)
      if (hRef.current >= fin) setJugando(false)
    }, 100)
    return () => window.clearInterval(id)
  }, [jugando, vel, fin])

  const poner = (x: number) => { hRef.current = x; setH(x) }
  const reiniciar = (m = modo) => { setJugando(false); poner(inicio); setModo(m); setEvento(undefined) }
  const cambiarVista = (v: 'panel' | 'dia') => {
    if (v === vista) return
    setJugando(false); setVista(v); setEvento(undefined); setMuni(undefined)
    poner(v === 'dia' ? HISTORIA_H0 : H_INICIO)
    if (v === 'dia') setPeriodo('hoy')
  }
  const terminado = h >= fin
  const alternar = () => { if (terminado) poner(inicio); setJugando((j) => !j) }
  const elegirEvento = (it: Item) => { setJugando(false); setEvento(it); setMuni(undefined) }

  const filtros: Filtros = useMemo(() => ({ perfil, emocion }), [perfil, emocion])
  const desde = desdePeriodo(periodo, h)
  const datos = useMemo(() => calcular(desde, h, filtros), [desde, h, filtros])
  const llevadosAcum = useMemo(() => SUCESOS.reduce((t, s) => (s.tipo === 'reserva' && s.llevado && s.h <= h ? t + s.personas : t), 0), [h])
  const feeds = useMemo(() => (dia8 ? itemsDia(HISTORIA_H0, h, filtros) : []), [dia8, h, filtros])
  const kpis = useMemo(() => (periodo === 'prueba' ? indicadoresPrueba(h) : indicadores(h)), [h, periodo])
  const { dia, hora } = reloj(h)
  const def = CAPAS.find((c) => c.id === capa)!

  // Destello de los municipios que acaban de recibir un suceso.
  const ventana = vel * 1.4
  const destello = useMemo(() => {
    const r: Record<string, number> = {}
    if (!jugando) return r
    for (const s of datos.recientes) if (s.h > h - ventana) r[s.muni] = s.id
    return r
  }, [datos.recientes, h, ventana, jugando])

  const cuellos = useMemo(() => CUELLOS.map((c) => ({ ...c, ocu: ocupacion(c, h, llevadosAcum), base: ocupacionBase(c) })), [h, llevadosAcum])

  // Puntos del mapa
  const puntos: PuntoMapa[] = datos.lista.map((d) => {
    const cu = cuellos.filter((c) => c.muni === d.muni).sort((a, b) => b.ocu - a.ocu)[0]
    if (capa === 'pueblos' && cu) {
      return { muni: d.muni, valor: cu.ocu, etiqueta: `${cu.ocu}%`, saturado: cu.ocu, aria: `${d.muni}: ${cu.lugar}, ${cu.tipo === 'cupo' ? 'cupo del día' : 'afluencia'} al ${cu.ocu} % (simulado)` }
    }
    const v = def.valor(d)
    const sim = def.real ? '' : ' (simulado)'
    return {
      muni: d.muni, valor: v, etiqueta: def.etiq(v), ping: destello[d.muni],
      insignia: capa === 'fondo' && d.proyectos.length > 0,
      aria: `${d.muni}: ${def.fmt(v)} ${def.unidad}${sim}${capa === 'fondo' && d.proyectos.length ? `, ${d.proyectos.length} proyecto${d.proyectos.length === 1 ? '' : 's'} pagado${d.proyectos.length === 1 ? '' : 's'}` : ''}`,
    }
  })
  const ranking = datos.lista.filter((d) => !(capa === 'pueblos' && nivelDe(d.muni) === 'saturado')).map((d) => ({ d, v: def.valor(d) })).sort((a, b) => b.v - a.v || a.d.muni.localeCompare(b.d.muni))
  const maxRank = Math.max(1, ...ranking.map((r) => r.v))
  const totalCapa = ranking.reduce((s, r) => s + r.v, 0)
  const descMapa = `Mapa de Tenerife, capa «${def.largo}»${def.real ? ', dato real del catálogo' : ', datos simulados'}. Total: ${def.fmt(totalCapa)} ${def.unidad}. Más alto: ${ranking.slice(0, 5).filter((r) => r.v > 0).map((r) => `${r.d.muni}, ${def.fmt(r.v)}`).join('; ') || 'sin datos'}.`

  // Alertas
  const alertas = cuellos.filter((c) => c.ocu >= 70).sort((a, b) => b.ocu - a.ocu).slice(0, 3)
  const ultimoProyecto = [...SUCESOS].reverse().find((s) => s.tipo === 'proyecto' && s.h <= h)
  const feed = datos.recientes.length ? datos.recientes.slice(-3).reverse() : []

  // Kanban
  const tarjetas = TARJETAS.filter((t) => (emocion === 'todas' || t.emociones.includes(emocion)) && (perfil !== 'jovenes' || t.joven))
  const columnas = COLUMNAS.map((_, i) => tarjetas.filter((t) => etapaDe(t, h) === i).sort((a, b) => ultimoCambio(a, h) - ultimoCambio(b, h)))

  const detalle = muni ? datos.por[muni] : undefined
  const cuelloDetalle = muni ? cuellos.filter((c) => c.muni === muni) : []
  const expsDetalle = muni ? experienciasFiltradas(filtros).filter((e) => e.municipio === muni) : []
  const periodoTxt = PERIODOS.find((p) => p.id === periodo)!.largo

  return (
    <div className="gs">
      <div className="gs-girar" role="alert">
        <Giro />
        <strong>Gira el móvil</strong>
        <span>El panel de gestión está pensado para verse en horizontal.</span>
        <Link to="/">Volver a la web</Link>
      </div>

      <header className="gs-barra">
        <img className="gs-logo" src={import.meta.env.BASE_URL + 'img/marca/turismo-tenerife-blanco.png'} alt="Turismo de Tenerife" />
        <div className="gs-titulo"><h1>Panel de gestión</h1><span>Tenique · Turismo de Tenerife</span></div>
        <div className="gs-seg gs-vista" role="group" aria-label="Vista del panel">
          <button type="button" aria-pressed={!dia8} onClick={() => cambiarVista('panel')}>Panel</button>
          <button type="button" aria-pressed={dia8} onClick={() => cambiarVista('dia')}>Un día en Tenique</button>
        </div>
        <span className="gs-sim" role="status"><Icon name="alert" size={14} />{ROTULO_SIMULADO}</span>
        <div className="gs-demo" role="group" aria-label="Demo: simula a los usuarios usando el panel">
          <button type="button" className="gs-btn gs-btn-play" onClick={alternar} aria-label={jugando ? 'Pausar la demo' : terminado ? 'Repetir la demo' : 'Reproducir la demo'}>
            {jugando ? <Pausa /> : <Icon name="play" size={16} fill />}<span>{jugando ? 'Pausa' : terminado ? 'Repetir' : 'Demo'}</span>
          </button>
          <button type="button" className="gs-btn" onClick={() => reiniciar()} aria-label="Reiniciar la demo"><Reinicio /><span>Reiniciar</span></button>
          {dia8 ? (
            <div className="gs-seg" role="group" aria-label="Velocidad de la simulación">
              {VEL_HISTORIA.map((v) => <button key={v.id} type="button" aria-pressed={mult === v.id} onClick={() => setMult(v.id)}>{v.es}</button>)}
            </div>
          ) : (
            <div className="gs-seg" role="group" aria-label="Duración de la demo">
              {([['dia', 'Un día'], ['semana', 'Una semana']] as const).map(([id, t]) => <button key={id} type="button" aria-pressed={modo === id} onClick={() => modo !== id && reiniciar(id)}>{t}</button>)}
            </div>
          )}
          <span className="gs-reloj" aria-label={`Reloj simulado: día ${dia} de 14, ${hora}`}>{dia8 ? hora : `Día ${dia} · ${hora}`}</span>
        </div>
      </header>

      <div className="gs-filtros">
        <div className="gs-seg gs-capas" role="group" aria-label="Capa del mapa">
          {CAPAS.map((c, i) => <button key={c.id} type="button" aria-pressed={capa === c.id} aria-label={c.largo} onClick={() => setCapa(c.id)}>{c.corto}</button>)}
        </div>
        <div className="gs-grupo"><span id="gs-l-perfil">Perfil</span>
          <div className="gs-seg" role="group" aria-labelledby="gs-l-perfil">{PERFILES.map((p) => <button key={p.id} type="button" aria-pressed={perfil === p.id} onClick={() => setPerfil(p.id)}>{p.es}</button>)}</div>
        </div>
        <label className="gs-grupo"><span>Emoción</span>
          <select value={emocion} onChange={(e) => setEmocion(e.target.value)}>
            <option value="todas">Todas</option>
            {EMOCIONES.map((e) => <option key={e.id} value={e.id}>{e.es}</option>)}
          </select>
        </label>
        <div className="gs-grupo"><span id="gs-l-per">Periodo</span>
          <div className="gs-seg" role="group" aria-labelledby="gs-l-per">{PERIODOS.map((p) => <button key={p.id} type="button" aria-pressed={periodo === p.id} onClick={() => setPeriodo(p.id)}>{p.es}</button>)}</div>
        </div>
      </div>

      <main className="gs-cuerpo">
        <section className="gs-kpis" aria-label="Indicadores">
          <h2>{periodo === 'prueba' ? 'Prueba de concepto' : 'Indicadores del piloto'} <em>valores simulados · objetivos: supuesto</em></h2>
          <ul>
            {kpis.map((k) => (
              <li key={k.nombre} title={k.detalle || undefined}>
                <div className="gs-kpi-n">{k.nombre}</div>
                <div className="gs-barra-k" role="img" aria-label={`${k.nombre}: línea base ${k.base}, ahora ${k.actual}, objetivo ${k.obj} (${k.unidad}). Simulado.`}>
                  <i style={{ transform: `scaleX(${Math.max(0.02, k.fraccion)})` }} />
                </div>
                <div className="gs-kpi-v" aria-hidden="true"><span>{k.base}</span><b>{k.actual}</b><span>{k.obj}</span></div>
                <div className="gs-kpi-u" aria-hidden="true"><span>base</span><span>ahora · {k.unidad}</span><span>objetivo</span></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="gs-centro" aria-label={`Mapa: ${def.largo}`}>
          <div className="gs-mapa-cab">
            <h2>{def.largo}</h2>
            <span className={def.real ? 'gs-real' : 'gs-simtag'}>{def.real ? 'Dato real · catálogo' : ROTULO_SIMULADO}</span>
            <span className="gs-periodo">{periodoTxt}{periodo === 'prueba' && ' · línea base: antes de empezar, 0'}{def.real && SIN_MUNICIPIO > 0 ? ` · ${SIN_MUNICIPIO} sin municipio indicado, fuera del mapa` : ''}</span>
          </div>
          <div className="gs-tiles">
            <div><b>{def.real ? datos.tot.exps : datos.tot.reservas}</b><span>{def.real ? 'experiencias' : 'reservas'}</span></div>
            <div><b>{datos.tot.personas}</b><span>personas</span></div>
            <div><b>{euros(datos.tot.aportado)}</b><span>al fondo</span></div>
            <div><b>{datos.tot.llevados}</b><span>llevados a pueblos</span></div>
          </div>
          <div className="gs-mapa-caja">
            <MapaGestion puntos={puntos} color={def.color} activo={evento?.muni ?? muni} onElegir={setMuni} descripcion={descMapa} />
            <ul className="gs-feed" aria-label="Últimos sucesos (simulados)">
              {feed.map((s) => { const x = textoSuceso(s); return <li key={s.id} className={`k-${x.k}`}><b>{x.m}</b> {x.t}</li> })}
            </ul>
            <div className="gs-ley" aria-hidden="true">
              {capa === 'pueblos' ? (<><i className="r" />Zona con cupo o mucha afluencia (% simulado)<i className="c" style={{ background: def.color }} />Visitantes llevados</>)
                : (<><span>Menos</span><i className="deg" style={{ background: `linear-gradient(90deg, color-mix(in srgb, ${def.color} 30%, var(--night-2)), ${def.color})` }} /><span>Más {def.unidad}</span>{capa === 'fondo' && <><i className="ins" />Proyecto pagado</>}</>)}
            </div>
          </div>
        </section>

        <aside className={`gs-lado ${evento || detalle ? "abierto" : ""}`} aria-label="Alertas y detalle">
          <section className="gs-alertas">
            <h2>Alertas <em>simuladas</em></h2>
            <ul>
              {alertas.map((c) => (
                <li key={c.lugar}><button type="button" className={c.ocu >= 85 ? 'alta' : 'media'} onClick={() => setMuni(c.muni)}>
                  <b>{c.lugar}: {c.tipo === 'cupo' ? 'cupo del día' : 'afluencia'} al {c.ocu} %</b>
                  <span>{c.muni} · antes de la prueba, hasta el {c.base} %</span>
                </button></li>
              ))}
              {alertas.length === 0 && <li className="gs-ok-l"><span>Sin cuellos de botella ahora mismo.</span></li>}
              {ultimoProyecto && ultimoProyecto.tipo === 'proyecto' && (
                <li><button type="button" className="ok" onClick={() => setMuni(ultimoProyecto.muni)}><b>Proyecto pagado: {ultimoProyecto.titulo}</b><span>{ultimoProyecto.muni} · {euros(ultimoProyecto.coste)} del fondo</span></button></li>
              )}
            </ul>
          </section>

          {evento ? <EventoDetalle item={evento} h={h} onCerrar={() => setEvento(undefined)} onMapa={(m) => { setEvento(undefined); setMuni(m) }} /> : detalle ? (
            <section className="gs-detalle" aria-live="polite">
              <div className="gs-det-cab">
                <h2>{detalle.muni}</h2>
                <button type="button" className="gs-cerrar" onClick={() => setMuni(undefined)} aria-label="Cerrar el detalle y volver al ranking">Cerrar</button>
              </div>
              <p className="gs-nivel">{NIVEL_TXT[nivelDe(detalle.muni)]} <em>(clasificación simulada)</em></p>
              <h3>Catálogo <span className="gs-real">Dato real</span></h3>
              <p><b>{expsDetalle.length}</b> experiencia{expsDetalle.length === 1 ? '' : 's'} verificada{expsDetalle.length === 1 ? '' : 's'}</p>
              <ul className="gs-exps">{expsDetalle.slice(0, 3).map((e) => <li key={e.id}>{TXT(e.titulo)}</li>)}{expsDetalle.length > 3 && <li>y {expsDetalle.length - 3} más</li>}</ul>
              <h3>{periodoTxt} <span className="gs-simtag">Simulado</span></h3>
              <dl>
                <div><dt>Reservas</dt><dd>{detalle.reservas}</dd></div>
                <div><dt>Personas</dt><dd>{detalle.personas}</dd></div>
                <div><dt>Llevados a pueblos</dt><dd>{detalle.llevados}</dd></div>
                <div><dt>Al fondo</dt><dd>{euros(detalle.aportado)}</dd></div>
                <div><dt>Usado en proyectos</dt><dd>{euros(detalle.usado)}</dd></div>
              </dl>
              {detalle.proyectos.length > 0 && <ul className="gs-proys">{detalle.proyectos.map((p) => <li key={p.id}>{p.titulo} · {euros(p.coste)}</li>)}</ul>}
              {cuelloDetalle.map((c) => <p key={c.lugar} className={`gs-cuello ${c.ocu >= 85 ? 'alta' : ''}`}>{c.lugar}: {c.tipo === 'cupo' ? 'cupo del día' : 'afluencia'} al {c.ocu} % (antes, hasta el {c.base} %)</p>)}
            </section>
          ) : (
            <section className="gs-rank">
              <h2>Ranking · {def.corto.toLowerCase()}</h2>
              <ol>
                {ranking.slice(0, 12).map((r, i) => (
                  <li key={r.d.muni}><button type="button" onClick={() => setMuni(r.d.muni)} aria-label={`${i + 1}. ${r.d.muni}: ${def.fmt(r.v)}`}>
                    <span className="gs-rk-n"><i>{i + 1}</i>{r.d.muni}</span><b>{def.fmt(r.v)}</b>
                    <span className="gs-rk-b" aria-hidden="true"><i style={{ transform: `scaleX(${r.v / maxRank})`, background: def.color }} /></span>
                  </button></li>
                ))}
              </ol>
            </section>
          )}
        </aside>

        {dia8 ? (
          <section className="gs-kanban gs-voces" aria-label="Un día en Tenique: lo que pasa a la vez">
            <h2>Un día en Tenique <em>08:00 → 23:00 · simulado · títulos y municipios reales del catálogo · toca un suceso para verlo</em></h2>
            <div className="gs-cols">
              {VOCES.map((v) => {
                const todos = feeds.filter((f) => f.voz === v.id)
                const lista = todos.slice(0, 14)
                return (
                  <div key={v.id} className={`gs-col gs-voz v-${v.id}`}>
                    <h3>{v.titulo}<b>{todos.length}</b></h3>
                    <ul>
                      {lista.map((f) => (
                        <li key={f.clave} className={evento?.clave === f.clave ? 'sel' : ''}>
                          <button type="button" onClick={() => elegirEvento(f)} aria-label={`${horaTxt(f.h)}. ${f.texto}. Ver el detalle`}><time>{reloj(f.h).hora}</time><span>{f.texto}</span></button>
                        </li>
                      ))}
                      {lista.length === 0 && <li className="vacia">{h <= HISTORIA_H0 ? 'Pulsa Demo para empezar el día' : 'Sin sucesos con estos filtros'}</li>}
                    </ul>
                  </div>
                )
              })}
            </div>
          </section>
        ) : (
        <section className="gs-kanban" aria-label="Garantías de las experiencias">
          <h2>Garantías <em>simuladas · con títulos reales del catálogo ({CATALOGO.length} experiencias)</em></h2>
          <div className="gs-cols">
            {COLUMNAS.map((c, i) => (
              <div key={c} className="gs-col">
                <h3>{c}<b>{columnas[i].length}</b></h3>
                <ul>
                  {columnas[i].map((t) => (
                    <li key={t.id} className={ultimoCambio(t, h) < ventana * 1.5 && h > H_INICIO ? 'nueva' : ''}>
                      <button type="button" onClick={() => setMuni(t.muni)}><b>{t.titulo}</b><span>{t.muni} · {t.anfitrion}</span></button>
                    </li>
                  ))}
                  {columnas[i].length === 0 && <li className="vacia">Sin tarjetas con estos filtros</li>}
                </ul>
              </div>
            ))}
          </div>
        </section>
        )}
      </main>
    </div>
  )
}
