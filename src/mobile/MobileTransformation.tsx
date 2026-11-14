import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { ABOUT, WHY } from '../config/site'
import { BEFORE_AFTER_ITEMS } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * MOBILE SCENE 06 — THE TRANSFORMATION & RESULTS (#transformation + #why)
 * Transition 05 -> 06: Interactive Before/After morph toggle with alternating
 * slide-in comparison decks and cascading operational results matrix.
 */
export function MobileTransformation() {
  const [mode, setMode] = useState<'compare' | 'after'>('compare')
  const sectionRef = useRef<HTMLElement>(null)
  const mountedRef = useRef(false)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.m-ba-card', {
        x: (i) => (i % 2 === 0 ? 28 : -28),
        y: 22,
        scale: 0.95,
        opacity: 0,
        duration: 0.62,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-ba-list',
          start: 'top 90%',
          once: true,
        },
      })

      gsap.from('.m-result-pill', {
        scale: 0.9,
        y: 16,
        opacity: 0,
        duration: 0.52,
        stagger: 0.06,
        ease: 'back.out(1.2)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#why',
          start: 'top 90%',
          once: true,
        },
      })

      gsap.from('.m-sector-tag', {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-sector-strip',
          start: 'top 92%',
          once: true,
        },
      })
    })
  })

  // Smooth morph stagger when user switches between Compare & Result Focus
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.m-ba-card',
        { y: 12, scale: 0.97, opacity: 0.45 },
        { y: 0, scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity' },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [mode])

  return (
    <section
      ref={sectionRef}
      id="transformation"
      aria-labelledby="m-transform-title"
      className="relative overflow-x-clip bg-gradient-to-b from-ink via-night/60 to-ink px-4 py-14"
    >
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="mx-auto max-w-md">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
          <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
          <span>الفصل 06 · التحوّل والنتائج</span>
        </span>

        <h2 id="m-transform-title" className="mt-3 text-[clamp(1.45rem,5.8vw,2rem)] font-black leading-[1.3] text-white">
          شوف الفرق بين الفوضى اليدوية والتشغيل مع <Latin>dot Ai</Latin>
        </h2>

        {/* Mode Switcher */}
        <div
          role="group"
          aria-label="طريقة عرض التحول"
          className="mt-5 grid grid-cols-2 gap-1.5 rounded-xl border border-white/10 bg-night/80 p-1"
        >
          <button
            type="button"
            aria-pressed={mode === 'compare'}
            onClick={() => setMode('compare')}
            className={`min-h-10 cursor-pointer rounded-lg text-xs font-bold transition-all ${
              mode === 'compare' ? 'bg-panel text-white shadow-sm' : 'text-mist'
            }`}
          >
            مقارنة قبل ← بعد
          </button>
          <button
            type="button"
            aria-pressed={mode === 'after'}
            onClick={() => setMode('after')}
            className={`min-h-10 cursor-pointer rounded-lg text-xs font-bold transition-all ${
              mode === 'after' ? 'border border-cyan/40 bg-cyan/15 text-glow' : 'text-mist'
            }`}
          >
            تركيز على النتيجة
          </button>
        </div>

        {/* Before -> After Scenarios */}
        <div className="m-ba-list mt-5 space-y-3.5">
          {BEFORE_AFTER_ITEMS.map((item) => {
            const isViolet = item.track === 'sales'
            return (
              <article key={item.id} className="m-ba-card surface-architect overflow-hidden rounded-2xl p-4">
                <span className={`text-[11px] font-extrabold ${isViolet ? 'text-iris' : 'text-glow'}`}>
                  {item.tag}
                </span>

                {mode === 'compare' && (
                  <div className="mt-2.5 rounded-xl border border-white/8 bg-ink/80 p-3">
                    <span className="text-[10px] font-bold text-haze">قبل الأتمتة</span>
                    <p className="mt-0.5 text-xs font-bold text-haze line-through decoration-white/25">
                      {item.beforeTitle}
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-mist/85">{item.beforeText}</p>
                  </div>
                )}

                <div
                  className={`mt-2.5 rounded-xl border p-3.5 ${
                    isViolet ? 'border-violet/35 bg-violet/12' : 'border-cyan/30 bg-cyan/10'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon name="check" size={14} className={isViolet ? 'text-iris' : 'text-cyan'} strokeWidth={2.8} />
                    <span className={`text-[11px] font-extrabold ${isViolet ? 'text-iris' : 'text-glow'}`}>
                      مع <Latin>dot Ai</Latin>
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-black text-white">{item.afterTitle}</p>
                  <p className="mt-1 text-xs leading-6 text-mist">{item.afterText}</p>
                </div>
              </article>
            )
          })}
        </div>

        {/* Scannable Operational Results (#why anchor preserved) */}
        <div id="why" className="pt-12">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-black text-white">{WHY.eyebrow}</h3>
            <span className="font-mono text-[11px] font-bold text-haze">
              <Latin>01 — 06</Latin>
            </span>
          </div>

          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {WHY.items.map((item) => (
              <li
                key={item.title}
                className="m-result-pill flex items-start gap-3 rounded-2xl border border-sky/20 bg-night/75 p-3.5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-sky/25 bg-panel/70 text-glow">
                  <Icon name={item.icon} size={18} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-6 text-mist">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Swipeable Sectors Strip */}
          <div className="m-sector-strip mt-6 rounded-2xl border border-white/10 bg-night/60 p-3.5">
            <p className="mb-2.5 text-xs font-extrabold text-glow">{ABOUT.audienceTitle}</p>
            <div className="flex flex-wrap gap-1.5">
              {ABOUT.audience.map((sector) => (
                <span
                  key={sector}
                  className="m-sector-tag rounded-lg border border-white/10 bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-mist"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
