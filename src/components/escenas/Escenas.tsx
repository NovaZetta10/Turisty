import type { CSSProperties } from 'react'
import { ISLAS_PATH } from '../../data/mapa-canarias'
import './escenas.css'

type P = { className?: string }
const cls = (c?: string) => (c ? `esc ${c}` : 'esc')

const SKIN = '#e0b48f'
const TEJA = '#b5533c'
const OCRE = '#e0a044'
const PIZ = '#3f4650'
const CREAM = '#ead7ae'
const INK = '#4a342a'

type Brow = 'flat' | 'angry' | 'worried' | 'puzzled'
type Mouth = 'flat' | 'frown' | 'o' | 'none'

/* Cara completa y simétrica sobre un círculo de cabeza: todo en un solo <g>
   (cabeza + pelo + ojos + cejas + boca) para animarse como una pieza. */
function Face({
  cx, cy, r = 14, hair = '#2b211d', cap = true, eyes = 'open', brow = 'flat', mouth = 'flat',
}: {
  cx: number; cy: number; r?: number; hair?: string; cap?: boolean
  eyes?: 'open' | 'tired'; brow?: Brow; mouth?: Mouth
}) {
  const g = r * 0.38
  const ey = cy + r * 0.08
  const by = cy - r * 0.28
  const my = cy + r * 0.55
  const o = brow === 'angry' ? r * 0.12 : brow === 'worried' ? -r * 0.12 : 0
  const pr = r * 0.2
  const e = r * 0.937
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={SKIN} />
      {cap && (
        <path d={`M${cx - e} ${cy - r * 0.35} A${r} ${r} 0 0 1 ${cx + e} ${cy - r * 0.35} Q${cx} ${cy - r * 0.8} ${cx - e} ${cy - r * 0.35} Z`} fill={hair} />
      )}
      {eyes === 'open' ? (
        <g>
          <circle cx={cx - g} cy={ey} r={pr} fill="#fff" />
          <circle cx={cx + g} cy={ey} r={pr} fill="#fff" />
          <g className="s-glance">
            <circle cx={cx - g} cy={ey} r={pr * 0.55} fill="#2b211d" />
            <circle cx={cx + g} cy={ey} r={pr * 0.55} fill="#2b211d" />
          </g>
        </g>
      ) : (
        <g stroke={INK} strokeLinecap="round" fill="none">
          <path d={`M${cx - g - 3} ${ey} h6 M${cx + g - 3} ${ey} h6`} strokeWidth="2.2" />
          <path d={`M${cx - g - 3} ${ey + 3.2} h6 M${cx + g - 3} ${ey + 3.2} h6`} strokeWidth="1" opacity=".35" />
        </g>
      )}
      <g stroke={INK} strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d={brow === 'puzzled' ? `M${cx - g - 3} ${by + 1} L${cx - g + 3} ${by + 0.5}` : `M${cx - g - 3} ${by - o} L${cx - g + 3} ${by + o}`} />
        {brow === 'puzzled'
          ? <path d={`M${cx + g - 3} ${by - 1.5} L${cx + g + 3} ${by - 3.5}`} />
          : <path d={`M${cx + g + 3} ${by - o} L${cx + g - 3} ${by + o}`} />}
      </g>
      {mouth === 'flat' && <path d={`M${cx - 3.5} ${my} h7`} stroke={INK} strokeWidth="2" strokeLinecap="round" />}
      {mouth === 'frown' && <path d={`M${cx - 4} ${my + 1.5} q4 -3.5 8 0`} stroke={INK} strokeWidth="1.9" fill="none" strokeLinecap="round" />}
      {mouth === 'o' && <ellipse cx={cx} cy={my} rx="2.3" ry="3" fill={INK} />}
    </g>
  )
}

