import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { CONSEQUENCE_SCENARIOS } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * MOBILE SCENE 03 — THE CONSEQUENCES (#pain)
 * Transition 02 -> 03: directional angular section wipe + cascading domino chain
 * with smooth live step transitions whenever the user switches scenario tabs.
 */
export function MobilePainScenarios() {
  const [selectedId, setSelectedId] = useState<'sales-loss' | 'team-drain'>('sales-loss')
  const sectionRef = useRef<HTMLElement>(null)
  const mountedRef = useRef(false)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Transition 02 -> 03: diagonal reveal + head slide into consequence stage
      gsap.from('.m-pain-head', {
        x: -30,
        opacity: 0,
        duration: 0.62,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
      })

      gsap.from('.m-pain-card', {
        scale: 0.94,
        y: 26,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-pain-card',
          start: 'top 92%',
          once: true,
        },
      })

      gsap.from('.m-pain-step', {
        x: 20,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-pain-card',
          start: 'top 90%',
          once: true,
        },
      })
    })
  })

  // Replay domino step cadence smoothly on tab switch
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.m-pain-step',
        { x: 16, opacity: 0.35 },
        { x: 0, opacity: 1, duration: 0.38, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity' },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [selectedId])

  const current = CONSEQUENCE_SCENARIOS.find((s) => s.id === selectedId) ?? CONSEQUENCE_SCENARIOS[0]
  const isViolet = current.accent === 'violet'

  return (
    <section
      ref={sectionRef}
      id="pain"
      aria-labelledby="m-pain-title"
      className="scene-angle-cut relative overflow-x-clip bg-gradient-to-b from-night/90 via-panel/30 to-ink px-4 pb-14 pt-16"
    >
      <div className="mx-auto max-w-md">
        <div className="m-pain-head">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-iris">
            <span className="size-1.5 rounded-full bg-violet" aria-hidden="true" />
            <span>الفصل 03 · النتيجة الصامتة</span>
          </span>
          <h2 id="m-pain-title" className="mt-3 text-[clamp(1.45rem,5.8vw,2rem)] font-black leading-[1.3] text-white">
            كل يوم بتتأخر فيه بدون نظام... بتدفع تمنه من وقتك ومبيعاتك.
          </h2>
          <p className="mt-2 text-sm leading-7 text-mist">
            اختار سيناريو عشان تشوف تأثير الشغل اليدوي خطوة بخطوة:
          </p>
        </div>

        {/* Touch Scenario Selector */}
        <div
          role="tablist"
          aria-label="سيناريوهات تأثير العمل اليدوي"
          className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-ink/85 p-1.5"
        >
          {CONSEQUENCE_SCENARIOS.map((sc) => {
            const active = sc.id === selectedId
            const accentClass =
              sc.accent === 'violet'
                ? 'border-violet/45 bg-violet/20 text-white'
                : 'border-cyan/45 bg-cyan/15 text-glow'
            return (
              <button
                key={sc.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedId(sc.id)}
                className={`min-h-11 cursor-pointer rounded-xl border px-2.5 py-2 text-xs font-extrabold transition-all ${
                  active ? accentClass : 'border-transparent text-mist hover:text-white'
                }`}
              >
                <span className="block font-mono text-[10px] opacity-75">
                  <Latin>{sc.index}</Latin>
                </span>
                <span>{sc.id === 'sales-loss' ? 'المبيعات والعملاء' : 'الفريق والتشغيل'}</span>
              </button>
            )
          })}
        </div>

        {/* Active Domino Chain Stage */}
        <div
          className={`m-pain-card surface-console mt-5 overflow-hidden rounded-3xl p-5 ${
            isViolet ? 'border-violet/35' : 'border-cyan/30'
          }`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className={`text-xs font-extrabold ${isViolet ? 'text-iris' : 'text-glow'}`}>
              {current.category}
            </span>
            <span className="rounded-full border border-white/12 bg-ink px-2.5 py-0.5 font-mono text-[11px] font-bold text-haze">
              <Latin>CASE {current.index}</Latin>
            </span>
          </div>

          <h3 className="mt-4 text-lg font-black text-white">{current.title}</h3>

          <ol className="mt-5 space-y-3">
            {current.steps.map((step, i) => (
              <li
                key={step.label}
                className="m-pain-step relative flex items-start gap-3 rounded-2xl border border-white/10 bg-ink/80 p-3.5"
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-black ${
                    isViolet ? 'bg-violet/25 text-iris' : 'bg-cyan/15 text-glow'
                  }`}
                >
                  <Latin>{i + 1}</Latin>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-white">{step.label}</p>
                  <p className="mt-0.5 text-xs leading-6 text-mist">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>

          <div
            className={`mt-4 flex items-start gap-2.5 rounded-2xl border px-3.5 py-3 ${
              isViolet ? 'border-violet/35 bg-violet/12' : 'border-cyan/30 bg-cyan/10'
            }`}
          >
            <Icon name="zap" size={16} className={`mt-0.5 shrink-0 ${isViolet ? 'text-iris' : 'text-cyan'}`} />
            <p className="text-xs font-bold leading-6 text-white">{current.outcome}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
