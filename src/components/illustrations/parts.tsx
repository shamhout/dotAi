import { useId, type ReactNode } from 'react'
import { BRAND } from '../../config/brand'

/** Unique, CSS-safe gradient ids so the same illustration can appear twice on a page. */
export function useGradientIds() {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  return {
    panel: `panel-${raw}`,
    brand: `brand-${raw}`,
    cyan: `cyan-${raw}`,
    violet: `violet-${raw}`,
    area: `area-${raw}`,
  }
}
export type GradientIds = ReturnType<typeof useGradientIds>

export function Defs({ ids }: { ids: GradientIds }) {
  return (
    <defs>
      <linearGradient id={ids.panel} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b1760" />
        <stop offset="1" stopColor={BRAND.night} />
      </linearGradient>
      <linearGradient id={ids.brand} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={BRAND.sky} />
        <stop offset=".55" stopColor={BRAND.electric} />
        <stop offset="1" stopColor={BRAND.violet} />
      </linearGradient>
      <linearGradient id={ids.cyan} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={BRAND.glow} />
        <stop offset="1" stopColor={BRAND.azure} />
      </linearGradient>
      <linearGradient id={ids.violet} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={BRAND.azure} />
        <stop offset="1" stopColor={BRAND.violet} />
      </linearGradient>
      <linearGradient id={ids.area} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={BRAND.azure} stopOpacity=".5" />
        <stop offset="1" stopColor={BRAND.azure} stopOpacity="0" />
      </linearGradient>
    </defs>
  )
}

export const LINE = 'rgba(150,180,255,.16)'
export const SOFT = 'rgba(255,255,255,.05)'

/** Application window: chrome, right-hand sidebar (RTL layout), content area x=32..520. */
export function AppWindow({ ids, activeTile, children }: { ids: GradientIds; activeTile: number; children: ReactNode }) {
  return (
    <>
      <rect x="16" y="16" width="608" height="448" rx="26" fill={`url(#${ids.panel})`} stroke={LINE} />
      {[52, 72, 92].map((cx) => (
        <circle key={cx} cx={cx} cy="40" r="5.5" fill="rgba(255,255,255,.26)" />
      ))}
      <rect x="320" y="29" width="190" height="22" rx="11" fill={SOFT} stroke={LINE} />
      <path d="M16 64h608" stroke={LINE} />
      {/* sidebar */}
      <path d="M536 64v400" stroke={LINE} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 82 + i * 56
        const active = i === activeTile
        return (
          <g key={i}>
            <rect x="554" y={y} width="52" height="40" rx="13" fill={active ? `url(#${ids.brand})` : SOFT} />
            <rect x="570" y={y + 14} width="20" height="4" rx="2" fill={active ? '#fff' : 'rgba(255,255,255,.3)'} />
            <rect x="574" y={y + 23} width="12" height="4" rx="2" fill={active ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.18)'} />
          </g>
        )
      })}
      {children}
    </>
  )
}

/** Three summary tiles (shape only – deliberately no numbers). */
export function StatTiles({ ids, fills }: { ids: GradientIds; fills: string[] }) {
  return (
    <>
      {[32, 200, 368].map((x, i) => (
        <g key={x}>
          <rect x={x} y="84" width="152" height="76" rx="16" fill={SOFT} stroke={LINE} />
          <circle cx={x + 120} cy="122" r="19" fill={fills[i] ?? `url(#${ids.brand})`} opacity=".95" />
          <rect x={x + 108} y="118" width="24" height="4" rx="2" fill="#fff" opacity=".85" />
          <rect x={x + 112} y="126" width="16" height="4" rx="2" fill="#fff" opacity=".55" />
          <rect x={x + 16} y="108" width={[58, 70, 50][i]} height="10" rx="5" fill="#fff" opacity=".8" />
          <rect x={x + 16} y="130" width="88" height="6" rx="3" fill="#fff" opacity=".2" />
        </g>
      ))}
    </>
  )
}