/* Turista de pie, centrado en x (pies en y=356). */
function Tourist({
  x, shirt, hair, delay = '', arm = 'none', mouth = 'flat', suitcase = false,
}: {
  x: number; shirt: string; hair: string; delay?: string
  arm?: 'none' | 'up' | 'speaker'; mouth?: Mouth; suitcase?: boolean
}) {
  return (
    <g transform={`translate(${x} 0)`}>
      <g className={`fb o-b v-bob ${delay}`}>
        <rect x="-8" y="332" width="6" height="22" rx="3" fill="#2d2a30" />
        <rect x="2" y="332" width="6" height="22" rx="3" fill="#2d2a30" />
        <rect x="-10" y="352" width="10" height="4" rx="2" fill="#1f1c20" />
        <rect x="0" y="352" width="10" height="4" rx="2" fill="#1f1c20" />
        <rect x="-14" y="300" width="28" height="38" rx="12" fill={shirt} />
        <rect x="-5" y="292" width="10" height="12" rx="4" fill={SKIN} />
        <path d="M-12 306 L-18 328" stroke={shirt} strokeWidth="7" strokeLinecap="round" />
        {arm === 'none' && <path d="M12 306 L18 328" stroke={shirt} strokeWidth="7" strokeLinecap="round" />}
        {arm === 'up' && (
          <g className="v-armup" style={{ transformOrigin: '12px 306px' }}>
            <path d="M12 306 L24 288 L22 268" stroke={shirt} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="22" cy="264" r="4.5" fill={SKIN} />
          </g>
        )}
        {arm === 'speaker' && (
          <g>
            <path d="M12 306 L28 298 L34 284" stroke={shirt} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="24" y="262" width="26" height="20" rx="4" fill="#2d2a30" />
            <circle cx="31" cy="272" r="4.2" fill="#6b6a70" /><circle cx="43" cy="272" r="4.2" fill="#6b6a70" />
            <circle cx="34" cy="285" r="4.5" fill={SKIN} />
          </g>
        )}
        <Face cx={0} cy={282} r={12} hair={hair} mouth={mouth} />
      </g>
      {suitcase && (
        <g>
          <line x1="-18" y1="328" x2="-30" y2="326" stroke="#2d2a30" strokeWidth="3" strokeLinecap="round" />
          <rect x="-46" y="326" width="26" height="30" rx="5" fill="#8a4a37" />
          <rect x="-40" y="326" width="3" height="30" fill="#6b3828" />
          <rect x="-29" y="326" width="3" height="30" fill="#6b3828" />
          <circle cx="-41" cy="358" r="3.5" fill="#1f1c20" /><circle cx="-25" cy="358" r="3.5" fill="#1f1c20" />
        </g>
      )}
    </g>
  )
}

function Bin({ x, shake = false }: { x: number; shake?: boolean }) {
  return (
    <g className={shake ? 'v-bin' : ''} style={{ transformOrigin: `${x}px 334px` }}>
      <ellipse cx={x - 10} cy="290" rx="13" ry="9" fill="#1f1e24" />
      <ellipse cx={x + 12} cy="291" rx="11" ry="8" fill="#2b2a31" />
      <ellipse cx={x} cy="282" rx="11" ry="8" fill="#26252b" />
      <rect x={x - 22} y="296" width="44" height="6" rx="3" fill="#4d5858" />
      <path d={`M${x - 19} 302 h38 l-3 32 h-32 z`} fill="#5d6a6a" />
      <path d={`M${x - 8} 306 v24 M${x + 2} 306 v24 M${x + 12} 306 v24`} stroke="#4a5555" strokeWidth="2" />
    </g>
  )
}

function Cup({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`rotate(${r} ${x} ${y})`}>
      <path d={`M${x - 4} ${y - 8} h8 l-1.5 8 h-5 z`} fill="#e8d9b5" />
      <rect x={x - 4} y={y - 9} width="8" height="2" fill={TEJA} />
    </g>
  )
}

