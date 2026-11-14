import { BRAND } from '../../config/brand'
import { AppWindow, Defs, LINE, SOFT, StatTiles, useGradientIds } from './parts'

/** Illustrative HR interface (employees, attendance, shifts, payroll). Abstract on purpose: no data, no numbers. */
export function HrIllustration({ className }: { className?: string }) {
  const ids = useGradientIds()
  const avatarFills = [`url(#${ids.cyan})`, `url(#${ids.brand})`, `url(#${ids.violet})`, `url(#${ids.cyan})`, `url(#${ids.brand})`]
  const nameW = [92, 76, 104, 84, 98]
  const shifts = [
    [2, 2, 1, 0, 1, 3, 0],
    [1, 0, 2, 2, 0, 1, 3],
    [3, 1, 0, 1, 2, 2, 0],
    [0, 2, 3, 0, 1, 0, 1],
  ]
  const shiftFill = [SOFT, BRAND.azure, BRAND.cyan, BRAND.violet]
  const payBars = [28, 44, 36, 58, 48, 70]

  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      role="img"
      aria-label="تصوّر توضيحي لواجهة نظام HR: قائمة موظفين وحضور وانصراف وجدول ورديات ورواتب"
    >
      <Defs ids={ids} />
      <AppWindow ids={ids} activeTile={0}>
        <StatTiles ids={ids} fills={[`url(#${ids.cyan})`, `url(#${ids.brand})`, `url(#${ids.violet})`]} />

        {/* attendance list */}
        <rect x="32" y="176" width="292" height="272" rx="18" fill={SOFT} stroke={LINE} />
        <rect x="236" y="194" width="68" height="9" rx="4.5" fill="#fff" opacity=".82" />
        <rect x="52" y="194" width="40" height="9" rx="4.5" fill={BRAND.cyan} opacity=".45" />
        {nameW.map((w, i) => {
          const y = 222 + i * 44
          return (
            <g key={i}>
              <circle cx="290" cy={y + 14} r="15" fill={avatarFills[i]} />
              <rect x={266 - w} y={y + 6} width={w} height="9" rx="4.5" fill="#fff" opacity=".82" />
              <rect x={266 - w * 0.62} y={y + 21} width={w * 0.62} height="6" rx="3" fill="#fff" opacity=".24" />
              <rect x="52" y={y + 3} width="52" height="22" rx="11" fill={i % 3 === 2 ? 'rgba(94,76,249,.28)' : 'rgba(3,220,254,.2)'} />
              <circle cx="67" cy={y + 14} r="4.5" fill={i % 3 === 2 ? BRAND.violet : BRAND.cyan} />
              <rect x="77" y={y + 11} width="18" height="6" rx="3" fill="#fff" opacity=".68" />
              {i < 4 && <path d={`M52 ${y + 36}h252`} stroke={LINE} />}
            </g>
          )
        })}

        {/* shifts grid */}
        <rect x="340" y="176" width="180" height="140" rx="18" fill={SOFT} stroke={LINE} />
        <rect x="438" y="192" width="64" height="9" rx="4.5" fill="#fff" opacity=".82" />
        {shifts.map((row, r) =>
          row.map((v, c) => (
            <rect
              key={`${r}-${c}`}
              x={358 + c * 22}
              y={216 + r * 23}
              width="17"
              height="17"
              rx="5"
              fill={shiftFill[v]}
              opacity={v === 0 ? 1 : 0.88}
            />
          )),
        )}

        {/* payroll */}
        <rect x="340" y="332" width="180" height="116" rx="18" fill={SOFT} stroke={LINE} />
        <rect x="438" y="348" width="64" height="9" rx="4.5" fill="#fff" opacity=".82" />
        <path d="M358 430h144" stroke={LINE} />
        {payBars.map((h, i) => (
          <rect key={i} x={360 + i * 24} y={430 - h * 0.85} width="15" height={h * 0.85} rx="5" fill={`url(#${ids.brand})`} />
        ))}
      </AppWindow>
    </svg>
  )
}
