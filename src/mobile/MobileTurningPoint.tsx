import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { TURNING_POINT } from '../config/storyData'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * MOBILE SCENE 04 — THE TURNING POINT (#about)
 * Transition 03 -> 04: scattered operational clusters magnetically converge into
 * an aligned precision grid while an electric aperture opens the realization headline.
 */
export function MobileTurningPoint() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Visual fragmentation snaps into crisp horizontal alignment on entry
      gsap.from('.m-turn-chip', {
        x: (i) => (i % 2 === 0 ? 40 : -40),
        rotation: (i) => (i % 2 === 0 ? 7 : -7),
        scale: 0.9,
        opacity: 0.2,
        duration: 0.72,
        stagger: 0.06,
        ease: 'back.out(1.25)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-turn-grid',
          start: 'top 90%',
          once: true,
        },
      })

      // Mask reveal for core turning point insight
      gsap.from('.m-turn-mask', {
        clipPath: 'inset(0 0 100% 0)',
        y: 26,
        opacity: 0,
        duration: 0.75,
        ease: 'power4.out',
        clearProps: 'clipPath,transform,opacity',
        scrollTrigger: {
          trigger: '.m-turn-mask',
          start: 'top 90%',
          once: true,
        },
      })

      // Anticipation laser drop connecting into dot Ai Brand Reveal (#solutions)
      gsap.from('.m-turn-drop-line', {
        scaleY: 0,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '.m-turn-drop-line',
          start: 'top 92%',
          once: true,
        },
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="m-about-title"
      className="relative overflow-x-clip bg-gradient-to-b from-ink via-night/65 to-ink px-4 py-14"
    >
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="mx-auto max-w-md">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold text-glow">
          <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
          <span>{TURNING_POINT.eyebrow}</span>
        </span>

        {/* Defragmenting operational domains */}
        <ul className="m-turn-grid mt-6 grid grid-cols-2 gap-2" aria-label="عمليات تحتاج للترابط">
          {TURNING_POINT.clusters.map((item) => (
            <li
              key={item}
              className="m-turn-chip flex items-center gap-2 rounded-xl border border-sky/25 bg-panel/45 px-3 py-2.5 text-xs font-bold text-white"
            >
              <Icon name="check" size={14} className="shrink-0 text-cyan" strokeWidth={2.5} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-7 text-sm font-bold leading-7 text-mist">{TURNING_POINT.prompt}</p>

        <div className="m-turn-mask mt-3">
          <h2 id="m-about-title" className="text-gradient text-[clamp(1.55rem,6.4vw,2.2rem)] font-black leading-[1.28]">
            {TURNING_POINT.headline}
          </h2>
        </div>

        <p className="mt-3 text-sm leading-7 text-mist">{TURNING_POINT.lead}</p>

        {/* Anticipation Focal Spark leading straight into Brand Reveal */}
        <div aria-hidden="true" className="mt-8 flex flex-col items-center gap-2">
          <span className="node-pulse size-3 rounded-full bg-cyan shadow-[0_0_22px_6px_rgb(3_220_254/0.55)]" />
          <span className="m-turn-drop-line h-10 w-px origin-top bg-gradient-to-b from-cyan via-azure to-transparent" />
        </div>
      </div>
    </section>
  )
}