export function EscenaVecino({ className }: P) {
  return (
    <svg className={cls(className)} viewBox="0 0 640 400" role="img" aria-label="Un vecino mayor, harto, mira desde su balcón la calle sucia, con papeleras desbordadas, bolsas y vasos por el suelo, mientras un grupo de turistas con un altavoz hace ruido y alguien canta de noche.">
      <defs>
        <linearGradient id="e1-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c2638" />
          <stop offset=".55" stopColor="#6b4a52" />
          <stop offset="1" stopColor="#b97e5a" />
        </linearGradient>
        <clipPath id="e1-clip"><rect width="640" height="400" rx="28" /></clipPath>
      </defs>
      <g clipPath="url(#e1-clip)">
        <rect width="640" height="400" fill="url(#e1-sky)" />
        <circle cx="560" cy="64" r="20" fill="#f3e6cf" opacity=".9" />
        <circle cx="552" cy="58" r="20" fill="#2c2638" opacity=".35" />
        <g fill="#f3e6cf" opacity=".7"><circle cx="440" cy="40" r="1.6" /><circle cx="500" cy="96" r="1.4" /><circle cx="610" cy="130" r="1.6" /><circle cx="400" cy="110" r="1.3" /><circle cx="470" cy="150" r="1.2" /></g>
        <path d="M380 330 V240 h30 v-26 h34 v38 h28 v-52 h40 v44 h26 v-18 h40 v100 z" fill="#3d3040" />

        <rect y="322" width="640" height="24" fill="#6b5a55" />
        <rect y="344" width="640" height="56" fill="#3f3a44" />
        <rect y="342" width="640" height="4" fill="#85726a" />
        <g fill="#55505a"><rect x="40" y="378" width="46" height="4" rx="2" /><rect x="250" y="378" width="46" height="4" rx="2" /><rect x="470" y="378" width="46" height="4" rx="2" /></g>

        <rect x="24" y="72" width="336" height="250" fill="#b98a62" />
        <rect x="14" y="58" width="356" height="18" rx="3" fill="#7d4f3e" />
        <rect x="24" y="200" width="336" height="3" fill="#a77a55" />

        {/* balcón izquierdo + vecino mayor */}
        <rect x="58" y="112" width="76" height="102" rx="3" fill="#2e2220" />
        <rect x="52" y="108" width="88" height="6" fill="#6b4630" />
        <g className="fb o-b v-sigh">
          <path d="M70 214 v-42 a24 24 0 0 1 48 0 v42 z" fill={PIZ} />
          <rect x="88" y="150" width="12" height="12" rx="4" fill={SKIN} />
          <Face cx={94} cy={140} r={15} hair="#a39d98" eyes="tired" brow="worried" mouth="flat" />
          <rect x="72" y="168" width="44" height="9" rx="4.5" fill="#4a525d" />
          <circle cx="76" cy="172" r="5" fill={SKIN} />
          <circle cx="112" cy="172" r="5" fill={SKIN} />
        </g>
        <g className="fb o-c v-puff"><ellipse cx="126" cy="146" rx="9" ry="6" fill="#f3e6cf" /><ellipse cx="136" cy="141" rx="6" ry="4" fill="#f3e6cf" /></g>
        <rect x="36" y="212" width="124" height="9" rx="2" fill="#5b3a29" />
        <rect x="36" y="166" width="124" height="6" rx="2" fill="#5b3a29" />
        {[42, 56, 70, 84, 98, 112, 126, 140, 152].map(px => <rect key={px} x={px} y="172" width="4" height="40" fill="#5b3a29" />)}
        <path d="M44 221 l14 16 h-14 z M146 221 l-14 16 h14 z" fill="#4a2f21" />

        {/* balcón derecho, ventana encendida */}
        <rect x="232" y="112" width="76" height="102" rx="3" fill={OCRE} opacity=".85" />
        <path d="M270 112 v102" stroke="#7a5a42" strokeWidth="3" />
        <path d="M232 112 q18 40 0 102 M308 112 q-18 40 0 102" stroke="#b5533c" strokeWidth="7" fill="none" opacity=".7" />
        <rect x="222" y="212" width="116" height="9" rx="2" fill="#5b3a29" />
        <rect x="222" y="170" width="116" height="6" rx="2" fill="#5b3a29" />
        {[228, 242, 256, 270, 284, 298, 312, 326].map(px => <rect key={px} x={px} y="176" width="4" height="36" fill="#5b3a29" />)}

        {/* persiana cerrada con pintadas */}
        <rect x="44" y="258" width="250" height="64" rx="3" fill="#6b6a70" />
        {[266, 274, 282, 290, 298, 306, 314].map(py => <rect key={py} x="44" y={py} width="250" height="2" fill="#57565c" />)}
        <path d="M70 296 q14 -26 28 0 t28 0 M150 286 l18 22 M168 286 l-18 22" stroke="#b5533c" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".85" />
        <rect x="204" y="262" width="26" height="18" fill="#d9c9a0" transform="rotate(-8 217 271)" opacity=".85" />

        {/* suciedad */}
        <Bin x={262} shake />
        <Bin x={322} />
        <g className="fb o-c v-bag"><ellipse cx={334} cy="278" rx="9" ry="8" fill="#1f1e24" /><path d="M332 270 l4 -4 l2 5 z" fill="#1f1e24" /></g>
        <ellipse cx="292" cy="334" rx="16" ry="10" fill="#1f1e24" />
        <ellipse cx="304" cy="338" rx="12" ry="8" fill="#2b2a31" />
        <ellipse cx="350" cy="338" rx="10" ry="6" fill="#26252b" />
        <Cup x={236} y={341} r={80} /><Cup x={372} y={342} r={-70} /><Cup x={206} y={338} r={20} />
        <rect x="248" y="338" width="10" height="3" rx="1" fill="#d9c9a0" transform="rotate(-10 253 340)" />
        <path d="M174 340 q10 -4 18 0 q-6 4 -18 0 z" fill="#c9b04a" />

        {/* grupo ruidoso con altavoz */}
        <g>
          <circle className="fb o-c v-wave" cx="576" cy="272" r="26" fill="none" stroke="#f3e6cf" strokeWidth="3" />
          <circle className="fb o-c v-wave v-wave2" cx="576" cy="272" r="26" fill="none" stroke="#f3e6cf" strokeWidth="3" />
          <circle className="fb o-c v-wave v-wave3" cx="576" cy="272" r="26" fill="none" stroke="#f3e6cf" strokeWidth="3" />
          <Tourist x={424} shirt={TEJA} hair="#2b211d" suitcase mouth="o" />
          <Tourist x={486} shirt={OCRE} hair="#7a4a2a" delay="v-bob2" arm="up" mouth="o" />
          <Tourist x={540} shirt="#6c7a86" hair="#2b211d" delay="v-bob3" arm="speaker" mouth="o" />
          <Tourist x={598} shirt="#8a6a8c" hair="#a0653a" delay="v-bob2" mouth="o" />
          <g fill="#f3e6cf" fontFamily="system-ui, sans-serif" fontWeight="800">
            <text className="v-note" x="500" y="240" fontSize="22">♪</text>
            <text className="v-note v-note2" x="470" y="252" fontSize="18">♫</text>
          </g>
        </g>
      </g>
    </svg>
  )
}

