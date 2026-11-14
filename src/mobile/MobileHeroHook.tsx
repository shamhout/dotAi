import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { BRAND } from '../config/brand'
import { HERO } from '../config/site'
import { HOOK_COPY } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * MOBILE SCENE 01 — THE HOOK (#home)
 * Opens cleanly without premature CTA push or badge boxes: kinetic headline mask,
 * animated disrupted waveform schematic, and an optical conduit leading into the story.
 */
export function MobileHeroHook() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Keep above-the-fold Hero content immediately visible on paint while settling smoothly
      gsap.fromTo(
        '.m-hook-line',
        { clipPath: 'inset(0 0 100% 0)', y: 18, opacity: 0.72 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          opacity: 1,
          duration: 0.52,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'clipPath,transform,opacity',
        },
      )

      gsap.fromTo(
        '.m-hook-fade',
        { y: 14, opacity: 0.75 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
      )

      gsap.fromTo(
        '.m-hook-chip',
        { scale: 0.92, y: 8, opacity: 0.78 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'back.out(1.2)',
          clearProps: 'transform,opacity',
        },
      )

      // Ambient breathing wave on pain-signal chips
      gsap.utils.toArray<HTMLElement>('.m-hook-chip').forEach((chip, i) => {
        gsap.to(chip, {
          y: i % 2 === 0 ? -3 : 3,
          duration: 2.2 + i * 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Inter-scene exit parallax transitioning out of Hook into Problem Stream
      if (stageRef.current && sectionRef.current) {
        gsap.to(stageRef.current, {
          y: -26,
          scale: 0.96,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '65% top',
            end: 'bottom top',
            scrub: 0.45,
          },
        })
      }
    })
  })

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="m-hook-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-4 pb-4 pt-16"
    >
      {/* Focused atmospheric cone */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="bg-grid absolute inset-0 opacity-65" />
        <div className="halo-breathe absolute -top-24 start-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(31_126_254/0.24),transparent)] rtl:translate-x-1/2" />
      </div>

      <div ref={stageRef} className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        {/* Oversized Touch Headline */}
        <h1
          id="m-hook-title"
          className="text-[clamp(1.65rem,6.9vw,2.4rem)] font-black leading-[1.2] tracking-[-0.02em]"
        >
          <span className="m-hook-line block text-white">{HOOK_COPY.headlineTop}</span>
          <span className="m-hook-line text-gradient mt-1.5 block">{HOOK_COPY.headlineAccent}</span>
        </h1>

        <p className="m-hook-fade mt-3 text-[13.5px] leading-6 text-mist sm:text-base sm:leading-8">{HOOK_COPY.lead}</p>

        {/* Disrupted Pulse Schematic Visual */}
        <div className="m-hook-fade mt-4 rounded-2xl border border-dashed border-white/15 bg-night/80 p-3 shadow-[0_14px_38px_-18px_rgb(17_166_251/0.35)]">
          <svg viewBox="0 0 340 58" className="h-11 w-full" aria-hidden="true">
            <path
              d="M8 29 L74 29 L88 12 L104 46 L118 29 L152 29"
              fill="none"
              stroke={BRAND.sky}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="svg-signal"
            />
            <circle cx="170" cy="29" r="4" fill={BRAND.violet} opacity="0.85" className="node-pulse" />
            <circle cx="170" cy="29" r="10" fill="none" stroke={BRAND.cyan} strokeOpacity="0.3" strokeWidth="1" />
            <path
              d="M188 29 L218 29 L232 19 L248 39 L264 29 L332 29"
              fill="none"
              stroke={BRAND.violet}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.72"
              className="svg-signal-rev"
            />
          </svg>

          <div className="mt-1.5 flex flex-wrap justify-between gap-1.5">
            {HOOK_COPY.pulseLabels.map((lbl) => (
              <span
                key={lbl}
                className="m-hook-chip inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-mist"
              >
                <span className="node-pulse size-1.5 rounded-full bg-cyan" aria-hidden="true" />
                <span>{lbl}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cohesive Optical Scroll Conduit (harmonious with circuitry layout, no pushy CTA) */}
      <div className="m-hook-fade mx-auto mt-3 flex w-full max-w-md flex-col items-center gap-2">
        <a
          href="#problem"
          aria-label="الانتقال إلى المشهد التالي لاكتشاف أثر العمل اليدوي"
          className="group grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2.5 text-[11px] font-bold leading-4 text-mist transition-colors hover:text-white"
        >
          <span className="text-end text-haze">{HERO.chaosLabel}</span>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-xl border border-cyan/40 bg-night/90 text-cyan shadow-[0_0_20px_-6px_rgb(3_220_254/0.55)]"
          >
            <Icon name="arrowLeft" size={14} className="chevron-bounce -rotate-90" />
          </span>
          <span className="text-start text-glow">{HERO.orderPreviewLabel}</span>
        </a>

        <div aria-hidden="true" className="flex justify-center">
          <div className="relative h-5 w-px overflow-hidden bg-white/15">
            <span className="thread-drop-beam absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-transparent via-cyan to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
