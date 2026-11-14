import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { ABOUT } from '../config/site'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * SCENE 02 — THE REALIZATION
 * Pinned typography theater (desktop): a horizontal laser line slices across the
 * outdated assumption, opens a vertical aperture wipe revealing the core truth,
 * and glides into the philosophy & sectors stream.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const mythRef = useRef<HTMLParagraphElement>(null)
  const laserRef = useRef<HTMLDivElement>(null)
  const truthRef = useRef<HTMLDivElement>(null)
  const philosophyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)

  useGsapScene(sectionRef, (_ctx, mm) => {
    // Desktop theatrical aperture sequence: auto-reveals cleanly on section arrival,
    // then scrubs the industry track and focal-point compression while pinned.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const truth = truthRef.current
      const philosophy = philosophyRef.current
      const laser = laserRef.current
      const myth = mythRef.current
      const track = trackRef.current
      const section = sectionRef.current
      if (!truth || !philosophy || !laser || !myth || !track || !section) return

      gsap.set(truth, { clipPath: 'inset(50% 0 50% 0)', opacity: 0.25, scale: 0.97 })
      gsap.set(philosophy, { y: 24, opacity: 0 })
      gsap.set(laser, { scaleX: 0 })

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 68%',
          once: true,
        },
      })

      introTl
        .to(laser, { scaleX: 1, duration: 0.5, ease: 'power3.out' })
        .to(myth, { opacity: 0.52, y: -10, duration: 0.45, ease: 'power2.out' }, '<0.05')
        .to(
          truth,
          {
            clipPath: 'inset(0% 0 0% 0)',
            opacity: 1,
            scale: 1,
            duration: 0.72,
            ease: 'power4.out',
            clearProps: 'clipPath,transform',
          },
          '<0.1',
        )
        .to(philosophy, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'transform' }, '-=0.28')
        .from(
          '.about-sector-chip',
          {
            y: 16,
            scale: 0.92,
            opacity: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: 'back.out(1.2)',
            clearProps: 'transform,opacity',
          },
          '-=0.3',
        )

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=85%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })

      pinTl
        .to(track, { xPercent: -7, duration: 0.6, ease: 'none' }, 0)
        // TRANSITION 02 (REALIZATION -> SOLUTION): laser contracts to central focal core
        .to(laser, { scaleX: 0.06, opacity: 0.9, duration: 0.35, ease: 'power2.inOut' }, 0.55)
    })

    // Lightweight mobile entrance
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const mobileTargets = [truthRef.current, philosophyRef.current].filter(
        (el): el is HTMLDivElement => Boolean(el),
      )
      if (!mobileTargets.length || !sectionRef.current) return
      gsap.from(mobileTargets, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 86%',
          once: true,
        },
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative flex min-h-[85svh] flex-col justify-center overflow-hidden bg-gradient-to-b from-ink via-night/60 to-ink py-20 lg:min-h-[100svh] lg:py-24"
    >
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-x">
        {/* Scene index */}
        <div className="inline-flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-cyan to-transparent" />
          <span className="text-xs font-extrabold tracking-wide text-glow sm:text-sm">{ABOUT.sceneTag}</span>
        </div>

        {/* Beat 1: The Outdated Assumption */}
        <p ref={mythRef} className="mt-8 max-w-3xl text-xl font-bold leading-relaxed text-mist sm:text-3xl">
          {ABOUT.preTitle}
        </p>

        {/* Horizontal Laser Thread (shared visual motif across Scene 01 → 02 → 03) */}
        <div className="my-7 overflow-hidden" aria-hidden="true">
          <div
            ref={laserRef}
            className="h-[2px] w-full origin-center bg-gradient-to-l from-transparent via-cyan to-transparent shadow-[0_0_16px_var(--color-cyan)]"
          />
        </div>

        {/* Beat 2: Aperture Wipe Realization */}
        <div ref={truthRef}>
          <h2
            id="about-title"
            className="text-balance text-[2.3rem] font-black leading-[1.2] tracking-[-0.02em] sm:text-5xl lg:text-[4.4rem]"
          >
            <span className="text-gradient">{ABOUT.title}</span>
          </h2>
        </div>

        {/* Beat 3: Philosophy + Sectors Stream */}
        <div ref={philosophyRef} className="mt-10 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-pretty text-base leading-8 text-mist sm:text-xl sm:leading-9">{ABOUT.lead}</p>
          </div>
          <div className="lg:col-span-5">
            <blockquote className="border-s-2 border-cyan bg-panel/45 py-4 pe-5 ps-5">
              <span className="block text-xs font-extrabold text-glow">
                رؤية <Latin>dot Ai</Latin>
              </span>
              <p className="mt-1.5 text-lg font-black leading-8 text-white">{ABOUT.statement}</p>
            </blockquote>
          </div>
        </div>

        {/* Industries Ribbon */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-ink/85 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-extrabold text-glow">{ABOUT.audienceTitle}</span>
            <span className="font-mono text-haze">
              <Latin>01 — 06</Latin>
            </span>
          </div>
          <ul ref={trackRef} className="flex flex-wrap gap-2.5 lg:flex-nowrap lg:justify-between">
            {ABOUT.audience.map((item) => (
              <li
                key={item}
                className="about-sector-chip inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-night/70 px-3.5 py-2 text-xs font-bold text-mist sm:text-sm"
              >
                <Icon name="check" size={14} className="text-cyan" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
