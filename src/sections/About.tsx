import { useRef } from 'react'
import { Icon } from '../components/Icon'
import { Latin } from '../components/Latin'
import { ABOUT } from '../config/site'
import { gsap, useGsapScene } from '../lib/motion'

/**
 * SCENE 02 — THE REALIZATION
 * Desktop (>=1024px): Pinned horizontal laser sweep + vertical aperture wipe + sectors rail.
 * Mobile/Tablet (<1024px): Vertical Contrast Lens & Bento Sectors Deck with 3D prism flip.
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

    // Mobile & Tablet (<1024px): Distinct vertical beam drop + 3D prism card unfold + opposing bento slide-in
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current
      if (!section) return

      gsap.from('.m-about-myth', {
        y: -18,
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: section,
          start: 'top 84%',
          once: true,
        },
      })

      gsap.from('.m-about-beam', {
        scaleY: 0,
        duration: 0.45,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.m-about-prism', {
        rotateX: -14,
        transformPerspective: 800,
        y: 28,
        scale: 0.93,
        opacity: 0,
        duration: 0.68,
        ease: 'back.out(1.25)',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-about-prism',
          start: 'top 86%',
          once: true,
        },
      })

      gsap.from('.m-about-sector', {
        x: (i: number) => (i % 2 === 0 ? 24 : -24),
        y: 14,
        opacity: 0,
        duration: 0.48,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.m-about-sectors',
          start: 'top 88%',
          once: true,
        },
      })
    })
  })

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label={ABOUT.title}
      className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-b from-ink via-night/60 to-ink py-14 sm:py-16 lg:min-h-[100svh] lg:py-24"
    >
      <div className="hairline-x absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Desktop View (>=1024px): Unchanged Horizontal Laser Aperture Theater */}
      <div className="container-x hidden lg:block">
        {/* Beat 1: The Outdated Assumption */}
        <p ref={mythRef} className="max-w-3xl text-3xl font-bold leading-relaxed text-mist">
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
          <h2 className="text-balance text-[4.4rem] font-black leading-[1.2] tracking-[-0.02em]">
            <span className="text-gradient">{ABOUT.title}</span>
          </h2>
        </div>

        {/* Beat 3: Philosophy + Sectors Stream */}
        <div ref={philosophyRef} className="mt-10 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-pretty text-xl leading-9 text-mist">{ABOUT.lead}</p>
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
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-ink/85 p-5">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="font-extrabold text-glow">{ABOUT.audienceTitle}</span>
            <span className="font-mono text-haze">
              <Latin>01 — 06</Latin>
            </span>
          </div>
          <ul ref={trackRef} className="flex flex-nowrap justify-between gap-2">
            {ABOUT.audience.map((item) => (
              <li
                key={item}
                className="about-sector-chip inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-night/70 px-3.5 py-2 text-sm font-bold text-mist"
              >
                <Icon name="check" size={14} className="shrink-0 text-cyan" strokeWidth={2.5} />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile & Tablet View (<1024px): Contrast Lens & Bento Sectors Deck */}
      <div className="container-x lg:hidden">
        {/* Outdated Assumption Card */}
        <div className="m-about-myth rounded-2xl border border-white/10 bg-night/75 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-haze/70" aria-hidden="true" />
            <span className="text-[11px] font-bold text-haze">الاعتقاد التقليدي</span>
          </div>
          <p className="mt-2 text-sm font-bold leading-7 text-mist line-through decoration-white/25 sm:text-base">
            {ABOUT.preTitle}
          </p>
        </div>

        {/* Vertical Connector Pulse */}
        <div aria-hidden="true" className="flex justify-center">
          <div className="m-about-beam my-2 h-8 w-0.5 origin-top bg-gradient-to-b from-cyan via-sky to-violet shadow-[0_0_12px_var(--color-cyan)]" />
        </div>

        {/* Realization Prism Card */}
        <div className="m-about-prism surface-console relative overflow-hidden rounded-3xl border border-cyan/35 p-5 sm:p-7">
          <div className="border-s-4 border-cyan ps-4">
            <h2 className="text-balance text-[1.85rem] font-black leading-[1.25] sm:text-4xl">
              <span className="text-gradient">{ABOUT.title}</span>
            </h2>
          </div>

          <p className="mt-3.5 text-pretty text-sm leading-7 text-mist sm:text-base sm:leading-8">{ABOUT.lead}</p>

          <div className="mt-4 rounded-2xl border border-sky/25 bg-ink/85 p-3.5 sm:p-4">
            <span className="block text-[11px] font-extrabold text-glow">
              رؤية <Latin>dot Ai</Latin>
            </span>
            <p className="mt-1 text-sm font-black leading-6 text-white sm:text-base">{ABOUT.statement}</p>
          </div>
        </div>

        {/* Asymmetric 2-Column Bento Sectors Grid */}
        <div className="m-about-sectors mt-6 rounded-2xl border border-white/10 bg-ink/85 p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-glow">{ABOUT.audienceTitle}</span>
            <span className="font-mono text-haze">
              <Latin>01 — 06</Latin>
            </span>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {ABOUT.audience.map((item, i) => (
              <li
                key={item}
                className="m-about-sector flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-night/75 p-3 sm:p-3.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <Icon name="check" size={13} className="shrink-0 text-cyan" strokeWidth={2.5} />
                  <span className="font-mono text-[10px] font-bold text-glow/85">
                    <Latin>{String(i + 1).padStart(2, '0')}</Latin>
                  </span>
                </div>
                <span className="text-xs font-bold leading-snug text-white sm:text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