function Crowd({ x, y, shirt, hair, mood, board, kind }: {
  x: number; y: number; shirt: string; hair: string; mood: Mouth
  board?: string; kind?: 'text' | 'ban' | 'fist'
}) {
  return (
    <g>
      <rect x={x - 15} y={y + 13} width="30" height="64" rx="12" fill={shirt} />
      <rect x={x - 5} y={y + 8} width="10" height="9" rx="3" fill={SKIN} />
      <Face cx={x} cy={y} r={12} hair={hair} brow="angry" mouth={mood} />
      {kind === 'fist' ? (
        <g className="fb o-b g-fist">
          <path d={`M${x + 13} ${y + 24} L${x + 28} ${y + 6} L${x + 26} ${y - 14}`} stroke={shirt} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx={x + 26} cy={y - 18} r="5.5" fill={SKIN} />
        </g>
      ) : (
        <g className="fb o-b s-banner" style={{ animationDelay: `${-(x % 7) * 0.4}s` }}>
          <rect x={x + 15.5} y={y - 54} width="3" height="86" fill="#7a5a42" />
          {kind === 'ban' ? (
            <g>
              <rect x={x - 16} y={y - 88} width="66" height="36" rx="3" fill={CREAM} />
              <circle cx={x + 17} cy={y - 70} r="12" fill="none" stroke={TEJA} strokeWidth="4" />
              <path d={`M${x + 9} ${y - 62} L${x + 25} ${y - 78}`} stroke={TEJA} strokeWidth="4" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <rect x={x - 16} y={y - 88} width="66" height="36" rx="3" fill={board === 'GO HOME' ? CREAM : '#d9a05b'} />
              <text x={x + 17} y={y - 66} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={TEJA} fontFamily="Impact, system-ui, sans-serif">{board}</text>
            </g>
          )}
          <circle cx={x + 17} cy={y + 26} r="4.5" fill={SKIN} />
        </g>
      )}
    </g>
  )
}

