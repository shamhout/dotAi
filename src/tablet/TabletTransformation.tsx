import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { WHY } from '../config/site'
import { BEFORE_AFTER_ITEMS } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * TABLET SCENE 06 — THE TRANSFORMATION & RESULTS (#transformation & #why)
 * Wide editorial Before -> After comparison table + interactive track spotlight
 * paired with a clean 2x3 / 3x2 precision results matrix. Zero 100svh pin locks.
 */
export function TabletTransformation() {
  const [selectedId, setSelectedId] = useState(BEFORE_AFTER_ITEMS[0].id)
  const sectionRef = useRef<HTMLElement>(null)
  const mountedRef = useRef(false)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.t-ba-stage', {
        y: 24,
        scale: 0.96,
        opacity: 0.3,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.t-ba-stage',
          start: 'top 88%',
          once: true,
        },
      })

      gsap.from('.t-why-item', {
        y: 24,
        scale: 0.93,
        opacity: 0,
        duration: 0.58,
        stagger: 0.07,
        ease: 'back.out(1.15)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#why',
          start: 'top 88%',
          once: true,
        },
      })
    })
  })

  // Animate Before -> After stage panels cleanly when switching topic tabs
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.t-ba-col',
        { y: 12, opacity: 0.45 },
        { y: 0, opacity: 1, duration: 0.38, stagger: 0.08, ease: 'power2.out', clearProps: 'transform,opacity' },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [selectedId])

  const current = BEFORE_AFTER_ITEMS.find((item) => item.id === selectedId) ?? BEFORE_AFTER_ITEMS[0]
  const isViolet = current.track === 'sales'

  return (
    <section
      ref={sectionRef}
      id="transformation"
      aria-labelledby="t-transform-title"
      className="relative overflow-x-clip bg-gradient-to-b from-ink via-night/60 to-ink px-6 py-16"
    >
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
              <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
              <span>الفصل 06 · قبل وبعد الأتمتة</span>
            </span>
            <h2 id="t-transform-title" className="mt-3 text-3xl font-black text-white">
              من التعقيد اليومي إلى الوضوح التشغيلي
            </h2>
          </div>

          <div role="tablist" aria-label="محاور التحول" className="flex flex-wrap gap-1.5 rounded-xl border border-white/10 bg-night/80 p-1">
            {BEFORE_AFTER_ITEMS.map((item) => {
              const active = item.id === selectedId
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedId(item.id)}
                  className={`min-h-9 cursor-pointer rounded-lg px-3 text-xs font-bold transition-colors ${
                    active ? 'bg-panel text-white' : 'text-mist hover:text-white'
                  }`}
                >
                  {item.tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Split Comparison Stage */}
        <div className="t-ba-stage surface-console mt-6 grid items-stretch gap-4 rounded-3xl p-6 md:grid-cols-2">
          <div className="t-ba-col flex flex-col justify-center rounded-2xl border border-white/10 bg-ink/85 p-5">
            <span className="text-xs font-bold text-haze">قبل الأتمتة</span>
            <h3 className="mt-2 text-xl font-black text-mist line-through decoration-white/25">
              {current.beforeTitle}
            </h3>
            <p className="mt-2 text-sm leading-7 text-mist/85">{current.beforeText}</p>
          </div>

          <div
            className={`t-ba-col flex flex-col justify-center rounded-2xl border p-5 ${
              isViolet ? 'border-violet/40 bg-violet/12' : 'border-cyan/35 bg-cyan/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon name="check" size={16} className={isViolet ? 'text-iris' : 'text-cyan'} strokeWidth={2.8} />
              <span className={`text-xs font-extrabold ${isViolet ? 'text-iris' : 'text-glow'}`}>
                مع <Latin>dot Ai</Latin>
              </span>
            </div>
            <h3 className="mt-2 text-xl font-black text-white">{current.afterTitle}</h3>
            <p className="mt-2 text-sm leading-7 text-mist">{current.afterText}</p>
          </div>
        </div>

        {/* Operational Results Grid (#why preserved) */}
        <div id="why" className="pt-14">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-black text-white">{WHY.title}</h3>
            <span className="font-mono text-xs font-bold text-haze">
              <Latin>RESULTS</Latin>
            </span>
          </div>

          <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {WHY.items.map((item, i) => (
              <li key={item.title} className="t-why-item surface-architect rounded-2xl p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-sky/25 bg-panel/70 text-glow">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span className="font-mono text-xs font-bold text-haze">
                    <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                  </span>
                </div>
                <h4 className="mt-4 text-base font-extrabold text-white">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-6 text-mist">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
