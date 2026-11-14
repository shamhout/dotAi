import { useState } from 'react'
import { BRAND } from '../config/brand'
import { PRODUCTS } from '../config/site'
import { whatsAppLinkFor } from '../utils/whatsapp'
import { Icon } from './Icon'
import { Latin } from './Latin'

type FlowMode = 'all' | 'hr' | 'sales'

const MODES: { id: FlowMode; label: string }[] = [
  { id: 'all', label: 'التشغيل المتكامل' },
  { id: 'hr', label: 'مسار HR' },
  { id: 'sales', label: 'مسار Sales' },
]

const INPUT_NODES = [
  {
    id: 'attendance',
    track: 'hr' as const,
    icon: 'clock' as const,
    title: 'الحضور والورديات',
    sub: 'متابعة يومية منتظمة',
  },
  {
    id: 'payroll',
    track: 'hr' as const,
    icon: 'calculator' as const,
    title: 'السلف والرواتب',
    sub: 'حسابات ومكافآت دقيقة',
  },
  {
    id: 'salesFlow',
    track: 'sales' as const,
    icon: 'trendingUp' as const,
    title: 'المبيعات والعملاء',
    sub: 'تتبع لحظي وتقارير',
  },
]

/**
 * Interactive Hero automation architecture diagram showing how dot Ai unifies
 * fragmented daily operations into organized HR and Sales management systems.
 */
