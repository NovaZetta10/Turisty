/** El destello de nova: estrella de cuatro puntas con núcleo caliente. */
export function NovaMark({ size = 22, className = 'nova-mark' }: { size?: number | string; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <radialGradient id="nm-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".35" stopColor="#ffe3a3" />
          <stop offset="1" stopColor="#ffb35c" />
        </radialGradient>
      </defs>
      <path d="M24 2c1.2 11.5 3.5 18.8 22 22-18.5 3.2-20.8 10.5-22 22-1.2-11.5-3.5-18.8-22-22C20.5 20.8 22.8 13.5 24 2z" fill="url(#nm-core)" />
      <path d="M24 13c.5 5 1.6 8.4 9 11-7.4 2.6-8.5 6-9 11-.5-5-1.6-8.4-9-11 7.4-2.6 8.5-6 9-11z" fill="#fff" opacity=".85" transform="rotate(45 24 24)" />
    </svg>
  )
}