export function EscenaVisitante({ className }: P) {
  return (
    <svg className={cls(className)} viewBox="0 0 640 400" role="img" aria-label="En la terminal de llegadas de un aeropuerto, una visitante sale con su maleta y, tras la valla, un grupo de gente le enseña pancartas contra el turismo; ella se para, se encoge y su ilusión se apaga.">
      <defs>
        <linearGradient id="e2-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d4350" />
          <stop offset="1" stopColor="#8a6a5e" />
        </linearGradient>
        <linearGradient id="e2-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a4a58" />
          <stop offset="1" stopColor="#d6a064" />
        </linearGradient>
        <clipPath id="e2-clip"><rect width="640" height="400" rx="28" /></clipPath>
      </defs>
      <g clipPath="url(#e2-clip)">
        <rect width="640" height="400" fill="url(#e2-wall)" />
        <rect width="640" height="24" fill="#352c38" />
        <g fill="#f0b765" opacity=".8"><rect x="60" y="8" width="60" height="6" rx="3" /><rect x="220" y="8" width="60" height="6" rx="3" /><rect x="400" y="8" width="60" height="6" rx="3" /><rect x="560" y="8" width="60" height="6" rx="3" /></g>

        <path d="M350 24 V36 M450 24 V36" stroke="#2b232d" strokeWidth="3" />
        <rect x="316" y="36" width="168" height="32" rx="6" fill="#2b232d" stroke="#f0b765" strokeWidth="2" />
        <text x="400" y="57" textAnchor="middle" fontSize="13" fontWeight="800" fill="#f0b765" fontFamily="system-ui, sans-serif" letterSpacing=".5">LLEGADAS · ARRIVALS</text>

        <rect x="520" y="76" width="100" height="60" rx="4" fill="#2b232d" />
        <rect x="526" y="82" width="88" height="48" rx="2" fill="url(#e2-win)" />
        <path d="M545 112 l30 -4 l10 -10 h6 l-4 10 l14 2 v4 l-14 2 l4 10 h-6 l-10 -10 l-30 -4 z" fill="#3a3040" opacity=".85" />

        <rect x="6" y="96" width="106" height="236" rx="4" fill="#2b232d" />
        <rect x="14" y="104" width="90" height="228" fill="#c99a68" />
        <rect x="14" y="104" width="22" height="228" fill="#e9d6b4" opacity=".35" />
        <rect x="82" y="104" width="22" height="228" fill="#e9d6b4" opacity=".35" />

        <rect y="300" width="640" height="100" fill="#8a6c5c" />
        <path d="M0 330 H640 M0 362 H640 M120 300 L60 400 M260 300 L240 400 M400 300 L420 400 M540 300 L600 400" stroke="#765a4c" strokeWidth="2" />

        <Crowd x={306} y={238} shirt="#6c7a86" hair="#2b211d" mood="o" board="GO HOME" />
        <Crowd x={378} y={244} shirt={OCRE} hair="#7a4a2a" mood="frown" board="BASTA YA" />
        <Crowd x={450} y={236} shirt="#8a6a8c" hair="#a0653a" mood="o" kind="ban" />
        <Crowd x={522} y={242} shirt={TEJA} hair="#2b211d" mood="frown" board="GO HOME" />
        <Crowd x={594} y={238} shirt="#5f6b4a" hair="#8f8a86" mood="o" kind="fist" />

        <rect x="240" y="296" width="400" height="6" rx="3" fill="#b9bcc2" />
        <rect x="240" y="326" width="400" height="4" rx="2" fill="#9da0a6" />
        {[250, 304, 358, 412, 466, 520, 574, 628].map(px => <rect key={px} x={px} y="296" width="5" height="52" rx="2" fill="#b9bcc2" />)}
        <ellipse cx="440" cy="350" rx="210" ry="4" fill="#000" opacity=".12" />

        {/* visitante */}
        <g className="s-walk">
          <g transform="translate(190 0)">
            <g className="s-shrink" style={{ transformOrigin: '0px 380px' }}>
              <rect x="-36" y="296" width="18" height="44" rx="8" fill={TEJA} />
              <rect x="-12" y="346" width="10" height="30" rx="5" fill="#33282a" />
              <rect x="2" y="346" width="10" height="30" rx="5" fill="#33282a" />
              <rect x="-16" y="376" width="16" height="5" rx="2.5" fill="#1f1c20" />
              <rect x="0" y="376" width="16" height="5" rx="2.5" fill="#1f1c20" />
              <rect x="-20" y="298" width="40" height="54" rx="14" fill={CREAM} />
              <path d="M14 312 L32 328" stroke={CREAM} strokeWidth="9" strokeLinecap="round" />
              <circle cx="34" cy="330" r="5.5" fill={SKIN} />
              <line x1="34" y1="330" x2="48" y2="338" stroke="#2d2a30" strokeWidth="3" strokeLinecap="round" />
              <rect x="32" y="338" width="42" height="42" rx="6" fill="#8a4a37" />
              <rect x="41" y="338" width="4" height="42" fill="#6b3828" />
              <rect x="61" y="338" width="4" height="42" fill="#6b3828" />
              <circle cx="40" cy="383" r="4" fill="#1f1c20" /><circle cx="66" cy="383" r="4" fill="#1f1c20" />
              <g className="s-head" style={{ transformOrigin: '0px 298px' }}>
                <rect x="-6" y="292" width="12" height="12" rx="4" fill={SKIN} />
                <Face cx={0} cy={282} r={15} cap={false} brow="worried" mouth="frown" />
                <ellipse cx="0" cy="271" rx="26" ry="4.5" fill="#d9a05b" />
                <path d="M-13 271 a13 11 0 0 1 26 0 z" fill="#c78a45" />
              </g>
            </g>
            <g className="fb o-b s-cloud">
              <circle cx="-10" cy="244" r="4" fill={CREAM} />
              <circle cx="-18" cy="228" r="6" fill={CREAM} />
              <ellipse cx="8" cy="190" rx="62" ry="30" fill={CREAM} />
              <circle cx="-42" cy="196" r="20" fill={CREAM} />
              <circle cx="60" cy="194" r="20" fill={CREAM} />
              <circle cx="-14" cy="168" r="22" fill={CREAM} />
              <circle cx="28" cy="166" r="22" fill={CREAM} />
              <g transform="translate(8 186)">
                <path className="s-heart-off" d="M0 14 C-24 -4 -16 -26 0 -12 C16 -26 24 -4 0 14 Z" fill="#8f8a86" />
                <g className="fb o-c s-heart-on"><path d="M0 14 C-24 -4 -16 -26 0 -12 C16 -26 24 -4 0 14 Z" fill="#d2402a" /></g>
                <path className="s-heart-off" d="M-4 -12 l5 9 l-5 7 l6 8" stroke="#6b3828" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

type Pt = [number, number]
/* Silueta real de Tenerife (ISLAS_PATH.tenerife), ajustada a un recuadro de la pantalla. */
const PATH = ISLAS_PATH.tenerife ?? ''
const NUMS = PATH.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [0, 0]
const XS = NUMS.filter((_, i) => i % 2 === 0)
const YS = NUMS.filter((_, i) => i % 2 === 1)
const X0 = Math.min(...XS), X1 = Math.max(...XS), Y0 = Math.min(...YS), Y1 = Math.max(...YS)
const LON0 = -16.921, LON1 = -16.12, LAT0 = 28.59, LAT1 = 27.995
const SC = Math.min(196 / (X1 - X0), 180 / (Y1 - Y0))
const OX = 254 + (216 - (X1 - X0) * SC) / 2
const OY = 52 + (216 - (Y1 - Y0) * SC) / 2
const MAP_T = `translate(${OX - X0 * SC} ${OY - Y0 * SC}) scale(${SC})`
const geo = ([lat, lon]: Pt): Pt => [
  OX + ((lon - LON0) / (LON1 - LON0)) * (X1 - X0) * SC,
  OY + ((lat - LAT0) / (LAT1 - LAT0)) * (Y1 - Y0) * SC,
]
const HUB_N = geo([28.4827, -16.3415])
const HUB_S = geo([28.0445, -16.5725])
const ROUTES: { from: Pt; to: Pt }[] = [
  { from: HUB_N, to: geo([28.4636, -16.2518]) },
  { from: HUB_N, to: geo([28.414, -16.5477]) },
  { from: HUB_N, to: geo([28.36, -16.72]) },
  { from: HUB_N, to: geo([28.31, -16.41]) },
  { from: HUB_S, to: geo([28.12, -16.73]) },
  { from: HUB_S, to: geo([28.15, -16.5]) },
]

function Coin({ x, y, dx, dy, delay }: { x: number; y: number; dx: number; dy: number; delay: string }) {
  const st = { '--dx': `${dx}px`, '--dy': `${dy}px`, animationDelay: delay } as CSSProperties
  return (
    <g className="g-coin" style={st}>
      <circle cx={x} cy={y} r="6.5" fill="#f0b765" stroke="#b9822c" strokeWidth="1.2" />
      <text x={x} y={y + 3} textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#7a4f12" fontFamily="system-ui, sans-serif">€</text>
    </g>
  )
}

export function EscenaGestion({ className }: P) {
  return (
    <svg className={cls(className)} viewBox="0 0 640 400" role="img" aria-label="Una persona técnica de turismo, con gesto de duda y la mano abierta, mira en una pantalla un mapa de Tenerife por el que se mueven muchas monedas que, al llegar a los barrios, desaparecen en interrogantes.">
      <defs>
        <linearGradient id="e3-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d4650" />
          <stop offset="1" stopColor="#7a5c52" />
        </linearGradient>
        <linearGradient id="e3-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a4a58" />
          <stop offset="1" stopColor="#d39a5f" />
        </linearGradient>
        <clipPath id="e3-clip"><rect width="640" height="400" rx="28" /></clipPath>
      </defs>
      <g clipPath="url(#e3-clip)">
        <rect width="640" height="400" fill="url(#e3-wall)" />
        <rect x="30" y="44" width="124" height="120" rx="4" fill="#2e2630" />
        <rect x="36" y="50" width="112" height="108" rx="2" fill="url(#e3-win)" />
        <path d="M92 50 v108 M36 104 h112" stroke="#2e2630" strokeWidth="4" />
        <path d="M36 158 V132 h14 v-14 h18 v22 h14 v-18 h22 v36 z" fill="#5a4243" opacity=".8" />
        <rect x="172" y="62" width="26" height="26" fill={OCRE} transform="rotate(-6 185 75)" />
        <rect x="176" y="100" width="26" height="26" fill={CREAM} transform="rotate(3 189 113)" />
        <path d="M178 72 h14 M178 78 h10 M180 110 h14" stroke="#6b4630" strokeWidth="1.6" opacity=".6" />

        <rect x="236" y="34" width="378" height="252" rx="12" fill="#25242b" />
        <rect x="246" y="44" width="358" height="232" rx="6" fill="#32343d" />
        <rect x="402" y="278" width="46" height="40" fill="#25242b" />
        <rect x="372" y="312" width="106" height="8" rx="4" fill="#25242b" />
        {/* mapa de Tenerife (silueta) */}
        <rect x="254" y="52" width="216" height="216" rx="4" fill="#2b2d35" />
        <path d={PATH} transform={MAP_T} fill="#5f6874" stroke="#98a2ad" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                {ROUTES.map(({ to: [x, y] }, i) => (
          <g key={i}>
            <rect x={x - 6} y={y - 3} width="12" height="9" fill="#aab3bd" />
            <path d={`M${x - 8} ${y - 3} L${x} ${y - 11} L${x + 8} ${y - 3} Z`} fill="#8a95a1" />
            <text className="fb o-c g-qpop" style={{ animationDelay: `${-(i * 0.7)}s` }} x={x} y={y - 15} fontSize="15" fontWeight="900" fill="#f0b765" textAnchor="middle" fontFamily="system-ui, sans-serif">?</text>
          </g>
        ))}
        {ROUTES.flatMap(({ from, to }, i) => [0, 1].map(k => (
          <Coin key={`${i}-${k}`} x={from[0]} y={from[1]} dx={to[0] - from[0]} dy={to[1] - from[1] + 2} delay={`${-(i * 0.7 + k * 2.2)}s`} />
        )))}

        {[HUB_N, HUB_S].map(([x, y], i) => (
          <path key={i} transform={`translate(${x} ${y})`} d="M0 -8 L2 -2 L8 2 L8 4 L2 2 L2 6 L4 8 L4 9 L0 8 L-4 9 L-4 8 L-2 6 L-2 2 L-8 4 L-8 2 L-2 -2 Z" fill="#fff3d6" stroke="#2b2d35" strokeWidth="1.4" strokeLinejoin="round" />
        ))}
        <rect x="480" y="52" width="116" height="100" rx="4" fill="#3a3d48" />
        <path d="M490 140 H586" stroke="#7b8491" strokeWidth="2" />
        {[[498, 30], [524, 50], [550, 72], [576, 92]].map(([x, h], i) => (
          <rect key={i} x={x - 8} y={140 - h} width="16" height={h} rx="2" fill={OCRE} />
        ))}
        <g className="fb o-c g-warn"><circle cx="540" cy="64" r="8" fill="#f0b765" stroke="#b9822c" strokeWidth="1.2" /><text x="540" y="67.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#7a4f12" fontFamily="system-ui, sans-serif">€</text></g>
        <rect x="480" y="162" width="116" height="104" rx="4" fill="#3a3d48" />
        <circle cx="538" cy="214" r="32" fill="none" stroke="#7b8491" strokeWidth="9" strokeDasharray="6 5" />
        <text className="fb o-c g-q" x="538" y="226" fontSize="34" fontWeight="900" fill="#f0b765" textAnchor="middle" fontFamily="system-ui, sans-serif">?</text>

        <rect y="318" width="640" height="12" fill="#8a5e3e" />
        <rect y="330" width="640" height="70" fill="#5e4030" />
        <g>
          <rect x="478" y="304" width="86" height="14" rx="2" fill={CREAM} transform="rotate(-2 520 311)" />
          <rect x="484" y="292" width="80" height="13" rx="2" fill="#d9c298" transform="rotate(3 524 298)" />
          <rect x="490" y="281" width="74" height="12" rx="2" fill={CREAM} transform="rotate(-4 527 287)" />
          <path d="M498 284 h30 M492 296 h40 M500 308 h50" stroke="#a88a5c" strokeWidth="2" opacity=".7" />
          <rect x="570" y="298" width="22" height="20" rx="3" fill={TEJA} />
          <rect x="590" y="304" width="4" height="12" rx="2" fill={TEJA} />
        </g>
        <rect x="236" y="298" width="18" height="20" rx="4" fill="#d9c9a0" />
        <path d="M254 304 q9 0 0 10" stroke="#d9c9a0" strokeWidth="3" fill="none" />
        <rect x="276" y="306" width="70" height="12" rx="3" fill="#4a4a52" />

        {/* persona técnica, de frente, con duda */}
        <rect x="64" y="246" width="26" height="72" rx="12" fill="#3b3438" />
        <path d="M92 318 V268 a22 22 0 0 1 22 -22 h24 a22 22 0 0 1 22 22 v50 z" fill={TEJA} />
        <path d="M98 262 L94 304" stroke="#9c4531" strokeWidth="11" strokeLinecap="round" />
        <path d="M115 250 l10 22 l10 -22" fill="#8d3e2c" />
        <rect x="119" y="270" width="12" height="16" rx="2" fill={CREAM} />
        <rect x="119" y="226" width="12" height="26" rx="5" fill={SKIN} />
        <Face cx={125} cy={212} r={19} brow="puzzled" mouth="o" />
        <g className="g-open" style={{ transformOrigin: '152px 262px' }}>
          <path d="M152 262 L184 272 L208 252" stroke={TEJA} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="212" cy="248" r="7.5" fill={SKIN} />
          <path d="M212 242 l6 -8 M214 246 l8 -5 M214 251 l9 -2" stroke={SKIN} strokeWidth="3.4" strokeLinecap="round" />
        </g>
        <text className="fb o-c g-q" x="160" y="186" fontSize="22" fontWeight="900" fill="#f0b765" textAnchor="middle" fontFamily="system-ui, sans-serif">?</text>
      </g>
    </svg>
  )
}
