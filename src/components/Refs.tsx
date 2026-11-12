import { FUENTES } from '../data/investigacion'
import { rutaDe } from '../config/proyecto'

/** Referencias numeradas [n] que saltan a la lista de fuentes de la pestaña Diagnóstico (id 'investigacion'). */
export function Refs({ ids }: { ids: number[] }) {
  if (!ids.length) return null
  return (
    <>
      {ids.map((id) => {
        const f = FUENTES.find((x) => x.id === id)
        return (
          <a key={id} className="ref" href={`#${rutaDe('investigacion')}?f=${id}`} title={f ? `${f.titulo} · ${f.medio}` : `Fuente ${id}`}>
            {id}
          </a>
        )
      })}
    </>
  )
}

export function Verificado({ ok }: { ok: boolean }) {
  return ok ? <span className="tag ok"><span className="dot" />Verificado</span> : <span className="tag warn"><span className="dot" />Por verificar</span>
}
