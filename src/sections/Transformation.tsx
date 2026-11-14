import { useRef, useState } from 'react'
import { WhatsAppButton } from '../components/Buttons'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { SectionHeading } from '../components/SectionHeading'
import { BRAND } from '../config/brand'
import { CONTACT_WHATSAPP_LABEL, TRANSFORMATION } from '../config/site'
import { ScrollTrigger, gsap, useGsapScene } from '../lib/motion'

/**
 * SCENE 04 — THE TRANSFORMATION
 * Pinned split-screen operations network (desktop) + instant tap explorer (mobile):
 * scrolling (or clicking) steps through 4 operational phases while the central
 * SVG nervous system draws connections and illuminates active operational flows.
 */
export function Transformation() {
  const [beat, setBeat] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const pinStageRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const circuitSvgRef = useRef<SVGSVGElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Staggered narrative beats & network stage arrival on Scene 04 transition
      gsap.from('.t-beat-card', {
        x: 28,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: pinStageRef.current,
          start: 'top 86%',
          once: true,
        },
      })

      gsap.from('.t-console-panel', {
        scale: 0.95,
        x: -24,
        opacity: 0.35,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: pinStageRef.current,
          start: 'top 86%',
          once: true,
        },
      })

      // Draw SVG base lines smoothly on entry
      const circuitPaths = circuitSvgRef.current?.querySelectorAll<SVGPathElement>('.circuit-draw') ?? []
      circuitPaths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pinStageRef.current,
            start: 'top 76%',
            once: true,
          },
        })
      })

      // Pin the operations showcase while advancing smoothly across all 4 story beats
      triggerRef.current = ScrollTrigger.create({
        trigger: pinStageRef.current,
        start: 'top 90px',
        end: '+=130%',
        pin: true,
        scrub: 0.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          const next = Math.min(
            TRANSFORMATION.beats.length - 1,
            Math.floor(self.progress * TRANSFORMATION.beats.length),
          )
          setBeat((prev) => (prev === next ? prev : next))
        },
      })
    })
  })

  const active = TRANSFORMATION.beats[beat] ?? TRANSFORMATION.beats[0]
  const isHrTrack = active.track === 'hr' || active.track === 'both'
  const isSalesTrack = active.track === 'sales' || active.track === 'both'

  const selectBeat = (idx: number) => {
    setBeat(idx)
  }

  return (
    <section ref={sectionRef} id="transformation" aria-labelledby="transformation-title" className="relative py-20 lg:py-24">
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x">
        <SectionHeading
          index="04"
          id="transformation-title"
          eyebrow={TRANSFORMATION.sceneTag}
          title={TRANSFORMATION.title}
          text={TRANSFORMATION.subtitle}
        />

        {/* Mobile quick selector */}
        <div
          className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden"
          role="tablist"
          aria-label="مراحل الترابط الذكي"
        >
          {TRANSFORMATION.beats.map((b, i) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={beat === i}
              onClick={() => selectBeat(i)}
              className={`cursor-pointer rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                beat === i
                  ? 'border-cyan/45 bg-panel text-white shadow-[0_8px_20px_-10px_rgb(3_220_254/0.5)]'
                  : 'border-white/10 bg-night/60 text-mist hover:text-white'
              }`}
            >
              <span className="block font-mono text-[10px] text-glow">
                <Latin>{b.index}</Latin>
              </span>
              <span className="mt-0.5 block truncate">{b.badge}</span>
            </button>
          ))}
        </div>

        {/* Pinned Split Choreography Stage */}
        <div ref={pinStageRef} className="mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          {/* Narrative Beats Column (5 cols) */}
          <div className="space-y-3 lg:col-span-5">
            {TRANSFORMATION.beats.map((item, i) => {
              const isSelected = beat === i
              const isViolet = item.track === 'sales'
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectBeat(i)}
                  aria-current={isSelected ? 'step' : undefined}
                  className={`t-beat-card group block w-full cursor-pointer rounded-2xl border p-4 text-start transition-all duration-300 sm:p-5 ${
                    isSelected
                      ? isViolet
                        ? 'border-violet/60 bg-gradient-to-b from-panel/90 to-night shadow-[0_18px_45px_-22px_rgb(94_76_249/0.65)]'
                        : 'border-cyan/50 bg-gradient-to-b from-panel/90 to-night shadow-[0_18px_45px_-22px_rgb(3_220_254/0.55)]'
                      : 'border-white/8 bg-night/45 opacity-65 hover:border-white/20 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-extrabold ${
                        isViolet ? 'text-iris' : 'text-glow'
                      }`}
                    >
                      <Icon name={item.icon} size={16} />
                      <span>{item.badge}</span>
                    </span>
                    <span className="font-mono text-xs font-black text-haze">
                      <Latin>{item.index}</Latin>
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-base font-black text-white sm:text-lg">{item.title}</h3>
                  {isSelected && <p className="mt-1.5 text-xs leading-6 text-mist sm:text-sm">{item.text}</p>}
                </button>
              )
            })}
          </div>

          {/* Interactive Connected Operations Network (7 cols) */}
          <div className="lg:col-span-7">
            <div className="t-console-panel surface-console relative overflow-hidden rounded-3xl p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="node-pulse size-2 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]" aria-hidden="true" />
                  <span className="text-xs font-extrabold text-white sm:text-sm">
                    الشبكة التشغيلية المتصلة · <Latin>dot Ai</Latin>
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-glow">
                  <Latin>{active.index} / 04</Latin>
                </span>
              </div>

              <div className="relative mt-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  {TRANSFORMATION.beats.map((node, i) => {
                    const isNodeActive = beat === i || active.track === 'both'
                    const isFocused = beat === i
                    const isSales = node.track === 'sales'
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => selectBeat(i)}
                        className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-4 text-start transition-all duration-300 ${
                          isFocused
                            ? isSales
                              ? 'border-violet bg-panel/90 shadow-[0_0_28px_-10px_rgb(94_76_249/0.75)]'
                              : 'border-cyan bg-panel/90 shadow-[0_0_28px_-10px_rgb(3_220_254/0.7)]'
                            : isNodeActive
                              ? 'border-sky/30 bg-night/80'
                              : 'border-white/8 bg-ink/60 opacity-50 hover:opacity-85'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`grid size-9 place-items-center rounded-xl border ${
                              isSales
                                ? 'border-violet/35 bg-violet/20 text-iris'
                                : 'border-cyan/25 bg-cyan/15 text-glow'
                            }`}
                          >
                            <Icon name={node.icon} size={18} />
                          </span>
                          <span className="font-mono text-xs font-bold text-haze">
                            <Latin>{node.index}</Latin>
                          </span>
                        </div>
                        <p className="mt-3 text-sm font-black text-white">{node.badge}</p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {node.nodes.map((pill) => (
                            <span
                              key={pill}
                              className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                                isFocused
                                  ? 'border border-white/15 bg-white/10 text-white'
                                  : 'bg-white/[0.04] text-mist'
                              }`}
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Live Neural Conduit Layer */}
                <div className="my-4" aria-hidden="true">
                  <svg ref={circuitSvgRef} viewBox="0 0 600 44" className="h-10 w-full overflow-visible">
                    <path d="M90 6 H510" fill="none" stroke="rgba(147,166,214,0.16)" strokeWidth="2" className="circuit-draw" />
                    <path d="M300 6 V38" fill="none" stroke="rgba(147,166,214,0.16)" strokeWidth="2" className="circuit-draw" />
                    {isHrTrack && (
                      <path
                        d="M510 6 C420 6, 360 22, 300 38"
                        fill="none"
                        stroke={BRAND.cyan}
                        strokeWidth="2.4"
                        className="svg-signal"
                      />
                    )}
                    {isSalesTrack && (
                      <path
                        d="M90 6 C180 6, 240 22, 300 38"
                        fill="none"
                        stroke={BRAND.violet}
                        strokeWidth="2.4"
                        className="svg-signal-rev"
                      />
                    )}
                    <circle cx="300" cy="38" r="5" fill={BRAND.glow} />
                  </svg>
                </div>

                <div className="rounded-2xl border border-sky/30 bg-ink/90 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-extrabold text-glow">{active.badge}</p>
                      <p className="mt-1 text-base font-black text-white">{active.title}</p>
                    </div>
                    <WhatsAppButton
                      message={active.track === 'sales' ? 'sales' : active.track === 'hr' ? 'hr' : 'general'}
                      size="sm"
                    >
                      {active.track === 'hr'
                        ? 'اطلب نظام HR'
                        : active.track === 'sales'
                          ? 'اطلب نظام Sales'
                          : CONTACT_WHATSAPP_LABEL}
                    </WhatsAppButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
