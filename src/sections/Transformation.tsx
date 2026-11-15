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
 * Desktop (>=1024px): Pinned split-screen operations network + interactive console + SVG circuit draw.
 * Mobile/Tablet (<1024px): Vertical Neural Spine Timeline with scroll-scrubbed energy spine & node reveals.
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

    // Mobile & Tablet (<1024px): Scroll-scrubbed vertical neural spine & lateral card entrances
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        '.m-trans-spine-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.m-trans-timeline',
            start: 'top 82%',
            end: 'bottom 58%',
            scrub: 0.4,
          },
        },
      )

      gsap.from('.m-trans-card', {
        x: -28,
        y: 18,
        scale: 0.95,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-trans-timeline',
          start: 'top 86%',
          once: true,
        },
      })

      gsap.from('.m-trans-dock', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-trans-dock',
          start: 'top 92%',
          once: true,
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
    <section ref={sectionRef} id="transformation" aria-labelledby="transformation-title" className="relative overflow-x-clip py-14 sm:py-16 lg:py-24">
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x">
        <SectionHeading
          id="transformation-title"
          title={TRANSFORMATION.title}
          text={TRANSFORMATION.subtitle}
        />

        {/* Desktop View (>=1024px): Pinned Split Choreography Stage */}
        <div ref={pinStageRef} className="mt-12 hidden items-center gap-10 lg:grid lg:grid-cols-12">
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
                  className={`t-beat-card group block w-full cursor-pointer rounded-2xl border p-5 text-start transition-all duration-300 ${
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
                  <h3 className="mt-2.5 text-lg font-black text-white">{item.title}</h3>
                  {isSelected && <p className="mt-1.5 text-sm leading-6 text-mist">{item.text}</p>}
                </button>
              )
            })}
          </div>

          {/* Interactive Connected Operations Network (7 cols) */}
          <div className="lg:col-span-7">
            <div className="t-console-panel surface-console relative overflow-hidden rounded-3xl p-7">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="node-pulse size-2 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]" aria-hidden="true" />
                  <span className="text-sm font-extrabold text-white">
                    الشبكة التشغيلية المتصلة · <Latin>dot Ai</Latin>
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-glow">
                  <Latin>{active.index} / 04</Latin>
                </span>
              </div>

              <div className="relative mt-5">
                <div className="grid grid-cols-2 gap-3">
                  {TRANSFORMATION.beats.map((node, i) => {
                    const isNodeActive = beat === i || active.track === 'both'
                    const isFocused = beat === i
                    const isSales = node.track === 'sales'
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => selectBeat(i)}
                        className={`t-node-tile flex cursor-pointer flex-col justify-between rounded-2xl border p-4 text-start transition-all duration-300 ${
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

                <div className="rounded-2xl border border-sky/30 bg-ink/90 p-5">
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

        {/* Mobile & Tablet View (<1024px): Vertical Neural Spine Timeline */}
        <div className="mt-8 lg:hidden">
          <div className="m-trans-timeline relative mx-auto max-w-2xl space-y-3.5">
            {/* Continuous glowing vertical conduit */}
            <div aria-hidden="true" className="absolute bottom-4 start-5 top-4 w-0.5 overflow-hidden rounded-full bg-white/10">
              <div className="m-trans-spine-fill h-full w-full origin-top bg-gradient-to-b from-cyan via-sky to-violet shadow-[0_0_12px_var(--color-cyan)]" />
            </div>

            {TRANSFORMATION.beats.map((item, i) => {
              const isFocused = beat === i
              const isViolet = item.track === 'sales'
              return (
                <div key={item.id} className="m-trans-card relative ps-14">
                  {/* Spine Node Badge */}
                  <span
                    aria-hidden="true"
                    className={`absolute start-0 top-4 grid size-10 place-items-center rounded-2xl border transition-all duration-300 ${
                      isFocused
                        ? isViolet
                          ? 'border-violet bg-panel text-iris shadow-[0_0_20px_-4px_rgb(94_76_249/0.8)]'
                          : 'border-cyan bg-panel text-cyan shadow-[0_0_20px_-4px_rgb(3_220_254/0.75)]'
                        : isViolet
                          ? 'border-violet/35 bg-ink text-iris'
                          : 'border-cyan/30 bg-ink text-glow'
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    {isFocused && (
                      <span
                        className={`node-pulse absolute -end-1 -top-1 size-2.5 rounded-full ${
                          isViolet ? 'bg-violet' : 'bg-cyan'
                        }`}
                      />
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={() => selectBeat(i)}
                    aria-current={isFocused ? 'step' : undefined}
                    className={`block w-full cursor-pointer rounded-2xl border p-4 text-start transition-all duration-300 ${
                      isFocused
                        ? isViolet
                          ? 'border-violet/55 bg-gradient-to-b from-panel/90 to-night shadow-[0_14px_34px_-18px_rgb(94_76_249/0.6)]'
                          : 'border-cyan/50 bg-gradient-to-b from-panel/90 to-night shadow-[0_14px_34px_-18px_rgb(3_220_254/0.55)]'
                        : 'border-white/10 bg-night/65 hover:border-white/25'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-xs font-extrabold ${isViolet ? 'text-iris' : 'text-glow'}`}>
                        {item.badge}
                      </span>
                      <span className="font-mono text-xs font-bold text-haze">
                        <Latin>{item.index} / 04</Latin>
                      </span>
                    </div>

                    <h3 className="mt-1.5 text-base font-black text-white">{item.title}</h3>
                    <p className="mt-1.5 text-xs leading-6 text-mist sm:text-sm">{item.text}</p>

                    {/* Connected Node Chips */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {item.nodes.map((pill, pi) => (
                        <span key={pill} className="inline-flex items-center gap-1.5">
                          {pi > 0 && (
                            <span aria-hidden="true" className="text-[10px] font-bold text-cyan/75">
                              ←
                            </span>
                          )}
                          <span
                            className={`rounded-lg border px-2 py-0.5 text-[11px] font-semibold ${
                              isFocused
                                ? 'border-white/18 bg-white/10 text-white'
                                : 'border-white/8 bg-ink/80 text-mist'
                            }`}
                          >
                            {pill}
                          </span>
                        </span>
                      ))}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>

          {/* Unified Neural Hub Summary Dock */}
          <div className="m-trans-dock mx-auto mt-5 flex max-w-2xl flex-col items-start justify-between gap-3.5 rounded-2xl border border-sky/30 bg-ink/90 p-4 sm:flex-row sm:items-center sm:p-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="node-pulse size-2 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]" aria-hidden="true" />
                <span className="text-xs font-extrabold text-glow">
                  الشبكة التشغيلية المتصلة · <Latin>dot Ai</Latin>
                </span>
              </div>
              <p className="mt-1 text-sm font-black text-white">{active.title}</p>
            </div>
            <WhatsAppButton
              message={active.track === 'sales' ? 'sales' : active.track === 'hr' ? 'hr' : 'general'}
              size="sm"
              className="w-full shrink-0 sm:w-auto"
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
    </section>
  )
}
