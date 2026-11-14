import { BRAND } from '../../config/brand'
import { AppWindow, Defs, LINE, SOFT, StatTiles, useGradientIds } from './parts'

/** Illustrative Sales interface (tracking, performance, reports). Abstract on purpose: no data, no numbers. */
export function SalesIllustration({ className }: { className?: string }) {
  const ids = useGradientIds()
  const points: [number, number][] = [
    [496, 214],
    [440, 236],
    [376, 224],
    [312, 258],
    [248, 246],
    [184, 276],
    [120, 262],
    [56, 290],
  ]
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')
  const area = `${line} L56 312 L496 312 Z`
  const bars = [30, 52, 38, 66, 46, 74, 58, 82]

  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      role="img"
      aria-label="تصوّر توضيحي لواجهة نظام Sales: تتبع المبيعات ومتابعة الأداء والتقارير"
    >
      <Defs ids={ids} />
      <AppWindow ids={ids} activeTile={1}>
        <StatTiles ids={ids} fills={[`url(#${ids.violet})`, `url(#${ids.cyan})`, `url(#${ids.brand})`]} />

        {/* performance chart */}
        <rect x="32" y="176" width="488" height="152" rx="18" fill={SOFT} stroke={LINE} />
        <rect x="420" y="192" width="80" height="9" rx="4.5" fill="#fff" opacity=".82" />
        <rect x="52" y="192" width="46" height="9" rx="4.5" fill={BRAND.violet} opacity=".55" />
        {[236, 266, 296].map((y) => (
          <path key={y} d={`M52 ${y}H500`} stroke={LINE} strokeDasharray="4 6" />
        ))}
        <path d={area} fill={`url(#${ids.area})`} />
        <path d={line} fill="none" stroke={BRAND.azure} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={line} fill="none" stroke={BRAND.glow} strokeWidth="2" strokeLinecap="round" className="svg-signal-slow" opacity=".7" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 0 ? 6 : 4} fill={i === 0 ? BRAND.glow : BRAND.ink} stroke={i === 0 ? BRAND.cyan : BRAND.azure} strokeWidth="2.5" />
        ))}

        {/* bars */}
        <rect x="32" y="344" width="232" height="104" rx="18" fill={SOFT} stroke={LINE} />
        <rect x="176" y="360" width="72" height="9" rx="4.5" fill="#fff" opacity=".82" />
        <path d="M50 432h196" stroke={LINE} />
        {bars.map((h, i) => (
          <rect key={i} x={52 + i * 24} y={432 - h * 0.68} width="14" height={h * 0.68} rx="5" fill={i === 5 ? `url(#${ids.cyan})` : `url(#${ids.violet})`} />
        ))}

        {/* customer / sales activity */}
        <rect x="280" y="344" width="240" height="104" rx="18" fill={SOFT} stroke={LINE} />
        <rect x="424" y="360" width="80" height="9" rx="4.5" fill="#fff" opacity=".82" />
        {[0, 1, 2].map((i) => {
          const y = 384 + i * 20
          return (
            <g key={i}>
              <circle cx="494" cy={y + 6} r="7.5" fill={i === 1 ? `url(#${ids.cyan})` : `url(#${ids.brand})`} />
              <rect x={470 - [88, 72, 96][i]} y={y + 2} width={[88, 72, 96][i]} height="8" rx="4" fill="#fff" opacity=".72" />
              <rect x="298" y={y} width="40" height="12" rx="6" fill={i === 1 ? 'rgba(3,220,254,.2)' : 'rgba(94,76,249,.28)'} />
            </g>
          )
        })}
      </AppWindow>
    </svg>
  )
}