export function AutomationCanvas() {
  const [mode, setMode] = useState<FlowMode>('all')

  const hrActive = mode === 'all' || mode === 'hr'
  const salesActive = mode === 'all' || mode === 'sales'

  const coreMessage =
    mode === 'hr'
      ? 'تجميع سجلات الموظفين والحضور والورديات وحساب الرواتب تلقائياً في مكان واحد.'
      : mode === 'sales'
        ? 'تحويل حركة البيع ونشاط العملاء إلى تقارير منظمة تدعم قرارات الإدارة.'
        : 'تحويل المهام اليومية المتكررة إلى أنظمة ذكية مترابطة تعمل بكفاءة ووضوح.'

  return (
    <div
      className="surface-console relative overflow-hidden rounded-3xl p-4 sm:p-6"
      aria-label="تصور تفاعلي لآلية عمل الأنظمة الذكية في dot Ai"
    >
      {/* Top coordinate & filter bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="node-pulse inline-block size-2 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]" aria-hidden="true" />
          <span className="text-xs font-bold tracking-wide text-glow">
            محرك الأتمتة · <Latin>dot Ai</Latin>
          </span>
        </div>

        <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-ink/80 p-1" role="tablist" aria-label="عرض مسار الأتمتة">
          {MODES.map((m) => {
            const active = mode === m.id
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(m.id)}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  active
                    ? 'bg-[image:var(--gradient-cta)] text-white shadow-[0_4px_16px_-4px_rgb(35_53_252/0.8)]'
                    : 'text-mist hover:text-white'
                }`}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tier 1: Daily Operational Inputs (RTL order: Right = HR 1, Center = HR 2, Left = Sales) */}
      <div className="relative z-10 mt-5">
        <p className="mb-2.5 text-[11px] font-bold tracking-wider text-haze">01 / المدخلات اليومية المتكررة</p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {INPUT_NODES.map((node) => {
            const active = node.track === 'hr' ? hrActive : salesActive
            const isHr = node.track === 'hr'
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setMode(node.track)}
                className={`group flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-start transition-all duration-300 sm:flex-col sm:items-start sm:gap-1.5 sm:p-3 ${
                  active
                    ? isHr
                      ? 'border-cyan/35 bg-panel/75 shadow-[0_8px_24px_-14px_rgb(3_220_254/0.55)]'
                      : 'border-violet/45 bg-panel/75 shadow-[0_8px_24px_-14px_rgb(94_76_249/0.6)]'
                    : 'border-white/5 bg-ink/45 opacity-40 hover:opacity-75'
                }`}
              >
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-lg border ${
                    isHr ? 'border-cyan/25 bg-cyan/15 text-glow' : 'border-violet/35 bg-violet/20 text-iris'
                  }`}
                >
                  <Icon name={node.icon} size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-extrabold text-white">{node.title}</span>
                  <span className="block truncate text-[11px] text-haze">{node.sub}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* SVG Circuit Layer A: 3 inputs → Center Hub (RTL aligned: right=400, center=240, left=80) */}
      <div className="relative z-0 mx-auto hidden h-12 w-full sm:block" aria-hidden="true">
        <svg viewBox="0 0 480 48" preserveAspectRatio="none" className="size-full overflow-visible">
          {/* Base dim tracks */}
          <path d="M400 0 C400 28, 240 16, 240 48" fill="none" stroke="rgba(147,166,214,0.14)" strokeWidth="1.5" />
          <path d="M240 0 L240 48" fill="none" stroke="rgba(147,166,214,0.14)" strokeWidth="1.5" />
          <path d="M80 0 C80 28, 240 16, 240 48" fill="none" stroke="rgba(147,166,214,0.14)" strokeWidth="1.5" />

          {/* Active animated signals */}
          {hrActive && (
            <>
              <path d="M400 0 C400 28, 240 16, 240 48" fill="none" stroke={BRAND.cyan} strokeWidth="2" className="svg-signal" />
              <path d="M240 0 L240 48" fill="none" stroke={BRAND.sky} strokeWidth="2" className="svg-signal-slow" />
            </>
          )}
          {salesActive && (
            <path d="M80 0 C80 28, 240 16, 240 48" fill="none" stroke={BRAND.violet} strokeWidth="2" className="svg-signal" />
          )}
        </svg>
      </div>

      {/* Mobile compact vertical connector */}
      <div className="my-2 flex justify-center sm:hidden" aria-hidden="true">
        <div className="h-5 w-px bg-gradient-to-b from-cyan/60 to-violet/60" />
      </div>

      {/* Tier 2: Central Processing Hub */}
      <div className="relative z-10 rounded-2xl border border-sky/35 bg-gradient-to-l from-panel/90 via-night/95 to-panel/90 p-3.5 shadow-[0_0_40px_-18px_rgb(17_166_251/0.6)] sm:px-5 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white shadow-[0_6px_20px_-4px_rgb(35_53_252/0.85)]">
              <Icon name="cpu" size={20} />
            </span>
            <div>
              <p className="text-sm font-black text-white">
                منظومة <Latin>dot Ai</Latin> الذكية
              </p>
              <p className="text-xs text-mist">{coreMessage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Circuit Layer B: Center Hub → 2 Outputs (RTL: Right=360 HR, Left=120 Sales) */}
      <div className="relative z-0 mx-auto hidden h-12 w-full sm:block" aria-hidden="true">
        <svg viewBox="0 0 480 48" preserveAspectRatio="none" className="size-full overflow-visible">
          <path d="M240 0 C240 24, 360 18, 360 48" fill="none" stroke="rgba(147,166,214,0.14)" strokeWidth="1.5" />
          <path d="M240 0 C240 24, 120 18, 120 48" fill="none" stroke="rgba(147,166,214,0.14)" strokeWidth="1.5" />

          {hrActive && (
            <path d="M240 0 C240 24, 360 18, 360 48" fill="none" stroke={BRAND.cyan} strokeWidth="2.2" className="svg-signal" />
          )}
          {salesActive && (
            <path d="M240 0 C240 24, 120 18, 120 48" fill="none" stroke={BRAND.violet} strokeWidth="2.2" className="svg-signal-rev" />
          )}
        </svg>
      </div>

      <div className="my-2 flex justify-center sm:hidden" aria-hidden="true">
        <div className="h-5 w-px bg-gradient-to-b from-sky/60 to-violet/60" />
      </div>

      {/* Tier 3: Structured Output Systems */}
      <div className="relative z-10">
        <p className="mb-2.5 text-[11px] font-bold tracking-wider text-haze">02 / أنظمة جاهزة لإدارة أعمالك</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="#hr"
            className={`group flex flex-col justify-between rounded-2xl border p-3.5 transition-all duration-300 ${
              hrActive
                ? 'border-cyan/40 bg-ink/85 hover:border-cyan hover:bg-panel/60'
                : 'border-white/5 bg-ink/40 opacity-40 hover:opacity-80'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-cyan/15 text-glow">
                  <Icon name="users" size={18} />
                </span>
                <div>
                  <span className="block text-sm font-extrabold text-white">{PRODUCTS.hr.shortName}</span>
                  <span className="block text-[11px] text-haze">{PRODUCTS.hr.focus}</span>
                </div>
              </div>
              <Icon name="arrowLeft" size={16} className="text-glow transition-transform group-hover:-translate-x-1" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['الحضور', 'الورديات', 'الرواتب'].map((tag) => (
                <span key={tag} className="rounded-md border border-cyan/20 bg-cyan/10 px-2 py-0.5 text-[11px] font-semibold text-glow">
                  {tag}
                </span>
              ))}
            </div>
          </a>

          <a
            href="#sales"
            className={`group flex flex-col justify-between rounded-2xl border p-3.5 transition-all duration-300 ${
              salesActive
                ? 'border-violet/50 bg-ink/85 hover:border-iris hover:bg-panel/60'
                : 'border-white/5 bg-ink/40 opacity-40 hover:opacity-80'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-violet/20 text-iris">
                  <Icon name="trendingUp" size={18} />
                </span>
                <div>
                  <span className="block text-sm font-extrabold text-white">{PRODUCTS.sales.shortName}</span>
                  <span className="block text-[11px] text-haze">{PRODUCTS.sales.focus}</span>
                </div>
              </div>
              <Icon name="arrowLeft" size={16} className="text-iris transition-transform group-hover:-translate-x-1" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['المبيعات', 'العملاء', 'التقارير'].map((tag) => (
                <span key={tag} className="rounded-md border border-violet/25 bg-violet/15 px-2 py-0.5 text-[11px] font-semibold text-iris">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        </div>
      </div>

      {/* Bottom workflow action footer */}
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3.5 text-xs">
        <span className="text-mist">عمليات أوضح ← وقت أقل في المتابعة اليدوية</span>
        <a
          href={whatsAppLinkFor(mode === 'sales' ? 'sales' : mode === 'hr' ? 'hr' : 'general')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-glow transition-colors hover:text-white"
        >
          <Icon name="whatsapp" size={15} />
          <span>{mode === 'hr' ? 'اطلب نظام HR' : mode === 'sales' ? 'اطلب نظام Sales' : 'ابدأ الآن'}</span>
          <span className="sr-only"> (يفتح واتساب في نافذة جديدة)</span>
        </a>
      </div>
    </div>
  )
}
